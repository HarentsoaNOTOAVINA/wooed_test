import Redraw from '@/components/Icon/Redraw.vue';
import ListBullet from '@/components/Icon/ListBullet.vue';

interface IMenu {
    id: number;
    icon: string;
    name: string;
    label: string;
    component: object;
}

export const menu: IMenu[] = [
    {
        id: 0,
        icon: 'Redraw',
        name: 'Redraw',
        label: 'Redessiner votre quartier',
        component: Redraw,
    },
    {
        id: 1,
        icon: 'ListBullet',
        name: 'Liste',
        label: 'Liste',
        component: ListBullet,
    },
];
