import { Http } from "./http";

export class ManagePropertyService{
    static async getListProperty(){
        return await Http.get('/the_property/list?operationType=occupied')
    }

    static async getProductsListPerUser() {
        return await Http.get(`/the_property/per_user?operationType=occupied`);
    }

    static async addProperty(params : any){
        return await Http.post('the_property/add', params);
    }

    static async getDetailsProperty(params : number){
        return await Http.get(`/the_property/${params}`);
    }
}