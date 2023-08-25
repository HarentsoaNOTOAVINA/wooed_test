<template>
    <finance-card
        :label-title="pvTitle"
        :label-button="buttonState"
        :plus-value-params="params"
        @on-pv-back="isResult = false"
        @on-pv-computing="handleComputing"
        :plus-value-state="pvState"
    >
        <template v-if="!isResult">
            <transition appear name="fade-slider" mode="out-in">
            <!-- <PlusValueBelgium @on-hanlde-params="paramsHandler" /> -->
                <PlusValueLux @on-hanlde-params="paramsHandler" />
            </transition>
        </template>
        <template v-else>
            <PlusValueResult :country="country" :pv-result="plusValueResult" />
        </template>
    </finance-card>
</template>
<script lang="ts" setup>
    import FinanceCard from '@/pages/finance/components/FinanceCard/FinanceCard.vue';
    import { ref, watch } from 'vue';
    import PlusValueBelgium from './Country/PlusValueBelgium.vue';
    import PlusValueFrance from './Country/PlusValueFrance.vue';
    import PlusValueLux from './Country/PlusValueLux.vue';
    import PlusValueResult from './PlusValueResult.vue';

    const params = ref<TypesPlusValueParams>({} as TypesPlusValueParams);
    const isResult = ref<boolean>(false);
    const buttonState = ref<string>('Calculer');
    const plusValueResult = ref<any>(null);
    const pvState = ref<number>(0);
    const pvTitle = ref<string>('Plus value')

    const country = ref<string>('France')

    watch(
        () => isResult.value,
        (v) => {
            buttonState.value = v ? 'Retour' : 'Calculer';
            pvState.value = v ? 1 : 0;
            pvTitle.value = v ? 'Resulat' : 'Plus value'
        },
        {
            immediate: true,
        }
    );

    function handleComputing(result: any) {
        console.log(result, 'RESULT');
        plusValueResult.value = result.data.data;
        isResult.value = true;
    }
    function paramsHandler(param: TypesPlusValueParams) {
        params.value = param;
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/calcul_sale.scss';
</style>
