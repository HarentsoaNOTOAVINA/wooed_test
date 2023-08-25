export const FLUVIUS: any[] = [
    {
        id: 1,
        connectionType:
            'Nieuwe aansluiting met 1 residentiële gasmeter <=10 m³n/h',
        cost: '206,61',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 2,
        connectionType:
            'Nieuwe aansluiting met 1 residentiële gasmeter <=10 m³n/h die niet voldoet aan de bepalingen van het energiedecreet',
        cost: '1.243,20',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 3,
        connectionType:
            'Nieuwe aansluiting met 2 residentiële gasmeters <=10 m³n/h',
        cost: '413,22',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 4,
        connectionType:
            'Nieuwe aansluiting met 3 residentiële gasmeters <=10 m³n/h',
        cost: '619,83',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 5,
        connectionType:
            'Nieuwe aansluiting met 4 residentiële gasmeters <=10 m³n/h',
        cost: '1.032,32',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 6,
        connectionType:
            'Nieuwe aansluiting tot 25 m³n/h op lage druk met 1 professionele gasmeter >10 m³n/h tot en met 25 m³n/h',
        cost: '1.996,61',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 7,
        connectionType:
            'Nieuwe aansluiting tot 25 m³n/h op lage druk met 1 professionele gasmeter en 1 residentiële gasmeter',
        cost: '2.203,22',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 8,
        connectionType:
            'Nieuwe aansluiting op lage druk met 1 professionele gasmeter >25 m³n/h tot en met 40 m³n/h',
        cost: '2.775,96',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 9,
        connectionType:
            'Nieuwe aansluiting tot 40 m³n/h op lage druk met 1 professionele gasmeter en 1 residentiële gasmeter',
        cost: '2.982,57',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 10,
        connectionType:
            'Nieuwe aansluiting tot 40 m³n/h op lage druk met 2 professionele gasmeters',
        cost: '3.585,66',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 11,
        connectionType:
            'Nieuwe aansluiting tot 100 m³n/h op lage druk met 2 professionele gasmeters',
        cost: '3.986,22',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 12,
        connectionType:
            'Nieuwe aansluiting op middendruk met 1 professionele gasmeter tot en met 40 m³n/h',
        cost: '3.547,71',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 13,
        connectionType:
            'Nieuwe aansluiting tot 40 m³n/h op middendruk met 1 professionele gasmeter en 1 residentiële gasmeter',
        cost: '3.754,32',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
    {
        id: 14,
        connectionType:
            'Nieuwe aansluiting > 40 m³n/h op lage druk met 1 professionele gasmeter >40 m³n/h',
        cost: '3.176,52',
        link: 'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    },
];
export const ORES: any[] = [
    {
        id: 1,
        connectionType:
            'Raccordements avec cabine sur réseau MPB (moyenne pression: >160m3/h)',
        titles: [
            'Débit horaire maximum (m³/h)',
            'Type compteur',
            'Pression maximale de (bar)',
            'Conduite type (max. 25 m)',
            'Prix',
            'Détente 1 ligne Prix',
        ],
        cost: [
            {
                id: 1,
                hourlyFlow: '250',
                counterType: 'G160',
                maxPressure: '4,9',
                typicalConduct: 'PE63',
                price: '2.959',
                relaxOneLine: '12.129',
            },
            {
                id: 2,
                hourlyFlow: '400',
                counterType: 'G250',
                maxPressure: '4,9',
                typicalConduct: 'PE63',
                price: '2.959',
                relaxOneLine: '15.492',
            },
            {
                id: 3,
                hourlyFlow: '650',
                counterType: 'G400',
                maxPressure: '4,9',
                typicalConduct: 'PE110',
                price: '4.719',
                relaxOneLine: '18.854',
            },
            {
                id: 4,
                hourlyFlow: '1.000',
                counterType: 'G650',
                maxPressure: '4,9',
                typicalConduct: 'PE110',
                price: '4.719',
                relaxOneLine: '24.326',
            },
            {
                id: 5,
                hourlyFlow: '1.600',
                counterType: 'G1000',
                maxPressure: '4,9',
                typicalConduct: 'PE160',
                price: '5.112',
                relaxOneLine: 'pas disponible',
            },
        ],
        link: 'https://formulaires.ores.be/cmh-introduction/ores',
    },
    {
        id: 2,
        connectionType:
            'Raccordement Gaz sur réseau de distribution basse pression (BP) ou sur réseau de distribution moyenne pression (MP ≤5 bar) avec pression de sortie 21/25/98 mbar, et avec un débit maximum de 160 m³/h',
        titles: [
            'Débit horaire maximum (m³/h)',
            'Type compteur',
            'Coffret/mini-cabine',
            'Conduite',
            'BP 21/25/98 mbar',
            'MP 4,9 bar',
            'BP 21/25/98 mbar',
            'MP 4,9 bar',
            'Coffrets',
        ],
        cost: [
            {
                id: 1,
                hourlyFlow: '6-10',
                counterType: 'G4 - G6',
                boxOrMiniCabin: 'coffret',
                conduct: 'PE32',
                BP212598mbar1: '634',
                MP49bar1: '634',
                BP212598mbar2: '262',
                MP49bar2: '262',
                box: '285',
            },
            {
                id: 2,
                hourlyFlow: '16',
                counterType: 'G10',
                boxOrMiniCabin: 'coffret',
                conduct: 'BP: PE63 ou PE32 - MP: PE32',
                BP212598mbar1: '634',
                MP49bar1: '634',
                BP212598mbar2: '324',
                MP49bar2: '324',
                box: '742',
            },
            {
                id: 3,
                hourlyFlow: '25',
                counterType: 'G16',
                boxOrMiniCabin: 'coffret',
                conduct: 'BP: PE63 ou PE32 - MP: PE32',
                BP212598mbar1: '634',
                MP49bar1: '634',
                BP212598mbar2: '324',
                MP49bar2: '324',
                box: '742',
            },
            {
                id: 4,
                hourlyFlow: '40',
                counterType: 'G25',
                boxOrMiniCabin: 'coffret',
                conduct: 'BP: PE63 - MP: PE32',
                BP212598mbar1: '1.267',
                MP49bar1: '1.267',
                BP212598mbar2: '1.464',
                MP49bar2: '1.464',
                box: '746',
            },
            {
                id: 5,
                hourlyFlow: '65',
                counterType: 'G40',
                boxOrMiniCabin: 'coffret/mini-cabine',
                conduct: 'BP: PE63(****) - MP: PE32',
                BP212598mbar1: '1.267',
                MP49bar1: '1.267',
                BP212598mbar2: '3.404',
                MP49bar2: '3.758',
                box: '1.815',
            },
            {
                id: 6,
                hourlyFlow: '100',
                counterType: 'G65',
                boxOrMiniCabin: 'coffret/mini-cabine',
                conduct: 'BP: PE110 ou PE63 - MP: PE32',
                BP212598mbar1: '1.690',
                MP49bar1: '1.690',
                BP212598mbar2: '5.017',
                MP49bar2: '5.538',
                box: '2.560',
            },
            {
                id: 7,
                hourlyFlow: '160',
                counterType: 'G100',
                boxOrMiniCabin: 'coffret/mini-cabine',
                conduct: 'BP: PE110 ou PE63 - MP: PE32',
                BP212598mbar1: '2.030',
                MP49bar1: '2.030',
                BP212598mbar2: '6.993',
                MP49bar2: '6.993',
                box: '2.560',
            },
        ],
    },
];
export const SIBELGA: any[] = [
    {
        id: 1,
        connectionType: 'BASSE PRESSION',
        cost: '474,00',
    },
    {
        id: 2,
        connectionType: 'MOYENNE PRESSION',
        cost: [
            {
                id: 1,
                mediumPressiure: '<= 160 m3/h',
                subConnectionType: [
                    {
                        type: 'Branchement MP Q <= 160 m³/h',
                        cost: '5922,00',
                    },
                    {
                        type: 'Poste de détente pour un débit de 40 à 160 m³/h (pour local)',
                        cost: '11708,00',
                    },
                    {
                        type: 'Poste de détente pour un débit de 40 à 160 m³/h (pour armoire)',
                        cost: '11708,00',
                    },
                ],
            },
            {
                id: 2,
                mediumPressiure: '> 160 m3/h',
                subConnectionType: [
                    {
                        type: 'Branchement MP pour un débit entre 160 m³/h et 1000 m³/h',
                        cost: '6982,00',
                    },
                ],
            },
        ],
    },
];
export const link = {
    FLUVIUS:
        'https://mijnpostcode.fluvius.be/?lang=nl&applicatie=Aansluiting-aanvragen',
    ORES: 'https://formulaires.ores.be/cmh-introduction/ores',
    SIBELGA:
        'https://www.sibelga.be/fr/raccordements-et-compteurs/nouveau-raccordement-gaz',
};
