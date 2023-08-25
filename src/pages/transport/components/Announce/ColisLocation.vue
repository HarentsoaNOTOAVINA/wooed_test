<template>
    <CardWrapper class="location">
        <div class="location__container">
            <div class="location__title">
                <Icon icon-name="MapMarker" />
                <span>{{ labelTitle }}</span>
            </div>
            <span class="location__label">{{ labelAddress }}</span>
            <div class="location__content">
                <slot name="content" />
            </div>
        </div>
        <slot name="block" />
    </CardWrapper>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';

    const props = defineProps({
        labelTitle: {
            type: String,
            default: '',
        },
        labelAddress: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .location {
        @apply flex flex-col justify-between gap-[14px];
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__title {
            @apply flex gap-[7px] text-primary font-[600];
            &:deep() {
                .icon {
                    svg {
                        @apply w-[18px] h-[18px];
                        path {
                            fill-opacity: 1;
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
        &__label {
            @apply font-[600] truncate;
        }
        &__content {
            @apply relative font-[300] pl-[22px];
            &::after {
                content: '';
                @apply absolute left-[10px] top-0 w-[1px] h-[100%] bg-gray;
            }
        }
    }
</style>
