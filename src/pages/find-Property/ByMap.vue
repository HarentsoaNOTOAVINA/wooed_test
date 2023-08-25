<template>
    <div class="w-screen flex flex-wrap">
        <div class="container-wrapper">
            <Loader v-if="loadingResult" />
            <Map
                v-else
                class="map-container"
                :needPriceMarker="true"
                :markerCustomCoordinates="propertyList"
                :needPolygonLayer="true"
                :needDrawControl="true"
                :polygonCoordinates="data.polygon"
                @touched="handleMarkerTouched"
                @onPolygonCreated="onDrawedZone"
                :controlConfig="controlConfig"
                :handleSingleLayer="true"
            />
            <div class="map-actions">
                <Button
                    theme="light"
                    type="primary"
                    class="map-actions-btn"
                    @onClick="handleResetBtn"
                >
                    <template #default> Réinitialiser </template>
                </Button>
                <Button
                    class="map-actions-btn"
                    type="primary"
                    @onClick="handleSearchBtn"
                >
                    <template #default> Rechercher </template>
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Map from '@/components/section/map/index.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { reactive, onMounted, ref, watch, computed, onUpdated } from 'vue';
    import {
        directionService,
        directionCoordinatesParser,
    } from '@/composables/google-maps-api';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    let formattedPayload: [] = [];

    const controlConfig = ref<{}>({
        marker: false,
        polyline: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
    });
    const router = useRouter();
    const $store = useStore();

    const data = reactive({
        selectedZone: [],

        isMapReady: false,
        polygon: [
            [
                { lat: 50.84665167605899, lng: 4.350414276123048 },
                { lat: 50.84440259845273, lng: 4.349427223205567 },
                { lat: 50.84429420643197, lng: 4.354748725891114 },
                { lat: 50.84684135234525, lng: 4.3580961227417 },
            ],
        ],
        route: [],
        PlaceCoordinates: [
            { lat: 50.84535101789271, lng: 4.352409839630127, prices: 100 },
            { lat: 50.84548921460665, lng: 4.351868033081701, prices: 100 },
        ],
    });

    const loadingResult = ref<boolean>(false);

    const propertyList = computed((): [] => {
        const coordinate: [] = [];
        const result = $store.getters['FindPropertyModule/getPropertyLists'];
        if (Array.isArray(result) && result.length > 0) {
            result.forEach(
                ({
                    id,
                    latitude,
                    longitude,
                    prices,
                }: {
                    id: number;
                    latitude: number;
                    longitude: number;
                    prices: Number;
                }) => {
                    coordinate.push({
                        lat: latitude,
                        lng: longitude,
                        id,
                        prices,
                    } as never);
                }
            );
        }
        console.log('dbg coordinates', coordinate);
        loadingResult.value = false;
        return coordinate;
    });

    const handleMarkerTouched = (data: any) => {
        console.log(data.id);
        router.push('/detail/' + data.id);
    };
    //reactive states
    const text = reactive({
        title: 'recherche de bien',
    });

    //lifecycle
    onMounted(() => {
        // const lines  = directionService({"lat":50.84535101789271,"lng":4.352409839630127},{"lat":50.84548921460665,"lng":4.351868033081701} )
        // (lines as any).then((re : any) =>{
        //     data.route = directionCoordinatesParser(re);
        // })
    });
    const onDrawedZone = (layer: {}) => {
        data.selectedZone = (layer as any).latlng;
        data.selectedZone.forEach((item) => {
            formattedPayload.push(JSON.stringify(item) as never);
        });
        console.log('coordinates:', formattedPayload);
    };

    const handleBtn = (e: any) => {
        console.log('button triggered', e);
        loadingResult.value = true;
    };
    const handleSearchBtn = (e: any) => {
        loadingResult.value = true;
        $store.dispatch('FindPropertyModule/findPropertiesByCity', {
            coordinates: formattedPayload,
        });

        formattedPayload = [];
    };

    const handleResetBtn = (e: any) => {
        loadingResult.value = true;
        $store.commit('FindPropertyModule/resetPropertyList', {
            coordinates: formattedPayload,
        });
    };
    watch(
        () => $store.getters['FindPropertyModule/getPropertyLists'],
        (newVal) => {
            console.log('we have new place', newVal);
            loadingResult.value = false;
        },
        { immediate: true }
    );
</script>
<style lang="scss" scoped>
    .container-wrapper {
        @apply w-screen relative;
        height: 90vh;
    }
    .map {
        &-container {
            @apply w-full h-[95vh] fixed;
            z-index: 9;
        }
        &-actions {
            position: absolute;
            bottom: 0px;
            width: 100vw;
            flex-direction: column;
            z-index: 10;
            display: flex;
            align-items: center;
            @apply justify-center;
            &-btn {
                width: calc(100% - 20px);
                @apply my-1;
                @screen sm {
                    @apply w-fit;
                }
                &:deep() {
                    button {
                        @apply w-full;
                    }
                }
            }
            &-reset {
                @apply w-1/2 my-1;
            }
            &-search {
                @apply w-1/2 my-1;
            }
        }
    }
    @screen sm {
        .map {
            &-actions {
                align-items: flex-end;
                @apply px-[50px];
            }
        }
    }
</style>
