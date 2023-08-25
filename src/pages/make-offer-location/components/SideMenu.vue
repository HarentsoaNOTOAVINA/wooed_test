<template>
    <div class="sideMenu__section">
        <div class="sideMenu__container-mobile">
            <div class="sideMenu__item">
                <Icon :icon-name="activeData.icon" />
                <div class="sideMenu__label-container">
                    <span class="sideMenu__label"> {{ activeData.label }} </span>
                </div>
            </div>
        </div>
        <ul class="sideMenu__container">
            <li v-for="(item, index) in dataSideMenu" :key="index" class="sideMenu__item"
                :class="[activeData.name === item.name ? 'sideMenu__active' : '']" @click="setActiveDisplayData(item)">
                <Icon :icon-name="item.icon" />
                <div class="sideMenu__label-container">
                    <span class="sideMenu__label">
                        {{ item.label }}
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import { dataSideMenu } from "@/pages/make-offer-location/data";
import { computed, ref, watch } from 'vue';

import { useStore } from "vuex";


const emit = defineEmits(["set-active-display-data"]);


const store = useStore()

const activeData = computed(() => store.getters["RentalModule/getActiveDisplayData"] );

function setActiveDisplayData(item: any) {
    emit("set-active-display-data", item);
}
</script>
<style lang="scss" scoped>
@import '@/style.scss';

.sideMenu {
    &__section {
        @apply flex bg-white rounded-lg p-3 w-full;

        @screen md {
            max-width: 315px;
            height: calc(100vh - 94px);
        }
    }

    &__container {
        @apply hidden;

        @screen md {
            @include scrollbar;
            @apply block w-full overflow-y-auto;
        }

    }

    &__label-container {
        @apply flex items-center;
    }

    &__label {
        @apply truncate inline-block;
    }

    &__container-mobile {
        @apply block w-full;

        @screen md {
            @apply hidden;
        }

        .sideMenu {
            &__item {
                @apply m-0 p-0;

                &__label {
                    @apply truncate inline-block;
                }
            }
        }

        &__item {
            @apply p-0 pointer-events-none;
        }
    }

    &__item {
        @apply font-semibold flex px-3 w-full py-4 my-[5px] rounded-lg duration-300 gap-x-[16px];

        @screen md {
            &:hover {
                @apply bg-gray cursor-pointer;
            }

            &.active {
                @apply bg-gray;
            }
        }
    }

    &__icon {
        @apply mr-[18.5px] w-4 h-4;
    }

    &__active {
        @apply bg-gray cursor-pointer my-[5px];
    }
}
</style>
