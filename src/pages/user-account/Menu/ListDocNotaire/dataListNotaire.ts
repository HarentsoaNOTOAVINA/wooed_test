interface ISub {
    id: number;
    name: string;
    label: string;
    value: string;
}

interface ListItem {
    id: number;
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    subOptions?: ISub[];
}

interface IsubChoose {
    label: string;
    value: string;
}
interface ChooseItem {
    align?: string;
    label: string;
    name: string;
    subChoose: IsubChoose[];
}

export const filterElement: ListItem = {
    id: 0,
    label: 'Filtre',
    name: 'filter',
    type: 'select',
    subOptions: [
        {
            id: 0,
            label: 'En attente',
            name: 'waiting',
            value: 'En attente de traitement',
        },
        {
            id: 1,
            label: 'En cours',
            name: 'progress',
            value: 'En cours de traitement',
        },
        {
            id: 2,
            label: 'Finaliser',
            name: 'finalization',
            value: 'Finalisation du traitement',
        },
    ],
};

export const radioElement: ChooseItem = {
    label: 'Compromis ou Acte de vente',
    name: 'Choose',
    align: 'horizontal',
    subChoose: [
        {
            label: 'Tous',
            value: 'all',
        },
        {
            label: 'Compromis de vente',
            value: 'waitingSaleAgreement',
        },
        {
            label: 'Acte de vente',
            value: 'waitingDeedSale',
        },
    ],
};
