import { Http } from './http';

export default class ProductsListService {
    static async getProductsList(params ?: any) {
        return await Http.get('/the_property/list', params);
    }
    static async setFavorite(params: object) {
        return await Http.post('the_property/add_favorite', params);
    }
    static async getProductDetail(id: number) {
        return await Http.get(`/the_property/${id}`);
    }
    static async updateProductDetail(id: number, payload: any) {
        return await Http.put(`/the_property/${id}`, payload);
    }
    static async getProductsListPerUser() {
        return await Http.get(`the_property/per_user`);
    }
    static async getProductsListByZone(params: any) {
        console.log(params);
        return await Http.get(`the_property/search`, params);
    }
    static async getPropertyPerUser() {
        return await Http.get('/the_property/per_user');
    }
    static async detelePropertyPerUser(id: number) {
        return await Http.delete(`/the_property/${id}`);
    }
}
