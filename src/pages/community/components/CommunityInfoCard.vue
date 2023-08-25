<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';

    const props = defineProps({
        titleInfo: {
            type: String,
            default: '',
        },
        editIcon: {
            type: Boolean,
            default: false,
        },
    });
</script>
<template>
    <div class="infoCard__container">
        <div
            v-if="titleInfo"
            class="infoCard__head"
            :class="editIcon === true ? 'infoCard__head--icon' : ''"
        >
            <Title type="h3" :label="titleInfo" class="infoCard__title" />
            <Icon
                v-if="editIcon === true"
                icon-name="Edit"
                class="infoCard__edit"
            />
        </div>
        <div class="infoCard__items">
            <slot />
        </div>
    </div>
</template> 
<style lang="scss" scoped>
    .infoCard {
        &__container {
            @apply w-full;
        }
        &__title {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            @apply uppercase text-grayIcon;
        }
        &__items {
            @apply flex flex-col gap-y-[18px];
        }
        &__head {
            @apply relative mb-[18px];
        }
        &__head--icon {
            @apply pr-[40px];
        }
        &__edit {
            width: 38px;
            height: 38px;
            border-radius: 100px;
            @apply absolute -right-[10px] -top-[8px] flex flex-row justify-center items-center p-[4px] gap-[10px] cursor-pointer transition;
            &:hover {
                @apply bg-gray transition;
            }
            &:deep() {
                svg {
                    @apply w-[14px] h-[14px];
                    path {
                        @apply fill-grayIcon;
                    }
                }
            }
        }
    }
</style>
