interface Item {
    id: number;
    label: string;
    name: string;
    value?: string;
}
interface Peb {
    id: number;
    label: string;
    color?: string;
    min: number;
    max: number;
}

interface subItem {
    id: number;
    label: string;
    name: string;
    type: string;
    required?: boolean;
    unity?: string;
}

interface List {
    id: number;
    label: string;
    name: string;
    type: string;
    options?: Item[];
    subItem?: subItem[];
    pickerDate?: string;
}

interface ICaracteristicPEB {
    label: string;
    type: Array<string>;
    region?: Array<string>; // Bruxelles, Région Wallonne, Flandres
    country?: Array<string>; // France, Belgique, Luxembourg
    nameLabel: string;
    visible?: boolean;
}

export const boilerType = [
    {
          id : 0,
          label : "Mazout",
          name : "mazout",
          value : "mazout"
    },
    {
          id : 1,
          label : "Gaz",
          name: "gaz",
          value : 'gaz'
    },
    {
          id : 2,
          label : "Pompe à chaleur",
          name: "chaleur",
          value : 'Pompe à chaleur'
    },
    {
          id : 3,
          label : "Autre",
          name: "other",
          value : 'Autre'
    },
]

export const boilerConforme = [
    {
        label : "Attestation conforme",
        value : true,
    },
    {
        label : "Attestation non conforme",
        value : false,
    },
]

export const menuList :List[] = [
    //   {
    //         id : 0,
    //         label : "Type de chauffage",
    //         name : "boilerType",
    //         type : "select",
    //         options : [
    //               {
    //                     id : 0,
    //                     label : "Mazout",
    //                     name : "mazout",
    //                     value : "mazout"
    //               },
    //               {
    //                     id : 1,
    //                     label : "Gaz",
    //                     name: "gaz",
    //                     value : 'gaz'
    //               },
    //               {
    //                     id : 2,
    //                     label : "Pompe à chaleur",
    //                     name: "chaleur",
    //                     value : 'Pompe à chaleur'
    //               },
    //               {
    //                     id : 3,
    //                     label : "Autre",
    //                     name: "other",
    //                     value : 'Autre'
    //               },
    //         ]
    //   },
    //   {
    //         id : 1,
    //         label : "Date d'installation",
    //         name : "boilerInstallationTime",
    //         type : "date",
    //         pickerDate: "year"
    //   },
      {
            id : 2,
            label : "Résultat PEB",
            name : "pebResult",
            type : "number",
            subItem : [
                  {
                        id : 0,
                        label : "Numéro de rapport",
                        name : 'certnumber',
                        type : "number",
                        required : false
                  },
                  {
                        id : 1,
                        label : "Énergie annuelle",
                        name : 'annualenergy',
                        type : "number",
                        required : false,
                        unity: 'kWhEP/An',
                    },
                    {
                        id : 2,
                        label : "Énergie primaire",
                        name : 'primaryenergy',
                        type : "number",
                        required : false,
                        unity: 'kWhEP/m².an',
                  },
            ]
      },
];

export const hebergementData: List[] = [
    {
        id: 0,
        label: 'Type de chauffage',
        name: 'boilerType',
        type: 'select',
        options: [
            {
                id: 0,
                label: 'Mazout',
                name: 'mazout',
                value: 'mazout',
            },
            {
                id: 1,
                label: 'Gaz',
                name: 'gaz',
                value: 'gaz',
            },
        ],
    },
    {
        id: 1,
        label: "Date d'installation",
        name: 'boilerInstallationTime',
        type: 'date',
    },
    {
        id: 2,
        label: 'Conformité chaudière',
        name: 'boilerCompliance',
        type: 'text',
    },
    {
        id: 3,
        label: "Etanchéité à l'air",
        name: 'airtightness ',
        type: 'text',
    },
    {
        id: 4,
        label: 'Cout annuel de la consommation en gaz',
        name: 'annualCostHeatingConsumption',
        type: 'number',
    },
];

export const PEBValue: Peb[] = [
    {
        id: 0,
        label: 'A+',
        color: '#0F8841',
        min: 0,
        max: 45,
    },
    {
        id: 1,
        label: 'A',
        color: '#18B357',
        min: 46,
        max: 85,
    },
    {
        id: 2,
        label: 'B',
        color: '#35CA34',
        min: 86,
        max: 170,
    },
    {
        id: 3,
        label: 'C',
        color: '#68FB33',
        min: 171,
        max: 255,
    },
    {
        id: 4,
        label: 'D',
        min: 256,
        color: '#CDFD38',
        max: 340,
    },
    {
        id: 5,
        label: 'E',
        min: 341,
        color: '#FFE556',
        max: 425,
    },
    {
        id: 6,
        label: 'F',
        color: '#FEC601',
        min: 426,
        max: 510,
    },
    {
        id: 7,
        label: 'G',
        color: '#FF9935',
        min: 511,
        max: 10000000000000000,
    },
];

export const UploadFile: List[] = [
    {
        id: 0,
        label: 'Cértificat énergetique du bien',
        name: 'licenceEnergy',
        type: 'file',
    },
    {
        id: 1,
        label: 'Test d’étanchéité à l’air',
        name: 'airTightness',
        type: 'file',
    },
];

export const filesCaracteristiqueUpload: ICaracteristicPEB[] = [
    {
        label: 'DPE',
        type: ['all'],
        region: ['Flandre'],
        nameLabel: 'dpeFile',
        visible: false,
    },
    {
        label: 'EPC',
        type: ['all'],
        region: ['Région Wallonne'],
        nameLabel: 'epcFile',
        visible: false,
    },
    {
        label: 'EPB',
        type: ['all'],

        region: ['Bruxelles'],
        country: ['Belgique'],
        nameLabel: 'epbFile',
        visible: false,
    },
    {
        label: 'CCE',
        type: ['all'],
        country: ['France', 'Belgique'],
        region: ['Flandre', 'Région Wallonne', 'Bruxelles'],
        nameLabel: 'cceFile',
        visible: false,
    },
    {
        label: 'Gaz',
        type: ['all'],
        country: ['France'],
        nameLabel: 'gazFile',
        visible: false,
    },
    {
        label: 'Amiante',
        type: ['all'],
        country: ['France'],
        nameLabel: 'amianteFile',
        visible: false,
    },
    {
        label: 'Plomb',
        type: ['all'],
        country: ['France'],
        nameLabel: 'plombFile',
        visible: false,
    },
    {
        label: 'Termite',
        type: ['all'],
        country: ['France'],
        nameLabel: 'termiteFile',
        visible: false,
    },
];

export const dataIntegrationCaracteristic = [

    {
        id : 0,
        label : "Intégrer les caractéristiques du PEB dans votre annonce",
        type : "title",
        items : [
            {
                id : 0,
                label : "Besoin en chaleur du logement",
                name : "housingHeatRequirement",
                type : 'select',
                options : [
                    {
                        label : "Pertes par les parois",
                        value : "Pertes par les parois",
                    },
                    {
                        label : "Pertes par fuites d’air",
                        value : "Pertes par fuites d’air",
                    },
                    {
                        label : "Pertes par ventilation",
                        value : "Pertes par ventilation",
                    },
                ]
            },
            {
                id : 0,
                label : "Performance des installations de chauffage",
                name : "heatingInstallation",
                type : 'select',
                options : []

            },
            {
                id : 0,
                label : "Performance des installations d’eau chaude sanitaire",
                name : "HotWaterInstallation",
                type : 'select',
                options : []

            },
            {
                id : 0,
                label : "Systeme de ventilation",
                name : "ventilationSystem",
                type : 'select',
                options : []

            },
            {
                id : 0,
                label : "Energies renouvelables",
                name : "energyRenewable",
                type : 'select',
                options : []

            },
        ]
    },
    {
        id : 1,
        label : "Demander à l’appli d’intégrer les caractéristiques du PEB dans l’annonce",
        type : "switch",
        name : "isAppIntegrateCaracteristicPeb",
        items : [
            {
                id : 0,
                label : "Prix",
                type : 'number',
                name : 'priceIntegrationPebCaracterisique',
                placeholder : '€',
            }
        ]
    }
]

export const pebCaracteristic = [
    {
        id : 0,
        label : "Besoin en chaleur du logement",
        name : "housingHeatRequirement",
        type : 'select',
    },
    {
        id : 0,
        label : "Performance des installations de chauffage",
        name : "heatingInstallation",
        type : 'select',
    },
    {
        id : 0,
        label : "Performance des installations d’eau chaude sanitaire",
        name : "HotWaterInstallation",
        type : 'select',
    },
    {
        id : 0,
        label : "Systeme de ventilation",
        name : "ventilationSystem",
        type : 'select',
    },
    {
        id : 0,
        label : "Energies renouvelables",
        name : "energyRenewable",
        type : 'select',
    },
]

export const data = {
    housingHeatRequirement : [
        {
            label : "Pertes par les parois",
            value : "Pertes par les parois"
        },
        {
            label : "Pertes par fuites d’air",
            value : "Pertes par fuites d’air"
        },
        {
            label : "Pertes par ventilation",
            value : "Pertes par ventilation"
        },
    ],
    heatingInstallation : [
        {
            label : "Production",
            value : "Production"
        },
        {
            label : "Distribution",
            value : "Distribution"
        },
        {
            label : "Emission",
            value : "Emission"
        },
        {
            label : "Régulation",
            value : "Régulation"
        },
    ],
    hotWaterInstallation : [
        {
            label : "Production",
            value : "Production",
        },
        {
            label : "Stockage éventuel",
            value : "Stockage éventuel",
        },
        {
            label : "Distribution",
            value : "Distribution",
        },
    ],
    ventilationSystem : [
        {
            label : "Systeme A: alimentation et évacuation naturelles",
            value : "Systeme A: alimentation et évacuation naturelles",
        },
        {
            label : "Systeme B: alimentation mécanique et évacuation naturelle",
            value : "Systeme B: alimentation mécanique et évacuation naturelle",
        },
        {
            label : "Systeme C: alimentation naturelle et évacuation mécanique",
            value : "Systeme C: alimentation naturelle et évacuation mécanique",
        },
        {
            label : "Systeme D: alimentation et évacuation mécaniques",
            value : "Systeme D: alimentation et évacuation mécaniques",
        },
    ],
    energyRenewable : [
        {
            label : "Installation solaire thermique",
            value : "Installation solaire thermique",
        },
        {
            label : "Installation solaire photovoltaïque",
            value : "Installation solaire photovoltaïque",
        },
        {
            label : "Biomasse",
            value : "Biomasse",
        },
        {
            label : "Pompe à chaleur",
            value : "Pompe à chaleur",
        },
        {
            label : "Unité de cogénération",
            value : "Unité de cogénération",
        },

    ],
}


export const dataHousingHeatRequirement = [
    {
        name: 'wallLosses',
        value: 'Pertes par les parois',
        subData: [
            {
                title: 'Salle de séjour',
                name: 'livingRoom',
                type: 'radio',
            },
            {
                title: 'Cuisine',
                name: 'food',
                type: 'radio',
            },
            {
                title: 'Bureau',
                name: 'desk',
                type: 'radio',
            },
        ],
        selectData: [
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
        ],
    },
    {
        name: 'lossesAirLeaks',
        value: 'Pertes par fuites d’air',
        subData: [
            {
                title: 'Salle de séjour',
                name: 'livingRoom',
                type: 'radio',
            },
            {
                title: 'Cuisine',
                name: 'food',
                type: 'radio',
            },
            {
                title: 'Bureau',
                name: 'desk',
                type: 'radio',
            },
        ],
        selectData: [
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
        ],
    },
    {
        name: 'ventilationLosses',
        value: 'Pertes par ventilation',
        subData: [
            {
                title: 'Système D avec récupération de chaleur (Existant/non existant)',
                name: 'systemD',
                type: 'switch',
            },
            {
                title: 'Système de ventilation à la demande (Existant/non existant)',
                name: 'ventilationSystem',
                type: 'switch',
            },
            {
                title: 'Aucun système de ventilation (Existant/non existant)',
                name: 'noVentilationSystem',
                type: 'switch',
            },
        ],
    },
];

export const dataHeatingInstallation = [
    {
        name: 'Production',
        value: 'Production',
        subData: [
            {
                title: 'Type de chaudière',
                name: 'livingRoom',
                type: 'switch',
            },
            {
                title: 'Pompe à chaleur',
                name: 'food',
                type: 'switch',
            },
        ],
    },
    {
        name: 'Distribution',
        value: 'Distribution',
        subData: [
            {
                title: 'Tuyauteries isolées',
                name: 'insulatedPipes',
                type: 'switch',
            },
            {
                title: 'Tuyauteries non isolées',
                name: 'uninsulatedPipes',
                type: 'switch',
            },
        ],
    },
    {
        name: 'Emission',
        value: 'Emission',
        subData: [
            {
                title: 'Radiateurs non recouvert d’une pellicule isolante',
                name: 'uncoveredRadiators',
                type: 'switch',
            },
            {
                title: 'Radiateurs recouverts d’une pellicule isolante',
                name: 'coveredRadiators',
                type: 'switch',
            },
        ],
    },
    {
        name: 'Régulation',
        value: 'Régulation',
        subData: [
            {
                title: 'Vannes thermostatiques',
                name: 'Thermostatic valves',
                type: 'switch',
            },
            {
                title: 'Thermostats d’ambiance',
                name: 'roomThermostats',
                type: 'switch',
            },
            {
                title: 'Convecteur de gaz',
                name: 'gasConvector',
                type: 'switch',
            },
        ],
    },
];

export const dataHotWaterInstallation = [
    {
        name: 'Production',
        value: 'Production',
        subData: [
            {
                title: 'Chaudière',
                name: 'boiler',
                type: 'switch',
            },
            {
                title: 'Chauffe-eau',
                name: 'waterHeater',
                type: 'switch',
            },
        ],
    },
    {
        name: 'Stockage éventuel',
        value: 'Stockage éventuel',
        subData: [
            {
                title: 'Ballon',
                name: 'ball',
                type: 'switch',
            },
        ],
    },
    {
        name: 'Distribution',
        value: 'Distribution',
        subData: [
            {
                title: 'Tuyauteries isolées',
                name: 'insulatedPipesHot',
                type: 'switch',
            },
            {
                title: 'Tuyauteries non isolées',
                name: 'uninsulatedPipesHot',
                type: 'switch',
            },
        ],
    },
];

export const dataVentilationSystem = [
    {
        name: 'Systeme A: alimentation et évacuation naturelles',
        value: 'Systeme A: alimentation et évacuation naturelles',
        subData: [],
    },
    {
        name: 'Systeme B: alimentation mécanique et évacuation naturelle',
        value: 'Systeme B: alimentation mécanique et évacuation naturelle',
        subData: [],
    },
    {
        name: 'Systeme C: alimentation naturelle et évacuation mécanique',
        value: 'Systeme C: alimentation naturelle et évacuation mécanique',
        subData: [],
    },
    {
        name: 'Systeme D: alimentation et évacuation mécaniques',
        value: 'Systeme D: alimentation et évacuation mécaniques',
        subData: [],
    },
];

export const dataEnergyRenewable = [
    {
        name: 'Installation solaire thermique',
        value: 'Installation solaire thermique',
        subData: [
            {
                title: 'Surface de capteurs',
                name: 'sensorArea',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Inclinaison',
                name: 'tiltThermal',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Orientation',
                name: 'orientationThermal',
                type: 'input',
                inputType: 'text',
            },
            {
                title: 'Installations desservies',
                name: 'facilitiesServed',
                type: 'input',
                inputType: 'text',
            },
        ],
    },
    {
        name: 'Installation solaire photovoltaïque',
        value: 'Installation solaire photovoltaïque',
        subData: [
            {
                title: 'Puissance crête des panneaux',
                name: 'peakPower',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Inclinaison',
                name: 'tiltPhotovoltaic',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Orientation',
                name: 'orientationPhotovoltaic',
                type: 'input',
                inputType: 'text',
            },
        ],
    },
    {
        name: 'Biomasse',
        value: 'Biomasse',
        subData: [
            {
                title: 'Type de combustible',
                name: 'fuelType',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Type d’appareil',
                name: 'deviceType',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Date de fabrication (pour les bâtiments existants)',
                name: 'dateManufacture',
                type: 'input',
                inputType: 'text',
            },
            {
                title: 'Type de foyer (pour les bâtiments existants)',
                name: 'fireplaceType',
                type: 'select',
                subSelectData: [
                    {
                        label: 'Montant',
                        value: 'Montant',
                    },
                    {
                        label: 'Inversé',
                        value: 'Inversé',
                    },
                ],
            },
            {
                title: 'Situation de l’appareil (à l’intérieur du volume protégé ou non)',
                name: 'deviceLocation',
                type: 'input',
                inputType: 'text',
            },
            {
                title: 'Type de régulation',
                name: 'regulationType',
                type: 'input',
                inputType: 'text',
            },
        ],
    },
    {
        name: 'Pompe à chaleur',
        value: 'Pompe à chaleur',
        subData: [
            {
                title: 'Type de pompe à chaleur',
                name: 'typeHeatPump',
                type: 'select',
                subSelectData: [
                    {
                        label: 'Air/Eau',
                        value: 'Air/Eau',
                    },
                    {
                        label: 'Sol/Eau',
                        value: 'Sol/Eau',
                    },
                ],
            },
            {
                title: 'Energie utilisée',
                name: 'energyUsedHeatPump',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Appareil émetteur',
                name: 'sendingDevice',
                type: 'select',
                subSelectData: [
                    {
                        label: 'Radiateur',
                        value: 'Radiateur',
                    },
                    {
                        label: 'Chauffage',
                        value: 'Chauffage',
                    },
                    {
                        label: 'Sol',
                        value: 'Sol',
                    },
                    {
                        label: 'Autre',
                        value: 'Autre',
                    },
                ],
            },
            {
                title: 'Coefficient de performance (COPtest) ',
                name: 'coefficientPerformance',
                type: 'input',
                inputType: 'input',
            },
        ],
    },
    {
        name: 'Unité de cogénération',
        value: 'Unité de cogénération',
        subData: [
            {
                title: 'Energie utilisée',
                name: 'energyUsedCogeneration',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Puissance thermique de l’installation',
                name: 'uninsulatedPipesHot',
                type: 'input',
                inputType: 'number',
            },
            {
                title: 'Type de moteur',
                name: 'uninsulatedPipesHot',
                type: 'input',
                inputType: 'text',
            },
            {
                title: 'Volume de ballon tampon',
                name: 'uninsulatedPipesHot',
                type: 'input',
                inputType: 'number',
            },
        ],
    },
];