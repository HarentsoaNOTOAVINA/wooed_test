<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Voorwaarden
                </Paragraphe>
                <Paragraphe>
                    U komt in aanmerking voor deze vrijstelling als u aan de
                    volgende voorwaarden voldoet:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            het onroerend goed moet gebruikt zijn voor een
                            kleinhandelsactiviteit
                        </Paragraphe>
                        <div class="plus-info">
                            <Paragraphe>
                                <u>Kleinhandel is wettelijk gedefinieerd;</u>
                                als het pand gebruikt werd voor een vrij beroep
                                (arts, advocaat, notaris,...) geldt de
                                vrijstelling dus niet.
                            </Paragraphe>
                        </div>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            het onroerend goed ligt in een winkelarm gebied
                        </Paragraphe>
                        <div class="plus-info">
                            <Paragraphe>
                                Een winkelarm gebied is een gebied waar via
                                provinciale, gemeentelijke of stedenbouwkundige
                                voorschriften beperkingen aan de kleinhandel
                                worden opgelegd.
                            </Paragraphe>
                        </div>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            het onroerend goed wordt verbouwd tot een of
                            meerdere woningen
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
                            gedomicilieerd zijn
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
    .plus-info {
        @apply bg-gray p-[10px] rounded-[8px];
    }
</style>
