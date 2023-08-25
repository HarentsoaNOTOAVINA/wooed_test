interface MainItem {
    id: number;
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    // disable: boolean,
    // required: boolean
}

interface ICleanGarden {
    id: number;
    title: string;
    paragraph: string;
    item?: MainItem[];
}

interface IExpenseTotal {
    id: number;
    title: string;
    oneYear: string;
    oneMonth: string;
    expenseTotalFrom: string;
    expenseTotalRemain: string;
}

export const generatedYear = (): Array<object> => {
    const yearsGenerated: Array<object> = [];
    let max: number = new Date().getFullYear() + 10;
    let min: number = max - 10;
    for (var i = min; i <= max; i++) {
        yearsGenerated.push({ value: i, label: i });
    }
    return yearsGenerated;
};

// export const yearData:
export const expenseTotalData: IExpenseTotal = {
    id: 1,
    title: 'TOTAL DES DEPENSES',
    oneYear: 'Sur 1 année',
    oneMonth: 'Sur 1 mois',
    expenseTotalFrom: 'Total des dépenses depuis le 1er Janvier 2021',
    expenseTotalRemain:
        "Total des dépenses restantes jusqu'au 31 décembre 2021",
};

export const cleanGardData: ICleanGarden[] = [
    {
        id: 0,
        title: 'Nettoyage',
        paragraph: 'cout/facture',
        item: [
            {
                id: 0,
                name: 'costClean',
                label: 'Cout/Facture',
                type: 'upload',
            },
            {
                id: 1,
                name: 'nextDateEndClean',
                label: 'Prochaine échéance',
                type: 'date',
            },
            {
                id: 2,
                name: 'estimatedAmountClean',
                label: 'Montant prévisionnel',
                type: 'number',
            },
        ],
    },
    {
        id: 1,
        title: 'Jardinage',
        paragraph: 'cout/facture',
        item: [
            {
                id: 0,
                name: 'costGarden',
                label: 'Cout/facture',
                type: 'upload',
            },
            {
                id: 1,
                name: 'nextDateEndGarden',
                label: 'Prochaine échéance',
                type: 'date',
            },
            {
                id: 2,
                name: 'estimatedAmountGarden',
                label: 'Montant prévisionnel',
                type: 'number',
            },
        ],
    },
];
