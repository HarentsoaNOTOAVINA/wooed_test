/**@start icon */
import BuildingHouse from '@/components/Icon/ProfilAccount/BuildingHouse.vue';
import Ads from '@/components/Icon/ProfilAccount/Ads.vue';
import Payement from '@/components/Icon/ProfilAccount/Payement.vue';

/**@end icon */

/**@start menu */
import Publication from '../Publication/Publication.vue';
/**@end menu */

export const MENU_LIST: Array<{
    label: string;
    value: any;
    icon: any;
}> = [
    {
        label: 'Mes annonces',
        value: Publication,
        icon: Ads,
    },
    {
        label: 'Personnes',
        value: 'Personnes',
        icon: BuildingHouse,
    },
    {
        label: 'Mes factures',
        value: 'factures',
        icon: Payement,
    },
];
