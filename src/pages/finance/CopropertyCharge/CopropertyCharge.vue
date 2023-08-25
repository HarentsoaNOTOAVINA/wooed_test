<template>
    <FinanceCard
        label-title="Charge de copropriété"
        label-button="Calculer"
        :fieldRequired="true"
        :coproperty-datas="finalDataForm"
    >
        <div class="coproperty__items">
            <div class="coproperty__form-item-wrap label__flex">
                <label>
                    <span> Année : </span>
                </label>
                <Select
                    name="years"
                    placeholder="2022"
                    class="coproperty__form-item"
                />
            </div>
        </div>
        <hr class="__hr" />
        <!-- FORM -->
        <CopropretyForm
            :factureList="ordinaryDataList"
            type="ordinary"
            @on-add-facture="addFactureHndler"
            @on-delete-facture="onDeleteFactureItem"
            @on-field-changed="handleFieldsValue"
        />
        <CopropretyForm
            :factureList="extraOrdinaryDataList"
            type="extraordinary"
            @on-add-facture="addFactureHndler"
            @on-delete-facture="onDeleteFactureItem"
            @on-field-changed="handleFieldsValue"
        />
        <div class="coproperty__items coproperty__table--container">
            <Title
                type="h4"
                label="ETAT ACTUEL DE MES DEPENSES"
                :weight="600"
                class="coproperty__table--title"
            />
            <hr class="__hr" />
            <table class="coproperty__table--item table-auto">
                <tbody class="coproperty__table--body">
                    <tr class="block">
                        <td>Depuis le</td>
                        <!-- <td>01 JANVIER 2021</td> -->
                        <InputDate
                            name="dateFilter"
                            @handle-date-format="handleFilterDate"
                        />
                    </tr>
                    <template v-if="!isLoadFilterHndlr">
                        <tr class="coproperty__table--row">
                            <td>Charge ordinaire</td>
                            <td>{{ordinaryFilteredAmount.toLocaleString()}} €</td>
                        </tr>
                        <tr class="coproperty__table--row">
                            <td>Charge extraordinaire</td>
                            <td>{{extraordinaryFilteredAmount.toLocaleString()}} €</td>
                        </tr>
                    </template>
                    <div v-else class="loader__ctn relative h-[100px]">
                        <Loader />
                    </div>
                </tbody>
            </table>
        </div>
    </FinanceCard>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import FinanceCard from '@/pages/finance/components/FinanceCard/FinanceCard.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { computed, ref, watch } from 'vue';
    import CopropretyForm from './CopropertyForm/CopropertyForm.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Financial from '@/services/FinancialService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useStore } from 'vuex';

    interface TypesFilterResult {
        id: number;
        type: string;
        invoice: string;
        invoicePath: string;
        date: string;
        amount: number;
    }

    const store = useStore();
    const engageFiltering = ref<boolean>(false);
    const isLoadFilterHndlr = ref<boolean>(false);
    const filterRes = ref<Array<TypesFilterResult>>([]);
    const DEFAULT_VALUE: TypesData = {
        id: 0,
        invoiceFile: null,
        date: null,
        amount: 0,
    };
    const ordinaryDataList = ref<Array<TypesData>>([
        {
            type: 'ordinary',
            ...DEFAULT_VALUE,
        },
    ]);
    const extraOrdinaryDataList = ref<Array<TypesData>>([
        {
            type: 'extraordinary',
            ...DEFAULT_VALUE,
        },
    ]);
    const finalDataForm = ref<Array<TypesData>>([
        ...extraOrdinaryDataList.value,
        ...ordinaryDataList.value,
    ]);

    const thePropertyId = computed(
        () => store.getters['FinancialModule/getChoosenProperty'].id
    );

    const ordinaryFilteredAmount = computed(() => {
        if (!filterRes.value.length) {
            return 0;
        } else {
            return filterRes.value
                .filter((item) => item.type === 'ordinary')
                .reduce((cum, curr) => cum + curr.amount, 0);
        }
    });

    const extraordinaryFilteredAmount = computed(() => {
        if (!filterRes.value.length) {
            return 0;
        } else {
            return filterRes.value
                .filter((item) => item.type === 'extraordinary')
                .reduce((cum, curr) => cum + curr.amount, 0);
        }
    });

    watch(
        () => ordinaryDataList.value,
        () => {
            finalDataForm.value = [
                ...extraOrdinaryDataList.value,
                ...ordinaryDataList.value,
            ];
        },
        { immediate: true, deep: true }
    );

    watch(
        () => extraOrdinaryDataList.value,
        () => {
            finalDataForm.value = [
                ...extraOrdinaryDataList.value,
                ...ordinaryDataList.value,
            ];
        },
        { immediate: true, deep: true }
    );

    function addFactureHndler(type: string) {
        switch (type) {
            case 'ordinary':
                ordinaryDataList.value.push({
                    type: 'ordinary',
                    ...DEFAULT_VALUE,
                    id: ordinaryDataList.value.length,
                });
                break;
            case 'extraordinary':
                extraOrdinaryDataList.value.push({
                    type: 'extraordinary',
                    ...DEFAULT_VALUE,
                    id: extraOrdinaryDataList.value.length,
                });
                break;
        }
    }

    function onDeleteFactureItem(params: { id: number; type: string }) {
        const { id, type } = params;
        switch (type) {
            case 'ordinary':
                ordinaryDataList.value = [
                    ...ordinaryDataList.value.filter((item) => item.id !== id),
                ];
                break;
            case 'extraordinary':
                extraOrdinaryDataList.value = [
                    ...extraOrdinaryDataList.value.filter(
                        (item) => item.id !== id
                    ),
                ];
                break;
        }
    }

    function handleFieldsValue(v: { id: number; value: object; type: string }) {
        const { id, value, type } = v;
        switch (type) {
            case 'ordinary':
                ordinaryDataList.value = [
                    ...ordinaryDataList.value.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                ...value,
                            };
                        } else {
                            return item;
                        }
                    }),
                ];
                break;
            case 'extraordinary':
                extraOrdinaryDataList.value = [
                    ...extraOrdinaryDataList.value.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                ...value,
                            };
                        } else {
                            return item;
                        }
                    }),
                ];
                break;
        }
    }

    async function handleFilterDate(evt: any) {
        engageFiltering.value = true;
        isLoadFilterHndlr.value = true;
        const date = Object.values(evt)[0];
        const params = {
            ['theProperty.id']: thePropertyId.value,
            ['date[after]']: date as string,
        };
        try {
            const { data, code } = await Financial.filterCopropertyAmount(
                params
            );
            if (code === 200) {
                console.log(data, 'FILTER RESULT');
                filterRes.value = [...data];
            }
        } catch (error) {
            console.log(error);
        } finally {
            isLoadFilterHndlr.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .loader__ctn {
        &:deep() {
            .custom-loader svg {
                height: 50px;
            }
        }
    }
    .coproperty {
        &__add-facture-btn {
            :deep() {
                button {
                    @apply flex gap-[10px] items-center;
                }
            }
        }
        &__section {
            @screen md {
                height: calc(100vh - 100px);
                @apply container;
            }
        }
        &__container {
            @apply h-full;
        }
        &__items-wrap {
            @apply px-[14px] -mx-[14px];
            @screen md {
                height: calc(100vh - (100px + 62px + 90px));
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__items {
            @apply mt-[14px];
            @screen md {
                @apply mt-[18px];
            }
        }
        &__items--title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            @apply text-primary mb-[14px] mt-[14px];
            @screen md {
                @apply mb-[18px] ml-[24px] mt-[18px];
            }
        }
        &__title {
            @apply text-[14px] text-grayIcon;
            @screen md {
                @apply text-[16px];
            }
        }
        &__field-wrap {
            @apply grid grid-cols-1;
            @screen lg {
                @apply grid-cols-2 gap-[24px];
            }
        }
        &__button {
            @apply mb-[18px];
        }
        &__content {
            @apply font-semibold text-[14px] text-grayIcon mb-[18px];
            @screen md {
                @apply text-[16px];
            }
        }
        &__form-item-wrap {
            label {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                @apply text-black mb-[14px] flex items-center gap-x-[12px];
                @screen md {
                    @apply mb-[18px];
                }
                &:deep() {
                    svg {
                        @apply w-[18px] h-[18px] cursor-pointer;
                        &:hover path {
                            @apply transition-all;
                            &:first-child {
                                @apply fill-white;
                            }
                            &:last-child {
                                @apply fill-primary;
                            }
                        }
                    }
                }
            }
            &:deep() {
                .custom-input__label-icon,
                .date__label {
                    @apply hidden;
                }
                .switch {
                    label {
                        @apply hidden;
                    }
                }
            }
        }
        &__form-item,
        &__basic-amount {
            gap: inherit !important;
            @apply mb-[14px];
            @screen md {
                @apply mb-[18px];
            }
        }
        &__btn-foot {
            @apply flex justify-end mt-10;
            .btn-foot {
                @apply w-full;
                @screen sm {
                    @apply w-auto;
                }
            }
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
        &__head-items {
            @apply flex justify-between mt-0 mb-[18px];
        }
        &__amount {
            @apply flex flex-wrap items-center justify-between p-[14px] bg-gray text-grayIcon mb-[14px];
            @screen md {
                @apply p-[24px] mb-[18px];
            }
        }
        &__amount-content {
            @apply text-[14px] font-semibold;
        }
        &__amount-value {
            @apply block text-[14px] font-semibold;
        }
        &__basic-amount {
            @apply px-[14px] bg-gray flex justify-between items-center min-h-[38px] rounded-[4px];
        }
        &__request {
            font-size: 14px;
            font-weight: 600;
            line-height: 15px;
            @apply flex text-primary gap-x-[10px] mb-[8px];
        }
        &__form-request {
            @apply pl-[14px] ml-[24px] my-[24px] border-l-[1px] border-gray;
        }
        &__table {
            &--container {
                @apply bg-gray py-[18px] px-[10px] rounded-[8px];
                @screen md {
                    @apply px-[18px];
                }
                .__hr {
                    @apply text-white;
                }
            }
            &--title {
                @apply uppercase text-[14px] mb-[18px];
            }
            &--item {
                @apply w-full;
            }
            &--row {
                @apply mt-[18px] flex justify-between font-[600];
                &__date {
                    width: auto;
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.5s;
        max-height: 300px;
    }
    .fadeHeight-enter,
    .fadeHeight-leave-to {
        opacity: 0;
        max-height: 0px;
        @apply overflow-y-hidden;
    }

    .label__flex {
        @apply flex gap-x-[14px];
        .coproperty__form-item {
            min-width: 100px;
        }
    }

    .upload__container {
        @apply my-[6px];
        @screen md {
            @apply my-[10px];
        }
        label {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply text-black mb-[14px] flex items-center gap-x-[12px];
            @screen md {
                @apply mt-[18px];
            }
        }
    }
</style>
