<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import 'leaflet/dist/leaflet.css';
    import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
    import Map from '@/composables/map';
    import 'leaflet-draw/dist/leaflet.draw.css';
    import { PropType } from 'vue';
    import { LatLng } from 'leaflet';
    import "@/assets/style/map.scss";
    import {MarkerType, ICustomControlParams}  from  "@/typings/interfaces";
    import useUserPosition from '@/composables/useUserPosition';
    import useGeocode from '@/pages/find-Property/composable/useGeocode';

    
    
    
    const props = defineProps({
        customControls : {
            type : Array as PropType<ICustomControlParams[] | ICustomControlParams>,
            default : [],
        },
        isNeedPublicCadaster: {
            type: Boolean,
            default: false,
        },
        isinteractivePublicCadaster: {
            type: Boolean,
            default: false,
        },
        customMarkerCoords: {
            type:
                (Array as PropType<MarkerType[]>) ||
                (Object as PropType<MarkerType>),
            default: () => [],
        },
        needFilteredCoords: {
            type: Boolean,
        },
        needMarkerEventHandler: {
            type: Boolean,
            default: false,
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
        needDrawControl: {
            type: Boolean,
            default: false,
        },
        needDrawButtons: {
            type: Boolean,
            default: true,
        },
        needEditControl: {
            type: Boolean,
            default: true,
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
        refreshNow: {
            type: Boolean,
            default: false,
        },
        controlConfig: {
            type: Object,
            default: {
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
            type: [Object, Array] as PropType<{
                position: { lat: number; lng: number } | Array<number>;
                zoom?: number;
            }>,
            default : null
        },
        propertyPosition: {
            type: Object as PropType<LatLng>,
            default: null,
        },
        idMap: {
            type: String,
            default: "map"
        },
        needMultipleMarker : {
            type : Boolean,
            default : false
        },
        multipleMarkerData : {
            type:
                (Array as PropType<MarkerType[]>) ||
                (Object as PropType<MarkerType>),
            default: () => [],
        },
        controllerList: {
            type: (Array as PropType<any>),
            required: false
        },
        polygonLayerColor : {
            type  : String,
            default : 'blue'
        },
        enablePolygonDrawer : {
            type : Boolean,
            default : false
        },
        customPolygonDrawerLabel : {
            type : String,
            default : 'tracer une polygone'
        },
        customMarkerDrawerLabel : {
            type : String,
            default : 'tracer un marqueur'
        },
        
        
         
    });
    let map: Map;

    const globalMap = ref<Map | null>(null);

    const currentCreatedLayer = ref<{}>();
    const allCreatedLayer = ref<{}>();
    const firstRendering = ref<boolean>(true);

    let drawControl = ref<boolean>(props.needDrawControl);
    // const emit = defineEmits(['touched']);

    const emit = defineEmits<{
        (e: 'touched', payload: any): void;
        (e: 'on-polygon-created', payload: any): void;
        (e: 'on-marker-created', payload: any): void;
        (e: 'on-get-distance', payload: any): void;
        (e: 'on-polygon-deleted'): void;
        (e : "on-create-polygon") : void;
    }>();

    onMounted(() => {
        
        map = new Map(props.idMap,"Wallonie");
        globalMap.value = map;

        // map.setCustomControl(props.customControls);
        if(props.isNeedPublicCadaster){
            map.setPublicCadaster(props.isinteractivePublicCadaster);
            map.zoomLevelListener();
        }
        
        if (props.needFilteredCoords) {
            props.customMarkerCoords.forEach((marker: any) => {
                map.addUrbaMarker(
                    { lat: marker.lat, lng: marker.lng } as any,
                    () => {
                        emit('touched', marker);
                    },
                    marker.urbaIcon, marker.rue
                );
                map.fitBound(marker);
            });
        }

        if(!!props.focusPosition){
            map.fitBound(
                        props.focusPosition?.position as any,
                        props.focusPosition?.zoom);
            if(props.propertyPosition){

                emit(
                    'on-get-distance',
                    map.getDistance(
                        props.propertyPosition,
                        props.focusPosition?.position as any
                        ) as any
                );
            }
        }

        if (props.needMultipleMarker) {
            props.multipleMarkerData.forEach((marker: any) => {
                map.addMultipleMarker(
                    { lat: marker.latitude, lng: marker.longitude } as any,
                    () => {emit('touched', marker)},
                    marker.icon, 
                    // JSON.stringify(marker)
                    marker
                );
                map.fitBound(marker);
            });
        }

        if (props.needMarkerLayer || props.needPriceMarker) {
            if (props.needPriceMarker) {
                props.markerCustomCoordinates.forEach((marker: MarkerType) => {
                    map.addMarkerWithPrice(marker as any, () => {
                        emit('touched', marker);
                    });
                    // map.fitBound(marker);
                });
            } else {
                if(Array.isArray(props.markersCoordinates)){
                    let lastMarker : any = undefined;
                    props.markersCoordinates.forEach((marker: MarkerType, idx : number) => {
                    map.addMarker(marker as any, () => {
                        emit('touched', marker);
                    }, marker.customIcon, marker.iconSize, marker.iconAnchor); 
                    if(idx === (props.markersCoordinates.length  - 1)) {
                        lastMarker = marker;
                    }
                });
                if(props.markersCoordinates.length > 3){
                    map.fitBound(lastMarker, 14);

                }else{

                    map.fitBound(lastMarker, 18);
                }

                }else{
                    map.addMarker(props.markersCoordinates as any, () => {
                        emit('touched', props.markersCoordinates);
                    });
                    map.fitBound(props.markersCoordinates as never, 18);
                }
                
            }
        }
        if (props.needPolygonLayer) {
            const cleanData = props.polygonCoordinates.filter((elt : any ) => !!elt ) 
            if (Array.isArray(cleanData[0])) {

                cleanData.forEach((elt: any,idx : number) => {

                        map.createPolygon(elt, () => {
                            emit('touched', elt);
                        },  {color : props.polygonLayerColor});
 
                });
            } else {
                map.createPolygon(cleanData as any, () => {
                    emit('touched', cleanData);
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

        if (props.needMarkerEventHandler) {
            map.createCustomMarkerControl(props.customMarkerDrawerLabel, emit);
            
        }

        if (props.needPolylineLayer) {
            if (Array.isArray(props.polylineCoordinates[0]) && props.polylineCoordinates[0].length) {
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
            map.addDrawControl(props.controlConfig,props.needDrawButtons, props.needEditControl );
            map.DrawingLayerListener(
                polygonCreationHandler,
                markerCreationHandler,
                props.handleSingleLayer,
                polygonDeleteHandler,
            );
        }
        if (props.needPrintControl) {
            map.addPrintControl();
        }
        if (props.needServiceList) {
            console.log(props.serviceList, 'props.serviceList');
        }
        if (props.enablePolygonDrawer){
            map.createCustomPolygonControl(props.customPolygonDrawerLabel);
        }

    });


    watch(() => props.controllerList, cl => {
        cl && setTimeout(() => {
            globalMap.value?.fitBound({ lat: 50.84535101789271, lng: 4.352409839630127 }, 8)
            cl.forEach((item: any) => {
                if (!isNaN(item.position.lat)) {
                    const marker = globalMap.value?.addMarkerList(item.position, item.icon, () => {
                        globalMap.value?.fitBound(item.position, 14)
                    },)
                    marker?.bindPopup(item.info)
                }
            })
        });
    }, {immediate: true})

    watch(
        () => props.serviceList,
        (sl: Array<any>) => {
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
                            vicinity: item.vicinity,
                        };
                    })
                    .filter((item) => item);
                map.drawMarkerClusterService(
                    markerCluster,
                    firstRendering.value
                );
                firstRendering.value = false;
                globalMap.value?.drawMarkerClusterService(
                    markerCluster,
                    firstRendering.value
                );
                firstRendering.value = false;
            } else {
                globalMap.value?.removeMarkerCluster();
            }
        },
        { immediate: true }
    );

    // watch(
    //     () => props.focusPosition,
    //     (v) => {
    //         globalMap.value?.fitBound(v?.position as any, v?.zoom);
    //         emit(
    //             'on-get-distance',
    //             globalMap.value?.getDistance(
    //                 props.propertyPosition,
    //                 v?.position as any
    //             ) as any
    //         );
    //     },{immediate : true, deep : true}
    // );

    watch(
        () => props.needDrawControl,
        (value) => {
            drawControl.value = value;
        },
        { immediate: true }
    );

    watch(
        () => globalMap.value,
        (v) => {
            if (v && props.propertyPosition) {
                console.log(v, 'propertyPosition OK');
                globalMap.value?.setPropertyPosition(props.propertyPosition, (props.propertyPosition as any).zoom);
            }
        },
        { immediate: true }
    );


    const polygonCreationHandler = (layer: {[key : string] : any}) => {
        console.log('layer DBG', layer);
        currentCreatedLayer.value = layer;
        globalMap.value?.createPolygon(layer.latlng);
        emit('on-polygon-created', layer);
    };
    const polygonDeletedHandler = () => {
        console.log('deleteddddd');
    }
    const markerCreationHandler = (layer: {}) => {
        currentCreatedLayer.value = layer;
        emit('on-marker-created', layer);
    };

    function polygonDeleteHandler() {
        emit("on-polygon-deleted")
    }

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


    //marker1.onClick()
</script>
<template>
    <div class="fix-z-index" :id="idMap" />
</template>
<style lang="scss" scoped>
    .fix-z-index {
        width: 100%;
        height: 100%;
    }
    
</style>
