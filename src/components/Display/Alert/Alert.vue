<template>
    <div v-if="alertCustom" class="alert alertCustom">
        <Icon v-if="isIcon" :icon-name="icon" />
        <div class="alert__content">
            <slot />
        </div>
    </div>
    <div v-else-if="type === 'warning'" class="alert warning">
        <Icon v-if="isIcon" icon-name="Warning" />
        <div class="alert__content">
            <slot />
        </div>
    </div>
    <div v-else class="alert">
        <Icon v-if="isIcon" icon-name="BellSolid" />
        <div class="alert__content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        alertCustom: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: 'BellSolid',
        },
        color: {
            type: String,
            default: '',
        },
        backgroundColor: {
            type: String,
            default: '',
        },
        isIcon: {
            type: Boolean,
            default: true,
        },
    });
</script>

<style lang="scss" scoped>
    .alert {
        background: rgba(103, 205, 132, 0.14);
        @apply flex gap-[14px] p-[10px] rounded-[8px];
        @screen md {
            @apply p-[18px];
        }
        .icon {
            @apply mt-[1px];
            &:deep() {
                svg {
                    @apply w-[18px] h-[18px];
                }
            }
        }
        &__content {
            @apply text-green w-full h-full;
        }
        &.alertCustom {
            background: v-bind(backgroundColor);
            .alert__content {
                color: v-bind(color);
                @apply flex items-center;
            }
            .icon {
                @apply mt-[1px];
                &:deep() {
                    svg {
                        path {
                            fill: v-bind(color);
                        }
                    }
                }
            }
        }
        &.warning {
            background: rgba(239, 121, 96, 0.14);
            .alert__content {
                color: #EF7960;
;
            }
        }
    }
</style>
