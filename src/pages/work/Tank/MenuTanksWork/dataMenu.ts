import WorkMaintains from '@/components/Icon/WorkMaintainsIcon.vue';
import Wrench from '@/components/Icon/Wrench.vue';
import Tank from '@/components/Icon/Tank.vue';
import Replace from '@/components/Icon/Replace.vue';

interface ITankMenu {
    id: number;
    label: string;
    icon?: object;
    case?: string;
}

export const tankMenu: ITankMenu[] = [
    {
        id: 0,
        label: "Travaux d'entretient",
        icon: WorkMaintains,
        case: 'maintain',
    },
    {
        id: 1,
        label: 'Travaux de réparation',
        icon: Wrench,
        case: 'repair',
    },
    {
        id: 2,
        label: 'Doubler la paroi d’un réservoir existante simple paroi ',
        icon: Tank,
        case: 'double',
    },
    {
        id: 3,
        label: 'Remplacer le réservoir',
        icon: Replace,
        case: 'replace',
    },
];

const a = [
    {
        category: 51,
        subsection: '/api/immo/v2/subsections/239',
        name: '"Doubler la paroi d�un réservoir existante simple paroi"',
    },
    {
        category: 52,
        subsection: '/api/immo/v2/subsections/239',
        name: '"Remplacer le réservoir"',
    },
    {
        category: 55,
        subsection: '/api/immo/v2/subsections/239',
        name: '"Travaux de réparation"',
    },
    {
        category: 58,
        subsection: '/api/immo/v2/subsections/239',
        name: '"Mettre définitivement hors service le réservoir"',
    },
    {
        category: 62,
        subsection: '/api/immo/v2/subsections/239',
        name: '"Entretien"',
    },
];

const x = {
    id: 1,
    label: 'Travaux de réparation',
    icon: {
        __hmrId: 'b3ae4dc2',
        __file: 'C:/Users/Andy/Projects/MyAgency/immoV3/immoV3/src/components/Icon/Wrench.vue',
    },
    case: 'repair',
};
