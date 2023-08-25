import { ref, onMounted, watch, Ref } from 'vue';

interface ICoords {
    lat: number;
    lng: number;
}

export default function useGeocode(
    location: Ref<string> | Ref<ILocationParams>,
    currentLatLng: ILocationParams | null = null
) {
    const geocodeResult = ref<any>(null);
    watch(
        () => location.value,
        (v) => {
            let formatLocation:
                | { latlng: Ref<ILocationParams> }
                | { address: Ref<string> }
                | {} = {};
            if (!currentLatLng) {
                if (typeof location === 'string') {
                    formatLocation = {
                        address: (location as Ref<ILocationParams>).value,
                    };
                } else {
                    formatLocation = {
                        latLng: { ...(location as Ref<ILocationParams>).value },
                    };
                }
            } else {
                if (typeof location === 'string') {
                    formatLocation = {
                        address: (location as Ref<ILocationParams>).value,
                    };
                } else {
                    formatLocation = {
                        latLng: { ...(location as Ref<ILocationParams>).value },
                    };
                }
            }

            const geocoder = new (window as any).google.maps.Geocoder();
            geocoder.geocode(
                formatLocation,
                function (res: Array<any>, status: any) {
                    if (status === 'OK') {
                        geocodeResult.value = res;
                        // console.log(geocodeResult.value);
                    }
                }
            );
        },
        { immediate: true, deep: true }
    );

    return { geocodeResult };
}
