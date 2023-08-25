import { ref, watch, Ref, onMounted } from 'vue';

export function useGP(
    id: string,
    coord: Ref<{ lat: number; lng: number }>,
    radius: Ref<number>,
    filter: Ref<Array<string>>
) {
    const service = ref<any>(null);
    const result = ref<any>(null);

    function getPlaces(
        coord: { lat: number; lng: number },
        radius: number,
        filter: Array<string>
    ) {
        const { lat, lng } = coord;
        const center = new (window as any).google.maps.LatLng(lat, lng);
        service.value = new (window as any).google.maps.places.PlacesService(
            document.getElementById(id)
        );

        const nearbySearchOptions = {
            location: center,
            radius,
            type: filter,
        };
        
        service.value.nearbySearch(
            nearbySearchOptions,
            function (res: Array<any>, status: string) {
                if (
                    status ===
                    (window as any).google.maps.places.PlacesServiceStatus.OK
                ) {
                    /**
                     * THIS NEEDED FOR FIXING GOOGLE MAP DEPRECATED WARNING
                     * BY REMOVING "permanently_closed && open_now"
                     */
                    const parsedRes = res.map((element: any) => {
                        let parsedRes: any = {};
                        Object.keys(element).forEach(k => {
                            if (k !== 'permanently_closed') {
                                parsedRes = {
                                    ...parsedRes,
                                    [k]: element[k]
                                }
                                if (k === 'opening_hours') {
                                    delete parsedRes[k].open_now
                                }
                            }
                        })
                        if (!!parsedRes.photos) {
                            return {
                                ...parsedRes,
                                url_photo: parsedRes.photos[0].getUrl(),
                            };
                        } else {
                            return parsedRes;
                        }
                    });
                    result.value = parsedRes;
                } else {
                    result.value = [];
                }
            }
        );
    }

    onMounted(() => {
        getPlaces(coord.value, radius.value, filter.value);
    });

    watch(
        () => coord.value,
        (v) => {
            getPlaces(v, radius.value, filter.value);
        }
    );
    watch(
        () => radius.value,
        (v) => {
            getPlaces(coord.value, v, filter.value);
        }
    );
    watch(
        () => filter.value,
        (v) => {
            getPlaces(coord.value, radius.value, v);
        }
    );

    return { result };
}
