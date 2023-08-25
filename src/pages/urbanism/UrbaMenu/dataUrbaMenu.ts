import Status from '@/components/Icon/Status.vue';
import Globe from '@/components/Icon/Globe.vue';
import AddProject from '@/components/Icon/AddProject.vue';
import BellNotif from '@/components/Icon/BellNotif.vue';
import Licence from '@/components/Icon/Licence.vue';
import Redraw from '@/components/Icon/Redraw.vue';

interface IMenu {
    id: number;
    icon: string;
    name: string;
    label: string;
    component: object;
    condition: string;
}

export const menu: IMenu[] = [
    {
        id: 0,
        icon: 'Status',
        name: 'status',
        label: 'Status urbanistique du bien',
        component: Status,
        condition: 'status',
    },
    {
        id: 1,
        icon: 'Globe',
        name: 'Globe',
        label: 'Enquete publiques en cours',
        component: Globe,
        condition: 'inquiry',
    },
    {
        id: 2,
        icon: 'AddProject',
        name: 'AddProject',
        label: 'Nouveau projet immobilier',
        component: AddProject,
        condition: 'newProject',
    },
    // {
    //     id: 3,
    //     icon: 'BellNotif',
    //     name: 'BellNotif',
    //     label: "M 'informer d'une notification",
    //     component: BellNotif,
    //     condition: "notif"
    // },
    // {
    //     id: 4,
    //     icon: 'Licence',
    //     name: 'Licence',
    //     label: "Introduire un permis d'urbanisme",
    //     component: Licence,
    //     condition: "licence"
    // },
    {
        id: 5,
        icon: 'Redraw',
        name: 'Redraw',
        label: 'Redessiner votre quartier',
        component: Redraw,
        condition: 'redraw',
    },
];
