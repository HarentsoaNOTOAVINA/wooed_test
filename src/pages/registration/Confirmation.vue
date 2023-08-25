<template>
    <div class="confirm-subscription">
        <div class="confirm-subscription__content">
            <div class="flex items-center justify-center flex-col gap-[20px]">
                <Info size="lg" />
                <Title
                    label="Information de validation"
                    type="h1"
                    weight="700"
                />
                <Paragraphe class="info">
                    Vous allez avoir un e-mail de confimation afin de valider
                    votre inscription, veuillez verifier votre e-mail.
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Info from '@/components/Icon/Info.vue';
</script>
<style lang="scss" scoped>
    .confirm-subscription {
        width: 100%;
        height: 93vh;
        padding: 20px;
        @apply container;
        @screen sm {
            padding: 50px;
        }
        @apply flex justify-center items-center;
        &__content {
            width: 100%;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            &:deep() {
                h1 {
                    color: var(--color-primary);
                    text-align: center;
                }
            }
            .info {
                font-size: 16px;
                color: var(--color-secondary);
                font-weight: 100;
            }
            img {
                width: 150px;
            }
        }
    }
</style>
