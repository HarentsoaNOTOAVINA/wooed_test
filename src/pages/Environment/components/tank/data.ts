import { AnnotationType } from "pdfjs-dist/types/src/shared/util";

export interface annexeDataType{
    label: string;
    type: string;
    code : string;
}
export interface annexePayloadType{
    file ?: any;
    label : string;
}
export interface ProcessFieldsType{
    id ?: number;
    status ?: string;
    type : string;
    key ?: string;
    handler ?: Function;
    label ?: string;
    value ?: any;
    condition ?: boolean | Function;
}
export interface ProcessStepType{
    status ?: string;
    id ?: number;
    name : string;
    condition : boolean | Function;
    fields : ProcessFieldsType[];
}
export interface payloadType{
    theProperty : string  | number;
    file ?: any;
    annexPermitProperty ?: annexePayloadType[];
}

const categories = {
    CATEGORY_3 : "3",
    CATEGORY_2 : "2",
    CATEGORY_1B : "1B",
}
const permitType = {
    TANK : "tank",
    WT : "waterTreatement"
}

const response = {
    ACCEPT : "accept",
    REFUS : 'refus'
}
const declarationStatus =  {
    RECEVABLE : "OK",
    IRRECEVABLE : "NOT OK",
    INCOMPET : "INCOMPET",
}

export const TANK_LOCATION = [
    {
        label : "La citerne est enfouie",
        value : 'enfouie'
    },
    {
        label : "La citerne est hors sol",
        value : 'hors-sol'
    },
]
export const TANK_CAPACITY_BRUXELLE = [
    {
        label : "La contenance de la citerne est supérieure à 50000 litres (catégorie 1B)",
        value : '1B'
    },
    {
        label : "La contenance de la citerne est supérieure à 10 000 litres et inférieur à 50000 litres (catégorie 2)",
        value : '2'
    },
    {
        label : "La contenance de la citerne est inférieure à 10000 litres (catégorie 3)",
        value : '3'
    },
    
]

export const ANNEXE_FIELDS_C2_1B : annexeDataType[] = [
                                        {
                                            label  : "Tableau des installations classées",
                                            type : "file",
                                            code :"A11_IC_List",

                                        },
                                        
                                        {
                                            label  : "Formulaire de demande d’avis de prévention incendie (SIAMU)",
                                            type : "file",
                                            code :"A71_ASK_SIAMU",
                                        },
                                        {
                                            label  : "Fiche descriptive des mesures de prévention incendie",
                                            type : "file",
                                            code :"A72_ASK_SIAMU",

                                        },
                                        {
                                            label  : "Plan parcellaire cadastral",
                                            type : "file",
                                            code :"A121_MAP_Cad",
                                        },
                                        {
                                            label  : "Plan d’implantation",
                                            type : "file",
                                            code :"A122_MAP_Imp",
                                        },
                                        {
                                            label  : "Plan des installations",
                                            type : "file",
                                            code : "A123_MAP",
                                        },
                                        {
                                            label  : "Photos",
                                            type : "photo", 
                                            code :"A125_ILLU_Photo",
                                        },
                                        {
                                            label  : "Preuve de paiement des frais de dossier",
                                            type : "file", 
                                            code :"A13_CERT_Pay",
                                        },
                                        {
                                            label  : "Note explicative (2) Rapport d’incidence (1B)",
                                            type : "file", 
                                            code :"A11_RAP_Incid",
                                        },

                                    ]

export const ANNEXE_FIELDS_C3 : annexeDataType[] = [
                                    {
                                        label  : "Tableau des installations classées",
                                        type : "file",
                                        code :"A11_IC_List",

                                    },
                                    {
                                        label  : "Plan parcellaire cadastral",
                                        type : "file",
                                        code :"A121_MAP_Cad",
                                    },
                                    {
                                        label  : "Plan d’implantation",
                                        type : "file",
                                        code :"A122_MAP_Imp",
                                    },
                                    {
                                        label  : "Les plans permettant la localisation des installations",
                                        type : "file",
                                        code :"A23_MAP",
                                    },
                                    {
                                        label  : "Photos des installations",
                                        type : "photo",
                                        code :"A24_ILLU_Photo",
                                    },
                                ]


export const ProcessData  : {[key : string] : ProcessStepType[]} = {
    Bruxelle : [
        {
            status : "requestSent",
            name : "Envoi de la déclaration",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "display",
                    label : "",
                    value : (date : string) =>(`${date}`)
                },
            ]
        },
        {
            status : "acknowledgment",
            name : "Réception de l’accusé de réception",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "action",
                    label : "Avez vous reçu une accusé de reception"
                },
                {
                    type : "date",
                    label : "Date effective",
                    key : 'acknowledgmentEffectiveDate',
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['acknowledgmentEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "publicInquiry",
            condition : (category : string,permitType : string,status : string) : boolean => ( category === categories.CATEGORY_2 && true) ,
            name : "Enquête publique",
            fields : [
                {
                    type : "date",
                    label : "Date de début",
                    key : 'publicInquiryStartDate',
                    handler : (payload :{[key : string] : any},value : any)=>{
                        payload['publicInquiryStartDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date de fin",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "consultationCommittee",
            condition : (category : string,permit : string,status : string) : boolean => ( category === categories.CATEGORY_2 && permit === permitType.TANK) ,
            name : "Commission de concertation",
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "consultationCommiteeEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['consultationCommiteeEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "installationVisit",
            condition : (category : string,permit : string,status : string) : boolean => ( category !== categories.CATEGORY_3 && permit === permitType.TANK) ,
            name : "Visite des installations",
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "installationVisitEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['installationVisitEffectiveDate'] = value;
                    }
                },
            ]
        },
        {
            status : "surveySiamu",
            condition : (category : string,permit : string,status : string) : boolean => ( category !== categories.CATEGORY_3 && permit === permitType.TANK) ,
            name : "Avis SIAMU",
            fields : [
                {
                    type : "date",
                    label : "Date d'emission",
                    key : "surveySiamuUltimeDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['surveySiamuUltimeDate'] = value;
                    }
                },
            ]
        },
        {
            status : "issuancePermit",
            condition : (category : string,permitType : string,status : string) : boolean => ( category !== categories.CATEGORY_3 ) ,
            name : "Délivrance du permis ",
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "issuancePermitEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['issuancePermitEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
                {
                    type : "info",
                    value : "SI vous ne recevez pas de réponse dans les 60 jours?\
                    Cette absence de réponse équivaut à un refus de permis.\
                    Vous pouvez alors introduire un recours.\
                    ",
                },
            ]
        },
        
        {
            status : "startExploitation",
            condition : (category : string,permit : string,status : string) : boolean => ( category === categories.CATEGORY_3) ,
            name : "Début de l’exploitation",
            fields : [
                {
                    type : "info",
                    value : "Vous pouvez exploitez dès que vous recevez l’accusé de réception de dossier complet.",
                },
            ]
        },
        {
            id : 4,
            condition : (category : string,permit : string,status : string) : boolean => ( category === categories.CATEGORY_3 ) ,
            name : "Validité de votre déclaration",
            fields : [
                {
                    type : "info",
                    value : "En principe, pas de limite d’exploitation dans le temps",
                },
            ]
        },
    ],
    FLANDRE : [
        {
            status : "requestSent",
            name : "Envoi du formulaire de déclaration",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "display",
                    label : "",
                    value : (date : string) =>(`${date}`)
                },
            ]
        },
        {
            status : "acknowledgment",
            name : "Prise d’acte de la déclaration",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "action",
                    label : "Avez vous reçu une accusé de reception"
                },
                {
                    type : "date",
                    label : "Date effective",
                    key:"acknowledgmentEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['acknowledgmentEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
                {
                    type : "info",
                    value : "En cas d’absence de réponse dans le délai: l’administration est censée avoir pris acte de votre déclaration",
                },
                {
                    type : "info",
                    value : "En cas de refus de prise d’acte dans le délai susmentionné, vous pouvez introduire un recours devant le « Raad voor Vergunningsbetwisting»",
                },

            ]
        },
        {
            status: "sendingAppeal",
            name : "Envoi du recours",
            condition : (category : string,permitType : string,status : string)=> (status === response.REFUS),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "sendingAppealEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['sendingAppealEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "collegeDecision",
            name : "Décision du Collège",
            condition : (category : string,permitType : string,status : string)=> (status === response.REFUS),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "collegeDecisionEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload["collegeDecisionEffectiveDate"] = value; // params à verifier partie back
                    }
                },
            ]
        },
        {
            status : "startExploitation",
            name : "Début de l’exploitation",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key: "startExploitationEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['startExploitationEffectiveDate'] = value;
                    }
                },
            ]
        },
    ],
    WALLONIE : [
        {
            status : "requestSent",
            name : "Envoi de la déclaration",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "display",
                    label : "",
                    value : (date : string) =>(`${date}`)
                },
            ]
        },
        {
            status : "acknowledgment",
            name : "Réception de l’accusé de réception",
            condition : (category : string,permitType : string,status : string) : boolean => true,
            fields : [
                {
                    type : "action",
                    label : "",
                },
                {
                    type : "date",
                    label : "Date effective",
                    key : "acknowledgmentEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['acknowledgmentEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
                {
                    type : "display",
                    label : "ENVOYER LES COMPLEMENTS D’INFORMATION",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "sentRequestToTechnicalOfficer",
            name : "Envoi de la demande par la commune au Fonctionnaire technique ( DG03 )",
            condition : (category : string,permitType : string,status : string) : boolean => (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "sentRequestToTechnicalOfficerEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['sentRequestToTechnicalOfficerEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "transmissionRequestToTechOfficer",
            name : "Transmission par le commune au demandeur de l’envoi de la demande au Fonctionnaire Technique",
            condition : (category : string,permitType : string,status : string) : boolean => (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : 'sendingAdditionalInfoEffectiveDate',
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['sendingAdditionalInfoEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "sendingAdditionalInfo",
            name : "ENVOYER LES COMPLEMENTS D’INFORMATION",
            condition : (category : string,permitType : string,status : string)=> (status === declarationStatus.INCOMPET),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "sendingAdditionalInfoEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['sendingAdditionalInfoEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        }, 
        {
            status : "techOfficerSeeksBodiesOpinion",
            name : "Le fonctionnaire technique sollicite l’avis des instances appropriées",
            condition : (category : string,permitType : string,status : string)=> (status === declarationStatus.INCOMPET),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "techOfficerSeeksBodiesOpinionEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['techOfficerSeeksBodiesOpinionEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "publicInquiry",
            name : "Enquête publique : Affichage de l’avis d’enquête publique",
            condition : (category : string,permitType : string,status : string)=> (status === declarationStatus.INCOMPET),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "publicInquiryEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['publicInquiryEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "summaryReportTechOfficer",
            name : "Rapport de synthèse du Fonctionnaire Technique",
            condition : (category : string,permitType : string,status : string)=> (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "summaryReportTechnicalOfficerEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload["summaryReportTechnicalOfficerEffectiveDate"] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },

        {
            status : "decision",
            name : "Décision",
            condition : (category : string,permitType : string,status : string)=> (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : "decisionEffectiveDate",
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['decisionEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
                {
                    type : "display",
                    label : "le collège des bourgmestre et échevins reste en défaut de procéder à l'affichage dans le délai visé ci-dessus",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "display",
            name : "Affichage",
            condition : (category : string,permitType : string,status : string)=> (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "date",
                    label : "Date effective",
                    key : 'displayEffectiveDate',
                    handler : (payload : {[key : string] : any},value : any)=>{
                        payload['displayEffectiveDate'] = value;
                    }
                },
                {
                    type : "display",
                    label : "Date ultime",
                    value : (date : any)=> `${date}`
                },
            ]
        },
        {
            status : "startExploitation",
            name : "Début de l’exploitation – caractère exécutoire du permis",
            condition : (category : string,permitType : string,status : string) : boolean => (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "text",
                    label : "Vous pouvez passer à l'exploitation de l'établissement dès que le permis est devenu exécutoire:\
                    c-à-d le jour suivant l’expiration du délai de recours de 20 jours à dater de la réception de la décision \
                    L'autorité qui délivre un permis d'environnement fixe le délai dans lequel celui-ci doit être mis en oeuvre. Ce délai ne peut dépasser deux ans.\
                    TOUTEFOIS, l'autorité peut, sur requête spécialement motivée, accorder un nouveau délai sans que celui-ci ne puisse excéder deux ans.",
                }
                
            ]
        },
        {
            status : "licenceValidity",
            name : "Validité du permis",
            condition : (category : string,permitType : string,status : string) : boolean => (category !== categories.CATEGORY_3),
            fields : [
                {
                    type : "text",
                    label : "Le permis est accordé pour une durée de vingt ans au maximum.\
                    L'autorité compétente peut indiquer les conditions particulières d'exploitation qui doivent être révisées avant l'expiration du permis, ainsi que la date à laquelle la demande de renouvellement doit être introduite.",
                }
                
            ]
        },
    ],
}