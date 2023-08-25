<template>
        <Note :text="notificationText" />
        <hr class="__hr" />
        <div v-for="(item, index) in suggestedPrice" :key="index">
            <FormulaButton 
                :label="item.formulaLabel" 
                :price="item.price"
                :icon-name="item.iconName"
                :descriptions="item.descriptions"
                :is-active="item.price === selectedBudget"
                @click="handleClick"
            />
        </div>
</template>
<script lang="ts" setup>
import Note from '@/pages/transport/components/Note.vue';
import { ref, onMounted } from 'vue';

import { useStore } from "vuex";

import FormulaButton from '@/pages/transport/components/FormulaButton.vue';

interface IDescriptionItem {
    subtitle: string;
    details: string[]
}

interface IContentItem {
    formulaLabel: string;
    price: string;
    descriptions: IDescriptionItem[];
    iconName: string,
    id: string
}

const store = useStore();
const selectedBudget = ref<string>('');
const suggestedPrice = ref<IContentItem[]>([
    {
        formulaLabel: 'Economique',
        price: '2663',
        descriptions: [
            {
                subtitle: 'Camion avec chauffeur',
                details: ['Le chauffeur charge au pied du camion']
            },
            {
                subtitle: 'A faire soi-meme :',
                details: [
                    'Les cartons, le demontage des meubles et la protection des objets fragiles.', 
                    'Transport de vos biens jusqu’au pas de la porte'
                ]
            }
        ],
        iconName: 'PiggyBank',
        id: 'economic'
    },
    {
        formulaLabel: 'Standard',
        price: '3550',
        descriptions: [
            {
                subtitle: 'Faites vos cartons, le demenageur s’occupe du reste',
                details: [
                    "Fourniture du materiel d’emballage (cartons...)",
                    "Le demenageur protege et securise vos meubles",
                    "Il charge et decharge entre le logement et le camion"
                ]
            },
            {
                subtitle: 'A faire soi-meme :',
                details: ['Les cartons']
            }
        ],
        iconName: 'Truck',
        id: "standard"
    },
    {
        formulaLabel: 'Tout inclus',
        price: '5325',
        descriptions: [
            {
                subtitle: "Formule luxe : les demenageurs s’occupent de tout !",
                details: [
                    "Fourniture du materiel d’emballage",
                    "Emballage, deballage de vos affaires (fragile inclus)",
                    "Demontage, protection et remontage des meubles",
                    "Chargement et dechargement du logement au camion"
                ]
            }
        ],
        iconName: 'Diamond',
        id: 'allInclusive'
    }
])

const notificationText = ref<string>('Les prix indiques a cette etape sont estimes. Choisissez la folmule qui vous convient et \
    les demenageurs vous enverront des devis plus precis.');

onMounted(async () => {
    let announcementData = store.getters["TransportModule/getAnnouncementData"];
    let movingData = store.getters["TransportModule/getObjectData"];
    await fetchMovingFormula(announcementData, movingData);
})

function handleClick(value: any) {
    selectedBudget.value = value.budget;
    store.dispatch("TransportModule/setAnnouncementData", value);
}

async function fetchMovingFormula(announce: any, object: any) {
    let payload = {
        latDep: announce.departureLatitude,
        lngDep: announce.departureLongitude,
        latAr: announce.arrivalLatitude,
        lngAr: announce.arrivalLongitude,
        floor: String(announce.departureFloor),
        volume: parseInt(object.volume)
    }
    let response = await store.dispatch("TransportModule/fetchMovingFormula", payload);
    let data = response.data;
    delete data.id;
    updatePrices(data);
}

function updatePrices(prices: any) {
    let keys = Object.keys(prices);
    keys.forEach((key: string) => {
        let currentValue = prices[key].replace( /\D+/g, '');
        let idx = suggestedPrice.value.findIndex((element: IContentItem) => element.id === key);
        suggestedPrice.value[idx].price = currentValue;
    });
}
</script>
<style lang="scss" scoped>
.moving-formula {
    &__sub-title {
        color: var(--color-primary);
    }
}

.__hr {
    @apply block my-4 text-gray;
}
</style>