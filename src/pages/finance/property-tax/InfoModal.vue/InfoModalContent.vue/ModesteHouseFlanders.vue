<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <Title type="h2" label="25%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    U moet gelijktijdig aan alle onderstaande voorwaarden
                    voldoen op 1 januari van het aanslagjaar om voor dat
                    aanslagjaar recht te hebben op de vermindering:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            U bent belastingplichtige voor de woning waarvoor de
                            vermindering wordt toegekend.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            U bent op 1 januari van het aanslagjaar in deze
                            woning gedomicilieerd; u bent dus op dat adres
                            ingeschreven in het bevolkingsregister of het
                            vreemdelingenregister. De vermindering kan alleen
                            voor deze woning worden toegekend.
                        </Paragraphe>
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
        <div class="infoModal__items">
            <Title type="h2" label="50%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle"
                    >U komt in aanmerking voor een verhoogde vermindering van de
                    onroerende voorheffing als u aan deze voorwaarden voldoet:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            U bent belastingplichtige voor de woning waarvoor de
                            vermindering wordt aangevraagd.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            U bent op 1 januari van het aanslagjaar in deze
                            woning gedomicilieerd; u bent op dat adres dus
                            ingeschreven in het bevolkingsregister of het
                            vreemdelingenregister. De vermindering kan alleen
                            voor deze woning worden toegekend.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            De woning is een nieuwbouwwoning: u hebt ze zelf
                            nieuw laten bouwen of u hebt ze nieuwgebouwd
                            aangekocht. De woning is in beide gevallen dus nog
                            niet eerder in gebruik genomen.
                        </Paragraphe>
                    </li>
                </ul>
                <Paragraphe>
                    Het totale niet-geïndexeerde kadastraal inkomen (KI) van al
                    uw onroerende goederen die in het Vlaams gewest gelegen
                    zijn, is maximaal 745 euro. Houd er rekening mee dat als u
                    eigenaar of mede-eigenaar bent van meerdere onroerende
                    goederen, u mogelijk niet in aanmerking komt voor deze
                    vermindering.
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>
