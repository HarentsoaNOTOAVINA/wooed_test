import store from "@/store/index";
import {ref,Ref, onUpdated, onMounted, watch} from "vue";
import { stopCoverage } from "v8";

const input = ref<any>();
const service = ref<any>();
var res = ref<any>(null);


const getPlaces = ( coord :any,radius : any = 500,filter : any )=>{
    console.log('is called', radius.value, filter.value);
    const center = new (window as any ).google.maps.LatLng(coord.value.lat ,coord.value.lng)
    service.value = new (window as any ).google.maps.places.PlacesService(input.value);
    service.value.nearbySearch({
        location: center,
         radius : radius.value,
        type: filter.value
    },(result : any, status :  any)=>{
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK) {
            const addPhotoRes = result.map((element: any) => {
                if (!!element.photos) {
                    return {
                        ...element,
                        url_photo: element.photos[0].getUrl()
                    }
                } else {
                    return element
                }
            });
            // console.log('from callback', result)
            store.commit("NearByServicesModule/setServiceList",addPhotoRes)
            // res.value = addPhotoRes;
        }
    });
}


export const usePlaces =  ( id : string ,
                            coord : Ref<{[key : string]  : number}>,
                            radius : Ref<number>,
                            filter : Ref<string[]>
                        )=>{
                

    input.value = document.getElementById(id);

    getPlaces(coord,radius,filter);

    watch([filter, radius, coord],
        ([newfilter],[newRadius])=>{
            getPlaces(coord,newRadius,newfilter);
            console.log(res.value, '>>>>>>>>')
        },
        {immediate : true, deep : true}
    )

    watch(()=>res.value,
        (newVal)=>{
            console.log(">>>>after", res.value)
            return newVal
        }
    )
    // watch(()=> radius,
    //     (newVal)=>{

    //         getPlaces(coord,newVal,filter);
    //         console.log(res.value, '>>>>>>>>')


    //     },
    //     {immediate : true, deep : true}
    // )

    // watch(()=> coord,
    //     (newVal)=>{

    //         getPlaces(newVal,radius,filter);
    //         console.log(res.value, '>>>>>>>>')

    //     },
    //     {immediate : true, deep : true}
    // )
    // watch(()=> res.value,
    
    //     (val)=>{
    //         if(!val){
    //         getPlaces(coord,radius,filter);
    //         }
    //     }, {immediate : true, deep : true})
    
    
    return {res}
}



