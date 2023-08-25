/**@start icon */
import BuildingHouse from '@/components/Icon/ProfilAccount/BuildingHouse.vue';
import Ads from '@/components/Icon/ProfilAccount/Ads.vue';
import Alert from '@/components/Icon/ProfilAccount/Alert.vue';
import Gift from '@/components/Icon/ProfilAccount/Gift.vue';
import GroupAccount from '@/components/Icon/ProfilAccount/GroupAccount.vue';
import HalfEye from '@/components/Icon/ProfilAccount/HalfEye.vue';
import House from '@/components/Icon/ProfilAccount/House.vue';
import MoneyBag from '@/components/Icon/ProfilAccount/MoneyBag.vue';
import Payement from '@/components/Icon/ProfilAccount/Payement.vue';
import PeopleRobbery from '@/components/Icon/ProfilAccount/PeopleRobbery.vue';
import Time from '@/components/Icon/ProfilAccount/Time.vue';
import Work from '@/components/Icon/ProfilAccount/Work.vue';
import AppointmentIcon from '@/components/Icon/Appointment.vue';
import MyAlertsIcon from '@/components/Icon/MyAlerts.vue';
import MySolicitationIcon from '@/components/Icon/MySolicitation.vue';
import Agenda from '@/components/Icon/Agenda.vue';
import Promotion from '@/components/Icon/ProfilAccount/Promotion.vue';

import List from '@/components/Icon/SquareList.vue'; // remove this icon later, we put it here only for "syndic" functionality test

/**@end icon */

/**@start menu */
import AgenciesList from '../AgenciesList/AgenciesList.vue';
import PurchasesList from '../Purchases/PurchasesList.vue';
import Factures from '../Factures.vue';
import SellerIndex from '../Purchases/Seller/index.vue';
import UserPublications from '../UserPublication/UserPublication.vue';
import Wishlist from '../Wishlist/Wishlist.vue';
import Compromise from '@/pages/index.vue';
import SentOfferLease from '@/pages/lease/offer/components/sent.vue';
import ReicevedOfferLease from '@/pages/lease/offer/components/received.vue';
import MoreInfo from '../MoreInfo/moreInfo.vue';
import Space from '../Space/Space.vue';
import Appointment from '@/pages/doodle/Appointment/Appointment.vue';
import MyAlerts from '@/pages/user-account/Menu/MyAlerts/MyAlerts.vue';
import Promotions from '@/pages/user-account/Menu/Promotions/Promotions.vue';
import MySolicitations from '../../Menu/MySolicitations/MySolicitations.vue';
import Info from '@/components/Icon/Info.vue';
import World from '@/components/Icon/World.vue';
import WAgenda from '@/pages/user-account/Menu/WAgenda/index.vue';
/**@end menu */

export const BTN_MENU: Array<{
    label: string;
    value: any;
    icon: any;
    type: string;
}> = [
    {
        label: 'Mes infos',
        value: MoreInfo,
        icon: Info,
        type: 'secondary',
    },
    {
        label: 'Espace',
        value: Space,
        icon: World,
        type: 'secondary',
    },
];

export const MENU_LIST: Array<{
    label: string;
    value: any;
    icon: any;
    submenu?: { [key: string]: any }[];
}> = [
    // {
    //     label: 'Mes agences',
    //     value: AgenciesList,
    //     icon: BuildingHouse,
    // },
    {
        label: 'Mes annonces',
        value: UserPublications,
        icon: Ads,
    },
    
    // {
    //     label: 'Mes factures',
    //     value: Factures,
    //     icon: Payement,
    // },
    {
        label: 'Offres reçus',
        value: SellerIndex,
        icon: House,
    },
    {
        label: 'Mes wishlist',
        value: Wishlist,
        icon: Gift,
    },
    // {
    //     label: 'Mes derniers biens visités',
    //     value: 'lastVisitedProperties',
    //     icon: HalfEye,
    // },
    // {
    //     label: 'Mes alertes',
    //     value: 'alerts',
    //     icon: Alert,
    // },
    {
        label: 'Mes achats',
        value: PurchasesList,
        icon: MoneyBag,
    },
    {
        label: 'Mes offres de location',
        value: SentOfferLease,
        icon: Work,
        submenu: [
            {
                label: 'Mes offres envoyées',
                value: SentOfferLease,
            },
            {
                label: 'Mes offres reçues',
                value: ReicevedOfferLease,
            },
        ],
    },
    {
        label: 'Mes rendez-vous',
        value: Appointment,
        icon: AppointmentIcon,
    },
    {
        label: 'Mes alertes',
        value: MyAlerts,
        icon: MyAlertsIcon,
    },
    {
        label: 'Mes promotions',
        value: Promotions,
        icon: Promotion,
    },
    {
        label: 'Mes sollicitations',
        value: MySolicitations,
        icon: MySolicitationIcon,
    },
    {
        label: 'Je suis un syndic',
        value: undefined,
        icon: Ads,
    },
    {
        label: 'W-Agenda',
        value: WAgenda,
        icon: Ads,
    },
    // {
    //     label: 'Ma copropriété',
    //     value: undefined,
    //     icon: Ads
    // }
    // {
    //     label: 'Mes alertes',
    //     value: MyAlerts,
    //     icon: Work,
    // },
    // {
    //     label: 'Mes offres de travaux',
    //     value: 'workOffers',
    //     icon: Work,
    // },
    // {
    //     label: 'Mes comptabilités',
    //     value: 'accounts',
    //     icon: GroupAccount,
    // },
    // {
    //     label: 'Mes rendez-vous',
    //     value: 'dating',
    //     icon: PeopleRobbery,
    // },
    // {
    //     label: 'Mes disponibilités',
    //     value: 'availability',
    //     icon: Time,
    // },
    // {
    //     label: 'Compromis',
    //     value: Compromise,
    //     icon: MoneyBag,
    // },
];
