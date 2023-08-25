<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        iconName: {
            type: String,
            default: '',
        },
        titleLabel: {
            type: String,
            default: '',
        },
        contentLabel: {
            type: String,
            default: '',
        },
    });
</script>

<template>
    <div class="info">
        <Icon :icon-name="iconName" />
        <div class="info__item">
            <span class="info__title"> {{ titleLabel }} </span>
            <span class="info__content"> {{ contentLabel }} </span>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
    .info {
        @apply flex items-center gap-x-[12px];
        &:deep() {
            svg {
                @apply w-[18px] h-[18px];
                path {
                    fill-opacity: 50%;
                    @apply fill-primary;
                }
            }
        }
        &__item {
            @apply flex flex-col gap-y-[5px];
        }
        &__title {
            font-weight: 300;
            font-size: 12px;
            line-height: 18px;
            @apply inline-block text-grayIcon;
        }
        &__content {
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply inline-block;
        }
    }
</style>
