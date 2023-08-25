<template>
    <DocumentTouristCard
        v-for="(item, index) in dataDocumentTourist"
        :dataTourist="item"
        :key="index"
    />
    <CardWrapperTitle typeTitle="h3" label="Attestation incendie">
    </CardWrapperTitle>
</template>

<script setup lang="ts">
    import CardWrapperTitle from '@/components/Display/CardWrapperTitle/CardWrapperTitle.vue';
    import DocumentTouristCard from './DocumentTouristCard.vue';
    import { dataDocumentTourist } from './DataDocumentTourist';
</script>

<style lang="scss" scoped></style>
