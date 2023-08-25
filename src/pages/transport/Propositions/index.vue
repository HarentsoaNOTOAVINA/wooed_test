<template>
    <div class="proposition-list">
        <div class="proposition-list__section">
            <BackButton :text="'retour'" @return="backTo" />
            <hr class="__hr" />
            <span class="proposition-list__title">Liste des propositions</span>
            <div class="proposition-list__grid">
                <template v-for="(item, index) in propositionList" :key="index">
                    <PropositionCard 
                        :data="item"
                        :disable-btn="disablePropositionBtn" 
                        @select-agent="validateProposition" 
                    />
                </template>
            </div>
            <Modal :is-show-modal="displayPaymentForm" @on-back="hideModal" :width="screenType >= 1024 ? '800' : '520'" title="Méthode de payement">
                <template #content>
                    <PayementForm 
                        :budget="currentAnnounce.budget"
                        :registration-info="registrationCard"
                        :proposition-id="propositionId"
                        @hide-form="resetRegistrationCard"
                    />
                </template>
            </Modal>
        </div>
    </div>
</template>
<script lang="ts" setup>
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import PropositionCard from '@/pages/transport/components/DeliveryAgentCard.vue';
import Announce from '@/pages/transport/components/Announce.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import PayementForm from '@/pages/transport/components/PaymentForm.vue';

import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const screenType = ref<number>(screen.width);

const store = useStore();
const router = useRouter();
const route = useRoute();

const currentRef = route.params.reference;
const disablePropositionBtn = ref<boolean>(false);
const registrationCard = computed(() => store.getters["TransportModule/getRegistrationCardInfo"]);
const propositionId = ref<number>();

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '#',
    },
});

const list = ref<boolean>(true);

const propositionList = ref<any>();
const displayPaymentForm = ref<boolean>(false);

onMounted(() => checkPropositions());

let currentAnnounce = computed(() => {
    let announces = store.getters["TransportModule/getAnnouncementList"];
    return announces.find((announce: any) => announce.reference === currentRef);
})

function checkPropositions() {
    let storedData = computed(() => store.getters["TransportModule/getPropositionList"]);
    storedData.value.length >= 1 ? propositionList.value = storedData.value : backTo();
}

function backTo() {
    store.dispatch("TransportModule/setActiveComponent", Announce);
    router.push({ name: 'transport' });
}

function hideModal() {
    displayPaymentForm.value = false;
}

async function validateProposition(value: any) {
    displayPaymentForm.value = true;
    disablePropositionBtn.value = true;
    propositionId.value = value.id;
    await store.dispatch("TransportModule/updateCardRegistrationInfo", value);
    setTimeout(async () => await store.dispatch("TransportModule/fetchCardRegistrationInfo"), 5000);
}

function resetRegistrationCard() {
    store.commit("TransportModule/SET_REGISTRATION_CARD", undefined);
    disablePropositionBtn.value = false;
}

</script>
<style lang="scss" scoped>
.proposition-list {
    max-width: 945px;
    @apply mx-auto container;


    &__section {
        @apply mt-[18px];
        background-color: #fff;
        border-radius: 8px;
        padding: 14px;
    }

    &__title {
        @apply text-primary font-[600];
    }

    &__grid {
        @apply w-fit mx-auto grid grid-cols-1 justify-items-center justify-center gap-[14px] my-4;
        @screen md {
            @apply grid-cols-2;
        }
        @screen lg {
            @apply grid-cols-3;
        }
    }
}

.__hr {
    @apply block my-[10px] text-gray;
}
</style>
