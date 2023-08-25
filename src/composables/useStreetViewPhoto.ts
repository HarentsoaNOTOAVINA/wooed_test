import { onMounted, ref, watch } from 'vue';
export default function useStreetViewPhoto(pos: { lat: number; lng: number }) {
    const streetViewRes = ref<any>(null);
    const _pos = ref<{ lat: number; lng: number }>(pos);
    const GM_API_KEY = import.meta.env.VITE_GOOLE_MAPS_API_KEY;
    function getStreetViewData(parsedPos: { lat: number; lng: number }) {
        const streetViewService = new (
            window as any
        ).google.maps.StreetViewService();
        streetViewService.getPanorama(
            { location: parsedPos, radius: 50 },
            (data: any, status: string) => {
                if (status === 'OK') {
                    const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${data.location.latLng.lat()},${data.location.latLng.lng()}&heading=${
                        data.tiles.centerHeading
                    }&fov=80&pitch=0&key=${GM_API_KEY}`;
                    streetViewRes.value = imageUrl;
                } else {
                    console.log('ERROR');
                }
            }
        );
    }

    watch(
        () => _pos.value,
        (position) => {
            const { lat, lng } = position as any;
            const parsedPos = { lat: +lat, lng: +lng };
            getStreetViewData(parsedPos);
        },
        { immediate: true }
    );

    return {
        streetViewRes,
    };
}
