<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData">
            <div class="Dégradationst__container">
                
            </div>
        </MainCard>
    </div>
</template>

<script setup lang="ts">
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const breadcrumbListsData = [
        {
            label: 'Dégradations',
        },
    ];
</script>

<style lang="scss" scoped>
    .Dégradationst {
        &__container {
            @apply flex flex-col gap-y-[14px];
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
