<template>
    <div class="custom-input__fields">
        <div v-if="label" class="custom-input__label-icon">
            <label
                ><span v-if="required" class="custom-input__fields--required"
                    >*</span
                >{{ label }}</label
            >
            <div class="icon" v-if="hasIcon">
                <div
                    class="flex items-center gap-[10px]"
                    v-for="(item, index) in allIcon"
                    :key="index"
                >
                    <component v-if="item.name === iconName" :is="item.icon" />
                </div>
            </div>
        </div>
        <div
            class="relative"
            :class="[iconField || unity ? 'custom-input__fields--form' : '']"
        >
            <a-input
                ref="inputRef"
                @keyup="hanldeKeyup"
                :disabled="disabled"
                :id="(id as any)"
                style=""
                :placeholder="placeholder"
                :type="inputType"
                :name="nameInput"
                @input="handleInput($event, 'input')"
                @change="handleInput($event, 'change')"
                :addon-before="addonBefore"
                :maxlength="maxLength"
                @blur="handleBlur"
                @focus="handleFocus"
                v-model:value="valueModel"
                :max="max"
                :min="min"
                :default-value="defaultV"
                :loading="loading"
            >
                <template #suffix>
                    <LoadingB v-if="loading" theme="dark" size="xs" />
                </template>
            </a-input>
            <span v-if="unity" class="unit">{{ unity }}</span>
            <Icon
                v-else-if="iconField === true"
                :icon-name="iconName"
                class="unit"
                @click="$emit('on-click-icon')"
            />
            <span
                v-else-if="inputType === 'password'"
                class="unit cursor-pointer z-[1]"
            >
                <Icon
                    v-if="showPassword"
                    icon-name="Eye"
                    @click="handleShowPassword"
                />
                <Icon v-else icon-name="EyeSlash" @click="handleShowPassword" />
            </span>
            <transition mode="in-out" name="fade-error">
                <p
                    class="custom-input__fields--error__wrapper"
                    v-if="hasError?.status"
                >
                    <small class="custom-input__fields--error">{{
                        hasError?.errorMsg
                    }}</small>
                </p>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import AInput from 'ant-design-vue/lib/input';
    import { InputNumber as AInputNumber } from 'ant-design-vue';
    import { PropType, computed, ref, shallowRef, watch } from 'vue';
    import Icon from '../Icon/Icon.vue';
    import BankingLogos from '@/components/Icon/BankingLogos.vue';
    import LoadingB from '@/components/Icon/LoadingButton.vue';
    const componentsIcons = import.meta.globEager('@/components/Icon/*.vue');

    interface IHasError {
        borderColor: string | number;
        placeholderColor: string | number;
    }
    interface IHasErrorProps {
        status: boolean;
        errorMsg: string;
    }

    const initialErrorState: IHasError = {
        borderColor: 'var(--color-stroke-gray)',
        placeholderColor: '#c7c7c7',
    };
    const errorTheme = ref<IHasError>({ ...initialErrorState });
    const props = defineProps({
        id: {
            type: [String, Number],
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        model: {
            type: String,
            default: '',
        },
        nameInput: {
            type: String,
            default: '',
        },
        hasError: {
            type: Object as PropType<IHasErrorProps>,
            required: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        inputType: {
            type: String,
            default: 'text',
        },
        value: {
            type: [String, Number],
        },
        maxLength: {
            type: Number,
        },
        unity: {
            type: String,
            default: '',
        },
        hasIcon: {
            type: Boolean,
            default: false,
        },
        iconName: {
            type: String,
            default: '',
        },
        iconNameField: {
            type: String,
            default: '',
        },
        iconField: {
            type: Boolean,
            default: false,
        },
        vmodel: {
            type: String,
            default: '',
        },
        max: {
            type: Number,
        },
        min: {
            type: Number,
        },
        defaultValue: {
            type: String,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        // separator: {
        //     type: Boolean,
        //     default: false,
        // },
        disabled: Boolean,
        addonBefore: String,
    });
    const defaultV = ref<any>(props.defaultValue);
    const showPassword = ref<boolean>(false);
    const inputRef = ref();

    watch(
        () => props.hasError,
        () => {
            if (props.hasError?.status) {
                errorTheme.value = {
                    borderColor: 'salmon',
                    placeholderColor: 'salmon',
                };
            } else {
                errorTheme.value = { ...initialErrorState };
            }
        }
    );
    watch(
        () => showPassword.value,
        (v) => {
            showPassword.value = v;
        }
    );

    const emit = defineEmits<{
        (event: 'input', value: object): void;
        (event: 'change', value: object): void;
        (event: 'keyup', value: object): void;
        (event: 'blur'): void;
        (event: 'focus'): void;
    }>();

    const handleInput = (event: Event, name: string) => {
        const value = {
            [(event.target as HTMLInputElement).name]: (
                event.target as HTMLInputElement
            ).value,
        };
        emit(name as any, value);
    };

    // const handleChange = () => {
    //     emit('change');
    // };

    const handleBlur = () => {
        emit('blur');
    };
    const handleFocus = () => {
        emit('focus');
    };

    // const formattedValue = computed(() => {
    //     const value = valueModel.value;
    //     if (props.separator) {
    //         return value?.toLocaleString('fr-FR');
    //     } else {
    //         return value;
    //     }
    // });

    const allIcon = shallowRef<any>([]);
    const valueModel = ref<any>(null);

    watch(
        () => props.vmodel,
        (value) => {
            valueModel.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.defaultValue,
        (value) => {
            defaultV.value = value;
        },
        { immediate: true, deep: true }
    );

    function hanldeKeyup(e: Event) {
        const value: string = (e.target as HTMLInputElement).value;
        if (props.inputType === 'number' && Number.isNaN(value)) {
            e.preventDefault();
        }
    }

    Object.entries(componentsIcons).forEach(([path, definition]) => {
        const iconName = (path as any)
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        allIcon.value.push({ name: iconName, icon: definition.default });
    });

    function handleShowPassword() {
        showPassword.value = !showPassword.value;
        const inputElement = inputRef.value.input as HTMLInputElement;

        if (inputElement.type === 'password') {
            inputElement.type = 'text';
        } else {
            inputElement.type = 'password';
        }
    }
</script>

<style lang="scss" scoped>
    .custom-input__fields {
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
            @apply flex justify-end w-full text-center;

            &__wrapper {
                @apply absolute w-full mt-[60px];
            }
        }

        &:deep() {
            .ant-input-affix-wrapper {
                border: 1px solid v-bind('errorTheme.placeholderColor');
                border-radius: 4px;
                padding: 0 11px;
                @apply z-0;
                &:focus {
                    box-shadow: unset;
                    border: 1px solid var(--color-primary);
                }
            }
            .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled) {
                &:hover, &:focus {
                    @apply z-0;
                }

            }
        }

        label {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-gray-icon);
            margin-bottom: 10px;
            display: block;
        }

        // @apply mb-[18px];

        &:deep() {
            .ant-input {
                // border: 1px solid v-bind('errorTheme.placeholderColor');
                font-size: 14px;
                height: 38px;
                border-radius: 4px;

                &::placeholder {
                    font-size: 14px;
                    font-weight: 300;
                    color: v-bind('errorTheme.placeholderColor');
                }

                &:focus {
                    box-shadow: unset;
                    // border: 1px solid var(--color-primary);
                }
            }
        }

        .property-tax__container {
            .custom-input__fields {
                @apply mb-0;
            }
        }
        .custom-input__label-icon {
            @apply flex flex-row gap-[10px] items-center;
            &:deep() {
                svg {
                    height: 20px;
                    width: 20px;
                }
            }
        }

        .relative {
            @apply flex items-center;
            .unit {
                @apply absolute block right-3.5;
                color: var(--color-gray-icon);
            }
        }

        &--form {
            .ant-input {
                @apply pr-[38px];
            }
        }
    }
</style>
