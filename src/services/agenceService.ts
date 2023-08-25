import { Http } from './http';

export default class ProductsListService {
    static async getAgences() {
        return await Http.get('/society/list');
    }
}
