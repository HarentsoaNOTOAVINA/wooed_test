import Navigation from "../navigation/Navigation.vue";
interface SubMenu {
    id: number,
    label: string,
    path?: string,
    name?: string,
    routeName?:string,
    icon?: string,
    component?: object
}
interface ISideMenu {
    id: number,
    label: string,
    name?: string,
    path?: string,
    icon?: string,
    subMenu?: SubMenu[],
    component?: object
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: "Statut environnemental du bien",
        name: "EnvironmentalStatus",
        icon: 'status',
        path: '/statut-environnemental',
    },
    {

        id: 1,
        label: "Citerne",
        name: "citerne",
        icon: 'MenuTransport',
        
        subMenu: [
            {
                id: 11,
                label: "Mes declarations et permis environmentales",
                name: "declaration and permit ",
                path: '/citerne',
            },
            {
                id: 12,
                label: "Registre",
                name: "register",
                path: '/registre',
            },
            {
                id: 13,
                label: "Obligations",
                name: "obligation",
                path: '/obligations',
            },
            {
                id: 13,
                label: "Procédures",
                name: "procedure",
                path: '/procedure',
            },
        ]
    },
    {
        id: 2,
        label: "Inondation",
        name: "inondation",
        icon: 'innondation',
        path: '/inondation',
    },
    {
        id: 3,
        label: "Station d'épuration individuelle",
        name: "announce",
        icon: 'WaterTreatment',
        path: '/station-d-epuration',
    },
    {
        id: 4,
        label: "Jardin potager",
        name: "collective-garden",
        path: '/jardin-collectif',
        icon: 'GardenWatering',
    },

]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')