<script lang="ts" setup>
    import { Switch } from 'ant-design-vue';
    import { ref, watch, onMounted } from 'vue';

    const checked = ref<Boolean>(false);
    const emit = defineEmits(['switchValue', 'handleSwitch']);

    const props = defineProps({
        checkedName: {
            type: String,
            default: 'OUI',
        },
        uncheckedName: {
            type: String,
            default: 'NON',
        },
        name: {
            type: String,
            default: '',
        },
        itemLabel: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        switchRounded: {
            type: Boolean,
            default: false,
        },
        checkedDefault: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Boolean,
            default: undefined,
        },
        toAlign: {
            type: Boolean,
            default: undefined,
        },
        isChecked: {
            type: Boolean,
            default: false,
        },
    });

    // const checked = ref<Boolean>(props.checkedDefault);

    onMounted(() => {
        if (props.value !== undefined) checked.value = props.value;
    });

    watch(
        () => props.isChecked,
        (v) => {
            checked.value = v;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => checked.value,
        (first) => {
            emit('switchValue', first);
            emit('handleSwitch', { [props.name]: first });
        }
    );

    watch(
        () => props.checkedDefault,
        (first) => {
            emit('switchValue', first);
            emit('handleSwitch', { [props.name]: first });
        }
    );
</script>

<template>
    <div
        class="switch"
        :class="`${switchRounded === true ? 'switch-rounded' : ''} ${
            toAlign == true ? 'alignLabel' : ''
        }`"
    >
        <label for="" class="switch__label">{{ props.itemLabel }}</label>
        <Switch
            :disabled="disabled"
            v-if="switchRounded === false"
            v-model:checked="(checked as any)"
            :checked-children="props.checkedName"
            :un-checked-children="props.uncheckedName"
            :name="props.name"
        />
        <Switch
            v-else
            v-model:checked="(checked as any)"
            :name="props.name"
            class="switch__rounded"
            :disabled="disabled"
        />
    </div>
</template>

<style scoped lang="scss">
    .switch {
        @apply flex flex-col;

        &__label {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-gray-icon);
            margin-bottom: 10px;
            display: block;
        }
        &:deep() {
            .ant-switch {
                @apply h-[34px] w-[115px] rounded-[4px];
                background-color: var(--color-gray);
                color: var(--color-secondary);
            }
            .ant-switch-checked {
                color: var(--color-gray);
                background-color: var(--color-primary);
            }
            .ant-switch-handle {
                @apply h-[80%] w-[50px] rounded-[4px] mt-[1px];
            }
            .ant-switch-checked .ant-switch-handle {
                left: calc(100% - 53px);
            }
            .ant-switch-checked .ant-switch-inner {
                margin: 0 50px 0 7px;
            }
            .ant-switch-inner {
                color: var(--color-primary);
            }
            .ant-switch-handle::before {
                @apply rounded-[4px];
            }
            .ant-switch-inner {
                margin: 0 7px 0 50px;
            }
            .ant-switch-checked .ant-switch-inner {
                color: white;
            }
        }
    }
    .switch-rounded {
        @apply flex flex-row-reverse justify-end gap-[14px];
        .switch__label {
            @apply mb-0;
        }
        &:deep() {
            .ant-switch {
                @apply h-[24px] w-[40px] rounded-[12px];
            }
            .ant-switch-handle {
                @apply h-[16px] w-[16px] rounded-full top-[50%] -translate-y-[50%] m-0;
                left: 4px;
            }
            .ant-switch-checked .ant-switch-handle {
                left: calc(100% - 20px);
                &:before {
                    @apply rounded-full bg-white;
                }
            }
            .ant-switch-checked .ant-switch-inner {
                margin: 0;
            }
            .ant-switch-handle::before {
                @apply rounded-full bg-primary;
            }
            .ant-switch-inner {
                margin: 0;
            }
        }
    }

    .alignLabel {
        @apply flex flex-row items-center gap-[10px];

        &:deep() {
            label {
                @apply mb-0;
            }
        }
    }
</style>
