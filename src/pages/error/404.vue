<template>
    <div class="error-client">
        <div class="error-client__container">
            <div class="error-client__content">
                <img
                src="@/static/images/error/on-error-img.png"
                alt="erreur-serveur"
                />
                <div class="error-client__content__info">
                    <Title class="error-client__content__title" type="h2" label="404" />
                    <Paragraphe class="text-center">La page que vous essayez de joindre n'existe pas <span class="error-client__content__title__icon">🧐</span></Paragraphe>
                    <Button @click="() => {router.push('/')}">Accueil</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useRouter } from 'vue-router';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

    const router = useRouter();

</script>
<style lang="scss" scoped>
    .error-client {
        width: auto;
        height: calc(100vh - 62px);
        @apply p-[10px];
        &__container {
            border-radius: 8px;
            background-color: #fff;
            height: 100%;
            @apply flex justify-center items-center;
        }
        &__content {
            @apply flex items-center justify-center flex-col gap-[32px];
            &__info {
                @apply flex items-center justify-center flex-col gap-[16px];
                :deep() {
                    p {
                        font-size: 18px;
                        color: var(--color-primary)
                    }
                }
            }
            &__title {
                font-weight: 700;
                font-size: 60px;
                &__icon {
                    font-size: 24px;
                }
            }
            &:deep() {
                h2 {
                    color: var(--color-primary);
                }
            }
            img {
                width: 180px;
                @screen sm {
                    width: 300px;
                }
            }
        }
    }
</style>
