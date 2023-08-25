<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="send">
            <div class="send__container">
                <Title
                    type="h3"
                    label="Envoyer sa candidature"
                    class="send__title"
                />
                <hr class="__hr" />
                <div class="sendInfo">
                    <Input
                        placeholder="À : propriétaire.be"
                        class="sendInfo__custom-input"
                    />
                    <TextArea
                        label="Message"
                        :autoSize="rows"
                        placeholder="Ajouter votre message..."
                        nameInput="message"
                    />
                    <div class="sendInfo__button">
                        <Button
                            type-button="secondary"
                            class="sendInfo__button-cancel"
                        >
                            Annuler
                        </Button>
                        <Button type-button="secondary"> Envoyer </Button>
                    </div>
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';

    import { useRoute } from 'vue-router';

    const route = useRoute();

    const breadcrumbListsData = [
        {
            label: 'Jardin collectif',
            url: `/environnement/${route.params.id}/jardin-collectif`
        },
        {
            label: 'Envoyer sa candidature',
        },
    ];

    const rows = { minRows: 6, maxRows: 10 };
</script>

<style lang="scss" scoped>
    .send {
        @apply relative;
        &:deep() {
            .mainCard__items-wrap {
                @screen md {
                    height: calc(100vh - 224px);
                }
            }
        }
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        .sendInfo {
            @apply flex flex-col gap-[18px];
            &__custom-input {
                @apply mb-0;
                &:deep() {
                    .custom-input__label-icon {
                        @apply hidden;
                    }
                }
            }
            &__button {
                @apply flex justify-between gap-[10px] w-full pt-[18px];
                border-top: 1px solid theme('colors.gray');
                &:deep() {
                    & > div,
                    button {
                        @apply w-full;
                    }
                    & > div:first-child {
                        button {
                            @apply bg-white border-gray border-solid border-[1px] text-primary;
                        }
                    }
                    & > div:last-child {
                        button {
                            @apply border-primary bg-primary;
                        }
                    }
                    @screen sm {
                        @apply justify-end;
                        & > div,
                        button {
                            @apply w-auto;
                        }
                    }
                    @screen md {
                        width: calc(100% - 36px);
                        @apply absolute bottom-0 z-[400] py-[18px];
                    }
                }
                // &-cancel {
                //     &:deep() {
                //         button {
                //             @apply text-primary bg-gray;
                //         }
                //     }
                // }
            }
        }
        .steps-btn {
            @apply justify-between gap-[10px] w-full pt-[18px];
            border-top: 1px solid theme('colors.gray');
            & > div,
            button {
                @apply w-full;
            }
            & > div:first-child {
                button {
                    @apply border-gray;
                }
            }
            & > div:last-child {
                button {
                    @apply border-primary bg-primary text-white;
                }
            }
            @screen sm {
                @apply justify-end;
                & > div,
                button {
                    @apply w-auto;
                }
            }
            @screen md {
                width: calc(100% - 36px);
                @apply absolute bottom-0 z-[400] py-[18px];
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
