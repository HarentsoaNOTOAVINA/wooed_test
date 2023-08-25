import { typeField } from '../../../data.energy';

export const dataPerfHotWater = {
    label: 'Performance des installations d’eau chaude sanitaire',
    placeholder: 'Selectionner',
    name: 'waterPerformance',
    type: typeField.select,
    options: [
        {
            label: 'Production',
            value: 'Production',
        },
        {
            label: 'Stockage éventuel',
            value: 'Stockage éventuel',
        },
        {
            label: 'Distribution',
            value: 'Distribution',
        },
    ],
    subItem: [
        {
            value: 'Production',
            item: [
                {
                    label: 'Chaudière',
                    name: 'haveBoiler',
                    type: typeField.switch,
                },
                {
                    label: 'Chauffe-eau',
                    name: 'haveWaterHeater',
                    type: typeField.switch,
                },
            ],
        },
        {
            value: 'Stockage éventuel',
            item: [
                {
                    label: 'Ballon',
                    name: 'ballon',
                    type: typeField.switch,
                },
            ],
        },
        {
            value: 'Distribution',
            item: [
                {
                    label: 'Tuyauteries isolées',
                    name: 'insulatedPipesHot',
                    type: typeField.switch,
                },
                {
                    label: 'Tuyauteries non isolées',
                    name: 'uninsulatedPipesHot',
                    type: typeField.switch,
                },
            ],
        },
    ],
};
