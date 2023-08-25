import { Http } from './http';

export default class HeritageService {
    static async checkBrugis(idProperty: any) {
        return await Http.get(
            `/brugis/protected?theProperty=${idProperty}`,
            idProperty
        );
    }
}
