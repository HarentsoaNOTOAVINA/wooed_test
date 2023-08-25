export interface menuItems {
    id: number;
    region: string;
    country?: string;
    condition: boolean;
    type: string;
    parentId: number;
    paths?: pathItems[];
    label?: string
}
interface pathItems {
    id: number;
    name?: string;
    path?: string;
    information?: string;
    condition?: boolean
}

export const dataMenu: menuItems[] = [
    {
        id: 1,
        region: 'flandre',
        country: "BE",
        condition: true,
        type: 'alert',
        parentId: 3,
        label: "Enregistrer ou Acheter une étiquette de vélo sur Bikebank",
        paths: [
            {
                id: 1,
                name: 'Enregistrer gratuitement mon vélo sur Bikebank',
                path: 'https://www.bikebank.be/fr',
                information:
                    "La police ou les municipalités enregistrent les vélos récupérés sur ce site. En cas de perte ou de vol, vous pouvez vérifier via ce site si votre vélo a déjà été retrouvé. Enregistrez votre vélo immédiatement après l'achat ou dès que possible gratuitement (avec photo) dans le Bikebank. Cela augmente la reconnaissance et les chances de retrouver votre vélo après un vol ou un enlèvement. Le label Bikebank est un outil supplémentaire pour enregistrer votre vélo et réduire les risques de vol.",
            },
            {
                id: 2,
                name: 'Acheter une étiquette de vélo Bikebank',
                path: 'https://app.bikebank.be/fr/login',
                information:
                    "Si le vélo est retrouvé, vous pouvez simplement scanner le code QR sur l'étiquette et ainsi découvrir le propriétaire du vélo. Si vous scannez le code QR, vous verrez toutes les caractéristiques et l'état du vélo. Dans le même temps, le propriétaire du vélo, Bikebank et toute assurance recevront un e-mail indiquant que le vélo a été scanné / retrouvé quelque part. Avec le label Bikebank, vous augmentez considérablement les chances de retrouver un vélo volé. Signalez-le toujours à la police ou via la police sur le Web",
            },
        ],
    },
    {
        id: 2,
        region: 'wallonie',
        country: "BE",
        condition: true,
        parentId: 3,
        type: 'alert',
        paths: [
            {
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
        country: "FR",
        condition: true,
        type: 'alert',
        parentId: 3,
        paths: [
            {
                id: 1,
                information: 'Enregistrer son vélo dans le Fichier national unique des cycles identifiés (Fnuci)',
                condition: true,
                // paths: [{
                //         id: 1,
                //         name: 'J’ai acquis un vélo neuf',
                //         information: '',
                //         router: true,
                //         path: ROUTES_NAME.MYPROPERTY.CARTE,
                //         params: [{
                //                 type: 'name',
                //                 name: ['property', 'id'],
                //             },
                //             {
                //                 type: 'value',
                //                 name: '/decathlon',
                //             },
                //         ],
                //     },
                //     {
                //         id: 1,
                //         name: 'J’ai acquis un vélo d’occasion',
                //         information: '',
                //         router: true,
                //         path: ROUTES_NAME.MYPROPERTY.CARTE,
                //         params: [{
                //                 type: 'name',
                //                 name: ['property', 'id'],
                //             },
                //             {
                //                 type: 'value',
                //                 name: '/decathlon',
                //             },
                //         ],
                //     },
                // ],
            },
        ],
    },
];
