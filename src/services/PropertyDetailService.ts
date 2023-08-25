import { Http } from './http';

export default class PropertyDetailService {
    static async getProductsList() {
        return await Http.get('/the_property/list');
    }
    static async getProductDetail(id: number) {
        return await Http.get(`/the_property/${id}`);
    }
    static async updateProductDetail(id: number, params: any) {
        return await Http.put(`/the_property/${id}`, params);
    }
    static async fetchRoadwayServiceDetails(params: any) {
        return await Http.get(`/voirie/filter/by?municipality=${params.municipality}&region=${params.region}&postalCode=${params.postalCode}`)
    }
}
