import Adress from "@/pages/manageProperty/Adress/Adress.vue";
import Providers from "@/pages/manageProperty/providers/Provider.vue";
import Cadastre from "@/pages/manageProperty/Cadastre/Cadastre.vue";
import Media from "@/pages/manageProperty/Media/Photos.vue";
import Caracteristic from "@/pages/manageProperty/Caracteristic/Caracteristic.vue";
import Inside from "@/pages/manageProperty/Inside/Inside.vue";
import Energy from "@/pages/manageProperty/Energy/Energy.vue";


interface SubMenu{
    id : number,
    label : string,
    component : object
}

interface Menu {
    id : number,
    label : string,
    icon ?: object,
    children : Array<number>, 
    subMenu : SubMenu[],
    component ?: object
}



export const data : Menu[] = [
    {
        id : 0,
        label : "Information de base",
        children : [0, 1, 2, 3],
        subMenu : [
            {
                id : 0,
                label : 'Adresse',
                component : Adress,
            },
            {
                id : 1,
                label : 'Mon fournisseur, eau, gaz, electricité',
                component : Providers
            },
            {
                id : 2,
                label : 'Cadastre',
                component : Cadastre,
            },
            {
                id : 3,
                label : 'Photos',
                component : Media,
            },
        ]
    },
    {
        id : 4,
        label : "Information détaillée",
        children : [4, 5, 6],
        subMenu : [
            {
                id : 4,
                label : "Caractéristiques",
                component : Caracteristic,
            },
            {
                id : 5,
                label : "Intérieur",
                component : Inside,
            },
            {
                id : 6,
                label : "Caractéristiques énergetiques",
                component : Energy
            },
        ]
    },

]