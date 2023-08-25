import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
import Maintains from '@/components/Icon/Maintains.vue';
import CalculCostIcon from '@/components/Icon/CalculCostIcon.vue';
import FilesIcon from '@/components/Icon/Files.vue';
import ExtendControlIcon from '@/components/Icon/ExtendControlIcon.vue';

interface IBoilerInstallation {
    id: number;
    name: string;
    label: string;
    icon?: Object;
}

export const installationMenu: IBoilerInstallation[] | any = [
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
        label: 'Trouver une entreprise agréée pour l’installation (et coût)',
        icon: Maintains,
    },
    {
        id: 3,
        name: 'featuresOfInstallation',
        label: 'Caractéristiques de l’installation',
        icon: CalculCostIcon,
    },
    {
        id: 4,
        name: 'acceptancePEB',
        label: 'Réception PEB de l’installation',
        icon: ExtendControlIcon,
    },
    {
        id: 5,
        name: 'documents',
        label: 'Documents',
        icon: FilesIcon,
    },
];
