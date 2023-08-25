<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Voorwaarden
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Het moet gaan om een onbebouwd onroerend goed
                            (gronden, weilanden...).
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Het onroerende goed moet in een VEN-gebied liggen,
                            Een VEN-gebied is een onroerend goed dat in het
                            Vlaamse Ecologische Netwerk (VEN) ligt. ((opent in
                            nieuw venster)) In dat Ecologisch Netwerk krijgt de
                            natuur een bijkomende bescherming.
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
