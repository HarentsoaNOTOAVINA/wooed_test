<template>
    <div>
        <button
            :disabled="disabled"
            @click="!disabled ? $emit('on-click') : () => {}"
            :class="`button__${typeButton} ${disabled ? '--disabled' : ''}`"
            :type="htmlType"
        >
            <transition appear name="fade-btn" mode="out-in">
                <LoadingButton :theme="loadingTheme" v-if="isLoad" size="xs" />
            </transition>
            <slot />
        </button>
    </div>
</template>

<script setup lang="ts">
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, onMounted, PropType } from 'vue';

    interface Props {
        // typeButton?: {
        //     type: string;
        //     default: 'primary';
        // };
        // htmlType?: 'button' | 'submit' | 'reset';
        // width?: string;
        // disabled?: boolean;
        // theme?: 'light' ;
    }

    const theme = ref<{
        color: string;
        backgroundColor: string;
        backgroundColorDisabled: string;
    }>({
        color: '#fff',
        backgroundColor: 'var(--color-primary)',
        backgroundColorDisabled: 'rgb(148 159 181 / 77%)',
    });

    const props = defineProps({
        typeButton: {
            type: String as PropType<
                'primary' | 'secondary' | 'border' | 'gray' | 'primary-cancel'
            >,
            default: 'primary',
        },
        htmlType: {
            type: String as PropType<'button' | 'submit' | 'reset'>,
            default: 'button',
        },
        width: String,
        disabled: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String as PropType<'light'>,
        },
        isLoad: {
            type: Boolean,
            default: false,
            required: false,
        },
        loadingTheme: {
            type: String as PropType<'dark' | 'light'>,
            required: false,
        }
    });

    onMounted(() => {
        if (props.theme === 'light') {
            theme.value = {
                color: 'var(--color-secondary)',
                backgroundColor: 'var(--color-gray)',
                backgroundColorDisabled: 'gray',
            };
        }
    });
</script>

<style lang="scss" scoped>
    button {
        width: v-bind(width);
        font-size: 14px;
        padding: 6px 20px;
        background-color: v-bind('theme.backgroundColor');
        color: v-bind('theme.color');
        font-weight: 500;
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
        transition: all 0.25s ease;
        @apply bg-blend-lighten transition flex justify-center items-center gap-[10px];
        &:disabled {
            background-color: v-bind('theme.backgroundColorDisabled');
            @apply text-[var(--color-gray-icon)];
            &:hover {
                cursor: not-allowed;
            }
        }
        &:hover {
            transition: all 0.25s ease;
            @apply bg-blend-darken transition;
            &:active {
                transition: all 0.25s ease;
                @apply bg-blend-lighten transition;
            }
        }
        .fade-btn-enter-active,
        .fade-btn-leave-active {
            @apply transition-all;
        }
        .fade-btn-enter-active,
        .fade-btn-enter-active {
            @apply scale-0;
        }
    }
    .button {
        &__primary {
            border-radius: 4px;
        }
        &__secondary {
            border-radius: 50px;
        }
        &__border {
            border-radius: 50px;
            background-color: #fff;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
        }
        &__gray {
            border-radius: 50px;
            background-color: var(--color-gray);
            color: #000;
        }
        &__primary-cancel {
            border-radius: 4px;
            background-color: var(--color-gray);
            color: var(--color-primary);
        }
    }
</style>
