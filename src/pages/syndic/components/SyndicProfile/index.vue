<template>
    <MainCard :dataBreadcrumbs="breadcrumbData" :button="false">
        Titulaire du compte
    </MainCard>
</template>
<script lang="ts" setup>
import MainCard from '@/components/Display/MainCard/MainCard.vue';

const breadcrumbData = [
    {
        label: 'Titulaire du compte',
    },
];
</script>