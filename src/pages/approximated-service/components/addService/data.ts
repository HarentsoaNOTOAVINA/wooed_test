interface List {
    id?: number | string;
    label: string;
    name: string;
    type: string;
    hasMap?: boolean;
    required?: boolean;
    value?: '';
}

export const inputList: List[] = [
    {
        id: 'address',
        label: 'Adresse',
        name: 'address',
        type: 'input',
        hasMap: true,
        required: true,
        value: '',
    },
];
