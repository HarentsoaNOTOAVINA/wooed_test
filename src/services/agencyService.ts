import { Http } from './http';

export default class AgencyService {
    static async getAgenciesList() {
        return await Http.get('/society/list');
    }
    static async getAgenciesServicesList() {
        return await Http.get('/society/approval/list');
    }
    static async getAgencyPublication(params: object): Promise<any> {
        return await Http.post('/society/publication/list', params);
    }
    static async createService(params: any) {
        return await Http.post('/society_approval', params);
    }
}
