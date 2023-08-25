<script setup lang="ts">
    import { reactive, onMounted, ref, watch } from 'vue';
    import 'leaflet/dist/leaflet.css';
    import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
    import Map from '@/composables/map';
    import 'leaflet-draw/dist/leaflet.draw.css';
    import { PropType } from 'vue';
    import { LatLng } from 'leaflet';

    interface MarkerType {
        lat: number;
        lng: number;
        prices?: number;
        activeClass?: string;
    }

    const props = defineProps({
        needMarkerEventHandler : {
            type : Boolean,
            default  : false
        },
        mapCenterCoordinate: {
            type: [Array, Object],
            default: () => ({ lat: 50.84535101789271, lng: 4.352409839630127 }),
        },
        needMarkerLayer: {
            type: Boolean,
            default: false,
        },
        markerCustomCoordinates: {
            type: Array as PropType<MarkerType[]>,
            default: () => [],
        },
        markersCoordinates: {
            type:
                (Array as PropType<MarkerType[]>) ||
                (Object as PropType<MarkerType>),
            default: () => [],
        },
        needPolygonLayer: {
            type: Boolean,
            default: false,
        },
        needPolylineLayer: {
            type: Boolean,
            default: false,
        },
        needCircleLayer: {
            type: Boolean,
            default: false,
        },
        needPriceMarker: {
            type: Boolean,
            default: false,
        },
        circleCoordinates: {
            type: Array,
            default: [],
        },
        polygonCoordinates: {
            type: Array,
            default: [],
        },
        polylineCoordinates: {
            type: Array,
            default: [],
        },
        needDrawControl: {
            type: Boolean,
            default: false,
        },
        needPrintControl: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        handleSingleLayer: {
            type: Boolean,
            default: false,
        },
        refreshNow  : {
            type: Boolean,
            default: false,
        },
        controlConfig : {
            type : Object,
            default : {
                //ignored draw options
                rectangle: false,
                circlemarker: false,
            },
        },
        needServiceList: {
            type: Boolean,
            default: false,
        },
        serviceList: {
            type: Array,
            default: [],
        },
        focusPosition: {
            type: [Object, Array] as PropType<{position: {lat: number, lng: number} | Array<number>, zoom?: number}>
        },
        propertyPosition: {
            type: Object as PropType<LatLng>,
            default: null,
        }
    });
    let map: Map;

    const globalMap = ref<Map | null>(null)

    const currentCreatedLayer = ref<{}>();
    const allCreatedLayer = ref<{}>();
    const firstRendering = ref<boolean>(true)

    // const emit = defineEmits(['touched']);

    const emit = defineEmits<{
        (e: 'touched', payload: any): void;
        (e: 'on-polygon-created', payload: any): void;
        (e: 'on-marker-created', payload: any): void;
        (e: 'on-get-distance', payload: any): void;
    }>();

    onMounted(() => {
        map = new Map('map');
        globalMap.value = map;
        map.fitBound(props.mapCenterCoordinate as any);
        if (props.needMarkerLayer || props.needPriceMarker) {
            if (props.needPriceMarker) {
                props.markerCustomCoordinates.forEach((marker: MarkerType) => {
                    map.addMarkerWithPrice(marker as any, () => {
                        emit('touched', marker);
                    });
                    // map.fitBound(marker);
                });
            } else {
                props.markersCoordinates.forEach((marker: MarkerType) => {
                    map.addMarker(marker as any, () => {
                        emit('touched', marker);
                    });
                    map.fitBound(marker);
                });
            }
        }

        if (props.needPolygonLayer) {
            if (Array.isArray(props.polygonCoordinates[0])) {
                props.polygonCoordinates.forEach((elt: any) => {
                    // elt.forEach((polyline: any) => {
                        map.createPolygon(elt, () => {
                            emit('touched', elt);
                        });
                    // });
                });
            } else {
                map.createPolygon(props.polygonCoordinates as any, () => {
                    emit('touched', props.polygonCoordinates);
                
                });
            }
        }
        if (props.needCircleLayer) {
            if (Array.isArray(props.circleCoordinates[0])) {
                props.circleCoordinates.forEach((elt: any) => {
                    elt.forEach((circle: any) => {
                        map.createCircle(circle, () => {
                            emit('touched', circle);        
                        });
                    });
                });
            } else {
                map.createCircle(props.circleCoordinates as any, () => {
                    emit('touched', props.circleCoordinates);
                });
            }
        }

        if(props.needMarkerEventHandler){
            map.eventClickMap({singleMarker :true},emit);
        }

        if(props.needPolylineLayer){
            if (Array.isArray(props.polylineCoordinates[0])) {
                props.polylineCoordinates.forEach((elt: any) => {
                    elt.forEach((polyline: any) => {
                        map.createPolyline(polyline, () => {
                            emit('touched', polyline);
                        });
                    });
                });
            } else {
                map.createPolyline(props.polylineCoordinates as any, () => {
                    emit('touched', props.polylineCoordinates);
                });
            }
        }

        if (props.needDrawControl) {
            map.addDrawControl(props.controlConfig);
            map.DrawingLayerListener(
                polygonCreationHandler,
                markerCreationHandler,
                props.handleSingleLayer
            );
        }
        if (props.needPrintControl) {
            map.addPrintControl();
        }
        if (props.needServiceList) {
            console.log(props.serviceList, 'props.serviceList');
        }
    });

    watch(
        () => props.serviceList,
        (sl: Array<any>) => {
            console.log(firstRendering.value, 'firstRendering.value');
            if (sl && sl.length) {
                const markerCluster = sl
                    .map((item) => {
                        return {
                            position: {
                                lat: item.geometry.location.lat(),
                                lng: item.geometry.location.lng(),
                            },
                            icon: item.icon,
                            url_photo: item.url_photo,
                            name: item.name,
                            vicinity: item.vicinity
                        };
                    })
                    .filter((item) => item);
                    globalMap.value?.drawMarkerClusterService(markerCluster, firstRendering.value)
                    firstRendering.value = false;
            } else {
                globalMap.value?.removeMarkerCluster();
            }
        },
        { immediate: true }
    );

    watch(() => props.focusPosition, (v) => {
        globalMap.value?.fitBound(v?.position as any, v?.zoom);
        emit("on-get-distance", globalMap.value?.getDistance(props.propertyPosition, v?.position as any) as any)
    });

    watch(() => globalMap.value, (v) => {
        if (v && props.propertyPosition) {
            console.log(v, 'propertyPosition OK');
            globalMap.value?.setPropertyPosition(props.propertyPosition)
        }
    }, {immediate: true})

    const polygonCreationHandler = (layer: {}) => {
        console.log('layer DBG', layer);
        currentCreatedLayer.value = layer;
        emit('on-polygon-created', layer);
    };
    const markerCreationHandler = (layer: {}) => {
        currentCreatedLayer.value = layer;
        emit('on-marker-created', layer);
    };

    const getCurrentCreatedLayer = () => {
        currentCreatedLayer.value = map.getCurrentFeaturesCoordinates(
            map.layers
        );
        return currentCreatedLayer;
    };
    const getAllCreatedLayer = () => {
        allCreatedLayer.value = map.layers;
        return allCreatedLayer;
    };

    watch(()=> props.refreshNow,
        (newval)=>{
            console.log("nandalo eh");
            if(newval) (map as any).refreshMap();
        }
    )

    //marker1.onClick()
</script>
<template>
    <div class="fix-z-index" id="map" />
</template>
<style lang="scss" scoped>
    .fix-z-index {
        width: 100%;
        height: 100%;
    }
</style>
