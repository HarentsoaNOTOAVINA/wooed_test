<template>
    <div>
        <MainCard
            :button="true"
            :borderBottom="true"
            :dataBreadcrumbs="breadcrumbListsData"
            class="action"
        >
            <div class="action__container">
                <Title type="h3" label="Action" class="action__title" />
                <hr class="__hr" />
                <DesiredAction />
                <!-- <CollectivePlots /> -->
            </div>
            <template #buttonFooter>
                
            </template>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import CollectivePlots from './Action/CollectivePlots.vue';
    import DesiredAction from './Action/DesiredAction.vue';
    import Wish from './Action/Wish.vue';

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
    .action {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__button {
            @apply flex justify-between gap-[10px] w-full;
            &:deep() {
                & > div,
                button {
                    @apply w-full;
                }
                .action__button-cancel {
                    button {
                        @apply bg-gray border-gray border-solid border-[1px] text-primary;
                    }
                }
                .action__button-next {
                    button {
                        @apply border-primary bg-primary;
                    }
                }
                @screen sm {
                    @apply justify-end;
                    & > div,
                    button {
                        @apply w-auto;
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
