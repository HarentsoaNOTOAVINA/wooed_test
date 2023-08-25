import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
import FindCompanyIcon from '@/components/Icon/FindCompanyIcon.vue';
import CalculCostIcon from '@/components/Icon/CalculCostIcon.vue';
import FilesIcon from '@/components/Icon/Files.vue';
import ExtendControlIcon from '@/components/Icon/ExtendControlIcon.vue';

interface ITank {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const tankMenu: ITank[] | any= [
    {
        id: 0,
        name: 'regulation',
        label: 'Règlementation',
        icon: RegulationIcon,
    },
    {
        id: 1,
        name: 'documentation',
        label: 'Documentation',
        icon: FilesIcon,
    },
    {
        id: 2,
        name: 'findCompany',
        label: 'Trouver un expert agréé',
        icon: FindCompanyIcon,
    },
    {
        id: 3,
        name: 'calculCost',
        label: 'Calculer le coût',
        icon: CalculCostIcon,
    },
    {
        id: 4,
        name: 'control',
        label: 'Historique du contrôle',
        icon: ExtendControlIcon,
    },
];
