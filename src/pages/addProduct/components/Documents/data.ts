interface File{
      id : number,
      label : string,
      type : string,
      name : string
}

interface List{
      id : number,
      label : string,
      type : string,
      name : string,
      placeholder ?: string,
      file : File
 }


 export const menuList : List[] = [
      {
            id : 0,
            label : "Type du document",
            type : "text",
            name : "title",
            file : {
                id : 0,
                label : "",
                type : "file",
                name : "fileDocument"   
            }
      }
 ]

 export const nameSelect = [
      {
            label : 'Titre de propriete',
            value : 'Titre de propriete',
      },
      {
            label : 'acte de base',
            value : 'acte de base',
      },
      {
            label : 'DIU',
            value : 'DIU',
      },
      {
            label : 'CCE',
            value : 'CCE',
      },
      {
            label : 'PEB',
            value : 'PEB',
      },
      {
            label : 'Plans',
            value : 'Plans',
      },
      {
            label : 'Asbestos',
            value : 'Asbestos',
      },
      {
            label : 'Certificats chaudiére',
            value : 'Certificats chaudiére',
      },
      {
            label : 'Autre',
            value : 'Autre',
      },
 ]