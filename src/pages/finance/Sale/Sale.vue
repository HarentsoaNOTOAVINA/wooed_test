<template>
    <finance-card
        label-title="Vente"
        :sale="saleSate"
        :label-button="buttonState"
        @on-sale-back="isResult = false"
        @on-sale-computing="handleComputing"
        :sale-params="params"
        type-calcul="sale"
    >
        <div v-if="!isLoad" class="sale">
            <template v-if="!isResult">
                <transition appear name="fade-slider" mode="out-in">
                    <SaleBelgium :region="region" v-if="country === 'Belgique'"
                        @on-params-change="paramsHandler"
                        :region-elt="regionElt"
                    />
                    <SaleFrance @on-params-change="paramsHandler" v-else-if="country === 'France'" />
                    <SaleLux @on-params-change="paramsHandler" v-else-if="country === 'Luxembourg'" :region-elt="regionElt"/>
                </transition>
            </template>
            <template v-else>
                <transition appear name="fade-slider" mode="out-in">
                    <div class="pt-[10px]">
                        <Result :sale-result="saleResult" />
                    </div>
                </transition>
            </template>
        </div>
        <Loader v-else />
    </finance-card>
</template>
<script lang="ts" setup>
    import FinanceCard from '@/pages/finance/components/FinanceCard/FinanceCard.vue';
    // import { flandreElement } from './form.data';
    import Result from '@/pages/finance/components/ResultSaleCredit/ResultSaleCredit.vue';
    import { computed, ref, watch, onBeforeUnmount } from 'vue';
    import SaleBelgium from './Country/SaleBelgium.vue';
    import SaleLux from './Country/SaleLux.vue';
    import SaleFrance from './Country/SaleFrance.vue';
    import useSaleConstant from './Composable/useSaleConstant';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Http } from '@/services/http';
    import { useStore } from 'vuex';

    const store = useStore();

    const region = store.getters['FinancialModule/getChoosenProperty'].region;
    const country = store.getters['FinancialModule/getChoosenProperty'].country;

    const { walloniaElt, bruxelleElement, luxembourgElement, flandreElement, isLoad } =
        useSaleConstant();

    const isResult = ref<boolean>(false);
    const buttonState = ref<string>('');
    const saleSate = ref<number>(0);
    const regionElt = computed(() => {
        switch (country) {
            case 'Belgique':
                switch (region) {
                    case 'Bruxelles':
                    case 'Bruxelles-Capitale':
                        return bruxelleElement.value;
                    case 'Région Wallonne':
                        return walloniaElt.value;
                    case 'Vlaams Gewest':
                        return flandreElement.value;
                }
                break;
            case 'Luxembourg':
                return luxembourgElement.value;
        }
    });
    const params = ref<any>(null);
    const saleResult = ref<any>(null);

    /**
     * I KnOW IT'S DIGUSTING BUT IT'S NOT MY FAULT
     */
    onBeforeUnmount(() => {
        Http.setBaseUrl(import.meta.env.VITE_API_BASE_URL);
    });
    /** */

    watch(
        () => isResult.value,
        (v) => {
            buttonState.value = v ? 'Retour' : 'Calculer';
            saleSate.value = v ? 1 : 0;
            console.log(
                store.getters['FinancialModule/getChoosenProperty'],
                'LOCATION'
            );
        },
        {
            immediate: true,
        }
    );

    function paramsHandler(p: any) {
        params.value = p;
    }

    function handleComputing(data: any) {
        saleResult.value = data;
        isResult.value = true;
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/style/calcul_sale.scss';
</style>
