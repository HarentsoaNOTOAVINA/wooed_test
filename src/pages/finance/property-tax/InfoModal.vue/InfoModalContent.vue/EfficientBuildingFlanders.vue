<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    De vermindering is altijd een percentage van de onroerende
                    voorheffing gedurende een aantal jaar. Drie factoren bepalen
                    hoe groot de vermindering is en hoe lang ze toegekend
                    blijft:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            wanneer werd de stedenbouwkundige vergunning
                            aangevraagd?
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            gaat het over een nieuwbouw (of gelijkgesteld) of
                            over een ingrijpende energetische renovatie?
                        </Paragraphe>
                        <div class="infoModal__list--content__info-child">
                            <Paragraphe
                                >Gelijkgesteld met nieuwbouw zijn de volgende
                                categorieën:</Paragraphe
                            >
                            <ul
                                class="infoModal__list--content__info-child__list"
                            >
                                <li>
                                    <Paragraphe>
                                        gebouwen die herbouwd werden na
                                        volledige afbraak
                                    </Paragraphe>
                                </li>
                                <li>
                                    <Paragraphe>
                                        een casco verbouwing met een beschermd
                                        volume dat groter is dan 3000 m³
                                    </Paragraphe>
                                </li>
                                <li>
                                    <Paragraphe>
                                        een verbouwing waarbij er een deel aan
                                        een gebouw toegevoegd is dat een apart
                                        perceelnummer met een apart kadastraal
                                        inkomen heeft gekregen. In dit geval
                                        geldt het E-peil enkele voor het nieuw
                                        bijgebouwd deel en kan de vermindering
                                        daar ook alleen voor toegekend worden.
                                    </Paragraphe>
                                </li>
                            </ul>
                        </div>
                        <div class="infoModal__list--content__info-child">
                            <ul
                                class="infoModal__list--content__info-child__list"
                            >
                                <li>
                                    <Paragraphe>
                                        Voor aanvragen tot 1-3-2017: een
                                        renovatie waarbij
                                    </Paragraphe>
                                    <ul
                                        class="infoModal__list--content__info-child__list__lvl2"
                                    >
                                        <li>
                                            <Paragraphe>
                                                de technische installaties om
                                                een specifiek binnenklimaat te
                                                realiseren volledig worden
                                                vervangen
                                            </Paragraphe>
                                        </li>
                                        <li>
                                            <Paragraphe>
                                                én minstens 75% van de bestaande
                                                en nieuwe scheidingsconstructies
                                                die het beschermd volume
                                                omhullen en die grenzen aan de
                                                buitenomgeving worden
                                                geïsoleerd, voor zover het geen
                                                ontmanteling betreft;
                                            </Paragraphe>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Paragraphe>
                                        Voor aanvragen vanaf 1-3-2017:
                                    </Paragraphe>
                                    <ul
                                        class="infoModal__list--content__info-child__list__lvl2"
                                    >
                                        <li>
                                            <Paragraphe>
                                                een functiewijziging met een
                                                beschermd volume groter dan 800
                                                m³
                                            </Paragraphe>
                                        </li>
                                        <li>
                                            <Paragraphe>
                                                of een renovatie waarbij
                                            </Paragraphe>
                                            <ul
                                                class="infoModal__list--content__info-child__list__lvl2"
                                            >
                                                <li>
                                                    <Paragraphe>
                                                        minstens de opwekkers om
                                                        een specifiek
                                                        binnenklimaat te
                                                        realiseren volledig
                                                        worden vervangen
                                                    </Paragraphe>
                                                </li>
                                                <li>
                                                    <Paragraphe>
                                                        én minstens 75% van de
                                                        bestaande en nieuwe
                                                        scheidingsconstructies
                                                        die het beschermd volume
                                                        omhullen en die grenzen
                                                        aan de buitenomgeving
                                                        worden geïsoleerd, voor
                                                        zover het geen
                                                        ontmanteling,
                                                        gedeeltelijke herbouw of
                                                        herbouw betreft.
                                                    </Paragraphe>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Paragraphe>
                                        een casco verbouwing met een beschermd
                                        volume dat groter is dan 3000 m³
                                    </Paragraphe>
                                </li>
                                <li>
                                    <Paragraphe>
                                        een verbouwing waarbij er een deel aan
                                        een gebouw toegevoegd is dat een apart
                                        perceelnummer met een apart kadastraal
                                        inkomen heeft gekregen. In dit geval
                                        geldt het E-peil enkele voor het nieuw
                                        bijgebouwd deel en kan de vermindering
                                        daar ook alleen voor toegekend worden.
                                    </Paragraphe>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Het totale niet-geïndexeerde kadastraal inkomen (KI)
                            van uw onroerende goederen die in het Vlaams gewest
                            gelegen zijn, is maximaal 745 euro. Houd er rekening
                            mee dat als u eigenaar of mede-eigenaar bent van
                            meerdere onroerende goederen, u mogelijk niet in
                            aanmerking komt voor deze vermindering. Om de
                            berekening te maken, worden de kadastrale inkomens
                            in verhouding tot de eigendomsrechten van alle
                            onroerende goederen in Vlaanderen opgeteld, en dat
                            voor alle eigenaars die op 1 januari van het
                            aanslagjaar in de woning gedomicilieerd zijn.
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
