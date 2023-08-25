import { typeField, Parent } from '../../data.energy';


export const data: Parent = {
    title: 'Performance énergetique',
    content: [
        {
            label: 'Numéro de rapport',
            name: 'certnumber',
            type: typeField.number,
            required: true,
            unity: '',
            placeholder: '0'
        },
        {
            label: 'Énergie annuelle',
            name: 'annualenergy',
            type: typeField.number,
            required: true,
            unity: 'kWhEP/An',
            placeholder: '0'
        },
        {
            label: 'Énergie primaire',
            name: 'primaryenergy',
            type: typeField.number,
            required: true,
            unity: 'kWhEP/m².an',
            placeholder: '0'
        },
    ],
}