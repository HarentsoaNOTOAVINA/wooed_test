interface IattestationList {
    id: number;
    title: string;
    condition:string;
    item?: IItem[];
}

interface IItem {
    id: number;
    label: string;
}

const labels:Array<string> = [
    'Une déclaration de classe 3 introduite auprès de la commune',
    "Un permis d'environnement délivré par la commune",
    "Un permis d'environnement par Bruxelles-Environnement",
];

export const listTankCover: IattestationList[] = [
    {
        id: 0,
        title: 'Le reservoir est couvert par :',
        condition:"normal",
        item: [
            {
                id: 0,
                label: labels[0],
            },
            {
                id: 1,
                label: labels[1],
            },
            {
                id: 2,
                label: labels[2],
            },
        ],
    },
    {
        id: 1,
        title: 'le réservoir n’est pas couvert par un permis d’environnement mais le site où il se trouve est couvert par',
        condition:"normal",
        item: [
            {
                id: 0,
                label: labels[0],
            },
            {
                id: 1,
                label: labels[1],
            },
            {
                id: 2,
                label: labels[2],
            },
        ],
    },
    {
        id: 2,
        title: 'le réservoir et le site où il se trouve ne sont pas couverts par un permis d’environnement',
        condition: "typed"
    },
];
