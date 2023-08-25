interface IMenuData {
    id: number;
    label: string;
    case: string;
}

export const title: string =
    "Les travaux de réparation touchent à l'étanchéité";

export const menuData: IMenuData[] = [
    {
        id: 0,
        label: '1- Vous devez faire appel à un expert en installation de stockage',
        case: 'expert',
    },
    {
        id: 1,
        label: "2- Envoyez les attestations de réparation à l'autorité résponsable",
        case: 'authority',
    },
];
