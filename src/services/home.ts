import { Http } from './http';

export default class HomeService {
    static async getHomeData() {
        return await Http.get('/users');
    }
}
