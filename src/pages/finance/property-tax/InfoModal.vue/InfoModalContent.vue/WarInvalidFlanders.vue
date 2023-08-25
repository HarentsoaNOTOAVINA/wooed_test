<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe>
                    De vermindering wordt toegekend voor de woning waarin een
                    persoon met een handicap op 1 januari van het aanslagjaar
                    zijn officiële woonplaats heeft volgens het
                    bevolkingsregister. De handicap moet vastgesteld zijn voor
                    de leeftijd van 65 jaar.
                </Paragraphe>
                <Paragraphe class="infoModal__subtitle">
                    De handicap heeft een van volgende drie categorieën als
                    gevolg:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            een invaliditeit van minstens 66 %.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            een vermindering van het verdienvermogen tot één
                            derde of minder.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            een vermindering van de zelfredzaamheid van minimaal
                            9 punten.
                        </Paragraphe>
                    </li>
                </ul>
                <Paragraphe>
                    Let wel: voor een kind volstaat dat het in aanmerking komt
                    voor de zorgtoeslag voor kinderen met een specifieke
                    ondersteuningsbehoefte. Dat is het geval als in de
                    gezinsbijlslagregeling 6 punten in de 3 pijlers samen
                    behaald worden of 4 punten behaald worden in de eerste
                    pijler.
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>
