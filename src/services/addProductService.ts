import { Http } from '@/services/http';

const getWithQueryParams = (url: string, params: any) => {
    let formatted_params = '?';
    const p = Object.keys(params);
    p.forEach((elt) => {
        formatted_params += `${elt}=${params[elt]}&`;
    });
    formatted_params += ';';
    formatted_params = formatted_params.replace('&;', '');

    console.log(formatted_params);
    return Http.get(url + formatted_params);
};

export default class AddProductService {
    static async getPropertyType() {
        return await Http.get('/property_types');
    }

    static async getDailyNeeded() {
        return await Http.get('/daily/needed/list');
    }

    static async getFeatures() {
        return await Http.get('/features');
    }

    static async getOptions() {
        return await Http.get('/options');
    }

    static async getAllTheProperty() {
        return await Http.get('/the_property/list');
    }

    static async postTheProperty(data: any) {
        return await Http.post('/the_property/add', data);
    }
    static async getContactList(type: string, params: {}) {
        return await getWithQueryParams(`/users/search/${type}`, params);
    }
    static async getErgeticCaracteristic(params: {}) {
        return await getWithQueryParams(
            `/theproperty_provider/checked`,
            params
        );
    }

    static async getDestinations() {
        return await Http.get(`/property_destinations/`);
    }
    static async getDcumentsFieds(params: { [key: string]: any }) {
        return await Http.getWithQueryParams(`document/fields`, params);
    }

    static async postUrbaDocument(data: any) {
        return await Http.post('/document_request', data);
    }

    static async getCadastreByCoordinates(params: {
        lat: number;
        lng: number;
    }) {
        return await Http.getWithQueryParams(
            '/cadastre/parcelle/by_coordinate',
            params
        );
    }
    static async getCadastreByRegion(params: { lat: number; lng: number }) {
        return await Http.getWithQueryParams(
            '/cadastre/parcelle/list/region',
            params
        );
    }

    static async getListOfSyndic() {
        return await Http.get('/user/role/syndic');
    }

    static async getSuggestedPrice(params: any) {
        return await Http.getWithQueryParams(
            '/the_property/suggest/price',
            params
        );
    }
    static async getAllCadastres() {
        return await Http.get('/cadastre/parcelle/list');
    }
    static async fetchNotaryList() {
        return await Http.get('offer/get/notary');
    }
    static async getAgencyList(params: {
        lat: string;
        lng: string;
        dis: string;
    }) {
        return await Http.getWithQueryParams('/users/search/agence', params);
    }
    static async sendEmailToAgent(params: any) {
        return await Http.post('/contact_agency', params);
    }
    static async getToiture() {
        return await Http.get('/roof');
    }
    static async getTransactionTypes(){
        return await Http.get('/transaction_types');
    }

    static async getUserInfluencer(){
        return await Http.get('/user/by/speciality?speciality=Influenceurs');
    }

    static async getUserDigitalMarketer(){
        return await Http.get('/user/by/speciality?speciality=Digital%20marketer');
    }

    static async getUserArtistes(){
        return await Http.get('/user/by/speciality?speciality=Artistes');
    }

    static async saveParamsSession(params : any){
        return await Http.post('/the_property/session', params);
    }

    static async getSaveParamsSession(){
        return await Http.get('/the_property/session');
    }

    static async getNotary(params : {lat : number | string, lng : number | string}){
        return await Http.get(`offer/get/notary?lat=${params.lat}&lng=${params.lng}`);
    }
}
