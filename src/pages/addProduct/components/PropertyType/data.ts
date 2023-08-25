import { m } from "vitest/dist/index-ea17aa0c";

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
      name ?:string,
      keyItem ?: string,
      placeholder ?:string,
      required ?: boolean
      options ?: OptionItem[],
      subOptions ?: SubOptions[],
      condition ?: SubOptions[],
}


export const data : List[] = [
      
      {
            id : 1,
            label : "Type de transaction",
            type : "select",
            name : "transactionType",
            keyItem : "transactionType",
            placeholder : "Sélectionez",
            required : true,
            options : [
                  {
                        id : 0,
                        value : "Vente de gré à gré",
                        label : "Vente de gré à gré",  
                  },
                  
                 
                  {
                        id : 1,
                        value : "Vente public volontaire",
                        label : "Vente public volontaire",  
                  },
                  // {     
                  //       id : 2,
                  //       value : "Vente public forcée",
                  //       label : "Vente public forcée",  
                  // },
            ]
      },
      // {
      //       id : 2,
      //       label : "Type de bien",
      //       type :"select",
      //       keyItem : "propertyType",
      //       name : "propertyType",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "Maison"
      //             }
      //       ]
      // },
      // {
      //       id : 0,
      //       label : "Titre de l'annonce",
      //       type : "text",
      //       name : "title",
      //       keyItem : "title",
      //       required : true,
      // },
      // {
      //       id : 3,
      //       label : "Disponibilité",
      //       type : "select",
      //       keyItem : "disponibility",
      //       name : "disponibility",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
      //             // {     
      //             //       id : 0,
      //             //       value : "Non défini",
      //             //       label : "Non défini"
      //             // },
      //             {
      //                   id : 1,
      //                   value : "A partir de",
      //                   label : "A partir de"
      //             },
      //             {
      //                   id : 2,
      //                   value : "Immédiatement",
      //                   label : "Immédiatement"
      //             },
      //             {
      //                   id : 3,
      //                   value : "A la signature de l'acte",
      //                   label : "A la signature de l'acte"
      //             },
      //             {
      //                   id : 4,
      //                   value : "A définir",
      //                   label : "A définir"
      //             },
      //             {
      //                   id : 5,
      //                   value : "Lors de la réception provisoire du bien",
      //                   label : "Lors de la réception provisoire du bien"
      //             },
      //             {
      //                   id : 5,
      //                   value : "Au terme du bail en cours",
      //                   label : "Au terme du bail en cours"
      //             },
      //             // {
      //             //       id : 6,
      //             //       value : "Selon le locataire",
      //             //       label : "Selon le locataire"
      //             // },
      //       ],
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   label : "Disponible le",
      //                   type : "date",
      //                   name : "disponibilityTime",
      //                   keyItem : "disponibilityTime",
      //             },
      //             {
      //                   id : 1,
      //                   label : 'Type de bail',
      //                   type : 'select',
      //                   name : 'currentLease',
      //                   keyItem : 'currentLease',
      //                   options : [
      //                         {
      //                               label : 'Montant de location',
      //                               value : 'Montant de location'
      //                         },
      //                         {
      //                               label : "Garantie locative",
      //                               value : "Garantie locative"
      //                         },
      //                         {
      //                               label : "Date d'entrée en vigueur",
      //                               value : "Date d'entrée en vigueur"
      //                         },
      //                         {
      //                               label : "Durée (en année)",
      //                               value : 'Durée (en année)'
      //                         }
      //                   ]
      //             }
      //       ]
      // },
      // {
      //       id : 6,
      //       label : 'Montant de la garantie locative',
      //       type : 'number',
      //       name : 'amountRentalGuarantee',
      //       keyItem : 'amountRentalGuarantee',
      //       placeholder : '€'
      // },
      // {
      //       id : 4,
      //       label : "Annonce avec délai de publication",
      //       type : "switch",
      //       name : "switchAnnonce",
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "immediat"
      //             }
      //       ],
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   label : 'Délai',
      //                   type: "date",
      //                   name : "expirationDate",
      //                   keyItem : 'expirationDate'
      //             }
      //       ]
      // },
      {
            id : 6,
            label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
            type : "switch",
            name : "collaborativeAcquisition",
            keyItem : "collaborativeAcquisition"
      },
      
      // {
      //       id : 7,
      //       label : "Déscription du bien",
      //       type : 'textArea',
      //       name : "details",
      // },
];

export const dataLocation : List[] = [
      
      // {
      //       id : 1,
      //       label : "Type de bien",
      //       type :"select",
      //       keyItem : "propertyType",
      //       name : "propertyType",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "Maison"
      //             }
      //       ]
      // },
      {
            id : 2,
            label : "Type de location",
            type :"select",
            keyItem : "locationType",
            name : "locationType",
            placeholder : "Sélectionez",
            required : true,
            options : [
                  {
                        id : 0,
                        value : "Location classique",
                        label : "Location classique"
                  },
                  {
                        id : 1,
                        value : "Hebergement touristique",
                        label : "Hébergement touristique"
                  },
                  {
                        id : 2,
                        value : "Location a la minute",
                        label : "Location à la minute"
                  },
                  {
                        id : 3,
                        value : "Atelier d'artiste",
                        label : "Atelier d'artiste",
                  },
            ]
      },
      // {
      //       id : 0,
      //       label : "Titre de l'annonce",
      //       type : "text",
      //       name : "title",
      //       keyItem : "title",
      //       required : true,
      // },
        
      // {
      //       id : 3,
      //       label : "Disponibilité",
      //       type : "select",
      //       keyItem : "disponibility",
      //       name : "disponibility",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
                 
      //             {
      //                   id : 1,
      //                   value : "A partir de",
      //                   label : "A partir de"
      //             },
      //             {
      //                   id : 2,
      //                   value : "Immédiatement",
      //                   label : "Immédiatement"
      //             },
                 
      //       ],
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   label : "Disponible le",
      //                   type : "date",
      //                   name : "disponibilityTime",
      //                   keyItem : "disponibilityTime",
      //             },
      //       ]
      // },
      // {
      //       id : 10,
      //       name : "availableTime",
      //       type : "text",
      //       label : "Libre le",
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   name : "startTime",
      //                   label : "Heure de début"
      //             },
      //             {
      //                   id : 1,
      //                   name : "endTime",
      //                   label : "Heure de début"
      //             },
      //       ]
      // },
      // {
      //       id : 4,
      //       label : "Annonce avec délai de publication",
      //       type : "switch",
      //       name : "switchAnnonce",
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "immediat"
      //             }
      //       ],
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   label : 'Délai',
      //                   type: "date",
      //                   name : "expirationDate",
      //                   keyItem : 'expirationDate'
      //             }
      //       ]
      // },
      {
            id : 5,
            label : "Durée de location (Année)",
            type : "number",
            name : "locationDuration",
            keyItem : "locationDuraion",
            required : true,
      },
      {
            id : 4,
            label : "J'autorise le coliving",
            type : "switch",
            name : "coliving",
      },
      {
            id : 6,
            label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
            type : "switch",
            name : "collaborativeAcquisition",
            keyItem : "collaborativeAcquisition"
      },
      
      // {
      //       id : 7,
      //       label : "Déscription du bien",
      //       type : 'textArea',
      //       name : "details",
      // },
]; 

export const dataLocationMinute : List[] = [
      
      // {
      //       id : 1,
      //       label : "Type de bien",
      //       type :"select",
      //       keyItem : "propertyType",
      //       name : "propertyType",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "Maison"
      //             }
      //       ]
      // },
      {
            id : 2,
            label : "Type de location",
            type :"select",
            keyItem : "locationType",
            name : "locationType",
            placeholder : "Sélectionez",
            required : true,
            options : [
                  {
                        id : 0,
                        value : "Hebergement touristique",
                        label : "Hébergement touristique"
                  },
                  {
                        id : 1,
                        value : "Loction classique",
                        label : "Location classique"
                  },
                  {
                        id : 2,
                        value : "Location à la minute",
                        label : "Location à la minute"
                  },
            ]
      },
      // {
      //       id : 0,
      //       label : "Titre de l'annonce",
      //       type : "text",
      //       name : "title",
      //       keyItem : "title",
      //       required : true,
      // },
      // {
      //       id : 4,
      //       label : "Annonce avec délai de publication",
      //       type : "switch",
      //       name : "switchAnnonce",
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "immediat"
      //             }
      //       ],
      //       subOptions : [
      //             {
      //                   id : 0,
      //                   label : 'Délai',
      //                   type: "date",
      //                   name : "expirationDate",
      //                   keyItem : 'expirationDate'
      //             }
      //       ]
      // },
      {
            id : 5,
            label : "Durée de location (Année)",
            type : "number",
            name : "locationDuration",
            keyItem : "locationDuraion",
            required : true,
      },
      {
            id : 4,
            label : "J'autorise le coliving",
            type : "switch",
            name : "coliving",
      },
      {
            id : 6,
            label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
            type : "switch",
            name : "collaborativeAcquisition",
            keyItem : "collaborativeAcquisition"
      },
      
      // {
      //       id : 7,
      //       label : "Déscription du bien",
      //       type : 'textArea',
      //       name : "details",
      // },
]; 

export const dataGround : List[] = [
      {
            id : 1,
            label : "Type de transaction",
            type : "select",
            name : "transactionType",
            keyItem : "transactionType",
            placeholder : "Sélectionez",
            required : true,
            options : [
                  {
                        id : 0,
                        value : "Vente de gré à gré",
                        label : "Vente de gré à gré",  
                  },
                  
                 
                  {
                        id : 1,
                        value : "Vente public volontaire",
                        label : "Vente public volontaire",  
                  },
                  // {     
                  //       id : 2,
                  //       value : "Vente public forcée",
                  //       label : "Vente public forcée",  
                  // },
            ]
      },
      // {
      //       id : 2,
      //       label : "Type de bien",
      //       type :"select",
      //       keyItem : "propertyType",
      //       name : "propertyType",
      //       placeholder : "Sélectionez",
      //       required : true,
      //       options : [
      //             {
      //                   id : 0,
      //                   value : 0,
      //                   label : "Maison"
      //             }
      //       ]
      // },
      
      // {
      //       id : 0,
      //       label : "Titre du bien",
      //       type : "text",
      //       name : "title",
      //       keyItem : "title",
      //       required : true,
      // },
      {
            id : 3,
            label : "Occupation du bien",
            type : "select",
            keyItem : "disponibility",
            name : "disponibility",
            placeholder : "Sélectionez",
            required : true,
            options : [
                 
                  {
                        id : 1,
                        value : "Apartir de",
                        label : "Apartir de"
                  },
                  {
                        id : 2,
                        value : "Immédiatement",
                        label : "Immédiatement"
                  },
                  {
                        id : 3,
                        value : 'Lieu est actuellement loué',
                        label : 'Lieu est actuellement loué'
                  }
                 
            ],
            subOptions : [
                  {
                        id : 0,
                        label : "Disponible le",
                        type : "date",
                        name : "disponibilityTime",
                        keyItem : "disponibilityTime",
                  },
                  
            ],
            condition : [
                  {
                        id : 0,
                        label : "Montant de la location",
                        name : 'rentPrices',
                        type : 'number',
                        keyItem : 'location montant',
                  },
                  {
                        id : 1,
                        label : 'Garantie locative',
                        name : 'rentalGuaranteeRequired',
                        type: 'switch',
                        keyItem : 'rentalGuaranteeRequired'
                  },
                  
                  {
                        id : 2,
                        label : 'Montant de la garantie locative',
                        name : 'garanteeRentPrices',
                        type: 'number',
                        keyItem : 'garanteeRentPrices'
                  },
                  {
                        id : 3,
                        label : "Date d'entrée en vigueur",
                        type : "date",
                        name : "effectiveDate",
                        keyItem : "effectiveDate"
                  },
                  
                  {
                        id : 4,
                        label : "Durée (en année)",
                        type : "number",
                        name : "locationDuration",
                        keyItem : "locationDuration"
                  },
            ],
            
      },
      {
            id : 6,
            label : "Mon offre peut faire l'objet d'une demande d'acquisition collaborative",
            type : "switch",
            name : "collaborativeAcquisition",
            keyItem : "collaborativeAcquisition"
      },
      
      // {
      //       id : 7,
      //       label : "Déscription du bien",
      //       type : 'textArea',
      //       name : "details",
      // },
]

export const footer = [
      {
            title : "(*) champ obligatoire"
      }
]


export const dataCurrentLease = [
      {
            label : 'Montant de location',
            value : 'Montant de location'
      },
      {
            label : "Garantie locative",
            value : "Garantie locative"
      },
      {
            label : 'Date d\'entrée en vigueur',
            value : 'Date d\'entrée en vigueur'
      },
      {
            label : "Durée (en année)",
            value : 'Durée (en année)'
      }
]