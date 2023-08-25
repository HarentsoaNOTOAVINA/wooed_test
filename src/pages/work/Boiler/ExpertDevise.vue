<template>
    <div class="boilerExpert__expert">
        <div class="boilerExpert__expert-header">
            <div class="boilerExpert__expert-nav">
                <ArrowBack @click="$emit('prev')" />
                <Paragraphe>{{ titleNav }}</Paragraphe>
            </div>
            <div
                class="bilerExpert__boutton-devise"
                v-if="listIdExperts.length > 0 && !showCost"
            >
                <Button @on-click="sendDevise"
                    ><LoadingButton size="xs" v-if="loadingBtn" /> Demander un
                    devis</Button
                >
            </div>
        </div>
        <hr class="separator" />
        <div class="boilerExpert__listContainer" v-if="!showCost">
            <div
                class="boilerExpert__content"
                v-for="(item, index) in expertData"
            >
                <ExpertCard
                    :expertData="item"
                    @handleChoiceExpert="handleChoiceExpert"
                />
            </div>
            <Loading class="loading" v-if="loading" />
        </div>

        <div class="boilerExpert__cost" v-if="showCost">
            <CostComp
                :showHeader="false"
                :cost="costInstallationBoiler"
                :loading="loadingCost"
                paraTitle="D'après le calcul, l'estimation du coût de votre travaux d'installation de chaudiere est de : "
            />
            <div class="boilerExpert__cost-btn-validation" v-if="!loadingCost">
                <Button @on-click="$emit('prev')">Valider </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Loading from '@/components/Common/Loader/Loader.vue';
    import ExpertCard from '../Components/ExpertCard/index.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { onMounted, ref, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';
    import CostComp from './components/CostComp.vue';
    import CalculateCost from '../Tank/CalculateCost/CalculateCost.vue';
    import router from '@/routes';

    const store = useStore();
    const route = useRoute();

    let titleNav = ref<string>('Trouvez un entrepreneur');
    const expertData = ref<Array<string>>([]);
    let loading = ref<boolean>(false);
    let showCost = ref<boolean>(false);
    let loadingBtn = ref<boolean>(false);
    let loadingCost = ref<boolean>(false);
    let list = ref<Array<any>>([]);
    let listIdExperts = ref<Array<any>>([]);
    let costInstallationBoiler = ref<number>(0);
    let dataPostSendDevise = ref<any>({
        idTheProperty: route.params.id,
        extProviderId: [],
    });
    let dataPostCostInstallation = ref<any>({
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let dataToGetExpert = ref<any>({
        region: '',
        speciality: 'Boiler',
    });

    let dataToSaveWorkBoiler = ref<any>();

    const emit = defineEmits<{
        (event: 'component', value: any): void;
    }>();

    onMounted(async () => {
        await getDetailStore();
        await getListExpert();
    });

    function getDetailStore() {
        let data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        console.log(data.value.length, 'dtatatata');

        if (data.value.length != 0) {
            dataToGetExpert.value.region = data.value[0].region;
        } else {
            try {
                store.dispatch(
                    'PropertyDetailModule/setPropertyData',
                    route.params.id
                );
                const data = computed(
                    () =>
                        store.getters['PropertyDetailModule/getPropertyDetail']
                );
                dataToGetExpert.value.region = data.value.data.region;
            } catch (error) {
                console.log('error getting detail detail property:', error);
            } finally {
                loading.value = false;
            }
        }
    }

    const getListExpert = async () => {
        try {
            loading.value = true;
            await store.dispatch(
                'WorksModule/setListExpertDynam',
                dataToGetExpert.value
            );
            const data = computed(
                () => store.getters['WorksModule/getListExpertDynam']
            );
            expertData.value = data.value.data;
            loading.value = false;
        } catch (error) {}
        console.log('data expert:', expertData.value);
    };

    const handleChoiceExpert = (item: any) => {
        Object.values(item).forEach((el) => {
            const index = list.value.indexOf(item);
            if (el === true) {
                if (index === -1) {
                    list.value.push(item);
                    listIdExperts.value.push(Object.keys(item));
                }
            } else {
                list.value.splice(index, 1);
                listIdExperts.value.splice(index, 1);
            }
        });

        dataPostSendDevise.value.extProviderId = listIdExperts.value;

        let transformData = listIdExperts.value.map((item) => {
            return parseInt(item[0]);
        });

        dataToSaveWorkBoiler.value = {
            ...dataToSaveWorkBoiler.value,
            ...{ idExpert: transformData },
        };
    };

    async function sendDevise() {
        try {
            loadingBtn.value = true;
            let resultaNext = await store.dispatch(
                'WorksModule/sendDevise',
                dataPostSendDevise.value
            );

            if (resultaNext.data.code == 200 && resultaNext.data.success) {
                notification['success']({
                    message: 'Cantacter Expert',
                    description: 'Un e-mail a été envoyé a ces expert',
                });
                showCost.value = true;
                titleNav.value = 'Calcul du cout';
                await CalculateCostBoil();
            }
        } catch (error) {
        } finally {
            loadingBtn.value = false;
        }
        console.log('Send Devise');
    }

    async function CalculateCostBoil() {
        const idSubSection = computed(
            () => store.getters['WorksModule/getDataIdToPost']
        );

        dataPostCostInstallation.value.idSubSection =
            idSubSection.value.idSubSection;

        try {
            loadingCost.value = true;
            let resultCost = await store.dispatch(
                'WorksModule/calculCostBoiler',
                dataPostCostInstallation.value
            );

            console.log(resultCost, 'Cost result');

            if (resultCost.status == 200 && resultCost.data.success) {
                costInstallationBoiler.value = resultCost.data.data;

                dataToSaveWorkBoiler.value = {
                    ...dataToSaveWorkBoiler.value,
                    ...{ idWorkCost: resultCost.data.workCost.id },
                    ...{ estimatedCost: resultCost.data.data },
                };

                store.dispatch(
                    'WorksModule/setDataSaveBoiler',
                    dataToSaveWorkBoiler.value
                );

                console.log(
                    dataToSaveWorkBoiler.value,
                    'Data to save workBoiler in Store'
                );
            }
        } catch (error) {
            console.error('Error get Cost Boiler : ', error);
        } finally {
            loadingCost.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerExpert {
        &__expert {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__expert-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
        &__expert-header {
            @apply flex justify-between;
        }

        &__content {
            &:deep() {
                .expertCard {
                    width: auto;
                    height: 100%;
                }
            }
        }

        &__listContainer {
            @apply relative;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            @screen sm {
                grid-template-columns: repeat(2, 1fr);
            }

            @screen md {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        &__cost-btn-validation {
            @apply flex justify-end;
        }

        &__cost {
            &:deep() {
                .costComp__container {
                    @apply min-h-[25vh];
                }
            }
        }
    }

    .separator {
        @apply my-[15px];
    }

    .loading {
        @apply h-[89vh] bg-[#fff];
    }
</style>
