import { Http } from './http';

export default class SupplierServices {
    static async postBill(params: Object) {
        return await Http.post('/theproperty_provider/bill/add', params);
    }
    static async getBill(params: Object) {
        return await Http.get('/theproperty_provider/bill/list', params);
    }
    static async postSupplierDocProof(params: Object) {
        return await Http.post('/theproperty_provider/document_proof/add', params);
    }
    static async postWaterConsumption(params: Object) {
        return await Http.post('/provider/watter/consumption/add', params);
    }
    static async getSupplierBill(params: Object) {
        return await Http.get('/theproperty_provider/bill/list', params);
    }
    static async getSupplierDocProof(params: Object) {
        return await Http.get('/theproperty_provider/document_proof/list', params);
    }
    static async postCounterMetaData(params: Object) {
        return await Http.post('/theproperty_counter/add', params);
    }
    static async getCounterMetaData(params: Object) {
        return await Http.get('/theproperty_counter/list', params);
    }
    static async getCounterStatement(params: Object) {
        return await Http.get('/theproperty_counter/statement/list', params);
    }
    static async postCounterStatement(params: Object) {
        return await Http.post('/theproperty_counter/statement/add', params);
    }
    static async postConsumption(params: Object) {
        return await Http.post('/thepropertyconsumption/add', params);
    }
    static async getConsumption(params: Object) {
        return await Http.get('/thepropertyconsumption/list', params);
    }
    static async compareConsumption(params: Object) {
        return await Http.get('/theproperty_provider/compare', params);
    }
    static async getRelativeWork(params: Object) {
        return await Http.get('/theproperty_work/list', params);
    }
    static async updateRelativeWork(params: Object) {
        return await Http.post('/theproperty_work/add', params);
    }
    static async engieSimulation(params: Object) {
        return await Http.get('/engie/result', params);
    }
    static async getEngieSimulationChoice(params: Object) {
        return await Http.get('/engie/result/get', params);
    }
    static async choseSimulation(params: Object) {
        return await Http.post('/engie/result/post', params);
    }
    static async getNearlyCadasters(params: Object) {
        return await Http.get('/the_property/search/proximity', params);
    }
    static async postNeighborSignage(params: Object) {
        return await Http.post('/provider_tank_installations', params);
    }
    static async getNeighborSignage(params: Object) {
        return await Http.get('/provider_tank_installations', params);
    }
    static async getPotentialComputingList(params: Object) {
        return await Http.get('/provider/solar/list', params);
    }
    static async postPotential(params: Object) {
        return await Http.post('/provider/solar/add', params);
    }
    static async getFitterList(params: Object) {
        return await Http.get('/provider/solar/fitter/list', params);
    }
    static async postFitter(params: Object) {
        return await Http.post('/provider/solar/fitter/add', params);
    }
    static async postSolarOrganisation(params: Object) {
        return await Http.post('/provider/solar/organization/add', params);
    }
    static async getSolarOrganisationList(params: Object) {
        return await Http.get('/provider/solar/organization/list', params);
    }
    static async getSolarOrganisationById(params: Object) {
        return await Http.get('/provider/solar/organization/provider_solar_organizations', params);
    }
    static async postGreenCertificate(params: Object) {
        return await Http.post('/provider/solar/green/certificate/add', params);
    }
    static async getGreenCertificate(params: Object) {
        return await Http.get('/provider/solar/green/certificate/list', params);
    }
    static async postSolarMail(params: Object) {
        return await Http.post('/provider/solar/organization/email', params);
    }
}
