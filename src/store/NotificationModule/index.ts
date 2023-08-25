interface TypesNotificationPayload {
    lastNotification: number;
    notifications: Array<{
        id: number;
        message: string;
        view: boolean;
        type: string;
        created: string
    }>;
}
interface TypesState {
    notification: TypesNotificationPayload;
    notificationCount: number;
}

export const state  = {
    notification: null
}

export const getters = {
    getNotifications(state: TypesState) {
        return state.notification
    },
    getNotificationsCount(state: TypesState) {
        return state.notificationCount
    }
}

export const mutations = {
    mutateNotifications(state: TypesState, payload: TypesNotificationPayload) {
        state.notification = payload
    },
    mutateNotificationsCount(state: TypesState, payload: number) {
        state.notificationCount = payload
    }
}

export const actions = {
    setNotifications({commit}: any, payload: TypesNotificationPayload) {
        commit('mutateNotifications', payload)
        commit('mutateNotificationsCount', payload?.lastNotification)
    },
    setNotificationsCount({commit}: any, payload: number) {
        commit('mutateNotificationsCount', payload)
    }
}
