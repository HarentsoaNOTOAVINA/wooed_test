<template>
    <div class="container-wrapper">
        <div v-if="label">
            <label class="label" for="">{{ label }}</label>
        </div>
        <div>
            <a-radio-group
                v-model:value="SelectValue"
                size="large"
                @change="handleChange"
            >
                <a-radio-button
                    v-for="(item, key) in props.items"
                    :key="key"
                    :value="item.value"
                >
                    {{ item.label }}
                </a-radio-button>
            </a-radio-group>
        </div>
    </div>
</template>
<script setup lang="ts">
    import ARadioGroup from 'ant-design-vue/lib/radio/Group';
    import ARadioButton from 'ant-design-vue/lib/radio/RadioButton';
    import { ref, PropType, OptionHTMLAttributes } from 'vue';

    interface itemType {
        value: string;
        label: string;
    }

    const emit = defineEmits<{
        (e: 'change', payload: any): void;
    }>();
    const props = defineProps({
        items: {
            type: Array as PropType<itemType[]>,
            default: [
                {
                    label: '',
                    value: '',
                },
            ],
        },
        label: {
            type: String,
            default: '',
        },
    });
    const SelectValue = ref(props.items[0].value);

    const handleChange = (e: any) => emit('change', { value: e.target.value });
</script>

<style lang="scss" scoped>
    .container {
        &-wrapper {
            @apply w-full py-3;
            &:deep() {
                .ant-radio-group {
                    @apply w-max flex items-center bg-gray rounded-[4px] p-[2px] gap-[1px];
                }
                .ant-radio-button-wrapper {
                    @apply bg-transparent border-none font-[400] transition-all;
                    &:before {
                        @apply hidden;
                    }
                    &:focus-within {
                        @apply shadow-none;
                    }
                    &:hover {
                        @apply text-secondary bg-white transition-all;
                    }
                }
                .ant-radio-button-wrapper-checked {
                    @apply bg-white rounded-[4px] text-black font-[600];
                }
            }
        }
        &-flex {
            @apply flex flex-wrap justify-between;
        }
    }
    .label {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-gray-icon);
        margin-bottom: 10px;
        display: block;
    }
</style>
