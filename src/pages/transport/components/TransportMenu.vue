<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="transportMenu__section">
        <div class="transportMenu__container">
            <TransportSlideMenu :slideMenu="slideMenuData" class="transportMenu__items"
                @set-active-component="handleShortcut($event)" />
            <div class="transportMenu__items-wrapper">
                <div class="transportMenu__items">
                    <div class="transportMenu__items-head">
                        <Title type="h3" weight="600" label="Mes annonces en cours de livraison"
                            class="transportMenu__items-title" />
                        <!-- <button>Voir plus</button> -->
                    </div>
                    <AnnounceSlide v-if="myPendingValidatedAnnouncements.length >= 0"
                        :data="myPendingValidatedAnnouncements" />
                    <div v-else class="transportMenu__content">
                        <div class="transportMenu__content-wrap">
                            <span class="label-content">
                                Aucun annonce en cours
                            </span>
                            <Button 
                                type-button="secondary" 
                                class="mx-auto"
                                @click="handleShortcut({ name: 'transport-create-announcement'})"
                            >
                                Ajouter une annonce
                            </Button>
                        </div>
                    </div>
                </div>
                <div class="transportMenu__items">
                    <div class="transportMenu__items-head">
                        <Title type="h3" weight="600" label="Mes montants" class="transportMenu__items-title" />
                    </div>
                    <div class="transportMenu__content transportMenu__content--montant">
                        <div class="montant__container">
                            <Icon icon-name="Money" />
                            <div class="montant__content">
                                <span class="montant__price">0€</span>
                                <span class="montant__label">
                                    Gagne en Novembre 2022
                                </span>
                            </div>
                        </div>
                        <div class="montant__container">
                            <Icon icon-name="MoneyBag" />
                            <div class="montant__content">
                                <span class="montant__price">0€</span>
                                <span class="montant__label">
                                    Gagne en 2022
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="transportMenu__items">
                    <div class="transportMenu__items-head">
                        <Title type="h3" weight="600" label="Les propositions de livraisons en attente de validation"
                            class="transportMenu__items-title" />
                        <!-- <button>Voir plus</button> -->
                    </div>
                    <AnnounceSlide v-if="myPendingPropositions.length > 0" :data="myPendingPropositions" />
                    <div v-else class="transportMenu__content">
                        <div class="transportMenu__content-wrap">
                            <span class="label-content">
                                Aucune proposition de livraison en cours
                            </span>
                            <!-- <Button 
                                type-button="secondary"
                                class="mx-auto"
                                @click="handleShortcut({ name: 'transport-create-announcement'})"
                            >
                                Ajouter une annonce
                            </Button> -->
                        </div>
                    </div>
                </div>
                <div class="transportMenu__items">
                    <div class="transportMenu__items-head">
                        <Title type="h3" weight="600" label="Mes trajets" class="transportMenu__items-title" />
                    </div>
                    <div v-if="myRouteList.length > 0" class="transportMenu__trajet">
                        <template v-for="(item, index) in myRouteList" :key="index">
                            <ColisCardItem :smallCard="true" :colisData="item" />
                        </template>
                    </div>
                    <div v-else class="transportMenu__content">
                        <div class="transportMenu__content-wrap">
                            <span class="label-content">Aucun trajet en ligne</span>
                            <Button type-button="secondary" @click="
                                handleShortcut({ component: TargetPurpose })
                            ">
                                Ajouter un trajet
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import Title from '@/components/Common/Title/Title.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import TransportSlideMenu from '@/pages/transport/components/TransportSlideMenu.vue';
import ColisCardItem from '@/pages/transport/components/ColisCardItem.vue';
import TargetPurpose from '@/pages/transport/components/targetPurpose/targetPurpose.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import AnnounceSlide from './AnnounceSlide.vue';

const store = useStore();
const router = useRouter();

const screenType = ref<string | number>(screen.width);

const emit = defineEmits(['set-active-component']);

const breadcrumbListsData = [
    {
        label: 'Transport',
    },
];

const slideMenuData = [
    {
        label: 'Expédier ou recevoir un colis',
        icon: 'BoxRed',
        routeName: 'transport-create-announcement',
    },
    {
        label: 'Proposer un trajet',
        icon: 'GpsLocation',
        component: TargetPurpose,
    },
    {
        label: 'Consulter les annonces',
        icon: 'Announce',
        routeName: 'transport-announcements',
    },
];

const myPendingValidatedAnnouncements = computed(
    () => store.getters['TransportModule/getMyPendingValidatedAnnoucements']
);
const myPendingPropositions = computed(
    () => store.getters['TransportModule/getMyPendingPropositions']
);
const myRouteList = computed(
    () => store.getters['TransportModule/getRouteList']
);

function handleShortcut(value: any) {
    if (value.hasOwnProperty('name')) router.push(value);
    if (value.hasOwnProperty('component')) emit('set-active-component', value);
}
</script>
<style lang="scss" scoped>
@import '@/style.scss';

.transportMenu {
    &__container {
        @apply flex flex-col gap-y-[24px];
    }

    &__items {
        @apply flex flex-col gap-y-[18px];
    }

    &__items-wrapper {
        @apply grid grid-cols-6 gap-y-[24px] gap-x-[18px];

        @media (max-width: 515px) {
            @apply flex flex-col;

            .transportMenu__items-title {
                @apply min-h-0;
            }
        }

        .transportMenu__items:nth-child(2n + 1) {
            @apply col-span-6;
        }

        .transportMenu__items:nth-child(2n) {
            @apply col-span-6;
        }

        @screen md {

            .transportMenu__items:nth-child(1),
            .transportMenu__items:nth-child(2) {
                @screen md {
                    @apply col-span-6;
                }

                @screen lg {
                    @apply col-auto;
                }
            }
        }

        @screen lg {
            .transportMenu__items:nth-child(2n + 1) {
                @apply col-span-3;

                @screen lg {
                    @apply col-span-4;
                }
            }

            .transportMenu__items:nth-child(2n) {
                @apply col-span-3;

                @screen lg {
                    @apply col-span-2;
                }
            }
        }
    }

    &__items-head {
        @apply flex justify-between items-start;

        button {
            @apply text-primary;

            &:hover {
                @apply text-grayIcon;
            }
        }
    }

    &__items-title {
        @apply text-[16px] flex items-start min-h-[36px] truncate;

        @screen xl {
            @apply min-h-0;
        }
    }

    &__content {
        min-height: 212px;
        @apply h-full flex justify-center items-center p-[24px] gap-[10px] bg-gray rounded-[8px];

        &-wrap {
            @apply text-center flex flex-col gap-y-[14px];
        }

        .label-content {
            @apply text-grayIcon;
        }

        &--montant {
            @apply flex flex-col gap-y-[18px] bg-transparent p-0;

            @screen md {
                @apply flex-row min-h-0;
            }

            @screen lg {
                @apply flex-col min-h-[212px];
            }

            .montant {
                &__container {
                    @apply w-full h-full flex items-center p-[24px] gap-[10px] bg-gray rounded-[8px];
                }

                &__content {
                    @apply flex flex-col;
                }

                &__price {
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 29px;
                }

                &__label {
                    font-weight: 300;
                    font-size: 12px;
                    line-height: 18px;
                    @apply text-grayIcon truncate;
                }
            }
        }
    }

    &__trajet {
        @apply grid grid-cols-1 gap-[10px];

        @media (min-width: 375px) {
            @apply grid-cols-2;
        }

        @screen lg {
            @apply grid-cols-1;
        }
    }
}

.announce {
    &__lists {
        max-height: calc(100vh - 354px);
        @apply grid grid-cols-1 gap-[14px];

        &:deep() {
            @screen lg {
                .cardItem {
                    @apply grid-cols-6;

                    &__figure-wrap {
                        @apply col-span-2;
                    }

                    &__items {
                        @apply col-span-4;
                    }
                }
            }
        }
    }

    &__grid {
        @apply grid-cols-1;

        @screen sm {
            @apply grid-cols-2;
        }

        @screen md {
            @apply grid-cols-1;
        }

        @screen lg {
            @apply grid-cols-2;
        }

        @screen xl {
            @apply grid-cols-3;
        }

        &:deep() {
            .cardItem {
                @apply grid-cols-1;
            }
        }
    }
}
</style>
