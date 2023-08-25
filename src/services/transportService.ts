import { Http } from './http';

export default class Transport {
    static async postAnnouncements(params: any) {
        return await Http.post('/transportation/announcements', params);
    }

    static async postProposalData(params: any) {
        return await Http.post('/transportation/propositions', params);
    }

    static async fetchSizes() {
        return await Http.get('/transportation/sizes');
    }

    static async fetchAnnouncements(params: any) {
        return await Http.get(`/transportation/announcements?${params}`);
    }

    static async searchAnnouncementsByRay(params: any) {   
        return await Http.get(`transportation/announcements/search?${params}`);
    }

    static async postIdentityDocuments(id : number,params: any) {
        return await Http.put(`/users/${id}/bank`, params);
    }

    static async postTargetPurpose(params: any) {
        Http.setBaseUrl("http://immo-cocolis.dev73/api/immo/v2")
        return await Http.post('transportation/routes', params);
      
    }
    static async fetchPendingValidatedAnnouncements(params: any) {
        return await Http.get(`/transportation/announcements?user=${params.userId}&status=${params.announcementStatus}`);
    }

    static async fetchPendingPropositions(params: any) {
        return await Http.get(`/transportation/propositions?user=${params.userId}&status=${params.propositionStatus}`);
    }

    static async fetchMyRouteList(params: any) {
        return await Http.get(`/transportation/routes?user=${params.userId}&status=${params.routeStatus}`);
    }

    static async validateProposition(params: any) {
        return await Http.put(`/transportation/proposition/validation/${params.id}`, params.payload);
    }

    static async updateCardRegistrationInfo(params: any) {
        return await Http.put(`/transportation/propositions/card_register/${params.id}`, params.payload);
    }

    static async getRegistrationCardInfo(params: any) {
        return Http.get(`/transportation/propositions/${params.id}`);
    }

    static async fetchMovingFormula(params: any) {
        return await Http.post('/transportation/moving_formula/search', params);
    }

    static async fetchMovingCompanies(params: any) {
        return await Http.get(`/users/moving_company?lat=${params.lat}?lng=${params.lng}`);
    }

    static async simulateObjectTransportFee(params: any) {
        return await Http.post('/transportation/announcements/simulation', params);
    }
}