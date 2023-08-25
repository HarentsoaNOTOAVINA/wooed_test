<template>
    <div class="infoModal__container">
        <div class="infoModal__items">
            <Title
                type="h2"
                label="Les conditions pour bénéficier d’un plan de paiement sont les suivantes :"
                :weight="600"
            />
            <div class="infoModal__content">
                <ul class="infoModal__list--items">
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Vous devez introduire une demande motivée avant la
                            date d’échéance de l’avertissement extrait de rôle.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Vous ne devez pas avoir de dette vis-à-vis de
                            Bruxelles Fiscalité dont la date d’échéance est
                            dépassée.
                        </Paragraphe>
                    </li>
                    <li class="infoModal__list--content">
                        <Paragraphe>
                            Vous pouvez bénéficier d’une facilité de paiement de
                            maximum 4 mensualités.
                        </Paragraphe>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>