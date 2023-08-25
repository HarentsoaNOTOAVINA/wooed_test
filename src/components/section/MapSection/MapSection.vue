<template>
    <div class="map">
        <div v-if="isAutoComplete">
            <slot name="before" />
            <Input
                id="address"
                :disabled="locationParams && locationParams.country ? false : true"
                label="Adresse"
                name-input="address"
                placeholder="Adresse"
                :vmodel="locationParams && locationParams.address"
                :required="true"
                @input="inputHandler"
                :loading="isLoading"
                :default-value="locationParams && locationParams.address"
            />
            <slot name="after" />
        </div>
        <div class="map__container">
            <div v-show="!isStreetViewPanorama" id="map"></div>
            <div v-show="isStreetViewPanorama" id="sv"></div>
            <Button
                class="sv__btn"
                @click="isStreetViewPanorama = !isStreetViewPanorama"
                type-button="border"
            >
                <transition name="fade-map" mode="out-in">
                    <span v-if="!isStreetViewPanorama">Google Map</span
                    ><ArrowBack v-else /></transition
            ></Button>
            <Button
                v-if="propertyCoord"
                class="ge__btn"
                @click="redirectToGoogleEarth"
                type-button="border"
            >
                Google Earth
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import useMap from '../../../composables/useMap';
    import { onBeforeMount, ref, watchEffect, watch } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';

    const { autocompleteResult, isLoading } = useAutoComptetion('address');

    watch(
        () => isLoading.value,
        (v) => {
            console.log(v, "looooaaaad");
        },
        {immediate: true, deep: true }
    );

    const isStreetViewPanorama = ref<boolean>(false);
    const drawStart = ref<boolean>(false);
    let polygon = ref<any>(null);

    const mapParameter = ref<any>({
        zoom: 18,
        centerCoord: { lat: 50.84535101789271, lng: 4.352409839630127 },
        mapId: '',
        svId: '',
    });
    const {
        appendPublicCadaster,
        map,
        appendMarker,
        appendPolygonCluster,
        evtClickMap,
        displayStreetView,
        displayStreetViewPanorama,
        drawPolygon,
        handleDrawPolygon,
        coordZoning,
    } = useMap(mapParameter);

    const props = defineProps<{
        isDisplayPublicCadaster?: boolean;
        propertyCoord?: { lat: number; lng: number };
        polygonCluster?: any[];
        isReplaceMarker?: boolean;
        drawPolygon?: boolean;
        isDisplayToogleStreetView?: boolean;
        isDisplayGoogleEarth?: boolean;
        allCoords?: Array<any>;
        // element utile pour isAutoComplete = true
        isAutoComplete?: boolean;
        locationParams?: ILocationParams;
        autoComplete?: any;
    }>();

    const emit = defineEmits<{
        (fn: 'on-return-event-map-click', v: any): void;
        (fn: 'on-event-auto-complete', v: any): void;
        (fn: 'onPolygonCreate', v: any): void;
        (fn: 'input-handler', v: any): void;
    }>();

    onBeforeMount(() => {
        mapParameter.value.mapId = 'map';
        mapParameter.value.svId = 'sv';
        // displayStreetView();
        displayStreetViewPanorama();
    });

    watch(
        () => props.polygonCluster,
        (v) => {
            appendPolygonCluster(v, 'red', true);
        }
    );
    watch(
        () => props.propertyCoord,
        (v) => {
            mapParameter.value.centerCoord = v;
            appendMarker();
        },
        { deep: true }
    );

    watch(
        () => evtClickMap.value,
        (v) => {
            if (props.isReplaceMarker && !drawStart.value) {
                const { latlng } = v;
                mapParameter.value.centerCoord = latlng;
                appendMarker(true);
                emit('on-return-event-map-click', latlng);
            }
        }
    );

    watch(
        () => isStreetViewPanorama.value,
        (v) => {
            if (v) {
                displayStreetViewPanorama();
            }
        }
    );

    watch(
        () => coordZoning.value,
        (e) => {
            emit('onPolygonCreate', e.polygon);
        },
        { immediate: true }
    );

    watch(
        () => autocompleteResult.value,
        (v) => {
            if (props.isReplaceMarker && !drawStart.value) {
                const latlng = { lat: v.lat, lng: v.lng };
                mapParameter.value.centerCoord = latlng;
                appendMarker(true);
                emit('on-event-auto-complete', latlng);
            }
        },
        { deep: true }
    );

    const inputHandler = (obj: { address: string } | object) => {
        emit('input-handler', obj);
        appendMarker(true);
    };

    const _stopWatchOwnerCadaster = watchEffect(() => {
        if (props.polygonCluster && map.value) {
            appendPolygonCluster(props.polygonCluster, 'red');
            _stopWatchOwnerCadaster();
        }
    });

    const _stopWatchPublicCadaster = watchEffect(() => {
        if (props.isDisplayPublicCadaster && map.value) {
            appendPublicCadaster();
            _stopWatchPublicCadaster();
        }
    });
    const _stopWatchPropCoord = watchEffect(() => {
        if (props.propertyCoord && map.value) {
            mapParameter.value.centerCoord = props.propertyCoord;
            appendMarker();
            _stopWatchPropCoord();
        }
    });

    const _assignAllCoordsData = watchEffect(() => {
        if (props.allCoords && map.value) {
            console.log('miova lesy allCord aa >>', props.allCoords);

            // Filtrer le tableau de propertyData pour que ça ne reste que le lat et lng
            const coordinates = props.allCoords.map((item) => {
                return {
                    lat: item.latitude,
                    lng: item.longitude,
                };
            });

            console.log(coordinates, 'AllCoords data');

            coordinates.forEach((item, index) => {
                mapParameter.value.centerCoord = item;
                appendMarker();
                _assignAllCoordsData();
            });
        }
    });

    const _drawPolygon = watchEffect(() => {
        if (props.drawPolygon && map.value) {
            map.value.on('draw:drawstart', () => {
                drawStart.value = true;
            });
            handleDrawPolygon();
            drawPolygon();
            _drawPolygon();
        }
    });

    const handleDrawPolygon__ = function () {
        if (map.value) {
            let last_layer: any = null;
            map.value.on('draw:created', (e) => {
                last_layer = e.layer;
                polygon.value = last_layer._latlngs[0];
                console.log('ainga amzay ary hoe vita', polygon.value);
            });
        }
    };

    function redirectToGoogleEarth() {
        const { lat, lng } = mapParameter.value.centerCoord as any;
        window.open(
            `https://earth.google.com/web/search/${lat},${lng}`,
            '_blank'
        );
    }
</script>
<style lang="scss" scoped>
    #map,
    #sv {
        @apply h-[400px] z-[1];
    }
    .map{
        @apply flex flex-col gap-[24px];
    }
    .map__container {
        @apply relative border border-primary rounded-sm;
        &--loading {
            min-height: 400px;
            @apply relative;
        }
        .fade-map-enter-active,
        .fade-map-leave-active {
            @apply transition-all;
        }
        .fade-map-enter-from,
        .fade-map-leave-to {
            @apply opacity-0 translate-x-[50px];
        }
    }
    .sv__btn {
        @apply overflow-hidden min-w-[126px] h-[32px] absolute top-[55px] right-[8px] z-[2];
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
    .ge__btn {
        @apply min-w-[126px] overflow-hidden absolute top-[92px] right-[8px] z-[2];
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
    // .__map {
    //     @apply border border-primary rounded-sm;
    //     &--loading {
    //         min-height: 400px;
    //         @apply relative;
    //     }
    // }
</style>
