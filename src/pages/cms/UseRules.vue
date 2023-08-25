<template>
    <div class="container">
        <Card class="rules">
            <div class="rules__section">
                <Title
                    type="h1"
                    class="rules__title"
                    label="Regle d'utilisation"
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
            title: 'Enregistrement : ',
            paragraph:
                'Pour utiliser le site, vous devez vous enregistrer en fournissant vos informations personnelles correctes et complètes.',
        },
        {
            title: 'Utilisation légale :',
            paragraph:
                'Vous ne pouvez pas utiliser le site pour des activités illégales ou interdites par les lois et les règlements applicables.',
        },
        {
            title: 'Propriété intellectuelle : ',
            paragraph:
                "Le contenu du site, y compris les textes, les images, les logos et les marques, est protégé par les droits de propriété intellectuelle. Vous n'êtes pas autorisé à les utiliser sans autorisation.",
        },
        {
            title: 'Transactions immobilières : ',
            paragraph:
                "Le site n'est pas responsable des transactions immobilières entre les utilisateurs. Vous êtes seul responsable de vérifier la légalité, la qualité et l'exactitude des annonces et des transactions.",
        },
        {
            title: "Modification de la règle d'utilisation : ",
            paragraph:
                "Le site se réserve le droit de modifier cette règle d'utilisation à tout moment sans préavis. Il est de votre responsabilité de vérifier régulièrement la règle d'utilisation pour vous assurer de respecter les dernières versions.",
        },
        {
            title: 'Respect de la vie privée : ',
            paragraph:
                " Le site s'engage à protéger votre vie privée et à traiter vos informations personnelles conformément à la politique de confidentialité.",
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
