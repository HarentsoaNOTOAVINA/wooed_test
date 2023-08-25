import { ref, onMounted } from 'vue';
import Financial from '@/services/FinancialService';

export default function useCapitalGainConst() {
    interface TypesElement {
        label: string;
        radioData?: Array<{ label: string; value: string | number }>;
        name: string;
        placeholder?: string;
        type?: string;
    }

    const isLoad = ref<boolean>(false);
    const belgiumElt = ref<TypesElement[]>([]);
    const luxemburgElt = ref<TypesElement[]>([]);
    const resaleInputBelgium = ref<TypesElement[]>([
        {
            label: 'Prix de revente',
            name: 'resellPrice',
            placeholder: '0.00 €',
            type: 'number',
        },
        {
            label: 'Montant provisionnel de travaux',
            name: 'workPrice',
            placeholder: '0.00 €',
            type: 'number',
        },
    ]);
    const creditInputBelgium = ref<TypesElement[]>([
        {
            label: 'Montant du crédit',
            name: 'credit',
            placeholder: '0.00 €',
            type: 'number',
        },
        {
            label: 'Durée du crédit',
            name: 'creditTime',
            placeholder: '0 j',
            type: 'number',
        },
        {
            label: 'Taux d’interet',
            name: 'creditInteret',
            placeholder: '0.00%',
            type: 'number',
        },
        {
            label: 'Montant hypothyquete',
            name: 'creditMortagage',
            placeholder: '0.00 €',
            type: 'number',
        },
    ]);
    const servcieUsageInputBelgium = ref<TypesElement[]>([
        {
            label: 'Je revends le bien en',
            name: 'resellYear',
            placeholder: "Nomber d'année(s)",
            type: 'number',
        },
        {
            label: 'Montant net de mes revenus imposables',
            name: 'taxableIncome',
            placeholder: '0.00 €',
            type: 'number',
        },
    ]);

    const taxResidenceFr = ref<TypesElement[]>([]);

    const serviceUsageInputSecBelgium = ref<TypesElement[]>([]);

    onMounted(() => {
        getCapitalGainConst();
    });

    const extractData = (raw: any, condition: string) =>
        Object.keys(
            raw.filter((item: { name: string }) => item.name === condition)[0]
                .value
        ).map((key) => ({ label: key, value: key }));

    const extractSpecData = (raw: any, condition: string) => {
        const elt = raw.filter(
            (item: { name: string }) => item.name === condition
        )[0].value;
        return Object.keys(elt).map((key) => ({ label: elt[key], value: key }));
    };

    async function getCapitalGainConst() {
        isLoad.value = true;
        try {
            const res = await Financial.getCapitalGainConstants();
            belgiumElt.value = [
                ...belgiumElt.value,
                {
                    label: `Comment sera taxée la plus-value en cas de revente ?`,
                    radioData: extractData(res, 'TAXATIONS'),
                    name: 'taxation',
                },
                {
                    label: `Type de bien`,
                    radioData: extractData(res, 'TYPES'),
                    name: 'type',
                },
            ];
            serviceUsageInputSecBelgium.value = [
                ...serviceUsageInputSecBelgium.value,
                {
                    label: `Commission de l'agence immobilière`,
                    radioData: extractSpecData(res, 'AGENCY_FEE_RATES'),
                    name: 'agencyFeeRate',
                },
            ];
            taxResidenceFr.value = [
                ...taxResidenceFr.value,
                {
                    label: `Où se trouve ma résidence fiscale`,
                    radioData: extractData(res, 'TAX_RESIDENCE'),
                    name: 'taxResidence',
                }
            ]
            luxemburgElt.value = [
                ...luxemburgElt.value,
                {
                    label: `Comment sera taxée la plus-value en cas de revente ?`,
                    radioData: extractData(res, 'LUXEMBOURG_TAXATIONS'),
                    name: 'taxation'
                },
                {
                    label: `Type de bien`,
                    radioData: extractData(res, 'TYPES'),
                    name: 'type',
                },
            ]
            console.log(serviceUsageInputSecBelgium.value);
        } catch (error) {
            console.log(error);
        } finally {
            isLoad.value = false;
        }
    }
    return {
        belgiumElt,
        isLoad,
        resaleInputBelgium,
        creditInputBelgium,
        servcieUsageInputBelgium,
        serviceUsageInputSecBelgium,
        taxResidenceFr,
        luxemburgElt
    };
}
