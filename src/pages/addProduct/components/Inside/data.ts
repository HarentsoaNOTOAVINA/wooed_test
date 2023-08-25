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
                        label : "Nombre des chambres à coucher",
                        name : "roomcount",
                        type : 'input',
                        // required : true,

                  }
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