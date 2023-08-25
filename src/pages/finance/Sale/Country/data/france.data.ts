interface TypesSelect {
    label: string;
    value: string | number; // value is stringify with this pattern => {code: number; name: string}
}

export const property_type: TypesSelect[] = [
    {
        label: 'Bien ancien',
        value: 'Bien ancien',
    },
    {
        label: 'Bien neuf (achevé depuis moins de 5ans)',
        value: 'Bien neuf (achevé depuis moins de 5ans)',
    },
    {
        label: 'Terrain',
        value: 'Terrain',
    },
];

export const financement: TypesSelect[] = [
    {
        label: 'Sans emprunt',
        value: 'Sans emprunt',
    },
    {
        label: 'Emprunt avec garantie hypothécaire',
        value: 'Emprunt avec garantie hypothécaire',
    },
    {
        label: 'Emprunt sans garantie hypothécaire',
        value: 'Emprunt sans garantie hypothécaire',
    },
];

export const property_seller: TypesSelect[] = [
    {
        label: 'Un particulier',
        value: 'Un particulier',
    },
    {
        label: 'Un professionnel assujetti à la TVA (marchand de biens , promoteur immobilier)',
        value: 'Un professionnel assujetti à la TVA (marchand de biens , promoteur immobilier)',
    },
];

export const ground_purchased: TypesSelect[] = [
    {
        label: 'Un particulier',
        value: 'Un particulier',
    },
    {
        label: 'Un professionnel (marchand de biens, promoteur immobilier)',
        value: 'Un professionnel (marchand de biens, promoteur immobilier)',
    },
];

export const france_departement: {
    code: number;
    name: string;
}[] = [
    {
        code: 1,
        name: 'Ain',
    },
    {
        code: 2,
        name: 'Aisne',
    },
    {
        code: 3,
        name: 'Allier',
    },
    {
        code: 4,
        name: 'Alpes-de-Haute-Provence',
    },
    {
        code: 5,
        name: 'Hautes-Alpes',
    },
    {
        code: 6,
        name: 'Alpes-Maritimes',
    },
    {
        code: 7,
        name: 'Ardèche',
    },
    {
        code: 8,
        name: 'Ardennes',
    },
    {
        code: 9,
        name: 'Ariège',
    },
    {
        code: 10,
        name: 'Aube',
    },
    {
        code: 11,
        name: 'Aude',
    },
    {
        code: 12,
        name: 'Aveyron',
    },
    {
        code: 13,
        name: 'Bouches-du-Rhône',
    },
    {
        code: 14,
        name: 'Calvados',
    },
    {
        code: 15,
        name: 'Cantal',
    },
    {
        code: 16,
        name: 'Charente',
    },
    {
        code: 17,
        name: 'Charente-Maritime',
    },
    {
        code: 18,
        name: 'Cher',
    },
    {
        code: 19,
        name: 'Corrèze',
    },
    {
        code: 20,
        name: 'Corse',
    },
    {
        code: 21,
        name: "Côte-d'Or",
    },
    {
        code: 22,
        name: "Côtes d'Armor",
    },
    {
        code: 23,
        name: 'Creuse',
    },
    {
        code: 24,
        name: 'Dordogne',
    },
    {
        code: 25,
        name: 'Doubs',
    },
    {
        code: 26,
        name: 'Drôme',
    },
    {
        code: 27,
        name: 'Eure',
    },
    {
        code: 28,
        name: 'Eure-et-Loir',
    },
    {
        code: 29,
        name: 'Finistère',
    },
    {
        code: 30,
        name: 'Gard',
    },
    {
        code: 31,
        name: 'Haute-Garonne',
    },
    {
        code: 32,
        name: 'Gers',
    },
    {
        code: 33,
        name: 'Gironde',
    },
    {
        code: 34,
        name: 'Hérault',
    },
    {
        code: 35,
        name: 'Ille-et-Vilaine',
    },
    {
        code: 36,
        name: 'Indre',
    },
    {
        code: 37,
        name: 'Indre-et-Loire',
    },
    {
        code: 38,
        name: 'Isère',
    },
    {
        code: 39,
        name: 'Jura',
    },
    {
        code: 40,
        name: 'Landes',
    },
    {
        code: 41,
        name: 'Loir-et-Cher',
    },
    {
        code: 42,
        name: 'Loire',
    },
    {
        code: 43,
        name: 'Haute-Loire',
    },
    {
        code: 44,
        name: 'Loire-Atlantique',
    },
    {
        code: 45,
        name: 'Loiret',
    },
    {
        code: 46,
        name: 'Lot',
    },
    {
        code: 47,
        name: 'Lot-et-Garonne',
    },
    {
        code: 48,
        name: 'Lozère',
    },
    {
        code: 49,
        name: 'Maine-et-Loire',
    },
    {
        code: 50,
        name: 'Manche',
    },
    {
        code: 51,
        name: 'Marne',
    },
    {
        code: 52,
        name: 'Haute-Marne',
    },
    {
        code: 53,
        name: 'Mayenne',
    },
    {
        code: 54,
        name: 'Meurthe-et-Moselle',
    },
    {
        code: 55,
        name: 'Meuse',
    },
    {
        code: 56,
        name: 'Morbihan',
    },
    {
        code: 57,
        name: 'Moselle',
    },
    {
        code: 58,
        name: 'Nièvre',
    },
    {
        code: 59,
        name: 'Nord',
    },
    {
        code: 60,
        name: 'Oise',
    },
    {
        code: 61,
        name: 'Orne',
    },
    {
        code: 62,
        name: 'Pas-de-Calais',
    },
    {
        code: 63,
        name: 'Puy-de-Dôme',
    },
    {
        code: 64,
        name: 'Pyrénées-Atlantiques',
    },
    {
        code: 65,
        name: 'Hautes-Pyrénées',
    },
    {
        code: 66,
        name: 'Pyrénées-Orientales',
    },
    {
        code: 67,
        name: 'Bas-Rhin',
    },
    {
        code: 68,
        name: 'Haut-Rhin',
    },
    {
        code: 69,
        name: 'Rhône',
    },
    {
        code: 70,
        name: 'Haute-Saône',
    },
    {
        code: 71,
        name: 'Saône-et-Loire',
    },
    {
        code: 72,
        name: 'Sarthe',
    },
    {
        code: 73,
        name: 'Savoie',
    },
    {
        code: 74,
        name: 'Haute-Savoie',
    },
    {
        code: 75,
        name: 'Paris',
    },
    {
        code: 76,
        name: 'Seine-Maritime',
    },
    {
        code: 77,
        name: 'Seine-et-Marne',
    },
    {
        code: 78,
        name: 'Yvelines',
    },
    {
        code: 79,
        name: 'Deux-Sèvres',
    },
    {
        code: 80,
        name: 'Somme',
    },
    {
        code: 81,
        name: 'Tarn',
    },
    {
        code: 82,
        name: 'Tarn-et-Garonne',
    },
    {
        code: 83,
        name: 'Var',
    },
    {
        code: 84,
        name: 'Vaucluse',
    },
    {
        code: 85,
        name: 'Vendée',
    },
    {
        code: 86,
        name: 'Vienne',
    },
    {
        code: 87,
        name: 'Haute-Vienne',
    },
    {
        code: 88,
        name: 'Vosges',
    },
    {
        code: 89,
        name: 'Yonne',
    },
    {
        code: 90,
        name: 'Territoire de Belfort',
    },
    {
        code: 91,
        name: 'Essonne',
    },
    {
        code: 92,
        name: 'Hauts-de-Seine',
    },
    {
        code: 93,
        name: 'Seine-St-Denis',
    },
    {
        code: 94,
        name: 'Val-de-Marne',
    },
    {
        code: 95,
        name: "Val-D'Oise",
    },
    {
        code: 971,
        name: 'Guadeloupe',
    },
    {
        code: 972,
        name: 'Martinique',
    },
    {
        code: 973,
        name: 'Guyane',
    },
    {
        code: 974,
        name: 'La Réunion',
    },
    {
        code: 976,
        name: 'Mayotte',
    },
];
