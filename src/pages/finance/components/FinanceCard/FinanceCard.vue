<template>
    <div class="financeCard__section">
        <Card class="financeCard__container">
            <div class="financeCard__head-items">
                <Title
                    class="financeCard__title"
                    :label="labelTitle"
                    type="h2"
                    weight="600"
                />
                <ChangeWell />
            </div>
            <hr class="__hr" />
            <div class="financeCard__items-wrap">
                <slot @uploadFinal="up" />
            </div>
            <div
                :class="[
                    fieldRequired === true ? 'financeCard__fielRequired' : '',
                ]"
                class="financeCard__btn-foot"
            >
                <span
                    v-if="fieldRequired === true"
                    class="financeCard__fielRequired--content"
                    >(*) champ obligatoire</span
                >
                <Button
                    v-if="labelButton"
                    type-button="secondary"
                    class="btn-foot"
                    @click="submitForm"
                    :disabled="isLoadSubmit"
                >
                    <LoadingButton size="sm" v-if="isLoadSubmit" />
                    {{ labelButton }}
                </Button>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import ChangeWell from '@/pages/finance/components/ChangeWell/ChangeWell.vue';
    import { useStore } from 'vuex';
    import { ref, watch } from 'vue';
    import Financial from '@/services/FinancialService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';
    import PrecompteService from '@/services/PrecompteServices';
    import { useRoute } from 'vue-router';

    const isLoadSubmit = ref<boolean>(false);
    const dataToPost = ref<any>();

    const route = useRoute();
    const store = useStore();
    const emit = defineEmits([
        'Calculate',
        'on-send-property-tax-value-amount',
        'on-get-precount-simulatoin-result',
        'on-sale-back',
        'on-sale-computing',
        'on-credit-back',
        'on-credit-computing',
        'on-saleCredit-back',
        'on-saleCredit-computing',
        'on-pv-back',
        'on-pv-computing',
    ]);

    const props = defineProps({
        labelTitle: {
            type: String,
            default: '',
        },
        labelButton: {
            type: String,
            default: '',
        },
        fieldRequired: {
            type: Boolean,
            default: false,
        },
        disableSubmitButton: {
            type: Boolean,
            default: true,
        },
        // HANDLE PARENT OPERATION
        copropertyDatas: {
            type: Array,
            required: false,
        },
        financialHelp: {
            type: Boolean,
            required: false,
            default: false,
        },
        propertyTax: {
            type: Object,
            default: null,
            required: false,
        },
        precountSimulation: {
            type: Object,
            default: null,
            required: false,
        },
        sale: {
            type: Number,
            default: 0,
            required: false,
        },
        saleParams: {
            type: Object,
            default: null,
            required: false,
        },
        credit: {
            type: Number,
            default: 0,
            required: false,
        },
        creditParams: {
            type: Object,
            default: null,
            required: false,
        },
        saleCredit: {
            type: Number,
            default: 0,
            required: false,
        },
        typeCalcul: {
            type: String,
            default: '',
            required: false,
        },
        loading: {
            type: Boolean,
            default: false,
            required: false,
        },
        plusValueParams: {
            type: Object,
            required: false,
            default: null,
        },
        plusValueState: {
            type: Number,
            required: false,
        },
        municipalityTax: {
            type: Number,
            required: false,
        },
        // end HANDLE PARENT OPERATION
    });

    function submitForm() {
        if (props?.copropertyDatas) {
            updateCopropertyData();
        } else if (props?.financialHelp) {
            submitFinancialHelpDetail();
        } else if (props.propertyTax) {
            submitPropertyTax();
        } else if (props.precountSimulation) {
            submitPrecountSimulation();
        } else if (props.sale === 1 && props.typeCalcul === 'sale') {
            emit('on-sale-back');
        } else if (props.sale === 0 && props.typeCalcul === 'sale') {
            submitSale();
        } else if (props.credit === 1 && props.typeCalcul === 'credit') {
            emit('on-credit-back');
        } else if (props.credit === 0 && props.typeCalcul === 'credit') {
            submitCredit();
        } else if (
            props.saleCredit === 1 &&
            props.typeCalcul === 'saleCredit'
        ) {
            emit('on-saleCredit-back');
        } else if (
            props.saleCredit === 0 &&
            props.typeCalcul === 'saleCredit'
        ) {
            submitSaleCredit();
        } else if (props.plusValueState === 0) {
            submitPlusValue();
        } else if (props.plusValueState === 1) {
            emit('on-pv-back');
        } else if (props.municipalityTax) {
            updateMunicipalityTax();
        }
    }

    const up = (value: any) => {
        console.log('up', value);
    };

    watch(
        () => props.copropertyDatas,
        (v) => {
            dataToPost.value = v?.map((item: any) => {
                const { id, ...rest } = item;
                return rest;
            });
        },
        { immediate: true, deep: true }
    );

    async function updateMunicipalityTax() {
        isLoadSubmit.value = true;
        try {
            const res = await Financial.updateTaxes(
                route.params.id as string,
                props.municipalityTax
            );
            successHandler(res);
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitPlusValue() {
        isLoadSubmit.value = true;
        try {
            let obj = {};
            Object.keys(props.plusValueParams).forEach((key) => {
                obj = {
                    ...obj,
                    [key]:
                        Number.isNaN(+props.plusValueParams[key]) ||
                        typeof props.plusValueParams[key] === 'boolean'
                            ? props.plusValueParams[key]
                            : +props.plusValueParams[key],
                };
            });
            const res = await Financial.postCapitalGainConstants(obj);
            emit('on-pv-computing', res);
            successHandler(res);
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitSale() {
        isLoadSubmit.value = true;
        try {
            const data = await Financial.postNewSale(props.saleParams);
            successHandler(data);
            data && emit('on-sale-computing', data.data);
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitCredit() {
        isLoadSubmit.value = true;
        try {
            const data = await Financial.postNewCredit(props.creditParams);
            successHandler(data);
            data && emit('on-credit-computing', data.data);
            console.log("DONE", data.data);
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitSaleCredit() {
        isLoadSubmit.value = props.loading;
        emit('on-saleCredit-computing');
    }

    async function submitPrecountSimulation() {
        isLoadSubmit.value = true;
        try {
            let obj: any = {};
            Object.keys(props.precountSimulation).forEach((key) => {
                if (
                    !Number.isNaN(+props.precountSimulation[key]) &&
                    key !== 'modestHouse' &&
                    key !== 'savedProperty' &&
                    typeof props.precountSimulation[key] !== 'boolean'
                ) {
                    obj = { ...obj, [key]: +props.precountSimulation[key] };
                } else {
                    obj = { ...obj, [key]: props.precountSimulation[key] };
                }
            });
            const response = await PrecompteService.precountSimulation(obj);
            const { data } = response;
            if (data) {
                emit('on-send-property-tax-value-amount', {
                    reductionAmount: data.data.reductionAmount,
                    precountAmount: data.data.precountAmount,
                });
            }
            successHandler(response);
            emit('on-get-precount-simulatoin-result');
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitPropertyTax() {
        isLoadSubmit.value = true;
        try {
            let obj: any = {};
            Object.keys(props.propertyTax.params).forEach((key) => {
                if (
                    !Number.isNaN(+props.propertyTax.params[key]) &&
                    key !== 'modestHouse' &&
                    key !== 'savedProperty' &&
                    typeof props.propertyTax[key] !== 'boolean'
                ) {
                    obj = { ...obj, [key]: +props.propertyTax.params[key] };
                } else {
                    obj = { ...obj, [key]: props.propertyTax.params[key] };
                }
            });
            const response = await store.dispatch(
                'PrecompteModule/putPrecount',
                { params: obj, idPrecount: props.propertyTax.idPrecount }
            );
            const { data } = response;
            if (data) {
                emit(
                    'on-send-property-tax-value-amount',
                    data.data.precountAmount
                );
            }
            successHandler(response);
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    async function submitFinancialHelpDetail() {
        isLoadSubmit.value = true;
        store
            .dispatch('FinancialModule/submitFinancialHelpDetail')
            .then((res) => {
                successHandler(res);
            })
            .catch((err) => {
                errorHandler(err as any);
            })
            .finally(() => {
                isLoadSubmit.value = false;
            });
    }

    async function updateCopropertyData() {
        const formData = new FormData();
        dataToPost.value.forEach((obj: object | any, idObj: number) => {
            Object.keys(obj).forEach((key: any) => {
                formData.append(`condominiumFees[${idObj}][${key}]`, obj[key]);
            });
        });
        isLoadSubmit.value = true;
        try {
            const data = await Financial.updateCopropertyDatas(
                store.getters['FinancialModule/getChoosenProperty'].id,
                formData
            );
        } catch (error) {
            errorHandler(error as any);
        } finally {
            isLoadSubmit.value = false;
        }
    }

    function successHandler(res: any) {
        const { data, status } = res;
        const isSuccess = /^2/g.test(data.code) || /^2/g.test(status);
        if (isSuccess) {
            notification['success']({
                message: 'Votre requête a bien été éxécuté',
            });
        }
    }

    function errorHandler(error: { data: any }) {
        console.log(error);
        const { data, status } = error as { data: any; status: string | number };
        const { code } = data;
        console.log('error', code);
        let hasError = /^4/g.test(code);
        if (!code) {
            hasError = /^4/g.test(status+'')
        }
        if (hasError) {
            notification['error']({
                message: 'Veuillez complétez/verifiez les champs',
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .financeCard {
        &__section {
            @apply relative;
            &:deep() {
                .custom-loader {
                    @apply bg-transparent;
                }
            }
            @screen md {
                height: calc(100vh - 94px);
                @apply flex-1;
            }
        }
        &__container {
            @apply h-full;
        }
        &__head-items {
            @apply flex justify-between mt-0 mb-[18px];
        }
        &__items-wrap {
            @apply px-[14px] -mx-[14px];
            @screen md {
                height: calc(100vh - 240px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__title {
            @apply text-[14px] text-grayIcon;
            @screen md {
                @apply text-[16px];
            }
        }
        &__button {
            @apply mb-[18px];
        }
        &__btn-foot {
            @apply flex justify-end mt-10;
            .btn-foot {
                @apply w-full;
                @screen sm {
                    @apply w-auto;
                }
                &:deep() {
                    button {
                        @apply flex items-center gap-[10px] justify-center;
                    }
                    svg {
                        @apply w-[22px] h-[22px];
                    }
                }
            }
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
        &__fielRequired {
            @apply flex flex-col;
            @screen sm {
                @apply flex flex-row justify-between items-center;
            }
        }
        &__fielRequired--content {
            @apply block mb-[14px];
            @screen sm {
                @apply mb-[0];
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
