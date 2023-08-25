interface ITankMenu {
    id: number;
    name: string;
    case?: string;
}

export const dataMenu:ITankMenu[] = [
    {
        id: 0,
        name: "Je souhaite évacuer le réservoir",
        case:"remove"
    },
    {
        id: 1,
        name: "Je souhaite laisser en place le réservoir",
        case:"let"
    },
]