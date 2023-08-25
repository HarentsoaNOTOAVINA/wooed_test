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
    required : boolean
}

interface IOption{
    id : number,
    label : string,
    value : string,
}


export const data : IGeneral[] = [
    {
        id : 0,
        label : "Superficie du terrain",
        name : "superficie",
        type : 'number',
        required : true,
    },
    {
        id : 1,
        label : "Occupation du bien",
        name : 'occupation',
        type : 'select',
        required : false,
        options : [
            {
                id : 0,
                label : 'Le bien est disponible à present',
                value : 'immediatement',
            },
            {
                id : 1,
                label : 'le bien est actuellement occupé mais il sera rendu libre le',
                value : "pas maintenant",
            },
            {
                id : 2,
                label : 'Le bien est actuellement loué',
                value : 'en location'
            }
        ]
    },
    {
        id : 2,
        label : 'Montant du loyer',
        type : 'number',
        name : 'montant',
    },
    {
        id : 3,
        label : 'Garantie locative',
        type : 'switch',
        name : "garantie",
        subOptions : [
            {
                id : 0,
                label : 'Montant',
                name : 'montant',
                type : 'number',
                required : false
            }
        ]
    }
]