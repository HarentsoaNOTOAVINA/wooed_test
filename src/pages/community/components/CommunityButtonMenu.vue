<script lang="ts" setup>
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        iconName: {
            type: String,
            default: '',
        },
        buttonMenuLabel: {
            type: String,
            default: '',
        },
    });
</script>

<template>
    <div class="wrap-btn-com">
        <ButtonMenu class="buttonMenu">
            <Icon v-if="iconName" :icon-name="iconName" />
            <span>
                {{ buttonMenuLabel }}
            </span>
        </ButtonMenu>
    </div>
</template>

<style lang="scss" scoped>
.wrap-btn-com {
    .button-menu {
        @apply w-full flex items-center gap-x-[16px] bg-gray rounded-[8px] border-none transition mb-0;
        &:hover {
            @apply bg-strokeGray transition;
        }
        &:deep() {
            .button-menu__wrap-icon {
                @apply hidden;
            } 
            svg {
                @apply w-[18px] h-[18px];
            }
        }
    }
}
</style>
