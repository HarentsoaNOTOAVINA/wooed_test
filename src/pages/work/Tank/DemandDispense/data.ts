interface MainItem {
    id?: number;
    name?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    value?: string;
}

interface IDispenseForm {
    id: number;
    title: string;
    item: MainItem[];
    nameRadio?: string;
}

export const dispenseFormData: IDispenseForm[] = [
    {
        id: 0,
        title: 'Coords',
        item: [
            {
                id: 0,
                name: 'societyName',
                label: 'Nom et prénom/ Société',
                type: 'text',
                required: true,
            },
            {
                id: 1,
                name: 'adress',
                label: 'Adresse',
                type: 'text',
                required: true,
            },
            {
                id: 2,
                name: 'phon',
                label: 'Tél',
                type: 'number',
            },
            {
                id: 3,
                name: 'mail',
                label: 'Email',
                type: 'text',
                placeholder: 'aaa@aaa.com',
            },
        ],
    },
    {
        id: 1,
        title: 'Identification du site visé par la demande',
        item: [
            {
                id: 0,
                name: 'propertyAdress',
                label: 'Adresse',
                type: 'text',
            },
            {
                id: 1,
                name: 'firstReferenceCadastral',
                label: 'Référence cadastrale : (format: xxxxx_x_xxxx_x_xxx_xx)',
                type: 'text',
                placeholder: 'xxxxx_x_xxxx_x_xxx_xx',
            },
            {
                id: 2,
                name: 'secondReferenceCadastral',
                label: 'Référence cadastrale : (format: xxxxx_x_xxxx_x_xxx_xx)',
                type: 'text',
                placeholder: 'xxxxx_x_xxxx_x_xxx_xx',
            },
            {
                id: 3,
                name: 'thirdReferenceCadastral',
                label: 'Référence cadastrale : (format: xxxxx_x_xxxx_x_xxx_xx)',
                type: 'text',
                placeholder: 'xxxxx_x_xxxx_x_xxx_xx',
            },
            {
                id: 4,
                name: 'groundReference',
                label: 'Référence du dossier Sol: (si déjà existant)',
                type: 'text',
            },
            {
                id: 5,
                name: 'dateDeclaration',
                label: 'Date de la déclaration de conformité',
                type: 'date',
                placeholder: 'DD/MM/YYYY',
            },
        ],
    },
];

export const radioData = [
    {
        title: 'Fait générateur actuel (=éléments déclenchant l’application de l’ordonnance sol)',
        nameRadio: 'nameRadio1',
        item: [
            {
                label: 'Aliénation d’un droit réel (ex. vente) ',
                value: 'alienation',
            },
            {
                label: 'Cessation d’une activité à risque ',
                value: 'cessationActivity',
            },
            {
                label: 'Cession d’un permis d’environnement relatif à l’exploitation d’une activité à risque ',
                value: 'cessionPermisEnv',
            },
            {
                label: 'Prolongation d’un permis d’environnement relatif à l’exploitation d’une activité à risque(2) ',
                value: 'prolongation',
            },
            {
                label: 'Demande (d’extension) d’un permis d’environnement portant sur l’exploitation d’une activité à risque ',
                value: 'demandeExtension',
            },
            {
                label: 'Demande d’un permis d’urbanisme ou d’environnement visant des actes ou travaux en contact avec le sol sur plus de 20m² (3)',
                value: 'demandePermisUrba',
            },
        ],
    },
];

export const radioData1 = [
    {
        title: 'Type de dispense pour la reconnaissance de l’état du sol (RES). Dispense*',
        nameRadio: 'nameRadio2',
        item: [
            {
                label: '§2 - Vous souhaitez une dispense de réaliser une RES parce que vous demandez un permis d’environnement pour l’exploitation d’une activité à risque ou parce que vous demandez une extension d’un permis d’environnement avec exploitation d’une nouvelle activité à risque (cfr. art.13§3)',
                value: '§2',
            },
            {
                label: '§3 - Vous souhaitez une dispense de réaliser une (nouvelle) RES ou en limiter le contenu ',
                value: '§3',
            },
            {
                label: '§4 - Vous souhaitez une dispense de réaliser une RES dans le cadre du Fonds gasoil pour une aliénation de droits réels (cfr. art.13§1) ',
                value: '§4',
            },
            {
                label: '§4 - Vous souhaitez une dispense de réaliser une RES dans le cadre d’un permis d’environnement avec activité à risque (cfr. art.13§2,2°), une cessation d’activité à risque (cfr. art.13§2,1°), une demande de permis d’urbanisme (art.13§4) ou de permis d’environnement (cfr. art.13§5) pour autant que soient satisfaites les conditions cumulatives mentionnées en bas de ce formulaire. ',
                value: '§5',
            },
        ],
    },
];

export const radioSubData1 = [
    {
        id: 0,
        title: 'Votre parcelle est :',
        item: [
            {
                label: 'Non reprise à inventaire de l’état du sol',
                value: 'nonReprise',
            },
            {
                label: 'Reprise en catégorie 1, 2, 3 ou 4 ',
                value: 'reprise1234',
            },
            {
                label: 'Reprise en catégorie 0 (éventuellement combinée aux catégories 1, 2, 3 ou 4) et une RES, étude de risque sans risques ou une déclaration finale a été déclarée conforme il y a moins de 15 ans. ',
                value: 'reprise0',
            },
        ],
    },
];

export const radioSubData2 = [
    {
        id: 0,
        title: 'Raison :',
        item: [
            {
                label: 'Votre parcelle est reprise en catégorie 4 (éventuellement combinée à 0)',
                value: 'reprise4',
            },
            {
                label: 'Votre parcelle est reprise en catégorie 0 (éventuellement combinée à 1, 2, 3 ou 4) et des mesures préventives(3) ont été prises après la réalisation d’études de sol ',
                value: 'preprise0',
            },
            {
                label: 'Il existe une impossibilité technique de réaliser tout ou une partie des forages (4)(5)',
                value: 'forageImpossible',
            },
            {
                label: "Il existe une impossibilité de réaliser l'étude à cause d’une restriction de droit d’accès ou de propriété (4) ",
                value: 'accessRestriction',
            },
            {
                label: 'Il existe un risque de perturbation sérieuse de l’activité économique et l’activité n’a pas cessé (4)',
                value: 'pertubationRisk',
            },
            {
                label: 'Plusieurs exploitants sont actuellement présents sur votre parcelle (4) ',
                value: 'multipleExploits',
            },
        ],
    },
];

// export const uploadData = [
//     {
//         id: 0,
//         title : "Annexes",

//     }
// ]
