import InfoCommunity from "./Information/InfoCommunity.vue"
import InfoUrbanism from "./Information/InfoUrbanism.vue"
import InfoEnvironment from "./Information/InfoEnvironment.vue"
interface info {
    id: number;
    label: string;
    component: object;
}

export const InfoData: info[] = [
    {
        id: 0,
        label: 'Communauté',
        component: InfoCommunity,
    },
    {
        id: 1,
        label: 'Urbanisme',
        component: InfoUrbanism,
    },
    {
        id: 2,
        label: 'Environnement',
        component: InfoEnvironment,
    },
];
