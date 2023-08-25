import { LatLng } from "leaflet";

function callback(result : any, status : string){
   if(status === 'OK'){
    return result;
   } 
}


export function itineraire(start : string | {lat  : any, lng : any}, end : string | {lat  : any, lng : any}){
    
    const promise = new Promise( async (resolve, reject) =>{
        const res : any[] = [];
        if ((window as any).google) {
            const google = (window as any).google;
            const directionsService = new google.maps.DirectionsService();
            const request : any = {
                origin : start,
                destination : end,
                travelMode : 'DRIVING',
                // drivingOptions : {
                //     departureTime : Date.now(),
                //     trafficModel: 'bestguess'
                // }
            }

            const result = await directionsService.route(request,callback);
            
            result.routes[0].overview_path.forEach((point : any) => {
                res.push({lat : point.lat(), lng : point.lng()})
            });
            resolve(res);
    
        }else{
            reject(new Error("[DBG] l'API Google n'est pas charger "));
        }
    })
    return  promise;  
}