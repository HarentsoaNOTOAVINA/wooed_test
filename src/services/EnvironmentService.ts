import { Http } from "./http"; 

export default class Environment{
    static async fetchEnvironMentalStatus(params : {[key: string]: string}){
        return await Http.getWithQueryParams('/brugis/theproperty/catergory',{thePropertyId : params});
    }
    static async fetchFloodStatus(params : {[key: string]: string}){
        return await Http.getWithQueryParams('/environment/flood/status',{theProperty : params});
    }
    static async postRegisterData(params :any){
        return await Http.post('/environment/registers',params);
    }
    static async fetchPermitForm(params :any){
        return await Http.getWithQueryParams('/permit_citernes',params);
    }

    static async fetchWaterTreatmentDeclaration(params : any) {
        return await Http.get(`/permit_citernes?type=${params.type}&category.region.name=${params.region}`)
    }
    static async postPermitData(params: any) {
        return await Http.post('/permit-property', params)
    }
    static async fetchProcessFields() {
        return await Http.get(`/environment/procedure_data`)
    }
    
    static async fetchTankObligationList(params: any) {
        return await Http.get(`/obligations?${params}`)
    }
    static async fetchPermitList(params: any) {
        return await Http.get(`/permit-property?theProperty=${params.theProperty}`)
    }
    static async fetchPermitProcess(params :any){
        return await Http.getWithQueryParams('/permit-property',params);
    }
    static async updateProcessStep(permitId : number,params :any){
        return await Http.put(`/permit-property-procedure/${permitId}`, params);
    }
}