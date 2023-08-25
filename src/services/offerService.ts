import { Http } from './http';

export default class MakeOffer {
    static async valideFormOffer(params: Object) {
        return await Http.post('/offer/create', params);
    }

    static async getNotaryList() {
        return await Http.get('/offer/get/notary');
    }

    static async getNotary(params : {lat : number | string, lng : number | string}){
        return await Http.get(`offer/get/notary?lat=${params.lat}&lng=${params.lng}`);
    }

    static async getBienOffered() {
        return await Http.get(
            '/the_property/by_user/having_offer?operationType=sale'
        );
    }

    static async getListOffer(params: number) {
        return await Http.get(`/offer/the_property?theProperty=${params}`);
    }

    static async getCompromis(params: number) {
        return await Http.get(`/clientsales/list?offer=${params}`);
    }
    static async getClientSalesPdf(params?: number) {
        return await Http.get(`/clientsales/tohtml?clientSales=1`);
    }

    static async postClientSalesPdf(params?: any) {
        return await Http.post(`/clientsales/sign`, params);
    }
    static async getCommentList(param: number) {
        return await Http.getWithQueryParams('/clientsales/discussion/list', {
            clientSales: param,
        });
    }
    static async PostComments(params: any) {
        return await Http.post('/clientsales/discussion/add', params);
    }

    static async getHistoryOfCompromis(idOffer: number, idCompromis: number) {
        return await Http.get(
            `/clientsales/history?offer=${idOffer}&clientSales=${idCompromis}`
        );
    }

    static async addCounterOffer(params: any) {
        return await Http.post('/counteroffer/make', params);
    }
    // clientsales/sign

    // offer shared
    static async addOfferShared(params: any) {
        return await Http.post('/offer_collaborative', params);
    }
    
    // join offfer shared
    static async joinOfferShared(params: any) {
        return await Http.post('/offer_collaborative_buyers', params);
    }

    // list offers shared
    static async listOfferShared(params: any) {
        return await Http.get('/offer_collaborative', params);}

    static async transmitDIU(params: any) {
        return await Http.put(`/transmit_property/${params.property}`, params.data);
    }
}
