interface SubOptions {
    id : number,
    label ?: string,
    type ?: string,
    name ?: string,
}
interface SubItem {
    id : number,
    label : string,
    name : string,
    
}
interface List {
    id : number, 
    label : any,
    name : string,
    type ?: string,
    required : boolean,
    placeholder ?: string,
    options? : any,
    class ? : string,
    subItem ?: SubOptions[]
}

export const days : {}[] = [{label : "Lundi", value : "Lundi"}, {label : "Mardi", value : "Mardi"}, {label : "Mercredi", value : "Mercredi"}, {label : "Jeudi", value : "Jeudi"}, {label : "Samedi", value : "Samedi"}, {label : "Dimanche",value : "Dimanche"}];


export const dates : List[]  = [
    {
        id : 0,
        label : "Disponibilité",
        type : "select",
        name : "disponibility",
        placeholder : "Sélectionez",
        required : true,
        options : [
             
              {
                    id : 1,
                    value : "A partir de",
                    label : "A partir de"
              },
              {
                    id : 2,
                    value : "Immédiatement",
                    label : "Immédiatement"
              },
             
        ],
        subItem : [
              {
                    id : 0,
                    label : "Disponible le",
                    type : "date",
                    name : "availabilityDate",
              },
        ]
    },
    {
        id : 2,
        label : {
            start : "Heure de début",
            end : "Heure de fin"
        },
        name : "Begining",
        type : "date",
        required : false,
        class : "content-100",
        subItem : [
            {
                id : 0,
                name : "startTime",
                label : "Heure de début"
            },
            {
                id : 1,
                name : "endTime",
                label : "Heure de fin"
            },
        ]
    },
    
]
