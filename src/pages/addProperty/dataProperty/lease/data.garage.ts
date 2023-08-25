import { IAddProperty, typeInput } from "@/pages/addProperty/dataProperty/AddPropertyInteface";
import ComponentTest from "@/pages/addProperty/components/ComponentTest.vue"
import LocationType from '@/pages/addProperty/components/LocationType.vue';
import Property from '@/pages/addProperty/components/Property.vue';
import Address from '@/pages/addProperty/components/Address/Address.vue';
import LivingArea from '@/pages/addProperty/components/LivingArea.vue';
import General from '@/pages/addProperty/components/General/General.vue';
import Energy from '@/pages/addProperty/components/Energy/Energy.vue';
import Electric from '@/pages/addProperty/components/Electric.vue';
import PhotoAndVideo from '@/pages/addProperty/components/PhotoAndVideo.vue';
import DisponibilityLocation from '@/pages/addProperty/components/DisponibilityLocation.vue';
import PriceLocation from '@/pages/addProperty/components/PriceLocation.vue';
import Visites from '@/pages/addProperty/components/Visites/Visites.vue';
import Confirmation from '@/pages/addProperty/components/Confirmation/Confirmation.vue';
import CoOwnership from '@/pages/addProperty/components/CoOwnership.vue';
import WaterConnection from "@/pages/addProperty/components/WaterConnection.vue";
import DetailedDescription from "@/pages/addProperty/components/DetailedDescription.vue"

export const leaseGarageDataClassic : IAddProperty[] = [
     {
        title : "Information de base",
        content : [
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
                                label: 'Type du garage',
                                name: 'garageType',
                                placeholder: 'Sélectionnez',
                                type: typeInput.select,
                                options: [
                                    {
                                        label: 'Immeuble autonome',
                                        value: 'Immeuble autonome',
                                    },
                                    {
                                        label: 'Lot dans une copropriété',
                                        value: 'Lot dans une copropriété',
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
            {
                title : "Superficie",
                component: LivingArea,
                contentFields : [
                    {
                        label : "Surface",
                        name : "livingArea",
                        type : typeInput.number,
                        required : true,
                        min : 0
                    }
                ]
            },
        ]
    },
    {
        title : "Descriptions détaillées de votre bien",
        content : [
            {
                title : "Descriptif detaillé du bien",
                component: DetailedDescription,
                contentFields : [
                    {
                        label : "Nombre de place de parking",
                        name : "garagePlaceNumber",
                        type : typeInput.number,
                    }
                ]
            },
            {
                title : "Caractéristiques électriques",
                component: Electric,
                contentFields : [
                    {
                        label : "Le compteur électrique est",
                        name : "counterName",
                        type : typeInput.select,
                        options : [
                            {
                                label : "Privatif",
                                value : "Privatif"
                            },
                            {
                                label : "Commun",
                                value : "Commun"
                            },
                        ]
                    },
                    {
                        label : "Types de compteur",
                        name : "counterType",
                        type : typeInput.select,
                        options : [
                            {
                                label : "Compteur de jour",
                                value : "Compteur de jour"
                            },
                            {
                                label : "Compteur jour/nuit",
                                value : "Compteur jour/nuit",
                            },
                            {
                                label : "Compteur de retour",
                                value : "Compteur de retour",
                            },
                        ]  
                    },
                    {
                        label : "L'installation est conforme",
                        name : "installationPropre",
                        type : typeInput.switch,
                        subItem : [
                            {
                                label : "Date de fin de validité",
                                name : "endLicence",
                                type : typeInput.date
                            },
                            {
                                label : "Certificat",
                                name  : "licence",
                                type : typeInput.file
                            }
                        ]
                    }
                ]
            },
            {
                title : "Reseaux d'eaux",
                component : WaterConnection,
                contentFields : [
                    {
                        label : "Le compteur d'eau est",
                        name : "counterWaterName",
                        type : typeInput.select,
                        options : [
                            {
                                label : "Privatif",
                                value : "Privatif"
                            },
                            
                            {
                                label : "Commun",
                                value : "Commun"
                            }
                        ]
                    }
                ]
            },
            {
                title : "Photo et vidéo",
                component: PhotoAndVideo,
                contentFields : [
                    {
                        label : "Introduire des photos du bien",
                        name : "images",
                        type : typeInput.image,
                        required : true,
                        subtitle : [
                            {
                                    text : 'La taille maximale par image est 5MB'
                            },
                            {
                                    text : "Formats acceptés JPG"
                            }
                        ]  
                    },
                    {
                        label : "Lien de la vidéo",
                        name : "linkVideos",
                        type : typeInput.text,
                        required : false,
                    },

                    {
                        label : "Introduire une figuration 3D du bien",
                        name : "figure3d",
                        type : typeInput.button, 
                        required : false,
                    },
                    {
                        label : "Plan cadastral",
                        name : "plan",
                        type : typeInput.file, 
                        required : false,
                    }
                ]
            },
        ]
    },
    {
        title : "Disponibilité",
        content : [
            {
                title : "Entrée en jouissance",
                component: DisponibilityLocation,
                contentFields : [
                    {
                        label : "Le bien est disponible à compter du",
                        name : "disponibilityTime",
                        type : typeInput.date,
                    },
                    {
                        label : "Durée de la location",
                        name : "locationDuration",
                        type :  typeInput.select,
                        options : [
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
                        ]
                    }
                ]
            },
            {
                title : "Copropriété",
                component: CoOwnership,
                contentFields : [
                    {
                        label : "Nom du syndic",
                        name : "syndic",
                        type : typeInput.select,
                        options : []
                    },
                    {
                        label : "Enregistrer ici la réponse du syndic",
                        name : "syndicsResponse",
                        type : typeInput.file,
                    },
                    {
                        label : "Reprendre ici les 3 derniers procès-verbaux d’assemblée générale",
                        name : "meetingReports",
                        type : typeInput.file,
                    },
                    {
                        label: "Montant des charges de copropriété mensuelles (moyenne)",
                        name : "condominiumChargesAmount",
                        type : typeInput.number,
                        placeholder : "€"
                    }
                ]
            }
        ]
    },
    {
        title : "Loyer",
        content : [
            {
                title : "Loyer - Garantie",
                component: PriceLocation,
                contentFields : [
                    {
                        label : "Montant du loyer menusuel",
                        name : "prices",
                        required: true,
                        type : typeInput.number,
                        placeholder : '€',
                    },
                    {
                        label : "Garantie locative exigée",
                        name : "locationWarranty",
                        type : typeInput.switch,
                        subItem : [
                            {
                                label : "Montant de la garantie locative",
                                subtitle : [
                                    {
                                        text : "par défaut 2 mois"
                                    },
                                ],
                                name : "locationWarrantyCost",
                                type : typeInput.number
                            }
                        ]
                    },
                    {
                        label : "J'autorise le coliving",
                        name : "coliving",
                        type : typeInput.switch,
                    }
                ]
            }
        ]
    },
    {
        title : "Visites",
        content : [
            {
                title: "Visites",
                component: Visites,
                contentFields : []
            }
        ]
    },
    {
        title : "Confirmation",
        content : [
            {
                title: "Confirmation",
                component: Confirmation,
                contentFields : []
            }
        ]
    }
];
export const leaseGarageDataTouristic : typeInput[] = [];
export const leaseGarageDataMinutes : typeInput[] = [];