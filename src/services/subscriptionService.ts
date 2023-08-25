import { Http } from './http';

export default class SubscriptionServices {
    static async getSubscriptionCard(params: Object) {
        return await Http.get('/subscriptionproduct/list', params);
    }
    static async getAccesSubscriptionServices() {
        return await Http.get('/subscription-product-service/list/local');
    }
    static async getCustomSubscriptionServices() {
        return await Http.get('/subscription-product-service/list/paid');
    }
}
