import Elevator from '@/pages/work/Maintains/Elevator/Elevator.vue';
import ElectricienNearby from '@/pages/work/Emergency/ElectricienNearby.vue';
import PlumbersNearby from '@/pages/work/Emergency/PlumbersNearby.vue';

interface ISideMenu {
    key: string;
    label: string;
    icon?: string;
    component?: object;
    hasSubMenu?: boolean;
    subMenu?: Array<ISideSubMenu>;
}

interface ISideSubMenu {
    id: number;
    label: string;
    name: string;
    icon?: string;
    component?: object;
}

export const dataMenuEmergency: ISideMenu[] = [
    {
        key: 'electricians-nearby',
        label: 'Electriciens disponibles',
        icon: 'ElectricianIcon',
        component: ElectricienNearby,
    },
    {
        key: 'blumber-nearby',
        label: 'Plombier disponibles',
        icon: 'PlumberIcon',
        component: PlumbersNearby,
    },
];
