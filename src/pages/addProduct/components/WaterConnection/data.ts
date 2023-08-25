interface ISubitem{
    id : number,
    label : string,
    name : string,
    type : string,
}

interface Options{
    label : string,
    value : string
}

interface List {
    id : number,
    label : string,
    name : string,
    type : string,
    options  ?: Array<Options>,
    subItem ?: ISubitem[]
}

export const ElectricData : List[] = [
    {
        id : 0,
        label : "Le compteur d'eau est",
        name : "counterWaterName",
        type : "select",
        options : [
            {
                label : "Privatif",
                value : "Privatif"
            },
            
            {
                label : "Commun",
                value : "Commun"
            }
        ]
        
    }
]