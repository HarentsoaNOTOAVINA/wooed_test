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

export const sewerData : List[] = [
    {
        id : 0,
        label : "Votre bien est-il raccordé aux égouts",
        name : "connectToSewer",
        type : 'switch',
    },
]

export const notSewerData : List[] = [
    {
        id : 0,
        label : "Autres types",
        name : "sewerOtherType",
        type : "select",
        options : [
            {
                label : "Raccordé à une fosse septique",
                value : "Raccordé à une fosse septique",
            },
            {
                label : "Installation d'épuration individuel",
                value : "Installation d'épuration individuel",
            }
        ]
    },
    {
        id : 1,
        label : "Date de dernier contrôle",
        name : "lastControlDateSewer",
        type : 'date',
    },
    {
        id : 2,
        label : "Document relatif",
        name : "sewerDocument",
        type : 'file'
    }
]