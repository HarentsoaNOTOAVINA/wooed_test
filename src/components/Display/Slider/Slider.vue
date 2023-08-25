<template>
    <div class="app-slider">
        <a-slider
            :min="min"
            :max="max"
            :tooltip-placement="(tooltipPlacement as any)"
            @change="$emit('change', $event)"
            v-model:value="value"
        />
        <div class="app-slider__mark">
            <Paragraphe is="span" type="bold">0</Paragraphe>
            <Paragraphe is="span" type="bold">{{ max }}</Paragraphe>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { Slider as ASlider } from 'ant-design-vue';
    import { ref } from 'vue';

    const props = defineProps({
        max: {
            type: Number,
            default: 10,
        },
        min: {
            type: Number,
            default: 0,
        },
        tooltipPlacement: {
            type: String,
            default: 'top',
        },
        defaultValue: {
            type: Number,
            default: 0,
        },
    });

    const value = ref<number>(props.defaultValue);
</script>

<style lang="scss" scoped>
    .app-slider {
        &:deep() {
            .ant-slider-handle {
                width: 25px;
                height: 14px;
                border-radius: 8px;
                background-color: var(--color-primary);
                border-color: #fff;
            }
            .ant-slider-track,
            .ant-slider-rail {
                background-color: var(--color-gray-icon);
            }
            .ant-slider {
                margin-bottom: 0;
            }
        }
        &__mark {
            color: var(--color-gray-icon);
            @apply flex justify-between;
        }
    }
</style>
