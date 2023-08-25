<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="carrierInfo__section">
        <div class="carrierInfo__container">
            <Profile />
            <Information />
            <span class="text-primary font-[600]">13 avis</span>
            <div class="carrierInfo__items">
                <div class="carrierInfo__item">
                    <span>Vue</span>
                    <div class="carrierInfo__item-grid">
                        <label :class="list ? 'active' : ''">
                            <input 
                                type="radio" 
                                v-model="list" 
                                name="listGrid" 
                                :value="true" 
                                hidden 
                            />
                            <Icon icon-name="List" />
                        </label>
                        <label :class="!list ? 'active' : ''">
                            <input 
                                type="radio" 
                                v-model="list" 
                                name="listGrid" 
                                :value="false" 
                                hidden 
                            />
                            <Icon icon-name="Grid" />
                        </label>
                    </div>
                </div>
                <!-- <div class="carrierInfo__lists" :class="!list ? ' carrierInfo__grid' : ''">
                    <div v-for="(item, index) in myPendingValidatedAnnouncements" :key="index">
                        <OtherUser :data="item" />
                    </div>
                </div> -->
            </div>
            <NextTrip />
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
import Icon from '@/components/Common/Icon/Icon.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import Information from '@/pages/transport/components/CarrierInfo/Information.vue';
import Profile from '@/pages/transport/components/CarrierInfo/Profile.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import OtherUser from '@/pages/transport/components/CarrierInfo/OtherUser.vue';

const store = useStore();

const breadcrumbListsData = [
    {
        url: '/transport',
        label: 'Transport',
    },
    {
        label: 'Information',
    },
];

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

const list = ref<boolean>(true);

// const myPendingValidatedAnnouncements = computed(() => store.getters["TransportModule/getMyPendingValidatedAnnoucements"]);
</script>
<style lang="scss" scoped>
.carrierInfo {
    &__section {
        @apply mt-[18px];
    }

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

        &:deep() {
            .cardItem {
                @apply grid-cols-1;
            }
        }
    }
}
</style>
