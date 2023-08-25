
export const FIELDS = [
    {
        label: 'Filtre par adresse',
        name: 'address',
        type: 'address',
        placeholder: 'Addresse',
        fill : false,
    },
    {
        label: 'Filtre par type de bien',
        name: 'propertyType',
        type: 'select',
        placeholder: 'Type de bien',
        options: [],
        fill : false,
    },
    {
        label: 'Filtre par tranche de prix',
        name: 'Price',
        type: 'select',
        placeholder: 'Tranche de prix',
        options: [],
        fill : false,
    },
    {
        label: 'Filtre par type de location',
        name: 'locationType',
        type: 'select',
        placeholder: 'Type de bien',
        options: [],
        fill : false,
    },
    {
        label: 'Nombre d’occupants',
        name: 'locationType',
        type: 'title',
        fill : true,
        condition : "Hébergement touristique"
    },
    {
        label: 'Adultes(13 ans et +)',
        name: 'adultNumber',
        type: 'number',
        placeholder: 0,
        fill : false,
        condition : "Hébergement touristique"
    },
    {
        label: 'Enfant(2 à 12ans)',
        name: 'childrenNumber',
        type: 'number',
        placeholder: 0,
        fill : false,
        condition : "Hébergement touristique"
    },
    {
        label: 'Bébés(2 à 12ans)',
        name: 'babyNumber',
        type: 'number',
        placeholder: 0,
        fill : false,
        condition : "Hébergement touristique"
    },
    {
        label: 'Date d\'arrivée',
        name: 'arrivalDate',
        type: 'date',
        placeholder: new Date().toLocaleString('be-Be'),
        fill : false,
        condition : "Hébergement touristique"
    },
    {
        label: 'Date de départ',
        name: 'departureDate',
        type: 'date',
        placeholder: new Date().toLocaleString('be-Be'),
        fill : true,
        condition : "Hébergement touristique"
    },
    // {
    //     label: 'Plus  de critères',
    //     type: 'button-filter',
    //     fill : true,
    // },
    {
        label: 'Rechercher dans la liste',
        type: 'button-primary',
        fill : false,
    },
    {
        label: 'Recherche sur la carte',
        type: 'button-secondary',
        fill : false,
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