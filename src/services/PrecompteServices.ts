import { Http } from "@/services/http";

export default class PrecompteService{
    static async getPropertyDetails(params : string | number){
        return await Http.get(`/the_property/${params}`)
    }

    static async postPrecompte(params : Object){
        return await Http.post('/precounts', params);
    }
    
    static async putPrecompte(params : Object, id : string | number){
        return await Http.putt(`/precounts/${id}`, params)
    }
    static async getPrecountConst(page:number=1, itemsPerPage: number=50){
        return await Http.get(`/precount_constants`, {page,itemsPerPage} as any)
    }

    static async precountSimulation(params: any){
        return await Http.post(`/precounts/simulate`, params)
    }

}