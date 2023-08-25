import 'leaflet-geoserver-request';
import L from 'leaflet'; 
import {WALLONIE_LAYER} from './layers';

import MapInterface, {IServices, IlayerObject} from "./MapInterface";
export default class WallonieWMS extends MapInterface{
    
    layerControl : any;
    mapLayer : {[key : string]: any} ;
    constructor(){
        super();
        const __layer = this.getData() as never;
        this.services  = {
            url : `https://geoservices.wallonie.be/arcgis/services/<__KEY__>/MapServer/WmsServer`,
            identifier : "<__KEY__>", 
            layers : __layer
        };

        this.params = {
            styles:"default",
                layers:"",
                width:"16",
                height:"16",
                service:"WMS",
                request:"GetMap",
                format:"image/png",
                transparent:true,
                version:"1.3.0",
                crs: L.CRS.EPSG3857,
        }

        this.mapLayer = {};
        if(!!this.services.layers.length){
            this.generateMapLayers();
        }
    }
    getData(){
        const layers : IlayerObject[] = [];
        WALLONIE_LAYER.forEach((layer : string)=>{
            layers.push({
                label : layer.split('/')[1],
                name : "0",
                key : layer
            })
        })
        return layers;
    }

    /** 
     * format wms url request
     * @param url string -> urls of service
     * @param layer @type IlayerObject -> wms layer object
     * @returns @type string -> formated url
     */
    formatWmsRequest(url : string , layer : IlayerObject) {
        const formatedUrl = url.replace(
                    (this.services.identifier as string),
                    layer.key || ''
                    );

        return  formatedUrl;
    }

    
    generateMapLayers(){
        this.services.layers.forEach(async(layer) =>{

            const url = this.formatWmsRequest(this.services.url, layer as IlayerObject );
            
            this.params.layers = (layer as IlayerObject ).name;
            
            const __layer = await this.fetchWMSSevice(url,this.params);
            this.mapLayer = {
                ...this.mapLayer,
                [(layer as IlayerObject ).label] : __layer
            }
        })
    }

    getLayers() {
       return this.mapLayer;
    }

} 