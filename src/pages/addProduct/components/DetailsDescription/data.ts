interface IGeneral{
    id : number,
    name : string,
    label : string,
    type ?: string,
    placeholder ?: string,
    required ?: boolean
    options ?: IOption[],
    subOptions ?: ISub[]
}

interface ISub {
    id : number,
    name : string,
    label : string,
    type ?: string,
    placeholder ?: string,
    required ?: boolean
}

interface IOption{
    id : number,
    label : string,
    value : string,
}


export const data : IGeneral[] = [
    {
        id : 0,
        label : 'Destination du bien',
        name : 'landPropertyDestination',
        type : 'select',
              
    },
    {
        id : 1,
        label : "Le propriétaire fait appel à un jardinier",
        name : "callGarden",
        type : "switch",
        subOptions : [
            {
                id : 0,
                name : "costGarden",
                label : "Coût annuel",
                type : 'number'
            }
        ]
    }
]