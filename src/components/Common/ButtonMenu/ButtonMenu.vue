<template>
    <button class="button-menu" @click="$emit('on-click')">
        <div class="button-menu__wrap-icon">
            <component :is="isIcon" class="button-menu__icon"></component>
        </div>
        <slot />
    </button>
</template>

<script setup lang="ts">
    interface Props {
        isIcon?: Object;
        width?: string;
        height?: '54px' | string;
    }

    defineProps({
        height: {
            type: String,
            default: '54px',
        },
        width: {
            type: String,
        },
        isIcon: {
            type: null,
        },
    });
</script>

<style lang="scss" scoped>
    .button-menu {
        height: v-bind(height);
        border: 0.5px solid var(--color-stroke-gray);
        border-radius: 4px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 400;
        width: v-bind(width);
        @apply flex items-center px-[15px] mb-[15px];
        &__wrap-icon {
            width: 35px;
            height: 35px;
            margin-right: 12px;
            border-radius: 50%;
            @apply flex items-center justify-center;
            background-color: var(--color-gray);
        }
    }
</style>
