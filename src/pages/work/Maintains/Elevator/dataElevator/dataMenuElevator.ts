import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
import FindCompanyIcon from '@/components/Icon/FindCompanyIcon.vue';
import CalculCostIcon from '@/components/Icon/CalculCostIcon.vue';

interface IElevator {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const elevatorMenu: IElevator[] | any = [
    {
        id: 0,
        name: 'regulation',
        label: 'Règlementation',
        icon: RegulationIcon,
    },
    {
        id: 1,
        name: 'findCompany',
        label: 'Trouver une entreprise d’entretien d’ascenseurs certifiée ISO 9001',
        icon: FindCompanyIcon,
    },
    {
        id: 2,
        name: 'calculCost',
        label: 'Calculer le coût',
        icon: CalculCostIcon,
    },
];
