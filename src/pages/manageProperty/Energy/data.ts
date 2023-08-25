
interface Item {
    id : number,
    label : string,
    name : string,
    value ?: string,
}
interface Peb{
    id : number,
    label : string,
    color ?: string,
    min : number,
    max : number
}

interface subItem {
    id : number,
    label : string, 
    name : string,
    type : string,
}

interface List {
    id : number,
    label : string, 
    name : string,
    type : string,
    options ?: Item[],
    subItem ?: subItem[]
}


export const menuList :List[] = [
    {
          id : 0,
          label : "Type de chaudière",
          name : "boilerType",
          type : "select",
          options : [
                {
                      id : 0,
                      label : "Mazout",
                      name : "mazout",
                      value : "mazout"
                },
                {
                      id : 1,
                      label : "Gaz",
                      name: "gaz",
                      value : 'gaz'
                },
          ]
    },
    {
          id : 1,
          label : "Date d'installation de chaudière",
          name : "boilerInstallationTime",
          type : "date" 
    },
    {
          id : 0,
          label : "Résultat PEB",
          name : "pebResult",
          type : "number",
          subItem : [
                {
                      id : 0,
                      label : "Numéro",
                      name : 'certnumber',
                      type : "text"
                },
                {
                      id : 1,
                      label : "Energie annuelle",
                      name : 'annualenergy',
                      type : "number"
                },
                {
                      id : 2,
                      label : "Energie primaire",
                      name : 'primaryenergy',
                      type : "number"
                },
          ]
    },
];


export const hebergementData : List[] = [
    {
          id : 0,
          label : 'Type de chauffage',
          name : 'boilerType',
          type : 'select',
          options : [
                {
                      id : 0,
                      label : "Mazout",
                      name : "mazout",
                      value : "mazout"
                },
                {
                      id : 1,
                      label : "Gaz",
                      name: "gaz",
                      value : 'gaz'
                },
          ]
    },
    {
          id : 1,
          label : "Date d'installation",
          name : "boilerInstallationTime",
          type : "date",
    },
    {
          id : 2,
          label : "Conformité chaudière",
          name : "boilerCompliance",
          type : "text"
    },
    {
          id : 3,
          label : "Etanchéite à l'air",
          name : "airtightness ",
          type : "text"
    },
    {
          id : 4,
          label :"Cout annuel de la consommation en gaz",
          name : "annualCostHeatingConsumption",
          type : "number"
    }

]

// export const  

export const PEBValue :Peb[] = [
    {
          id : 0,
          label : "A+",
          color : "#0F8841",
          min : 0,
          max: 45,
    },
    {
          id : 1,
          label : "A",
          color : "#18B357",
          min : 46,
          max: 85,
    },
    {
          id : 2,
          label : "B",
          color : "#35CA34",
          min : 86,
          max: 170,
    },
    {
          id : 3,
          label : "C",
          color : "#68FB33",
          min : 171,
          max: 255,
    },
    {
          id : 4,
          label : "D",
          min : 256,
          color : "#CDFD38",
          max: 340,
    },
    {
          id : 5,
          label : "E",
          min : 341,
          color : "#FFE556",
          max: 425,
    },
    {
          id : 6,
          label : "F",
          color : "#FEC601",
          min : 426,
          max: 510,
    },
    {
          id : 7,
          label : "G",
          color : "#FF9935",
          min : 511,
          max: 10000000000000000,
    },
]