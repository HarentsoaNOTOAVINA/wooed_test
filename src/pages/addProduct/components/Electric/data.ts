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
        label : "Le compteur électrique est",
        name : "counterName",
        type : "select",
        options : [
            {
                label : "Privatif",
                value : "Privatif"
            },
            {
                label : "Commun",
                value : "Commun"
            },
        ]
        
    },
    {
        id : 1,
        label : "Types de compteur",
        name : "counterType",
        type : "select",
        options : [
            {
                label : "Compteur de jour",
                value : "Compteur de jour"
            },
            {
                label : "Compteur jour/nuit",
                value : "Compteur jour/nuit",
            },
            {
                label : "Compteur de retour",
                value : "Compteur de retour",
            },
        ]
    },
    {
        id : 2,
        label : "L'installation est conforme",
        name : "installationPropre",
        type : "switch",
        subItem : [
            {
                id : 0,
                label : "Date de fin de validité",
                name : "endLicence",
                type : "date"
            },
            {
                id : 1,
                label : "Certificat",
                name  : "licence",
                type : "file"
            }
        ]
    }

]



export const licencePlanified : List[] = [
    {
        id : 0,
        label : "Certification planifié",
        name : "planedCertification",
        type : "switch"
    }
]