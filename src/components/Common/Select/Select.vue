<template>
    <div class="custom-select__wrapper">
        <label v-if="label"
            ><span v-if="required" class="custom-select__wrapper--required"
                >*</span
            >{{ label }}</label
        >
        <a-select
            :options="(options as any[])"
            @change="handleChange"
            @deselect="handleRemove"
            :placeholder="placeholder"
            class="custom-select__content"
            :disabled="disabled"
            :mode="mode"
            :defaultValue="contentDefault"
            :value="currentSelectedValue"
            @update:value="$emit('update:value', $event)"
            :defaultOpen="defaultOpen"
            :open="isOpen"
            @dropdownVisibleChange="handleDropdownVisibleChange"
            :getPopupContainer="getCustomPopupContainer"
        >
            <template #suffixIcon>
                <LoadingB v-if="loading" theme="dark" size="xs" />
                <ArrowBottom v-else />
            </template>
        </a-select>
        <transition mode="in-out" name="fade-error">
            <p v-if="hasError?.status">
                <small class="custom-select__wrapper--error">{{
                    hasError?.errorMsg
                }}</small>
            </p>
        </transition>
    </div>
    <div
        v-if="defaultOpen"
        @click="handleButtonClick"
        class="custom-defaultOpen"
    >
        <Icon v-if="isOpen" icon-name="AddFile" />
        <slot v-else name="openSelect" />
    </div>
</template>

<script setup lang="ts">
    import ArrowBottom from '@/components/Icon/ArrowBottom.vue';
    import ASelect, { DefaultOptionType } from 'ant-design-vue/lib/select';
    import { ref, watch, onMounted } from 'vue';
    import LoadingB from '@/components/Icon/LoadingButton.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    interface IHasError {
        borderColor: string | number;
        placeholderColor: string | number;
    }
    interface IHasErrorProps {
        status: boolean;
        errorMsg: string;
    }
    interface Props {
        options?: any;
        name: string;
        placeholder?: string;
        disabled?: boolean;
        mode?: 'multiple' | 'tags';
        defaultValue?: any;
        hasError?: IHasErrorProps;
        required?: boolean;
        label?: string;
        value?: any;
        loading?: boolean;
        defaultOpen?: boolean;
        disabledOption?: number;
    }

    const initialErrorState: IHasError = {
        borderColor: 'var(--color-stroke-gray)',
        placeholderColor: '#c7c7c7',
    };
    const errorTheme = ref<IHasError>({ ...initialErrorState });

    const currentSelectedValue = ref<any>();

    // const loading = ref<boolean>(false);

    const selectProps = defineProps<Props>();

    const contentDefault = ref<string>(selectProps.defaultValue);

    const emit = defineEmits<{
        (event: 'change-select', value: any, option: any): void;
        (event: 'change-deselect', e: object): void;
        (event: 'update:value', value: any): void;
    }>();

    onMounted(() => {
        if (selectProps.value !== undefined)
            currentSelectedValue.value = selectProps.value;
    });

    watch(
        () => selectProps.hasError,
        () => {
            if (selectProps.hasError?.status) {
                errorTheme.value = {
                    borderColor: 'salmon',
                    placeholderColor: 'salmon',
                };
            } else {
                errorTheme.value = { ...initialErrorState };
            }
        },
        { immediate: true }
    );

    watch(
        () => selectProps.defaultValue,
        (value) => {
            contentDefault.value = value;
        },
        { immediate: true }
    );

    watch(
        () => selectProps.value,
        (value) => {
            if (value) currentSelectedValue.value = value
        },
        { immediate: true, deep: true }
    )

    const handleChange = (value: any, option: any) => {
        if (selectProps.mode === 'multiple') {
            const elementToUnselect = option.filter((element: any) => element.unselect === true);
            elementToUnselect.length > 0
                ? currentSelectedValue.value = value.filter((element: number) => element !== elementToUnselect[0].value)
                : currentSelectedValue.value = value;
        }

        const selectValue: object = {
            [selectProps.name]: value,
        };

        emit('change-select', selectValue, option);
    };

    const handleRemove = (value: any) => {
        const selectValue: object = {
            [selectProps.name]: value,
        };

        emit('change-deselect', selectValue);
    };

    const isOpen = ref<boolean>(false);

    function handleButtonClick() {
        if (isOpen.value) {
            isOpen.value = false;
        } else {
            isOpen.value = true;
        }
    }

    function handleDropdownVisibleChange(open: boolean) {
        isOpen.value = open;
    }

    function getCustomPopupContainer(trigger: HTMLElement): HTMLElement {
        const cardContainer = trigger.closest('.spec__filter');

        if (cardContainer) {
            return cardContainer as HTMLElement;
        }

        return document.body;
    }
</script>

<style lang="scss" scoped>
    .custom-select {
        &__wrapper {
            // @apply w-full;
            @apply mb-[18px] w-full;
            .fade-error-enter-active {
                transition: all 0.3s ease-in;
            }
            .fade-error-leave-active {
                transition: all 0.2s ease-out;
            }

            .fade-error-enter-from,
            .fade-error-leave-to {
                transform: translateY(-10px);
                opacity: 0;
            }
            &--required {
                color: red;
                margin-right: 5px;
            }
            &--error {
                color: salmon;
                width: 100%;
                @apply flex justify-end;
            }
            label {
                font-size: 14px;
                font-weight: 500;
                color: var(--color-gray-icon);
                margin-bottom: 10px;
                display: block;
            }
            &:deep() {
                .ant-select-selection-item-remove {
                    margin-top: -4px;
                    margin-left: 2px;
                }
            }
        }
        &__content {
            width: 100%;
            &:deep() {
                .ant-select-selector {
                    .ant-select-selection-placeholder {
                        color: v-bind('errorTheme.placeholderColor');
                    }
                    border: 1px solid v-bind('errorTheme.placeholderColor');
                    font-size: 14px;
                    min-height: 38px;
                    border-radius: 4px;
                    @apply flex items-center;
                    &:hover {
                        border: 1px solid var(--color-stroke-gray);
                    }
                    &:focus-within {
                        box-shadow: unset !important;
                        border: 1px solid var(--color-primary) !important;
                    }
                }
                .ant-select-selection-placeholder {
                    @apply flex items-center;
                }
            }
        }
    }

    label {
        @apply truncate;
    }
</style>