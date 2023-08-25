<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="supplier">
            <div class="supplier__container">
                <Title type="h2" label="Fournisseur" class="supplier__title" />
                <hr class="__hr" />
                <Supplier />
                <ListSupplier :listSupplierData="listSupplierData" />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Supplier from '../SupplierNameInfo.vue';
    import ListSupplier from '../ListSupplier.vue';
    import { computed, ref } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Gaz',
        },
    ];

    const listSupplierData = ref<any>([
        {
            id: 1,
            title: 'AECO (Energie 2030)',
            url: 'www.aeco.be/fr/particuliers/home/',
            phone: '+32 (0)87 63 24 44',
        },
        {
            id: 2,
            title: 'Bolt Energie',
            url: 'www.boltenergie.be',
            phone: '+32 (0)2 899 33 00',
        },
        {
            id: 3,
            title: 'Brusol EnergyVision',
            url: 'www.brusol.be',
            phone: '+32 (0)2 411 90 47',
        },
        {
            id: 4,
            title: 'ENGIE Electrabel',
            url: 'www.engie.be',
            phone: '+32 (0)78 35 33 33',
        },
        {
            id: 5,
            title: 'Luminus',
            url: 'www.luminus.be',
            phone: '+32 (0)78 155 00',
        },
        {
            id: 6,
            title: 'Power Online (Mega)*',
            url: 'www.mega.be',
            phone: '+32 (0)4 268 20 00',
        },
        {
            id: 7,
            title: 'TotalEnergies (Lampiris)',
            url: 'www.lampiris.be',
            phone: '04 340 64 64(FR) / 011 49 49 48 (NL)',
        },
    ]);
</script>

<style lang="scss" scoped>
    .supplier {
        &__container {
            @apply flex flex-col gap-[18px];
        }
        &__title {
            @apply text-[16px] font-[600] text-grayIcon;
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
