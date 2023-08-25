import 'leaflet-geoserver-request';
import L from 'leaflet'; 
import { argv } from 'process';

export interface IlayerObject{
    label: string;
    name : string;
    key ?: string;
}

export interface IServices{
    url : string;
    layers : string[] | IlayerObject[];
    identifier ?: string ;
}

export interface IWmsOptions{
    request : string;
    service ?: string;
    version : string;
    layers : string;
    format : string;
    exceptions ?: string;
    styles ?: string;
    width ?: string;
    height ?: string;
    crs : string | L.CRS;
    transparent ?: boolean;

}

/**
 * @author @Miadatsiory 
 * this the interface for map wms
 * for application map usecases
 */

export default class {
    /**
    * @type IServices
    * {
    * url ?: "",
    * layers ?: "",
    * identifier ?: "", 
    * }
    * Object that represents WMS services of specific region
     */
    
    
    services : IServices;

    /**
     * Params for wms request
     * type WMSOptions
     * @property 
     * @type IWmsOptions
     */
    params : IWmsOptions;

    mapLayer : {[key : string]: any} ;


    constructor(){
        this.services = {
            url : '',
            layers : [],
            identifier : ''
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

    }
    /** 
     * fetch specific Brugis service
     * @param url string -> urls of service
     * @param params WMSOptions -> wms parameters
     */
    fetchWMSSevice(url : string, params : any){
        return (L as any).Geoserver.wms(url, params);
    }

    /** 
     * @static @method fetch specific Brugis service
     * @param url string -> urls of service
     * @param params WMSOptions -> wms parameters
     */

    static fetchWMSSevice(url : string, params : any){
        return (L as any).Geoserver.wms(url, params);
    }

    formatWmsRequest(argv : any,kwargs : any) : string{
        throw new Error("methode pas encore impémenté");
    }
    /** 
     * make wms request for getting layers from specific region.
     * this function generates an object like
     * {
     *  layerName : layerObject
     * }
     * this object will be use for generating layer control
     */

    generateMapLayers(argv : any,kwargs : any) : any{
        throw new Error("methode pas encore impémenté");
    }

    /**
     * 
     * @param argv 
     * @param kwargs
     * @return layer object for layer conntrol overlay use case
     * 
     */
    getLayers() : any{
        throw new Error("methode pas encore impémenté");
    }




}