/**@start icon */
// import BuildingHouse from '@/components/Icon/ProfilAccount/BuildingHouse.vue';
import DocumentIcon from '@/components/Icon/Document.vue';
import { MENU_LIST } from '@/pages/user-account/Menu/AsideMenu/account.data';

/**@end icon */

/**@start menu */
import ListDocNotary from '@/pages/user-account/Menu/ListDocNotaire/ListDocNotaire.vue';
/**@end menu */

export const MENU_LIST_NOTARY: Array<{
    label: string;
    value: any;
    icon: any;
}> = [
    {
        label: 'Mes documents',
        value: ListDocNotary,
        icon: DocumentIcon,
    },
    ...MENU_LIST,
];
