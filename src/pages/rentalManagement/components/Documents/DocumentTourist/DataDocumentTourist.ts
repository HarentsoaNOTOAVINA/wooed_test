export interface PeriodOccupationInterface {
    label: string;
    startPeriod: string;
    endPeriod: string;
    contractFile: {
        name: string;
        path: string;
    };
}

export interface SelectOption {
    label: string;
    value: string;
}

export interface Data {
    title: string;
    name: string;
    selectOption: SelectOption[];
    periodOccupation: PeriodOccupationInterface[];
}

export const dataDocumentTourist: Data[] = [
    {
        title: 'Contrat de location',
        name: 'rentalContract',
        selectOption: [
            {
                label: '2022',
                value: '2022',
            },
            {
                label: '2023',
                value: '2023',
            },
        ],
        periodOccupation: [
            {
                label: 'Première période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
            {
                label: 'Seconde période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
        ],
    },
    {
        title: 'Etat des lieux',
        name: 'stateOfPlay',
        selectOption: [
            {
                label: '2022',
                value: '2022',
            },
            {
                label: '2023',
                value: '2023',
            },
        ],
        periodOccupation: [
            {
                label: 'Première période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
            {
                label: 'Seconde période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
        ],
    },
    {
        title: 'Garantie locative',
        name: 'rentalGuarantee',
        selectOption: [
            {
                label: '2022',
                value: '2022',
            },
            {
                label: '2023',
                value: '2023',
            },
        ],
        periodOccupation: [
            {
                label: 'Première période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
            {
                label: 'Seconde période d’occupation',
                startPeriod: '26/05/2023',
                endPeriod: '26/11/2023',
                contractFile: {
                    name: 'doc.pdf',
                    path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
                },
            },
        ],
    },
];