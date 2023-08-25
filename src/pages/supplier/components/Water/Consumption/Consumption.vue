<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <div class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Ma consommation d'eau"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />

                <div class="form-wrap">
                    <InputDate
                        name="startDate"
                        label="Date de début du relevé"
                        @handle-date-format="handleInputDateCategory"
                    />
                    <Input
                        name-input="startConsumption"
                        input-type="text"
                        :disabled="isDisableStart"
                        label="m3/kwh"
                        placeholder="0.00"
                        @input="handleInputDateCategory"
                    />
                </div>
                <div class="form-wrap">
                    <InputDate
                        name="endDate"
                        :disable="isDisableStart"
                        label="Date de fin du relevé (+1an)"
                        @handle-date-format="handleInputDateCategory"
                    />
                    <Input
                        name-input="endConsumption"
                        input-type="text"
                        :disabled="isDisableEnd"
                        label="m3/kwh"
                        placeholder="0.00"
                        @input="handleInputDateCategory"
                    />
                </div>

                <Paragraphe
                    >Ma consommation annuelle s’élève à:
                    <b>{{ params?.annualConsumption || '0.00' }}</b>
                    m3/kwh</Paragraphe
                >
                <Input
                    name-input="annualCostConsumption"
                    label="Le cout de ma consommation annuelle s'élève à:"
                    placeholder="00.0"
                    unity="€"
                    input-type="text"
                    @input="handleInput"
                    :value="params?.annualCostConsumption"
                />
                <Switch
                    item-label="Je ne connais pas le cout de ma consommation en eau"
                    @handle-switch="
                        isDisplayWaterSimulation = !isDisplayWaterSimulation
                    "
                />

                <div v-if="isDisplayWaterSimulation" class="water-simulation">
                    <Select
                        label="Nombre d'enfant"
                        name="kidNb"
                        :options="
                            Array.from(new Array(10), (_, i) => ({
                                label: i + 1,
                                value: i + 1,
                            }))
                        "
                        placeholder="Selectionnez"
                        @change-select="handleChange"
                    />
                    <Select
                        label="Nombre d'adulte"
                        name="adultNb"
                        :options="
                            Array.from(new Array(10), (_, i) => ({
                                label: i + 1,
                                value: i + 1,
                            }))
                        "
                        placeholder="Selectionnez"
                        @change-select="handleChange"
                    />
                </div>

                <div class="btn">
                    <Button type-button="primary" @click="sumbitConsumption"
                        >Envoyer</Button
                    >
                </div>
                <Collapse :collapseData="collapseData" />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Collapse from '@/components/Display/Collapse/Collapse.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import CloseWaterInstallation from './CloseWaterInstallation.vue';
    import HighConsumption from './HighConsumption.vue';
    import ReduceWaterBill from './ReduceWaterBill.vue';
    import Invoice from './Invoice/Invoice.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, ref, watch } from 'vue';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const AVERAGE_WATER_PRICE = 4.14;
    const simulationParams = ref<any>({
        kidNb: 0,
        adultNb: 0,
        amount: 0,
    });
    const isDisplayWaterSimulation = ref<boolean>(false);
    const collapseData = [
        {
            title: 'Mon compteur présente une très forte consommation',
            content: HighConsumption,
        },
        {
            title: 'Mon bien est inoccupé et je souhaite fermer l’installation d’eau',
            content: CloseWaterInstallation,
        },
        {
            title: 'Mes factures',
            content: Invoice,
        },
        {
            title: 'Diminuer ma facture d’eau',
            content: ReduceWaterBill,
        },
    ];

    const props = defineProps<{
        supplier: string;
    }>();

    interface Params {
        annualConsumption?: string;
        annualCostConsumption?: string | number;
        theProperty: string;
        // energyType: string;
    }

    interface ParamsDate {
        startDate?: string;
        startConsumption?: string;
        endDate?: string;
        endConsumption?: string;
    }

    const isDisableStart = ref<boolean>(true);
    const isDisableEnd = ref<boolean>(true);
    const isLoadSubmit = ref<boolean>(false);

    const params = ref<Params | null>({
        // energyType: 'water',
        theProperty: theProperty.value as any,
    });

    const paramsDate = ref<ParamsDate>({});

    watch(
        () => paramsDate.value,
        (obj) => {
            Object.keys(obj as Params).forEach((k) => {
                switch (k) {
                    case 'startDate':
                        isDisableStart.value = obj[k] === '';
                        break;
                    case 'endDate':
                        isDisableEnd.value = obj[k] === '';
                        break;
                    case 'startConsumption':
                        let startConsuptionValue = parseInt(obj[k] as string);
                        // let startConsuptionValue = Number.isNaN(obj[k]) ? (obj[k]) : parseInt(obj[k] as string);
                        
                        params.value = {
                            ...params.value,
                            annualConsumption: !!paramsDate.value.endConsumption
                                ? String(
                                      startConsuptionValue +
                                          parseInt(
                                              paramsDate.value?.endConsumption
                                          )
                                  )
                                : String(startConsuptionValue),
                        } as Params;
                        break;
                    case 'endConsumption':
                        let endConsumptionValue = parseInt(obj[k] as string);
                        // let endConsumptionValue = Number.isNaN(obj[k]) ? (obj[k]) : parseInt(obj[k] as string);
                        
                        params.value = {
                            ...params.value,
                            annualConsumption: !!paramsDate.value
                                .startConsumption
                                ? String(
                                      endConsumptionValue +
                                          parseInt(
                                              paramsDate.value?.startConsumption
                                          )
                                  )
                                : String(endConsumptionValue),
                        } as Params;
                        break;
                    default:
                        break;
                }
            });
        },
        { deep: true }
    );

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
    ];

    function handleInputDateCategory(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        paramsDate.value = {
            ...paramsDate.value,
            [k]: v,
            // [k]: v.includes('undefined') ? '' : Number.isNaN(+v) ? v : +v,
        } as ParamsDate;
        console.log(k, '==', v, 'params = ', paramsDate.value);
    }

    function handleInput(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        params.value = {
            ...params.value,
            [k]: v,
            // [k]: Number.isNaN(+v) ? v : +v,
        } as Params;
    }

    function handleChange(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        simulationParams.value = {
            ...simulationParams.value,
            [k]: +v,
        };
        params.value = {
            ...params.value,
            annualCostConsumption: +(
                (simulationParams.value.kidNb * 20 +
                    simulationParams.value.adultNb * 50) *
                AVERAGE_WATER_PRICE
            ).toFixed(2),
        } as any;
    }

    async function sumbitConsumption() {
        const dataParams = {
            ...params.value,
            ...paramsDate.value,
        };
        try {
            isLoadSubmit.value = true;
            const res = await SupplierServices.postWaterConsumption(dataParams);
            const { data } = res;
            if (data) {
                // consumptionDetails.value = data.data;
            }
            console.log(data);
        } catch (error) {
            notification.error({
                message: "Une erreur s'est produite. Veuillez reésayer",
            });
        } finally {
            isLoadSubmit.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
            .btn {
                @apply flex justify-end;
                &:deep() {
                    div,
                    button {
                        @apply w-full;
                    }
                    div {
                        @apply md:w-auto;
                    }
                }
            }
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
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
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
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
</style>
