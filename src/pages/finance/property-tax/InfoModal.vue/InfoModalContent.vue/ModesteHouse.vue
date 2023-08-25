<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <Title type="h2" label="Réduction de 25%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle">
                    L’habitation doit :
                </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Être le seul bien immobilier dans la Région de
                            Bruxelles-Capitale sur lequel le redevable conserve
                            un droit réel
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe> Être le domicile du redevable </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Avoir un revenu cadastral non-indexé dont le montant
                            ne dépasse pas 745 EUR
                        </Paragraphe>
                    </li>
                </ul>
            </div>
        </div>
        <div class="infoModal__items">
            <Title type="h2" label="Réduction de 50%" :weight="600" />
            <div class="infoModal__content">
                <Paragraphe class="infoModal__subtitle"> En SUS : </Paragraphe>
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe> il s’agit d’un bien neuf </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Vous n’avez pas bénéficiez d’une prime à la
                            construction ou à l’achat.
                        </Paragraphe>
                    </li>
                </ul>
                <Paragraphe>
                    La réduction de 50 % n’est valable que pour une durée de 5
                    ans maximum.
                </Paragraphe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>
