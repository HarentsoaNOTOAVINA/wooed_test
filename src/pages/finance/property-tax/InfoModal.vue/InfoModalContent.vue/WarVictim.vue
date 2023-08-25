<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    <strong><u>Voorwaarden</u></strong>
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Een oorlogsslachtoffer is een persoon die getroffen
                            is door een invaliditeit van 100%. De wetgeving
                            spreekt officieel van een "grootoorlogsverminkte".
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Deze personen komen in aanmerking: <br />
                            militairen van de oorlog 1914-1918. militairen en
                            bepaalde burgers van de oorlog 1940-1945. militairen
                            van de oorlog in Korea (onder bepaalde voorwaarden).
                            militairen die opdrachten vervulden in het kader van
                            de NAVO, de VN of die erkend werden door de
                            Ministerraad.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            De vermindering kan worden toegekend voor de woning
                            waarin een oorlogsslachtoffer zijn
                            hoofdverblijfplaats heeft op 1 januari van het
                            aanslagjaar
                        </Paragraphe>
                    </li>
                </ul>
                <hr class="__hr" />
                <Paragraphe
                    >De vermindering voor oorlogsslachtoffers kan niet
                    gecombineerd worden met de vermindering voor een persoon met
                    een handicap. U krijgt altijd de vermindering die voor u het
                    voordeligste is.</Paragraphe
                >
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
    .__hr {
        @apply mt-[5px] mb-[5px];
        color: var(--color-stroke-gray);
    }
</style>
