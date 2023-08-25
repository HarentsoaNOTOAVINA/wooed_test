interface Field {
    label?: string;
    name: string;
    type: string;
    options?: Array<Option>;
    placeholder?: string;
    required?: boolean;
    unity?: string;
}

interface Option {
    label: string;
    value: string | boolean;
}

export interface Parent {
    title?: string;
    content?: Array<Field>;
}

export enum typeField {
    text = 'text',
    number = 'number',
    switch = 'switch',
    date = 'date',
    time = 'time',
    select = 'select',
    radio = 'radio',
    textArea = 'textArea',
    link = 'link',
    file = 'file',
    image = 'image',
    button = 'button',
    year = 'year',
}

const dataEnergy: Parent[] = [
    {
        title: 'Type de chauffage',
        content: [
            {
                label: 'Type de chauffage',
                name: 'boilerType',
                type: typeField.select,
                options: [
                    {
                        label: 'Mazout',
                        value: 'mazout',
                    },
                    {
                        label: 'Gaz',
                        value: 'Gaz',
                    },
                    {
                        label: 'Pompe à chaleur',
                        value: 'Pompe à chaleur',
                    },
                    {
                        label: 'Autre',
                        value: 'Autre',
                    },
                ],
            },
            {
                label: 'Année d’installation',
                name: 'boilerInstallationTime',
                type: typeField.date,
            },
        ],
    },
    {
        title: 'Chaudière',
        content: [
            {
                label: 'Mentionner ici si la chaudière est conforme',
                name: 'isBoilerConforme',
                type: typeField.radio,
                options: [
                    {
                        label: 'Attestation conforme',
                        value: true,
                    },
                    {
                        label: 'Attestation non conforme',
                        value: false,
                    },
                ],
            },
            {
                label: 'Insérer ici le dernier certificat de contrôle de la chaudière',
                type: typeField.file,
                name: 'lastControlBoiler',
            },
            {
                label: 'Coût annuel du contrôle',
                type: typeField.number,
                placeholder: 'Coût annuel',
                name: 'boilerCost',
                unity: '€',
            },
        ],
    },
    {
        title: 'Performance énergetique',
        content: [
            {
                label: 'Numéro de rapport',
                name: 'certnumber',
                type: typeField.number,
                required: true,
            },
            {
                label: 'Énergie annuelle',
                name: 'annualenergy',
                type: typeField.number,
                required: true,
                unity: 'kWhEP/An',
            },
            {
                label: 'Énergie primaire',
                name: 'primaryenergy',
                type: typeField.number,
                required: true,
                unity: 'kWhEP/m².an',
            },
        ],
    },
    {
        title: 'Intégrer les caractéristiques du PEB dans votre annonce',
        content: [
            {
                label: 'Voulez-vous intégrer les caractéristiques du PEB dans votre annonce ?',
                name: 'caracteristicPEB',
                type: typeField.switch,
            },
            {
                label: 'Besoin en chaleur du logement',
                placeholder: 'Selectionner',
                name: 'housingHeatRequirement',
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
            },
            {
                label: 'Performance des installations de chauffage',
                placeholder: 'Selectionner',
                name: 'boilerPerformance',
                type: typeField.select,
                options: [
                    {
                        label: 'Production',
                        value: 'Production',
                    },
                    {
                        label: 'Distribution',
                        value: 'Distribution',
                    },
                    {
                        label: 'Emission',
                        value: 'Emission',
                    },
                    {
                        label: 'Régulation',
                        value: 'Régulation',
                    },
                ],
            },
            {
                label: 'Performance des installations d’eau chaude sanitaire',
                placeholder: 'Selectionner',
                name: 'waterPerformance',
                type: typeField.select,
                options: [
                    {
                        label: 'Production',
                        value: 'Production',
                    },
                    {
                        label: 'Stockage éventuel',
                        value: 'Stockage éventuel',
                    },
                    {
                        label: 'Distribution',
                        value: 'Distribution',
                    },
                ],
            },
            {
                label: 'Systeme de ventilation',
                placeholder: 'Selectionner',
                name: 'ventilation',
                type: typeField.select,
                options: [
                    {
                        label: 'Systeme A: alimentation et évacuation naturelles',
                        value: 'Systeme A: alimentation et évacuation naturelles',
                    },
                    {
                        label: 'Systeme B: alimentation mécanique et évacuation naturelle',
                        value: 'Systeme B: alimentation mécanique et évacuation naturelle',
                    },
                    {
                        label: 'Systeme C: alimentation naturelle et évacuation mécanique',
                        value: 'Systeme C: alimentation naturelle et évacuation mécanique',
                    },
                    {
                        label: 'Systeme D: alimentation et évacuation mécaniques',
                        value: 'Systeme D: alimentation et évacuation mécaniques',
                    },
                ],
            },
            {
                label: 'Systeme de ventilation',
                placeholder: 'Selectionner',
                name: 'ventilation',
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
            },
            {
                label: 'Demander à l’appli d’intégrer les caractéristiques du PEB dans l’annonce : 29 €',
                name: 'isAppIntegrateCaracteristicPeb',
                type: typeField.switch,
            },
            {
                label: 'Cértificat énergetique du bien',
                name: 'licenceEnergy',
                type: typeField.file,
            },
            {
                label: 'Test d’étanchéité à l’air',
                name: 'airTightness',
                type: typeField.file,
            },
        ],
    },
];
