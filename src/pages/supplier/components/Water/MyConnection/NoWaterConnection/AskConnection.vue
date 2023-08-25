<template>
    <div class="ask-connection">
        <BackButton
            :text="'Demander un raccordement à l’eau courante'"
            @return="backTo"
            class="back-tbn"
        />
        <div class="info" @click="handleShowInfo">
            <InfoIcon />
            <Paragraphe>Informations</Paragraphe>
        </div>
        <Modal
            :is-show-modal="isShow"
            @on-back="onOpenModal"
            title="INFORMATIONS"
            width="750"
        >
            <template #content>
                <div>
                    <Paragraphe>
                        <b>Indien deze voorwaarden van toepassing zijn: </b>
                        <ul>
                            <li>
                                de afstand tussen de rooilijn (eigendomsgrens)
                                en de voorgevel bedraagt niet meer dan 50 meter
                                (een woning op de rooilijn is dus ook standaard
                                aftakking).
                            </li>
                            <li>Je woning is een eengezinswoning</li>
                            <li>Het aantal wooneenheden is gelijk aan 1.</li>
                        </ul>
                        <b
                            >Voldoet jouw woning niet aan de standaard
                            voorwaarden?</b
                        >
                        Dan nemen ze contact met je op voor een afspraak of
                        bijkomende informatie. Nadien bezorgen we je een offerte
                        op maat, met een overzicht van: De kostprijs van de
                        aftakking Een schets van de aftakking Alle technische en
                        administratieve stappen die je nog moet uitvoeren.
                    </Paragraphe>
                </div>
            </template>
        </Modal>
        <Tabs
            :connection-supplier="supplierData"
            :connectionSupplierTitle="titleData"
            @open-form="handleOpenForm"
            @open-list="handleOpenList"
        />
        <Modal
            :is-show-modal="isShowList"
            @on-back="onOpenModal"
            title="Trouver un contrôleur agréé dans votre région"
            width="100%"
            class="modal"
        >
            <template #content>
                <div>
                    <table class="tabs">
                        <thead>
                            <tr>
                                <td
                                    v-for="(
                                        item, index
                                    ) in listDataTitle"
                                    :key="index"
                                >
                                    {{ item.title }}
                                </td>
                            </tr>
                        </thead>
                        <tbody
                            v-for="(item, index) in controllerList"
                            :key="index"
                        >
                            <tr>
                                <td>
                                    {{ item.postcode }}
                                </td>
                                <td>
                                    {{ item.agrementNb }}
                                </td>
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    {{ item.lastname }}
                                </td>
                                <td>
                                    {{ item.society }}
                                </td>
                                <td>
                                    {{ item.tvaNb }}
                                </td>
                                <td>
                                    {{ item.email }}
                                </td>
                                <td>
                                    {{ item.website }}
                                </td>
                                <td>
                                    {{ item.phoneNb }}
                                </td>
                                <td>
                                    <Button>Contacter</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </Modal>
        <Modal
            :is-show-modal="isShowFrom"
            @on-back="onOpenModal"
            title="CONTRÔLES OBLIGATOIRES"
            width="750"
        >
            <template #content>
                <div class="items" v-if="!showBtn">
                    <img src="@/assets/schema-interactif.png" alt="" />
                    <Button @click="next">Suivant</Button>
                </div>
                <div v-else class="contents">
                    <Button @click="handleShowControlAgree" type-button="gray"
                        >Je commande un contrôle de l'installation
                        intérieure</Button
                    >
                    <Button @click="handleShowControlAgree" type-button="gray"
                        >Je commande un contrôle de l'eau du deuxième
                        circuit</Button
                    >
                    <Button @click="handleShowControlAgree" type-button="gray"
                        >Je commande un contrôle de l'installation intérieure «
                        non raccordée »</Button
                    >
                </div>
            </template>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import { onMounted, ref } from 'vue';
    import Tabs from '../Tabs.vue';
    import {
        supplierDataBruxelle,
        supplierDataFlandre,
        supplierDataWallon,
    } from './Data/supplier.data';
    import {controllerList} from './Data/controllerList.data';

    const props = defineProps({
        region: {
            type: String,
            default: 'Vlaams Gewest',
            // default: 'Région Wallonne',
        },
    });

    const emit = defineEmits(['back-to', 'showControlAgree']);

    const titleData = [
        {
            title: '',
        },
        {
            title: 'Type de prestation',
        },
        {
            title: 'Cout',
        },
        {
            title: 'Commander les travaux',
        },
    ];

    const listDataTitle = [
        {
            title: 'CODE POSTALE'
        },
        {
            title: 'N° AGREMENT'
        },
        {
            title: 'NOM'
        },
        {
            title: 'PRENOM'
        },
        {
            title: 'SOCIETE'
        },
        {
            title: 'N° DE TVA'
        },
        {
            title: 'ADRESSE MAIL'
        },
        {
            title: 'SITE WEB'
        },
        {
            title: 'N° DE TEL'
        },
        {
            title: 'Contacter'
        },
    ]

    const isShow = ref<boolean>(false);
    const isShowFrom = ref<boolean>(false);
    const isShowList = ref<boolean>(false);
    const showBtn = ref<boolean>(false);

    const supplierData = ref<any>([]);

    function checkRegionForSupplierData() {
        switch (props.region) {
            case 'Vlaams Gewest':
                supplierData.value = supplierDataFlandre;
                break;
            case 'Bruxelles-Capitale':
            case 'Bruxelles':
                supplierData.value = supplierDataBruxelle;
                break;
            case 'Région Wallonne':
                supplierData.value = supplierDataWallon;
                break;
            default:
                break;
        }
    }

    function handleShowInfo() {
        isShow.value = true;
    }

    function handleOpenForm() {
        isShowFrom.value = true;
    }

    function handleOpenList() {
        isShowList.value = true;
    }

    function onOpenModal() {
        if (isShow.value === true) {
            isShow.value = !isShow.value;
        } else if (isShowFrom.value === true) {
            isShowFrom.value = !isShowFrom.value;
        } else if (isShowList.value === true) {
            isShowList.value = !isShowList.value;
        }
    }

    function next() {
        showBtn.value = true;
    }

    function backTo() {
        emit('back-to');
    }

    function handleShowControlAgree() {
        emit('showControlAgree', true);
        isShowFrom.value = !isShowFrom.value;
    }

    onMounted(() => {
        checkRegionForSupplierData();
    });
</script>
<style lang="scss" scoped>
    .__hr {
        @apply text-gray w-full;
    }
    .info {
        @apply flex gap-[10px] rounded-[8px] w-fit p-[10px];
        border: 0.5px solid var(--color-gray);
        cursor: pointer;
    }
    .ask-connection {
        @apply flex flex-col gap-[18px] w-full;
    }
    .items {
        @apply flex flex-col gap-[18px] items-end;
    }
    .back-tbn {
        @apply w-full;
    }
    .contents {
        @apply flex flex-col gap-[18px] align-middle items-center;
    }
    table {
        // width: 100%;
        background-color: #fff;
        border: 0.5px solid var(--color-gray);
        th {
            width: 100%;
        }
        td {
            border: 0.5px solid var(--color-gray);
            padding: 18px;
            font-weight: 600;
            text-transform: capitalize;
            height: 0;
        }
    }
</style>
