interface IMenuRepair {
    id: string;
    label: string;
    value: string;
    case: string;
}

export const menuRepair: IMenuRepair[] = [
    {
        id: '0',
        label: "Les travaux de réparation touchent à l'étanchéité",
        value: "Les travaux de réparation touchent à l'étanchéité",
        case: 'etanche',
    },
    {
        id: '1',
        label: "Les travaux de réparation ne touchent pas à l'étanchéité",
        value: "Les travaux de réparation ne touchent pas à l'étanchéité",
        case: 'nonEtanche',
    },
];
