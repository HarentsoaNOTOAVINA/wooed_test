<template>
    <div class="announce-overview__container">
        <span class="text-thin">Référence N° {{ data.reference }}</span>
        <div class="announce-overview__items">
            <ColisDetails :object-data="props.objectData" :announcement-details="props.announcementDetails" />
            <div v-if="displayForm && data.user !== currentUser.id">
                <span class="announce-overview__form-title">Faire ma proposition</span>
                <TextArea 
                    nameInput="message" 
                    label="Votre message" 
                    placeholder=""
                    :default-value="storedData.message"
                    @handle-change="handleChange"
                />
            </div>
            <div v-else>
                <div class="announce-overview__item-location">
                    <ColisLocation label-title="Lieu de départ" :label-address="data.departureAddress">
                        <template #content>
                            <Paragraphe class="truncate">
                                Possibilité de remettre les biens au (co)transporteur:
                            </Paragraphe>
                            <br>
                            <Paragraphe>
                                Besoin d’aide pour charger les biens : 
                                <span v-if="data.isBringToArrival" class="font-semibold">Oui</span>
                                <span v-else class="font-semibold">Non</span>
                            </Paragraphe>
                            <br>
                            <Paragraphe>
                                Etage : 
                                <span v-if="data.arrivalFloor" class="font-semibold">{{ data.arrivalFloor }}</span>
                                <span v-else>--</span>
                                |  
                                Ascenseur : 
                                <span v-if="data.isArrivalHaveElevator" class="font-semibold">Oui</span>
                                <span v-else class="font-semibold">Non</span>
                            </Paragraphe>
                        </template>
                    </ColisLocation>
                    <ColisLocation label-title="Lieu d’arrivé" :label-address="data.arrivalAddress">
                        <template #content>
                            <!-- <Paragraphe> Livraison à pied </Paragraphe> -->
                            <Paragraphe>
                                Besoin d’aide pour charger les biens : 
                                <span v-if="data.isBringToDeparture" class="font-semibold">Oui</span>
                                <span v-else class="font-semibold">Non</span>
                            </Paragraphe>
                            <br>
                            <Paragraphe>
                                Etage : 
                                <span v-if="data.departureFloor" class="font-semibold">{{ data.departureFloor }}</span>
                                <span v-else class="font-semibold">--</span>
                                |  
                                Ascenseur : 
                                <span v-if="data.isDepartureHaveElevator" class="font-semibold">Oui</span>
                                <span v-else class="font-semibold">Non</span>
                            </Paragraphe>
                        </template>
                        <template #block>
                            <Button type-button="gray" class="colisLocation__btn" @click="getItinerary">
                                Voir l’itinéraire
                            </Button>
                        </template>
                    </ColisLocation>
                </div>
                <ColisProfile :data="data" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import ColisDetails from './Announce/ColisDetails.vue';
import ColisLocation from './Announce/ColisLocation.vue';
import ColisProfile from './Announce/ColisProfile.vue';
import Button from '@/components/Common/Button/Button.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, computed, ref } from "vue";

const store = useStore();
const router = useRouter();

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
    displayForm: {
        type: Boolean,
        default: false
    },
    objectData: {
        type: Object,
        default: {}
    },
    announcementDetails: {
        type: Object,
        default: {}
    }
});

const storedData = computed(() => store.getters["TransportModule/getProposalData"]);
const currentUser = computed(() => store.getters["UserModule/getUserDetails"]);

onMounted(() => {
    checkProposalUser();
    setInitialData();
});

function checkProposalUser() {
    const proposalData = store.getters["TransportModule/getProposalData"];
    if (!proposalData.user) {
        const userDetails = store.getters["UserModule/getUserDetails"];
        store.dispatch("TransportModule/setProposalData", { user: userDetails.id, userName: `${userDetails.firstname} ${userDetails.name}` });
    }
}

function setInitialData() {
    const proposalData = store.getters["TransportModule/getProposalData"];
    store.dispatch("TransportModule/setProposalData", { message: '' });
}

function handleChange(value: any) {
    store.dispatch("TransportModule/setProposalData", value);  
}

async function getItinerary() {
    let from = { 
        lat : parseFloat(props.data.departureLatitude), 
        lng : parseFloat(props.data.departureLongitude) 
    }

    let to = {
        lat : parseFloat(props.data.arrivalLatitude), 
        lng : parseFloat(props.data.arrivalLongitude)
    }

    await store.dispatch("TransportModule/fetchItinerary", { from, to });
    
    router.push({
        name: 'transport-itinerary',
        params: { reference: props.data.reference }
    })
}
</script>
<style lang="scss" scoped>
.announce-overview {
    &__container {
        @apply w-full flex flex-col gap-[14px];
    }

    &__items {
        @apply flex flex-col gap-[14px];

        @screen sm {
            @apply gap-[18px];
        }
    }

    &__form-title {
        @apply text-primary font-[600];
    }

    &__item-location {
        @apply grid grid-cols-1 gap-[14px];

        @screen sm {
            @apply grid-cols-2;
        }

        .colisLocation__btn {
            &:deep() {
                button {
                    @apply max-w-[267px] w-full text-grayIcon rounded-[8px];
                }
            }
        }
    }
}

.input-button {
    @apply w-6 h-6 cursor-pointer;
}

.input-item {
    @apply w-full;
}
</style>
