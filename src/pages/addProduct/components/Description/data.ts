 interface List{
      id : number,
      label : string,
      type : string,
      name : string,
      placeholder ?: string,
      required?: boolean,
 }

 export const itemList : List[] = [
     {
          id : 4,
          label : "Choisissez votre notaire",
          type : 'select',
          name : "notary",
          required : true,

     },
      {
            id : 0,
            label : "Déscription du bien",
            type : 'textArea',
            name : "details",
      },
     //  {
     //        id : 2,
     //        label : "Revenu cadastrale non-indexé",
     //        name : "cadastre",
     //      //   required : true,
     //        type : "text"
     //  },
     //  {
     //        id : 3,
     //        label : "Revenu cadastral",
     //        name : "cadastralreturn",
     //        type : "number"
     //  },
     //  {
     //      id : 4,
     //      label : "Surface habitable (m²)",
     //      name : 'livingArea',
     //      type : 'number',
     //      required : true,
     //  },
     //  {
     //      id : 5,
     //      label : 'Surface cadastrale (m²)',
     //      name : 'cadastralArea',
     //      type : 'number',
     //      required : true,
     //  },
      {
          id : 6,
          label : "Mesurer votre bien",
          name : 'link3D',
          type : 'link'
      }
 ]

 export const autoriseCoproprio : List = {
     id : 0,
     label : "J'autorise le coproprieté",
     name : "autoriseCopro",
     type : "switch",
 }

//  export const minuteLocation : List[] = [
//      {
//           id : 0,
//           label : ""
//      }
//  ]

 export const coproprioInfo : List[] = [
     {
          id : 0,
          label : "Nom du syndic",
          name : "syndicName",
          type : "select"
     },
     {
          id : 1,
          label : "Enregistrer ici la réponse du syndic",
          name : "syndicsResponse",
          type : 'file'
     },
     {
          id : 2,
          label : "Les 3 dernièrs procès-verbaux",
          name : "minutes",
          type : 'file'
     },
     {
          id : 3,
          label : "Montant des charges",
          name : "amountOfCharge",
          type : "number",
          placeholder : "€"
     }
 ]