<template>
    <div class="container">
        <Card class="rules">
            <div class="rules__section">
                <Title
                    type="h1"
                    class="rules__title"
                    label="Politique de confidentialité de Wooed"
                />

                <Paragraphe>
                    Chez Wooed, nous sommes engagés à protéger la vie privée de
                    nos utilisateurs et à traiter leurs données personnelles de
                    manière responsable. Cette politique de confidentialité
                    explique comment nous collectons, utilisons et partageons
                    vos données personnelles lorsque vous utilisez notre site
                    web et nos services.
                </Paragraphe>

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
            title: 'Collecte de données personnelles :',
            paragraph:
                "Nous collectons des données personnelles lorsque vous créez un compte sur notre site web, que vous postez une annonce, que vous contactez d'autres utilisateurs ou que vous utilisez nos services. Les données personnelles que nous collectons peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone, votre adresse IP, ainsi que d'autres informations que vous nous fournissez volontairement.",
        },
        {
            title: 'Utilisation des données personnelles :',
            paragraph:
                'Nous utilisons vos données personnelles pour fournir nos services, gérer votre compte, répondre à vos demandes, améliorer nos services, vous informer de nos offres et promotions et pour se conformer à nos obligations légales.',
        },
        {
            title: 'Partage des données personnelles :',
            paragraph:
                'Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos données personnelles avec nos partenaires commerciaux, prestataires de services et autorités compétentes, dans le cadre de la fourniture de nos services ou pour se conformer à nos obligations légales.',
        },
        {
            title: 'Cookies et technologies similaires :',
            paragraph:
                "Nous utilisons des cookies et d'autres technologies similaires pour améliorer votre expérience utilisateur et pour collecter des informations sur votre utilisation de notre site web. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.",
        },
        {
            title: 'Sécurité des données personnelles :',
            paragraph:
                "Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre la perte, le vol, l'accès non autorisé ou la divulgation. Nous ne conservons vos données personnelles que pendant la durée nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées.",
        },
        {
            title: 'Vos droits : ',
            paragraph:
                "Vous avez le droit d'accéder, de rectifier, de supprimer ou de restreindre le traitement de vos données personnelles, ainsi que le droit de vous opposer à leur traitement pour des raisons légitimes. Vous avez également le droit de retirer votre consentement à tout moment lorsque celui-ci a été donné pour un traitement spécifique de vos données personnelles.",
        },
        {
            title: 'Contact : ',
            paragraph:
                "Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité ou notre traitement de vos données personnelles, vous pouvez nous contacter à [insérer l'adresse e-mail ou le numéro de téléphone de contact]. <br /> <br /> Nous avons nommé un délégué à la protection des données (DPD) pour garantir que nous respectons les exigences du RGPD. Si vous avez des questions ou des préoccupations concernant notre traitement des données personnelles, vous pouvez contacter notre DPD à [insérer l'adresse e-mail ou le numéro de téléphone du DPD].",
        },
    ]);
</script>

<style lang="scss" scoped>
    .rules {
        min-height: calc(100vh - 100px);
        @apply max-w-[1024px] mx-auto relative my-[18px] px-[24px];
        @screen md {
            @apply py-[18px] px-[28px];
        }
        @screen xl {
            @apply py-[18px] px-[50px];
        }
        &__section {
            @apply flex flex-col gap-[24px];
        }
        &__container {
            @apply flex flex-col gap-[24px];
            counter-reset: newCounter;
            @screen lg {
                @apply ml-[40px];
            }
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
