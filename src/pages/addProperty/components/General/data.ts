import Terasse from "@/components/Icon/Terasse.vue";
import Jardin from "@/components/Icon/Jardin.vue";
import Meuble from "@/components/Icon/Meuble.vue";
import Garage from "@/components/Icon/Garage.vue";
import Piscine from "@/components/Icon/Piscine.vue";
import Ascenceur from "@/components/Icon/Ascenceur.vue";
import Parking from "@/components/Icon/Parking.vue";


interface SubOption{
      id : number,
      name : string,
      label : string,
      type ?: string,
      options ?: any,
      placeholder ?: string
}
interface Option{
      id : number,
      name : string,
      subOptions : SubOption[]
}
interface otherLevel {
      id : number,
      name : string,
      label : string,
      check : boolean,
      icon ?: Object
}

interface item {
      id : number,
      label : string
      icon ?: Object
}
interface Niveau {
      id : number,
      title : string,
      item : item[]
}
interface Input{
      id : number,
      name : string,
      label : string,
      type ?: string
      required ?: Boolean 
}


interface Details {
      id : number,
      title : string,
      niveau : Niveau
}

export const input : Input[] = [
      {
            id : 0,
            name : "dailyEquipement",
            label : "Equipement pour la vie quotidienne"
      }
]



export const niveau : Niveau[]  = [
      {
            id : 0,
            title : "Niveau",
            item : [
                  {
                        id : 0,
                        label : "Cave",
                        icon : Terasse,
                  },
                  {
                        id : 1,
                        label : "Cuisine",
                        icon : Terasse,

                  },
                  {
                        id : 2,
                        label : "Salle de séjour",
                        icon : Terasse,
                  },
                  {
                        id : 3,
                        label : "Salon séparé",
                        icon : Terasse,
                  },
                  {
                        id : 4,
                        label : "Salle à manger",
                        icon : Terasse,
                  },
                  {
                        id : 5,
                        label : "Veranda",
                        icon : Terasse,
                  },
                  {
                        id : 6,
                        label : "Chambre",
                        icon : Terasse,
                  },
                  {
                        id : 7,
                        label : "Buanderie",
                        icon : Terasse,
                  },
            ]     
      }
]

export const otherLevel :otherLevel[] = [
      {
            id : 0,
            label : "Terasse",
            name : "terasse",
            check : false,
            icon : Terasse
      },
      {
            id : 1,
            label : "Jardin",
            name : "garden",
            check : false,
            icon : Jardin
      },
      {
            id : 2,
            label : "Meuble",
            name : "furniture",
            check : false,
            icon : Meuble
      },
      {
            id : 3,
            label : "Garage",
            name : "garage",
            check : false,
            icon : Garage
      },
      {
            id : 4,
            label : "Piscine",
            name : "pool",
            check : false,
            icon : Piscine
      },
      {
            id : 5,
            label : "Assenceur",
            name : "assent",
            check : false,
            icon : Ascenceur
      },
      {
            id : 6,
            label : "Parking",
            name : "parking",
            check : false,
            icon : Parking
      },
]


export const gardenOptions : Option[] = [
      {
            id : 0,
            name : 'garden',
            subOptions : [
                  {
                        id : 0,
                        label : "Je fais appel à un jardinier",
                        name : "callGardener",
                        type : "switch",
                  },
                  {
                        id : 1,
                        label : "Coût annuel d'entretien du jardin",
                        name : "annualCost",
                        type : 'number',
                        placeholder : 'Montant (en  €)'
                  },
                  {
                        id : 2,
                        label : "Orientation",
                        name : "gardenOrientation",
                        type : 'select',
                        options : [
                              {
                                    label : "Nord",
                                    value : "Nord"
                              },
                              {
                                    label : "Nord-Est",
                                    value : "Nord-Est"
                              },
                              {
                                    label : "Nord-Ouest",
                                    value : "Nord-Ouest"
                              },
                              {
                                    label : "Sud",
                                    value : "Sud"
                              },
                              {
                                    label : "Sud-Est",
                                    value : "Sud-Est"
                              },
                              {
                                    label : "Sud-Ouest",
                                    value : "Sud-Ouest"
                              },
                              
                              {
                                    label : "Est",
                                    value : "Est"
                              },
                              {
                                    label : "Ouest",
                                    value : "Ouest"
                              },
                        ]
                        
                  },

            ]
      }
]

export const garageOptions : Option[] = [
      {
            id : 0,
            name : "garage",
            subOptions : [
                  {
                        id : 0,
                        label : "Nombre de place de parking",
                        name : "garagePlaceNumber",
                        type : "number"
                  }
            ]
      }
]

export const modalItemOption : SubOption[] = [
      {
            id : 0,
            name : 'otherOptions',
            label : 'Nom',
            type : 'text'
      }
]

export const modalItemFeature : SubOption[] = [
      {
            id : 0,
            name : 'otherFeatures',
            label : 'Nom',
            type : 'text'
      }
]




/**
 * 
 * Data of inside
 * 
 */
interface ISub {
      id : number,
      name : string,
      label : string, 
      value : string,
}
interface ListItem{
      id : number,
      label : string,
      name : string,
      type : string,
      max ?: string,
      min ?: string,
      placeholder ?: string,
      subOptions ?: ISub[],
      otherHeating ?: any,
      required ?: boolean
}


interface List{
      id : number,
      title : string,
      item : ListItem[]
}


export const menuList :List[] = [
      {
            id : 0,
            title : "A propos du chambre",
            item : [
                  {
                        id : 0,
                        label : "Nombre des chambres",
                        name : "roomcount",
                        type : 'input',
                  },
                  {
                        id : 1,
                        label : "Nombre d’espaces distincts",
                        name : "spaceCount",
                        type : 'input',
                  },
            ]
      }
]

export const details : ListItem[] = [
      // {
      //       id : 0,
      //       label : "Nombre de chambres à coucher",
      //       name : "bedroomcount",
      //       type : "number",
      // },
      {
            id : 1,
            label : "Nombre de salles d'eau",
            name : "bathroomcount",
            // required : true,
            type : "number",
      },
      {
            id : 2,
            label : "Nombre de sanitaire",
            name : "numberSanitary",
            // required : true,
            type : "number",
      },
]


export const room :ListItem[] = [
      {
            id : 0,
            label : "Surface m²",
            name : "surface",
            type : "number",
      },
      {
            id : 1,
            label : "Type de vitrage",
            name : "glassType",
            type : "select",
            subOptions : [
                  {
                        id : 0,
                        label : "Simple",
                        value : "Simple",
                        name : "simple"
                  },
                  {
                        id : 1,
                        label : "Double",
                        value : "Double",
                        name : "double"
                  },
                  {
                        id : 2,
                        label : "Triple",
                        value : "Triple",
                        name : "triple"
                  },
                  {
                        id : 3,
                        label : "Autre",
                        value : "Autre",
                        name : "other"
                  },
            ]
      },
      {
            id : 1,
            label : "Dérnière rénovation",
            name : "lastRenovation",
            type : "date",
      },
      {
            id : 3,
            label : "Type de chauffage",
            name : "heatingType",
            type : "select",
            subOptions : [
                  {
                        id : 0,
                        label : "Gaz",
                        name : 'gaz',
                        value : 'Gaz'
                  },
                  {
                        id : 1,
                        label : "Mazout",
                        name : 'gaz',
                        value : 'Mazout'
                  },
                  {
                        id : 2,
                        label : "Pompe à chaleur",
                        name : 'chaleur',
                        value : 'Pompe à chaleur'
                  },
                  {
                        id : 3,
                        label : "Électrique",
                        value : "Électrique",
                        name : "electric"
                  },
                  {
                        id : 4,
                        label : "Autre",
                        value : "Autre",
                        name : "other"
                  },
            ],
            otherHeating: {
                  label : "Chauffage",
                  name : "heating",
                  type : "select",
                  subOptions : [
                        {
                              id : 0,
                              label : "Radiateur",
                              name : 'Radiateur',
                              value : 'Radiateur'
                        },
                        {
                              id : 1,
                              label : "Chauffage de sol",
                              name : 'Chauffage de sol',
                              value : 'Chauffage de sol'
                        },
                        {
                              id : 2,
                              label : "Airconditionnée",
                              name : 'Airconditionnée',
                              value : 'Airconditionnée'
                        },
                        {
                              id : 3,
                              label : "Autre",
                              value : "Autre",
                              name : "other"
                        },
                  ],
            }
      },
]


export const glassType = [
      {
            id : 0,
            label : "Simple",
            value : "Simple",
            name : "simple"
      },
      {
            id : 1,
            label : "Double",
            value : "Double",
            name : "double"
      },
      {
            id : 2,
            label : "Triple",
            value : "Triple",
            name : "triple"
      },
      {
            id : 3,
            label : "Autre",
            value : "Autre",
            name : "other"
      },
]