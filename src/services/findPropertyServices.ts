import {Http} from "./http";


export const getPdfFile = async (type : string, file : string)=>{
    return await Http.get('/urbanism/pdf/search?type=rent&file=Formulaire_FR_annexe_1_PU_0421-12p.pdf');

}
export async function fetchPropertyTypes(){
    return await Http.get('/property_types')
}
export default class FindPropertyService{
    static get(url=''){
        return Http.get(url);
    }
    static getWithQueryParams(url='',params : any){
        return Http.getWithQueryParams(url, params);
    }
    static async fetchPropertyTypes(){
        return await Http.get('/property_types')
    }
    static async searchProperty(params : any){
        return await Http.getWithQueryParams("the_property/search",params)
    }
    static async getOptions(){
        return await Http.get('/options');
    }
    static async fetchSociety(){
        return await Http.get("/society/list");
    }
    static async postAlertCriteria(parms : any){
        return await Http.post('/alert/add', parms)
    }
    static async fetchTransactionTypeList(){
        return await Http.get('/transaction_types');
    }
    static async fetchLocationtypeList(){
        return await Http.get('/location/locationType');
    }
    
}