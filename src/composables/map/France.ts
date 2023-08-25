import 'leaflet-geoserver-request';
import L from 'leaflet'; 
import MapInterface, {IServices, IlayerObject} from "./MapInterface";
export default class FranceWMS extends MapInterface{

    inspireKey: string = "jhyvi0fgmnuxvfv0zjzorvdn/inspire";
    layerControl : any;
    mapLayer : {[key : string]: any} ;
    constructor(){
        super();
        this.services  = {
            url : `https://wxs.ign.fr/<__KEY__>/v/wms`,
            identifier : "<__KEY__>", 
            layers : [
                {
                    label : "parcelle cadastrale",
                    name : "CP.CadastralParcel",
                    key : this.inspireKey
                }
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