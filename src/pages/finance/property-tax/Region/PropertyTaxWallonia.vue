<script setup lang="ts">
    import { ref } from 'vue';
    import useCmp from './useCmp';
    import ReductionWallonia from './Reduction/ReductionWallonia.vue';
    import ExceptionWallonia from './Exception/ExceptionWallonia.vue';
    import Demande from './Demande/Demande.vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import { Collapse, CollapsePanel } from 'ant-design-vue';

    let {
        FinanceCard,
        InfoModal,
        InputDate,
        Loader,
        Paragraphe,
        handleCalculate,
        handleChange,
        modalHandler,
        precountAmountHandler,
        modalType,
        isShowModal,
        finalDataForm,
        dataPrecount,
        modesteHouse,
        showHandicapInput,
        childAllocatedFamily,
        valueAmount,
        params,
        unproductivityDuration,
        isShowDependentChildren,
        isShowDisabledChildrenCondition,
        isShowOtherDependentOfYourFamilyNb,
    }: any = useCmp();

    const activeKey = ref<Array<string>>([]);

    function getExceptionJsonValue(json: string) {
        params.value = {
            ...params.value,
            exception: json,
        };
    }
</script>

<template>
    <div class="tax__container">
        <InfoModal
            :modal-type="modalType"
            :is-show="isShowModal"
            @close-modal="
                () => {
                    isShowModal = false;
                }
            "
        />
        <FinanceCard
            label-title="Précompter immobilier"
            label-button="Calculer"
            @calculate="handleCalculate"
            :property-tax="finalDataForm"
            @on-send-property-tax-value-amount="precountAmountHandler"
        >
            <div
                v-if="!dataPrecount"
                class="relative h-full tax__container__loading"
            >
                <Loader />
            </div>
            <template v-else>
                <div class="property-tax__items">
                    <div class="property-tax__field-wrap">
                        <div class="property-tax__form-item-wrap">
                            <label>
                                <span> Montant de base </span>
                            </label>
                            <Paragraphe class="property-tax__basic-amount">
                                <span>
                                    {{
                                        separatorHandleFloat(
                                            dataPrecount.basicAmount
                                        )
                                    }}
                                </span>
                                <span> € </span>
                            </Paragraphe>
                        </div>
                        <div class="property-tax__form-item-wrap">
                            <label>
                                <span> Prochaine échéance </span>
                            </label>
                            <InputDate
                                name="nextDueDate"
                                class="property-tax__form-item"
                                @handle-date-format-en="handleChange"
                            />
                        </div>
                    </div>
                </div>
                <collapse accordion v-model:active-key="activeKey">
                    <collapse-panel header="J'ai droit à une exception">
                        <ExceptionWallonia
                            @on-get-json-value="getExceptionJsonValue"
                        />
                    </collapse-panel>
                    <collapse-panel header="J'ai droit à une reduction">
                        <ReductionWallonia
                            :child-allocated-family="childAllocatedFamily"
                            :show-handicap-input="showHandicapInput"
                            :modeste-house="modesteHouse"
                            :unproductivity-duration="unproductivityDuration"
                            @on-modal-handled="modalHandler"
                            @on-handle-change="handleChange"
                            :is-show-dependent-children="
                                isShowDependentChildren
                            "
                            :is-show-disabled-children-condition="
                                isShowDisabledChildrenCondition
                            "
                            :is-show-other-dependent-of-your-family-nb="
                                isShowOtherDependentOfYourFamilyNb
                            "
                        />
                    </collapse-panel>
                </collapse>

                <Demande
                    v-if="valueAmount !== null"
                    :value-amount="valueAmount"
                    @on-modal-handled="modalHandler"
                />
            </template>
        </FinanceCard>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/style.scss';
    @import '@/assets/style/precompte.scss';
    table {
        border-collapse: collapse;
    }
    td,
    th {
        border: 1px solid var(--color-primary);
        @apply p-[10px];
    }
    th {
        @apply bg-gray;
    }
    .options {
        @apply bg-gray p-[10px];
        border-radius: 8px;
        &__label {
            font-weight: 400 !important;
        }
    }
</style>
