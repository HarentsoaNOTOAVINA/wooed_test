<template>
    <div class="moving-shortcuts__main-content">
        <SideMenu />
        <ColisCard 
            v-if="allForm"
            :form-list="allForm" 
            @set-moving-preference="updateFormList" 
        />
    </div>
</template>
<script lang="ts" setup>
import { onMounted, defineAsyncComponent, computed, shallowRef } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import SideMenu from '@/pages/transport/components/TransportSideMenu/SideMenu.vue';
import ColisCard from '@/pages/transport/components/ColisCard.vue';

const MovingCompanies = defineAsyncComponent(() => import('@/pages/transport/components/Form/MovingCompanyList.vue'));
const ImagesForm = defineAsyncComponent(() => import('@/pages/transport/components/Form/ImagesForm.vue'));
const MoreDetailsForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/MoreDetailsForm.vue"));
const AddressForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/AddressForm.vue"));
const QuantityNameForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/QuantityNameForm.vue"));
const VolumeForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/VolumeForm.vue"));
const DateForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/DateForm.vue"));
const BudgetMovingFormula = defineAsyncComponent(() => import("@/pages/transport/components/Form/MovingFormula.vue"));
const VolumePreferenceForm = defineAsyncComponent(() => import('@/pages/transport/components/Form/VolumePreferenceForm.vue'));

const store = useStore();
const router = useRouter();

interface IFormItem {
    component: object,
    requiredFields: string[],
    pageTitle: string,
    id: string
}

const addressForm = { component: AddressForm, requiredFields: [], pageTitle: 'Addresses', id: 'address' };
const dateForm = { component: DateForm, requiredFields: [], pageTitle: 'Dates de déménagement prevus', id: 'date' };
const imagesForm = { component: ImagesForm, requiredFields: [], pageTitle: 'Envoyer ou recevoir des objets', id: 'image' };
const budgetMovingFormula = { component: BudgetMovingFormula, requiredFields: [], pageTitle: 'Choisissez votre formule de demenagement', id: 'budgetFormula' };
const moreDetailsForm = { component: MoreDetailsForm, requiredFields: [], pageTitle: 'Informations complémentaires', id: 'details' };
const movingCompanyForm = { component: MovingCompanies, requiredFields: [], pageTitle: 'Liste de déménageurs', id: 'movingFormula' };
const volumePreferenceForm = { component: VolumePreferenceForm, requiredFields: [], pageTitle: 'Demenagement', id: 'volumePreference' };
const volumeForm = { component: VolumeForm, requiredFields: [], pageTitle: "Demenagement", id: 'volume' };
const quantityNameForm = { component: QuantityNameForm, requiredFields: [], pageTitle: "Demenagement", id: 'quantityName' };

// the bellow form list is the right one if the user is using the moving's transport feature without being redirected from somewhere else
const standardFormList = shallowRef<IFormItem[]>([ 
    volumePreferenceForm, 
    addressForm, 
    movingCompanyForm,
    dateForm, 
    imagesForm, 
    budgetMovingFormula, 
    moreDetailsForm 
]);

// the bellow form list is the right one if the user was redirected to moving's transport feature from property details page
const immoFormList = shallowRef<IFormItem[]>([
    dateForm,
    addressForm,
    movingCompanyForm,
    volumePreferenceForm,
    imagesForm,
    budgetMovingFormula,
    moreDetailsForm,
]);

const allForm = shallowRef<IFormItem[]>();
const storedData = computed(() => store.getters["TransportModule/getAnnouncementData"]);

onMounted(() => {
    setAnnouncementType();
    checkAnnouncementUser();
    checkPreviousPath();
    setFormList();
});

function setAnnouncementType() {
    if (!storedData.value.type) store.dispatch('TransportModule/setAnnouncementData', { type: 'Demenagement' });
}

function checkAnnouncementUser() {
    if (!storedData.value.user) {
        const userDetails = store.getters["UserModule/getUserDetails"];
        store.dispatch('TransportModule/setAnnouncementData', { 
            user: userDetails.id, 
            userName: userDetails.name, 
            userFirstName: userDetails.firstname 
        })
    }
}

function checkPreviousPath() {
    let backPath = String(router.options.history.state.back);
    let path = backPath?.split("/");
    path.includes('nouvelle-annonce')
        ? store.commit('TransportModule/UPDATE_REDIRECTION_STATE', false)
        : store.commit('TransportModule/UPDATE_REDIRECTION_STATE', true);
}

function setFormList() {
    const isRedirectedFromImmo = store.getters['TransportModule/getRedirectionState'];
    isRedirectedFromImmo 
        ? allForm.value = immoFormList.value 
        : allForm.value = standardFormList.value;
}

function updateFormList() {
    const isRedirectedFromImmo = store.getters['TransportModule/getRedirectionState'];
    const isVolumeKnown = storedData.value.isVolumeKnown;
    if (isVolumeKnown !== undefined) {
        // the bellow code is going to insert the missing form (volumeForm or quantityNameForm) in the right form list at the right index according to the choosen volume preference 
        if (isRedirectedFromImmo) {
            isVolumeKnown
                ? allForm.value = [ ...immoFormList.value.slice(0, 4), volumeForm, ...immoFormList.value.slice(4) ]
                : allForm.value = [ ...immoFormList.value.slice(0, 4), quantityNameForm, ...immoFormList.value.slice(4) ];
        } else {
            isVolumeKnown
                ? allForm.value = [ ...standardFormList.value.slice(0, 1), volumeForm, ...standardFormList.value.slice(1) ]
                : allForm.value = [ ...standardFormList.value.slice(0, 1), quantityNameForm, ...standardFormList.value.slice(1)];
        }
    } else {
        setFormList();
    }
}
</script>
<style lang="scss" scoped>
.moving-shortcuts {
    &__main-content {
        @apply flex flex-col gap-2.5 container py-2.5;

        @screen md {
            @apply flex flex-row;
        }
    }
}
</style>