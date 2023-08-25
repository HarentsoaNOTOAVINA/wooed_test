import Maintains from '@/components/Icon/Maintains.vue';
import ExtendControlIcon from '@/components/Icon/ExtendControlIcon.vue';

interface IBoilerMove {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const moveMenu: IBoilerMove[] | any = [
    {
        id: 0,
        name: 'authorization',
        label: 'Demander l’autorisation à l’autorité responsable',
        icon: ExtendControlIcon,
    },
    {
        id: 1,
        name: 'findExpert',
        label: 'Trouver une expert',
        icon: Maintains,
    },
];
