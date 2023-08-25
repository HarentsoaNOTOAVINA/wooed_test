<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Voorwaarden
                </Paragraphe>
                <Paragraphe>
                    Voor deze vrijstelling moet voldaan zijn aan een aantal
                    voorwaarden:
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
                            het onroerend goed ligt in een kernwinkelgebied
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            van het onroerend goed worden een of meerdere
                            verdiepingen boven de benedenverdieping verbouwd tot
                            een of meerdere woningen
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            de verbouwing gebeurt volgens een geldige
                            omgevingsvergunning (stedenbouwkundige vergunning);
                            als er geen vergunning nodig is, volstaat een attest
                            van de gemeente dat voor de verbouwingswerken geen
                            vergunning nodig is
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            binnen de vijf jaar na de voorlopige oplevering van
                            de verbouwingswerken moeten de nieuwe bewoners er
                            gedomicilieerd zijn (inschrijving in het bevolkings-
                            of vreemdelingenregister).
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
