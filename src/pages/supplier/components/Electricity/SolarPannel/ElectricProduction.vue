<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <Loader v-if="isLoadPage" />
            <div v-else class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Production électrique"
                    class="supplier-work__head-title"
                />
                <hr class="__hr" />

                <div class="form-wrap">
                    <div class="element">
                        <Paragraphe>Production effective </Paragraphe>
                        <hr class="element__hr" />
                        <Paragraphe
                            ><Alert v-if="!counterSolarConsumption"
                                ><span
                                    >Vous pouver ajouter un/des rélévé(s) dans la section "Panneaux solaires/Mon compteur ..."</span
                                ></Alert
                            ><template v-else
                                >{{ counterSolarConsumption }} Kwh</template
                            ></Paragraphe
                        >
                    </div>
                    <div class="element">
                        <Paragraphe>Production moyenne attendue</Paragraphe>
                        <hr class="element__hr" />
                        <Alert v-if="!hasPotentialComputing"
                            ><span
                                >Vous pouvez calculer votre potentiel de surface
                                dans la section "Installation/Calculez votre potentiel sur la carte solaire"</span
                            ></Alert
                        >
                        <template v-else>
                            <Paragraphe
                                ><strong>MIN:</strong>
                                {{ separatorHandleFloat(minProd) }}
                                Kwh</Paragraphe
                            >
                            <Paragraphe
                                ><strong>MAX:</strong>
                                {{ separatorHandleFloat(maxProd) }}
                                Kwh</Paragraphe
                            >
                        </template>
                    </div>
                </div>
                <Alert v-if="!counterElecConsumption">
                    Vos relevés de compteur éléctrique sont encore vide, voir la section "Raccordement à l'éléctricité/Mon compteur"
                </Alert>
                <Title
                    type="h4"
                    weight="400"
                    label="Ma consommation électrique nette"
                    class="supplier-work__title"
                />
                <hr class="__hr" />
                <div class="element">
                    <Paragraphe>Ma consommation</Paragraphe>
                    <hr class="element__hr" />
                    <div class="element__items">
                        <Paragraphe
                            >Consommation enregistrée par mon compteur
                            électrique</Paragraphe
                        >
                        <Paragraphe v-if="counterElecConsumption"
                            >{{ counterElecConsumption }} kwh</Paragraphe
                        >
                        <Paragraphe v-else>N/A</Paragraphe>
                    </div>
                    <div class="element__items">
                        <Paragraphe
                            >Production enregistrée par mon compteur (panneaux
                            solaire)</Paragraphe
                        >
                        <Paragraphe v-if="counterSolarConsumption"
                            >{{ counterSolarConsumption }} kwh</Paragraphe
                        >
                        <Paragraphe v-else>N/A</Paragraphe>
                    </div>
                    <div class="element__items">
                        <Paragraphe>Consommation électrique nette</Paragraphe>
                        <Paragraphe v-if="netConsumption">{{ netConsumption }} kwh</Paragraphe>
                        <Paragraphe v-else>N/A</Paragraphe>
                    </div>
                </div>
                <div v-if="hasOverbondingElec" class="alert-btn">
                    <Alert
                        >Votre production électrique dépasse votre consommation
                        électrique. Vous pourriez avoir intérêt à partager
                        l’énergie excédentaire produite</Alert
                    >
                    <Button>Partager l'électricité surabondante</Button>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import { useRoute } from 'vue-router';
    import { computed, ref, onMounted, watch } from 'vue';
    import SupplierServices from '@/services/supplierService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const hasOverbondingElec = ref<boolean>(false);
    const counterSolarConsumption = ref<any>();
    const counterElecConsumption = ref<any>();
    const hasPotentialComputing = ref<boolean>(false);
    const potentialComputing = ref<{
        greatPotential: any;
        goodPotential: any;
    }>();
    const isLoadPage = ref<boolean>(false);
    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Panneaux solaires',
        },
    ];

    onMounted(() => {
        getInitData();
    });

    

    const minProd = computed(
        () =>
            +potentialComputing.value?.greatPotential * 900 +
            +potentialComputing.value?.goodPotential * 700
    );

    const maxProd = computed(
        () =>
            +potentialComputing.value?.greatPotential * 1100 +
            +potentialComputing.value?.goodPotential * 900
    );

    const netConsumption = computed(() => {
        const x = counterElecConsumption.value ?? 0;
        const y = counterSolarConsumption.value ?? 0;
        return +x - +y;
    });

    watch(() => netConsumption.value, (v) => {
        hasOverbondingElec.value = v < 0;
    });

    async function getInitData() {
        isLoadPage.value = true;
        getCounterMetaData('electricity')
            .then((res) => getCounterStatement(res as number, 'electricity'))
            .then(() => getCounterMetaData('solar'))
            .then((res) => getCounterStatement(res as number, 'solar'))
            .then(() => getPotentialComputing())
            .then(() => {
                isLoadPage.value = false;
            });
    }

    function getCounterMetaData(counterType: string) {
        return new Promise(async (res: any, rej) => {
            try {
                const { data, code } =
                    await SupplierServices.getCounterMetaData({
                        theProperty: theProperty.value,
                        energyType: counterType,
                        thePropertyProvider: 1,
                    });
                if (code === 200) {
                    /**
                     * if found data => pass counter ID to next promise and exec api call
                     */
                    res(data.id);
                } else {
                    /**
                     * else also pass on next promise but dont exec api call
                     */
                    res();
                }
            } catch (error) {
                rej(error);
            }
        });
    }
    function getCounterStatement(counterId: number, counterType: string) {
        return new Promise(async (res: any, rej) => {
            /**
             * control if api call is needed or not
             */
            if (counterId) {
                try {
                    const { data, code } =
                        await SupplierServices.getCounterStatement({
                            thePropertyCounter: counterId,
                            theProperty: theProperty.value,
                            energyType: counterType,
                        });
                    if (code === 200) {
                        const lastStatement = data.at(-1);
                        const { consumption } = lastStatement;
                        if (counterType === 'solar') {
                            counterSolarConsumption.value = consumption;
                        } else if (counterType === 'electricity') {
                            counterElecConsumption.value = +consumption;
                        }
                    }
                    res(counterId);
                } catch (error) {
                    rej(error);
                }
            } else {
                /**
                 * directly move on next promise
                 */
                res();
            }
        });
    }
    function getPotentialComputing() {
        return new Promise(async (res: any, rej) => {
            try {
                const { data, code } =
                    await SupplierServices.getPotentialComputingList({
                        theProperty: theProperty.value,
                    });

                if (data.length) {
                    hasPotentialComputing.value = true;
                    potentialComputing.value = data[0];
                }
                res();
            } catch (error) {
                rej(error);
            }
        });
    }
</script>

<style lang="scss" scoped>
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
            &:deep() {
                .alert__content {
                    @apply flex flex-col gap-[10px];
                    button,
                    div {
                        @apply w-full;
                    }
                }
            }
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
        &__title {
            color: var(--color-primary);
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &--connection {
                @apply flex justify-between items-center;
            }
            &--consumption {
                @apply flex items-center gap-[4px] p-[7px] rounded-[4px] bg-gray text-primary cursor-pointer;
            }
        }
        &__item-supplier {
            @apply flex justify-between items-center px-[14px] py-[12px] rounded-[4px] bg-gray;
            &:deep() {
                button {
                    @apply text-[10px] px-[14px] py-[4px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
    .form-wrap {
        @apply grid grid-cols-1 gap-[18px];
        @screen sm {
            @apply grid grid-cols-2;
        }
        @screen md {
            @apply grid grid-cols-1;
        }
        @screen lg {
            @apply grid grid-cols-2;
        }
    }
    .element {
        @apply w-full rounded-[8px] flex flex-col gap-[18px];
        background-color: var(--color-gray);
        padding: 14px 18px;
        &__hr {
            @apply text-white;
        }
        &__items {
            @apply flex justify-between;
        }
    }
    .alert-btn {
        @apply w-full flex flex-col gap-[18px] items-end;
    }
</style>
