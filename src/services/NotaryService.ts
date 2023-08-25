import { Http } from './http';

export default class Notary {
    static async getDocuments() {
        return await Http.get('/document/notary');
    }

    static async addCompromit(params: any) {
        return await Http.post('/clientsales/upload', params);
    }

    static async addDeed(params: any) {
        return await Http.post('/deed_of_sale/create', params);
    }
}
