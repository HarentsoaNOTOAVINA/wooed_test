<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    U komt in aanmerking voor deze vrijstelling als u aan deze
                    voorwaarden voldoet:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            van het onroerend goed waarvoor u de vrijstelling
                            vraagt, moet minstens de benedenverdieping gebruikt
                            blijven worden voor een kleinhandelsactiviteit.
                            Kleinhandel is wettelijk gedefinieerd; als het pand
                            gebruikt wordt voor een vrij beroep (arts, advocaat,
                            notaris,...) geldt de vrijstelling dus niet.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            het moet gaan om een woning die op de gewestelijke
                            inventaris van ongeschikte of onbewoonbare woningen
                            stond; het gaat om woningen die niet voldoen aan de
                            elementaire veiligheids-, gezondheids- of
                            woonkwaliteitsvereisten en die daarom formeel op een
                            lijst zijn opgenomen; het is niet voldoende dat ze
                            opgenomen waren op de inventaris van leegstand of
                            van verwaarlozing;
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            de ongeschikte of onbewoonbare woning wordt gesloopt
                            en vervangen door een of meerdere nieuwe woningen of
                            bedrijfsgebouwen;
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            voor de sloop- en vervangbouwwerken werd een
                            omgevingsvergunning afgeleverd of meldingsakte
                            opgemaakt.
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
