<template>
    <div class="profile__container">
        <div class="profile__items">
            <avatar src="https://joeschmoe.io/api/v1/random" />
            <div class="profile__items-wrap">
                <div class="profile__items-content">
                    <span class="profile__items-title"
                        >Pierre Ratokodimimanana</span
                    >
                    <div class="profile__button-wrap">
                        <Button>Particulier</Button>
                    </div>
                </div>
                <div class="profile__info">
                    <div class="profile__info-rate">
                        <div class="flex gap-[4px]">
                            <Icon icon-name="StartRounded" />
                            <span>4.5</span>
                        </div>
                        <div class="flex gap-[4px]">
                            <Icon icon-name="RateReview" class="mt-[4px]" />
                            <span>13 Avis</span>
                        </div>
                    </div>
                    <div class="flex gap-[4px]">
                        <Icon icon-name="AdobeReaderIcon" />
                        <span
                            >Conditions générales d’utilisation du
                            transporteur</span
                        >
                    </div>
                    <div class="flex gap-[4px]">
                        <Icon icon-name="Clock" />
                        <span>Dernière connexion le 05/11/2022</span>
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
            @apply relative flex gap-x-[14px];
            @screen lg {
                @apply pr-[34px];
            }
            &:deep() {
                .ant-avatar {
                    @apply w-[40px] h-[40px];
                    @screen md {
                        @apply w-[100px] h-[100px];
                    }
                }
            }
        }
        &__items-wrap {
            width: calc(100% - 50px);
            @apply flex flex-col gap-[4px];
            @screen sm {
                width: calc(100% - 110px);
            }
        }
        &__items-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
        }
        &__items-content {
            @apply flex flex-col gap-[14px];
            @screen sm {
                @apply flex-row;
            }
        }
        &__button-wrap {
            @apply flex flex-wrap gap-[8px];
            &:deep() {
                button {
                    @apply px-[14px] py-[4px] text-[10px];
                }
            }
        }
        &__info {
            @apply flex flex-col gap-[2px] text-grayIcon font-[300];
            &-rate {
                @apply flex items-center gap-[40px];
            }
            &:deep() {
                .icon {
                    @apply items-start;
                }
            }
        }
    }
</style>
