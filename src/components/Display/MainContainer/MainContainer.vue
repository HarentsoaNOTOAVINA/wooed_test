<template>
    <div class="mainContainer">
        <slot />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .mainContainer {
        @apply container mt-[18px];
    }
</style>
