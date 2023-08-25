<template>
    <span class="srcImageEmpty">
        <Icon iconName="CardImage" />
        <span> Aucune image</span>
    </span>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
</script>

<style lang="scss" scoped>
    .srcImageEmpty {
        border: 1px solid;
        @apply w-full h-full flex flex-col items-center justify-center gap-[14px] text-center text-grayIcon border-gray rounded-[8px];
        &:deep() {
            svg {
                @apply w-[100px] h-[50px];
            }
        }
    }
</style>
