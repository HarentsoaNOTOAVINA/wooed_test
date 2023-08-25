import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
import FilesIcon from '@/components/Icon/Files.vue';

interface IBoilerRepair {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const repairMenu: IBoilerRepair[] = [
    {
        id: 0,
        name: 'emergencyRepair',
        label: 'Réparations urgentes',
        icon: RegulationIcon,
    },
    {
        id: 1,
        name: 'other',
        label: 'Autres',
        icon: FilesIcon,
    },
];
