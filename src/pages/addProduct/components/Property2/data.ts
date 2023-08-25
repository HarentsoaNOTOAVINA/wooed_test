interface SubOptions {
    id : number,
    label ?: string,
    type ?: string,
    name ?: string,
    keyItem ?: string,
    options ?: any
}
interface OptionItem{
    id : number,
    value : number|string,
    label : string,
}

interface List {
    id : number,
    label : string,
    type ?:string,
    name :string,
    keyItem ?: string,
    placeholder ?:string,
    required ?: boolean
    options ?: OptionItem[],
    subOptions ?: SubOptions[],
    condition ?: SubOptions[],
}


export const InputList : List[] = [
    {
        id : 0,
        label : "Type de bien",
        type :"select",
        keyItem : "propertyType",
        name : "propertyType",
        placeholder : "Sélectionez",
        required : true,
        options : [
                {
                    id : 0,
                    value : 0,
                    label : "Maison"
                }
        ]
    },
    {
        id : 1,
        label : "Description sommaire du bien",
        type : 'textArea',
        name : "details",
  },
]