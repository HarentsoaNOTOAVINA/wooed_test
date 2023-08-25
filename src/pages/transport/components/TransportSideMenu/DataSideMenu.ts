import { defineAsyncComponent } from 'vue';

const TransportMenu = defineAsyncComponent(() => import('@/pages/transport/components/TransportMenu.vue'));
const Announce = defineAsyncComponent(() => import('@/pages/transport/components/Announce.vue'));
const Delivery = defineAsyncComponent(() => import('@/pages/transport/components/Delivery.vue'));
const Trajet = defineAsyncComponent(() => import('@/pages/transport/components/Trajet.vue'));
const PurposeTarget = defineAsyncComponent(() => import('@/pages/transport/components/targetPurpose/targetPurpose.vue'));

interface SubMenu {
    id: number;
    label: string;
    name?: string;
    routeName?: string;
    icon?: string;
    component?: object;
}
interface ISideMenu {
    id: number;
    label: string;
    name?: string;
    icon?: string;
    subMenu?: SubMenu[];
    component?: object;
    routeName?: string;
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: 'Transport',
        name: 'menu',
        icon: 'MenuTransport',
        subMenu: [
            {
                id: 11,
                label: 'Expédier ou recevoir un colis',
                name: 'sendReceivePackage',
                routeName: 'transport-create-announcement',
                component: TransportMenu,
            },
            {
                id: 12,
                label: 'Proposer un trajet',
                name: 'purposeTarget',
                routeName: 'transport',
                component: PurposeTarget,
            },
            {
                id: 12,
                label: 'Consulter les annonces',
                name: 'announcements',
                routeName: 'transport-announcements',
                component: Announce,
            },
        ],
    },
    // {
    //     id: 2,
    //     label: "Vos colis",
    //     name: "cocolis",
    //     icon: 'UserCocolis',
    // subMenu: [
    //     {
    //         id: 21,
    //         label: "Parrainerun ami",
    //         name: "parrainage",
    //         component: Parrainage
    //     },
    //     {
    //         id: 22,
    //         label: "Informations personnelles",
    //         name: "info",
    //         component: PersonalInformation
    //     },
    //     {
    //         id: 23,
    //         label: "Coordonnees bancaires",
    //         name: "coordonnee",
    //         component: BankDetails
    //     },
    //     {
    //         id: 24,
    //         label: "Notifications",
    //         name: "notification",
    //         component: Notification
    //     },
    // ]
    // },
    {
        id: 3,
        label: 'Mes annonces',
        name: 'announce',
        icon: 'MegaphoneTransport',
        routeName: 'transport',
        component: Announce,
    },
    {
        id: 4,
        label: 'Livraison',
        name: 'livraison',
        icon: 'Livraison',
        routeName: 'transport',
        component: Delivery,
    },
    {
        id: 5,
        label: 'Trajet',
        name: 'trajet',
        icon: 'Trajet',
        routeName: 'transport',
        component: Trajet,
    },
    // {
    //     id: 6,
    //     label: "Payement",
    //     name: "payement",
    //     icon: 'Payment',
    //     component: Payment
    // },
];
