<template>
    <div class="top-menu__wrapper">
        <div v-if="screenType >= 1024" class="top-menu__on-laptop">
            <div v-for="(item, index) in menuData" :key="index" class="top-menu__element-on-laptop"
                :class="index === current ? 'top-menu__element-on-laptop--active' : ''"
                @click="handleClick(item, index)">
                {{ item.titre }}
            </div>
        </div>
        <div v-else class="top-menu__element-on-mobile">
            <div class="top-menu__element-on-mobile__element">
                {{ activeMenuTitle }}
            </div>
            <div v-if="dropDownMenuData !== undefined" class="top-menu__element-on-mobile__element">
                <TopMenu :menu-data="dropDownMenuData" :name-active="dropDownMenuLabel" @click="handleClick" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, PropType, watch, onMounted } from 'vue';
import TopMenu from '@/pages/Environment/components/TopButton.vue';

const screenType = ref<number>(screen.width);

interface IMenuItem {
    titre: string,
    items?: object[]
}

const props = defineProps({
    menuData: {
        type: Array as PropType<IMenuItem[]>,
        default: []
    },
    activeMenuTitle: {
        type: String,
        default: ''
    },
    dropDownMenuData: {
        type: Array as PropType<IMenuItem[]>,
        default: undefined
    },
    dropDownMenuLabel: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(["click"]);

const current = ref<number>(0);

function handleClick(value: any, index: any) {
    if (index) {
        current.value = index;
    } else {
        let title = value.titre;
        current.value = props.menuData.findIndex((element: any) => element.titre === title);
    }
    emit('click', value);
}
</script>
<style lang="scss" scoped>
.top-menu {
    &__wrapper {
        @apply w-full flex gap-x-4 h-[50px] text-center flex-auto;
    }

    &__on-laptop {
        @apply w-full flex;
    }

    &__element-on-laptop {
        @screen md {
            @apply w-1/3 cursor-pointer flex items-center justify-center text-center;

            &:hover {
                color: var(--color-primary)
            }

            &--active {
                @apply border-b-2 font-semibold;
                border-color: var(--color-primary);

                &:hover {
                    color: var(--color-secondary)
                }
            }
        }
    }

    &__element-on-mobile {
        @apply w-full flex items-center justify-between text-left;
        width: 100%;
        &__element {
            @apply w-1/2 truncate;
        }
    }
}
</style>