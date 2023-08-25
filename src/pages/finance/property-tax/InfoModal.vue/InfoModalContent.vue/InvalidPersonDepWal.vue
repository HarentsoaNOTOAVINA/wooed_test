<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    Conditions
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            vous êtes le redevable légal du précompte immobilier
                            ou l'occupant de l'habitation
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            une personne handicapée (invalidité d'au moins 66%)
                            ou une autre personne à charge du ménage avec un
                            lien familial
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
