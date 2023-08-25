export interface itemsFindBike {
    id: number;
    parentId?: number;
    country: string;
    path: {
        link?: string;
        id?: number;
        name?: string;
        type?: string;
        info?: boolean;
    };
    paths?: itemsPaths[];
    condition?: boolean;
    type?: string;
}

interface itemsPaths {
    id: number;
    name?: string;
    type?: string;
    info?: boolean;
}

export const dataFindBikes: itemsFindBike[] = [
    {
        id: 1,
        country: 'BE',
        path: { link: 'https://app.bikebank.be/fr/search' },
    },
    {
        id: 2,
        country: 'LU',
        condition: true,
        type: 'alert',
        parentId: 3,
        path: {
            id: 1,
            name: 'Si votre vélo (enregistré sur bicycode.eu) est retrouvé, un mail vous informera des coordonnées du commissariat où venir le récupérer. ',
            type: 'mail',
            info: true,
        },
    },
    {
        id: 3,
        country: 'FR',
        condition: true,
        type: 'alert',
        path: {
            id: 1, // type: 'mail',
            name: 'Si votre vélo (enregistré sur bicycode.eu) est retrouvé, un mail vous informera des coordonnées du commissariat où venir le récupérer. ',
            info: true,
            link: 'https://www.decathlon.fr/store-locator ',
        },
    },
];
