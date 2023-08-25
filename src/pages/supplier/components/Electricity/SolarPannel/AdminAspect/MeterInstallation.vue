<template>
    <div class="electric-container">
        <Button class="btn" type-button="gray" @click="handleRedirect"
            >Contactez Sibelga</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';

    function handleRedirect() {
        window.open('https://www.sibelga.be/fr/contact', '_blank');
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .electric-container {
        @apply flex flex-col gap-[18px];
        @apply overflow-x-auto;
        @include scrollbar;
        .btn {
            @apply inline-block w-fit;
        }
    }
</style>
