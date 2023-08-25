import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import WorkType from '../WorkType.vue';
import CalculateCost from '../CalculateCost.vue';
import ContractorContracting from '../ContractorContracting.vue';
import RequestBounty from '../RequestBounty.vue';
import Urbanism from '../Urbanism.vue';

interface SubMenu {
    id: number;
    label: string;
    component?: object;
}

interface Menu {
    id: number;
    label: string;
    icon: object;
    children?: Array<number>;
    subMenu?: SubMenu[];
    component?: object;
}

export const data: Menu[] = [
    {
        id: 0,
        label: 'Type de travaux',
        icon: DefaultMenu,
        children: [0],
        subMenu: [
            {
                id: 0,
                label: 'Type de travaux',
                component: WorkType,
            },
        ],
    },
    {
        id: 1,
        label: 'Calculer le coût',
        icon: DefaultMenu,
        children: [1],
        subMenu: [
            {
                id: 1,
                label: 'Calculer le coût',
                component: CalculateCost,
            },
        ],
    },
    {
        id: 2,
        label: 'Trouver un entrepreneur',
        icon: DefaultMenu,
        children: [2],
        subMenu: [
            {
                id: 2,
                label: 'Contracter avec l’entrepreneur',
                component: ContractorContracting,
            },
        ],
    },
    {
        id: 3,
        label: 'Règle applicable',
        icon: DefaultMenu,
        children: [3],
        subMenu: [
            {
                id: 3,
                label: 'Règle applicable',
                component: Urbanism,
            },
        ],
    },
    // {
    //     id: 2,
    //     label: "Trouver un entrepreneur",
    //     icon: DefaultMenu,
    //     children: [2, 3],
    //     subMenu: [
    //         {
    //             id: 2,
    //             label: "Contracter avec l’entrepreneur",
    //             component: ContractorContracting,
    //         },
    //         {
    //             id: 3,
    //             label: "Demander une prime",
    //             component: RequestBounty,
    //         }
    //     ]

    // },
    // {
    //     id: 4,
    //     label: "Urbanisme",
    //     icon: DefaultMenu,
    //     children: [4],
    //     subMenu: [
    //         {
    //             id: 4,
    //             label: "Urbanisme",
    //             component: Urbanism,
    //         },
    //     ]

    // },
];
