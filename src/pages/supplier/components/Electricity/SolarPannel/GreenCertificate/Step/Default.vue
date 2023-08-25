<template>
    <div class="default">
        <Button @click="$emit('on-get-choice', 'number')" type-button="border"
            >Spécifier le nombre de certificats</Button
        >
        <Button @click="$emit('on-get-choice', 'file')" type-button="border"
            >Introduire le(s) certificat(s)</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
</script>
<style lang="scss" scoped>
    .default {
        @apply flex justify-evenly flex-wrap gap-[10px];
    }
</style>
