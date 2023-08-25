<template>
    <div class="sideMenu__section">
        <transition mode="out-in" name="fadeHeight">
            <div 
                v-if="activeData" 
                class="sideMenu__container-mobile" 
                :class="{ 'sideMenu__container-mobile--is-on-back': !isMenuSelected }"
            >
                <div class="flex items-center">
                    <div class="sideMenu__item">
                        <!-- <Icon :icon-name="activeData.icon" /> -->
                        <span> {{ activeData.label }} </span>
                    </div>
                </div>
            </div>
        </transition>
        <transition mode="out-in" name="fadeHeight">
            <div class="sideMenu__container-mobile sideMenu__mobile-menu" @click="toggleClick">
                <div class="sideMenu__item sideMenu__mobile">
                    <!-- <Icon :icon-name="activeData.icon" /> -->
                    <span> Menu </span>
                    <Icon icon-name="ArrowBottom" :class="toggleShow === true ? 'arrowTop' : ''" />
                </div>
            </div>
        </transition>
        <transition mode="out-in" name="fadeHeight">
            <div class="sideMenu__container" :class="{'sideMenu__container--is-on-back': !isMenuSelected}" v-show="toggleShow">
                <a-menu 
                    v-model:selectedKeys="selectedKeys" 
                    v-model:openKeys="openKeys" 
                    mode="inline"
                    @open-change="onOpenChange"
                >
                    <template v-for="item in currentMenuData">
                        <a-menu-item 
                            v-if="!item.subMenu" class="sideMenu__item" 
                            :class="[nameActive === item.name ? 'sideMenu__active': '']" 
                            :key="item.name" 
                            @click="handleClick(item, item.name)"
                            :disabled="gardenSelected === undefined"
                        >
                            <div class="submenu-content" :title="item.label">
                                <Icon :icon-name="item.icon" />
                                <span>
                                    {{ item.label }}
                                </span>
                            </div>
                        </a-menu-item>
                        <a-sub-menu 
                            v-else 
                            :key="item.id" 
                            :class="[nameActive === item.name ? 'sideMenu__active': '']"
                        >
                            <template #title>
                                <div class="submenu-content" :title="item.label">
                                    <Icon :icon-name="item.icon" />
                                    <span>
                                        {{ item.label }}
                                    </span>
                                </div>
                            </template>
                            <a-menu-item 
                                v-for="subItem in item.subMenu" 
                                :key="subItem.name" 
                                class="sideMenu__item"
                                :class="[nameActive === subItem.name ? 'sideMenu__active': '']" 
                                :title="subItem.label" 
                                @click="handleClick(subItem, subItem.name)"
                            >
                                <span>
                                    {{ subItem.label }}
                                </span>
                            </a-menu-item>
                        </a-sub-menu>
                    </template>
                </a-menu>
                <slot />
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import { dataSideMenu } from '@/pages/Environment/components/joinGardenExisting/SideMenu/DataSideMenu';
import { ref, shallowRef, computed, onMounted } from 'vue';
import {
    Menu as AMenu,
    SubMenu as ASubMenu,
    MenuItem as AMenuItem,
} from 'ant-design-vue';

import { useStore } from 'vuex';

const store = useStore();
const gardenSelected = computed(() => store.getters["CollectiveGardenModule/getSelectedGarden"]);

const emit = defineEmits<{
    (k: 'activeComp', v: any): void;
    (k: 'on-back-to-menu'): void;
}>();
const nameActive = ref<string>('');
const activeData = computed(() => {
    let index = activeDisplayIndex();
    if (index >= 0) {
        return currentMenuData[index];
    } else {
        return currentMenuData[0];
    }
});

// const activeData = shallowRef<any>(dataSideMenu[0]);
const isMenuSelected = ref<boolean>(true);
const selectedKeys = ref<Array<string>>(['pitch']);
const openKeys = ref<Array<string>>(['']);
const toggleShow = ref<boolean>(false);
const currentMenuData = shallowRef<any>(dataSideMenu);

function handleClick(item: any, key: string) {
    if (item) {
        emit('activeComp', item);
        nameActive.value = item.name;
        // activeData.value = item;
    }
    isMenuSelected.value = true;
    // openKeys.value = [key];
}

function toggleClick() {
    toggleShow.value = !toggleShow.value;
}

function onOpenChange(value: any) {
    openKeys.value = [value.at(-1) as string];
}

function activeDisplayIndex() {
    let index = -1;
    let activeDisplay = store.getters["CollectiveGardenModule/getActiveDisplay"];
    dataSideMenu.forEach((element: any, idx: number) => {
        if (element.component === activeDisplay) index = idx;
    })
    return index;
}

</script>

<style lang="scss" scoped>
@import '@/style.scss';

.sideMenu {
    &__section {
        @apply flex flex-col gap-y-[12px] rounded-lg w-full;

        @screen md {
            height: calc(100vh - 100px);
            max-width: 315px;
        }
    }

    &__container {
        @apply p-3 bg-white rounded-lg h-full flex flex-col gap-y-[10px];

        &--is-on-back {
            @apply block w-full;
            min-height: calc(100vh - 100px);
        }

        @screen md {
            display: flex !important;
            @include scrollbar;
            @apply w-full overflow-y-auto;
        }

        .submenu-content {
            @apply flex gap-[10px] w-full;

            &:deep() {
                .icon {
                    svg {
                        @apply w-[18px] h-[18px];
                    }
                }
            }
        }

        &:deep() {
            .ant-menu {
                @apply flex flex-col gap-y-[4px];
            }

            .ant-menu-item {
                padding: 0 12px !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                @apply min-h-[40px];

                span {
                    @apply flex gap-[10px];
                }

                &::after {
                    border: none;
                }

                &:hover {
                    @apply bg-gray transition rounded-lg;
                }

                .submenu-content {
                    span {
                        // overflow: hidden;
                        @include scrollbar;

                        &::-webkit-scrollbar-track {
                            @apply bg-transparent;
                        }

                        /* Handle */
                        &::-webkit-scrollbar-thumb {
                            @apply bg-transparent;
                        }

                        @screen md {
                            @apply truncate block;
                        }
                    }
                }
            }

            .ant-menu-item-selected {
                @apply bg-gray font-semibold flex px-3 py-4 my-[5px] items-center rounded-lg duration-300 gap-x-[16px];

                .ant-menu-title-content {
                    color: var(--color-primary);
                }
            }

            .ant-menu-title-content {
                @apply overflow-hidden;

                span {
                    overflow: overlay;
                    @include scrollbar;

                    &::-webkit-scrollbar-track {
                        @apply bg-transparent;
                    }

                    /* Handle */
                    &::-webkit-scrollbar-thumb {
                        @apply bg-transparent;
                    }

                    @screen md {
                        @apply truncate block;
                    }
                }
            }

            .ant-menu-submenu {
                ul {
                    padding-bottom: 0 !important;
                    @apply px-[10px];
                }
            }

            .ant-menu-submenu-selected {

                .ant-menu-submenu-arrow,
                .ant-menu-submenu-title {
                    @apply bg-gray text-primary cursor-pointer my-[5px] rounded-lg;
                }
            }

            .ant-menu-submenu-title {
                padding: 0 12px !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;

                &:hover {
                    @apply bg-gray transition rounded-lg;
                }
            }

            .ant-menu-submenu-active {
                .submenu-content {
                    span {
                        @apply text-black transition;
                    }
                }
            }

            .ant-menu-submenu-arrow {
                color: var(--color-primary);
            }

            .ant-menu-inline {
                border: none;
                // overflow: hidden;
                @apply overflow-x-hidden;
                @include scrollbar;
            }

            .ant-menu-sub {
                @apply relative ml-[20px] bg-transparent;

                &:after {
                    content: '';
                    @apply absolute h-full w-[1px] bg-gray top-0 left-0;
                }

                .ant-menu-item {
                    width: calc(100% - 10px);
                }
            }
        }
    }

    &__container-mobile {
        @apply block w-full p-[12px] bg-white rounded-lg;

        &--is-on-back {
            @apply hidden;
        }

        @screen md {
            @apply hidden;
        }

        .sideMenu__item {
            @apply m-0 p-0 flex;
        }

        &__item {
            @apply p-0 pointer-events-none;
        }
    }

    &__item {
        @apply font-semibold flex px-3 w-full py-4 my-[5px] items-center rounded-lg duration-300 gap-x-[16px];

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

    &__mobile-menu {
        @apply cursor-pointer bg-white;
        @include hoverButtonDark;
    }

    &__mobile {
        @apply flex items-center justify-between;

        .arrowTop {
            transform: rotateX(180deg);
        }
    }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 800px;
}

.fadeHeight-enter-from,
.fadeHeight-leave-to {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0px;
}
</style>
