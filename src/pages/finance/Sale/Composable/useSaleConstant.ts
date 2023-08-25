import Financial from '@/services/FinancialService';
import { ref, onMounted } from 'vue';

export default function useSaleConstants() {
    interface TypesElement {
        type?: string;
        label?: string;
        radioData?: Array<{ label: string; value: string | number }>;
        options?: Array<{label: string; value: string | number}>;
        name?: string;
        checked?: string;
    }
    const walloniaElt = ref<any>([
        {
            type: 'select',
            options: [
                {
                    label: '12,50 %',
                    value: 1
                },
                {
                    label: '6,00 %',
                    value: 2
                },
                {
                    label: '5,00 %',
                    value: 3
                },
            ],
            name: 'percentValue'
        },
        {
            type: 'select',
            options: [
                {
                    label: 'pression immobilière - limite 2022',
                    value: 1
                },
                {
                    label: 'pression immobilière - limite 2023',
                    value: 2
                },
            ],
            name: 'realEstatePressure',
            result: 'realEstatePressureResult',
        },  
        {
            type: 'input',
            label: 'Code postal',
            name: 'postalCode'
        },
        {
            type: 'checkbox',
            label: 'Abattement sur 20.000 €',
            checked: '',
            name: 'isAbattement'
        },
        {
            type: 'checkbox',
            label: 'Annexe',
            checked: '',
            name: 'annexe'
        },
    ]);

    const flandreElement = ref<any>([
        {
            type: 'select',
            options: [
                {
                    label: '12,00 %',
                    value: 1
                },
                {
                    label: '3,00 %',
                    value: 2
                },
                {
                    label: '1,00 %',
                    value: 3
                },
            ],
            name: 'percentValue'
        },
        {
            type: 'checkbox',
            label: 'Flandre - reduction forfaitaire',
            checked: '',
            name: 'reduction'
        },
        {
            type: 'select',
            options: [
                {
                    label: 'prix <= 220,000',
                    value: 1
                },
                {
                    label: 'prix <= 240,000',
                    value: 2
                },
            ],
            name: 'price'
        },
        {
            type: 'checkbox',
            label: 'Annexe',
            checked: '',
            name: 'annexe'
        },
    ]);

    const bruxelleElement = ref<any>([
        {
            type: 'select',
            options: [
                {
                    label: 'Sans abattement',
                    value: 1
                },
                {
                    label: 'Abattement sur 175,000 €',
                    value: 2
                },
                {
                    label: 'Abattement terrain - 87,500 €',
                    value: 3
                },
            ],
            name: 'abattement'
        },
        {
            type: 'checkbox',
            label: 'Annexe',
            checked: '',
            name: 'annexe'
        },
    ]);

    const luxembourgElement = ref<any>([
        {
            label: 'Région',
            radioData: [
                {
                    label: 'Ville de Luxembourg',
                    value: 'Ville de Luxembourg',
                },
                {
                    label: 'Autre localité',
                    value: 'Autre localité',
                },
            ],
            name: 'region',
        },
    ]);

    const isLoad = ref<boolean>(false);
    onMounted(() => {
        getSaleConstant();
    });
    const extractData = (raw: any, condition: string) =>
        Object.keys(
            raw.filter((item: { name: string }) => item.name === condition)[0]
                .value
        ).map((key) => ({ label: key, value: key }));

    async function getSaleConstant() {
        isLoad.value = true;
        try {
            const res = await Financial.getSaleConstants();
            walloniaElt.value = [
                ...walloniaElt.value,
                {
                    label: 'Habitation modeste',
                    radioData: extractData(res, 'DWELLING_MODESTS'),
                    name: 'dwellingModest',
                },
            ];
            luxembourgElement.value = [
                ...luxembourgElement.value,
                {
                    label: `Raison de l'achat`,
                    radioData: extractData(res, 'PURCHASE_REASONS'),
                    name: 'purchaseReason',
                },
                {
                    label: `Type du bien`,
                    radioData: extractData(res, 'LUXEMBOURG_GOOD_TYPES'),
                    name: 'type',
                },
            ];
        } catch (error) {
            console.log(error);
        } finally {
            isLoad.value = false;
        }
    }

    return { walloniaElt, bruxelleElement,luxembourgElement, flandreElement, isLoad };
}
