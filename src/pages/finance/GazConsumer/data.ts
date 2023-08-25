interface IItem{
    id : number,
    name: string,
    label ?: string,
    placeholder ?: string,
    type : string,
    disable ?: boolean,
    required ?: boolean,
}

interface IGaz{
    id : number,
    title : string,
    item ?: IItem[]
}

export const gazData : IGaz[] = [
    {
        id : 0,
        title : "Etat de ma consommation annuelle",
        item : [
            {
                id : 0,
                name : "annualConsumptionState",
                label : "Quantité en L",
                placeholder : "00",
                type : "number",
                disable : false,
                required : true,
            },
            {
                id : 1,
                name : "annualConsumptionPrice",
                label : "Montant",
                placeholder : "€",
                type : "number",
                disable : false,
                required : true,
            },
            {
                id : 2,
                name : "limitDate",
                label : "Prochaine échéance",
                type : "date",
                disable : false,
                required : true,
            },
            {
                id : 3,
                name : "anticipatedAmount",
                label : "Montant prévisionnel",
                type : "number",
                placeholder : "€",
                disable : false,
                required : true,
            },
        ]
    },
    {
        id : 1,
        title : "M'envoyer une alerte la veille de l'écheance",
        item : [
            {
                id : 0,
                name : "sendAlerte",
                type : "switch",
            }
        ]
    }
]