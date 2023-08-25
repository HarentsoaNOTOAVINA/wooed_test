<template>
    <component :is="is" :class="`paragraphe__${type}`">
        <slot />
    </component>
</template>

<script lang="ts" setup>
    defineProps({
        is: {
            type: String,
            default: 'p',
        },
        type: {
            type: String,
            default: 'normal',
        },
        fontSize: {
            type: String,
            default: '14px',
        },
    });
</script>

<style lang="scss" scoped>
    p {
        font-size: v-bind(fontSize);
    }
    .paragraphe {
        &__bold {
            font-weight: bold;
        }
    }
</style>
