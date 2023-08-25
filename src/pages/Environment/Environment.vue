<script lang="ts" setup>
    import { shallowRef, onBeforeMount, defineAsyncComponent } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store = useStore();
    const route = useRoute();

    const MyPropertyList = defineAsyncComponent(() => import('@/components/Display/ListMyProperty/index.vue'));
    const Landing = defineAsyncComponent(() => import('@/pages/Environment/components/landing/landing.vue'));
    const JoinGardenExisting = defineAsyncComponent(() => import('@/pages/Environment/components/joinGardenExisting/JoinGardenExisting.vue'));
    const MyCollectiveGarden = defineAsyncComponent(() => import('@/pages/Environment/components/myCollectiveGarden/MyCollectiveGarden.vue'));
    const ParcelsAttribution = defineAsyncComponent(() => import('@/pages/Environment/components/award/ParcelsAttribution.vue'))
    const currentComponent = shallowRef<any>(MyPropertyList);
    const id = route.params.id as string;
    const feature = route.params.feature as string;

    function routeManager() {
        const path = route.fullPath.split('/').pop();

        switch (path?.toLowerCase()) {
            case 'environnement':
                currentComponent.value = MyPropertyList;
                break;
            case id:
                currentComponent.value = Landing;
                break;
            case 'mes-jardins-collectifs':
                currentComponent.value = MyCollectiveGarden;
                break;
            case 'joindre-jardin-existant':
                currentComponent.value = JoinGardenExisting;
                break;
            case 'attribution':
                currentComponent.value = ParcelsAttribution;
                break;
            // case 'registre':
            //     currentComponent.value = Register;

            //     break;
            default:
                currentComponent.value = Landing;
                break;
        }
        // if(parseInt(path as never ) === parseInt(id)){
        // }
    }
    onBeforeMount(() => {
        console.log('route', route);
        routeManager();
    });
</script>
<template>
    <component 
        :is="currentComponent" route-name="environment-detail"
    />
</template>
<style lang="scss" scoped></style>
