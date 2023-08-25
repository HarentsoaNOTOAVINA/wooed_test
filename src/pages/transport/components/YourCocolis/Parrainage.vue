<template>
    <MainCard
        :dataBreadcrumbs="breadcrumbListsData"
        class="parrainage__section"
    >
        <div class="parrainage__container">
            <div class="parrainage__content">
                <Paragraphe>
                    Vous aimez le concept de Cocolis et vous avez envie de le
                </Paragraphe>
                <Paragraphe>
                    partager a vos proches? Copiez le code ci-dessous et
                    transmettez le leur par mail ou par SMS.
                </Paragraphe>
            </div>
            <div class="parrainage__form">
                <Input inputType="text" placeholder="SITPS2410" />
                <Button> Copier </Button>
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    const breadcrumbListsData = [
        {
            label: 'Parrainage',
        },
    ];
</script>
<style lang="scss" scoped>
    .parrainage {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__form {
            @apply flex items-center border-gray border-[1px] rounded-lg max-w-[330px] px-[2px];
            &:deep() {
                .custom-input {
                    &__fields {
                        @apply mb-0 w-full;
                        .ant-input {
                            @apply border-none font-[600];
                        }
                    }
                    &__label-icon {
                        @apply hidden;
                    }
                }
                button {
                    @apply bg-strokeGray text-grayIcon font-[600];
                }
            }
        }
    }
</style>
