<template>
    <div class="fluvius-step">
        <Title
            type="h3"
            label="LES 5 ÉTAPES DE VOTRE RACCORDEMENT AU GAZ NATUREL"
        />
        <div class="steps-content">
            <div class="step">
                <div class="step-number">
                    <span>1</span>
                </div>
                <div class="step-content">
                    <Paragraphe class="sub-title"
                        >Test de raccordabilité</Paragraphe
                    >
                    <Paragraphe class="info"
                        >Vérifiez simplement si notre réseau de gaz naturel
                        passe dans votre rue et laissez-nous vos coordonnées
                        afin que nous vous recontactions au plus
                        vite</Paragraphe
                    >
                </div>
            </div>
            <div class="step">
                <div class="step-number">
                    <span>2</span>
                </div>
                <div class="step-content">
                    <Paragraphe class="sub-title"
                        >Visite gratuite du technicien</Paragraphe
                    >
                    <Paragraphe class="info"
                        >Vérifiez simplement si notre réseau de gaz naturel
                        passe dans votre rue et laissez-nous vos coordonnées
                        afin que nous vous recontactions au plus
                        vite</Paragraphe
                    >
                </div>
            </div>
            <div class="step">
                <div class="step-number">
                    <span>3</span>
                </div>
                <div class="step-content">
                    <Paragraphe class="sub-title"
                        >Acceptation de l’offre de prix</Paragraphe
                    >
                    <Paragraphe class="info"
                        >Dès que vous aurez accepté l’offre, nous planifierons
                        les travaux à votre convenance.</Paragraphe
                    >
                </div>
            </div>
            <div class="step">
                <div class="step-number">
                    <span>4</span>
                </div>
                <div class="step-content">
                    <Paragraphe class="sub-title"
                        >Execution du raccordement</Paragraphe
                    >
                    <Paragraphe class="info"
                        >En moyenne, l’éxecution d’un raccordement gaz dure
                        uniquement ½ journée.</Paragraphe
                    >
                </div>
            </div>
            <div class="step">
                <div class="step-number">
                    <span>5</span>
                </div>
                <div class="step-content">
                    <Paragraphe class="sub-title"
                        >Mise en service du compteur</Paragraphe
                    >
                    <Paragraphe class="info"
                        >C’est facile et rapide : Souscrivez un contrat chez un
                        fournisseur d’énergie et présentez l’attestation de
                        contrôle de l’organisme agrée à notre
                        technicien.</Paragraphe
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
</script>
<style lang="scss" scoped>
.fluvius-step {
    &:deep() {
        h3 {
            @apply text-[var(--color-primary)] mb-[10px];
        }
    }
    .step {
        display: flex;
        margin-bottom: 20px;
        .step-content {
            border-left: 2px solid var(--color-primary);
            padding-left: 5px;
            .sub-title {
                @apply text-[var(--color-primary)] font-medium;
            }
            .info {
                @apply text-[var(--color-gray-icon)];
            }
        }
        .step-number {
            display: flex;
            align-items: center;
            span {
                background-color: var(--color-primary);
                color: white;
                height: fit-content;
                padding: 5px 12px;
                border-radius: 50%;
                margin-right: 20px;
            }
        }
    }
}
</style>
