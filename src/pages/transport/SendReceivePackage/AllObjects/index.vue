<template>
  <div class="send-receive-form__main-content">
    <SideMenu />
    <ColisCard v-if="allForm" :form-list="allForm" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, shallowRef, defineAsyncComponent} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import SideMenu from '@/pages/transport/components/TransportSideMenu/SideMenu.vue';

import ColisCard from '@/pages/transport/components/ColisCard.vue';

const QuantityNameForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/QuantityNameForm.vue"));
const AddressForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/AddressForm.vue"));
const DateForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/DateForm.vue"));
const ImagesForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/ImagesForm.vue"));
const MoreInformationForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/MoreDetailsForm.vue"));
const BudgetForm = defineAsyncComponent(() => import("@/pages/transport/components/Form/BudgetForm.vue"));

const store = useStore();
const router = useRouter();

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
    component: MoreInformationForm, 
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
});

function setAnnouncementType() {
  store.dispatch('TransportModule/setAnnouncementData', { type: 'Objet' });
}
</script>
<style lang="scss" scoped>
.send-receive-form {
  &__main-content {
    @apply flex flex-col  gap-2.5 container py-2.5;
    @screen md {
      @apply flex flex-row;
    }
  }
}
</style>
