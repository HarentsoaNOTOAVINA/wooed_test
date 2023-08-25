<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="delivery__section">
        <div class="delivery__container">
            <TransportSlideMenu
                :slideMenu="slideMenuData"
                :announceMenu="true"
            />
            <div class="delivery__items">
                <div class="delivery__container--empty">
                    <div class="delivery__items--empty">
                        <Icon icon-name="TransportPark" />
                        <div>
                            <Paragraphe>
                                Vous souhaitez transporter des colis?
                            </Paragraphe>
                            <Paragraphe>
                                Cherchez les annonces qui correspondent a vos
                                trajets et prenez contact avec les expéditeurs.
                            </Paragraphe>
                            <Paragraphe>
                                Avec transport colis, vous êtes paye(e) le jour de la
                                livraison
                            </Paragraphe>
                        </div>
                        <Button class="delivery__button">Voir les annonces</Button>
                    </div>
                </div>
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import TransportSlideMenu from '@/pages/transport/components/TransportSlideMenu.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';

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
            label: 'Mes livraisons',
        },
    ];

    const slideMenuData = [
        {
            label: 'Faire une recherche',
            icon: 'SearchGreen',
            labelContent: 'Recherche: titre, reference',
            link: '#',
        },
        {
            label: 'Tous mes livraison',
            icon: 'TransportPark',
            labelContent: 'Vous avez partager 01 annonce',
            link: '#',
        },
    ];
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .delivery {
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
                @apply flex flex-col gap-y-[10px] py-[10px] text-grayIcon text-center;
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
    }
</style>
