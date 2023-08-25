interface SubTitle {
      id : number,
      text : string
}

interface List{
      id : number,
      label : string,
      name : string,
      type ?: string,
      subtitle ?: SubTitle[],
      subOptions ?: any,
      required : boolean,
      title ?: string,
}


export const inputItem : List[] = [
      {
            id : 1,
            label : "Introduire des photos du bien",
            name : "images",
            type : "images",
            required : true,
            title : "Photos",
            subtitle : [
                  {
                        id : 0,
                        text : 'La taille maximale par image est 5MB'
                  },
                  {
                        id : 1,
                        text : "Formats acceptés JPG"
                  }
            ]  
      },
      {
            id : 0,
            label : "Lien de la vidéo",
            name : "linkVideos",
            type : "input",
            title : "Vidéos",
            required : false,
      },
      
      {
            id : 2,
            label : "Introduire une figuration 3D du bien",
            name : "figure3d",
            title : "Figuration 3D",
            type : "button", 
            required : false,
      },
      {
            id : 3,
            label : "Plan cadastral",
            name : "plan",
            title : "Plan",
            type : "file", 
            required : false,
      },
      // {
      //       id : 4,
      //       label : "Réserver la visite <Drone>",
      //       name : "droneVisite",
      //       type : "button", 
      //       required : false,
      // },
      
]

export const dataGround : List[] = [
      {
            id : 1,
            label : "Introduire des photos du bien",
            name : "images",
            type : "images",
            required : true,
            subtitle : [
                  {
                        id : 0,
                        text : 'La taille maximale par image est 5MB'
                  },
                  {
                        id : 1,
                        text : "Formats acceptés JPG"
                  }
            ]  
      },
      {
            id : 0,
            label : "Introduire des vidéos du bien",
            name : "linkVideos",
            type : "input",
            required : false,
      },
      {
            id : 2,
            label : "Introduire une figuration 3D du bien",
            name : "figure3d",
            type : "button", 
            required : false,
      },
      {
            id : 3,
            label : "Plan cadastral",
            name : "plan",
            type : "file", 
            required : false
      },
      // {
      //       id : 4,
      //       label : "Réserver la visite <Drone>",
      //       name : "droneVisite",
      //       type : "button", 
      //       required : false,
      // },
]

export const figure3D = [
      {
            label : "Introduire la présentation 3D (appli Apple)",
            name : "3Dpresentation",
            type : "",
            subItem : [
                  {
                        label : "Lidard",
                        name : "lidardFile",
                        type : "file"
                  },
                  {
                        label : "Materporte",
                        name : "materporte",
                        type : "file"
                  },
                  {
                        label : "Autres",
                        name : "otherFile",
                        type : "file"
                  },
            ]
      },
      {
            label : "Etablir la figuration 3D via l’outil de mesure",
            name : "mesuringTools",
            type : "link",
            link : ""
      },
      {
            label : "Demander à l’appli de procéder automatiquement à la figuration 3D",
            name : "perform3DAutomaticly",
            type : "link",
            link : ""
      },
      // {
      //       label : "Les conseils d’un influenceur",
      //       name : "influencerHelp",
      //       type : "link",
      //       link : ""
      // },
      
]