import { typeField } from '../../../data.energy';

export const dataRenewableEnergy = {
    label: 'Energies renouvelables',
    placeholder: 'Selectionner',
    name: 'renewableEnergy',
    type: typeField.select,
    options: [
        {
            label: 'Installation solaire thermique',
            value: 'Installation solaire thermique',
        },
        {
            label: 'Installation solaire photovoltaïque',
            value: 'Installation solaire photovoltaïque',
        },
        {
            label: 'Biomasse',
            value: 'Biomasse',
        },
        {
            label: 'Pompe à chaleur',
            value: 'Pompe à chaleur',
        },
        {
            label: 'Unité de cogénération',
            value: 'Unité de cogénération',
        },
    ],
    subItem: [
        {
            value: 'Installation solaire thermique',
            item: [
                {
                    label: 'Surface de capteurs',
                    placeholder: '0',
                    name: 'sensorArea',
                    type: typeField.number,
                },
                {
                    label: 'Inclinaison',
                    placeholder: '0',
                    name: 'tiltThermal',
                    type: typeField.number,
                },
                {
                    label: 'Orientation',
                    name: 'orientationThermal',
                    type: typeField.select,
                    options : [
                        {
                              label : "Nord",
                              value : "Nord"
                        },
                        {
                              label : "Nord-Est",
                              value : "Nord-Est"
                        },
                        {
                              label : "Nord-Ouest",
                              value : "Nord-Ouest"
                        },
                        {
                              label : "Sud",
                              value : "Sud"
                        },
                        {
                              label : "Sud-Est",
                              value : "Sud-Est"
                        },
                        {
                              label : "Sud-Ouest",
                              value : "Sud-Ouest"
                        },
                        
                        {
                              label : "Est",
                              value : "Est"
                        },
                        {
                              label : "Ouest",
                              value : "Ouest"
                        },
                  ]
                },
                {
                    label: 'Installations desservies',
                    placeholder: 'Installations desservies',
                    name: 'facilitiesServed',
                    type: typeField.text,
                },
            ],
        },
        {
            value: 'Installation solaire photovoltaïque',
            item: [
                {
                    label: 'Puissance crête des panneaux',
                    placeholder: '0',
                    name: 'peakPower',
                    type: typeField.number,
                },
                {
                    label: 'Inclinaison (°)',
                    placeholder: '0°',
                    name: 'tiltPhotovoltaic',
                    type: typeField.number,
                },
                {
                    label: 'Orientation',
                    name: 'orientationPhotovoltaic',
                    type: typeField.select,
                    options : [
                        {
                              label : "Nord",
                              value : "Nord"
                        },
                        {
                              label : "Nord-Est",
                              value : "Nord-Est"
                        },
                        {
                              label : "Nord-Ouest",
                              value : "Nord-Ouest"
                        },
                        {
                              label : "Sud",
                              value : "Sud"
                        },
                        {
                              label : "Sud-Est",
                              value : "Sud-Est"
                        },
                        {
                              label : "Sud-Ouest",
                              value : "Sud-Ouest"
                        },
                        
                        {
                              label : "Est",
                              value : "Est"
                        },
                        {
                              label : "Ouest",
                              value : "Ouest"
                        },
                  ]
                },
            ],
        },
        {
            value: 'Biomasse',
            item: [
                {
                    label: 'Type de combustible',
                    placeholder: 'Type de combustible',
                    name: 'fuelType',
                    type: typeField.text,
                },
                {
                    label: 'Type d’appareil',
                    placeholder: 'Type d’appareil',
                    name: 'deviceType',
                    type: typeField.text,
                },
                {
                    label: 'Date de fabrication (pour les bâtiments existants)',
                    placeholder: '--/--/--',
                    name: 'dateManufacture',
                    type: typeField.date,
                },
                {
                    label: 'Type de foyer (pour les bâtiments existants)',
                    name: 'fireplaceType',
                    type: typeField.select,
                    options: [
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
                    label: 'Type de régulation',
                    placeholder: 'Type de régulation',
                    name: 'regulationType',
                    type: typeField.text,
                },
                {
                    label: 'Situation de l’appareil (à l’intérieur du volume protégé ou non)',
                    placeholder: 'Situation de l’appareil (à l’intérieur du volume protégé ou non)',
                    name: 'deviceLocation',
                    type: typeField.text,
                },
            ],
        },
        {
            value: 'Pompe à chaleur',
            item: [
                {
                    label: 'Type de pompe à chaleur',
                    name: 'typeHeatPump',
                    type: typeField.select,
                    options: [
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
                    label: 'Energie utilisée',
                    placeholder: '0',
                    name: 'energyUsedHeatPump',
                    type: typeField.number,
                },
                {
                    label: 'Appareil émetteur',
                    name: 'sendingDevice',
                    type: typeField.select,
                    options: [
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
                    label: 'Coefficient de performance (COPtest) ',
                    placeholder: '0',
                    name: 'coefficientPerformance',
                    type: typeField.number,
                },
            ],
        },
        {
            value: 'Unité de cogénération',
            item: [
                {
                    label: 'Energie utilisée',
                    placeholder: '0',
                    name: 'energyUsedCogeneration',
                    type: typeField.number,
                },
                {
                    label: 'Puissance thermique de l’installation',
                    placeholder: '0',
                    name: 'uninsulatedPipesHot',
                    type: typeField.number,
                },
                {
                    label: 'Type de moteur',
                    placeholder: 'Type de moteur',
                    name: 'uninsulatedPipesHot',
                    type: typeField.text,
                },
                {
                    label: 'Volume de ballon tampon',
                    placeholder: '0',
                    name: 'uninsulatedPipesHot',
                    type: typeField.number,
                },
            ],
        },
    ],
};
