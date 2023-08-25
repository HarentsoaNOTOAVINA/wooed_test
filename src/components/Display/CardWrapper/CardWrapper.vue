<template>
    <div :class="class" class="card-wrapper">
        <slot />
    </div>
</template>
<script lang="ts" setup>
    defineProps({
        class: String,
    });
</script>
<style lang="scss" scoped>
    .card-wrapper {
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid var(--color-gray);
        padding: 10px;
        width: 100%;
        @screen lg {
            padding: 20px;
        }
    }
</style>
