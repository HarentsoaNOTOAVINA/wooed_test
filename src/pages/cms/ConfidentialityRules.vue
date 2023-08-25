<template>
    <div class="container">
        <Card class="rules">
            <div class="rules__section">
                <Title
                    type="h1"
                    class="rules__title"
                    label="Règle de confidentialité:"
                />

                <div class="rules__container">
                    <div
                        v-for="(item, index) in rulesData"
                        :key="index"
                        class="rules__items"
                    >
                        <Title
                            type="h2"
                            class="rules__subtitle"
                            :label="item.title"
                        />
                        <div class="rules__content">
                            <Paragraphe v-html="item.paragraph"></Paragraphe>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import { ref } from 'vue';

    interface RulesData {
        title: string;
        paragraph: string;
    }

    const rulesData = ref<RulesData[]>([
        {
            title: 'Collecte de données :',
            paragraph:
                "Le site collecte des informations personnelles telles que votre nom, votre adresse e-mail, votre numéro de téléphone, etc. lors de votre enregistrement et de l'utilisation du site.",
        },
        {
            title: 'Utilisation des données :',
            paragraph:
                'Utilisation des données : Les informations personnelles collectées seront utilisées pour vous fournir les services du site, vous tenir informé des mises à jour et des offres spéciales, et pour améliorer la qualité du site.',
        },
        {
            title: 'Partage de données :',
            paragraph:
                'Le site ne partagera pas vos informations personnelles avec des tiers sans votre consentement, à moins que cela ne soit requis par la loi ou par une autorité judiciaire.',
        },
        {
            title: 'Sécurité des données :',
            paragraph:
                "Le site met en œuvre des mesures de sécurité raisonnables pour protéger vos informations personnelles contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, la modification et la destruction.",
        },
        {
            title: 'Accès et correction des données :',
            paragraph:
                "Vous avez le droit d'accéder à vos informations personnelles collectées par le site et de les corriger si elles sont inexactes.",
        },
        {
            title: 'Modification de la politique de confidentialité :',
            paragraph:
                'Le site se réserve le droit de modifier cette politique de confidentialité à tout moment sans préavis. Il est de votre responsabilité de vérifier régulièrement la politique de confidentialité pour vous assurer de respecter les dernières versions.',
        },
    ]);
</script>

<style lang="scss" scoped>
    .rules {
        min-height: calc(100vh - 100px);
        @apply max-w-[1024px] mx-auto relative my-[18px] px-[24px];
        @screen md {
            @apply py-[18px]  px-[28px];
        }
        &__section {
            @apply flex flex-col gap-[24px];
        }
        &__container {
            @apply flex flex-col gap-[24px];
            counter-reset: newCounter;
        }
        &__title {
            @apply text-primary text-center mt-[24px] font-[600] text-[20px];
            @screen md {
                @apply text-[30px];
            }
        }
        &__subtitle {
            @apply text-secondary text-[18px] font-[600];
            &:before {
                counter-increment: newCounter;
                content: counters(newCounter, '.') '. ';
            }
        }
        &__items {
            @apply flex flex-col gap-[10px];
        }
        &__content {
            @apply text-justify text-grayIcon;
        }
    }
</style>
