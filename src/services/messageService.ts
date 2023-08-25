import { Http } from './http';

export class MessagesService {
    static async getNotificationMessage() {
        return await Http.get('/chat_notification');
    }
    static async getChat() {
        return await Http.get('/conversations');
    }
    static async getConversation(params: any) {
        return await Http.get('/messages', params);
    }
    static async postMessage(params: any) {
        return await Http.post('/messages', params);
    }
    static async vieuwMessages(params: any) {
        return await Http.get(`/conversations/${params}`);
    }
    static async addNewConversation(params: any) {
        return await Http.post(`/conversations`, params);
    }
}
