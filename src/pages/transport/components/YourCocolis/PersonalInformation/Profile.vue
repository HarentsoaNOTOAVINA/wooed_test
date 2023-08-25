<template>
    <div class="profile__container">
        <div class="profile__items">
            <avatar src="https://joeschmoe.io/api/v1/random" :size="40" />
            <div class="profile__items-content">
                <span class="profile__items-title"
                    >Pierre Ratokodimimanana</span
                >
                <div class="profile__button-wrap">
                    <Button>Particulier</Button>
                    <div class="edit">
                        <Icon icon-name="EditCircle" class="edit__icon" />
                        <Button class="edit__button">Modifier</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import avatar from 'ant-design-vue/lib/avatar';
</script>

<style lang="scss" scoped>
    .profile {
        &__container {
            @apply bg-gray rounded-[12px] px-[14px] py-[12px];
        }
        &__items {
            @apply relative flex items-center gap-x-[14px];
            @screen lg {
                @apply pr-[34px];
            }
        }
        &__items-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
        }
        &__items-content {
            width: calc(100% - 54px);
            @apply flex flex-col gap-[14px];
            @screen lg {
                @apply flex-row items-center;
            }
        }
        &__button-wrap {
            @apply flex flex-wrap gap-[8px];
            .edit {
                @apply cursor-pointer;
                &__button {
                    @screen lg {
                        @apply hidden;
                    }
                    &:deep() {
                        button {
                            border: 1px solid rgba(96, 96, 96, 0.25);
                            @apply bg-gray text-grayIcon;
                        }
                    }
                }
                &__icon {
                    @apply hidden;
                    @apply absolute top-[50%] -translate-y-[50%] right-0;
                    @screen lg {
                        @apply block;
                    }
                }
            }
            &:deep() {
                button {
                    @apply px-[14px] py-[4px] text-[10px];
                }
            }
        }
    }
</style>
