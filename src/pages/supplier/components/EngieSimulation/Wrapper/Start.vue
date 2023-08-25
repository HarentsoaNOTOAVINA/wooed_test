<template>
    <wrapper title="Bienvenue">
        <div class="choice-start">
            <div class="choice-greeting">
                <Title
                    class="choice-greeting__title"
                    type="h3"
                    label="Bonjour!"
                />
                <hr class="text-secondary mb-[20px]" />
                <Paragraphe class="choice-greeting__desc">
                    Nous allons vous poser quelques questions relatives à votre
                    consommation d'énergie, votre installation ou encore votre
                    type de logement. Cela dans le but de mieux vous connaître
                    et mieux vous servir. Cliquez sur "commencer" pour répondre
                    à notre série de formulaires préparées spécialement pour
                    mieux cerner vos besoins.
                </Paragraphe>
            </div>
            <div class="choice-action">
                <Button
                    type-button="border"
                    @click="
                        $emit('on-get-choice', 'fournisseurEnergie')
                    "
                    >Commencez</Button
                >
            </div>
        </div>
    </wrapper>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Wrapper from './Wrapper.vue';
</script>
<style lang="scss" scoped>
    .choice {
        &-start {
            @apply md:px-[100px] px-[20px];
        }
        &-greeting {
            &__title {
                @apply text-[50px] text-[var(--color-secondary)] font-semibold;
            }
            &__desc {
                @apply text-grayBlack text-[18px];
            }
        }
        &-action {
            @apply flex justify-center my-[20px] mt-[50px];
            &:deep() {
                div {
                    @apply w-full md:w-auto;
                }
                button {
                    @apply text-[18px] uppercase w-full;
                }
            }
        }
    }
</style>
