<template>
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
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import useMap from '@/composables/useMap';
    import { onBeforeMount, ref, watchEffect, watch } from 'vue';

    const isStreetViewPanorama = ref<boolean>(false);
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
        displayStreetViewPanorama
    } = useMap(mapParameter);

    const props = defineProps<{
        isDisplayPublicCadaster?: boolean;
        propertyCoord?: { lat: number; lng: number };
        polygonCluster?: any[];
        isReplaceMarker?: boolean;
        isDisplayToogleStreetView?: boolean;
        isDisplayGoogleEarth?: boolean;
    }>();

    const emit = defineEmits<{
        (fn: 'on-return-event-map-click', v: any): void;
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
            if (props.isReplaceMarker) {
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

    function redirectToGoogleEarth() {
        const {lat, lng} = mapParameter.value.centerCoord as any;
        window.open(`https://earth.google.com/web/search/${lat},${lng}`, "_blank")
    }
</script>
<style lang="scss" scoped>
    #map,
    #sv {
        @apply h-[400px] z-[1];
    }
    .map__container {
        @apply relative;
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
        @apply overflow-hidden w-[122px] h-[32px] absolute top-[55px] right-[8px] z-[2];
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
    .ge__btn {
        @apply overflow-hidden absolute top-[92px] right-[8px] z-[2];
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
</style>
