import { ref, watch } from 'vue';
export default function useStreetView(
    pos: { lat: number; lng: number },
    mapId: any,
    zoom: number
) {
    const map = ref<any>(null);
    const marker = ref<any>(null);
    const _pos = ref<{ lat: number; lng: number }>(pos);

    function initGoogleMap(parsedPos: { lat: number; lng: number }) {
        map.value = new (window as any).google.maps.Map(
            document.getElementById(mapId) as HTMLElement,
            {
                center: parsedPos,
                zoom,
            }
        );
        appenMarker(parsedPos)
    }

    function appenMarker(pos: { lat: number; lng: number }) {
        marker.value = new (window as any).google.maps.Marker({
            position: pos,
            map: map.value,
            title: 'Votre position',
            icon: {
                url: `/src/static/images/empty-img.png`,
                scaledSize: new (window as any).google.maps.Size(30, 40),
                anchor: new (window as any).google.maps.Point(15, 20)
            },
            animation: (window as any).google.maps.Animation.DROP
        });
    }

    watch(
        () => _pos.value,
        (position) => {
            const { lat, lng } = position as any;
            const parsedPos = { lat: +lat, lng: +lng };
            setTimeout(() => {
                initGoogleMap(parsedPos);
            });
        },
        { immediate: true, deep: true }
    );

    return {
        map,
        marker
    };
}
