<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Er moet tegelijkertijd aan de volgende voorwaarden voldaan
                    zijn:
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            U hebt op 1 januari van het aanslagjaar minstens 2
                            kinderen die recht hebben op gezinsbijslag
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Uw kinderen zijn op 1 januari van het aanslagjaar
                            gedomicilieerd op het adres van de woning waarvoor
                            de vermindering van toepassing is. Dat wil dus
                            zeggen dat de kinderen er ingeschreven zijn in het
                            bevolkingsregister of vreemdelingenregister.
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
