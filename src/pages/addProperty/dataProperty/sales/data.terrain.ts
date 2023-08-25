import {
    IAddProperty,
    typeInput,
} from '@/pages/addProperty/dataProperty/AddPropertyInteface';
import PropertyType from '@/pages/addProperty/components/PropertyType.vue';
import Property from '@/pages/addProperty/components/Property.vue';
import Address from '@/pages/addProperty/components/Address/Address.vue';
import LivingArea from '@/pages/addProperty/components/LivingArea.vue';
import General from '@/pages/addProperty/components/General/General.vue';
import PropertyState from '@/pages/addProperty/components/PropertyState.vue';
import PhotoAndVideo from '@/pages/addProperty/components/PhotoAndVideo.vue';
import Disponibility from '@/pages/addProperty/components/Disponibility.vue';
import Price from '@/pages/addProperty/components/Price.vue';
import Documents from '@/pages/addProperty/components/Documents.vue';
import Visites from '@/pages/addProperty/components/Visites/Visites.vue';
import Confirmation from '@/pages/addProperty/components/Confirmation/Confirmation.vue';
import DetailedDescription from "@/pages/addProperty/components/DetailedDescription.vue"
/**
 * Terrain
 */


export const saleGroundDataPublic: IAddProperty[] = [
    {
        title: "Information de base",
        content: [
            {
                title: "Type d'annonce",
                component: PropertyType,
                contentFields: [
                    {
                        label: "Type de transaction",
                        name: "transactionType",
                        required: true,
                        type: typeInput.select
                    },
                    {
                        label: "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
                        name: "collaborativeAcquisition",
                        type: typeInput.switch
                    }
                ]
            },
            {
                title: "Type de biens",
                component: Property,
                contentFields: [
                    {
                        label: "Type de bien",
                        name: "propertyType",
                        placeholder: "Sélectionnez",
                        type: typeInput.select,
                        required: true
                    },
                    {
                        label: "Description sommaire du bien",
                        type: typeInput.textArea,
                        name: "description"
                    }
                ]
            },
            {
                title: "Adresse",
                component: Address,
                contentFields: []
            },
            {
                title: "Superficie habitable",
                component: LivingArea,
                contentFields: [
                    {
                        label: "Superficie",
                        name: "cadastralArea",
                        type: typeInput.number,
                        required: true
                    }
                ]
            },
        ]
    },

    {
        title: "Information détaillé",
        content: [
            {
                title: 'Descriptif détaillé',
                component: DetailedDescription,
                contentFields: [
                    {
                        label: "Le terrain est destiné à",
                        name: 'atendedLand',
                        type: typeInput.select,
                        options: [
                            {
                                label: 'L’érection d’un bâtiment',
                                value: 'L’érection d’un bâtiment',
                            },
                            {
                                label: 'L’usage de jardin',
                                value: 'L’usage de jardin',
                            },
                            {
                                label: 'L’exploitation d’un cheptel',
                                value: 'L’exploitation d’un cheptel',
                            },
                            {
                                label: 'Agricole et forestière',
                                value: 'Agricole et forestière',
                            },
                            {
                                label: 'Habitation',
                                value: 'Habitation',
                            },
                            {
                                label: 'Commercial',
                                value: 'Commercial',
                            },
                            {
                                label: 'Equipements d’intérêt collectif et des services publics',
                                value: 'Equipements d’intérêt collectif et des services publics',
                            },
                            {
                                label: 'Industrielle',
                                value: 'Industrielle',
                            },
                        ],
                        subItem: [
                            {
                                label: 'À la culture de',
                                name: 'cultivation',
                                type: typeInput.text,
                            },
                        ]
                    },
                    {
                        label: "Le propriétaire  fait appel à un jardinier",
                        name: 'callGarden',
                        type: typeInput.switch,
                        subItem: [
                            {
                                label: 'Coût anneul',
                                name: 'gardenPrice',
                                type: typeInput.text,
                            },
                        ]
                    },
                ],
            },

            {
                title: "Etat du bien",
                component: PropertyState,
                contentFields: [
                    {
                        label: "Réserver la visite technique par un expert",
                        name: "Immopass",
                        type: typeInput.link
                    },
                    {
                        label: "Rapport",
                        name: "immopassFile",
                        type: typeInput.file
                    }
                ]
            },
            {
                title: "Photo et vidéo",
                component: PhotoAndVideo,
                contentFields: [
                    {
                        label: "Introduire des photos du bien",
                        name: "images",
                        type: typeInput.image,
                        required: true,
                        subtitle: [
                            {
                                text: 'La taille maximale par image est 5MB'
                            },
                            {
                                text: "Formats acceptés JPG"
                            }
                        ]
                    }
                ]
            },

        ]
    },
    {
        title: "Disponibilité",
        content: [
            {
                title: "Occupation du bien",
                component: Disponibility,
                contentFields: [
                    {
                        label: "disponibilité",
                        name: "disponibility",
                        type: typeInput.select,
                        options: [
                            {
                                label: "Le bien est à présent disponible",
                                value: "Le bien est à présent disponible"
                            },
                            {
                                label: "Le bien est actuellement occupé mais il sera rendu libre le",
                                value: "Le bien est actuellement occupé mais il sera rendu libre le"
                            },
                            {
                                label: "Le bien est actuellement loué",
                                value: "Le bien est actuellement loué"
                            },
                        ],

                        subItem: [
                            {
                                label: "Disponible le",
                                name: "disponibilityTime",
                                type: typeInput.date,
                            },
                            {
                                label: "Montant du loyer",
                                name: "locationCost",
                                type: typeInput.number,
                            },
                            {
                                label: 'Garantie locative',
                                name: "locationWarranty",
                                type: typeInput.switch,
                                subItem: [
                                    {
                                        label: "Montant de la garantie locative",
                                        name: "locationWarrantyCost",
                                        type: typeInput.number,
                                    }
                                ]
                            },
                            {
                                label: "Fichier de bail",
                                name: "leaseCopy",
                                type: typeInput.file
                            },
                            {
                                label: "Date d'entrée en vigueur",
                                name: "forceDateEntry",
                                type: typeInput.date
                            },
                            {
                                label: 'Durée',
                                name: "duration",
                                type: typeInput.year
                            }
                        ]
                    }
                ]
            }
        ]
    },

    {
        title: "Prix",
        content: [
            {
                title: "Prix",
                component: Price,
                contentFields: [
                    // {
                    //     label: 'Prix demandé',
                    //     name: 'startPrice',
                    //     required: true,
                    //     placeholder: 'Selectionner',
                    //     type : typeInput.select,
                    //     options  : [
                    //         {
                    //             label : "Fixer votre prix",
                    //             value : "Fixer votre prix"
                    //         },
                    //         {
                    //             label : "Solliciter des offres dans un certain délai",
                    //             value : "Solliciter des offres dans un certain délai"
                    //         },
                    //     ],
                    // },

                    {
                        label: 'Prix demandé',
                        name: 'typePrice',
                        required: true,
                        type: typeInput.radio,
                        placeholder: 'Selectionner',
                        options: [
                            {
                                label: 'Fixer votre prix',
                                value: 'Fixer votre prix',
                            },
                            {
                                label: 'Solliciter des offres dans un certain délai',
                                value: 'Solliciter des offres dans un certain délai',
                            },
                        ],
                        subItem: [
                            {
                                label: 'Prix',
                                name: 'startPrice',
                                // required: true,
                                type: typeInput.number,
                                unity: '€',
                            },
                            {
                                label: 'Prix plancher',
                                name: 'floorPrice',
                                // required: true,
                                type: typeInput.number,
                                unity: '€',
                            },
                            {
                                label: 'Délai de soumission des offres',
                                name: 'deadlineDate',
                                // required: true,
                                placeholder: "Selectionner une date",
                                type: typeInput.date,
                            },
                        ],
                    },
                    // {
                    //     label: 'Prix de départ',
                    //     name: 'startPrice',
                    //     required: true,
                    //     type: typeInput.number,
                    // },

                    // {
                    //     label: 'Prix plancher',
                    //     name: 'floorPrice',
                    //     required: true,
                    //     type: typeInput.number,
                    // },

                    // {
                    //     label: 'Date de début des enchères souhaitez',
                    //     name: 'startSaleDate',
                    //     required: true,
                    //     type: typeInput.date,
                    //     subtitle : [
                    //         {
                    //             text : "Sous réserve du confirmation du notaire instrumentant"
                    //         }
                    //     ]
                    // },
                    // {
                    //     label: 'Date de fin des enchères',
                    //     name: 'endSaleDate',
                    //     required: true,
                    //     type: typeInput.date,
                    // },
                ]
            }
        ]
    },
    {
        title: "Documents relatifs au bien",
        content: [
            {
                title: "Documents",
                component: Documents,
                contentFields: [
                    {
                        label: "Type du document",
                        type: typeInput.text,
                        name: "title",
                    },
                    {
                        label: "",
                        type: typeInput.file,
                        name: "fileDocument"
                    }
                ]
            }
        ]
    },
    {
        title: "Visites",
        content: [
            {
                title: "Visites",
                component: Visites,
                contentFields: []
            }
        ]
    },
    {
        title: "Confirmation",
        content: [
            {
                title: "Confirmation",
                component: Confirmation,
                contentFields: []
            }
        ]
    }
]


export const saleGroundDataGreAgre: IAddProperty[] = [
    {
        title: "Information de base",
        content: [
            {
                title: "Type d'annonce",
                component: PropertyType,
                contentFields: [
                    {
                        label: "Type de transaction",
                        name: "transactionType",
                        required: true,
                        type: typeInput.select
                    },
                    {
                        label: "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
                        name: "collaborativeAcquisition",
                        type: typeInput.switch
                    }
                ]
            },
            {
                title: "Type de biens",
                component: Property,
                contentFields: [
                    {
                        label: "Type de bien",
                        name: "propertyType",
                        placeholder: "Sélectionnez",
                        type: typeInput.select,
                        required: true
                    },
                    {
                        label: "Description sommaire du bien",
                        type: typeInput.textArea,
                        name: "description"
                    }
                ]
            },
            {
                title: "Adresse",
                component: Address,
                contentFields: []
            },
            {
                title: "Superficie habitable",
                component: LivingArea,
                contentFields: [
                    {
                        label: "Superficie",
                        name: "cadastralArea",
                        type: typeInput.number,
                        required: true
                    }
                ]
            },
        ]
    },

    {
        title: "Information détaillé",
        content: [
            {
                title: 'Descriptif détaillé',
                component: DetailedDescription,
                contentFields: [
                    {
                        label: "Le terrain est destiné à",
                        name: 'atendedLand',
                        type: typeInput.select,
                        options: [
                            {
                                label: 'L’érection d’un bâtiment',
                                value: 'L’érection d’un bâtiment',
                            },
                            {
                                label: 'L’usage de jardin',
                                value: 'L’usage de jardin',
                            },
                            {
                                label: 'L’exploitation d’un cheptel',
                                value: 'L’exploitation d’un cheptel',
                            },
                            {
                                label: 'Agricole et forestière',
                                value: 'Agricole et forestière',
                            },
                            {
                                label: 'Habitation',
                                value: 'Habitation',
                            },
                            {
                                label: 'Commercial',
                                value: 'Commercial',
                            },
                            {
                                label: 'Equipements d’intérêt collectif et des services publics',
                                value: 'Equipements d’intérêt collectif et des services publics',
                            },
                            {
                                label: 'Industrielle',
                                value: 'Industrielle',
                            },
                        ],
                        subItem: [
                            {
                                label: 'À la culture de',
                                name: 'cultivation',
                                type: typeInput.text,
                            },
                        ]
                    },
                    {
                        label: "Le propriétaire  fait appel à un jardinier",
                        name: 'callGarden',
                        type: typeInput.switch,
                        subItem: [
                            {
                                label: 'Coût anneul',
                                name: 'gardenPrice',
                                type: typeInput.text,
                            },
                        ]
                    },
                ],
            },

            {
                title: "Etat du bien",
                component: PropertyState,
                contentFields: [
                    {
                        label: "Réserver la visite technique par un expert",
                        name: "Immopass",
                        type: typeInput.link
                    },
                    {
                        label: "Rapport",
                        name: "immopassFile",
                        type: typeInput.file
                    }
                ]
            },

            {
                title: "Photo et vidéo",
                component: PhotoAndVideo,
                contentFields: [
                    {
                        label: "Introduire des photos du bien",
                        name: "images",
                        type: typeInput.image,
                        required: true,
                        subtitle: [
                            {
                                text: 'La taille maximale par image est 5MB'
                            },
                            {
                                text: "Formats acceptés JPG"
                            }
                        ]
                    }
                ]
            },

        ]
    },
    {
        title: "Disponibilité",
        content: [
            {
                title: "Occupation du bien",
                component: Disponibility,
                contentFields: [
                    {
                        label: "Disponibilité",
                        name: "disponibility",
                        type: typeInput.select,
                        options: [
                            {
                                label: "Le bien est à présent disponible",
                                value: "Le bien est à présent disponible"
                            },
                            {
                                label: "Le bien est actuellement occupé mais il sera rendu libre le",
                                value: "Le bien est actuellement occupé mais il sera rendu libre le"
                            },
                            {
                                label: "Le bien est actuellement loué",
                                value: "Le bien est actuellement loué"
                            },
                        ],

                        subItem: [
                            {
                                label: "Disponible le",
                                name: "disponibilityTime",
                                type: typeInput.date,
                            },
                            {
                                label: "Montant du loyer",
                                name: "locationCost",
                                type: typeInput.number,
                            },
                            {
                                label: 'Garantie locative',
                                name: "locationWarranty",
                                type: typeInput.switch,
                                subItem: [
                                    {
                                        label: "Montant de la garantie locative",
                                        name: "locationWarrantyCost",
                                        type: typeInput.number,
                                    }
                                ]
                            },
                            {
                                label: "Fichier de bail",
                                name: "leaseCopy",
                                type: typeInput.file
                            },
                            {
                                label: "Date d'entrée en vigueur",
                                name: "forceDateEntry",
                                type: typeInput.date
                            },
                            {
                                label: 'Durée',
                                name: "duration",
                                type: typeInput.text,
                                // type: typeInput.year
                            }
                        ]
                    }
                ]
            }
        ]
    },

    {
        title: "Prix",
        content: [
            {
                title: "Prix",
                component: Price,
                contentFields: [
                    {
                        label: 'Prix demandé',
                        name: 'prices',
                        required: true,
                        type: typeInput.number,
                    },
                    {
                        label: 'Date limite de soumission des offres',
                        name: 'submissionDuration',
                        //   required: true,
                        type: typeInput.date,
                    },
                ]
            }
        ]
    },
    {
        title: "Documents relatifs au bien",
        content: [
            {
                title: "Documents",
                component: Documents,
                contentFields: [
                    {
                        label: "Type du document",
                        type: typeInput.text,
                        name: "title",
                    },
                    {
                        label: "",
                        type: typeInput.file,
                        name: "fileDocument"
                    }
                ]
            }
        ]
    },
    {
        title: "Visites",
        content: [
            {
                title: "Visites",
                component: Visites,
                contentFields: []
            }
        ]
    },
    {
        title: "Confirmation",
        content: [
            {
                title: "Confirmation",
                component: Confirmation,
                contentFields: []
            }
        ]
    }
]