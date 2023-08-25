<template>
    <finance-card
        label-title="Vente et crédit"
        :sale="saleSate"
        :label-button="buttonState"
        @on-saleCredit-back="isResult = false"
        @on-saleCredit-computing="handleComputing"
        typeCalcul="saleCredit"
        :loading="isLoading"
    >
        <div class="sale">
            <template v-if="!isResult && current === 'sale'">
                <transition appear name="fade-slider" mode="out-in">
                    <div>
                        <Title type="h4" label="Vente" weight="bold" />
                        <SaleBelgium
                            :region="region"
                            v-if="country === 'Belgique'"
                            @on-params-change="paramsHandler"
                            :region-elt="regionElt"
                        />
                        <SaleFrance
                            @on-params-change="paramsHandler"
                            v-else-if="country === 'France'"
                        />
                        <SaleLux
                            @on-params-change="paramsHandler"
                            v-else-if="country === 'Luxembourg'"
                            :region-elt="regionElt"
                        />
                    </div>
                </transition>
            </template>
            <template v-if="!isResult && current === 'credit'">
                <transition appear name="fade-slider" mode="out-in">
                    <div>
                        <Title type="h4" label="Crédit" weight="bold" />
                        <CreditElement @input="handleInput" />
                    </div>
                </transition>
            </template>
            <template v-if="isResult">
                <transition appear name="fade-slider" mode="out-in">
                    <div class="pt-[10px]">
                        <ResultSaleAndCredit
                            :sale-result="saleResult"
                            :credit-result="creditResult"
                        />
                    </div>
                </transition>
            </template>
        </div>
    </finance-card>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import FinanceCard from '@/pages/finance/components/FinanceCard/FinanceCard.vue';
    import ResultSaleAndCredit from '@/pages/finance/components/ResultSaleCredit/ResultSaleAndCredit.vue';
    import CreditElement from '../Credit/CreditElement.vue';
    import SaleFrance from '@/pages/finance/Sale/Country/SaleFrance.vue';
    import SaleBelgium from '@/pages/finance/Sale/Country/SaleBelgium.vue';
    import SaleLux from '@/pages/finance/Sale/Country/SaleLux.vue';
    import Financial from '@/services/FinancialService';
    import { computed, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import useSaleConstants from '../Sale/Composable/useSaleConstant';
    import { flandreElement } from '../Sale/form.data';

    const store = useStore();

    const region = store.getters['FinancialModule/getChoosenProperty'].region;
    const country = store.getters['FinancialModule/getChoosenProperty'].country;

    const { walloniaElt, bruxelleElement, luxembourgElement, isLoad } =
        useSaleConstants();

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
                        return flandreElement;
                }
                break;
            case 'Luxembourg':
                return luxembourgElement.value;
        }
    });

    const isResult = ref<boolean>(false);
    const buttonState = ref<string>('');
    const saleSate = ref<number>(0);
    const saleParams = ref<any>();
    const creditParams = ref<any>({
        price: 0,
        theProperty: 2,
    });
    const current = ref<string>('sale');
    const saleResult = ref<any>();
    const creditResult = ref<any>();
    const isLoading = ref<boolean>(false);

    watch(
        () => isResult.value,
        (v) => {
            buttonState.value = v ? 'Retour' : 'Calculer';
            saleSate.value = v ? 1 : 0;
        },
        {
            immediate: true,
        }
    );

    async function handleComputing() {
        isLoading.value = true;
        if (current.value === 'sale') {
            console.log('params sale = ', saleParams.value);
            try {
                const res = await Financial.postSale(saleParams.value);
                const { data } = res;
                saleResult.value = data.data;
                console.log('data sale response = ', data);
            } catch (error) {
                console.log(error);
            } finally {
                isLoading.value = false;
                current.value = 'credit';
            }
        } else {
            console.log('params credit = ', creditParams.value);
            try {
                const res = await Financial.postCredit(creditParams.value);
                const { data } = res;
                creditResult.value = data.data;
                console.log('data credit response = ', data);
            } catch (error) {
                console.log(error);
            } finally {
                isLoading.value = false;
                isResult.value = true;
            }
        }
    }

    function handleInput(value: any) {
        for (let i in value) {
            creditParams.value[i] = +value[i];
        }
    }

    function paramsHandler(p: any) {
        saleParams.value = p;
    }
</script>
<style></style>
