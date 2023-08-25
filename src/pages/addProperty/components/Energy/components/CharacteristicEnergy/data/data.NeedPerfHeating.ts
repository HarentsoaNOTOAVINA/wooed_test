import { typeField, Parent } from '../../../data.energy';

export const dataPerfHeating = {
    label: 'Performance des installations de chauffage',
    placeholder: 'Selectionner',
    name: 'boilerPerformance',
    type: typeField.select,
    options: [
        {
            label: 'Production',
            value: 'Production',
        },
        {
            label: 'Distribution',
            value: 'Distribution',
        },
        {
            label: 'Emission',
            value: 'Emission',
        },
        {
            label: 'Régulation',
            value: 'Régulation',
        },
    ],
    subItem: [
        {
            value: 'Production',
            item: [
                {
                    label: 'Type de chaudière',
                    name: 'boilerType',
                    type: typeField.switch,
                },
                {
                    label: 'Pompe à chaleur',
                    name: 'heatPompe',
                    type: typeField.switch,
                },
            ],
        },
        {
            value: 'Distribution',
            item: [
                {
                    label: 'Tuyauteries isolées',
                    name: 'isIsolatedPipe',
                    type: typeField.switch,
                },
                {
                    label: 'Tuyauteries non isolées',
                    name: 'isNonIsolatedPipe',
                    type: typeField.switch,
                },
            ],
        },
        {
            value: 'Emission',
            item: [
                {
                    label: 'Radiateurs non recouvert d’une pellicule isolante',
                    name: 'isNonCoveredRadiator',
                    type: typeField.switch,
                },
                {
                    label: 'Radiateurs recouverts d’une pellicule isolante',
                    name: 'isCoveredRadiator',
                    type: typeField.switch,
                },
            ],
        },
        {
            value: 'Régulation',
            item: [
                {
                    label: 'Vannes thermostatiques',
                    name: 'thermostaticValve',
                    type: typeField.switch,
                },
                {
                    label: 'Thermostats d’ambiance',
                    name: 'roomThermostats',
                    type: typeField.switch,
                },
                {
                    label: 'Convecteur de gaz',
                    name: 'isGasConvertor',
                    type: typeField.switch,
                },
            ],
        },
    ],
};
