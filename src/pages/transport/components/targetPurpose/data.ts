import { datePickerProps } from "ant-design-vue/lib/date-picker/generatePicker/props";

interface Ifields{
    name: string;
    label : string;
    type : string;
    condition ?: any;
    options ?: {[key : string ] : any}[];
    value ?: any;
    direction?: string;
}

export const daysOptions : Array<any> =  [
    {
        label : "Lundi",
        value : "lundi"
    },
    {
        label : "Mardi",
        value : "mardi"
    },
    {
        label : "Mercredi",
        value : "mercredi"
    },
    {
        label : "Jeudi",
        value : "jeudi"
    },
    {
        label : "Vendredi",
        value : "vendredi"
    },
    {
        label : "Samedi",
        value : "samedi"
    },
    {
        label : "Dimanche",
        value : "dimanche"
    },
    {
        label : "Tous les jours",
        value : ["lundi","mardi","mercredi",'jeudi','samedi',"dimanche"]
    },
]

export const TARGET_FIELDS : Array<Ifields> = [
    {
        label : "Je cherche des livraisons",
        name : "delivery",
        type : 'target-radio',
        direction : "horizontal",
        options : [
           {
            label : "Sur mon trajet",
            value : "isOnMyRoute"
           },
           {
            label : "Autour de moi",
            value : "isAroundMe"
           }
        ]
    },
    {
        label : "Ville de départ",
        name : "departureCity",
        type : "input",
    },
    {
        label : "Ville de départ",
        name : "adress",
        type : "conditionned-departure-input",
    },
    {
        label : "Ville d'arrivée",
        name : "arrivalCity",
        type : "conditioned-input",
    },
    {
        label : "Détour maximum",
        name : "maximunDetour",
        type : "slider",
    },
    {
        label : "Fréquence",
        name : "frequency",
        type : 'frequency-radio',
        direction : "vertical",
        options : [
           {
            label : "Je fais le trajet une fois",
            value : "isTravelOnce"
           },
           {
            label : "Je fais le trajet reguliairement",
            value : "isCommuteRegularly"
           }
        ]
    },
    {
        label : "Date de départ",
        name : "dateOfOutwardJourney",
        type : "date-departure",
    },
    {
        label : "Aller-retour",
        name : "isRoundTrip",
        type : "checkbox",
    },
    {
        label : "Date de retour",
        name : "dateOfReturnTrip",
        type : "date-returnTrip"
    },
    {
        label : "Aller le(s)",
        name :  "dayDepartureRegular",
        type : "multi-checkbox",
        options : daysOptions
    },
    {
        label : "Rerour le(s)",
        name : "dayReturnRegular",
        type : "multi-checkbox",
        options : daysOptions
    },

]

const vehiculeType : any[] = [
    {
        label : "Bus",
        value : "bus"
    },
    {
        label : "Train",
        value : "train"
    },
    {
        label : "Vélo/Scooter/Moto",
        value : "velomoteur"
    },
    {
        label : "Petite voiture (coffre moins de 200L)",
        value : "petite voiture"
    },
    {
        label : "Grande voiture (coffre plus 200L)",
        value : "grande voiture"
    },
    {
        label : "Break/ Monospace",
        value : "monospace"
    },
    {
        label : "Utilitaire",
        value : "utilitaire"
    },

];

export const AVAILABLE_PLACE_DATA = {
    vehicule_type  : {
        label : "Choisir mon vehicule",
        name : "vehiculeName",
        type : "select",
        options : vehiculeType
    },
    size : {
        label : "Indiquez le plus grand format que vous pouvez transporter",
        name  : "size",
        type : "sizeComponent"
    },
    isPassengerAccepted :{
        label : "Acceptez vous les passagers ?",
        name : 'isPassengerAccepted',
        type : "switch",
        info : "*personnes qui souhaitent voyager avec leur colis"
    },
    isAnimalAccepted : {
        label : "Acceptez vous de transporter des animaux?",
        name : "isAnimalAccepted",
        type : "switch",
    }
}
