import axios, { AxiosStatic } from 'axios';
import {
    setPersistStore,
    getPersistedStore,
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';
import { useSocketNotification } from '@/composables/socket/socket';
import UserService from '@/services/userService';
import MyAlertsService from '@/services/myAlertsService';
interface IUser {
    name?: string;
    email: string;
    logo?: string;
    adress: string;
    nameEntreprise?: string;
    numberEntreprise?: string;
    password: string;
    confirmPassword: string;
}
interface IUserState {
    user: Object | null;
    registeredUser: IUser | {};
    allUser: Object | null;
    isFromSubscription?: boolean;
    alerts?: Object;
    deletedAlert?: Object;
    soliciations?: Object;
    promo?: Object;
}

const userFromStore: any = getPersistedStore({ key: 'user', initValue: null });

const registerdUserFromSession: any = getSessionPersistedStore({
    key: 'registered_user',
    initValue: {},
});

const mutationType: Readonly<any> = Object.freeze({
    GET_USER_DETAILS: 'GET_USER_DETAILS',
    GET_REGISTERED_USER: 'GET_REGISTERED_USER',
    GET_ALL_USER: 'GET_ALL_USER',
});

export const mutations: Object = {
    [mutationType.GET_USER_DETAILS](state: IUserState, payload: Object) {
        state.user = payload;
    },
    [mutationType.GET_REGISTERED_USER](state: IUserState, payload: IUser) {
        state.registeredUser = payload;
    },
    [mutationType.GET_ALL_USER](state: IUserState, payload: IUser) {
        state.allUser = payload;
    },
    mutateIsFromSubscription(state: IUserState, payload: boolean) {
        state.isFromSubscription = payload;
    },
    mutationAlerts(state: IUserState, payload: Object) {
        state.alerts = payload;
    },
    mutationDeleteAlert(state: IUserState, payload: Object) {
        state.deletedAlert = payload;
    },
    mutationAllSolicitations(state: IUserState, payload: Object) {
        state.soliciations = payload;
    },
    mutationPromo(state: IUserState, payload: Object) {
        state.promo = payload;
    },
};
export const state: IUserState = {
    user: userFromStore,
    registeredUser: registerdUserFromSession,
    allUser: null,
    isFromSubscription: false,
    alerts: '',
    deletedAlert: '',
    soliciations: '',
    promo: '',
};

export const getters: Object = {
    getIsFromSubscription(state: IUserState) {
        return state.isFromSubscription;
    },
    getUserDetails(state: IUserState) {
        return state.user;
    },
    isUSerConnected(state: IUserState) {
        return (state as any).user.id ? true : false;
    },
    getRegisteredUser(state: IUserState) {
        return state.registeredUser;
    },

    getAllUser(state: IUserState) {
        return state.allUser;
    },
    getPromo(state: IUserState) {
        return state.promo;
    },
};

export const actions: Object = {
    async setAllSolicitations({ commit }: any) {
        const { data } = await UserService.getAllSolicitations();
        commit('mutationAllSolicitations', data);
        return data;
    },
    setIsFromSubscription({ commit }: any, payload: boolean) {
        commit('mutateIsFromSubscription', payload);
    },
    setUserDetails({ commit }: any, payload: any): void {
        if (payload) {
            // inject token into Headers
            if (!!payload.token) {
                const token: string = `Bearer ${payload.token}`;
                (axios as AxiosStatic).defaults.headers.common[
                    'Authentication'
                ] = token;
                // save token in localStorage for later use
                !localStorage.getItem('token') &&
                    localStorage.setItem('token', token);
            }
            commit(mutationType.GET_USER_DETAILS, payload.detail);
            // persist User
            setPersistStore({ key: 'user', value: payload.detail });
            // useSocketNotification()
        } else {
            /**
             * if logout then null is passed
             */
            commit(mutationType.GET_USER_DETAILS, null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    setRegisteredUser({ commit }: any, payload: IUser): void {
        commit(mutationType.GET_REGISTERED_USER, payload);
        setSessionPersistStore({ key: 'registered_user', value: payload });
    },

    async setAllUser({ commit }: any): Promise<void> {
        const { data } = await UserService.getAllUser();
        commit(mutationType.GET_ALL_USER, data);
        return data;
    },
    async setAlertList({ commit }: any): Promise<void> {
        const { data } = await MyAlertsService.getAlertsList();
        commit('mutationAlerts', data);
        return data;
    },
    async setDeleteAlert({ commit }: any, payload: any): Promise<void> {
        const { data } = await MyAlertsService.deleteSelectedAlert(payload);
        commit('mutationDeleteAlert', data);
        return data;
    },
    async setPromo(): Promise<void> {
        const { data } = await UserService.getPromo();
        return data;
    },
    async checkEmailAvailablity({ _ }: any, emailStr: string) {
        const payload = { email: emailStr };
        const response = await UserService.checkEmail(payload);
        return response;
    }
};

function transform(data: any) {
    let newArray: any = [];

    data.forEach((element: any) => {
        newArray = [
            ...newArray,
            {
                value: element.name,
                id: element.id,
            },
        ];
    });
    return newArray;
}
