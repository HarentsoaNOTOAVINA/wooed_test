import { Http } from './http';

// const rawhttp = Http;

interface TypesAppServices {
    page: number | string;
    itemsPerPage: number | string;
    coordinate: string;
}
export default class NearbyService {
    static async getPlaces(payload: {}) {
        // https://maps.googleapis.com/maps/api/place/details/json
        // ?fields=name%2Crating%2Cformatted_phone_number
        // &place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
        // &key=YOUR_API_KEY

        Http.setBaseUrl(
            'https://maps.googleapis.com/maps/api/place/details/json'
        );
        Http.getWithQueryParams('/', {
            ...payload,
            key: import.meta.env.VITE_GOOLE_MAPS_API_KEY,
            fields: 'address_component,name,icon,geometry',
            type: ['Hospital'],
        });
    }

    static async getListServiceApproximated() {
        return await Http.get('/my_services');
    }

    static async deleteServiceApproximated(idService: number) {
        return await Http.delete(`/theservices/${idService}`);
    }
    static async getListServiceCategory() {
        return await Http.get('/service_categories');
    }

    static async createService(params: any) {
        return await Http.post('/theservices', params);
    }
    static async editService(idService: number, params: any) {
        console.log("params edit:", params);
        
        return await Http.put(`/theservices/${idService}`, params);
    }
    static async getAppServices(params?: any) {
        return await Http.get(`/theservices`, params as any);
    }

    static async getAppServiceCategories() {
        return await Http.get(`/service_categories`);
    }
}
