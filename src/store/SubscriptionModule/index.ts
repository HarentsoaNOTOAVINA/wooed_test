import SubscriptionServices from '@/services/subscriptionService';
interface ISubscriptionState {
    card: Object | null;
    access: Object;
    custom: Object;
    cardChoosen: Object;
}

const mutationstype = Object.freeze({
    GET_SUBSCRIPTION_CARDS: 'GET_SUBSCRIPTION_CARDS',
    GET_SUBSCRIPTION_ACCESS: 'GET_SUBSCRIPTION_ACCESS',
    GET_SUBCRIPTION_CUSTOM: 'GET_SUBCRIPTION_CUSTOM',
    GET_CARD_CHOICE: 'GET_CARD_CHOICE',
});

export const mutations: Object = {
    [mutationstype.GET_SUBSCRIPTION_CARDS](
        state: ISubscriptionState,
        payload: any
    ) {
        state.card = payload;
    },
    [mutationstype.GET_SUBSCRIPTION_ACCESS](
        state: ISubscriptionState,
        payload: any
    ) {
        state.access = payload;
    },
    [mutationstype.GET_SUBCRIPTION_CUSTOM](
        state: ISubscriptionState,
        payload: any
    ) {
        state.custom = payload;
    },
    [mutationstype.GET_CARD_CHOICE](state: ISubscriptionState, payload: any) {
        state.cardChoosen = payload;
    },
};

export const actions: Object = {
    async setSubscriptionCards({ commit }: any, payload: string): Promise<any> {
        const res: Promise<any> =
            await SubscriptionServices.getSubscriptionCard({
                forSyndic: payload,
            });
        commit(mutationstype.GET_SUBSCRIPTION_CARDS, res);
    },
    async setAccessSubscription({ commit }: any): Promise<any> {
        const res: Promise<any> =
            await SubscriptionServices.getAccesSubscriptionServices();
        commit(mutationstype.GET_SUBSCRIPTION_ACCESS, res);
        return res;
    },
    async setCustomSubscription({ commit }: any): Promise<any> {
        const { data }: any =
            await SubscriptionServices.getCustomSubscriptionServices();
        commit(mutationstype.GET_SUBCRIPTION_CUSTOM, data);
        return data;
    },
    async setCardChoice({ commit }: any, payload: any) {
        commit(mutationstype.GET_CARD_CHOICE, payload);
    },
};

export const getters: Object = {
    getSubscriptionCard(state: ISubscriptionState) {
        return state.card;
    },
    getAccessSubscription(state: ISubscriptionState) {
        return state.access;
    },
    getCustomSubscription(state: ISubscriptionState) {
        return state.custom;
    },
    getCardChoosen(state: ISubscriptionState) {
        return state.cardChoosen;
    },
};

export const state: ISubscriptionState = {
    card: null,
    access: {},
    custom: {},
    cardChoosen: {},
};
