<template>
    <div class="extentControl">
        <div class="extentControl__header">
            <div class="extentControl__back" @click="$emit('prev')">
                <BackButton />
            </div>
            <Paragraphe class="extentControl__title"
                >Etendu du contrôle</Paragraphe
            >
        </div>
        <hr class="separator" />
        <div class="extentControl__content">
            <div class="extentControl__content-title">
                <Paragraphe class="title-normal"
                    >Eisen verbrandingsrendement van cv-ketel</Paragraphe
                >
                <Paragraphe class="title-small"
                    >Het verbrandingsrendement van de cv-ketel moet voldoende
                    hoog zijn.</Paragraphe
                >
            </div>

            <div class="extentControl__content-value">
                <Paragraphe class="textBold"
                    >Een toestel dat niet voldoet aan de verbrandingswaarden,
                    werkt niet goed. De eigenaar en gebruiker hebben na de
                    <a
                        class="text-link"
                        href="https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming"
                        target="_blank"
                    >
                        periodieke onderhoudsbeurt</a
                    >
                    3 maanden de tijd om de tekortkomingen weg te werken en
                    hiervan het bewijs te leveren door middel van een nieuw
                    verbrandingsattest.</Paragraphe
                >
                <Paragraphe
                    >In bepaalde gevallen zal de cv-ketel vervangen moeten
                    worden. Het niet wegwerken van de tekortkomingen (<a
                        class="text-link"
                        href="https://navigator.emis.vito.be/detail?woId=29154"
                        target="_blank"
                        >artikel 10 van het Stooktoestellenbesluit(opent in
                        nieuw venster)</a
                    >
                    ) wordt beschouwd als een milieumisdrijf.</Paragraphe
                >
            </div>

            <div class="extentControl__content-title">
                <Paragraphe class="title-normal">Stookolieketel</Paragraphe>
                <Paragraphe class="textBold"
                    >Het verbrandingsrendement (Hi) van uw cv-ketel moet
                    minstens 90% bedragen. Bij het periodiek onderhoud van de
                    cv-ketel wordt het verbrandingsrendement van uw installatie
                    berekend. Als het verbrandingsrendement te laag is, noteert
                    de technicus vloeibare brandstof dit op het
                    verbrandingsattest.</Paragraphe
                >
            </div>

            <div class="extentControl__content-title">
                <Paragraphe class="title-normal">Aardgasketel</Paragraphe>
                <Paragraphe
                    >Voor cv-ketels op gasvormige brandstof wordt een
                    onderscheid gemaakt tussen een B1-toestel of een
                    niet-B1-toestel. Deze verbrandingswaarden bedragen de
                    volgende:</Paragraphe
                >
            </div>
            <div class="extentControl__content-title">
                <Paragraphe class="title-normal"
                    >Verbrandingswaarden voor centraal stooktoestel gevoed met
                    gasvormige brandstof</Paragraphe
                >
                <div class="content-table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Maximaal CO-gehalte (mg/kWh)</th>
                                <th>Minimaal verbrandings rendement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>B1-toestel</td>
                                <td>150</td>
                                <td>88%</td>
                            </tr>
                            <tr>
                                <td>niet-B1-toestel</td>
                                <td>150</td>
                                <td>90%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Paragraphe
                >Deze verbrandingswaarden zijn terug te vinden in
                <a
                    class="text-link"
                    href="https://navigator.emis.vito.be/detail?woId=29148"
                    target="_blank"
                    >artikel 5, §1, 2° van het Vlaams Stooktoestellenbesluit</a
                ></Paragraphe
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>

<style scoped lang="scss">
    .extentControl {
        &__header {
            @apply flex items-center;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__title {
            @apply text-[16px] font-[600] text-[var(--color-gray-icon)];
        }
        &__content-title {
            @apply mb-[25px];
        }
        &__content-value {
            @apply mb-[25px];
        }
    }

    .textBold {
        @apply font-bold mb-[15px];
    }
    .title-normal {
        @apply text-base font-bold;
    }

    .title-small {
        @apply text-[12px] font-semibold text-[var(--color-gray-icon)];
    }

    .text-link {
        @apply text-[var(--color-link)] underline;
    }

    .content-table {
        border: 1px solid #dddddd;
        border-radius: 8px;
        width: 100%;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        // pour ajouter un border-radius sur un tableau
        // border-radius: 8px;
        // overflow: hidden;
        // fin d'ajouter un border-radius sur un tableau
    }

    th,
    td {
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        @apply text-left p-[20px];
    }
    th:first-child,
    td:first-child {
        border-left: 1px solid #dddddd;
        @apply font-bold;
    }
    th:last-child,
    td:last-child {
        border-right: 1px solid #dddddd;
    }
    td:first-child {
        @apply bg-[var(--color-stroke-gray)] border-[var(--color-stroke-gray)];
    }
</style>
