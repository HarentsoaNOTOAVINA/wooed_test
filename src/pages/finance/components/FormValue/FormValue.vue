<template>
    <div class="form-value__container">
        <label>
            <span> {{ labelTitle }} </span>
        </label>
        <div class="form-value__item">
            <span class="form-value__content"> {{ labelValue }} </span>
            <Icon v-if="icon" :icon-name="icon" />
            <span v-else-if="unity" class="form-value__unity">
                {{ unity }}
            </span>
        </div>
    </div>
</template>
<script setup>
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        labelTitle: {
            type: String,
            default: '',
        },
        labelValue: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        unity: {
            type: String,
            default: '',
        },
    });
</script>
<style lang="scss" scoped>
    .form-value {
        &__container {
            label {
                font-weight: 500;
                color: var(--color-gray-icon);
                font-size: 14px;
                line-height: 17px;
                @apply mb-[10px] flex items-center gap-x-[12px];
            }
        }
        &__item {
            @apply px-[14px] bg-gray flex justify-between items-center h-[38px] rounded-[4px];
            &:deep() {
                .icon {
                    svg {
                        @apply w-[15px] h-[15px];
                    }
                }
            }
        }
        &__content,
        &__unity {
            @apply text-grayIcon;
        }
    }
</style>
