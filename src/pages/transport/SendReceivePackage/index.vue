<template>
  <div class="transport-main__container">
    <SideMenu
      :active-data="{}"
      @set-active-display-data="{}"
    />
    <CocolisCard
      :page-title="'Que souhaitez-vous envoyer ou recevoir ?'"
      @back-to="backTo"
    >
      <div v-for="(item, index) in SendReceivePackagesShortcut" :key="index">
        <Shortcut :data="item" @click="redirectTo" />
      </div>
    </CocolisCard>
  </div>
</template>
<script lang="ts" setup>
import CocolisCard from "@/pages/transport/components/CocolisCard.vue";
// import SideMenu from "@/pages/cocolis/components/SideMenu.vue";
import SideMenu from '@/pages/transport/components/TransportSideMenu/SideMenu.vue';
import Shortcut from "@/pages/transport/components/Shortcut.vue";

import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

interface IShortcutItem {
    label: string,
    iconName: string,
    routeName: string,
    pageTitle: string,
    type: string,
}

const SendReceivePackagesShortcut = ref<Array<IShortcutItem>>([
    {
        label: 'Tous types d’objets',
        iconName: 'Suitcase',
        routeName: 'transport-all-object-announcement',
        pageTitle: 'Envoyer ou recevoir des objets',
        type: 'Objet'
    },
    {
        label: 'Déménagement',
        iconName: 'Chariot',
        routeName: 'transport-moving-announcement',
        pageTitle: 'Déménagement',
        type: 'Demenagement'
    },
    {
        label: 'Véhicules',
        iconName: 'Bicycle',
        routeName: 'transport-vehicle-announcement',
        pageTitle: 'Véhicules',
        type: "Vehicule"
    }
  ])

function redirectTo(value: any) {
  SendReceivePackagesShortcut.value.forEach((element: any) => {
    if (element.routeName === value) {
      store.dispatch('TransportModule/setAnnouncementData', { type: element.type });
    }
  })  
  router.push({ name: value });
}

function backTo() {
  router.push({ name: "transport" });
}
</script>
<style lang="scss" scoped>
.transport-main {
  &__container {
    @apply py-2.5 container flex flex-col gap-[10px];

    @screen md {
      @apply flex flex-row;
    }
  }
}
</style>
