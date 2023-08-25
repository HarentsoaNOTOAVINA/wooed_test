import { Http } from './http';

export default class educationService {
    static async getLevelList() {
        return await Http.get('/levels/list');
    }
    static async getSchoolList(params: any) {
        return await Http.post('/schools/list/by/level', params);
    }
    static async getClassList(params: any) {
        return await Http.post('/education/class/list', params);
    }
    static async createEducation(params: any) {
        return await Http.post('/education/add', params);
    }
}
