<template>
    <div class="serviceCate">
        <div
            v-for="(item, index) in servicesCategory"
            :key="index"
            :class="[activeMainItem(index)]"
        >
            <div
                class="serviceCate__container"
                @click="handleFilterMenu(item, index)"
            >
                <!-- <component :is="item.icon" /> -->
                <span class="serviceCate__txt">{{ item.name }}</span>
                <DropDownIcon
                    v-if="item.subcategories.length > 0"
                    :class="[drowpDownHandler(index)]"
                />
            </div>
            <div
                v-for="(subCate, subIndex) in item.subcategories"
                :key="subIndex"
                v-if="showSubItem && activeIndex === index"
                :class="[activeSubItem(subIndex)]"
            >
                <span
                    @click="handleSubMenu(subCate, subIndex)"
                    class="serviceCate__txtSub"
                    >{{ subCate.name }}</span
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, computed } from 'vue';
    import DropDownIcon from '@/components/Icon/DropDown.vue';

    const props = defineProps(['servicesCategory']);
    const emit = defineEmits(['serviceHandler']);
    const activeIndex = ref<number>();
    const activeSubIndex = ref<number>();
    let showSubItem = ref<boolean>(false);
    let isDrop = ref<boolean>(false);

    const activeSubItem = (subIndex: number) => {
        return [
            'serviceCate__subCate',
            { activeSubCate: activeSubIndex.value === subIndex },
        ];
    };

    const activeMainItem = (index: number) => {
        return ['serviceCate__menu', { active: activeIndex.value === index }];
    };

    const drowpDownHandler = (index: number) => {
        return [
            'serviceCate__dropDown',
            isDrop.value && activeIndex.value === index ? 'down' : '',
        ];
    };

    const handleSubMenu = (subCate: any, subIndex: any) => {
        activeSubIndex.value = subIndex;
        emit('serviceHandler', subCate);

        console.log('subcate:', subCate);
    };

    const handleFilterMenu = (item: any, index: number) => {
        if (
            props.servicesCategory.indexOf(item) === index &&
            item.subcategories.length !== 0
        ) {
            emit('serviceHandler', item);
            isDrop.value = !isDrop.value;
            showSubItem.value = !showSubItem.value;
        }
        activeIndex.value = index;
        emit('serviceHandler', item);

        console.log('drop value:', isDrop.value);
    };
</script>

<style lang="scss" scoped>
    .serviceCate {
        // height: calc(100vh - 62px);
        @apply bg-[var(--color-white)] overflow-y-scroll;
        @media (min-width: 375px) {
            @apply h-[300px];
        }
        @media (min-width: 1024px) {
            height: calc(100vh - 62px);
        }

        &__container {
            @apply flex flex-row justify-between p-[14px] cursor-pointer;
        }
        &__txt {
            @apply text-base;
        }
        &__dropDown {
            transform: rotate(270deg);
            &.down {
                transform: rotate(0deg);
            }
        }

        &__menu {
            // @apply flex p-[14px];
            cursor: pointer;

            &:hover {
                @apply cursor-pointer bg-[var(--color-primary)];
            }

            &.active {
                @apply bg-[var(--color-gray)];
            }
        }

        &__subCate {
            @apply flex flex-col gap-[5px] ml-[40px] p-[4px];
            &:hover {
                @apply cursor-pointer bg-[var(--color-white)];
            }
            &.activeSubCate {
                @apply bg-[var(--color-stroke-gray)];
            }
        }
        &__txtSub {
            @apply text-sm;
        }
    }
</style>
