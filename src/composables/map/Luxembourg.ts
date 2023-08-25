import 'leaflet-geoserver-request';
import L from 'leaflet'; 
import MapInterface, {IlayerObject} from "./MapInterface";
export default class LuxembourgWMS extends MapInterface{
    layerControl : any;
    mapLayer : {[key : string]: any} ;
    constructor(){
        super();
        this.services  = {
            url : `https://wms.geoportail.lu/public_map_layers/service`,
            identifier : "", 
            layers : [
                {
                    label : "Communes",
                    name : "302",
                    key : ""
                },
                {
                    label : "Contonns",
                    name : "346",
                    key : ""
                },
            ]  
        };
        this.params = {
            request : "GetMap",
            service : "WMS",
            layers : "",
            format : 'image/png',
            crs : L.CRS.EPSG3857,
            version : "1.3.0"
        }

        this.mapLayer = {};
        this.generateMapLayers();
    }

    generateMapLayers(){
        this.services.layers.forEach(async(layer) =>{

            // const url = this.formatWmsRequest(this.services.url);
            
            this.params.layers = (layer as IlayerObject ).name;
            
            const __layer = await this.fetchWMSSevice(this.services.url,this.params);
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