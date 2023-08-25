import { Http } from './http';

export default class Rental {
    static async submitCounterProposition(params : any){
        return await Http.post("/offer/make", params)        
    }

    static async getEditableDocument(params: any){
        return await Http.get("/urbanism/pdf/search", params)
    }
    static async getOfferLeaseList(){
        return await Http.get("/offer_lease/user");
    }
    static async getPdfFile(){
        return await Http.get("/offer_lease/user");
    }
    static async signContract(params : any){
        return await Http.post("/offer/lease/sign", params);
    }
    static async fetchReceivedOfferLease(params : {[key: string]: number}){
        return await Http.getWithQueryParams("/offer_lease",params);
    }
    static async offerLeaseValidationRequest(params : {[key: string]: any}){
        return await Http.post("offer/lease/accepted", params);
    }
    static async postInventoryDatas(params : any){
        return await Http.post("/inventories", params);
    }
    
    // gestion location
    static async getDataBailManagement(params : any){
        return await Http.get("/rental_managements", params);
    }
    
    static async putDataBailManagement(params : any){
        return await Http.put(`/rental_management/${params.idRentDetail}`, params);
    }
    
    
    static async getHistoryPaymentRent(params : any){
        return await Http.get(`/payment_history?rentalManagement.theProperty=${params.theProperty}&year=${params.year}`);
    }
    static async addPaymentRent(params : any){
        return await Http.post('/payment_history', params);
    }
    static async updatePaymentRent(params : any){
        return await Http.put(`/payment_history/${params.idTheProperty}`, params);
    }
    
    static async addRequestLeave(params : any){
        return await Http.post('/rental_management_leaves', params);
    }
    static async listRequestLeave(filtre: any){
        return await Http.get(`/rental_management_leaves?rentalManagement.theProperty=${filtre}`);
    }
    static async getHousingCode(params: any){
        return await Http.get("/housing_code", params);
    }

    // tourist accommodation
    // period d'occupation
    static async getPeriodOccupationTouristAccomode(params: any){
        return await Http.get("/occupation_periods", params);
    }
    
}