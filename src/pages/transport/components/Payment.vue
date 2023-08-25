<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="payment__section">
        <div class="payment__container">
            <TransportSlideMenu
                :slideMenu="slideMenuData"
                :announceMenu="true"
            />
            <div class="payment__items">
                <div class="payment__item">
                    <span>Vue</span>
                    <FilterButton :filter-item="filterItemData" />
                </div>
                <div class="payment__container--empty">
                    <div class="payment__items--empty">
                        <Icon icon-name="BigMarkerRoad" />
                        <div>
                            <Paragraphe>
                                Vous souhaitez transporter des objet?
                            </Paragraphe>
                            <Paragraphe>
                                Enregistrer votre trajet pour être prévenu(e)
                                lorsqu’un objet est sur votre route>
                            </Paragraphe>
                        </div>
                        <Button class="payment__button">
                            Proposer un trajet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import TransportSlideMenu from './TransportSlideMenu.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { ref } from 'vue';
    import Button from '@/components/Common/Button/Button.vue';
    import FilterButton from './FilterButton.vue';

    const visible = ref(false);

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    const breadcrumbListsData = [
        {
            label: 'Mes payments',
        },
    ];

    const slideMenuData = [
        {
            label: 'Dépense',
            icon: 'NewTrajet',
            labelContent: 'Les 30 derniers jours',
            link: '#',
        },
        {
            label: 'Faire une recherche',
            icon: 'SearchGreen',
            labelContent: 'Recherche: titre, reference',
            link: '#',
        },
        {
            label: '0.00€',
            icon: 'MoneyBagOrange',
            labelContent: 'Votre compte',
            link: '#',
        },
    ];

    interface filterItemData {
        name: string;
        label: string;
    }
    const filterItemData = [
        {
            name: 'filter 1',
            label: 'Filter 1',
        },
        {
            name: 'filter 2',
            label: 'Filter 2',
        },
    ];
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .payment {
        &__container {
            @apply h-full flex flex-col gap-y-[18px];
            &--empty {
                @apply h-full;
                @media (min-height: 442px) {
                    @apply h-full flex justify-center items-center;
                }
            }
        }
        &__items {
            @apply h-full flex flex-col gap-[14px];
            &--empty {
                @apply max-w-[416px] flex flex-col gap-y-[10px] py-[10px] text-grayIcon text-center;
                &:deep {
                    p {
                        @apply mb-0;
                    }
                    svg {
                        @apply w-[60px] h-[60px];
                        path {
                            @apply stroke-strokeGray;
                        }
                    }
                }
            }
        }
        &__button {
            &:deep() {
                button {
                    @apply bg-gray text-grayIcon font-[600];
                }
            }
        }
        &__item {
            @apply flex justify-between items-center;
        }
        &__item-filer {
            @apply flex items-center gap-[7px] cursor-pointer max-w-max;
            &:hover {
                @apply bg-gray;
            }
        }
    }

    .filter {
        &__lists {
            @apply flex flex-col gap-[4px] px-[5px];
        }
        &__item {
            @apply py-[2px] cursor-pointer rounded-[4px];
            &:hover {
                @apply bg-gray px-[10px] -mx-[10px] text-primary transition;
            }
        }
    }
</style>
