import { typeField } from '../../../data.energy';


interface Options {
    label?: string,
    value?: string,
    name?: string,
    type?: string
}
interface DataHeat {
    label?: string,
    name?: string,
    placeholder?: string,
    type?: string,
    options?: Array<Options>,
    subItem?: Array<{
        name?: string,
        value?: string,
        item?: Array<Options>,
    }>
}

export const dataHeat: DataHeat = {
    label: 'Besoin en chaleur du logement',
    name: 'housingHeatRequirement',
    placeholder: 'Selectionner',
    type: typeField.select,
    options: [
        {
            label: 'Pertes par les parois',
            value: 'Pertes par les parois',
        },
        {
            label: 'Pertes par fuites d’air',
            value: 'Pertes par fuites d’air',
        },
        {
            label: 'Pertes par ventilation',
            value: 'Pertes par ventilation',
        },
    ],
    subItem: [
        {
            name: '',
            value: 'Pertes par les parois',
            item: [
                {
                    label: 'Parois présentant un très bon niveau d’isolation',
                    value: 'Parois présentant un très bon niveau d’isolation',
                },
                {
                    label: 'Parois avec  un bon niveau d’isolation',
                    value: 'Parois avec  un bon niveau d’isolation',
                },
                {
                    label: 'Parois avec isolation suffisante ou d’épaisseur inconnue',
                    value: 'Parois avec isolation suffisante ou d’épaisseur inconnue',
                },
                {
                    label: 'Parois sans isolation',
                    value: 'Parois sans isolation',
                },
            ]
        },
        {
            name: '',
            value: 'Pertes par fuites d’air',
            item: [
                {
                    label: 'Fenêtres équipées de simple vitrage',
                    value: 'Fenêtres équipées de simple vitrage',
                },
                {
                    label: 'Fenêtres équipées de double vitrage',
                    value: 'Fenêtres équipées de double vitrage',
                },
                {
                    label: 'Fenêtres équipées de triple vitrage',
                    value: 'Fenêtres équipées de triple vitrage',
                },
                {
                    label: 'Brèche',
                    value: 'Brèche',
                },
                {
                    label: 'Ouverture de boîte aux lettres',
                    value: 'Ouverture de boîte aux lettres',
                },
            ]
        }, 
        {
            name: 'ventilationLosses',
            value: 'Pertes par ventilation',
            item: [
                {
                    label: 'Système D avec récupération de chaleur (Existant/non existant)',
                    name: 'systemD',
                    type: typeField.switch
                },
                {
                    label: 'Système de ventilation à la demande (Existant/non existant)',
                    name: 'ventilation',
                    type: typeField.switch
                },
                {
                    label: 'Aucun système de ventilation (Existant/non existant)',
                    name: 'noVentilationSystem',
                    type: typeField.switch
                },
            ]
        }
    ],
};
