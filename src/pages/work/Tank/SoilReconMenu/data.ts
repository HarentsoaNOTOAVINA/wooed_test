interface IMenu {
    id?: number;
    icon?: object;
    name: string;
    case?:string;
}

export const menuData: IMenu[] = [
    {
        id: 0,
        icon: {},
        name: 'Le reservoir a une contenance supérieure à 10.000 litres',
    },
    {
        id: 1,
        icon: {},
        name: 'Le reservoir a une contenance de égale ou inférieure à 10.000 litres',
    },
];


export const officeMenu: IMenu[] = [
    {
        // id: 0,
        name: "Trouver un expert en pollution du sol",
        case: "expert"
    },
    {
        // id: 1,
        name: "Calculer le cout 'Moyenne'",
        case: "cost"
    },
    {
        // id: 2,
        name: ""
    },
]