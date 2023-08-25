import {
    IAddProperty,
    typeInput,
} from '@/pages/addProperty/dataProperty/AddPropertyInteface';
import PropertyType from '@/pages/addProperty/components/PropertyType.vue';
import Property from '@/pages/addProperty/components/Property.vue';
import Address from '@/pages/addProperty/components/Address/Address.vue';
import LivingArea from '@/pages/addProperty/components/LivingArea.vue';
import General from '@/pages/addProperty/components/General/General.vue';
import Energy from '@/pages/addProperty/components/Energy/Energy.vue';
import Electric from '@/pages/addProperty/components/Electric.vue';
import PhotoAndVideo from '@/pages/addProperty/components/PhotoAndVideo.vue';
import Disponibility from '@/pages/addProperty/components/Disponibility.vue';
import Price from '@/pages/addProperty/components/Price.vue';
import Documents from '@/pages/addProperty/components/Documents.vue';
import Visites from '@/pages/addProperty/components/Visites/Visites.vue';
import Confirmation from '@/pages/addProperty/components/Confirmation/Confirmation.vue';
import DetailedDescription from "@/pages/addProperty/components/DetailedDescription.vue"
/**
 * Immeuble à appartement
 */

export const saleImmeubleAppartDataPublic : IAddProperty[] = [
    {
        title : "Information de base",
        content : [
            {
                title : "Type d'annonce",
                component : PropertyType,
                contentFields : [
                    {
                        label : "Type de transaction",
                        name : "transactionType",
                        required : true,
                        type : typeInput.select
                    },
                    {
                        label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
                        name : "collaborativeAcquisition",
                        type : typeInput.switch
                    }
                ]
            },

            {
                title : "Type de biens",
                component : Property,
                contentFields : [
                    {
                        label : "Type de bien",
                        name : "propertyType",
                        placeholder : "Sélectionnez",
                        type : typeInput.select,
                        required : true
                    },
                    {
                        label : "Description sommaire du bien",
                        type : typeInput.textArea,
                        name : "description"
                    }
                ]
            },
            {
                title : "Adresse",
                component : Address,
                contentFields : []
            },
            {
                title : "Superficie habitable",
                component : LivingArea,
                contentFields : [
                    {
                        label : "Surface cadastrale (m²)",
                        name : "cadastralArea",
                        type : typeInput.number,
                        required : true,
                        min : 0
                    },
                    {
                        label : "Surface habitable (m²)",
                        name : "livingArea",
                        type : typeInput.number,
                        required : true,
                        min : 0
                    }
                ]
            }

        ]
    },

    {
        title : "Descriptions détaillées de votre bien",
        content : [
            {
                //Eto le general
                title : "Détails des pièces",
                component : DetailedDescription,
                contentFields : [
                    {
                        label : "Nombre de logements",
                        name : "accommodationCount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de chambres",
                        name : "roomcount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de salles de bains",
                        name : "bathroomcount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de salles de douche",
                        name : "showerroomcount",
                        type : typeInput.number
                    }
                ]
            },
            {
                //Eto ilay energy
                title : "Caractéristiques énergétiques",
                component : Energy,
                contentFields : []
            },
            {
                title : "Caractéristiques électriques",
                component : Electric,
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
                title : "Photo et vidéo",
                component : PhotoAndVideo,
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
                title : "Occupation du bien",
                component: Disponibility,
                contentFields : [
                    {
                        label : "disponibilité",
                        name : "disponibility",
                        type : typeInput.select,
                        options  : [
                            {
                                label : "Le bien est à présent disponible",
                                value : "Le bien est à présent disponible"
                            },
                            {
                                label : "Le bien est actuellement occupé mais il sera rendu libre le",
                                value : "Le bien est actuellement occupé mais il sera rendu libre le"
                            },
                            {
                                label : "Le bien est actuellement loué",
                                value : "Le bien est actuellement loué"
                            },
                        ],

                        subItem : [
                            {
                                label : "Disponible le",
                                name : "disponibilityTime",
                                type : typeInput.date,
                            },
                            {
                                label : "Montant du loyer",
                                name : "locationCost",
                                type : typeInput.number,
                            },
                            {
                                label : 'Garantie locative',
                                name : "locationWarranty",
                                type : typeInput.switch,
                                subItem : [
                                        {
                                            label : "Montant de la garantie locative",
                                            name : "locationWarrantyCost",
                                            type : typeInput.number,
                                        }
                                ]
                            },
                            {
                                label : "Fichier de bail",
                                name : "leaseCopy",
                                type : typeInput.file
                            },
                            {
                                label : "Date d'entrée en vigueur",
                                name : "forceDateEntry",
                                type : typeInput.date
                            },
                            {
                                label : 'Durée',
                                name : "duration",
                                type : typeInput.year
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title : "Prix",
        content : [
            {
                title : "Prix",
                component : Price,
                contentFields : [
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
        title : "Documents relatifs au bien",
        content : [
            {
                title : "Documents",
                component : Documents,
                contentFields : [
                    {
                        label : "Type du document",
                        type : typeInput.text,
                        name : "title",
                    },
                    {
                        label : "",
                        type : typeInput.file,
                        name : "fileDocument"   
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
                component : Visites,
                contentFields : []
            }
        ]
    },
    {
        title : "Confirmation",
        content : [
            {
                title: "Confirmation",
                component : Confirmation,
                contentFields : []
            }
        ]
    }
]

export const saleImmeubleAppartDataGreAGre : IAddProperty[] = [
    {
        title : "Information de base",
        content : [
            {
                title : "Type d'annonce",
                component : PropertyType,
                contentFields : [
                    {
                        label : "Type de transaction",
                        name : "transactionType",
                        required : true,
                        type : typeInput.select
                    },
                    {
                        label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
                        name : "collaborativeAcquisition",
                        type : typeInput.switch
                    }
                ]
            },

            {
                title : "Type de biens",
                component : Property,
                contentFields : [
                    {
                        label : "Type de bien",
                        name : "propertyType",
                        placeholder : "Sélectionnez",
                        type : typeInput.select,
                        required : true
                    },
                    {
                        label : "Description sommaire du bien",
                        type : typeInput.textArea,
                        name : "description"
                    }
                ]
            },
            {
                title : "Adresse",
                component : Address,
                contentFields : []
            },
            {
                title : "Superficie habitable",
                component : LivingArea,
                contentFields : [
                    {
                        label : "Surface cadastrale (m²)",
                        name : "cadastralArea",
                        type : typeInput.number,
                        required : true,
                        min : 0
                    },
                    {
                        label : "Surface habitable (m²)",
                        name : "livingArea",
                        type : typeInput.number,
                        required : true,
                        min : 0
                    }
                ]
            }

        ]
    },

    {
        title : "Descriptions détaillées de votre bien",
        content : [
            {
                //Eto le general
                title : "Détails des pièces",
                component : DetailedDescription,
                contentFields : [
                    {
                        label : "Nombre de logements",
                        name : "accommodationCount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de chambres",
                        name : "roomcount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de salles de bains",
                        name : "bathroomcount",
                        type : typeInput.number
                    },
                    {
                        label : "Nombre de salles de douche",
                        name : "showerroomcount",
                        type : typeInput.number
                    }
                ]
            },
            {
                //Eto ilay energy
                title : "Caractéristiques énergétiques",
                component : Energy,
                contentFields : []
            },
            {
                title : "Caractéristiques électriques",
                component : Electric,
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
                title : "Photo et vidéo",
                component : PhotoAndVideo,
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
                title : "Occupation du bien",
                component: Disponibility,
                contentFields : [
                    {
                        label : "Disponibilité",
                        name : "disponibility",
                        type : typeInput.select,
                        options  : [
                            {
                                label : "Le bien est à présent disponible",
                                value : "Le bien est à présent disponible"
                            },
                            {
                                label : "Le bien est actuellement occupé mais il sera rendu libre le",
                                value : "Le bien est actuellement occupé mais il sera rendu libre le"
                            },
                            {
                                label : "Le bien est actuellement loué",
                                value : "Le bien est actuellement loué"
                            },
                        ],

                        subItem : [
                            {
                                label : "Disponible le",
                                name : "disponibilityTime",
                                type : typeInput.date,
                            },
                            {
                                label : "Montant du loyer",
                                name : "locationCost",
                                type : typeInput.number,
                            },
                            {
                                label : 'Garantie locative',
                                name : "locationWarranty",
                                type : typeInput.switch,
                                subItem : [
                                        {
                                            label : "Montant de la garantie locative",
                                            name : "locationWarrantyCost",
                                            type : typeInput.number,
                                        }
                                ]
                            },
                            {
                                label : "Fichier de bail",
                                name : "leaseCopy",
                                type : typeInput.file
                            },
                            {
                                label : "Date d'entrée en vigueur",
                                name : "forceDateEntry",
                                type : typeInput.date
                            },
                            {
                                label : 'Durée',
                                name : "duration",
                                type : typeInput.year
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title : "Prix",
        content : [
            {
                title : "Prix",
                component : Price,
                contentFields : [
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
        title : "Documents relatifs au bien",
        content : [
            {
                title : "Documents",
                component : Documents,
                contentFields : [
                    {
                        label : "Type du document",
                        type : typeInput.text,
                        name : "title",
                    },
                    {
                        label : "",
                        type : typeInput.file,
                        name : "fileDocument"   
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
                component : Visites,
                contentFields : []
            }
        ]
    },
    {
        title : "Confirmation",
        content : [
            {
                title: "Confirmation",
                component : Confirmation,
                contentFields : []
            }
        ]
    }
]