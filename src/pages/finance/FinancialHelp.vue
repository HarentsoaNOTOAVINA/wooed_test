<template>
    <div v-if="!isLoadAnnualCostDatas" class="financial-help__main">
        <div v-if="isCountryAllowed" class="financial-help__container">
            <SideMenu
                @on-back-to-menu="onBackToMenu"
                class="financial-help__side-menu"
                @active-comp="changeComponent"
                :precompte="precompte"
                :is-simulation="isSimulation"
                :total-annual-cost="totalAnnualCost"
                :total-annual-revenu="totalAnnualRevenu"
                :annual-return="annualReturn"
            />
            <component
                :is="activeComponent"
                :property-id="propertyId"
                :is-simulation="isSimulation"
                @getTaxData="getTaxMunicipality"
            />
        </div>
        <div v-else class="country--denied">
            <NotAllowed />
            <Title
                class="country--denied__info"
                type="h3"
                label="Cette section n'est pas disponible dans le pays de votre propriété."
            />
            <Button @click="router.go(-1)" theme="light" :type-button="'border'"
                >RETOUR</Button
            >
        </div>
    </div>
    <Loader v-else />
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import FinancialHelpPageContent from './help/FinancialHelpPageContent.vue';
    import SideMenu from './components/SideMenu.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, shallowRef, computed, watch } from 'vue';
    import { useStore } from 'vuex';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import NotAllowed from '@/components/Icon/NotAllowed.vue';
    import FinancialService from '@/services/FinancialService';
    import PropertyTax from '@/pages/finance/property-tax/propertyTax.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from 'ant-design-vue';
    const store = useStore();
    const router = useRouter();
    const country = ref<string>();
    const isCountryAllowed = computed(
        () =>
            country.value === 'France' ||
            country.value === 'Luxembourg' ||
            country.value === 'Belgique'
    );
    const propertyId = ref<any>();
    const route = useRoute();
    const activeComponent = shallowRef<any>();
    const isSimulation = ref<boolean>(false);
    const isLoadAnnualCostDatas = ref<boolean>(true);
    const apiCountDone = ref<number>(0);
    const totalData = ref<{
        annualCredit: number;
        precountAmount: number;
        taxeAmount: number;
        water: number;
        gaz: number;
        electric: number;
        // totalAnnualRevenu: number
    }>({
        annualCredit: 0.0,
        precountAmount: 0.0,
        taxeAmount: 0.0,
        water: 0.0,
        gaz: 0.0,
        electric: 0.0,
        // totalAnnualRevenu: 0.0
    });
    const totalAnnualRevenu = ref<number>(0.0);
    const totalAnnualCost = ref<number>(0.0);
    const purchasePrice = ref(0.0);
    const TOTAL_API_COUNT = Object.keys(totalData.value).length;
    const precompte = ref<any>();
    onMounted(() => {
        checkIfSimulation();
        console.log('totalAnnualCost:', totalAnnualCost.value);
        console.log('totalAnnualRevenu:', totalAnnualRevenu.value);
        console.log(' purchasePrice.value:', purchasePrice.value);
        console.log(' municipality.value:', precompte.value);
    });
    watch(
        () => totalAnnualRevenu.value,
        (v) => {
            console.log(v);
        },
        { immediate: true }
    );
    watch(
        () => totalAnnualRevenu.value,
        (v) => {
            console.log(v);
        },
        { immediate: true }
    );

    watch(
        () => apiCountDone.value,
        (v) => {
            if (v === TOTAL_API_COUNT) {
                isLoadAnnualCostDatas.value = false;
            }
        }
    );
    watch(
        () => totalData.value,
        (v) => {
            totalAnnualCost.value = Object.values(v).reduce(
                (cum, curr) => cum + curr,
                0
            );
        }
    );
    watch(
        () => precompte.value,
        (v) => {
            console.log('mun tax', v);
        },
        { immediate: true, deep: true }
    );
    const getTaxMunicipality = (value: any) => {
        // munTax.value = value
        //     .map(function (val: any) {
        //         return val.selectedValue;
        //     })
        //     .reduce(function (acc: any, val: any) {
        //         return acc + val;
        //     }).toFixed(2)
        // munTax.value = console.log('data tax:', munTax.value);
        let data = value.filter((v: any) => v.title === 'Precompte immobilier');
        precompte.value = data[0].selectedValue;
        console.log('municipality tax v alue:', precompte.value);
    };
    const annualReturn = computed(
        () =>
            (totalAnnualCost.value - totalAnnualRevenu.value) /
            purchasePrice.value
    );
    async function getSellingPrice() {
        try {
            const data = await FinancialService.getSellingPrice({
                theProperty: +route.params.id,
            });
            console.log(data, 'RESULT');
            if (data && !!data.length) {
                const lastItem = data.at(-1);
                purchasePrice.value = +lastItem.provision;
            }
        } catch (error) {
            notification.error({ message: `Une erreur est survenue` });
        }
    }
    async function getChoosenBank() {
        try {
            const { data, code } = await FinancialService.getChosenBank({
                theProperty: route.params.id,
            });
            apiCountDone.value++;
            if (code === 200) {
                const { monthlyPayment } = data;
                totalData.value = {
                    ...totalData.value,
                    annualCredit: +(monthlyPayment * 12),
                };
            }
        } catch (e) {
            notification.error({
                message: `Une erreur est survenue, veuillez reessayer`,
            });
        }
    }
    function getPrecountAmount() {
        const precount =
            store.getters['FinancialModule/getChoosenProperty'].precount;
        totalData.value = {
            ...totalData.value,
            precountAmount: !!precount ? +precount.precountAmount : 0,
        };
        apiCountDone.value++;
    }
    function getTaxes() {
        const municipalTax =
            store.getters['FinancialModule/getChoosenProperty'].municipalTax;
        totalData.value = {
            ...totalData.value,
            taxeAmount: !!municipalTax ? +municipalTax : 0,
        };
        apiCountDone.value++;
    }
    function checkIfSimulation() {
        switch (route.name) {
            case 'financial-help':
                propertyId.value = route.params.id;
                country.value =
                    store.getters['FinancialModule/getChoosenProperty'].country;
                activeComponent.value = FinancialHelpPageContent;
                break;
            case 'financial-simulation':
                isSimulation.value = true;
                country.value = 'France';
                activeComponent.value = PropertyTax;
                break;
        }
        fetchAnnualCostDatas();
    }
    async function getAnnualRevenu() {
        try {
            const { data, code } = await FinancialService.getTotalRevenu(
                +route.params.id
            );
            console.log('total:', data);
            if (code === 200 && data.length > 0) {
                const { totalRevenu } = data.at(-1);
                totalAnnualRevenu.value = totalRevenu;
                console.log(totalAnnualRevenu.value, 'totalAnnualRevenu');
            }
        } catch (error) {
            console.log(error, 'ERREUR');
            notification.error({
                message: `ERREUR`,
            });
        }
    }
    async function getConsumption(consumptionName: string) {
        try {
            const { data, code } = await FinancialService.getConsumption({
                theProperty: route.params.id,
                consumptionName,
            });
            if (code === 200) {
                const { annualConsumptionPrice } = data.data[0];
                totalData.value = {
                    ...totalData.value,
                    [consumptionName]: +annualConsumptionPrice,
                };
            }
            apiCountDone.value++;
        } catch (error) {
            notification.error({
                message: `Une erreur est survenue, veuillez reessayez`,
            });
        }
    }
    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }
    function onBackToMenu() {
        activeComponent.value = null;
    }
    function fetchAnnualCostDatas() {
        const consumptionNameList = ['gaz', 'electric', 'water'];
        if (!isSimulation.value) {
            getChoosenBank();
            getPrecountAmount();
            getTaxes();
            getAnnualRevenu();
            getSellingPrice();
            for (const key of consumptionNameList) {
                getConsumption(key);
            }
        } else {
        }
    }
</script>
<style scoped lang="scss">
    .country--denied {
        @apply flex flex-col container  mt-[18px] w-full justify-center items-center bg-white p-[20px] gap-[20px] rounded-[8px] h-[calc(100vh-100px)];
        &__info {
            @apply text-[var(--color-primary)];
        }
        &:deep {
            svg {
                @apply h-[50px] w-[50px];
            }
        }
    }
    .financial-help__container {
        @apply mt-[18px] container flex flex-col md:flex-row gap-[10px];
        @screen md {
            @apply flex;
        }
    }
    .financial-help__totalAmount {
        @apply w-[340px] flex flex-col bg-white rounded-[8px] p-[20px];
    }
    .money-icon {
        &:deep() {
            path {
                fill: var(--color-gray-icon);
            }
        }
    }
    .finance-help__side-menu {
        @apply mb-[18px];
        @screen md {
            min-height: calc(100vh - 100px);
        }
    }
</style>