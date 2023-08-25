import { Http } from './http';

export default class MyAlertsService {
    static async getAlertsList() {
        return await Http.get('/alert/list');
    }
    static async deleteSelectedAlert(params?: any) {
        return await Http.delete('/alert/delete', params);
    }
}
