import { Http } from './http';
export class MobilityService{
    static async getListWorksite(params : any) {
        return await Http.get('/worksites', params);
    }
    static async setDefectuosity(params: any) {
        return await Http.post('/defectuosities', params);
    }

    static async addAlert(params : any){
        return await Http.post('/worksites', params);
    }

    static async propositionService(params : any){
        return await Http.post('/carpool_announcements', params);
    }

    static async carpoolingService(params ?: any){
        return await Http.get('/carpool_announcements', params);
    }

    static async signalWorksite(params : {id : number | string, data : any}){
        return await Http.put(`/worksites/${params.id}`, params.data);
    }
    
}