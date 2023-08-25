import { Http } from './http';

export default class BienDetailService {
    static async getDetail(params: String) {
        return await Http.get(`${'/the_property/' + params }`);
    }
}