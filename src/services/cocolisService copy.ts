import { Http } from './http';

const BASE_URL_BACK = import.meta.env.VITE_API_COCOLIS_BASE_URL

// Http.setBaseUrl(BASE_URL_BACK);

export default class Cocolis {
    static async postAnnouncements(params: any) {
        Http.setBaseUrl(BASE_URL_BACK);
        return await Http.post('/transportation/announcements', params);
    }

    static async fetchSizes() {
        Http.setBaseUrl(BASE_URL_BACK);
        return await Http.get('/transportation/sizes');
    }

    static async fetchAnnouncements() {
        Http.setBaseUrl(BASE_URL_BACK);
        return await Http.get('/transportation/announcements');
    }
}