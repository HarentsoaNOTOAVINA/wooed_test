export const state = {
    notification: null,
    conversation: [],
};

export const getters = {
    getNotifications(state: any) {
        return state.notification;
    },
    getNotificationsCount(state: any) {
        return state.notificationCount;
    },
    getConversation(state: any) {
        return state.conversation;
    },
};

export const mutations = {
    mutateNotifications(state: any, payload: any) {
        state.notification = payload;
    },
    mutateNotificationsCount(state: any, payload: number) {
        state.notificationCount = payload;
    },
    mutationConversation(state: any, payload: any) {
        state.conversation = [...state.conversation, ...payload];
    },
    mutatieConversationNull(state: any) {
        state.conversation = [];
    },
};

export const actions = {
    setNotifications({ commit }: any, payload: any) {
        commit('mutateNotifications', payload);
        commit('mutateNotificationsCount', payload?.lastNotification);
    },
    setNotificationsCount({ commit }: any, payload: number) {
        commit('mutateNotificationsCount', payload);
    },
    setConversation({ commit }: any, payload: any) {
        commit('mutationConversation', payload);
    },
    setNullConversation({ commit }: any) {
        commit('mutatieConversationNull');
    },
};
