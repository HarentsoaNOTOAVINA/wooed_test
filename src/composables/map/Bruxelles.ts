import 'leaflet-geoserver-request';
import L from 'leaflet'; 
import MapInterface, {IServices, IlayerObject} from "./MapInterface";


export default class BrugisWMS extends MapInterface{
    layerControl : any;
    mapLayer : {[key : string]: any} ;
    constructor(){
        super();
        this.services  = {
            url : `https://gis.urban.brussels/geoserver/wms`,
            identifier : "", 
            layers : [
                {
                    label : "Affectation_du_sol",
                    name : "PERSPECTIVE_FR:Affectation_du_sol",
                    key : ""
                },
                {
                    label : "Parcelle cadastral urbis",
                    name : "CIRB_URBIS:PARCELLAIRE_CADASTRAL_URBIS",
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