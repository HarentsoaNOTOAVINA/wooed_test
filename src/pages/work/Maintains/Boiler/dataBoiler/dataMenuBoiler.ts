import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
import FindCompanyIcon from '@/components/Icon/FindCompanyIcon.vue';
import CalculCostIcon from '@/components/Icon/CalculCostIcon.vue';
import FilesIcon from '@/components/Icon/Files.vue';
import ExtendControlIcon from '@/components/Icon/ExtendControlIcon.vue';

interface IBoiler {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const boilerMenu: IBoiler[] |any = [
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
        label: 'Trouver un technicien chaudière agréé',
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
        name: 'extentControl',
        label: 'Etendue du contrôle',
        icon: ExtendControlIcon,
    },
    {
        id: 5,
        name: 'powerMore20',
        label: 'Chaudières présentant une puissance de 20 KW ou plus',
        icon: FindCompanyIcon,
    },
    {
        id: 6,
        name: 'powerLess20',
        label: 'Chaudières présentant une puissance de moins de 20 kW',
        icon: ExtendControlIcon,
    },
    {
        id: 7,
        name: 'periodicInspection',
        label: ' Contrôle périodique d’une installation de chauffage central',
        icon: FilesIcon,
    },
    {
        id: 7,
        name: 'historyControl',
        label: 'Historique du contrôle',
        icon: ExtendControlIcon,
    },
];
