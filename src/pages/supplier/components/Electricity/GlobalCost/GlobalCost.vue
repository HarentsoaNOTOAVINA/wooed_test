<template>
    <div class="">
        <MainCard :dataBreadcrumbs="breadcrumbListsData">
            <Loader v-if="isLoadData" />
            <template v-else>
                <Alert v-if="!consumptionCost" class="mb-[20px]"
                    >Vous pouvez entrer votre consomation éléctrique dans la
                    section "Consommation d'éléctricité"</Alert
                >
                <Alert v-if="!greenCertValue" class="mb-[20px]"
                    >Vous pouvez gerer vos certificats verts dans la section
                    "Panneaux solaires/Mes certificats verts"</Alert
                >
                <div class="global-cost">
                    <Item
                        title="Coût de ma consommation électrique « courante »"
                        :cost="consumptionCost"
                    />
                    <Item
                        title="Revenus générés par la vente des certificats verts"
                        :cost="greenCertValue"
                    />
                    <Item
                        title="Coût global de ma consommation électrique"
                        :is-total="true"
                        :cost="globalCost"
                    />
                </div>
            </template>
        </MainCard>
    </div>
</template>
<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import SupplierServices from '@/services/supplierService';
    import Item from './Item/Item.vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import Alert from '@/components/Display/Alert/Alert.vue';

    const route = useRoute();
    const store = useStore();

    const isLoadData = ref<any>(true);
    const consumptionCost = ref<number>(0);
    const greenCertValue = ref<number>(0);
    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + route.params.id,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Coût global de ma consommation éléctrique',
        },
    ];

    const globalCost = computed(
        () => consumptionCost.value - greenCertValue.value
    );

    onMounted(() => {
        getElecConsumption()
            .then(() => getGreenCertList())
            .then(() => {
                isLoadData.value = false;
            });
    });

    function getElecConsumption() {
        return new Promise(async (res: any, rej) => {
            try {
                const { data, code } = await SupplierServices.getConsumption({
                    theProperty: route.params.id,
                    energyType: store.getters['SupplierModule/getEnergyType'],
                });
                if (code === 200) {
                    const lastElt = data.at(-1);
                    consumptionCost.value = lastElt.consumptionCost;
                }
                res();
            } catch (error) {
                rej(error);
            }
        });
    }
    function getGreenCertList() {
        return new Promise(async (res: any, rej) => {
            try {
                const { data, code } =
                    await SupplierServices.getGreenCertificate({
                        idTheProperty: route.params.id,
                    });
                console.log(data, 'RESULT GREEN CERT');
                const { number, files } = data;
                let gcNumber: number = 0;
                if (code === 200) {
                    if (number) {
                        gcNumber = number;
                    } else {
                        gcNumber = Object.values(files).length;
                    }
                    greenCertValue.value = gcNumber * 93;
                }
                res();
            } catch (error) {
                rej(error);
            }
        });
    }
</script>
<style lang="scss" scoped>
    .global-cost {
        @apply flex gap-[10px] flex-wrap justify-center;
    }
</style>
