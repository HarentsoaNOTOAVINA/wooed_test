<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <div class="infoModal__content">
                <Paragraphe>
                    Le ménage est composé d’au moins 2 enfants domiciliés dans
                    le bien et ouvrant le droit aux allocations familiales.
                </Paragraphe>
                <Paragraphe>
                    Un partage proportionnel de la réduction est cependant
                    possible en cas de garde partagé
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>