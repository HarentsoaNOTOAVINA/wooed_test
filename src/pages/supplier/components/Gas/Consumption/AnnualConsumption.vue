<template>
    <Loader v-if="isLoadConsumptionData" />
    <div v-else>
        <transition name="fade-slide" mode="out-in" appear>
            <div class="annualConsumption__form" v-if="!consumptionDetails">
                <Select
                    name="rateType"
                    label="Type de tarif"
                    placeholder="Sélectionner une pièce d'identité"
                    :options="options"
                    class="annualConsumption__form-item"
                    @change-select="handleInput"
                />

                <div class="annualConsumption__form-wrap">
                    <InputDate
                        @handle-date-format="handleInputDateCategory"
                        name="startDate"
                        label="Date de debut du releve"
                    />
                    <Input
                        input-type="number"
                        @input="handleInputDateCategory"
                        :disabled="isDisableStart"
                        label="m3/kwh"
                        placeholder="0.00"
                        name-input="startQuantity"
                    />
                </div>
                <div class="annualConsumption__form-wrap">
                    <InputDate
                        @handle-date-format="handleInputDateCategory"
                        name="endDate"
                        label="Date de fin du releve"
                    />
                    <Input
                        input-type="number"
                        :disabled="isDisableEnd"
                        @input="handleInputDateCategory"
                        label="m3/kwh"
                        placeholder="0.00"
                        name-input="endQuantity"
                    />
                </div>
                <Input
                    input-type="number"
                    unity="€"
                    label="Coût de consommation"
                    placeholder="0.00"
                    name-input="consumptionCost"
                    @input="handleInput"
                    :value="params?.consumptionCost || ''"
                />
                <Alert v-if="simulationPriceResult"
                    ><span
                        >Dernierement vous avez effectué une simulation pour savoir votre
                        consomation, le resultat a été
                        <strong
                            >{{ simulationPriceResult.toFixed(2) }}€
                        </strong></span
                    ></Alert
                >
                <Switch
                    item-label="Je ne connais pas ma consommation annuelle"
                    name="annualConsumption"
                    @handle-switch="
                        router.push({
                            name: 'engie-simulation',
                            params: { id: route.params.id },
                        })
                    "
                />
                <div class="annualConsumption__table">
                    <div class="annualConsumption__table-header">
                        <span> MA CONSOMMATION ANNUEL </span>
                    </div>
                    <hr class="__hr" />
                    <table>
                        <tbody>
                            <tr class="annualConsumption__table-row">
                                <td>
                                    <span> Consommation </span>
                                </td>
                                <td>
                                    <span>
                                        {{ params?.annualConsumption || 0 }}
                                        m<sup>3</sup>/kwh
                                    </span>
                                </td>
                            </tr>
                            <tr class="annualConsumption__table-row">
                                <td>
                                    <span> Coût </span>
                                </td>
                                <td>
                                    <span>
                                        {{ params?.consumptionCost || '0.00' }}
                                        €
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="annualConsumption__operation">
                    <Button @click="sumbitConsumption" :is-load="isLoadSubmit"
                        >Enregistrez</Button
                    >
                </div>
            </div>
            <InfoConsume :consumption-details="consumptionDetails" v-else />
        </transition>
    </div>
</template>

<script lang="ts" setup>
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import { ref, watch, onMounted } from 'vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { notification } from 'ant-design-vue';
    import SupplierServices from '@/services/supplierService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import InfoConsume from './InfoConsume.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    interface Option {
        value: string;
        label: string;
    }

    interface Params {
        annualConsumption?: number;
        rateType?: string;
        consumptionCost?: number;
        statementStartYear: number;
        theProperty: number;
        energyType: string;
    }

    interface ParamsDate {
        startDate?: string;
        startQuantity?: number;
        endDate?: string;
        endQuantity?: number;
    }

    interface ConsumptionDetails {
        consumptionAnnual?: number;
        consumptionCost?: number;
        type?: string;
        annual?: number;
        rateType?: string;
    }

    const simulationPriceResult = ref<any>();
    const consumptionDetails = ref<ConsumptionDetails | null>(null);
    const paramsDate = ref<ParamsDate>({});
    const params = ref<Params | null>({
        energyType: store.getters['SupplierModule/getEnergyType'],
        theProperty: route.params.id as any,
        statementStartYear: new Date().getFullYear(),
    });
    const options = ref<Option[]>([
        {
            value: 'Online',
            label: 'Online',
        },
        {
            value: 'Top',
            label: 'Top',
        },
        {
            value: 'Tip',
            label: 'Tip',
        },
        {
            value: 'eMobility',
            label: 'eMobility',
        },
    ]);
    const isDisableStart = ref<boolean>(true);
    const isDisableEnd = ref<boolean>(true);
    const isLoadSubmit = ref<boolean>(false);
    const isLoadConsumptionData = ref<boolean>(false);

    onMounted(() => {
        getConsumptionData();
        getEngieSimulationResult();
    });

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
                    case 'startQuantity':
                        params.value = {
                            ...params.value,
                            annualConsumption: !!paramsDate.value.endQuantity
                                ? (obj[k] as any) +
                                  paramsDate.value?.endQuantity
                                : obj[k],
                        } as Params;
                        break;
                    case 'endQuantity':
                        params.value = {
                            ...params.value,
                            annualConsumption: !!paramsDate.value.startQuantity
                                ? (obj[k] as any) +
                                  paramsDate.value?.startQuantity
                                : obj[k],
                        } as Params;
                        break;
                    default:
                        break;
                }
            });
        },
        { deep: true }
    );

    function handleInput(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        params.value = {
            ...params.value,
            [k]: Number.isNaN(+v) ? v : +v,
        } as Params;
    }

    function handleInputDateCategory(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        paramsDate.value = {
            ...paramsDate.value,
            [k]: v.includes('undefined') ? '' : Number.isNaN(+v) ? v : +v,
        } as ParamsDate;
    }

    async function sumbitConsumption() {
        try {
            isLoadSubmit.value = true;
            const res = await SupplierServices.postConsumption(
                params.value as any
            );
            const { data } = res;
            if (data) {
                consumptionDetails.value = data.data;
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

    async function getConsumptionData() {
        try {
            isLoadConsumptionData.value = true;
            const { data, code } = await SupplierServices.getConsumption({
                theProperty: route.params.id,
                energyType: store.getters['SupplierModule/getEnergyType'],
            });
            if (code === 200) {
                consumptionDetails.value = Array.isArray(data)
                    ? data.at(-1)
                    : data;
            }

            console.log(consumptionDetails.value, 'result');
        } finally {
            isLoadConsumptionData.value = false;
        }
    }

    async function getEngieSimulationResult() {
        try {
            const { data, code } =
                await SupplierServices.getEngieSimulationChoice({
                    theProperty: route.params.id,
                    consumptionType:
                        store.getters['SupplierModule/getEnergyType'],
                });
            if (code === 200) {
                simulationPriceResult.value = data.price * 12;
                params.value = {
                    ...params.value,
                    consumptionCost: (data.price * 12).toFixed(2)
                } as any
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style lang="scss" scoped>
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        @apply transition-all;
    }
    .fade-slide-enter-active,
    .fade-slide-enter-active {
        @apply translate-x-[-100px] opacity-0;
    }
    .annualConsumption {
        &__form {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .date__space {
                    gap: 0 !important;
                }
                .date__label {
                    @apply mb-[10px];
                }
                label {
                    @apply font-[600];
                }
            }
        }
        &__form-wrap {
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
        &__table {
            @apply bg-gray flex flex-col gap-[18px] p-[18px] rounded-[8px];
            .__hr {
                @apply text-white;
            }
            &-header {
                @apply uppercase;
            }
            &-row {
                td {
                    @apply pb-[8px];
                }
                td:last-child {
                    @apply font-[600] text-right pb-0;
                }
            }
        }
        &__operation {
            @apply flex justify-end;
            &:deep() {
                div,
                button {
                    @apply w-full md:w-auto flex justify-center;
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
