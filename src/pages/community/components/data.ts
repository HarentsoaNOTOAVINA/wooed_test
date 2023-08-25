export interface IAsideMenu{
    id : number,
    icon : string,
    buttonLabel : string,
    name : string
}

export interface IInfoData{
    icon : string,
    title : string,
    content : string
}

export const asideMenu : IAsideMenu[] = [
    {
        id : 0,
        icon: 'Chat',
        buttonLabel: 'Chat de discussion',
        name : "chatDiscussion",
    },
    {
        id : 1,
        icon: 'Actuality',
        buttonLabel: 'Actualités',
        name: 'actuality',
    },
    {
        id : 2,
        icon: 'World',
        buttonLabel: 'Publication',
        name : 'publication',
    },
    {
        id : 3,
        icon: 'Exit',
        buttonLabel: 'Quitter la comunauté',
        name : 'exit',
    },
]

export const infoData : IInfoData[] = [
    {
        icon: 'Immobilier',
        title: 'Nom de la comité',
        content: 'Tanambao',
    },
    {
        icon: 'Profile',
        title: 'Créateur',
        content: 'RANAIVONJANAHARY Fabrice',
    },
    {
        icon: 'Map',
        title: 'Périmètre géographique',
        content: 'Amboman-tana',
    },
    {
        icon: 'Cloud',
        title: 'Périmètre géographique',
        content: '50 membres',
    },
]
export const otherService : IAsideMenu[] = [
    {
        id : 0,
        buttonLabel: 'Fête de quartier',
        icon: 'World',
        name : 'blockParty',
    },
    {
        id : 1,
        buttonLabel: 'Partenariat local de prévention',
        icon: 'World',
        name : 'plp',
    },
    {
        id : 2,
        buttonLabel: 'Demande d’aide',
        icon: 'World',
        name : 'newService',
    },
    {
        id : 3,
        buttonLabel: 'Animaux perdus',
        icon: 'World',
        name : 'animal',
    },
    {
        id : 4,
        buttonLabel: 'Achats groupés',
        icon: 'World',
        name : 'buyGroup',
    },
    {
        id : 5,
        buttonLabel: 'Ventes d’objets/fournitures diverses',
        icon: 'World',
        name : 'purchase',
    },
    {
        id : 6,
        buttonLabel: 'Party/Pendaison de crémaillère',
        icon: 'World',
        name : 'houseWarming',
    },
    {
        id : 7,
        buttonLabel: 'Brocante',
        icon: 'World',
        name : 'fleatMarket',
    },
]