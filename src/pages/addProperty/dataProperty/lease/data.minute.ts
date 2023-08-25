import {
    IAddProperty,
    typeInput,
} from '@/pages/addProperty/dataProperty/AddPropertyInteface';
import LocationType from '@/pages/addProperty/components/LocationType.vue';
import Property from '@/pages/addProperty/components/Property.vue';
import Address from '@/pages/addProperty/components/Address/Address.vue';
import LivingArea from '@/pages/addProperty/components/LivingArea.vue';
import DisponibilityLocation from '@/pages/addProperty/components/DisponibilityLocation.vue';
import PriceLocation from '@/pages/addProperty/components/PriceLocation.vue';
import Confirmation from '@/pages/addProperty/components/Confirmation/Confirmation.vue';

export const leaseTouristicDataClassic: IAddProperty[] = [
    {
        title: 'Information de base',
        content: [
            {
                title: 'Type de location',
                component: LocationType,
                contentFields: [
                    {
                        label: 'Location KlassiQ',
                        name: 'locationType',
                        type: typeInput.button,
                    },
                    {
                        label: 'Hébergement touristique',
                        name: 'locationType',
                        type: typeInput.button,
                    },
                    {
                        label: 'Mettre en location « minute »',
                        name: 'locationType',
                        type: typeInput.button,
                    },
                    {
                        label: 'Mettre à disposition un « atelier d’artiste »',
                        name: 'locationType',
                        type: typeInput.button,
                    },
                ],
            },
            {
                title: 'Type de biens',
                component: Property,
                contentFields: [
                    {
                        label: 'Type de bien',
                        name: 'propertyType',
                        placeholder: 'Sélectionnez',
                        type: typeInput.select,
                        required: true,
                        subItem: [
                            {
                                label: 'Durée de la location',
                                name: 'minuteLocationDuration',
                                placeholder: 'Sélectionnez',
                                type: typeInput.select,
                                options: [
                                    {
                                        label: 'Pour une demi-journée',
                                        value: 'Pour une demi-journée',
                                    },
                                    {
                                        label: 'Pour une journée',
                                        value: 'Pour une journée',
                                    },
                                    {
                                        label: 'Pour une semaine',
                                        value: 'Pour une semaine',
                                    },
                                    {
                                        label: 'Pour un mois',
                                        value: 'Pour un mois',
                                    },
                                    {
                                        label: 'Pour une année',
                                        value: 'Pour une année',
                                    },
                                    {
                                        label: 'Pour une durée indeterminée',
                                        value: 'Pour une durée indeterminée',
                                    },
                                ],
                            },
                        ]
                    },
                    {
                        label: 'Description sommaire du bien',
                        type: typeInput.textArea,
                        name: 'details',
                    },
                ],
            },
            {
                title: 'Adresse',
                component: Address,
                contentFields: [],
            },
        ],
    },
    {
        title: 'Disponibilité',
        content: [
            {
                title: 'Entré en jouissance',
                component: DisponibilityLocation,
                contentFields: [
                    {
                        label: 'Le bien est disponible à compter du',
                        name: 'disponibilityTime',
                        type: typeInput.date,
                        placeholder: 'Date',
                    },
                ],
            },
        ],
    },
    {
        title: 'Loyer',
        content: [
            {
                title: 'Loyer - Garantie',
                component: PriceLocation,
                contentFields: [
                    {
                        label: 'Prix de la location',
                        name: 'locationPrice',
                        required: true,
                        type: typeInput.radio,
                        placeholder: 'Selectionner',
                        options: [
                            {
                                label: 'Heure',
                                value: 'Heure',
                            },
                            {
                                label: 'Demi journée',
                                value: 'Demi journée',
                            },
                        ],
                        subItem: [
                            {
                                label: 'Prix',
                                name: 'prices',
                                type: typeInput.number,
                                unity: '€',
                            },
                        ],
                    },
                    {
                        label: 'Garantie locative exigée',
                        name: 'locationWarranty',
                        type: typeInput.switch,
                        subItem: [
                            {
                                label: 'Montant de la garantie locative (par défaut 2 mois)',
                                name: 'locationWarrantyCost',
                                type: typeInput.number,
                                unity: '€',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Confirmation',
        content: [
            {
                title: 'Confirmation',
                component: Confirmation,
                contentFields: [],
            },
        ],
    },
];
export const leaseHouseDataTouristic: IAddProperty[] = [];
export const leaseHouseDataMinute: IAddProperty[] = [];
export const leaseHouseDataColocation: IAddProperty[] = [];
