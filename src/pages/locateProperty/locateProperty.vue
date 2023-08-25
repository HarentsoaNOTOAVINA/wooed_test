<template>
    <div class="locate-property">
        <Map
            :property-coord="latlng"
            :is-replace-marker="false"
            :is-display-public-cadaster="true"
            :polygon-cluster="cadastre"
        />
    </div>
</template>
<script lang="ts" setup>
    import Map from '@/pages/addProduct/components/ParticularChoice/Map.vue';
    import { onBeforeMount, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const store = useStore();
    const route = useRoute();
    onBeforeMount(() => {
        getCoords();
        getCadaster();
    });

    const latlng = ref<{ lat: number; lng: number }>();
    const cadastre = ref<any>([]);

    function getCadaster() {
        const promise = store.dispatch(
            'AddProductModule/getCadasrteByCoord',
            latlng.value
        );
        promise.then((res) => {
            console.log(res);
            cadastre.value = res;
        });
    }
    function getCoords() {
        const { coords } = route.params;
        const [lat, lng] = (coords as string).replaceAll(',', '.').split('@');
        latlng.value = { lat: +lat, lng: +lng };
    }
</script>
<style lang="scss" scoped>
    .locate-property {
        &:deep() {
            #map,
            #sv {
                @apply h-[calc(100vh-62px)] z-[1];
            }
        }
    }
</style>
