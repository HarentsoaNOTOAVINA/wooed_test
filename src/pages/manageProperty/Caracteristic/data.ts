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
      type ?: string
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
                        type : "switch"
                  },
                  {
                        id : 1,
                        label : "Coût annuel d'entretien du jardin",
                        name : "annualCost",
                        type : 'number'
                  }
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