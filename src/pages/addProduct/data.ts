
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import Adress from '@/pages/addProduct/components/Address/Address.vue';
import Photos from '@/pages/addProduct/components/Photos/Photos.vue';
import Price from '@/pages/addProduct/components/Price/Price.vue';
import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
import Visites from "@/pages/addProduct/components/Visites/Visites.vue";
interface SubMenu{
      id : number,
      label : string,
      component ?: object
}
interface Menu {
      id : number,
      label : string,
      icon : object,
      subMenu ?: SubMenu[],
      component ?: object
}

export const data : Menu[] = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 0,
                        label : "Type de bien",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Adresse",
                        component : Adress
                  },
                  {
                        id : 2,
                        label : "Photos",
                        component : Photos
                  },
                  {
                        id : 3,
                        label : "Prix",
                        component : Price
                  },
            ]
      },
      {
            id : 4,
            label : "Information de base",
            icon : DefaultMenu,
            subMenu : [
                  {
                        id : 4,
                        label : "Générale",
                  },
                  {
                        id : 5,
                        label : "intérieur",
                  },
                  {
                        id : 6,
                        label : "Caractéristique énergetique",
                  },
            ]
      },
      
      {
            id : 7,
            label : "Déscription de votre bien",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 8,
            label : "Documents relatifs au bien",
            icon : DefaultMenu,
            component : PropertyType,
      },
      {
            id : 9,
            label : "Visites",
            icon : DefaultMenu,
            component : Visites,
      },
]

export const particularMenu = [
      {
            label : "Je souhaite faire appel à un professionnel pour la vente de mon bien",
            value : "/liste-contact/agence",
      },
      {
            label : "Je souhaite faire appel à un membre de l’application pour la vente de mon bien",
            value : "/liste-contact/membre",

      },
      {
            label : "Je souhaite vendre le bien via les services de l’application",
            value : -1,
      },
]
