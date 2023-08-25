<template>
    <div class="sideMenu__section">
        <transition mode="out-in" name="fade-menu">
            <div
                class="sideMenu__container-mobile"
                :class="{
                    'sideMenu__container-mobile--is-on-back': !isMenuSelected,
                }"
            >
                <div v-if="activeData" class="flex items-center">
                    <ArrowBack @click="onbacktoMenu" />
                    <div class="sideMenu__item">
                        <Icon :icon-name="activeData.icon" />
                        <span> {{ activeData.label }} </span>
                    </div>
                </div>
            </div>
        </transition>
        <transition mode="out-in" name="fade-menu">
            <div
                class="sideMenu__container"
                :class="{
                    'sideMenu__container--is-on-back': !isMenuSelected,
                }"
            >
                <a-menu
                    v-for="menu in MenuSideBar"
                    v-model:selectedKeys="selectedKeys"
                    v-model:openKeys="openKeys"
                    mode="inline"
                >
                    <a-menu-item
                        v-if="!menu.hasSubMenu"
                        :key="menu.key"
                        @click="click(menu, menu.key)"
                    >
                        <Icon :icon-name="menu.icon" />
                        <Title type="h4" weight="500" :label="menu.label" />
                    </a-menu-item>
                    <a-sub-menu :key="menu.key" v-if="menu.hasSubMenu">
                        <template #title>
                            <div class="submenu-content">
                                <Icon :icon-name="menu.icon" />
                                <Title
                                    type="h4"
                                    weight="500"
                                    :label="menu.label"
                                />
                            </div>
                        </template>
                        <a-menu-item
                            v-for="item in menu.subMenu"
                            :key="item.name"
                            class="sideMenu__item"
                            :class="[
                                nameActive === item.name
                                    ? 'sideMenu__active'
                                    : '',
                            ]"
                            @click="click(item, menu.key)"
                        >
                            <Icon :icon-name="item.icon" />
                            <span>
                                {{ item.label }}
                            </span>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { onMounted, ref, shallowRef, watch } from 'vue';
    import {
        Menu as AMenu,
        SubMenu as ASubMenu,
        MenuItem as AMenuItem,
    } from 'ant-design-vue';
    import Title from '@/components/Common/Title/Title.vue';

    interface IMenuSideBar {
        key: string;
        label: string;
        icon?: string;
        hasSubMenu?: boolean;
        subMenu?: Array<IsubMenuSideBar>;
    }
    interface IsubMenuSideBar {
        id: number;
        label: string;
        name: string;
        icon?: string;
        component?: object;
    }

    const props = defineProps({
        MenuSideBar: {
            type: Array<IMenuSideBar>,
            default: [],
        },
    });

    const emit = defineEmits<{
        (k: 'activeComp', v: any): void;
        (k: 'on-back-to-menu'): void;
    }>();
    const nameActive = ref<string>('');
    const activeData = shallowRef<any>(null);
    const isMenuSelected = ref<boolean>(false);
    const selectedKeys = ref<Array<string>>([]);
    const openKeys = ref<Array<string>>([]);

    onMounted(() => {
        window.innerWidth >= 768
            ? (selectedKeys.value = [props.MenuSideBar[0].key])
            : [];
    });

    function click(item: any, key: string) {
        if (item) {
            emit('activeComp', item);
            nameActive.value = item.name;
            activeData.value = item;
        }
        isMenuSelected.value = true;
        openKeys.value = [key];
    }

    function onbacktoMenu() {
        isMenuSelected.value = false;
        emit('on-back-to-menu');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .sideMenu {
        &__section {
            @apply flex bg-white rounded-lg p-3 w-full;

            @screen md {
                height: calc(100vh - 100px);
                max-width: 315px;
            }
        }

        &__container {
            @apply hidden;
            &--is-on-back {
                @apply block w-full;
                min-height: calc(100vh - 100px);
            }

            @screen md {
                @include scrollbar;
                @apply block w-full overflow-y-auto;
            }
            .submenu-content {
                @apply flex gap-[10px];
            }

            &:deep() {
                .ant-menu-item {
                    span {
                        @apply flex gap-[10px];
                    }
                    &::after {
                        border: none;
                    }
                }
                .ant-menu-item-selected {
                    @apply bg-gray font-semibold flex px-3 w-full py-4 my-[5px] items-center rounded-lg duration-300 gap-x-[16px];
                    .ant-menu-title-content {
                        color: var(--color-primary);
                    }
                }
                .ant-menu-submenu {
                    ul {
                        padding: 10px;
                    }
                }
                .ant-menu-submenu-active,
                .ant-menu-submenu-selected {
                    .ant-menu-submenu-arrow,
                    .ant-menu-submenu-title {
                        color: var(--color-primary);
                    }
                }
                .ant-menu-submenu-arrow {
                    color: var(--color-primary);
                }
                .ant-menu-inline {
                    border: none;
                    overflow: hidden;
                }
            }
        }

        &__container-mobile {
            @apply block w-full;
            &--is-on-back {
                @apply hidden;
            }

            @screen md {
                @apply hidden;
            }
            .sideMenu__item {
                @apply m-0 p-0 flex justify-end;
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
    }
</style>
