import { title } from './../../work/Tank/SendMailExpert/data';

export const FIELDS = [
    {
        label: 'Filtre par adresse',
        name: 'address',
        type: 'address',
        placeholder: 'Addresse',
        handler: () => null,
    },
    {
        label: 'Filtre par type de bien',
        name: 'propertyType',
        type: 'select',
        placeholder: 'Type de bien',
        options: [],
        handler: () => null,
    },
    {
        label: 'Filtre par tranche de prix',
        name: 'Price',
        type: 'select',
        placeholder: 'Tranche de prix',
        options: [],
        handler: () => null,
    },
    {
        label: 'Plus  de critères',
        title: 'Autres critères',
        type: 'button-filter',
        handler: () => null,
    },
    {
        label: 'Rechercher dans la liste',
        type: 'button-primary',
        handler: () => null,
    },
    {
        label: 'Rechercher sur la carte',
        type: 'button-secondary',
        handler: () => null,
    },
   
];

export const OPERATION_TYPE = [
    {
        label : "Vente",
        value : "sale"
    },
    {
        label : "Location",
        value : "lease"
    },
    
];
export const TRANSACTION_TYPE = [
    {
        label : "Vente",
        value : ""
    },
    {
        label : "Vente",
        value : "sale"
    }
]

export const ENERGETIC_CLASS =  [
    'A', 'A+', 'B', 'C', 'D', 'E', 'F', 'G'
];