<template>
    <Loader v-if="isLoadSimulate" />
    <div v-else class="md:container simulation__container">
        <transition appear name="fade-step" mode="out-in">
            <Start
                @on-get-choice="($event) => {pagePool.push($event as string);inverseAnimation()}"
                v-if="!pagePool.length"
                @on-back="gackHandler"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'fournisseurEnergie'"
                title="Avez-vous actuellement un autre fournisseur d’énergie ?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Oui', 'Non']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'electricCar'"
                title="Avez-vous une voiture électrique ?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Oui', 'Non']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'equipement'"
                title="Quel prix voulez-vous calculer ?"
                :icon="['Electricity', 'Gas', 'GasPipe']"
                :choices="['Électricité', 'Gaz', 'Électricité et Gaz']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'consommationAnnuel'"
                title="Connaissez-vous votre consommation d'énergie par an ?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Oui', 'Non']"
                :label="[
                    'Sur votre facture annuelle, vous voyez combien vous avez consommé.',
                    'Nous allons vous poser quelques questions afin d’évaluer votre consommation d’énergie.',
                ]"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'typeCompteur'"
                title="De quel type de compteur d’électricité disposez-vous ?"
                :icon="['Calculator', 'BiHourly']"
                :choices="['Normal', 'Bihoraire']"
                :label="['Tarif normal', 'Heures pleines et heures creuses']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
                :has-exclusive-night="true"
                @on-handle-switch="handleSwitch"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'proprietaire'"
                title="Etes-vous propriétaire ou locataire ?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Propriétaire', 'Locataire']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'typeLogement'"
                title="De quel type de logement disposez-vous ?"
                :icon="[
                    'Appartement',
                    'Adjoining',
                    'ThreeFacades',
                    'FourFacades',
                ]"
                :choices="[
                    'Appartement',
                    'Maison mitoyenne',
                    'Maison 3 façades',
                    'Maison 4 façades',
                ]"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'chauffageLogement'"
                title="Comment chauffez-vous votre logement ?"
                :icon="[
                    'Electricity',
                    'Gas',
                    'Mazout',
                    'HeatPump',
                    'AnotherWay',
                ]"
                :choices="[
                    `À l'électricité`,
                    'Au gaz',
                    'Au mazout',
                    'Pompe à chaleur',
                    'Autre',
                ]"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'panneauxSolaires'"
                title="Avez-vous des panneaux solaires?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Oui', 'Non']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'personnesACharge'"
                title="De combien de personnes se compose votre ménage ?"
                :icon="[
                    'OneUser',
                    'TwoUser',
                    'ThreeUser',
                    'UserPlus',
                    'AddSecurity',
                ]"
                :choices="[
                    '1 personne',
                    '2 personnes',
                    '3 personnes',
                    '4 personnes',
                    '5 personnes ou plus',
                ]"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'dateConstruction'"
                title="De quand date la construction de votre logement ?"
                :icon="['YearPlus', 'YearMinus']"
                :choices="['De 2000 ou\' après', 'Avant 2000']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'habitationIsolee'"
                title="Votre habitation a-t-elle été isolée ?"
                :icon="['CheckIcon', 'Close']"
                :choices="['Oui', 'Non']"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'energieAnnuel'"
                title="Combien d'énergie consommez-vous par an ?"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
                wrapper-type="simple-input"
                :params="params"
            />
            <Choice
                @on-refresh="refresh"
                v-else-if="currentPage === 'puissancePanneaux'"
                title="Quelle est la puissance de votre installation ?"
                @on-back="gackHandler"
                @on-get-choice="getCurrentChoice"
                wrapper-type="simple-input"
                :params="params"
                :is-solar-pannel="true"
            />
            <Result
                @on-refresh="refresh"
                @on-back="gackHandler"
                :simulation-result="simulationResult"
                v-else-if="currentPage === 'result'"
                :params="params"
            />
        </transition>
    </div>
</template>
<script lang="ts" setup>
    import SupplierServices from '@/services/supplierService';
    import { computed, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Choice from './Wrapper/Choice.vue';
    import Start from './Wrapper/Start.vue';
    import Result from './Wrapper/Result.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from 'ant-design-vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const currentPage = ref<string>('');
    const params = ref<any>({ theProperty: theProperty.value });
    const pagePool = ref<string[]>([]);
    const router = useRouter();
    const forceStopBack = ref<boolean>(true);
    const animation = ref<{ leave: string; enter: string }>({
        leave: '-300px',
        enter: '300px',
    });
    const isLoadSimulate = ref<boolean>(false);
    const simulationResult = ref<any>(null);

    watch(
        () => pagePool.value,
        (v: string[]) => {
            currentPage.value = v.at(-1) as string;
        },
        { immediate: true, deep: true }
    );

    function getCurrentChoice(choice: string) {
        inverseAnimation();
        if (pagePool.value.length) {
            params.value[currentPage.value] = choice;
            switch (currentPage.value) {
                case 'fournisseurEnergie':
                    pagePool.value.push('electricCar');
                    break;
                case 'electricCar':
                    pagePool.value.push('equipement');
                    break;
                case 'equipement':
                    pagePool.value.push('consommationAnnuel');
                    break;
                case 'consommationAnnuel':
                    if (choice === 'Oui') {
                        if (params.value['equipement'] === 'Gaz') {
                            pagePool.value.push('energieAnnuel');
                        } else {
                            pagePool.value.push('panneauxSolaires');
                        }
                    } else {
                        if (params.value['equipement'] === 'Gaz') {
                            pagePool.value.push('personnesACharge');
                        } else {
                            pagePool.value.push('panneauxSolaires');
                        }
                    }
                    break;
                case 'personnesACharge':
                    pagePool.value.push('typeLogement');
                    break;
                case 'energieAnnuel':
                    simulate();
                    break;
                case 'dateConstruction':
                    if (
                        params.value[currentPage.value] === 'de 2000 ou après'
                    ) {
                        pagePool.value.push('chauffageLogement');
                    } else {
                        pagePool.value.push('habitationIsolee');
                    }
                    break;
                case 'habitationIsolee':
                    pagePool.value.push('chauffageLogement');
                    break;
                case 'typeCompteur':
                    if (params.value['consommationAnnuel'] === 'Non') {
                        pagePool.value.push('personnesACharge');
                    } else {
                        pagePool.value.push('energieAnnuel');
                    }
                    break;
                case 'proprietaire':
                    if (params.value[currentPage.value] === 'locataire') {
                        simulate();
                    } else {
                        pagePool.value.push('typeLogement');
                    }
                    break;
                case 'typeLogement':
                    pagePool.value.push('dateConstruction');
                    break;
                case 'chauffageLogement':
                    simulate();
                    break;
                case 'panneauxSolaires':
                    if (params.value[currentPage.value] === 'Oui') {
                        pagePool.value.push('puissancePanneaux');
                    } else {
                        pagePool.value.push('typeCompteur');
                    }
                    break;
                case 'puissancePanneaux':
                    pagePool.value.push('typeCompteur');
                    break;
            }
            // console.log(params.value, 'value');
        }
    }
    function gackHandler() {
        if (forceStopBack.value) {
            forceStopBack.value = false;
            setTimeout(() => {
                pagePool.value.length ? pagePool.value.pop() : router.go(-1);
                if (params.value) {
                    delete params.value[currentPage.value];
                }
                forceStopBack.value = true;
            }, 100);
        }
        console.log(pagePool.value);
        inverseAnimation(true);
    }
    function inverseAnimation(init?: boolean) {
        if (init) {
            animation.value.enter = '-300px';
            animation.value.leave = '300px';
        } else {
            animation.value.enter = '300px';
            animation.value.leave = '-300px';
        }
    }
    async function simulate() {
        let parsedParams: any = {};
        Object.keys(params.value).forEach((k) => {
            switch (k) {
                case 'personnesACharge':
                    parsedParams = {
                        ...params.value,
                        [k]: +params.value[k][0],
                    };
                    break;
            }
        });
        try {
            isLoadSimulate.value = true;
            const { data } = await SupplierServices.engieSimulation(
                parsedParams
            );
            if (typeof data === 'object' && !Array.isArray(data)) {
                simulationResult.value = data;
            }
            pagePool.value.push('result');
        } catch (errpr) {
            notification.error({
                message:
                    "Il semble qu'une erreur soit produite. Veuillez réessayer",
            });
        } finally {
            isLoadSimulate.value = false;
        }
    }

    function handleSwitch(obj: any) {
        params.value = {
            ...params.value,
            ...obj,
        };
    }

    function refresh() {
        params.value = { theProperty: theProperty.value };
        pagePool.value = [];
        currentPage.value = '';
        console.log(pagePool.value, params.value, currentPage.value);
        inverseAnimation(true);
    }
</script>
<style lang="scss" scoped>
    .simulation {
        &__container {
            min-height: calc(100vh - 62px);
            @apply flex items-center justify-center;
            .fade-step-enter-active,
            .fade-step-leave-active {
                @apply transition-all;
            }
            .fade-step-leave-to {
                @apply translate-x-[v-bind(animation.leave)] opacity-0;
            }
            .fade-step-enter-from {
                @apply translate-x-[v-bind(animation.enter)] opacity-0;
            }
        }
    }
</style>
