<template>
    <div class="sideAddProperty">
        <div class="sideAddProperty__title-mobile">
            <template v-for="(item, index) in menuData" :key="index">
                <div
                    v-if="item.title == menuActiveLabel[0].parentLabel"
                    class="menu-mobile sideAddProperty__menu"
                >
                    <span class="sideAddProperty__menu-count">
                        {{ index + 1 }}
                    </span>
                    <span>
                        {{ item.title }}
                    </span>
                </div>
            </template>
        </div>
        <div class="sideAddProperty__container">
            <div
                v-for="(item, index) in menuData"
                :key="index"
                class="sideAddProperty__items"
            >
                <div
                    :class="
                        item.content.length == 1 &&
                        menuActiveLabel[0].parentLabel === item.title
                            ? 'sideAddProperty__menu--active-single'
                            : menuActiveLabel[0].parentLabel === item.title
                            ? 'sideAddProperty__menu--active'
                            : ''
                    "
                    class="sideAddProperty__menu"
                >
                    <span class="sideAddProperty__menu-count">
                        {{ index + 1 }}
                    </span>
                    <span>
                        {{ Array.isArray(item.title) ? getDetailsLocation(item.title) : item.title }}
                    </span>
                </div>
                <div
                    v-if="
                        item.content.length > 1 &&
                        menuActiveLabel[0].parentLabel === item.title
                    "
                    class="sideAddProperty__submenu"
                >
                    <div
                        v-for="(subItem, index) in item.content"
                        :key="index"
                        :class="
                            subItem.title === menuActiveLabel[0].childLabel
                                ? 'sideAddProperty__submenu-content--active'
                                : ''
                        "
                        class="sideAddProperty__submenu-content"
                    >
                        {{ Array.isArray(subItem.title) ? getDetailsLocation(subItem.title) : subItem.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // import { data } from '@/pages/addProperty/data';
    // import { data } from '@/pages/addProperty/Teste/dataTeste';
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const props = defineProps({
        activeLabel: {
            type: null,
        },
        numberActive: {
            type: Number,
            default: '',
        },
        data: {
            type: Array<any>,
            default: null,
        },
    });

    const menuData = ref<Array<any>>(props.data);
    const menuActiveLabel = ref<any>(props.activeLabel);
    const menuActiveNumber = ref<number>(props.numberActive);

    watch(
        () => props.activeLabel,
        (v) => {
            menuActiveLabel.value = v;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.numberActive,
        (v) => {
            menuActiveNumber.value = v;
        },
        { immediate: true, deep: true }
    );

    function getDetailsLocation(data: Array<any>) {
        const enum Country {
            be = 'Belgique',
            lux = 'Luxembourg',
            fr = 'France',
        }
        const country =
        store.getters['AddProductModule/getAddPropertyDatas'] && store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ]['country'];
        if (country) {
            if (country === Country.be) {
                return data[0];
            } else if (country === Country.lux) {
                return data[1];
            } else if (country === Country.fr) {
                return data[2];
            } else {
                return data[0];
            }
        } else {
            return data[0];
        }
    }

    // onMounted(() => {
    //     const activeData = menuData.value.filter((item) => {
    //         console.log('item: ', item);
    //     });
    // });
</script>

<style lang="scss" scoped>
    @import '@/style.scss';

    .sideAddProperty {
        @apply h-full overflow-y-auto font-[600] text-grayIcon;
        @include scrollbar;
        &__container {
            @apply hidden;
            @screen md {
                @apply block;
            }
        }
        &__title-mobile {
            @screen md {
                @apply hidden;
            }
            .menu-mobile {
                @apply p-0;
            }
        }
        &__menu {
            @apply flex items-center gap-[14px] py-[12px] px-[14px] rounded-[8px];
            &-count {
                @apply text-white w-[20px] h-[20px] flex items-center justify-center rounded-full bg-grayIcon;
            }
            span:last-child {
                width: calc(100% - 36px);
            }
            &--active {
                @apply text-primary;
                .sideAddProperty__menu-count {
                    @apply bg-primary;
                }
                &-single {
                    @apply bg-gray;
                }
            }
        }
        &__submenu {
            @apply relative ml-[24px] pl-[24px];
            &::after {
                content: '';
                @apply absolute left-0 top-0 w-[1px] h-full bg-gray;
            }
            &-content {
                @apply py-[12px] px-[14px] rounded-[8px] text-grayBlack;
                &--active {
                    @apply bg-gray text-grayIcon;
                }
            }
        }
    }
</style>
