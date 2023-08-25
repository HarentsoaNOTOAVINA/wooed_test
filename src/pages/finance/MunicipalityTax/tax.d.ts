interface TypesTaxes {
    id: number;
    postalCode: number;
    municipality: string;
    eNotariatPI: number;
    municipalTax: number;
    additionalCents: number;
    additionalProvincialCents: number;
    province: string;
    region: string;
    country: string;
    eNotariatRCNI: string;
    municipalTaxDetails: [
        {
            id: number;
            title: string;
            type: string;
            triggerEvent: string;
            link: string;
            taxValues: [
                {
                    id: number;
                    title: string;
                    value: number;
                    unit: string;
                }
            ];
        }
    ];
}