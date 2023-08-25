<template>
    <div class="">
        <MainCard :data-breadcrumbs="breadcrumbListsData">
            <Loader v-if="isLoadGreenCertificate" />
            <div v-else class="green-card-content">
                <div>
                    <div class="green-card-content__handling">
                        <span>Mes certificats verts</span>
                        <a
                            href="https://extranet.brugel.brussels/home/"
                            target="_blank"
                            ><Button type-button="border"
                                >Gérer mes certificats verts</Button
                            ></a
                        >
                    </div>

                    <div class="green-card-content__step">
                        <transition name="fade-step" mode="out-in">
                            <component
                                @on-get-choice="(c:string) => cmpList.push(c)"
                                :is="activatedStep"
                                @on-input="handleInput"
                                :general-income="generalIncome"
                            ></component>
                        </transition>
                    </div>
                </div>

                <div class="btn__control" v-if="activatedStep !== DefaultStep">
                    <Button @click="handlePrev">Precedent</Button>
                    <Button @click="submit" :is-load="isLoadSubmit"
                        >Enregistrer</Button
                    >
                </div>
                <div class="green-card-content__handling">
                    <span>Nombre attendu</span>
                    <strong>{{ expectedNumberComputing }}</strong>
                </div>
                <hr class="text-gray mt-[20px]" />
                <div class="imposition">
                    <TabsCard :data-tabs="tabsDatas">
                        <template #tax>
                            <u
                                ><strong
                                    >Sur les revenus générés par les certificats
                                    verts</strong
                                ></u
                            >
                            <Paragraphe
                                >Non, les revenus provenant de la vente de CV
                                obtenus par des particuliers fournisseurs
                                d'énergie verte ne sont pas considérés comme des
                                revenus imposables, pour autant que cette
                                énergie soit produite au moyen d'installations
                                utilisées exclusivement dans la sphère
                                privée.</Paragraphe
                            >
                            <br />
                            <u><strong>Sur la vente de l’injection</strong></u>
                            <Paragraphe>Néant.</Paragraphe>
                        </template>
                        <template #tva>
                            <u
                                ><strong
                                    >Sur les revenus générés par les
                                    certificatsverts</strong
                                ></u
                            >
                            <Paragraphe
                                >Non, lorsque la production d'électricité reste
                                limitée à votre consommation personnelle. Oui,
                                lorsque vous vendez l'électricité excédentaire.
                                Vous agissez alors dans le cadre d'une activité
                                économique et vous accédez à la qualité
                                d'assujetti. Les ventes d'électricité
                                excédentaire et des CV correspondants sont
                                soumises à la taxe, sauf lorsque votre chiffre
                                d'affaires ne dépasse pas 5.580 euros par année
                                civile (application du régime de franchise prévu
                                à l'article 56, §2 du code de la TVA).
                                <a
                                    class="text-primary"
                                    href="https://www.brugel.brussels/themes/energies-renouvelables-11/vendre-les-certificats-verts-38"
                                    target="_blank"
                                    ><u
                                        >https://www.brugel.brussels/themes/energies-renouvelables-11/vendre-les-certificats-verts-38</u
                                    ></a
                                ></Paragraphe
                            >
                            <br />
                            <u><strong>Sur la vente de l’injection</strong></u>
                            <ul class="list-disc pl-[30px]">
                                <li>
                                    <i
                                        >Si vous avez une installation d’une
                                        puissance inférieure ou égale à 10 kVA
                                        et que vous n’avez pas de numéro TVA,
                                        vous n’êtes pas soumis aux obligations
                                        TVA pour vendre l’excédent de votre
                                        production. Un système de facturation
                                        simple peut être mis en place par le
                                        fournisseur à qui vous vendez votre
                                        électricité injectée.</i
                                    >
                                </li>
                                <li>
                                    <i
                                        >Si vous avez une installation d’une
                                        puissance de plus de 10 kVA ou que vous
                                        avez déjà un numéro de TVA, il vous
                                        incombe d’établir une facture pour la
                                        vente de l’électricité injectée. Vous
                                        êtes soumis aux obligations de TVA en
                                        vigueur.</i
                                    >
                                </li>
                            </ul>
                        </template>
                    </TabsCard>
                </div>
            </div>
        </MainCard>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { computed, ref, shallowRef, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import DefaultStep from './Step/Default.vue';
    import FileStep from './Step/File.vue';
    import NumberStep from './Step/Number.vue';
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';

    const route = useRoute();

    const isLoadGreenCertificate = ref<boolean>(true);
    const isLoadSubmit = ref<boolean>(false);
    const activatedStep = shallowRef();
    const params = ref<any>({ idTheProperty: route.params.id });
    const expectedNumber = ref<number>(0);
    const cmpList = ref<string[]>(['default']);
    const greenCertificateList = ref<any[]>([]);
    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + route.params.id,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Panneaux solaires',
        },
    ];
    const tabsDatas = [
        {
            tabName: 'tva',
            tabTitle: 'TVA',
        },
        {
            tabName: 'tax',
            tabTitle: 'Impôt des personnes physiques',
        },
    ];

    const expectedNumberComputing = computed(() => {
        if (expectedNumber.value === 0) {
            return 'N/A';
        } else if (expectedNumber.value < 5) {
            return `${2.7 * 1000}`;
        } else if (expectedNumber.value === 5 || expectedNumber.value < 36) {
            return `${2.5 * 1000}`;
        } else if (expectedNumber.value === 36 || expectedNumber.value < 100) {
            return `${2.1 * 1000}`;
        } else if (expectedNumber.value === 100 || expectedNumber.value < 250) {
            return `${2.5 * 1000}`;
        } else if (expectedNumber.value >= 250) {
            return `${2.5 * 1000}`;
        } else {
            return `${2.5 * 1000}`;
        }
    });

    const generalIncome = computed(() =>
        greenCertificateList.value.length
            ? `${greenCertificateList.value.length * 93} €`
            : 'N/A'
    );

    onMounted(() => {
        fetchGreenCertificate();
    });

    watch(
        () => cmpList.value,
        (lst) => {
            const choice = lst.at(-1) as string;
            handleChoice(choice);
            params.value = {
                ...params.value,
                type: choice,
            };
        },
        { immediate: true, deep: true }
    );

    watch(
        () => greenCertificateList.value,
        (gcList) => {
            expectedNumber.value = gcList.length;
        },
        { immediate: true, deep: true }
    );

    function handlePrev() {
        cmpList.value.pop();
        delete params.value.files;
        delete params.value.number;
    }

    function handleChoice(choice: string) {
        switch (choice) {
            case 'default':
                activatedStep.value = DefaultStep;
                break;
            case 'number':
                activatedStep.value = NumberStep;
                break;
            case 'file':
                activatedStep.value = FileStep;
                break;
        }
    }

    function handleInput(obj: any) {
        params.value = {
            ...params.value,
            ...obj,
        };
    }

    async function submit() {
        try {
            isLoadSubmit.value = true;
            const formdata = new FormData();
            Object.keys(params.value).forEach((key) => {
                if (key === 'files') {
                    params.value[key].forEach((item: any, index: number) => {
                        formdata.append(`files[${index}]`, item.originFileObj);
                    });
                } else {
                    formdata.append(key, params.value[key]);
                }
            });
            const { data } = await SupplierServices.postGreenCertificate(
                formdata
            );
            const { number, path } = data.data;
            if (number) {
                expectedNumber.value = number;
            } else {
                Object.values(path).forEach((item) => {
                    greenCertificateList.value = [
                        ...greenCertificateList.value,
                        item,
                    ];
                });
            }
            notification.success({ message: `Enegristré!` });
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, virifier les champs et reessayez`,
            });
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function fetchGreenCertificate() {
        try {
            const { data, code } = await SupplierServices.getGreenCertificate({
                idTheProperty: route.params.id,
            });
            const { files, number } = data;
            if (code === 200) {
                if (number) {
                    expectedNumber.value = number;
                } else {
                    Object.values(files).forEach((item) => {
                        greenCertificateList.value = [
                            ...greenCertificateList.value,
                            item,
                        ];
                    });
                }
            }

        } finally {
            isLoadGreenCertificate.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .green-card-content {
        .fade-step-enter-active,
        .fade-step-leave-active {
            @apply transition-all;
        }
        .fade-step-enter-from,
        .fade-step-leave-to {
            @apply translate-x-[200px] opacity-0;
        }
        @apply flex h-full flex-col gap-[20px];
        &__handling {
            @apply flex gap-x-[20px] items-center flex-wrap justify-center md:justify-between p-[20px] rounded-[8px] bg-gray mb-[10px];
            span {
                @apply text-primary font-semibold;
            }
        }
        &__step {
            @apply p-[10px] border border-gray rounded-[8px] overflow-hidden;
        }
        .btn__control {
            @apply flex justify-end gap-[10px] flex-wrap gap-y-[10px];
        }
    }
</style>
