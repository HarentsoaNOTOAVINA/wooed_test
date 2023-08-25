<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="documentation">
            <div class="documentation__container">
                <Title type="h3" label="Documentation" class="documentation__title" />
                <hr class="__hr" />
                <div class="documentation__items"></div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    import { useRoute } from 'vue-router';

    const route = useRoute();

    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
            url: `/environnement/${route.params.id}/jardin-collectif`
        },
        {
            label: 'Mes jardin collectifs',
        },
    ];
</script>

<style lang="scss" scoped>
    .documentation {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
