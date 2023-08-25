import { Http } from './http';

export default class Coproperty {
    static async fetchSyndicList() {
        return await Http.get('/user/role/syndic');
    }

    static async submitCoOwnershipApplication(params: any) {
        return await Http.post('/co_ownership/request', params);
    }

    static async submitSyndicConfirmation(params: any) {
        return await Http.post('/co_ownership/the_property/syndic_responses', params);
    }

    static async updateThePropertyCoOwnership(params: any) {
        return await Http.put(`/co_ownership/the_property/${params.coOwnershipId}`, params.data);
    }

    static async fetchSyndicResponse(params: any) {
        return await Http.get(`/co_ownership/property/syndic_responses?coOwnershipTheProperty=${params.coOwnershipTheProperty}&theProperty=${params.thePropertyId}`)
    }

    static async fetchUserCoOwnership() {
        return await Http.get('/co_ownership/user');
    }
}