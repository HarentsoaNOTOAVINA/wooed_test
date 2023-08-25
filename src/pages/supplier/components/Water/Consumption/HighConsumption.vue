<template>
    <div class="content">
        <div>
            <Paragraphe
                >Sommige lekken kan je makkelijk zelf vinden: de slecht werkende
                vlotter in het toilet bijvoorbeeld of de badkamerkraan die niet
                naar behoren afsluit. Moeilijker wordt het bij ondergrondse
                lekken want die zijn nauwelijks waarneembaar. En als het lek
                zichtbaar wordt, was er meestal lang voordien al waterverlies.
                Behalve bij grote buisbreuken is een lek meestal maar af te
                leiden uit andere signalen: verminderde druk, natte plekken op
                muren of plafond of helaas ook vaak de fors gestegen
                waterfactuur.
            </Paragraphe>
            <Paragraphe>Spoor een lek op in 3 stappen</Paragraphe>
            <Paragraphe
                ><b>Stap 1: Volg je waterverbruik op</b> <br />
                Op de jaarlijkse verbruiksfactuur vind je een overzicht van je
                gemiddeld jaarverbruik van de voorbije 3 jaren. Om te weten of
                jouw verbruik normaal is, kan je het vergelijken met het
                <b>gemiddeld waterverbruik</b> in Vlaanderen:
                <b>Gezin van Waterverbruik per jaar1</b> persoon 39 m³ 2
                personen 65 m³ 3 personen 93 m³ 4 personen 111 m³ 5 personen 134
                m³ Je hoeft echter niet te wachten op de jaarlijkse
                verbruiksfactuur om je verbruik op te volgen: noteer maandelijks
                je meterstand en volg zo je verbruik op. Ligt jouw verbruik een
                stuk hoger dan het gemiddeld verbruik of merk je plots een
                stijging? Dan is er misschien wel ergens een lek. Op die manier
                kan je onmiddellijk ingrijpen en is het meerverbruik op je
                factuur veel kleiner. <br />
                <b>Stap 2: Controleer de meterstand</b> <br />
                Neem de stand van de watermeter op bij het begin van een periode
                waarin er geen water verbruikt zal worden, bijvoorbeeld net voor
                je gaat slapen. Schakel alle apparaten uit die water verbruiken
                en spoel je toilet (op leidingwater) niet door. Controleer 's
                ochtends opnieuw de meterstand. Let daarbij vooral op de cijfers
                na de komma. Indien er een verschil is, wijst dit op een lek.
                <br />
                <b
                    >Stap 3: Spoor het lek zelf op of haal er een loodgieter
                    bij</b
                >
            </Paragraphe>
            <Paragraphe
                >Een lekkend toilet suist meestal en kan je zelf proberen
                opsporen, bijvoorbeeld door een stukje toiletpapier onder de
                rand te hangen. Een kraan die niet goed afsluit, blijft
                druppelen. Moeilijker zijn ondergrondse lekken, bijvoorbeeld een
                leiding naar het tuinhuis of de buitenkraan. Behalve bij grote
                buisbreuken is een lek meestal maar af te leiden uit andere
                signalen : verminderde druk, natte plekken op muren op plafond
                of helaas ook vaak de fors gestegen waterfactuur.</Paragraphe
            >
        </div>
        <div>
            <Paragraphe>
                <span>Ik heb een lek. Wat nu? </span> <br />
                <b>Heb je een lek in je woning?</b> <br />
            </Paragraphe>
            <ol>
                <li>
                    Herstel het dan zo snel mogelijk of bel een loodgieter.
                    Indien het lek niet onmiddellijk hersteld kan worden, koppel
                    het defecte gedeelte af of draai de hoofdkraan dicht wanneer
                    je geen water nodig hebt. Zo voorkom je bijkomend verlies
                    <div class="content__info" @click="handleShowInfo">
                        <InfoIcon />
                    </div>
                    <Modal
                        :is-show-modal="isShow"
                        @on-back="onOpenModal"
                        title=""
                        width="750"
                    >
                        <template #content>
                            <ol class="info-content">
                                <li>
                                    <b>Tegemoetkoming bij lekverlies</b> <br />
                                    Naast het effectieve verhoogde verbruik moet
                                    je nog aan een aantal bijkomstige
                                    voorwaarden voldoen om recht te hebben om
                                    een minnelijke schikking:
                                    <ol class="info-sub-content">
                                        <li>
                                            Het abnormaal hoge verbruik is het
                                            gevolg van een verborgen oorzaak.
                                            Wat is een verborgen oorzaak?
                                        </li>
                                        <li>
                                            Je hebt gehandeld als een goede
                                            huisvader en er is geen sprake van
                                            kwaad opzet of bedrog. Wat is
                                            handelen als een goede huisvader?
                                        </li>
                                        <li>
                                            De oorzaak van het abnormaal hoge
                                            verbruik moet hersteld of weggenomen
                                            zijn. De Watergroep kan in dit kader
                                            een keuring van de binneninstallatie
                                            opleggen waarvan de kosten ten laste
                                            zijn van de klant.Enkel een
                                            lekdetectieverslag of een
                                            vaststelling zonder
                                            herstellingsfactuur volstaat
                                            niet.Heb je het herstel zelf
                                            uitgevoerd? Bezorg ons het
                                            aankoopbewijs van je materiaal én
                                            een aantal duidelijke foto’s van de
                                            situatie voor en na de herstelling.
                                            Eventueel contacteren we je voor een
                                            nacontrole of een keuring. Bezorg
                                            ons dus zeker een telefoonnummer
                                            waarop we je overdag kunnen
                                            bereiken. Geef ons steeds je
                                            meterstand na herstelling van het
                                            lek door. Meer info over keuring
                                            binneninstallatie.
                                        </li>
                                        <li>
                                            Je volledige binneninstallatie
                                            voldoet aan de wettelijke en
                                            technische voorschriften.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <b>Berekening van de tegemoetkoming</b>
                                </li>
                                <li>
                                    <b>Tegemoetkoming aanvragen</b>
                                    <div class="link">
                                        <RoundLink /><a
                                            href="https://formulieren.dewatergroep.be/aanvraag-tussenkomst-bij-verborgen-lek/r"
                                            >https://formulieren.dewatergroep.be/aanvraag-tussenkomst-bij-verborgen-lek/</a
                                        >
                                    </div>
                                    <div class="link">
                                        <RoundLink /><a
                                            href="https://www.dewatergroep.be/nl-be/drinkwater/wat-te-doen-bij/tegemoetkoming-bij-lekverlies"
                                            >https://www.dewatergroep.be/nl-be/drinkwater/wat-te-doen-bij/tegemoetkoming-bij-lekverlies</a
                                        >
                                    </div>
                                </li>
                            </ol>
                        </template>
                    </Modal>
                </li>
                <li>Merk je een lek aan je hoofdkraan of aan je watermeter</li>
            </ol>
        </div>
        <div class="link">
            <RoundLink /><a
                href="https://www.dewatergroep.be/nl-be/contact/contactformulier"
                >NEEM CONTACT OP MET DE WATERGROEP</a
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import { ref } from 'vue';

    const isShow = ref<boolean>(false);

    function handleShowInfo() {
        isShow.value = true;
    }

    function onOpenModal() {
        isShow.value = !isShow.value;
    }
</script>
<style lang="scss" scoped>
    .content {
        @apply flex flex-col gap-[18px] bg-gray p-[18px] rounded-[8px];
        &__info {
            @apply float-right;
            cursor: pointer;
        }
    }
    .info-content {
        @apply flex flex-col gap-[18px];
    }
    .info-sub-content {
        @apply pl-[18px] flex flex-col gap-[10px];
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
    ol {
        list-style: decimal;
        list-style-position: inside;
    }
</style>
