

interface List{
    id : number,
    label : string,
    type : string,
    name : string,
    placeholder ?: string,
    required?: boolean,
    min ?: number
}

export const itemList : List[] = [
    {
        id : 5,
        label : 'Surface cadastrale (m²)',
        name : 'cadastralArea',
        type : 'number',
        required : true,
        min : 0,
    },
    {
        id : 4,
        label : "Surface habitable (m²)",
        name : 'livingArea',
        type : 'number',
        required : true,
        min : 0
    }
]