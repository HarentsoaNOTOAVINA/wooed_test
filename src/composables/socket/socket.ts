import { onMounted, ref, watch } from 'vue';
import { NotificationsService } from '@/services/notificationsService';
import { MessagesService } from '@/services/messageService';
import { useStore } from 'vuex';

export function useSocketNotification() {
    const store = useStore();
    const notifications = ref<any>(null);
    const evtSource = ref<any>(null);

    async function initNotifications() {
        const { data } = await NotificationsService.getNotification();
        notifications.value = data;
    }
    function initSocket() {
        const url = new URL(import.meta.env.VITE_MERCURE_URL);
        url.searchParams.append(
            `topic`,
            `${import.meta.env.VITE_API_BASE_URL}/notifications/${
                store.getters['UserModule/getUserDetails'].id
            }`
        );
        evtSource.value = new EventSource(url);
        evtSource.value.onopen = () => {
            initNotifications();
        };
        evtSource.value.onmessage = (e: any) => {
            notifications.value = JSON.parse(e.data);
        };
    }
    return { notifications, evtSource, initSocket };
}

export function useSocketNotificationMessage() {
    const store = useStore();
    const notifications = ref<any>(null);
    const evtSource = ref<any>(null);

    async function initNotifications() {
        const { data } = await MessagesService.getNotificationMessage();
        notifications.value = data.numberOfMessageNotSeen;
    }
    function initSocket() {
        const url = new URL(import.meta.env.VITE_MERCURE_URL);

        url.searchParams.append(
            `topic`,
            `${import.meta.env.VITE_API_BASE_URL}/chat_notifications/${
                store.getters['UserModule/getUserDetails'].id
            }`
        );
        evtSource.value = new EventSource(url);
        evtSource.value.onopen = () => {
            initNotifications();
        };
        evtSource.value.onmessage = (e: any) => {
            notifications.value = JSON.parse(e.data).numberOfMessageNotSeen;
        };
    }
    return { notifications, evtSource, initSocket };
}

export function useSocketChat() {
    const store = useStore();
    const dataConversation = ref<any>(null);
    const evtSource = ref<any>(null);

    async function initNotifications() {
        const { data } = await MessagesService.getChat();

        dataConversation.value = data;
    }
    function initSocketChat() {
        const url = new URL(import.meta.env.VITE_MERCURE_URL);

        url.searchParams.append(
            `topic`,
            `${import.meta.env.VITE_API_BASE_URL}/chat/${
                store.getters['UserModule/getUserDetails'].id
            }`
        );
        evtSource.value = new EventSource(url);
        evtSource.value.onopen = () => {
            initNotifications();
        };
        evtSource.value.onmessage = (e: any) => {
            dataConversation.value = JSON.parse(e.data);
        };
    }
    return { dataConversation, evtSource, initSocketChat };
}

export function useSocketConversation() {
    const store = useStore();
    const conversationItems = ref<any>(null);
    const eSource = ref<any>(null);

    async function initConversation(idConversation: any) {
        const params = {
            conversation: idConversation,
        };
        const { data } = await MessagesService.getConversation(params);

        const dataReverse = data.reverse()
        conversationItems.value = dataReverse;
        
        store.dispatch('MessagesModule/setConversation', dataReverse);
    }
    function initSocketConversation(idConversation: any) {
        const url = new URL(import.meta.env.VITE_MERCURE_URL);

        url.searchParams.append(
            `topic`,
            `${
                import.meta.env.VITE_API_BASE_URL
            }/conversations/${idConversation}`
        );
        eSource.value = new EventSource(url);
        eSource.value.onopen = () => {
            initConversation(idConversation);
        };
        eSource.value.onmessage = (e: any) => {
            conversationItems.value = JSON.parse(e.data);
            store.dispatch('MessagesModule/setConversation', [JSON.parse(e.data)]);
        };
    }
    return { conversationItems, eSource, initSocketConversation };
}

// url2 = new URL("http://192.168.2.73:3000/hub ");
// url2.searchParams.append('topic', 'http://immo-back.loc/api/immo/v2/conversation/4' );
// evtSource2 = new EventSource(url2);
// evtSource2.onmessage = (e) => {
//     console.log(e.data);
// }
