<template>
    <div class="work-emergency__container">
        <SideMenu
            @on-back-to-menu="onBackToMenu"
            class="work-emergency__side-menu"
            @active-comp="changeComponent"
            :MenuSideBar="dataMenuEmergency"
        />
        <component :is="activeComponent" :property-id="propertyId" />
    </div>
</template>
<script lang="ts" setup>
    import { dataMenuEmergency } from '../data/dataMenuEmergency';
    import SideMenu from '@/components/Display/MenuSideBar/MenuSideBar.vue';
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import Electricien from './ElectricienNearby.vue';

    const propertyId = ref<any>();
    const route = useRoute();
    const activeComponent = ref<any>(Electricien);

    onMounted(() => {
        propertyId.value = route.params.id;
    });

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }

    function onBackToMenu() {
        activeComponent.value = null;
    }
</script>
<style scoped lang="scss">
    .work-emergency__container {
        @apply mt-[18px] container flex flex-col md:flex-row gap-[10px];
        @screen md {
            @apply flex;
        }
    }
    .work-emergency__side-menu {
        @apply mb-[18px];

        @screen md {
            min-height: calc(100vh - 100px);
        }
    }
</style>
