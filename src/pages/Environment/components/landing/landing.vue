<script lang='ts' setup>
    import { ref, reactive, onMounted, onBeforeMount, defineAsyncComponent } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import SideMenu from '../sideMenu/SideMenu.vue';
    import environmentalStatus from '../environmentalStatus/environmentalStatus.vue';
    import { useStore } from 'vuex';
    
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const activeComponent = ref<any>(environmentalStatus);

    const id = route.params.id as string;

function handleActiveComponent($event: any) {
    router.push(`/environnement/${route.params.id}${$event.path}`)
}

const feature = route.params.feature;
async function routeManager() {
    switch (feature) {
        case 'statut-environnemental':
            activeComponent.value =environmentalStatus;
            break;
        case "inondation":
            activeComponent.value =  defineAsyncComponent(()=>import('../inondation/inondation.vue'));
            break;
            case "procedure":
            activeComponent.value = defineAsyncComponent( () => import('../tank/process.vue'));
            break;
        case 'registre':
            activeComponent.value = defineAsyncComponent( () => import('../register/Register.vue'));
            break;
        case 'citerne':
            activeComponent.value = defineAsyncComponent( () => import('../tank/tank.vue'));
            break;
        case "declaration-citerne":
            activeComponent.value = defineAsyncComponent( () => import('../tank/declaration.vue'));
            break;
        case 'obligations':
            activeComponent.value = defineAsyncComponent( () => import('../obligation/Obligation.vue'));
            break;
        case 'attribution':
            activeComponent.value = defineAsyncComponent( () => import('../award/Award.vue'));
            break;
        case 'station-d-epuration':
            activeComponent.value = defineAsyncComponent( () => import("@/pages/Environment/components/waterTreatment/waterTreatment.vue"));
            break;
        case 'jardin-collectif':
            activeComponent.value = defineAsyncComponent( () => import('../collectiveGarden/CollectiveGarden.vue'));
            break;
        case 'nouveau-jardin':
            activeComponent.value = defineAsyncComponent( () => import('../createNewGarden/CreateNewGarden.vue'));
            break;
        case 'liste-jardin-existant':
            activeComponent.value =  defineAsyncComponent( () => import('../joinGardenExisting/JoinGardenExistingMenu.vue'));
            break;
        default:
            activeComponent.value = environmentalStatus;
        break;
    }
}
    onBeforeMount(() => {
        if(!route.params.id){
            router.push("/environnement");
        }
        store.dispatch("PropertyDetailModule/setPropertyData",id);
        store.dispatch('EnvironmentModule/setRegion')
        routeManager();
    });
</script>
<template>
    <MainContainer class="environment__container">
        <SideMenu @active-comp="handleActiveComponent" class="environment__sidemenu" />
        <component :is="activeComponent" class="environment__section" />
    </MainContainer>
</template>
<style lang="scss" scoped>
.environment {
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
        @apply px-2 mt-0 w-full max-w-none;

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
