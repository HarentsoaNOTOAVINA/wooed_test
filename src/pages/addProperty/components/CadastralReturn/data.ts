interface List{
    id : number,
    label : string | Array<string>,
    type : string,
    name : string,
    placeholder ?: string,
    required?: boolean,
}

export const cadastreData : List[] = [
    {
        id : 0,
        label : "non-indexé",
        name : "cadastre",
        //   required : true,
        type : "number",
        placeholder : "€"
    },
    {
        id : 1,
        label : " ",
        name : "cadastralreturn",
        type : "number",
        placeholder : "€"
    },
]