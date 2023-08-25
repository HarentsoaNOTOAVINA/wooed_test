import {
    IAddProperty,
    typeInput,
} from '@/pages/addProperty/dataProperty/AddPropertyInteface';
import LocationType from '@/pages/addProperty/components/LocationType.vue';
import Property from '@/pages/addProperty/components/Property.vue';
import Address from '@/pages/addProperty/components/Address/Address.vue';
import LivingArea from '@/pages/addProperty/components/LivingArea.vue';
import PhotoAndVideo from '@/pages/addProperty/components/PhotoAndVideo.vue';
import DisponibilityLocation from '@/pages/addProperty/components/DisponibilityLocation.vue';
import PriceLocation from '@/pages/addProperty/components/PriceLocation.vue';
import Visites from '@/pages/addProperty/components/Visites/Visites.vue';
import Confirmation from '@/pages/addProperty/components/Confirmation/Confirmation.vue';
import ComponentTest from "@/pages/addProperty/components/ComponentTest.vue"
import PubPannel from "@/pages/addProperty/components/PubPannel.vue"

/**
 * Maison
 * Villa
 * Bungallow
 */

export const leasePublicityDataClassic: IAddProperty[] = [
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
            {
                title: 'Superficie',
                component: LivingArea,
                contentFields: [
                    {
                        label: 'Superficie de l’espace publicitaire',
                        name: 'cadastralArea',
                        type: typeInput.number,
                        required: true,
                    },
                ],
            },
        ],
    },
    {
        title: 'Descriptions détaillées de votre bien',
        content: [
            {
                title: 'Panneau publicitaire',
                component: PubPannel,
                contentFields: [
                    {
                        label: "L’espace dispose d’une structure portante pour le panneau publicitaire",
                        name: 'billboard',
                        type: typeInput.switch,
                    },
                ],
            },
            {
                title: 'Photo et vidéo',
                component: PhotoAndVideo,
                contentFields: [
                    {
                        label: 'Introduire des photos du bien',
                        name: 'images',
                        type: typeInput.image,
                        required: true,
                        subtitle: [
                            {
                                text: 'La taille maximale par image est 5MB',
                            },
                            {
                                text: 'Formats acceptés JPG',
                            },
                        ],
                    },
                    {
                        label: 'Lien de la vidéo',
                        name: 'linkVideos',
                        type: typeInput.text,
                        required: false,
                    },
                    {
                        label : "Plan cadastral",
                        name : "plan",
                        type : typeInput.file, 
                        required : false,
                    }
                ]
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
                    {
                        label: 'Durée de la location',
                        name: 'locationDuration',
                        type: typeInput.select,
                        options: [
                            {
                                label: '1 an',
                                value: '1',
                            },
                            {
                                label: '3 ans',
                                value: '3',
                            },
                            {
                                label: '9 ans',
                                value: '9',
                            },
                        ],
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
                        label: 'Montant du loyer menusuel',
                        name: 'prices',
                        required: true,
                        type: typeInput.number,
                        placeholder: 'Montant',
                        unity: '€',
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
                    {
                        label: "J'autorise le coliving",
                        name: 'coliving',
                        type: typeInput.switch,
                    },
                ],
            },
        ],
    },
    {
        title: 'Visites',
        content: [
            {
                title: 'Visites',
                component: Visites,
                contentFields: [],
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
