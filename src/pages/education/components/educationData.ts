import Consultation from '@/components/Icon/Consultation.vue';
import QuarterCommittee from '@/components/Icon/QuarterCommittee.vue';
// import NeighborhoodCommittee from '@/components/Icon/NeighborhoodCommittee.vue';
import Service from '@/components/Icon/Service.vue';
import Education from '@/components/Icon/Education.vue';

interface IMenu {
    id: number;
    icon: string;
    name: string;
    label: string;
    component: object;
}

interface IButton {
    id: number;
    label: string;
    icon: string;
    case?: string;
    path?: string | any;
}

interface IDataSelectnRadio {
    label: string;
    value: string;
}

interface IForm {
    id: number;
    dataRadio: IDataSelectnRadio[];
}

interface IMap {
    text: string;
}

export const mapElement: IMap = {
    text: 'Dessiner le périmètre géographique sur la carte',
};

interface IItemSelect {
    id: number;
    name: string;
    label: string;
    // options: Array<object>
}
interface ISelect {
    item: IItemSelect[];
}

export const selectData: ISelect[] = [
    {
        item: [
            {
                id: 0,
                name: 'schoolChoice',
                label: 'Liste des écoles',
            },
            {
                id: 1,
                name: 'classChoice',
                label: 'Classe',
            },
        ],
    },
];

export const educationBtnInside: IButton[] = [
    {
        id: 0,
        label: 'Plans écoles et creches',
        icon: 'Cart',
        case: 'plan',
    },
    {
        id: 1,
        label: "Investissements massifs pour la rénovation des 16 Ecoles fondamentales, des 2 Académies et de l'Ecole de Promotion sociale de la Commune de Molenbeek Saint Jean",
        icon: 'ArrowNext',
        case: 'redirect',
        path: 'https://www.anderlecht.be/sites/default/files/medias/Files/developpement-urbain/FR/04-PCD/04-07.pdf',
    },
];

export const educationBtn: IButton[] = [
    {
        id: 0,
        label: "Plan 'école' de ma commune",
        icon: 'Cart',
        case: 'education',
    },
    {
        id: 1,
        label: 'Communauté',
        icon: 'ArrowNext',
        case: 'commitee',
    },
];

export const sideBarMenu: IMenu[] = [
    {
        id: 0,
        icon: 'Consultation',
        name: 'consultation',
        label: 'Consultation',
        component: Consultation,
    },
    {
        id: 1,
        icon: 'QuarterCommittee',
        name: 'commitee',
        label: 'Comité de quartier',
        component: QuarterCommittee,
    },
    {
        id: 2,
        icon: 'Service',
        name: 'service',
        label: 'Divers service',
        component: Service,
    },
    {
        id: 3,
        icon: 'Education',
        name: 'education',
        label: 'Education',
        component: Education,
    },
];
