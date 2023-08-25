<template>
    <div class="documentationBoiler">
        <div class="documentationBoiler__header">
            <div class="documentationBoiler__back" @click="$emit('prev')">
                <BackButton />
            </div>
            <Paragraphe class="documentationBoiler__title"
                >Documentation</Paragraphe
            >
        </div>
        <hr class="separator" />
        <div class="documentationBoiler__Flandre">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la chaudière dans<span class="font-bold">
                        le région Bruxelles :
                    </span>
                </span>
                <a
                    class="link"
                    href="https://environnement.brussels/thematiques/batiment-et-energie/obligations/la-performance-energetique-des-batiments-peb/chauffage-et-climatisation-peb/controles-et-entretien"
                    target="__blank"
                    >Cliquez ici</a
                >
            </Paragraphe>
        </div>
        <div class="documentationBoiler__brussel">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la chaudière dans<span class="font-bold">
                        le région Wallonie :
                    </span>
                    <a
                        class="link"
                        href="https://energie.wallonie.be/fr/controle-periodique-et-diagnostic-approfondi-des-chaudieres.html?IDC=8603&IDD=125879"
                        target="__blank"
                        >Cliquez ici</a
                    >
                </span>
            </Paragraphe>
        </div>
        <div class="documentationBoiler__wallonie">
            <Paragraphe class="docs"
                ><span class="text"
                    >Pour voir le documentation liée au travaux d'entretien de
                    la chaudière dans<span class="font-bold">
                        le région Flandre :
                    </span>
                </span>
                <a
                    class="link"
                    href="https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming"
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
    .documentationBoiler {
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
