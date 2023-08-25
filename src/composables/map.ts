import { defineEmits } from 'vue';
// import 'leaflet';
import L, {
    Control,
    FeatureGroup,
    LatLng,
    LatLngBoundsExpression,
    LatLngExpression,
    LatLngLiteral,
    LayerGroup,
    MapOptions,
    LeafletMouseEvent,
    Marker,
    divIcon,
    map,
} from 'leaflet';

import 'leaflet.vectorgrid';
import 'leaflet-easyprint';
import '@geoman-io/leaflet-geoman-free';
// import * as Gp from 'geoportal-extensions-leaflet';
import 'leaflet-draw';
import './map/Leaflet.GoogleMutant';
import googleLeaflet from '@/core/lib/google-leaflet';
import WalOnMapWMS from './map/Wallonie';
import  BrugisWMS from "./map/Bruxelles";
import FranceWMS from "./map/France";
import LuxembourgWMS from "./map/Luxembourg";
import FlandresWMS from "./map/Flandres";

import leafletMapStyles from './map/Leaflet.style';
import index from '@/pages/index.vue';
import { formatDateFr } from '@/utils/date/format';
import { createApp } from 'vue';
import MarkerIcon from '@/static/images/map/property-marker.png';
import WallonieWMS from './map/Wallonie';
interface layerType {
    type: string;
    latlng: any[] | LatLngExpression;
    layerID: number;
}

interface circleCordinates {
    coordinates: L.LatLngExpression;
    radius: number;
}

interface IEventClickMapOptions {
    addMarker?: boolean;
    singleMarker?: boolean;
}
interface latLngWithPrice {
    lat: number;
    lng: number;
    prices?: number | string;
    activeClass?: string;
    id?: number;
}

const layerType = {
    polygon: 'polygon',
    marker: 'marker',
};


/**
 * ==== Map instance ======= 
 */

const FranceWMSService = new FranceWMS(); 
const BrugisWMSService = new BrugisWMS();
const WallonieWMSService = new WallonieWMS();
const LuxembourgWMSService = new LuxembourgWMS();
const FlandreWMSService = new FlandresWMS();
//==========================
// const L = Gp.LExtended;

export default class Map {
    vectorGridIneractivity : boolean = false; 
    isDrawActiveted: boolean = false;
    clickMapEvent: LeafletMouseEvent | undefined;
    theMarker: L.Marker<any> | null = null;
    containerid: string;
    mapOptions: { [key: string]: any } = {
        minZoom : 0,
        maxZoom: 50,
        zoom: 18,
        center: { lat: 50.84535101789271, lng: 4.352409839630127 },
        pmIgnore: false,
        crs : L.CRS.EPSG3857,
        // need for avoiding bug
        zoomAnimation: false,
    };
    map: L.Map;
    featureGroup: FeatureGroup;
    pointedCoordinate: any;
    layers: layerType[] = [];
    markerCluster: Array<Marker> | null = [];

    markerClusterGroup: any = null;

    propertyPosition: LatLng | null = null;
    region : string;
    
    vectorGrid = (L as any).vectorGrid

    .protobuf(`${import.meta.env.VITE_PUBLIC_CADASTER_URL}/public.parcelles/{z}/{x}/{y}.pbf`, {
        vectorTileLayerStyles: {
        'public.parcelles': {
            weight : .8,
            color: 'blue',
            fill: false
            
        },
        interactive : this.vectorGridIneractivity
        }

    });

    constructor(containerId: string, region : string ="Bruxelles") {
        this.region = region;
        this.containerid = containerId;
        this.featureGroup = L.featureGroup();
        this.map = L.map(this.containerid, this.mapOptions);
        this.map.pm.setLang('fr');
        this.init();

    }

    setPropertyPosition(position: LatLng, zoom: number = 18) {
        this.propertyPosition = position;
        const icon = L.icon({
            // iconUrl: `icon/map/property-marker.png`,
            iconUrl: MarkerIcon,
            iconSize: [30, 40],
            iconAnchor: [15, 20],
        });
        const marker = L.marker(position, { icon });
        // L.DomUtil.addClass((marker as any)._icon, 'property-marker')
        this.map.addLayer(marker);
        this.fitBound(position, zoom);
    }

    setContainerId(id: string) {
        this.containerid = id;
    }

    setPublicCadaster(isIntractive : boolean = false) {
        this.vectorGridIneractivity = isIntractive;
        this.map.addLayer(this.vectorGrid);
    }
    removePublicCadaster() {
        if(this.map.hasLayer(this.vectorGrid) ){
            this.map.removeLayer(this.vectorGrid);
        }
    }

    eventClickMap(
        { addMarker = true, singleMarker = true }: IEventClickMapOptions,
        emmitterFn = (e: any, v: any) => {}
    ) {
        this.map.on('click', (e) => {
            this.clickMapEvent = e;
            // this.pointedCoordinate = ;
            emmitterFn('touched', e.latlng);
            if (!this.isDrawActiveted) {
                if (singleMarker) {
                    if (this.theMarker) {
                        this.map.removeLayer(this.theMarker);
                    }
                }
                this.theMarker = L.marker(e.latlng).addTo(this.map);
                this.fitBound(e.latlng);
            }
        });
    }
    init() {
        // (L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }) as any ).addTo(this.map);
        
        const Baselayer =  (L.gridLayer as any)
        .googleMutant({
            minZoom : 0,
            maxZoom: 20,
            type: 'roadmap',
            styles: leafletMapStyles,
        })
        .addTo(this.map);
        
        let layers ;
        switch (this.region) {
            case "France":
                layers = FranceWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                    layer.addTo(this.map);
                });
            break;
            case "Bruxelles":
                layers =  BrugisWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                        layer.addTo(this.map);
                });   
            break;
            case "Wallonie":
                layers = WallonieWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                    layer.addTo(this.map);
                    })
            break;
            case "Région Wallonne":
                layers = WallonieWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                    layer.addTo(this.map);
                    })
            break;
            case "Flandres":
                layers = FlandreWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                    layer.addTo(this.map);
                 })  
            break;
            case "Luxembourg":
                layers = LuxembourgWMSService.getLayers();
                Object.values(layers).forEach((layer) =>{
                    layer.addTo(this.map);
                })
            break;
        }
    
        L.control.layers(layers).addTo(this.map);

        // Désactiver les couches par défaut
        // if (layers) {
        //     for (const [key, value] of Object.entries(layers)) {
        //         this.map.removeLayer(value);
        //     }
        // }
    }



    addMarkerList(
        markerPosition: any,
        iconCustom?: any,
        eventHandler: any = () => {}
    ) {
        const icon = L.icon({
            iconUrl: iconCustom,
            iconSize: [30, 30],
        });
        const marker = L.marker(markerPosition, { icon });
        this.featureGroup.addLayer(marker).addTo(this.map);
        marker.on('click', eventHandler);
        return marker;
    }

  

    addControl(customControl: Control) {
        this.map.addControl(customControl);
    }
    /**
     *
     * @param coord coordonner du point qui va servir de centre de la carte
     */
    fitBound(coord: LatLngExpression, zoom?: number) {
        this.map.setView(coord, zoom);
    }

    /**
     *
     * @param latLong cooordonéé du marqueur à placer sur la carte
     */
    addMarker(
        latLong: LatLngLiteral,
        eventHandler = () => {},
        iconCustom: any = MarkerIcon,
        iconSize: any = [25, 30],
        iconAnchor: any = [12, 15]
    ) {
        let customIcon = L.icon({
            iconUrl: iconCustom,
            iconSize,
            iconAnchor,
        });

        const marker = L.marker(latLong, {
            icon: customIcon,
        }).addTo(this.map);
        marker.on('click', eventHandler);
        return marker;
    }

    addUrbaMarker(
        latLong: LatLngLiteral,
        eventHandler = () => {},
        iconCustom?: any,
        popUp?: any
    ) {
        let urbaIcon = L.icon({
            iconUrl: iconCustom,
            iconSize: [20, 20],
        });

        let urbaPopUp = L.popup().setContent(
            "<span style='font-weight:bold'>Adresse: " + popUp + '</span>'
        );

        const marker = L.marker(latLong, {
            icon: urbaIcon,
            key: urbaIcon,
        } as any)
            .addTo(this.map)
            .bindPopup(urbaPopUp);
        marker.on('click', eventHandler);
        return marker;
    }

    addMultipleMarker(
        latLong: LatLngLiteral,
        eventHandler = () => {},
        iconCustom?: any,
        data?: any
    ) {
        let icon = L.icon({
            iconUrl: iconCustom,
            iconSize: [50, 50],
        });

        let multipleMarkerPopup = L.popup().setContent(
            `
            <div class="" style="height : 200px; width : 200px;">
                <table> 
                    <tbody>
                        <tr>
                            <td style="padding: 2px;">Contenu :</td>
                            <td style="padding: 2px;">${data.remark}</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px;">Début :</td>
                            <td style="padding: 2px;">${formatDateFr(
                                data.startDate
                            )}</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px;">Fin :</td>
                            <td style="padding: 2px;">${formatDateFr(
                                data.endDate
                            )}</td>
                        </tr>
                    </tbody>
                </table>
                <img src=${
                    import.meta.env.VITE_API_ROOT_URL +
                    data?.files[0]?.path +
                    '/' +
                    data?.files[0]?.name
                } alt="image" style="height : calc(100% - 100px); width : 100%">
                <button id="popupBtn" class="popupBtn" style="outline : none; margin: 10px; width: 80%; border-radius: 8px; border: solid #949fb5 1px; padding: 5px 10px; cursor: pointer; color: #949fb5;">Signaler l'arrêt</button>
            </div>
            `
        );

        const marker = L.marker(latLong, {
            icon: icon,
            key: icon,
        } as any).addTo(this.map);
        // .bindPopup(multipleMarkerPopup);
        marker.on('click', eventHandler);

        // function handleClick() {
        //     console.log('zazazazazaza');
        // }
        return marker;
    }

    replaceMarker(latLong: LatLngLiteral) {
        if (this.theMarker) {
            this.map.removeLayer(this.theMarker);
        }
        this.theMarker = L.marker(latLong).addTo(this.map);
    }
    addMarkerWithPrice(
        latLong: latLngWithPrice,
        eventHandler = (id: any) => {}
    ) {
        const marker = L.marker(
            { lat: latLong.lat, lng: latLong.lng },
            {
                icon: this.setTextIcon(latLong.prices, latLong.activeClass),
            }
        ).addTo(this.map);

        marker.on('click', () => {
            
            const active = document.querySelector('.marker-active');
            active?.classList.toggle('marker-active');
            this.setTextIcon(latLong.prices, latLong.activeClass);
            eventHandler(latLong.id);
        });
        return marker;
    }

    setTextIcon(text: any, activeClass = '') {
        return new L.DivIcon({
            html: `<div class= "marker-text ${activeClass}">${text}</div>`,
        });
    }
    createPolygon(
        coordinates: LatLngExpression[],
        eventHandler = () => {},
        config: { [key: string]: any } = { color: 'blue' }
    ) {
        const polygon = L.polygon(coordinates, config).addTo(this.map);
        polygon.on('click', eventHandler);
        return polygon;
    }

    createPolyline(coordinates: LatLngExpression[], eventHandler = () => {}) {
        const polyline = L.polyline(coordinates).addTo(this.map);
        polyline.on('click', eventHandler);
        return polyline;
    }

    createCircle(
        { coordinates, radius }: circleCordinates,
        eventHandler = () => {}
    ) {
        const circle = L.circle(coordinates, { radius: radius }).addTo(
            this.map
        );
        circle.on('click', eventHandler);
        return circle;
    }

    addPrintControl() {
        const printPlugin = (L as any).easyPrint({
            hidden: false,
            position: 'topright',
            sizeModes: ['A4Landscape'],
        });
        this.addControl(printPlugin);
    }

    //for drawing toolbar we use leaflet-geoman plugin
    addDrawControl(
        config: {} = {
            //ignored draw options
            rectangle: false,
            circlemarker: false,
        }, 
        showDrawControl = true,
        showEditControl = true

    ) {

        const toolbarConfig = {
            buttons: {
                polygon: 'Dessiner sur la carte',
            }
        };

        const editorConfig = {
            featureGroup: this.featureGroup,
        };

        let drawControl = new (L.Control as any).Draw({
            toolbar: toolbarConfig,
            draw: showDrawControl ? config : false,
            edit: showEditControl ? editorConfig : false,  
        });
        
        this.map.addControl(drawControl);
    }
    getFeatures() {
        return this.layers;
    }
    getCurrentFeaturesCoordinates(layer: layerType | layerType[]) {
        return this.layers[this.layers.length - 1];
    }
    getPolygonFeatures() {
        return this.layers.filter((e) => e.type === layerType.polygon);
    }
    getMarkerFeatures() {
        return this.layers.filter((e) => e.type === layerType.marker);
    }
    /**
     * ######## ALL ABOUT DRAWING LAYERS ##########
     * listenning drawing event and add to drawn layer data
     */

    getDistance(p1: LatLng, p2: LatLng): string {
        const rad = function (x: number) {
            return (x * Math.PI) / 180;
        };
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(p2.lat - p1.lat);
        const dLong = rad(p2.lng - p1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat)) *
                Math.cos(rad(p2.lat)) *
                Math.sin(dLong / 2) *
                Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d.toFixed(2); // returns the distance in meter
    }

    removeMarkerCluster() {
        if (this.markerClusterGroup) {
            this.map.removeLayer(this.markerClusterGroup);
            this.markerClusterGroup = null;
            // console.log('NEED TO BE CLEAR');
        }
    }

    drawMarkerClusterService(
        markerCluster: Array<any>,
        firstRendering?: boolean
    ) {
        function customizePopup(markerDetails: {
            url_photo: string;
            name: string;
            vicinity: string;
            distanceFromPropety: string | number;
        }) {
            const { distanceFromPropety, name, url_photo, vicinity } =
                markerDetails;
            let urlPhoto = url_photo
                ? url_photo
                : `${window.location.origin}/src/static/images/empty-img.png`;
            const eltImg = `<img src="${urlPhoto}"/>`;
            const eltName = `<h2>${name}</h2>`;
            const eltVicinity = `<p>${vicinity}</p>`;
            const eltDistance = `<p>Distance par rapport à votre bien: <strong>${distanceFromPropety}m</strong></p>`;
            return `<div class="popup-service__content">${eltImg}${eltName}${eltVicinity}${eltDistance}</div>`;
        }

        if (this.markerClusterGroup && !firstRendering) {
            this.map.removeLayer(this.markerClusterGroup);
            this.markerClusterGroup = null;
            // console.log('NEED TO BE CLEAR');
        }
        if (markerCluster.length > 0 && this.map) {
            this.markerClusterGroup = L.featureGroup();
            console.error(markerCluster)
            markerCluster.forEach((marker, key) => {
                const icon = L.icon({
                    iconUrl: `${marker.icon}`,
                    iconSize: [40, 40],
                    className: 'google-core-icon',
                });
                const currentMarker = L.marker(marker.position, {
                    icon,
                    k: key,
                } as any);

                const popup = L.popup({
                    className: 'popup-service',
                }).setContent(
                    customizePopup({
                        url_photo: marker.url_photo,
                        distanceFromPropety: this.getDistance(
                            marker.position,
                            this.propertyPosition as LatLng
                        ),
                        name: marker.name,
                        vicinity: marker.vicinity,
                    })
                );
                currentMarker.bindPopup(popup);
                currentMarker.on('click', (e) => {
                    this.fitBound(e.latlng, 20);
                });
                this.markerClusterGroup.addLayer(currentMarker);
            });
        } else if (!markerCluster.length) {
            this.markerClusterGroup = L.featureGroup();
        }
        this.map.addLayer(this.markerClusterGroup);
        // setTimeout(() => {
        // }, 1000)
    }
    zoomLevelListener(){

        this.map.on('zoomend',()=>{
            console.log('DBG zoom level', this.map.getZoom());
            if(this.map.getZoom() < 16 ){
                this.removePublicCadaster();
            }else if(this.map.getZoom() >= 16){
                this.setPublicCadaster();
            }
        });
    }

    DrawingLayerListener(
        polygonGetter = (feat: {}) => {},
        markerGetter = (feat: {}) => {},
        handleOne = false,
        polygonDeleted = () => {}
    ) {
        let selectedFeature: any = null;
        this.map.on('draw:deleted', (e: any) => {
            polygonDeleted();
        });
        this.map.on('draw:drawstart', (e: any) => {
            if (handleOne) {
                this.featureGroup.clearLayers();
                this.isDrawActiveted = true;
            }
        });
        this.map.on('draw:created', (e: any) => {
            const layer = e.layer;
            selectedFeature = e.layer;

            if (e.layerType === layerType.polygon) {
                // handle polygon layer after creation
                let p = new L.Polygon(layer._latlngs[0]);
                let feat: any;

                this.featureGroup.addLayer(p);
                this.featureGroup.addTo(this.map);
                feat = {
                    type: layerType.polygon,
                    latlng: (p.getLatLngs() as [][])[0],
                    layerID: this.featureGroup.getLayerId(p),
                };
                this.layers.push(feat);
                polygonGetter(feat);
            } else if (e.layerType === layerType.marker) {
                //handle marker layers after creation
                let m = new L.Marker(layer._latlng);
                this.featureGroup.addLayer(m);
                this.featureGroup.addTo(this.map);
                const feat = {
                    type: layerType.marker,
                    latlng: m.getLatLng(),
                    layerID: this.featureGroup.getLayerId(m),
                };
                this.layers.push(feat);
                markerGetter(feat);
            }

            this.featureGroup.eachLayer((layer) => {});
        });

        this.map.on((L as any).Draw.Event.DELETED, (e) => {
            (e as any).layers.eachLayer((layer: any) => {
                this.layers.forEach((l) => {
                    if (l.layerID === layer._leaflet_id) {
                        const index = this.layers.indexOf(l);
                        this.layers.splice(index);
                    }
                });
            });
        });

        this.map.on('draw:drawstop', (e) => {
            this.isDrawActiveted = false;
        });
    }

    enablePolygonnDrawer(){
        new (L as any).Draw.Polygon(this.map).enable()
    }
    setCustomControl(
        $ev : any={ 
                label : "Action",
                callback : ()=>{console.log('custom action fired ')}
            }){
        const customControl = L.Control.extend({
            
            onAdd : function(map : any){
                    
                    if(Array.isArray($ev) && !!$ev.length){
                        let last_elt;
                        $ev.forEach((elt : any)=>{
                            const btn = L.DomUtil.create('button', "lf-map-button");
                            btn.textContent = elt?.label;
                            
                            L.DomEvent.on(btn, "click", function($event){
                                L.DomEvent.stopPropagation($event);
                                elt?.callback();
                            })
                            last_elt= btn;
                        });
                        return last_elt;
                    }else{
                        const btn = L.DomUtil.create('button', "lf-map-button");
                        btn.textContent = $ev.label;
                        
                        L.DomEvent.on(btn, "click", function($event){
                            L.DomEvent.stopPropagation($event);
                            $ev.callback();
                        })
                        return btn;
                    }
            }
        });
        this.addControl(new customControl());
        
    }
    createCustomPolygonControl(label: string='tracer une polygone'){
        const callback = ()=>{
            this.featureGroup.clearLayers();
            this.enablePolygonnDrawer();
        }
        this.setCustomControl(
            {
                label,
                callback
            }
        );
    return this;
    }
    createCustomMarkerControl(label: string='tracer un marqueur', emitfn : any){
        const callback = ()=>{
            this.featureGroup.clearLayers();
            this.eventClickMap({ singleMarker: true },emitfn);
        }
        this.setCustomControl(
            {
                label,
                callback
            }
        );
    return this;
    }
    
}


