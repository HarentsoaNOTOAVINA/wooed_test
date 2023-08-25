import { Http } from './http';

export default class BienDetailService {
    // static async getPropertiesOfferList() {
    //     return await Http.get(
    //         'the_property/by_user/having_offer?operationType=sale'
    //     );
    // }
    static async getPropertiesList() {
        return await Http.get(`${'/the_property/per_user'}`);
    }
    // static async getOfferList(params: number) {
    //     return await Http.get(`/offer/the_property/?theProperty=` + params);
    // }
    static async getOfferByProperty() {
        return await Http.get(
            'the_property/seller'
        );
    }
    static async getByUserByProperty(idProperty: number, idUser: number) {
        return await Http.get(
            `offer/the_property/user/by?theProperty=${idProperty}&user=${idUser}`
        );
    }

    static async validateOnSpanOffer(params: any) {
        return await Http.put('/offer/accepted', params);
    }
    //if isOneSpan false
    static async validateOffer(params: any) {
        const res = await Http.put('offer/accepted/validation', params);
        console.log("res decline",res)
        return res
    }

    static async getOfferListPerUser(params: any) {
        return await Http.get('offer/the_property/count/by', params);
    }
}
