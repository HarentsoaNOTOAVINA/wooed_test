<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="announce__section mb-[18px]">
        <div class="announce__container">
            <TransportSlideMenu :slideMenu="slideMenuData" :announceMenu="true" @set-active-component="setActiveComponent" />
            <component :is="activeComponent" :announcements="announcementList" @set-announcement-details="handleClick" />
        </div>
        <Modal :is-show-modal="announcementData !== undefined" @on-back="hideModal"
            :width="screenType >= 1024 ? '800' : '520'" :title="announcementData ? announcementData.title : ''">
            <template #content>
                <AnnounceOverview 
                    :data="announcementData" 
                    :object-data="objectDetails"
                    :announcement-details="announcementDetails"
                />
                <div class="submition-button">
                    <Button
                        v-if="displayPropositionsBtn"
                        type-button="secondary"
                        class="btn"
                        @click="redirectTo"
                    >
                        Voir les propositions
                    </Button>
                </div>
            </template>
        </Modal>
    </MainCard>
</template>
<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import TransportSlideMenu from '@/pages/transport/components/TransportSlideMenu.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import AnnounceOverview from '@/pages/transport/components/AnnounceOverview.vue';
import AnnounceList from '@/pages/transport/components/myAnnounces/index.vue';
import SearchReference from '@/pages/transport/components/myAnnounces/searchReference.vue';

import { ref, onMounted, watch, computed, shallowRef } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const currentUser = computed(() => store.getters["UserModule/getUserDetails"]);

const store = useStore();
const router = useRouter();

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

const screenType = ref<number>(screen.width);

const list = ref<boolean>(true);
const announcementList = ref<any>([]);
const announcementData = ref<any>();
const announcementDetails = ref<any>();
const objectDetails = ref<any>();
const displayPropositionsBtn = ref<boolean>(false);

const breadcrumbListsData = [
    {
        label: 'Mes annonces',
    },
];

const slideMenuData = ref<any>([
    {
        label: 'Nouvelle annonce',
        icon: 'BoxAdd',
        labelContent: 'Déposer une annonce',
        routeName: 'transport-create-announcement'
    },
    {
        label: 'Faire une recherche',
        icon: 'SearchGreen',
        labelContent: 'Recherche: titre, reference',
        component: SearchReference

    },
    {
        label: 'Tous mes annonces',
        icon: 'BoxAll',
        labelContent: 'Vous avez partager aucune annonce',
        component: AnnounceList,
    },
]);

const activeComponent = shallowRef<any>(AnnounceList);

watch(() => activeComponent.value,
    (value) => {
        activeComponent.value = value;
    }, { immediate: true, deep: true }
)

watch(() => announcementData.value,
    (value) => {
        setDataForModal(value);
        announcementData.value = value;
        if (announcementData.value) checkPropositions();
    }, { immediate: true, deep: true }
)

watch(() => slideMenuData.value,
    (value) => {
        slideMenuData.value = value;
    }, { immediate: true, deep: true }
)

onMounted(async () => {
    await fetchAnnouncementsData();
});

async function fetchAnnouncementsData() {
    announcementList.value = await store.dispatch("TransportModule/fetchAnnouncements");
    announcementList.value = announcementList.value.filter((element: any) => element.user === currentUser.value.id);
    if (announcementList.value.length >= 1) slideMenuData.value[2].labelContent = `Vous avez partager ${announcementList.value.length} annonce(s)`;
}

function hideModal() {
    announcementData.value = undefined;
}

function handleClick($event: any) {   
    announcementData.value = $event;
}

function checkPropositions() {
    if (announcementData.value.propositions.length >= 1) displayPropositionsBtn.value = true;
}

function redirectTo() {
    let reference = announcementData.value.reference;
    store.dispatch("TransportModule/setPropositionList", reference);
    router.push({
        name: 'transport-propositions',
        params: { reference: reference }
    })
}

function setActiveComponent($event: any) {
    if ($event.component) activeComponent.value = $event.component;
}

function setDataForModal(value: any) {
  if (value) {
    announcementDetails.value = {
      image: value.photos[0].path,
      propositions: value.propositions,
      budget: value.budget,
      deliveryDate: value.deliveryDate
    };
    objectDetails.value = value.announcementObjects[0];
  };
}
</script>
<style lang="scss" scoped>
@import '@/style.scss';

.announce {
    &__container {
        @apply flex flex-col gap-y-[18px];
    }

    &__items {
        @apply flex flex-col gap-[14px];
    }

    &__item {
        @apply hidden justify-between items-center;

        @screen sm {
            @apply flex;
        }

        @screen md {
            @apply hidden;
        }

        @screen lg {
            @apply flex;
        }

        span {
            @apply text-[16px] font-[600];
        }

        &-grid {
            @apply flex gap-[4px];

            label {
                @apply cursor-pointer bg-white rounded-[4px];

                &:hover {
                    &:deep() {
                        @apply bg-gray;

                        svg {
                            path {
                                @apply fill-primary;
                            }
                        }
                    }
                }

                &.active {
                    @apply bg-gray;

                    &:deep() {
                        @apply bg-gray;

                        svg {
                            path {
                                @apply fill-primary;
                            }
                        }
                    }
                }
            }
        }
    }

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

.submition-button {
    @apply w-full flex justify-center;

    @screen md {
        @apply w-full flex justify-end;
    }

    .btn {
        @apply w-full font-semibold rounded-full my-2 py-1 z-10;
        width: -webkit-fill-available;

        @screen md {
            width: auto;
        }
    }
}
</style>
