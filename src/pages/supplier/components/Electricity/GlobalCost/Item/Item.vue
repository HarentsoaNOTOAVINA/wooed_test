<template>
   <div class="item">
        <div class="" :class="[isTotal ? 'item__header--isTotal' : 'item__header']">
            {{ title }}
        </div>
        <div class="item__content">
            <span class="item__content__cost">{{ separatorHandleFloat(cost.toFixed(2)) }}<sup>€</sup></span>
        </div>
   </div>
</template>
<script lang="ts" setup>
    import {separatorHandleFloat} from '@/utils/separator-number/SeparatorMiller';
    defineProps<{
        isTotal?: boolean;
        title: string;
        cost: number;
    }>();
</script>
<style lang="scss" scoped>
    .item {
        @apply w-full md:w-[380px] border border-primary rounded-[10px];
        &__header,
        &__header--isTotal,
        &__content {
            @apply p-[20px];
            &__cost {
                @apply text-center w-full block font-semibold text-[28px] text-primary;
            }
        }
        &__header {
            @apply rounded-tl-[10px] rounded-tr-[10px] bg-gray text-center;
            &--isTotal {
                @apply bg-primary text-white rounded-tl-[10px] rounded-tr-[10px] text-center;
            }
        }
    }
</style>