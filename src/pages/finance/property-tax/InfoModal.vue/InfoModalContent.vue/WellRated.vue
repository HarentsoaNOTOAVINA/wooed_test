<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <Title type="h2" label="Réduction de 25%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe>
                    Façade classée ou sur la liste de sauvegarde
                </Paragraphe>
            </div>
        </div>
        <div class="infoModal__items">
            <Title type="h2" label="Réduction de 50%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe>
                    Intérieur ou jardin classé ou sur la liste de sauvegarde
                </Paragraphe>
            </div>
        </div>
        <div class="infoModal__items">
            <Title type="h2" label="Réduction de 100%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe>
                    Classé totalement ou sur la liste de sauvegarde
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>