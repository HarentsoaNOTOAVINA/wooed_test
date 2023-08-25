import { typeField } from '../../../data.energy';

export const dataVentilationSystem = {
    label: 'Systeme de ventilation',
    placeholder: 'Selectionner',
    name: 'situationValue',
    type: typeField.select,
    options: [
        {
            label: 'Systeme A: alimentation et évacuation naturelles',
            value: 'Systeme A: alimentation et évacuation naturelles',
        },
        {
            label: 'Systeme B: alimentation mécanique et évacuation naturelle',
            value: 'Systeme B: alimentation mécanique et évacuation naturelle',
        },
        {
            label: 'Systeme C: alimentation naturelle et évacuation mécanique',
            value: 'Systeme C: alimentation naturelle et évacuation mécanique',
        },
        {
            label: 'Systeme D: alimentation et évacuation mécaniques',
            value: 'Systeme D: alimentation et évacuation mécaniques',
        },
    ],
    subtItem: {
        label: 'Situation',
        name: 'situation',
        type: typeField.switch,
    },
};
