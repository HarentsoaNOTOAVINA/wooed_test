<template>
    <MainContainer class="parcelsAttribution__container">
        <SideMenu class="parcelsAttribution__sidemenu" @active-comp="handleActiveComponent" />
        <component :is="activeComponent" />
    </MainContainer>
</template>
<script lang="ts" setup>
import { shallowRef, onBeforeMount, defineAsyncComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";

import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
import SideMenu from '@/pages/Environment/components/sideMenu/SideMenu.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const Award = defineAsyncComponent(() => import('@/pages/Environment/components/award/Award.vue'));
const Register = defineAsyncComponent(() => import('@/pages/Environment/components/register/Register.vue'));
const Obligation = defineAsyncComponent(() => import('@/pages/Environment/components/obligation/Obligation.vue'));
const Tank = defineAsyncComponent(() => import('@/pages/Environment/components/tank/tank.vue'));
const Declaration = defineAsyncComponent(() => import('@/pages/Environment/components/tank/declaration.vue'));
const CollectiveGarden = defineAsyncComponent(() => import('@/pages/Environment/components/collectiveGarden/CollectiveGarden.vue'));
const WaterTreatment = defineAsyncComponent(() => import('@/pages/Environment/components/waterTreatment/waterTreatment.vue'));
const EnvironmentalStatus = defineAsyncComponent(() => import('@/pages/Environment/components/environmentalStatus/environmentalStatus.vue'));
const Inondation = defineAsyncComponent(() => import('@/pages/Environment/components/inondation/inondation.vue'));
const Process = defineAsyncComponent(() => import('@/pages/Environment/components/tank/process.vue'));

const activeComponent = shallowRef<any>(Award);

const feature = route.params.feature;
const currentProperty = route.params.id;

onBeforeMount(() => {
    if (!currentProperty) router.push("/environnement");
    routeManager();
});

onMounted(async () => await fetchParcelsDocList());

function handleActiveComponent($event: any) {
    router.push(`/environnement/${currentProperty}${$event.path}`)
}

function routeManager() {
    switch (feature) {
        case 'statut-environnemental':
            activeComponent.value = EnvironmentalStatus;
            break;
        case "inondation":
            activeComponent.value = Inondation;
            break;
        case "procedure":
            activeComponent.value = Process
            break;
        case 'registre':
            activeComponent.value = Register;
            break;
        case 'citerne':
            activeComponent.value = Tank;
            break;
        case "declaration-citerne":
            activeComponent.value = Declaration;
            break;
        case 'obligations':
            activeComponent.value = Obligation;
            break
        case 'station-d-epuration':
            activeComponent.value = WaterTreatment;
            break;
        case 'jardin-collectif':
            activeComponent.value = CollectiveGarden;
            break;
        case 'attribution':
            activeComponent.value = Award;
            break;
        default:
            activeComponent.value = EnvironmentalStatus;
            break;
    }
}

async function fetchParcelsDocList() {
    await store.dispatch("CollectiveGardenModule/fetchParcelsAttribution", {theProperty: currentProperty})
}
</script>
<style scoped lang="scss">
.parcelsAttribution {
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
}
</style>