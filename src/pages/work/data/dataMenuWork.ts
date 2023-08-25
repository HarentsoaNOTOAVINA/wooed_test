import TranformationIcon from '@/components/Icon/WorkTransformationIcon.vue';
import WorkBoilerIcon from '@/components/Icon/WorkBoilerIcon.vue';
import WorkEmergencyIcon from '@/components/Icon/WorkEmergencyIcon .vue';
import WorkMaintainsWorkIcon from '@/components/Icon/WorkMaintainsIcon.vue';
import WorkTankIcon from '@/components/Icon/WorkTankIcon.vue';

interface IMenuWork {
    label: string;
    nameRoute: string;
    icon?: object;
}

export const dataMenuWork: IMenuWork[] | any = [
    {
        label: 'Travaux de transformation',
        nameRoute: 'transformation-works',
        icon: TranformationIcon,
    },
    {
        label: 'Travaux urgents',
        nameRoute: 'work-emergency',
        icon: WorkEmergencyIcon,
    },
    {
        label: 'Travaux d’entretien',
        nameRoute: 'work-maintains',
        icon: WorkMaintainsWorkIcon,
    },
    {
        label: 'Travaux à la citerne',
        nameRoute: 'work-tanks',
        icon: WorkTankIcon,
    },
    {
        label: 'Travaux à la chaudière',
        nameRoute: 'work-boiler',
        icon: WorkBoilerIcon,
    },
];
