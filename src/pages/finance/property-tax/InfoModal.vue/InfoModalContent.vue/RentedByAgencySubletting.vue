<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe>
                    Het verlaagd tarief wordt na melding toegekend als de woning
                    toebehoort:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            aan privé-personen, maar door een erkend sociaal
                            verhuurkantoor gehuurd wordt om door te verhuren
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            aan rechtspersonen die erkend zijn door het Vlaams
                            Agentschap voor Personen met een Handicap en als de
                            woning gebruikt wordt voor wooninfrastructuur voor
                            personen met een handicap.
                        </Paragraphe>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>
<style lang="scss" scoped>
    .infoModal__list--content__info-child {
        @apply bg-gray p-[10px] mt-[10px];
        border-radius: 8px;
        &__list {
            @apply pl-[30px];
            list-style-type: square;
            &__lvl2 {
                @apply pl-[30px];
                list-style-type: circle;
            }
        }
    }
</style>
