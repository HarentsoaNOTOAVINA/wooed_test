import { ref, watch } from 'vue';
export default function useStreetViewPanorama(
    pos: { lat: number; lng: number },
    mapId: any
) {
    const streetViewRes = ref<any>(null);
    const streetViewDiv = ref<any>(null);
    const _pos = ref<{ lat: number; lng: number }>(pos);
    const GM_API_KEY = import.meta.env.VITE_GOOLE_MAPS_API_KEY;

    function getStreetViewPanorama(parsedPos: { lat: number; lng: number }) {
        console.log(parsedPos, mapId, 'STREET VIEW');
        streetViewDiv.value = document.getElementById(mapId);
        console.log(streetViewDiv.value, 'elt');
        const streetView = new (window as any).google.maps.StreetViewPanorama(
            streetViewDiv.value,
            {
                position: parsedPos,
                pov: { heading: 165, pitch: 0 },
                motionTracking: false,
            }
        );
        streetViewRes.value = streetView;
    }

    function takeScreen(): string { 
        const position = streetViewRes.value.getPosition();
        const heading = streetViewRes.value.getPov().heading;
        const pitch = streetViewRes.value.getPov().pitch;
        const fov = streetViewRes.value.getPov().fov;
        const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x480&location=${position.lat()},${position.lng()}&heading=${heading}&pitch=${pitch}&fov=${fov}&key=${GM_API_KEY}`;
        return imageUrl;
    }

    watch(
        () => _pos.value,
        (position) => {
            console.log(position);
            const { lat, lng } = position as any;
            const parsedPos = { lat: +lat, lng: +lng };
            setTimeout(() => {
                getStreetViewPanorama(parsedPos);
            });
        },
        { immediate: true, deep: true }
    );

    return {
        streetViewRes,
        takeScreen,
    };
}
