<template>
    <div class="documentationTank">
        <div class="documentationTank__header">
            <div class="documentationTank__back" @click="$emit('prev')">
                <BackButton />
            </div>
            <Paragraphe class="documentationTank__title"
                >Documentation</Paragraphe
            >
        </div>
        <hr class="separator" />
        <div class="documentationTank__Flandre">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la citerne dans<span class="font-bold">
                        le région Flandre :
                    </span>
                </span>
                <a
                    class="link"
                    href="https://www.vlaanderen.be/controle-en-onderhoud-van-de-stookolietank-van-een-woning#q-bcb95110-90d1-4fb4-85bf-2e5905071951"
                    target="__blank"
                    >Cliquez ici</a
                >
            </Paragraphe>
        </div>
        <div class="documentationTank__brussel">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la citerne dans<span class="font-bold">
                        le région Bruxelles :
                    </span>
                </span>
                <span class="block mt-[10px]"
                    >Pour les reservoir enfouie :
                    <a
                        class="link"
                        href="https://environnement.brussels/le-permis-denvironnement/les-conditions-generales-et-specifiques/les-conditions-specifiques-dexploitation/reservoir-mazout-enfoui"
                        target="__blank"
                        >Cliquez ici</a
                    ></span
                >
                <span class="block mt-[10px]"
                    >Pour les reservoir non-enfouie :
                    <a
                        class="link"
                        href="https://environnement.brussels/le-permis-denvironnement/les-conditions-generales-et-specifiques/les-conditions-specifiques-dexploitation/reservoir-mazout-non-enfoui"
                        target="__blank"
                        >Cliquez ici</a
                    ></span
                >
            </Paragraphe>
        </div>
        <div class="documentationTank__wallonie">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la citerne dans<span class="font-bold">
                        le région Wallonie :
                    </span>
                </span>
                <a
                    class="link"
                    href="https://www.certinergie.be/fr/controle-citerne-mazout/wallonie/"
                    target="__blank"
                    >Cliquez ici</a
                >
            </Paragraphe>
        </div>
    </div>
</template>

<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>

<style scoped lang="scss">
    .documentationTank {
        &__header {
            @apply flex items-center;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__title {
            // color: var(--color-gray-icon);
            // font-weight: 600;
            @apply text-[16px] font-[600] text-[var(--color-gray-icon)];
        }
    }

    .docs {
        @apply bg-[var(--color-gray)] p-[8px] rounded-[8px] mb-[10px];
    }

    .link {
        @apply text-[var(--color-primary)] font-semibold;
    }
</style>
