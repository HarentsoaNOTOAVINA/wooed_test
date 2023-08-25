<template>
    <div class="work-maintains__container">
        <SideMenu
            @on-back-to-menu="onBackToMenu"
            class="work-maintains__side-menu"
            @active-comp="changeComponent"
            :MenuSideBar="dataMenuMaintains"
        />
        <component :is="activeComponent" :property-id="propertyId" />
        <Loader v-if="loading" />
    </div>
</template>
<script lang="ts" setup>
    import { dataMenuMaintains } from '../data/dataMenuMaintains';
    import SideMenu from '@/components/Display/MenuSideBar/MenuSideBar.vue';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import ElevatorMenu from './Elevator/ElevatorMenu.vue';
    import { Store, useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const store: Store<any> = useStore();
    const propertyId = ref<any>();
    const route = useRoute();
    const activeComponent = ref<any>(ElevatorMenu);
    const listMenuMaintains = ref<any>([]);
    const loading = ref<boolean>(false);

    onMounted(() => {
        propertyId.value = route.params.id;
        getMenuMaintains();
    });

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }

    function onBackToMenu() {
        activeComponent.value = null;
    }

    async function getMenuMaintains() {
        try {
            loading.value = true;
            listMenuMaintains.value = await store.dispatch(
                'WorksModule/setMaintainsMenu'
            );

            console.log(listMenuMaintains.value, 'Data companaty');
        } catch (error) {
            console.log(error, 'Erreur list Expert');
        } finally {
            loading.value = false;
        }
    }
</script>
<style scoped lang="scss">
    .work-maintains__container {
        @apply mt-[18px] container flex flex-col md:flex-row gap-[10px];
        @screen md {
            @apply flex;
        }
    }
    .work-maintains__side-menu {
        @apply mb-[18px];

        @screen md {
            min-height: calc(100vh - 100px);
        }
    }
</style>
