import { IRegulation } from './interfaceDataRegulation';

export const regulationMaintainsTankBrussel: IRegulation[] = [
    // {
    //     title: 'Champ d’application',
    //     article: [
    //         {
    //             titleArt: 'Test Title Art',
    //             numberArt: 'Art. 2',
    //             subTitleArt: 'testSubTitleArt',
    //             contentArt:
    //                 'Le présent arrêté est d’application sur tous les ascenseurs à l’exception :',
    //             listeArt: [
    //                 {
    //                     liste: 'es ascenseurs de chantier ;',
    //                 },
    //                 {
    //                     liste: 'des installations à câbles, y compris les funiculaires ;',
    //                 },
    //                 {
    //                     liste: 'des ascenseurs spécialement conçus et construits à des fins militaires ou de maintien de l’ordre ;',
    //                 },
    //                 {
    //                     liste: 'es ascenseurs de chantier ;',
    //                 },
    //                 {
    //                     liste: 'es ascenseurs de chantier ;',
    //                 },
    //             ],
    //         },
    //     ],
    // },

    {
        title: 'Fréquence',
        frequency: [
            {
                titleFreq:
                    'Arrêté du Gouvernement de la Région de Bruxelles-Capitale du 01 février 2018 relatif aux dépôts de liquides inflammables utilisés comme combustible, art. 23 §2,1° et 30§2,a)',
                contentFreq: [
                    {
                        type: 'Réservoir enfoui existant > 10.000 litres équipé',
                        dateInspect: 'Voir plus',
                        link: 'https://environnement.brussels/le-permis-denvironnement/les-conditions-generales-et-specifiques/les-conditions-specifiques-dexploitation/reservoir-mazout-enfoui/vos-obligations-de-controles-reguliers',
                    },
                    {
                        type: 'Réservoir enfoui existant ≤ 10.000 litres équipé',
                    },
                    {
                        type: 'Réservoirs non enfouis',
                        dateInspect: 'Voir plus',
                        link: 'https://environnement.brussels/le-permis-denvironnement/les-conditions-generales-et-specifiques/les-conditions-specifiques-130',
                    },
                ],
            },
        ],
    },
    {
        title: 'Etendue du contrôle',
        frequency: [
            {
                contentFreq: [
                    {
                        type: 'Réservoirs non enfouis',
                        dateInspect: 'Voir plus',
                        link: 'https://environnement.brussels/le-permis-denvironnement/les-conditions-generales-et-specifiques/les-conditions-specifiques-122',
                    },
                ],
            },
        ],
    },
];
