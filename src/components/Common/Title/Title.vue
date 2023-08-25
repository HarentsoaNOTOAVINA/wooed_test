<template>
    <component :is="type">
        {{ label }}
        <slot />
    </component>
</template>

<script lang="ts" setup>
    defineProps({
        type: {
            type: String,
            required: true,
            default: 'h1',
        },
        label: {
            type: [String, Number],
        },
        weight: {
            type: [Number, String],
            default: 'normal',
        },
        color : {
            type: String
        }
    });
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 24px;
        font-weight: v-bind(weight);
        @screen lg {
            font-size: 30px;
        }
    }
    h2 {
        font-size: 18px;
        font-weight: v-bind(weight);
        @screen lg {
            font-size: 24px;
        }
    }
    h3 {
        font-size: 18px;
        font-weight: v-bind(weight);
        color: v-bind(color)
    }
    h4 {
        font-size: 16px;
        font-weight: v-bind(weight);
    }
</style>
