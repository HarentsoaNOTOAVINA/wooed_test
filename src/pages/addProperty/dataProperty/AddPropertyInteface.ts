interface IOptions {
    label : string,
    value : string
}


interface IContentFields {
    label : string,
    name : string,
    type : typeInput,
    required ?: boolean,
    options ?: Array<IOptions>
    subItem ?: Array<IContentFields> ,
    placeholder ?: string,
    min ?: number,
    max ?: number,
    uri ?: string,
    subtitle ?: Array<{text : string}> | string,
    unity?: string
}

interface IContent {
    title : string | Array<string>,
    component ?: object,
    contentFields ?: Array<IContentFields>
}

export interface IAddProperty {
    title : string | Array<string>,
    component ?: object,
    content : Array<IContent>
}


export enum typeInput {
    text= "text", 
    number = "number",
    switch = "switch",
    date = "date",
    time = "time",
    password = "password",
    select = "select",
    radio = "radio",
    textArea = "textArea",
    link = "link",
    file = "file",
    image = "image",
    button = "button",
    year = "year",
}