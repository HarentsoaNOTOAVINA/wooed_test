<template>
    <div>
        <hr class="hrContainer__hrSeparator" :style="color" />
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        color: {
            type: String,
            default: "var(--color-gray)"
        },
    });
</script>

<style lang="scss" scoped>
    hr {
        color: v-bind(color);
        @apply my-[18px];
    }
</style>
