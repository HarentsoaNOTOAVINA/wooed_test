<template>
    <div class="send-by-app">
        <Paragraphe
            ><b
                >Autoriser « mon fournisseur d’eau » à me transmettre mes
                factures sur l’application</b
            ></Paragraphe
        >
        <div class="btn-list">
            <Button
                type-button="gray"
                @click="
                    handleClickBtn(
                        item.url && item.url,
                        item.content && item.content
                    )
                "
                v-for="(item, index) in btnItems"
                :key="index"
                >{{ item.title }}</Button
            >
        </div>

        <hr class="__hr" />
        <div v-if="btnContent === '1'" class="btn-content">
            <Paragraphe>
                <b>De Watergroep </b> <br />
                Stuur een e-mail naar mailto:info@dewatergroep.be en vermeld
                hierin volgende gegevens:
                <ul>
                    <li>Klantrekening (terug te vinden bovenaan de factuur)</li>
                    <li>
                        Contractnummer (terug te vinden bovenaan de factuur)
                    </li>
                    <li>Oud bankrekeningnummer Nieuw bankrekeningnummer.</li>
                </ul>
            </Paragraphe>
        </div>
        <div v-if="btnContent === '2'" class="btn-content">
            <Paragraphe>
                Dat kan op 2 manieren: <br />
                <b>Pas jouw klantgegevens zelf aan </b> via onze online
                klantenzone. <br />
                Neem contact op met ons klantencontactcenter en laat weten wat
                er fout staat in jouw naam of adres.
            </Paragraphe>
            <div class="link">
                <RoundLink /><a
                    href="https://www.dewatergroep.be/nl-be/drinkwater/veelgestelde-vragen/mijn-waterfactuur"
                    >https://www.dewatergroep.be/nl-be/drinkwater/veelgestelde-vragen/mijn-waterfactuur
                </a>
            </div>
        </div>
        <div v-if="btnContent === '3'" class="btn-content">
            <Paragraphe>
                <b>De Watergroep</b>
            </Paragraphe>
            <div class="link">
                <RoundLink /><a
                    href="https://www.dewatergroep.be/nl-be/drinkwater/domicili%C3%ABren/domicili%C3%ABring-aanvragen"
                    >https://www.dewatergroep.be/nl-be/drinkwater/domicili%C3%ABren/domicili%C3%ABring-aanvragen
                </a>
            </div>
        </div>
        <div v-if="btnContent === '4'" class="btn-content">
            <Paragraphe>
                <b>De Watergroep</b> <br />
                De Watergroep Contacteer hiervoor jouw bank. De Watergroep
                ontvangt daarna alle informatie van jouw bank om de wijziging
                door te voeren.
            </Paragraphe>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import { ref } from 'vue';

    const btnContent = ref<string>('');

    const btnItems = [
        {
            title: 'Contester la facture',
            url: 'https://www.dewatergroep.be/nl-be/portaal/registreer',
        },
        {
            title: 'Demander un plan de paiement',
            url: 'https://www.dewatergroep.be/nl-be/portaal/registreer',
        },
        {
            title: "J’ai un problème d’activation de « mon fournisseur d'eau » dans Zoomit",
            content: '1',
        },
        {
            title: 'Modifier l’adresse mail pour l’envoi de mes factures digitales',
            content: '2',
        },
        {
            title: 'Activer une domiciliation',
            content: '3',
        },
        {
            title: 'Modifier le numéro de compte pour ma domiciliation',
            content: '4',
        },
    ];

    function handleClickBtn(url: string | any, content: string | any) {
        if (url) {
            window.open(url);
            btnContent.value = '';
        } else {
            btnContent.value = content;
        }
    }
</script>
<style lang="scss" scoped>
    .send-by-app {
        @apply flex flex-col gap-[18px];
    }
    .btn-list {
        @apply grid grid-flow-row auto-rows-max gap-2;
    }
    .btn-content {
        @apply bg-gray rounded-[8px] p-[18px] w-full;
    }
    .__hr {
        @apply text-gray w-full;
    }
    ul {
        list-style: circle;
        list-style-position: inside;
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
</style>
