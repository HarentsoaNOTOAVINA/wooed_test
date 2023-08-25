<template>
    <div class="container-wrapper">
        <div>
            <label class="label" for="">
                <span v-if="required" class="required">*</span>
                {{ label }}
            </label>
        </div>
        <div>
            <a-radio-group
                :value="value"
                size="large"
                @change="handleChange"
                :name="props.name"
            >
                <a-radio
                    class="radio"
                    v-for="(item, key) in props.items"
                    :key="key"
                    :value="item.value"
                >
                    {{ item.label }}
                </a-radio>
            </a-radio-group>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { RadioGroup as ARadioGroup, Radio as ARadio } from 'ant-design-vue';
    import { ref, PropType, watch } from 'vue';

    interface itemType {
        inputValue?: string;
        label?: string;
        value?: number;
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
                    inputValue: '',
                    value: 0,
                },
            ],
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'name',
        },
        required: {
            type: Boolean,
            default: false,
        },
        defaultValue: {
            type: Boolean || String
        }
    });
    const value = ref<any>(props.defaultValue);

    watch(
        () => props.defaultValue,
        (newVal) => {
            value.value = newVal;
        },
        { immediate: true, deep: true }
    );

    function handleChange(e: any) {
        value.value = e.target.value;
        let selectedValue = props.items.find(
            (element: any) => element.value === e.target.value
        );
        emit('change', {
            [props.name]: selectedValue?.inputValue ?? selectedValue?.value,
            selectedValue,
        });
        // console.log('dddddddddddddd', selectedValue);
    }
</script>

<style lang="scss" scoped>
    .ant-radio-wrapper {
        &:deep() {
            display: flex;
        }
    }
    span.app-radio-value {
        &:deep() {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
        }
    }

    // .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner
    :deep(.ant-radio-inner, .ant-radio-checked) {
        border: 1px double var(--color-primary);
        &:hover {
            border-color: var(--color-primary);
        }
        &::after {
            background-color: var(--color-primary);
        }
    }

    label {
        @apply text-sm font-medium text-[var(--color-gray-icon)] mb-[10px] block;
    }

    .required {
        color: red;
        margin-right: 5px;
    }
</style>
