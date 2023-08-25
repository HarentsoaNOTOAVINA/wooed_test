import { Http } from './http';

export class NotificationsService {
    static async getNotification() {
        return await Http.get('/notifications');
    }

    static async resetNotification() {
        return await Http.get('/notifications/reset');
    }

    static async makeNotificationSeen(notificationId: number) {
        return await Http.get(`/notifications/view/${notificationId}`);
    }

    static async test() {
        return await Http.get(`/society/list/user`);
    }
}
