
interface SubOptions {
    id : number,
    label ?: string,
    type ?: string,
    name ?: string,
    keyItem ?: string,
    options ?: any,
    subOptions ?: any,
    placeholder ?: string
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

export const dataDisponibility  : List[] = [
    {
        id : 3,
        label : "Disponibilité",
        type : "select",
        keyItem : "disponibility",
        name : "disponibility",
        placeholder : "Sélectionez",
        required : true,
        options : [
              // {     
              //       id : 0,
              //       value : "Non défini",
              //       label : "Non défini"
              // },
              {
                    id : 1,
                    value : "A partir de",
                    label : "A partir de"
              },
              {
                    id : 2,
                    value : "Immédiatement",
                    label : "Immédiatement"
              },
              {
                    id : 3,
                    value : "A la signature de l'acte",
                    label : "A la signature de l'acte"
              },
              {
                    id : 4,
                    value : "A définir",
                    label : "A définir"
              },
              {
                    id : 5,
                    value : "Lors de la réception provisoire du bien",
                    label : "Lors de la réception provisoire du bien"
              },
              {
                    id : 5,
                    value : "Au terme du bail en cours",
                    label : "Au terme du bail en cours"
              },
              // {
              //       id : 6,
              //       value : "Selon le locataire",
              //       label : "Selon le locataire"
              // },
        ],
        subOptions : [
              {
                    id : 0,
                    label : "Disponible le",
                    type : "date",
                    name : "disponibilityTime",
                    keyItem : "disponibilityTime",
              },
            //   {
            //         id : 1,
            //         label : 'Type de bail',
            //         type : 'select',
            //         name : 'currentLease',
            //         keyItem : 'currentLease',
            //         options : [
            //               {
            //                     label : 'Montant de location',
            //                     value : 'Montant de location'
            //               },
            //               {
            //                     label : "Garantie locative",
            //                     value : "Garantie locative"
            //               },
            //               {
            //                     label : "Date d'entrée en vigueur",
            //                     value : "Date d'entrée en vigueur"
            //               },
            //               {
            //                     label : "Durée (en année)",
            //                     value : 'Durée (en année)'
            //               }
            //         ]
            //   }
            {
                  id : 1,
                  label : 'Montant de location',
                  name : "locationCost",
                  type : 'number',
                  placeholder : "Montant du loyer mensuelle hors charges"
            },
            {
                  id : 2,
                  label : 'Garantie locative',
                  name : "locationWarranty",
                  type : 'switch',
                  subOptions : [
                        {
                              id : 0,
                              label : "Montant de la garantie locative",
                              name : "locationWarrantyCost",
                              type : "number",
                        }
                  ]
            },
            {
                  id : 3,
                  label : "Date d'entrée en vigueur",
                  name : "forceDateEntry",
                  type : 'date'
            },
            {
                  id : 4,
                  label : 'Durée',
                  name : "duration",
                  type : 'year'
            },
        ]
  },

      {
            id : 2,
            label : 'Montant de la garantie locative',
            type : 'number',
            name : 'amountRentalGuarantee',
            keyItem : 'amountRentalGuarantee',
            placeholder : '€'
      },
]


export const bailCopy = [
      
      {
            id : 5,
            label : "Fichier de bail",
            type : "file",
            name : "leaseCopy",
            keyItem : "leaseCopy"
      },
]