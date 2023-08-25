<template>
    <div class="vehicle__main-content">
        <SideMenu />
        <ColisCard v-if="allForm" :form-list="allForm" />
    </div>
</template>
<script lang="ts" setup>
import { shallowRef, onMounted, defineAsyncComponent } from 'vue';
import { useStore } from "vuex";

import ColisCard from '@/pages/transport/components/ColisCard.vue';
import SideMenu from '@/pages/transport/components/TransportSideMenu/SideMenu.vue';

const ImagesForm = defineAsyncComponent(() => import('@/pages/transport/components/Form/ImagesForm.vue'));
const MoreDetailsForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/MoreDetailsForm.vue"));
const AddressForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/AddressForm.vue"));
const QuantityNameForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/QuantityNameForm.vue"));
const DateForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/DateForm.vue"));
const BudgetForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/BudgetForm.vue"))

const store = useStore();

interface IFormItem {
    component: object,
    requiredFields: string[],
    pageTitle: string,
    id?: string
}

const allForm = shallowRef<IFormItem[]>([
  { 
    component: QuantityNameForm, 
    requiredFields: [],
    pageTitle: "Envoyer ou recevoir des objets" 
  },
  { 
    component: AddressForm, 
    requiredFields: [],
    pageTitle: "Adresses" 
  },
  { 
    component: DateForm, 
    requiredFields: [],
    pageTitle: "Dates de livraison prevus" 
  },
  { 
    component: ImagesForm, 
    requiredFields: [],
    pageTitle: "Envoyer ou recevoir des objets" 
  },
  { 
    component: MoreDetailsForm, 
    requiredFields: [],
    pageTitle: "Informations complémentaires" 
  },
  { 
    component: BudgetForm, 
    requiredFields: [],
    pageTitle: "Quel est votre budget ?" 
  }
]);

onMounted(() => {
    setAnnouncementType();
    checkAnnouncementUser();
});

function setAnnouncementType() {
    store.dispatch('TransportModule/setAnnouncementData', { type: 'Vehicule' });
}

function checkAnnouncementUser() {
    const storedData = store.getters["TransportModule/getAnnouncementData"];
    if (!storedData.user) {
        const userDetails = store.getters["UserModule/getUserDetails"];
        store.dispatch('TransportModule/setAnnouncementData', { user: userDetails.id, userName: userDetails.name, userFirstName: userDetails.firstname })
    }
}
</script>
<style lang="scss" scoped>
.vehicle {
    &__main-content {
        @apply flex flex-col gap-2.5 container py-2.5;

        @screen md {
            @apply flex flex-row;
        }
    }
}
</style>