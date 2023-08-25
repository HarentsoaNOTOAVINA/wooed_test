import Elevator from '@/pages/work/Maintains/Elevator/Elevator.vue';
import TankMaint from '@/pages/work/Maintains/Tank/Tank.vue';
import BoilerMaint from '@/pages/work/Maintains/Boiler/Boiler.vue';

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

export const dataMenuMaintains: ISideMenu[] = [
    {
        key: 'elevator-maintains',
        label: 'Ascenseurs',
        icon: 'ElevatorIcon',
        component: Elevator,
    },
    {
        key: 'boiler-maintains',
        label: 'Chaudière',
        icon: 'BoilerIcon',
        component: BoilerMaint,
    },
    {
        key: 'tank-maintains',
        label: 'Citernes',
        icon: 'TankIcon',
        component: TankMaint,
        // hasSubMenu: true,
        // subMenu: [
        //     {
        //         id: 0,
        //         label: 'Enfoui',
        //         name: 'boured',
        //         icon: 'Help',
        //         component: Consumer,
        //     },
        //     {
        //         id: 1,
        //         label: 'Non enfoui',
        //         name: 'notBoured',
        //         icon: 'CreditCard',
        //         component: CopropertyCharge,
        //     },
        // ],
    },
];
