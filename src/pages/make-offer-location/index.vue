<template>
    <div class="container make__offer">
        <Form />
    </div>
</template>

<script lang="ts" setup>
    import Form from './components/Form/Form.vue';
</script>

<style lang="scss" scoped>
    .make {
        &__offer {
            @apply w-full;
        }
    }
</style>
