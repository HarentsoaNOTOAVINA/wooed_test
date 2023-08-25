interface ITankMenu {
    id: number;
    name: string;
    case?: string;
}

export const dataMenu: ITankMenu[] = [
    {
        id: 0,
        name: 'Demander la dispense',
        case: 'dispense',
    },
    {
        id: 1,
        name: 'Demander à votre notaire de solliciter la dispense',
        case: 'notary',
    },
];

export const title: string =
    'Il existe toutefois des hypothèses dans lesquelles vous êtes dispensé de réaliser une reconnaissance de l’état du sol';

export const subtitle1: string =
    'Si le terrain a déjà fait l’objet d’une RES déclarée conforme il y a moins d’un an,';

export const section: string =
    'vous ne devez pas refaire d’étude. Cette dispense vous est automatiquement accordée si vous disposez de la déclaration de conformité datant de moins d’un an, aucune démarche supplémentaire n’est nécessaire';

export const subtitle2: string = 'Aliénation de droit réels (vente)';

export const section2: string =
    'La dispense peut être demandée pour une aliénation de droits dans les cas suivants :';

export const subSection: string[] = [
    ' Si la parcelle est en catégorie 0 ou dans une autre catégorie combinée à la catégorie 0 mais les activités à risque motivant la catégorie 0 ne sont pas encore en exploitation. Cette dispense ne doit pas être demandée, une simple déclaration chez le notaire suffit.',
    'Si vous êtes copropriétaire et que la présomption de pollution ne concerne pas exclusivement votre lot (par exemple si vous possédez un appartement dans une copropriété qui dispose d’une citerne à mazout de plus de 10.000 l pour chauffer tout l’immeuble)',
];
export const subtitle3: string = 'Pour tout fait générateur,';
export const subSectionList: string[] = [
    'Votre parcelle est reprise en catégorie 4 (éventuellement combinée à la catégorie 0)',
    'Votre parcelle est reprise en catégorie 0 (éventuellement combinée aux catégories 1, 2, 3 ou 4) et sur laquelle des mesures préventives ont été prises après la réalisation d’études de sol',
    'Il existe une impossibilité technique de réaliser tout ou une partie des forages',
    'Il existe une impossibilité technique à cause d’une restriction de droit d’accès ou de propriété',
    'Il existe un risque de perturbation sérieuse de l’activité économique et l’activité n’a pas cessé',
    'Plusieurs exploitants sont actuellement présents sur votre parcelle.',
];
