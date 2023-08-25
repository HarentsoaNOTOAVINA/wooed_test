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
                            het moet gaan om een bedrijfsruimte die op de
                            gewestelijke inventaris van leegstaande of
                            verwaarloosde bedrijfsruimtenstond;
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            de leegstaande of verwaarloosde bedrijfsruimte wordt
                            gesloopt; daarna wordt ze vervangen door een of
                            meerdere nieuwe woningen of bedrijfsgebouwen;
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            voor de sloop- en vervangbouwwerken werd een
                            omgevingsvergunning afgeleverd of meldingsakte
                            opgemaakt
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
