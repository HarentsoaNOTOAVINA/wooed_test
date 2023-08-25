<template>

    <!-- <Map 
        :key="mapKey"
        :need-marker-event-handler="true"
        :handle-single-layer="true"
        :need-marker-layer="true"
        :markers-coordinates="marker"
        :need-draw-control="true"
        :need-polygon-layer="true"
        :control-config="{rectangle : false, circlemarker : false, marker : false,polyline : false,circle : false}"
        @on-polygon-created="handleCreatedPolygon"
        @touched="handleMapClicked"
    /> -->

    <Map 
        :key="mapKey"
        :handle-single-layer="true"
        :need-marker-layer="true"
        :markers-coordinates="marker"
        :need-draw-control="true"
        :need-polygon-layer="true"
        :polygon-coordinates="props.cadastreData"
        :control-config="{rectangle : false, circlemarker : false, marker : false,polyline : false,circle : false}"
        @on-polygon-created="handleCreatedPolygon"
        @touched="handleMapClicked"
    />

</template>
<script lang="ts" setup>
    import { onMounted, ref, watch } from 'vue';
    // import Map from '@/composables/map';
    import 'leaflet/dist/leaflet.css';
    import {
        LatLngTuple,
        LatLngLiteral,
        LeafletMouseEvent,
        LatLng,
        LatLngExpression,
    } from 'leaflet';
    import Map from "@/components/section/map/index.vue";

    const props = defineProps<{
        defaultLatLng:any;
        currentLatLng: any;
        cadastreData:any;
    }>();


    const marker = ref<any>(props.defaultLatLng);
    const refreshMap = ref<boolean>(false); 
    const mapKey= ref<number>(0)
        const mapKey2= ref<number>(0)
    
    onMounted(() => {
        console.log("props lalt", props.defaultLatLng);
        marker.value = [props.defaultLatLng];
    });
    const handleCreatedPolygon = (e : Event) =>{
        emit("polygon-created", e)
    }
    const emit = defineEmits<{
        (e: 'on-click-map', v: any): void;
        (e : 'polygon-created', v : any) : void;

    }>();

    const handleMapClicked  = (e : Event) => {
        console.log("eventttttt", e);
        emit('on-click-map',e)  ; 
    }

    watch(
        () => props.currentLatLng,
        (v: any) => {
            mapKey.value += 1;
            console.log("props current", props.currentLatLng);
            marker.value = [v]

            

        }
    );
    watch(()=>props.cadastreData,
    (newVal)=>{
        mapKey.value += 1;
    })

</script>
<style lang="scss">
    #map {
        height: 100%;
        z-index: 1;
    }
</style>
