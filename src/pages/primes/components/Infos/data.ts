interface Tab{
    id : Number,
    label : String,
    name : String
}

export enum nameTab{
    INFO = "informations",
    CONDITION = "conditions",
    MONTANT = "montant"
}

export const infos : Tab[] = [
    {
        id : 0,
        label : "Informations",
        name : nameTab.INFO,
    },
    {
        id : 1,
        label : "Conditions",
        name : nameTab.CONDITION,
    },
    {
        id : 2,
        label : "Montant",
        name : nameTab.MONTANT,
    },
]