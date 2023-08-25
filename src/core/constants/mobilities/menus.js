import {
    ROUTES_NAME
} from '~/routes.js';

const Menus = [{
        id: 1,
        name: 'Chantiers en cours',
        router: true,
        path: ROUTES_NAME.MYPROPERTY.CARTE,
        params: [{
            type: 'name',
            name: ['property', 'id'],
        }, ],
    },
    {
        id: 2,
        name: 'Signaler une défectuosité dans la voirie',
        paths: [{
                id: 1,
                region: 'bruxelle',
                path: 'https://fixmystreet.brussels',
            },
            {
                id: 2,
                region: 'flandre',
                path: 'https://meldpuntwegen.be/meldpuntwegen/index.html#',
            },
            {
                id: 3,
                region: 'wallon',
                // region: 'bruxell',
                condition: true,
                type: 'alert',
                parentId: 0,
                paths: [{
                        id: 1,
                        name: 'Il s’agit d’une autoroute ou d’une route régionale',
                        path: 'tel:1718',
                    },
                    {
                        id: 2,
                        name: 'Il s’agit d’une rue ou d’une route communale',
                        router: true,
                        path: ROUTES_NAME.MYPROPERTY.CARTE,
                        params: [{
                                type: 'name',
                                name: ['property', 'id'],
                            },
                            {
                                type: 'value',
                                name: '/defectuosity',
                            },
                        ],
                    },
                ],
            },
            {
                path: 'https://teleservices.paris.fr/dansmarue',
                region: 'france',
            },
        ],
    },

    {
        id: 3,
        name: 'Velos',
        type: 'alert',
        condition: true,
        paths: [{
                id: 1,
                name: 'Enregistrer mon  vélo',
                /*     path: 'https://mybike.brussels/',
                        router: open, */
                type: 'alert',
                // condition: true,
                paths: [{
                        id: 1,
                        region: 'flandre',
                        condition: true,
                        type: 'alert',
                        parentId: 3,
                        paths: [{
                                id: 1,
                                name: 'Enregistrer gratuitement mon vélo sur Bikebank',
                                path: 'https://www.bikebank.be/fr',
                                information: "La police ou les municipalités enregistrent les vélos récupérés sur ce site. En cas de perte ou de vol, vous pouvez vérifier via ce site si votre vélo a déjà été retrouvé. Enregistrez votre vélo immédiatement après l'achat ou dès que possible gratuitement (avec photo) dans le Bikebank. Cela augmente la reconnaissance et les chances de retrouver votre vélo après un vol ou un enlèvement. Le label Bikebank est un outil supplémentaire pour enregistrer votre vélo et réduire les risques de vol.",
                            },
                            {
                                id: 2,
                                name: 'Acheter une étiquette de vélo Bikebank',
                                path: 'https://app.bikebank.be/fr/login',
                                information: "Si le vélo est retrouvé, vous pouvez simplement scanner le code QR sur l'étiquette et ainsi découvrir le propriétaire du vélo. Si vous scannez le code QR, vous verrez toutes les caractéristiques et l'état du vélo. Dans le même temps, le propriétaire du vélo, Bikebank et toute assurance recevront un e-mail indiquant que le vélo a été scanné / retrouvé quelque part. Avec le label Bikebank, vous augmentez considérablement les chances de retrouver un vélo volé. Signalez-le toujours à la police ou via la police sur le Web",
                            },
                        ],
                    },
                    {
                        id: 2,
                        region: 'wallonie',
                        condition: true,
                        parentId: 3,
                        type: 'alert',
                        paths: [{
                                id: 1,
                                name: 'Enregistrer gratuitement mon vélo sur Mybike.brussels',
                                path: 'https://mybike.brussels/',
                            },
                            {
                                id: 2,
                                name: 'Acheter un sticker « My Bike »',
                                path: 'https://mybike.brussels/',
                            },
                        ],
                    },
                    {
                        id: 4,
                        region: 'bruxell',
                        condition: true,
                        parentId: 3,
                        type: 'alert',
                        paths: [{
                                id: 1,
                                name: 'Enregistrer gratuitement mon vélo sur Mybike.brussels',
                                path: 'https://mybike.brussels/',
                            },
                            {
                                id: 2,
                                name: 'Acheter un sticker « My Bike »',
                                path: 'https://mybike.brussels/',
                            },
                        ],
                    },
                    {
                        id: 3,
                        region: 'wallon',
                        condition: true,
                        parentId: 3,
                        type: 'alert',
                        paths: [{
                                id: 1,
                                name: 'Enregistrer gratuitement mon vélo sur Mybike.brussels',
                                path: 'https://mybike.brussels/',
                            },
                            {
                                id: 2,
                                name: 'Acheter un sticker « My Bike »',
                                path: 'https://mybike.brussels/',
                            },
                        ],
                    },
                    {
                        id: 3,
                        region: 'france',
                        condition: true,
                        type: 'alert',
                        parentId: 3,
                        paths: [{
                            id: 1,
                            name: 'Enregistrer son vélo dans le Fichier national unique des cycles identifiés (Fnuci)',
                            condition: true,
                            paths: [{
                                    id: 1,
                                    name: 'J’ai acquis un vélo neuf',
                                    information: '',
                                    router: true,
                                    path: ROUTES_NAME.MYPROPERTY.CARTE,
                                    params: [{
                                            type: 'name',
                                            name: ['property', 'id'],
                                        },
                                        {
                                            type: 'value',
                                            name: '/decathlon',
                                        },
                                    ],
                                },
                                {
                                    id: 1,
                                    name: 'J’ai acquis un vélo d’occasion',
                                    information: '',
                                    router: true,
                                    path: ROUTES_NAME.MYPROPERTY.CARTE,
                                    params: [{
                                            type: 'name',
                                            name: ['property', 'id'],
                                        },
                                        {
                                            type: 'value',
                                            name: '/decathlon',
                                        },
                                    ],
                                },
                            ],
                        }, ],
                    },
                ],
            },
            {
                id: 2,
                name: 'Retrouver mon vélo',
                // condition: true,
                paths: [{
                        id: 1,
                        region: 'flandre',
                        path: 'https://app.bikebank.be/fr/search',
                    },
                    {
                        id: 2,
                        region: 'wallon',
                        condition: true,
                        type: 'alert',
                        parentId: 3,
                        paths: [{
                            id: 1,
                            name: 'Si votre vélo (enregistré sur bicycode.eu) est retrouvé, un mail vous informera des coordonnées du commissariat où venir le récupérer. ',
                            type: 'mail',
                            info: true
                        }, ],
                    },
                    {
                        id: 4,
                        region: 'bruxell',
                        condition: true,
                        type: 'alert',
                        parentId: 3,
                        paths: [{
                            id: 1,
                            name: 'Si votre vélo (enregistré sur bicycode.eu) est retrouvé, un mail vous informera des coordonnées du commissariat où venir le récupérer. ',
                            info: true
                        }, ],
                    },
                    {
                        id: 3,
                        region: 'france',
                        condition: true,
                        type: 'alert',
                        paths: [{
                            id: 1, // type: 'mail',
                            information: 'Si votre vélo (enregistré sur bicycode.eu) est retrouvé, un mail vous informera des coordonnées du commissariat où venir le récupérer. ',
                            info: true
                            // path: 'https://www.decathlon.fr/store-locator ',
                        }, ],
                    },
                ],
            },
            {
                id: 3,
                name: 'Déclarer le vol de mon vélo',
                // condition: true,
                paths: [{
                        id: 1,
                        region: 'flandre',
                        path: 'https://apps.digital.belgium.be/forms/show/police/bikeTheft?lng=fr',
                    },
                    {
                        id: 2,
                        region: 'bruxelle',
                        path: 'https://apps.digital.belgium.be/forms/show/police/bikeTheft?lng=fr',
                    },
                    {
                        id: 3,
                        region: 'wallon',
                        path: 'https://apps.digital.belgium.be/forms/show/police/bikeTheft?lng=fr',
                    },

                    {
                        id: 4,
                        region: 'france',
                        path: 'https://www.pre-plainte-en-ligne.gouv.fr/unite/',
                    },
                ],
            },
            {
                id: 4,
                name: 'Louer',
                router: true,
                type: 'router',
                // path: ROUTES_NAME.MYPROPERTY.CARTE,
                path: "/add",
                params: [],
            },
            {
                id: 5,
                name: 'Trouver un abri pour mon vélo',
                router: true,
                type: 'router',
                path: '/'
            },
        ],
    },
];

export default Menus;
