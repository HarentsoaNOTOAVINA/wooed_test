import useGoogleMap from '@/composables/useGoogleMap';
import { onMounted, onUnmounted, ref } from 'vue';
import L, { Map, FeatureGroup, Control } from 'leaflet';
import 'leaflet.vectorgrid';
import 'leaflet/dist/leaflet.css';
import leafletMapStyles from '@/composables/map/Leaflet.style';
import useStreetViewPanorama from './useStreetViewPanorama';
import 'leaflet-draw';

const PUBLIC_CADASTER_URL = import.meta.env.VITE_PUBLIC_CADASTER_URL;

export default function useMap(params: any) {
    const DEFAULT_PROPERTY_MARKER = '/icon/map/property-marker.png';
    const map = ref<Map>();
    const evtClickMap = ref<any>();
    const markerCluster = ref<FeatureGroup>(L.featureGroup());
    const polygonCluster = ref<FeatureGroup>(L.featureGroup());
    const editableLayers = new L.FeatureGroup();
    const coordZoning = ref<any>({});

    onMounted(() => {
        createMap();
    });
    onUnmounted(() => {
        map.value?.remove();
    });

    function createMap() {
        const { mapId, zoom, centerCoord } = params.value;
        map.value = L.map(mapId, {
            center: centerCoord,
            zoom,
        });

        (L.gridLayer as any)
            .googleMutant({
                maxZoom: 30,
                type: 'roadmap',
                styles: leafletMapStyles,
            })
            .addTo(map.value);
        onClickMapZone();
    }

    function displayStreetView() {
        const { svId, centerCoord, zoom } = params.value;
        const { map } = useGoogleMap(centerCoord, svId, zoom);
        console.log(map, 'STREETVIEW');
    }

    function displayStreetViewPanorama() {
        const { svId, centerCoord } = params.value;
        const { streetViewRes } = useStreetViewPanorama(centerCoord, svId);
        console.log(streetViewRes, 'STREETVIEWPANO');
    }

    function appendPublicCadaster() {
        (L as any).vectorGrid
            .protobuf(
                `${PUBLIC_CADASTER_URL}/public.parcelles/{z}/{x}/{y}.pbf`,
                {
                    vectorTileLayerStyles: {
                        'public.parcelles': {
                            color: 'blue',
                            fill: true,
                        },
                    },
                }
            )
            .addTo(map.value);
    }

    function appendMarker(replacePrevMarker = false) {
        if (replacePrevMarker) {
            markerCluster.value.clearLayers();
        }
        const { centerCoord } = params.value;
        const icon = L.icon({
            iconUrl: DEFAULT_PROPERTY_MARKER,
            iconSize: [30, 40],
            iconAnchor: [15, 20],
        });
        const marker = L.marker(centerCoord, { icon });
        markerCluster.value?.addLayer(marker).addTo(map.value as Map);
        map.value?.setView(centerCoord);
    }

    function appendPolygonCluster(
        coordinates: any,
        color: any,
        replacePrevPolygon = false
    ) {
        if (replacePrevPolygon) {
            polygonCluster.value.clearLayers();
        }
        const polygon = L.polygon(coordinates, { color });
        polygonCluster.value.addLayer(polygon);
        polygonCluster.value.addTo(map.value as Map);
    }

    function onClickMapZone() {
        map.value?.on('click', (event) => {
            evtClickMap.value = event;
        });
    }
    function drawPolygon(
        config: {} = {
            //ignored draw options
            rectangle: false,
            circlemarker: false,
        },
        showDrawControl = true,
        showEditControl = true
    ) {
        let drawControl = new (L.Control as any).Draw({
            position: 'topright',
            draw: {
                polygon: {
                    allowIntersection: false,
                    drawError: {
                        color: '#e1e100',
                        message: 'Vous ne pouvez pas ajouter une intersection',
                    },
                    shapeOptions: {
                        color: '#4c46b2',
                    },
                },
                circle: false,
                rectangle: false,
                circlemarker: false,
                polyline: false,
                marker: false,
            },
            edit: {
                edit: false,
                featureGroup: editableLayers,
                remove: true,
                poly: {
                    allowIntersection: false,
                },
            },
        });

        map.value?.addControl(drawControl);
    }

    const handleDrawPolygon = function () {
        let last_layer: any = null;
        let polygon: any = null;

        map.value?.on('draw:created', (e: any) => {
            last_layer = e.layer;
            polygon = last_layer._latlngs[0];

            
            let p = new L.Polygon(last_layer._latlngs[0]);

            coordZoning.value = {
                polygon: (p.getLatLngs() as [][])[0],
            };
            
            editableLayers.addLayer(p);
            editableLayers.addTo(map.value as any);
        });

        map.value?.on('draw:drawstart', (e: any) => {
            editableLayers.clearLayers();
        });

    };

    return {
        map,
        appendPublicCadaster,
        appendMarker,
        appendPolygonCluster,
        evtClickMap,
        displayStreetView,
        displayStreetViewPanorama,
        drawPolygon,
        handleDrawPolygon,
        coordZoning,
    };
}
