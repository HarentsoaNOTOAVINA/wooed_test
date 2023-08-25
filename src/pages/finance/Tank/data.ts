interface IItem{
    id : number,
    name: string,
    label ?: string,
    placeholder ?: string,
    type : string,
    disable ?: boolean,
}

interface ITank{
    id : number,
    title ?: string,
    item ?: IItem[]
}

export const tankData : ITank[] = [
    {
        id : 0,
        item : [
            {
                id : 0,
                name : "echeance",
                label : "Prochaine échéance",
                type : "text",
                disable : true,
            },
            // {
            //     id : 1,
            //     name : "fournisseur",
            //     label : "Fournisseur",
            //     type : "text",
            //     disable : false,
            // },
            {
                id : 2,
                name : "prévisionnel",
                label : "Montant prévisionnel",
                type : "number",
                placeholder : "€",
                disable : true,
            },
        ]
    },
]