import { IRegulation } from './interfaceDataRegulation';

export const regulationMaintainsTankWallonie: IRegulation[] = [
    {
        title: 'Fréquence',
        frequency: [
            {
                titleFreq: 'Réservoir enfoui ou non accessible',
                contentFreq: [
                    {
                        type: 'Simple paroi',
                        dateInspect: 'Tous les 3 ans',
                    },
                    {
                        type: 'Double paroi',
                        dateInspect: 'Tous les 10 ans',
                    },
                    {
                        type: 'Simple paroi avec détection de fuite',
                        dateInspect: 'Tous les 3 ans',
                        subContent: [
                            {
                                age: 'Entre 10 et 20 ans',
                                date: 'Tous les 10 ans',
                            },
                            {
                                age: 'Entre 20 et 30 ans',
                                date: 'Tous les 5 ans',
                            },
                            {
                                age: '+ de 30 ans',
                                date: 'Tous les 3 ans',
                            },
                        ],
                    },
                ],
            },
            {
                titleFreq: 'Réservoir aérien, en cave ou accessible',
                contentFreq: [
                    {
                        type: 'Avec encuvement 100% étanche',
                        dateInspect: 'Tous les 10 ans',
                    },
                    {
                        type: 'Sans encuvement 100% étanche',
                        dateInspect: 'Tous les 3 ans',
                    },
                ],
            },
            {
                titleFreq:
                    'En cas de doute sur l’âge et/ou le type du réservoir',
                inspectFreq: 'Tous les 3 ans',
            },
        ],
    },
    {
        title: 'Etendue du contrôle',
        extentControl: [
            {
                type: 'Citernes enfouies ou non accessible',
                definition:
                    'deux types de tests d’étanchéité sont actuellement pratiqués, le test aux ultrasons et le test par dépression.',
            },
            {
                type: 'Réservoir aérien',
                definition:
                    'si toutes les parois sont accessibles, le technicien pratique une vérification visuelle',
            },
        ],
    },
    {
        title: 'Actions requises',
        requiredAction: [
            {
                question:
                    'Que se passe-t-il après le test d’étanchéité ou la vérification visuelle ?',
                response:
                    'A la suite de ce test, le technicien (ou l’expert dans le cas d’une mise en service) remet une plaquette de couleur et un certificat indiquant la conformité de l’installation et le résultat du test, la validité, le nom et les coordonnées du technicien (ou de l’expert), l’adresse du réservoir et le numéro du certificat. La plaquette est aussitôt scellée sur la conduite de remplissage du réservoir.',
            },
        ],
    },
];
