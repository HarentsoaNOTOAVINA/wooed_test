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
                      label : "Nombre de chambre",
                      name : "roomcount",
                      type : 'input',
                      required : true,

                }
          ]
    }
]

export const details : ListItem[] = [
    {
          id : 0,
          label : "Chambre à coucher",
          name : "bedroomcount",
          type : "number",
    },
    {
          id : 1,
          label : "Nombre de salle de bain",
          name : "bathroomcount",
          type : "number",
    },
    {
          id : 2,
          label : "Surface (en m²)",
          name : "surface",
          type : "number",
          required : true,
    },
]


export const room :ListItem[] = [
    {
          id : 0,
          label : "Surface de chambre",
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
                      label : "Trou",
                      value : "Trou",
                      name : "trou"
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
          ]
    },
]