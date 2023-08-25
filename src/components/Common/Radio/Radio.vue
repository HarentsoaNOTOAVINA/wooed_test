<script setup lang="ts">
    import ARadio from 'ant-design-vue/lib/radio/Radio';
    import ARadioGroup from 'ant-design-vue/lib/radio/Group';
    import { ref, PropType } from 'vue';

    const props = defineProps({
        radioDefaultCheck: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        element: {
            type: Array as PropType<{[key : string] : any}[]>,
            default() {
                return [];
            },
        },
        name: {
            type: String,
            default: '',
        },
        align: {
            type: String,
            default: '',
        },
        classLabelRadio: {
            type: String,
            default: '',
        },
        defaultClass: {
            type: String,
            default: 'app-radio-group',
        },
        defaultValue : {
            type : [String,Number],
            default : ''
        },
        label: {
            type: String,
        },
    });

    const emit = defineEmits<{
        (event: 'get-radio-input', e: any): void;
        (event: 'handleChangeRadio', e: any): void;
    }>();

    const handleRadio = (value: any) => {
        let key = (value.target as HTMLInputElement).name;
        let val = (value.target as HTMLInputElement).value;

        const valueChoice: object = {
            [key]: val,
        };

        emit('get-radio-input', value);
        emit('handleChangeRadio', valueChoice);
    };

    const radioDefaultCheck = ref<any>( !!props.defaultValue ? props.defaultValue :  (props.element[0] as any).value);
</script>

<template>
    <div :class="[defaultClass, align]">
        <label v-if="props.label">{{ label }}</label>
        <a-radio-group
            :name="name"
            v-model:value="radioDefaultCheck"
            @change="handleRadio"
            :disabled="disabled"
            :def="props.defaultValue"
        >
            <a-radio
                v-for="(radio, index) in props.element"
                :key="index"
                :value="(radio as any).value"
            >
                <span
                    :class="[
                        classLabelRadio ? classLabelRadio : 'app-radio-value',
                    ]"
                    >{{ (radio as any).label || (radio as any).content }}</span
                >
            </a-radio>
        </a-radio-group>
    </div>
</template>

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

    .horizontal .ant-radio-group {
        &:deep() {
            display: flex;
            gap: 40px;
        }
    }
    .vertical .ant-radio-group {
        &:deep() {
            display: flex;
            flex-direction: column;
            gap: 25px;
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
</style>
