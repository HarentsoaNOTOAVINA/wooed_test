<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Improductiviteit van een gebouwd onroerend goed (woning,
                    bedrijfsgebouw, ...)
                </Paragraphe>
                <Paragraphe>
                    Het gebouwd onroerend goed moet een gedeelte van het jaar
                    leeggestaan én geen inkomsten (dus ook geen huurinkomsten)
                    opgebracht hebben, onder volgende voorwaarden:
                </Paragraphe>
                <ol class="infoModal__list--items dec">
                    <li
                        class="infoModal__list--content-num mt-[10px] mb-[10px]"
                    >
                        <Paragraphe>
                            <strong
                                ><u
                                    >niet-gemeubileerd gebouwd onroerend goed</u
                                ></strong
                            >
                        </Paragraphe>
                        <div class="infoModal__list--content__info-child">
                            <ul
                                class="infoModal__list--content__info-child__list"
                            >
                                <li>
                                    <Paragraphe>
                                        Het moet gaan om een niet gemeubileerd
                                        gebouwd onroerend goed. Gemeubelde
                                        gebouwen of ongebouwde onroerende
                                        goederen (zoals gronden) komen dus niet
                                        in aanmerking.
                                    </Paragraphe>
                                </li>
                                <li>
                                    <Paragraphe>
                                        <strong><u>Uitzondering : </u></strong>
                                        onroerende goederen met industriële,
                                        ambachtelijke of handelsdoeleinden
                                        worden toch als niet gemeubileerd
                                        aanzien, alleen als er zich alleen
                                        roerende goederen in bevinden die direct
                                        in verband staan met de uitbating.
                                    </Paragraphe>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li
                        class="infoModal__list--content-num mt-[10px] mb-[10px]"
                    >
                        <Paragraphe>
                            <strong><u>termijnen</u></strong>
                        </Paragraphe>
                        <div class="infoModal__list--content__info-child">
                            <ul
                                class="infoModal__list--content__info-child__list"
                            >
                                <li>
                                    <Paragraphe>
                                        De improductiviteit moet tijdens het
                                        aanslagjaar, van 1 januari tot 31
                                        december, minstens 90 dagen geduurd
                                        hebben. De periode van 90 dagen moet
                                        niet aaneensluitend zijn.
                                    </Paragraphe>
                                </li>
                                <li>
                                    <Paragraphe>
                                        Wanneer de improductiviteit maximum 12
                                        opeenvolgende maanden, rekening houdend
                                        met het vorige AJ, bedraag is het
                                        voldoende dat u aantoont dat het
                                        onroerend goed heeft leeggestaan en
                                        improductief was. Dit kan als volgt
                                        bewezen worden:
                                    </Paragraphe>
                                    <ul
                                        class="infoModal__list--content__info-child__list__lvl2"
                                    >
                                        <li>
                                            <Paragraphe>
                                                overzicht van verbruik van
                                                water, gas en elektriciteit dat
                                                de volledige periode van
                                                improductiviteit aantoont
                                                (historisch overzicht,
                                                afrekeningen)
                                            </Paragraphe>
                                        </li>
                                        <li>
                                            <Paragraphe>
                                                een attest van de gemeente
                                                (dienst bevolking), politie of
                                                andere officiële instantie
                                                waaruit blijkt dat het onroerend
                                                goed leegstaand was gedurende de
                                                volledige periode waarvoor de
                                                proportionele vermindering
                                                gevraagd wordt.
                                            </Paragraphe>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Paragraphe>
                                        Wanneer echter de improductiviteit de
                                        termijn van 12 maanden overschrijdt kan
                                        enkel proportionele vermindering worden
                                        toegekend wanneer u aantoont dat de
                                        improductiviteit ook onvrijwillig is.
                                    </Paragraphe>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li
                        class="infoModal__list--content-num mt-[10px] mb-[10px]"
                    >
                        <Paragraphe>
                            <strong
                                ><u> onvrijwillige improductiviteit </u></strong
                            >
                        </Paragraphe>
                        <Paragraphe>
                            De improductiviteit moet “onvrijwillig” zijn, u mag
                            er dus niet zelf voor gekozen hebben. U moet kunnen
                            bewijzen dat de leegstand en de improductiviteit te
                            wijten zijn aan redenen onafhankelijk uw wil. Dat
                            kan bijvoorbeeld als volgt bewezen worden:
                        </Paragraphe>
                        <table class="table">
                            <tbody>
                                <tr
                                    v-for="(contents) in tableContent"
                                    :key="contents.title"
                                >
                                    <td class="table__tab-col" v-if="contents.title"><strong>{{ contents.title }}</strong></td>
                                    <td class="table__tab-col" :colspan="([contents.title ? 1 : 2] as any)">
                                        <ul>
                                            <li
                                                v-for="(
                                                    content, index
                                                ) in contents.content"
                                                :key="index"
                                            >
                                                <span v-html="content"></span>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                </ol>

                <Paragraphe class="infoModal__subtitle">
                    Improductiviteit van een vernield (voorheen gebouwd)
                    onroerend goed
                </Paragraphe>
                <Paragraphe>
                    Ook bij vernieling van een voorheen gebouwd onroerend goed
                    kan de onroerende voorheffing proportioneel verminderd
                    worden. Daarvoor moet aan volgende voorwaarden voldaan zijn:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Het onroerend goed is ofwel volledig vernield, ofwel
                            gedeeltelijk, maar dan wel in die mate dat het
                            vernielde gedeelte minstens 25 % van het kadastraal
                            inkomen vertegenwoordigt.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            De vernieling moet veroorzaakt zijn door een ramp
                            (zoals brand, instorting, ...). Het moet dus gaan om
                            een buitengewone gebeurtenis die onafhankelijk van
                            de wil van de eigenaar voorgevallen is.
                        </Paragraphe>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    const tableContent = [
        {
            title: 'Leegstand',
            content: [
                'overzicht van verbruik van water, gas en elektriciteit dat de volledige periode van improductiviteit aantoont (historisch overzicht, afrekeningen)',
                'een attest van de gemeente (dienst bevolking), politie of andere officiële instantie waaruit blijkt dat het onroerend goed leegstaand was gedurende de volledige periode waarvoor de proportionele vermindering gevraagd wordt',
            ],
        },
        {
            title: 'Afbraak',
            content: [
                'een document met begin- en einddatum van de afbraak',
                'een factuur van de afbraakwerken of gedateerde foto’s van de afbraak',
                'een kopie van het formulier 43B',
            ],
        },
        {
            title: 'verbouwingen',
            content: [
                'begin- en einddatum, en facturen van de uitgevoerde werken',
            ],
        },
        {
            title: 'Tehuurof tekoopstelling',
            content: [
                'de door de opdrachtgever en door de makelaar in onroerende goederen getekende opdracht tot verhuring of tot verkoop, met vermelding van de periode van het mandaat. Indien deze opdracht stilzwijgend werd verlengd, dient de makelaar dit schriftelijk te bevestigen',
                'OF kopieën van opeenvolgende aanbiedingen tot huur of tot verkoop in een of meerdere publiciteitsbladen, verspreid over de volledige periode van improductiviteit en met datum van publicatie',
            ],
        },
        {
            title: 'Lopende rechtszaak of gerechtelijke procedure',
            'content': [
                'een (tussentijds) vonnis',
            ],
        },
        {
            title: 'Bodemverontreiniging',
            content: [
                'verslagen, resultaten (oriënterend en beschrijvend bodemonderzoek), begin en einde van de sanering, bewijzen en facturen van uitgevoerde sanering, toekomstplannen, …',
            ],
        },
        {
            content: [
                '<strong>De termijn van 12 maanden is niet van toepassing in de volgende gevallen</strong>: onteigening rampverbouwing of renovatie met een sociaal of cultureel doel die uitgevoerd wordt door een sociale woonorganisatie of in opdracht van een overheid overmacht niet-afgehandelde erfenisprocedure',
            ],
        },
    ];
</script>
<style lang="scss" scoped>
    .dec {
        list-style: decimal;
    }
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
    .table {
        border-collapse: collapse;
        &__tab-col {
            @apply p-[10px];
            border: 1px solid var(--color-primary);
        }
    }
</style>
