interface List {
    id: number;
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    typeVieuw?: string;
    info  ?: string
}

export const overTheCounterSaleFields: List[] = [
    {
        id: 0,
        label: 'Prix demandé',
        name: 'prices',
        required: true,
        type: 'number',
        typeVieuw: 'fieldInput',
    },
    {
        id: 2,
        label: 'Date limite de soumission des offres',
        name: 'submissionDuration',
      //   required: true,
        typeVieuw: 'fieldDate',
    },
    // {
    //       id : 1,
    //       label : "Offre à partir de",
    //       name : "reservePrice",
    //       required : true,
    //       type : "number",
    // }
];
export const publicSaleFields: List[] = [
    {
        id: 0,
        label: 'Prix de départ',
        name: 'startPrice',
        required: true,
        type: 'number',
    },

    {
        id: 1,
        label: 'Prix plancher',
        name: 'floorPrice',
        required: true,
        type: 'number',
        typeVieuw: 'fieldInput',
    },

    {
        id: 2,
        label: 'Date de début des enchères souhaitez',
        name: 'startSaleDate',
        required: true,
        typeVieuw: 'fieldDate',
        info : "Sous réserve du confirmation du notaire instrumentant"
    },
    {
        id: 3,
        label: 'Date de fin des enchères',
        name: 'endSaleDate',
        required: true,
        typeVieuw: 'fieldDate',
    },
];

export const priceLocation = [
    {
        id: 0,
        label: 'Montant du loyer mensuel',
        name: 'prices',
        required: true,
        type: 'number',
    },
    {
        id: 1,
        label: 'Provision pour charge',
        name: 'provisionForCharges',
        required: true,
        type: 'number',
    },
    {
        id: 2,
        label: 'Contribution mensuelle pour le nettoyage',
        name: 'cleaningContribution',
        required: true,
        type: 'number',
    },
    {
        id: 3,
        label: 'Garantie locative exigée',
        name: 'rentalGuaranteeRequiredAmount',
        required: true,
        type: 'number',
    },
];
