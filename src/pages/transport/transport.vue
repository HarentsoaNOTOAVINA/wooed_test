<template>
    <div class="transport__container">
        <SideMenu class="transport__sidemenu">
            <Button class="transport__add-colis" @click="router.push({ name: 'transport-create-announcement'})">
                <span>+</span>
                <span>Créer une annonce</span>
            </Button>
        </SideMenu>
        <component 
            :is="activeComponent" 
            @set-active-component="setActiveComponent"
            class="transport__section" 
        />
    </div>
</template>
<script lang="ts" setup>
import SideMenu from '@/pages/transport/components/TransportSideMenu/SideMenu.vue';
import Button from '@/components/Common/Button/Button.vue';

import { ref, onMounted, computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore();
const router = useRouter();


const activeComponent = shallowRef(computed(() => store.getters["TransportModule/getActiveComponent"]));

onMounted(async () => await fetchMyDashboardData())

function setActiveComponent(item: any) {    
    store.dispatch("TransportModule/setActiveComponent", item.component);
}

async function fetchMyDashboardData() {
    const userDetails = store.getters["UserModule/getUserDetails"];
    const announcementPayload = { userId: userDetails.id, announcementStatus: "en cours de livraison" };
    const propositionPayload = { userId: userDetails.id, propositionStatus: "en cours de livraison" };
    const routePayload = { userId: userDetails.id, routeStatus: "en ligne" };
    await store.dispatch("TransportModule/fetchPendingValidAnnouncements", announcementPayload);
    await store.dispatch("TransportModule/fetchPendingPropositions", propositionPayload);
    await store.dispatch("TransportModule/fetchRouteList", routePayload);
}
</script>
<style scoped lang="scss">
.transport {
    &__container {
        @apply flex flex-col my-[18px] px-[15px] gap-y-[14px];

        @screen md {
            @apply flex-row gap-x-[18px] mb-0;
        }

        @screen lg {
            @apply gap-x-[20px] container;
        }

        @screen xl {
            @apply gap-x-[24px];
        }
    }

    &__sidemenu {
        @screen md {
            @apply mb-[14px];
            min-height: calc(100vh - 94px);
        }
    }

    &__section {
        @apply px-0 mt-0 w-full max-w-none;

        @screen md {
            max-width: calc(100% - 339px);
        }
    }

    &__add-colis {
        &:deep() {
            button {
                @apply w-full flex justify-center items-center gap-x-[10px];
            }
        }
    }
}
</style>
