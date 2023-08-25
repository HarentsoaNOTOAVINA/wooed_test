<template>
    <div class="filter-button w-full">
        <div class="filter-button__wrap" @click="toggleFilter">
            <span class="filter-button__content">Filtre </span>
            <span class="filter-button__icon ant-dropdown-link">
                <FilterIcon />
                <ArrowBottom :class="show ? 'rotate-180' : ''" />
            </span>
        </div>
    </div>
</template>

<script setup>
import FilterIcon from '@/components/Icon/Filter.vue';
import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
import { ref } from 'vue';

const show = ref(false);

const emit = defineEmits(['toggle-filter']);

function toggleFilter() {
    show.value = !show.value;
    emit('toggle-filter', show.value);
}
</script>

<style lang="scss" scoped>
@import '@/style.scss';

.filter-button {
    @apply w-full;

    &__wrap {
        @apply flex items-center justify-between gap-x-[15px];
    }

    &__content {
        @apply block font-semibold text-[19.5px];
    }

    &__icon {
        @apply flex items-center gap-x-2.5 p-[4px] bg-gray rounded-[4px] cursor-pointer;

        &:deep() {
            svg path {
                @apply fill-primary transition;
            }
        }

        &:hover:active :deep() {
            svg path {
                @apply fill-secondary transition;
            }
        }
    }
}

.__hr {
    @apply text-gray my-[10px];
}
</style>
