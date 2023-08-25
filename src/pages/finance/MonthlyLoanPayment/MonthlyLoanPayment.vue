<template>
    <div class="monthly-loan">
        <finance-card label-title="Mensualité du crédit">
            <Loader v-if="isLoadChosenBank" />
            <div v-else class="monthly-loan__content mt-[10px]">
                <transition appear name="fade-appear" mode="out-in">
                    <div v-if="chosenBank" class="mb-[10px]">
                        <div class="monthly-loan__content__details">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Banque</th>
                                        <th>Durée en mois</th>
                                        <th>Montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {{
                                                !!chosenBank.bank &&
                                                chosenBank.bank.toUpperCase()
                                            }}
                                        </td>
                                        <td>{{ monthlyCredit }}</td>
                                        <td>
                                            {{
                                                !!chosenBank.totalCreditAmount &&
                                                separatorHandleFloat(
                                                    (
                                                        chosenBank.totalCreditAmount as number
                                                    )?.toFixed(2)
                                                )
                                            }}
                                            €
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="monthly-loan__content__result">
                            <strong class="monthly-loan__content__result__label"
                                >Crédit mensuel :
                            </strong>
                            <span class="monthly-loan__content__result__value"
                                >{{
                                    monthlyCreditAmount &&
                                    separatorHandleFloat(
                                        (
                                            monthlyCreditAmount as number
                                        )?.toFixed(2)
                                    )
                                }}
                                €</span
                            >
                        </div>
                        <hr class="my-[20px] text-[var(--color-stroke-gray)]" />
                    </div>
                </transition>
                <Input
                    :required="true"
                    label="Prix offert (€)"
                    placeholder="0.00 €"
                    name-input="totalCreditAmount"
                    @input="handleInput"
                />
                <Switch
                    :disabled="!isShowCondition"
                    name="isConditionChecked"
                    item-label="Je remplis les conditions de l’abattement fiscal"
                    @handle-switch="
                        () => {
                            isShowSimulation = !isShowSimulation;
                        }
                    "
                />
                <transition appear name="fade-appear" mode="out-in">
                    <Simulation
                        :total-credit-amount="params"
                        v-if="isShowSimulation"
                        @on-chosen-bank="handleChosenBank"
                    />
                </transition>
            </div>
        </finance-card>
    </div>
</template>
<script lang="ts" setup>
    /**
     * TO DO: HANDLE MUNICIPALITY
     */
    import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Simulation from './Simulation/Simulation.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { ref, onMounted, computed } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import { useRoute } from 'vue-router';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    interface TypeBank {
        purpose: string;
        habitation: string;
        borrowPrice: number;
        year: number;
        creditForm: string;
        monthlyPayment: number;
        interestRate: number;
        taeg: number;
        creditAmount: number;
        totalCreditAmount: number;
        bank: string;
        theProperty: number;
    }

    const route = useRoute();

    const params = ref<any>(null);
    const isShowSimulation = ref<boolean>(false);
    const isShowCondition = ref<boolean>(false);
    const chosenBank = ref<TypeBank | null>(null);
    const isLoadChosenBank = ref<boolean>(false);

    onMounted(() => {
        getChoosenBank();
    });

    function handleChosenBank(bank: TypeBank) {
        chosenBank.value = bank;
    }

    async function getChoosenBank() {
        isLoadChosenBank.value = true;
        try {
            const { data, code } = await FinancialService.getChosenBank({
                theProperty: route.params.id,
            });
            chosenBank.value = code !== 400 ? data : null;
        } finally {
            isLoadChosenBank.value = false;
        }
    }

    const monthlyCredit = computed(() => {
        return chosenBank.value ? chosenBank.value.year * 12 : null;
    });
    const monthlyCreditAmount = computed(() => {
        return monthlyCredit.value && chosenBank.value
            ? chosenBank.value.totalCreditAmount / monthlyCredit.value
            : null;
    });

    function handleInput(evt: any) {
        const [k, v] = Object.entries(evt)[0] as any;
        isShowCondition.value = !!v;
        params.value = {
            [k]: +v,
        };
    }
</script>
<style lang="scss" scoped>
    .monthly-loan {
        .fade-appear-enter-active,
        .fade-appear-leave-active {
            @apply transition-all;
        }
        .fade-appear-enter-from,
        .fade-appear-leave-to {
            @apply translate-x-[-200px];
        }
        @apply w-full;
        &__content {
            &__details {
                table {
                    @apply bg-gray w-full rounded-[8px];
                    border-collapse: collapse;
                    thead {
                        tr {
                            border: 1px solid transparent;
                            border-bottom-color: #fff;
                        }
                    }
                    td,
                    th {
                        @apply p-[15px];
                    }
                    th:nth-child(3),
                    td:nth-child(3) {
                        @apply text-right;
                    }

                    th:nth-child(2),
                    td:nth-child(2) {
                        @apply text-center;
                    }

                    th:nth-child(1),
                    td:nth-child(1) {
                        @apply text-left;
                    }
                }
                @apply mb-[20px];
            }
            &__result {
                @apply p-[20px] bg-gray flex justify-between items-center text-[var(--color-primary)] rounded-[8px];
                &__value {
                    font-size: 18px;
                    font-weight: 500;
                }
            }
        }
    }
</style>
