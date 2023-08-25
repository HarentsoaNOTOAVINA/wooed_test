<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="RequestBounty">
            <div class="RequestBounty__container">
                <Title
                    type="h3"
                    label="Demander une prime"
                    class="RequestBounty__title"
                />
                <hr class="__hr" />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const breadcrumbListsData = [
        {
            label: 'Trouver un entrepreneur',
        },
    ];
</script>

<style lang="scss" scoped>
    .RequestBounty {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
