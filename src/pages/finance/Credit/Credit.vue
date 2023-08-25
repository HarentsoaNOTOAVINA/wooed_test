<template>
    <finance-card
        label-title="Crédit"
        :credit="creditState"
        :label-button="buttonState"
        type-calcul="credit"
        :credit-params="params"
        @on-credit-back="isResult = false"
        @on-credit-computing="handleComputing"
    >
        <div class="sale">
            <template v-if="!isResult">
                <transition appear name="fade-slider" mode="out-in">
                    <CreditElement @input="handleInput" />
                </transition>
            </template>
            <template v-else>
                <transition appear name="fade-slider" mode="out-in">
                    <div class="pt-[10px]">
                        <Result
                            :is-credit="isCredit"
                            :credit-result="creditResult"
                        />
                    </div>
                </transition>
            </template>
        </div>
    </finance-card>
</template>
<script lang="ts" setup>
    import FinanceCard from '@/pages/finance/components/FinanceCard/FinanceCard.vue';
    import CreditElement from './CreditElement.vue';
    import Result from '@/pages/finance/components/ResultSaleCredit/ResultSaleCredit.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const isResult = ref<boolean>(false);
    const isCredit = ref<boolean>(false);
    const buttonState = ref<string>('');
    const creditState = ref<number>(0);
    const creditResult = ref<any>(null);
    const params = ref<any>({
        secondPropertiesInHypotec: false,
        rechHypo: false,
        hypoSearch: false,
        prSocial: false,
        registrationInASecondOffice: false,
        theProperty: +route.params.id,
    });

    onMounted(() => {
        isCredit.value = true;
    }),
        watch(
            () => isResult.value,
            (v) => {
                buttonState.value = v ? 'Retour' : 'Calculer';
                creditState.value = v ? 1 : 0;
            },
            {
                immediate: true,
            }
        );

    // function paramsHandler(params: any) {
    //     /**
    //      * TODO assign params to data for API call
    //      */
    //     console.log(params);
    // }

    function handleComputing(data: any) {
        /**
         * HERE WE RECEIVE THE RETURNED DATA FROM BACK API
         */
        creditResult.value = data;
        console.log(data, 'DATA');
        isResult.value = true;
    }

    function handleInput(value: any) {
        for (let i in value) {
            params.value[i] = +value[i];
        }
        console.log('paraaams = ', params.value);
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/calcul_sale.scss';
</style>
