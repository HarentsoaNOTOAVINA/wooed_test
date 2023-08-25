<template>
    <MainCard :data-breadcrumbs="breadcrumb" class="mt-[18px]">
        <MaifAssurance :property="propertyDetail" />
        <!-- <StepsAssurance /> -->
    </MainCard>
</template>
<script lang="ts" setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import StepsAssurance from './components/Steps/StepsAssurance.vue';
    import MaifAssurance from '@/pages/assurance/components/MaifAssurance/MaifAssurance.vue';
    import { useStore } from 'vuex';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const propertyId = ref<any>();
    const route = useRoute();
    const store = useStore();

    const propertyDetail = computed(
        () => store.getters['ManagePropertyModule/getDetailsProperty']
    );
    const country = ref<string>();

    const breadcrumb = [{ label: 'Assurance' }];

    watch(
        () => propertyDetail.value,
        (v) => {
            country.value = v.codeCountry;
        },
        { immediate: true }
    );

    onMounted(() => {
        propertyId.value = route.params.id;
        store.getters['ManagePropertyModule/getDetailsProperty'];
        country.value = propertyDetail.value.codeCountry;
    });
</script>

<style lang="scss" scoped>
    .container {
        @apply mx-auto mt-[18px] px-[24px];
    }
</style>
