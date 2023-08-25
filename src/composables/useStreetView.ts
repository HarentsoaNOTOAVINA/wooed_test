import { ICoords } from "@/typings/interfaces";
import {onMounted} from "vue";


export default (elementId : string, position : ICoords)=>{
    const elt = document.getElementById(elementId);
    const config = {
        position,
        pov: {heading: 165, pitch: 0},
    }
    try {
        if(!!(window as any).google){
            const panorama  = new (window as any).google.maps.StreetViewPanorama(elt,config);
        }
    } catch (error) {

        throw new Error("Google n'est pas initialisé dans ce projet");
              
    }
    
}