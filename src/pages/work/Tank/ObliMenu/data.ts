interface IMenu {
    id: number;
    name: string;
    case?: string;
}

export const menuData: IMenu[] = [
    {
        id: 0,
        name: 'Vider et dégazer le réservoir',
        case: "clean&degas"
    },
    {
        id: 1,
        name: 'Faire nettoyer le reservoir et évacuez les déchets dangereux',
        case: 'clean',
    },
    {
        id: 2,
        name: 'Faire évacuer le réservoir',
        case: "evacuate"
    },
    {
        id: 3,
        name: 'Laisser en place le réservoir',
    },
    {
        id: 4,
        name: "Dois-je faire réaliser une reconnaissance de l'état du sol",
    },
];
