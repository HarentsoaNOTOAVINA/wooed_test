import TanksNotBuried from '@/components/Icon/TanksNotBuried.vue';
import OtherTanks from '@/components/Icon/OtherTanks.vue';

interface ISideMenu {
    id: number;
    key:string;
    label: string;
    icon: string;
    component: object;
}

export const dataMenuTanks: ISideMenu[] = [
    {
        id: 0,
        key: "a",
        label: 'Non enfouies de 3000 litres',
        icon: 'TanksNotBuried',
        component: TanksNotBuried,
    },
    {
        id: 1,
        key: "b",
        label: 'Autres',
        icon: 'OtherTanks',
        component: OtherTanks,
    },
];
