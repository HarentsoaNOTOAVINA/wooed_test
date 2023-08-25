import { ref, watch, Ref } from 'vue';

interface ICoords{
    lat: number,
    lng: number
}
const geocoder = new (window as any).google.maps.Geocoder();


export default function useGeocode(location : Ref<ICoords | string> ) {

    const geocodeResult = ref<any>(null);
    const callback = function (res: Array<any>, status: any) {
        if (status === 'OK') {
            geocodeResult.value = res;
            
        }
    }
    watch(
        () => location.value,
        (v : ICoords | string) => {
            let formatLocation = {};
            if (typeof v !== null ||  v !== undefined){
                if( typeof v === 'string'){
                    formatLocation  = {
                        address : v
                    }
                }else {
                    formatLocation = {
                        latLng: v ,
                    };
                }

                geocoder.geocode(
                    formatLocation,
                    callback
                    );
            }
        },
        { immediate: true, deep: true }
    );

    return { geocodeResult };
}
