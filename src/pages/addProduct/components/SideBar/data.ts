
import DefaultMenu from '@/components/Icon/DefaultMenuIcon.vue';
import Adress from '@/pages/addProduct/components/Address/Address.vue';
import Photos from '@/pages/addProduct/components/Photos/Photos.vue';
import Price from '@/pages/addProduct/components/Price/Price.vue';
import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
import General from "@/pages/addProduct/components/General/General.vue";
import Inside from '@/pages/addProduct/components/Inside/Inside.vue';
import Energy from '@/pages/addProduct/components/Energy/Energy.vue';
import Description from '@/pages/addProduct/components/Description/Description.vue';
import Documents from '@/pages/addProduct/components/Documents/Documents.vue';
import GeneralDescription from '@/pages/addProduct/components/GeneralDescription/GeneralDescription.vue'
import DetailDescription from '@/pages/addProduct/components/DetailsDescription/DetailDescription.vue'
import Visites from  "@/pages/addProduct/components/Visites/Visites.vue"
import Disponibility from "@/pages/addProduct/components/DisponibilityMinute/Disponibility.vue";
import Confirmation from "@/pages/addProduct/components/Confirmation/Confirmation.vue";
import Environment from "@/pages/addProduct/components/Envirironment/Environment.vue"
import Urbanisme from "@/pages/addProduct/components/Urbanisme/Urbanisme.vue";
import LivingArea from "@/pages/addProduct/components/LivingArea/LivingArea.vue";
import Immopass from "@/pages/addProduct/components/Immopass/Immopass.vue";
import Electric from "@/pages/addProduct/components/Electric/Electric.vue";
import WaterConnection from "@/pages/addProduct/components/WaterConnection/WaterConnection.vue";
import SewerConnection from "@/pages/addProduct/components/SewerConnection/SewerConnection.vue";
import CadastralReturn from "@/pages/addProduct/components/CadastralReturn/CadastralReturn.vue";
import Dispo from "@/pages/addProduct/components/Disponibility/Disponibility.vue";
import Property from "@/pages/addProduct/components/Property2/Property.vue";


interface SubMenu{
      id : number,
      label : string | Array<string>,
      component ?: object
}

interface Menu {
      id : number,
      label : string | Array<string>,
      icon : object,
      children ?: Array<number>, 
      subMenu ?: SubMenu[],
      component ?: object
}

export const data : Menu[] = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            children : [0, 1,2,3],
            // children : [0, 1, 2, 3],
            subMenu : [
                  {
                        id : 0,
                        label : "Type d'annonce",
                        component : PropertyType
                        // component : Energy,
                  },
                  {
                        id : 1,
                        label : "Type de biens",
                        // component : Adress,
                        component : Property,
                  },
                  {
                        id : 2,
                        label : "Adresse",
                        component : Adress,
                        // component : Property,
                  },
                  {
                        id : 3,
                        label : "Superficie habitable",
                        component : LivingArea,
                        // component : Visites,

                  },
                  // {
                  //       id : 3,
                  //       label : "Prix",
                  //       component : Price
                  // },
            ]
      },
      {
            id : 4,
            label : "Descriptions détaillées de votre bien",
            icon : DefaultMenu,
            children : [4, 5, 6, 7, 8, 9,10, 11, 12],
            subMenu : [
                  {
                        id : 4,
                        label : "Détails des pièces",
                        component : General,

                  },
                  // {
                  //       id : 4,
                  //       label : "Intérieur",
                  //       component : Inside,
                  // },
                  {
                        id : 5,
                        label : 'Etat du bien',
                        component : Immopass
                  },

                  {
                        id : 6,
                        label : "Caractéristiques énergétiques",
                        component : Energy,
                  },

                  {
                        id : 7,
                        label : "Caractéristiques électriques",
                        component : Electric
                  },
                  {
                        id : 8,
                        label : 'Reaux d\'eaux',
                        component : WaterConnection
                  },
                  {
                        id : 9,
                        label : "Raccordement aux égouts",
                        component : SewerConnection
                  },

                  {
                        id : 10,
                        label : "Environnement",
                        component : Environment
                  },
                  {
                        id : 11,
                        label : "Urbanisme",
                        component : Urbanisme
                  },
                  {
                        id : 12,
                        label : "Photo et vidéo",
                        component : Photos,
                        // component : Price,
                  },
            ]
      },
      // {
      //       id : 13,
      //       label : "Déscription de votre bien",
      //       icon : DefaultMenu,
      //       children : [13],
      //       subMenu : [
      //             {
      //                   id : 13,
      //                   label : "Description",
      //                   component : Description
      //             }
      //       ]
      // },
      {
            id : 13,
            label : "Disponibilité",
            icon : DefaultMenu,
            children : [13],
            subMenu : [
                  {
                        id : 13,
                        label : "Disponibilité",
                        component : Dispo
                  }
            ]
      },
      {
            id : 14,
            label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
            icon : DefaultMenu,
            children : [14],
            subMenu : [
                  {
                        id : 14,
                        label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
                        component : CadastralReturn
                  }
            ]
      },
      {
            id : 15,
            label : "Prix",
            icon : DefaultMenu,
            children : [15],
            subMenu : [
                  {
                        id : 15,
                        label : "Prix",
                        component : Price
                  }
            ]
            
      },
      {
            id : 16,
            label : "Documents relatifs au bien",
            icon : DefaultMenu,
            children : [16],
            subMenu : [
                  {
                        id : 16,
                        label : "Documents",
                        component : Documents,

                  }
            ]
            
      },
      {
            id : 17,
            label : "Visites",
            icon : DefaultMenu,
            children  : [17],
            subMenu : [
                  {
                        id : 17,
                        label : "Visites",
                        component : Visites
                  }
            ]
      },
      {
            id : 18,
            label : "Confirmation",
            icon : DefaultMenu,
            children : [18],
            subMenu : [
                  {
                        id : 18,
                        label : "Confirmation de votre annonce",
                        component : Confirmation
                  }
            ]
      }
]

export const dataGround : Menu[] = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            children : [0, 1, 2, 3],
            // children : [0, 1, 2, 3],
            subMenu : [
                  {
                        id : 0,
                        label : "Type d'annonce",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Type de biens",
                        // component : Adress,
                        component : Property,
                  },
                  {
                        id : 2,
                        label : "Adresse",
                        component : Adress,
                        // component : Property,
                  },
                  {
                        id : 3,
                        label : "Superficie habitable",
                        component : LivingArea,
                        // component : Visites,

                  },
                  
                  // {
                  //       id : 3,
                  //       label : "Prix",
                  //       component : Price
                  // },
            ]
      },
      {
            id : 4,
            label : "Information détaillé",
            icon : DefaultMenu,
            children : [ 4, 5, 6, 7, 8, 9, 10, 11],
            subMenu : [
                  {
                        id : 4,
                        label : "Description detaillé",
                        component : DetailDescription,
                  },
                  
                  {
                        id : 5,
                        label : 'Etat du bien',
                        component : Immopass
                  },
                  

                  {
                        id : 6,
                        label : "Caractéristiques électriques",
                        component : Electric
                  },
                  {
                        id : 7,
                        label : 'Réseaux d\'eaux',
                        component : WaterConnection
                  },
                  {
                        id : 8,
                        label : "Raccordement aux égouts",
                        component : SewerConnection
                  },
                  {
                        id : 9,
                        label : "Environnement",
                        component : Environment
                  },
                  {
                        id : 10,
                        label : "Urbanisme",
                        component : Urbanisme
                  },
                  
                  {
                        id : 11,
                        label : "Photo et vidéo",
                        component : Photos,
                  },
            ]
      },
      // {
      //       id : 11,
      //       label : "Déscription de votre bien",
      //       icon : DefaultMenu,
      //       children : [11],
      //       subMenu : [
      //             {
      //                   id : 11,
      //                   label : "Description",
      //                   component : Description
      //             }
      //       ]
      // },

      {
            id : 12,
            label : "Disponibilité",
            icon : DefaultMenu,
            children : [12],
            subMenu : [
                  {
                        id : 12,
                        label : "Disponibilité",
                        component : Dispo
                  }
            ]
      },
      {
            id : 13,
            label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
            icon : DefaultMenu,
            children : [13],
            subMenu : [
                  {
                        id : 13,
                        label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
                        component : CadastralReturn
                  }
            ]
      },

      {
            id : 14,
            label : "Prix",
            icon : DefaultMenu,
            children : [14],
            subMenu : [
                  {
                        id : 14,
                        label : "Prix",
                        component : Price
                  }
            ]
            
      }, 
      

      {
            id : 15,
            label : "Documents relatifs au bien",
            icon : DefaultMenu,
            children : [15],
            subMenu : [
                  {
                        id : 15,
                        label : "Documents",
                        component : Documents
                  }
            ]
            
      },
      {
            id : 16,
            label : "Confirmation",
            icon : DefaultMenu,
            children : [16],
            subMenu : [
                  {
                        id : 16,
                        label : "Confirmation de votre annonce",
                        component : Confirmation
                  }
            ]
      }
]


export const dataLocation : Menu[] = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            children : [0, 1, 2, 3],
            // children : [0, 1, 2, 3],
            subMenu : [
                  {
                        id : 0,
                        label : "Type d'annonce",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Type de biens",
                        // component : Adress,
                        component : Property,
                  },
                  {
                        id : 2,
                        label : "Adresse",
                        component : Adress,
                        // component : Property,
                  },
                  {
                        id : 3,
                        label : "Superficie habitable",
                        component : LivingArea,
                        // component : Visites,

                  },
                  // {
                  //       id : 3,
                  //       label : "Loyer",
                  //       component : Price
                  // },
            ]
      },
      {
            id : 4,
            label : "Descriptions détaillées de votre bien",
            icon : DefaultMenu,
            children : [4, 5, 6, 7, 8,9, 10, 11, 12],
            subMenu : [
                  {
                        id : 4,
                        label : "Détails des pièces",
                        component : General,
                  },
                  // {
                  //       id : 4,
                  //       label : "Intérieur",
                  //       component : Inside,
                  // },
                  {
                        id : 5,
                        label : 'Etat du bien',
                        component : Immopass
                  },
                  
                  {
                        id : 6,
                        label : "Caractéristique énergetique",
                        component : Energy,
                  },
                  

                  {
                        id : 7,
                        label : "Caractéristiques électriques",
                        component : Electric
                  },
                  {
                        id : 8,
                        label : 'Raccordement aux réseaux d\'eaux',
                        component : WaterConnection
                  },
                  {
                        id : 9,
                        label : "Raccordement aux égouts",
                        component : SewerConnection
                  },
                  
                  
                  {
                        id : 10,
                        label : "Environnement",
                        component : Environment
                  },
                  {
                        id : 11,
                        label : "Urbanisme",
                        component : Urbanisme
                  },
                  {
                        id : 12,
                        label : "Photo et vidéo",
                        component : Photos,
                  },
            ]
      },

      {
            id : 13,
            label : "Disponibilité",
            icon : DefaultMenu,
            children : [13],
            subMenu : [
                  {
                        id : 13,
                        label : "Disponibilité",
                        component : Dispo
                  }
            ]
      },
      {
            id : 14,
            label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
            icon : DefaultMenu,
            children : [14],
            subMenu : [
                  {
                        id : 14,
                        label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
                        component : CadastralReturn
                  }
            ]
      },
      {
            id : 15,
            label : "Loyer",
            icon : DefaultMenu,
            children : [15],
            subMenu : [
                  {
                        id : 15,
                        label : "Loyer",
                        component : Price
                  }
            ]
      },
      // {
      //       id : 14,
      //       label : "Déscription de votre bien",
      //       icon : DefaultMenu,
      //       children : [14],
      //       subMenu : [
      //             {
      //                   id : 14,
      //                   label : "Description",
      //                   component : Description
      //             }
      //       ]
      // },
      {
            id : 16,
            label : "Documents relatifs au bien",
            icon : DefaultMenu,
            children : [16],
            subMenu : [
                  {
                        id : 16,
                        label : "Documents",
                        component : Documents
                  }
            ]
            
      },
      {
            id : 17,
            label : "Confirmation",
            icon : DefaultMenu,
            children : [17],
            subMenu : [
                  {
                        id : 17,
                        label : "Confirmation de votre annonce",
                        component : Confirmation
                  }
            ]
      }
]

export const dataLocationMinute : Menu[] = [
      {
            id : 0,
            label : "Information de base",
            icon : DefaultMenu,
            children : [0, 1, 2, 3],
            // children : [0, 1, 2, 3, 4],
            subMenu : [
                  {
                        id : 0,
                        label : "Type d'annonce",
                        component : PropertyType
                  },
                  {
                        id : 1,
                        label : "Type de biens",
                        // component : Adress,
                        component : Property,
                  },
                  {
                        id : 2,
                        label : "Adresse",
                        component : Adress,
                        // component : Property,
                  },
                  {
                        id : 3,
                        label : "Superficie habitable",
                        component : LivingArea,
                        // component : Visites,

                  },
            ]
      },
      {
            id : 4,
            label : "Descriptions détaillées de votre bien",
            icon : DefaultMenu,
            children : [4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14],
            subMenu : [
                  
                  {
                        id : 4,
                        label : "Disponibilité",
                        component : Disponibility
                  },
                  {
                        id : 5,
                        label : "Générale",
                        component : General,
                  },
                  // {
                  //       id : 5,
                  //       label : "Intérieur",
                  //       component : Inside,
                  // },
                  
                  {
                        id : 6,
                        label : 'Etat du bien',
                        component : Immopass
                  },
                  {
                        id : 7,
                        label : "Caractéristique énergetique",
                        component : Energy,
                  },
                  

                  {
                        id : 8,
                        label : "Caractéristiques électriques",
                        component : Electric
                  },
                  {
                        id : 9,
                        label : 'Réseaux d\'eaux',
                        component : WaterConnection
                  },
                  {
                        id : 10,
                        label : "Raccordement aux égouts",
                        component : SewerConnection
                  },
                  
                  
                  {
                        id : 11,
                        label : "Environnement",
                        component : Environment
                  },
                  {
                        id : 12,
                        label : "Urbanisme",
                        component : Urbanisme
                  },
                  {
                        id : 13,
                        label : "Photo et vidéo",
                        component : Photos,
                  },
                  {
                        id : 14,
                        label : "Loyer",
                        component : Price
                  },
            ]
      },
      // {
      //       id : 15,
      //       label : "Déscription de votre bien",
      //       icon : DefaultMenu,
      //       children : [15],
      //       subMenu : [
      //             {
      //                   id : 15,
      //                   label : "Description",
      //                   component : Description
      //             }
      //       ]
      // },
      {
            id : 15,
            label : "Disponibilité",
            icon : DefaultMenu,
            children : [15],
            subMenu : [
                  {
                        id : 15,
                        label : "Disponibilité",
                        component : Dispo
                  }
            ]
      },
      {
            id : 16,
            label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
            icon : DefaultMenu,
            children : [16],
            subMenu : [
                  {
                        id : 16,
                        label : ["Revenu cadastral", "Valeur unitaire", "Valeur locative cadastrale"],
                        component : CadastralReturn
                  }
            ]
      },
      {
            id : 17,
            label : "Documents relatifs au bien",
            icon : DefaultMenu,
            children : [17],
            subMenu : [
                  {
                        id : 17,
                        label : "Documents",
                        component : Documents
                  }
            ]
            
      },
      {
            id : 18,
            label : "Confirmation",
            icon : DefaultMenu,
            children : [18],
            subMenu : [
                  {
                        id : 18,
                        label : "Confirmation de votre annonce",
                        component : Confirmation
                  }
            ]
      }
]