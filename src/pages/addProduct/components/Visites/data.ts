
interface SubItem {
    id : number,
    label : string,
    name : string,
    type ?: string,
    options ?: any
}
interface IOptions{
    id ?: number,
    label : string,
    value : string,
}
interface List {
    id : number, 
    label : any,
    name : string,
    type ?: string,
    required ?: boolean,
    placeholder? : string,
    options? : any,
    class ? : string,
    subItem ?: SubItem[]
    subOption ?: IOptions[]
}

export const days : {}[] = [{label : "Lundi", value : "Lundi"}, {label : "Mardi", value : "Mardi"}, {label : "Mercredi", value : "Mercredi"}, {label : "Jeudi", value : "Jeudi"}, {label : "Samedi", value : "Samedi"}, {label : "Dimanche",value : "Dimanche"}];


export const dates : List[]  = [
    {
        id : 0,
        label : "Tous les (en jours)",
        name : "availabilityDay",
        type : "select",
        class : "content-100",
        placeholder : "Selectionnez les jours",
        required : false,
        options : days
    },
    {
        id : 2,
        label : {
            start : "De (Heure de début)",
            end : "à (Heure de fin)"
        },
        name : "Begining",
        type : "date",
        required : false,
        class : "content-100",
        subItem : [
            {
                id : 0,
                name : "availabilityHourMin",
                label : "De (Heure de début)"
            },
            {
                id : 1,
                name : "availabilityHourMax",
                label : "à (Heure de fin)"
            },
        ]
    },
    {
        id : 1,
        label : "Durant (Semaines)",
        name : "weekNumber",
        type : "number",
        class : "content-100",
        required : false,
    },
    
]

export const saleLinkRedirection : List= {
    id : 0,
    label : "Lien vers la plateforme d'enchers :",
    name : "actionLink",
    type : "input",
    required : false,
}

/**
 * New version
 */

export const visit : List[] = [
    {
        id : 0,
        label : "Sélectionnez le type de visite.",
        name : "visitType",
        type : "select",
        subOption : [
            {
                id : 0,
                label : "Je souhaite organiser les visites moi-même",
                value : "Je souhaite organiser les visites moi-même",
            },
            {
                id : 1,
                label : "Je souhaite déléguer les visites à un membre de l’application",
                value : "Je souhaite déléguer les visites à un membre de l’application",
            },
            {
                id : 2,
                label : "Je souhaite que les visiteurs puissent librement visiter le bien (boîte à clé)",
                value : "Je souhaite que les visiteurs puissent librement visiter le bien (boîte à clé)",
            },
        ]
    }
]

export const mySelfData : List[] = [
    {
        id : 0,
        label : "Autoriser les prises de rendez-vous par téléphone",
        name : 'isAllowPhoneAppointment',
        type: "switch",
        subItem : [
            {
                id : 0,
                label : "Les candidats acquéreurs seront autorisés à vous appeler au numéro",
                name : "numberToCallToAppointment",
                type : "number",
            }
        ]
    },
    {
        id : 1,
        label : "Déterminer les horaires de visites",
        name : "isDetermineVisitSchedule",
        type : 'switch',
        subItem : [
            {
                id : 0,
                label : "Sélectionner le type d'horaire",
                name : "typeOfShedule",
                type : "select",
                options : [
                    // {
                    //     label : "Accéder à mon agenda OUTLOOK",
                    //     value : "Accéder à mon agenda OUTLOOK"
                    // },
                    {
                        label : "Accéder à mon W-agenda",
                        value : "Accéder à mon W-agenda"
                    },
                ]
            }
        ]
    }
];

export const toAnotherMemberData : List[] = [
    {
        id : 0,
        label : "Déterminer les horaires de visites",
        name : "isDetermineVisitHour",
        type : "switch",
        subItem : [
            {
                id : 0,
                label : "Veuillez choisir un prestataire",
                name : "providerName" ,
                type : "select",
                options : [
                    {
                        label : "Fafa",
                        value : "Fafa"
                    },
                    {
                        label : "Zaza",
                        value : "Zaza"
                    },
                ]
            },
            {
                id : 1,
                label : "",
                name : "providerVisitingHour",
                type : "radio",
                options : [
                    {
                        label : "Le prestataire ne doit pas s’astreindre à des horaires de visites précis",
                        value : "Le prestataire ne doit pas s’astreindre à des horaires de visites précis"
                    },
                    {
                        label : "Je souhaite imposer au prestataire les horaires de visite suivants",
                        value : "Je souhaite imposer au prestataire les horaires de visite suivants"
                    },
                ]
            }
        ]
    }
];

export const freeVisitData : List[] = [
    {
        id : 0,
        label : "Déterminer les horaires de visites",
        name : "isDetermineVisitHour",
        type : "switch"
    },
    {
        id : 1,
        label : "Commander une boîte à clés sécurisée",
        name : "isOrderSecureKeyBox",
        type : "switch",
        subItem : [
            {
                id : 0,
                label : "Avec placement",
                name : "isWithPlace",
                type : 'switch',
                options : [
                    {
                        label : "avec placement",
                        value : true
                    },
                    {
                        label : "sans placement",
                        value : false
                    }
                ]
            }
        ]
    }
];

export const withPlacement : List[] = [
    {
        id : 0,
        label : 'Avec webcam de surveillance',
        name : "isWithSurveillanceWebcam",
        type : 'switch',
        options : [
            {
                label : "Avec webcam de surveillance",
                value : true
            },
            {
                label : "Sans webcam de surveillance",
                value : false
            }
        ],
        subItem : [
            {
                id : 0,
                label : "Prix",
                type : "number",
                name : "webcamPrice"
            }
        ]
    },

    {
        id : 1,
        label : "Avec capteur de son",
        name : "soundSonsor",
        type : "switch",
        options :  [
             {
                label : 'Avec capteur de son',
                value : true
             },
             {
                label : 'Sans capteur de son',
                value : false
             }
        ],
        subItem : [
            {
                id : 1,
                label : "Prix",
                type : "number",
                name : "soundSonsorPrice"
            }
        ]
    }

]


export const withoutPlacement : List[] = [

]

export const publicity = [
    {
        label : "Je souhaite commander un panneau « A VENDRE »",
        value : "Je souhaite commander un panneau « A VENDRE »"
    },
    {
        label : "Recourir aux services de « digital marketing » de l’application",
        value : "Recourir aux services de « digital marketing » de l’application"
    },
    {
        label : "Trouver un « influenceur » parmi les membres de l’appli pour booster votre annonce",
        value : "Trouver un « influenceur » parmi les membres de l’appli pour booster votre annonce"
    }
]