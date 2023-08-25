<template>
    <div class="bank-simulation__container">
        <transition name="fade-step" mode="out-in">
            <keep-alive>
                <Component
                    :is="currentStep"
                    @on-handle-params="handleParams"
                    :have-partener="havePartener"
                    :simulation-result="simulationResult"
                    @on-chosen-bank="handleChosenBank"
                />
            </keep-alive>
        </transition>
        <div class="bank-simulation__btn-control">
            <div class="bank-simulation__btn-control--wrapper">
                <Button v-if="step !== 0 && step !== 4" @click="prevHandler"
                    >Précédent</Button
                >
                <Button
                    :disabled="!isAllowedNext"
                    v-if="step !== 3 && step !== 4"
                    @click="nextHandler"
                    >Suivant</Button
                >
                <Button
                    class="flex gap-[10px] align-middle"
                    v-else-if="step === 3"
                    @click="submitHandler"
                >
                    <LoadingButton v-if="isLoadSubmit" size="xs" />
                    Simulation</Button
                >
                <Button v-else-if="step === 4" @click="resetSimulation"
                    >Recommencez la simulation</Button
                >
                <!-- disable on DEBUBING PURPOSE ONLY -->
                <!-- :disabled="!isAllowedNext" -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { computed, ref, shallowRef, watch, onMounted } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Project from './Step/Project.vue';
    import PersonnalData from './Step/PersonnalData.vue';
    import Revenue from './Step/Revenue.vue';
    import Expenses from './Step/Expenses.vue';
    import Result from './Result/Result.vue';
    import FinancialService from '@/services/FinancialService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';

    const currentStep = shallowRef<any>(null);
    const step = ref<number>(0);
    const params = ref<any>({
        creditForm: 'Fixe',
    });
    const isLoadSubmit = ref<boolean>(false);
    const simulationResult = ref<TypeSimulationResult[]>([]);

    const props = defineProps<{
        totalCreditAmount: object;
    }>();

    onMounted(() => {
        params.value = {
            ...params.value,
            ...props.totalCreditAmount,
        };
    });
    watch(
        () => step.value,
        (v) => {
            switch (v) {
                case 0:
                    currentStep.value = Project;
                    break;
                case 1:
                    currentStep.value = PersonnalData;
                    break;
                case 2:
                    currentStep.value = Revenue;
                    break;
                case 3:
                    currentStep.value = Expenses;
                    break;
                case 4:
                    currentStep.value = Result;
                    break;
            }
        },
        {
            immediate: true,
        }
    );

    const havePartener = computed(() => {
        if (params.value) {
            return (
                (params.value.maritalStatus === 'marié' ||
                    params.value.maritalStatus === 'cohabitant légal') &&
                params.value.loanAloneOrWithPartener === 'Mon partenaire et moi'
            );
        }
    });

    const controlStepOneValidity = computed(() => {
        if (params.value)
            return (
                !!params.value.dwellingType &&
                !!params.value.locationPurpose &&
                !!params.value.totalCreditAmount &&
                !!params.value.year
            );
    });

    const controlStepTwoValidity = computed(() => {
        if (params.value)
            return (
                !!params.value.maritalStatus &&
                !!params.value.loanAloneOrWithPartener &&
                !!params.value.dependentsNb &&
                !!params.value.ownerDateBirth &&
                !!params.value.residentialSituation
            );
    });

    const controlStepThreeValidity = computed(
        () =>
            params.value.employer &&
            params.value.occupation &&
            params.value.dateFrom
    );

    const isAllowedNext = computed(() => {
        if (params.value) {
            return (
                (step.value === 0 && controlStepOneValidity.value) ||
                (step.value === 1 && controlStepTwoValidity.value) ||
                (step.value === 2 && controlStepThreeValidity.value)
            );
        }
    });
    const emit = defineEmits<{
        (fn: 'on-chosen-bank', v: any): void;
    }>();

    function handleChosenBank(bank: any) {
        emit('on-chosen-bank', bank);
    }

    function prevHandler() {
        step.value--;
    }
    function nextHandler() {
        step.value++;
    }
    function handleParams(param: any) {
        params.value = { ...params.value, ...param };
    }
    async function submitHandler() {
        isLoadSubmit.value = true;
        let parsedObj = {};
        Object.keys(params.value).forEach((key) => {
            parsedObj = {
                ...parsedObj,
                [key]: Number.isNaN(+params.value[key])
                    ? params.value[key]
                    : +params.value[key],
            };
        });
        console.log(parsedObj, "ddddddddddddd");
        

        try {
            const { data } = await FinancialService.simulateBank(parsedObj);
            step.value = 4;
            simulationResult.value = data.data
                .map((item: any) => {
                    if (typeof item !== 'string') {
                        return item;
                    }
                })
                .filter((item: any) => item);
        } catch (error) {
            notification.error({
                message: "Une erreur s'est produite, veuillez réessayez",
            });
        } finally {
            isLoadSubmit.value = false;
        }
    }
    function resetSimulation() {
        step.value = 0;
        currentStep.value = Project;
    }
</script>
<style lang="scss" scoped>
    .bank-simulation {
        &__container {
            @apply overflow-hidden;
            &:deep() {
                hr {
                    @apply text-[var(--color-stroke-gray)] mb-[10px];
                }
            }
            @apply p-[20px] rounded-[8px] border border-[var(--color-primary)] my-[10px];
            .fade-step-enter-active,
            .fade-step-leave-active {
                @apply transition-all;
            }
            .fade-step-enter-from,
            .fade-step-leave-to {
                @apply translate-x-[-200px] opacity-0;
            }
        }
        &__btn-control {
            @apply flex justify-end;
            &--wrapper {
                @apply flex gap-[10px];
            }
        }
    }
</style>
