<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="joinGarden"
        >
            <div class="joinGarden__container">
                <template v-for="(item, index) in menuData" :key="index">
                    <RouterLink :to="item.url" class="shortcut__container">
                        <div class="shortcut__main-content">
                            <Icon
                                :icon-name="item.icon"
                                class="shortcut__icon"
                            />
                            <span class="shortcut__title">
                                {{ item.label }}
                            </span>
                        </div>
                        <Icon iconName="ArrowNext" />
                    </RouterLink>
                </template>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { RouterLink, useRoute } from 'vue-router';

    const route = useRoute();

    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
            url: `/environnement/${route.params.id}/jardin-collectif`
        },
        {
            label: 'Joindre un jardin collective existant',
        },
    ];

    const menuData = [
        {
            label: 'Terrain',
            url: 'terrain',
            icon: 'Pitch',
        },
        {
            label: 'Acteurs',
            url: 'acteurs',
            icon: 'Actor',
        },
        {
            label: 'Présentation du projet',
            url: 'Présentation-du-projet',
            icon: 'ProjectDisplay',
        },
        {
            label: 'Demander des informations complémentaires',
            url: 'demander-des-informations',
            icon: 'RequestInformation',
        },
        {
            label: 'Envoyer sa candidature',
            url: 'envoyer-sa-candidature',
            icon: 'SendApplication',
        },
    ];
</script>

<style lang="scss" scoped>
    .joinGarden {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        .shortcut {
            &__container {
                @apply flex items-center justify-between w-full py-3 px-5 rounded-lg border;
                border-color: var(--color-stroke-gray);
                @screen md {
                    &:hover {
                        @apply cursor-pointer;
                        color: var(--color-primary);
                    }
                }
            }

            &__main-content {
                @apply flex items-center duration-300;
            }

            &__title {
                @apply font-[600] text-grayIcon;
            }

            &__icon {
                @apply h-5 w-5 mr-4;
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
