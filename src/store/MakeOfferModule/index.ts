import OfferService from '@/services/offerService';

export const state = {
    notaryList: null,
    myListBienOffered: null,
    listOffer: null,
    oldIdBienOffered: null,
    currentIdBienOffered: null,
    listCompromis: null,
    comments: [],
    historyList: null,
    idToGetHistory: null,
    makeRequest: false,
    participate : false,
    participantSelected: [],
    listOfferShared: [],
    detailOfferShared: [],
};

const mutationstype = Object.freeze({
    GET_NOTARY_LIST: 'GET_NOTARY_LIST',
    GET_LIST_BIEN_OFFERED: 'GET_LIST_BIEN_OFFERED',
    GET_LIST_OFFER: 'GET_LIST_OFFER',
    GET_OLD_ID_OFFERED: 'GET_OLD_ID_OFFERED',
    GET_CURRENT_ID_OFFERED: 'GET_CURRENT_ID_OFFERED',
    GET_HISTORY: 'GET_HISTORY',
    GET_ID_TO_GET_HISTORY: 'GET_ID_TO_GET_HISTORY',
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_COMPROMIS: 'GET_COMPROMIS',
    GET_COMMENTS: 'GET_COMMENTS',
    SET_ID_TO_GET_HISTORY: 'SET_ID_TO_GET_HISTORY',
    SET_LIST_OFFER_SHARED: 'SET_LIST_OFFER_SHARED',
    SET_AROUND_NOTARIES: 'SET_AROUND_NOTARIES'
});

export const mutations: Object = {
    [mutationstype.GET_NOTARY_LIST](state: any, payload: String) {
        state.notaryList = payload;
    },

    [mutationstype.GET_LIST_BIEN_OFFERED](state: any, payload: String) {
        state.myListBienOffered = payload;
    },

    [mutationstype.GET_LIST_OFFER](state: any, payload: String) {
        state.listOffer = payload;
    },

    [mutationstype.GET_OLD_ID_OFFERED](state: any, payload: String) {
        state.oldIdBienOffered = payload;
    },

    [mutationstype.GET_CURRENT_ID_OFFERED](state: any, payload: String) {
        state.currentIdBienOffered = payload;
    },

    [mutationstype.MAKE_REQUEST](state: any, payload: String) {
        state.makeRequest = payload;
    },

    [mutationstype.GET_COMPROMIS](state: any, payload: any) {
        state.listCompromis = payload;
    },

    [mutationstype.GET_COMMENTS](state: any, payload: any) {
        state.comments = payload;
    },

    [mutationstype.GET_HISTORY](state: any, payload: any) {
        state.historyList = payload;
    },

    [mutationstype.SET_ID_TO_GET_HISTORY](state: any, payload: any) {
        state.idToGetHistory = { ...state.idToGetHistory, ...payload };
    },

    [mutationstype.SET_LIST_OFFER_SHARED](state: any, payload: any) {
        state.listOfferShared = payload;
    },

    [mutationstype.SET_AROUND_NOTARIES](state: any, payload: any) {
        state.notaryList = payload;
    },

    mutationStateParticipate(state: any, payload: boolean) {
        state.participate = payload;
    },

    mutationParticipantSelected(state: any, payload: any) {
        state.participantSelected = payload;
    },

    mutationDetailOfferShared(state: any, payload: any) {
        state.detailOfferShared = payload;
    }
};
export const actions: Object = {
    async setNotaryList({ commit }: any): Promise<any> {
        let { data } = await OfferService.getNotaryList();
        commit(mutationstype.GET_NOTARY_LIST, data);
    },

    async setMyListOffer({ commit }: any): Promise<any> {
        let { data } = await OfferService.getBienOffered();

        commit(mutationstype.GET_LIST_BIEN_OFFERED, data);
        console.log('Liste Bien storre', data);
    },

    async setOfferList({ commit }: any, payload: number): Promise<any> {
        const res: Promise<any> = await OfferService.getListOffer(payload);
        commit(mutationstype.GET_LIST_OFFER, res);
    },

    setOldIdBienOffered({ commit }: any, payload: number) {
        commit(mutationstype.GET_OLD_ID_OFFERED, payload);
    },

    setCurrentIdBienOffered({ commit }: any, payload: number) {
        commit(mutationstype.GET_CURRENT_ID_OFFERED, payload);
        console.log('number commited from store current ID', payload);
    },

    setStatusRequest({ commit }: any, payload: boolean) {
        commit(mutationstype.MAKE_REQUEST, payload);
    },

    async setListCompromis({ commit }: any, payload: number) {
        const { data } = await OfferService.getCompromis(payload);
        commit(mutationstype.GET_COMPROMIS, data);
    },

    async getComments({ commit }: any, payload: number) {
        const { data } = await OfferService.getCommentList(payload);
        commit(mutationstype.GET_COMMENTS, data);
    },

    async PostComments({ commit }: any, payload: any) {
        const resp = await OfferService.PostComments(payload);
    },

    async setHistoryCompromis({ commit }: any, payload: any) {
        const { data } = await OfferService.getHistoryOfCompromis(
            payload.idOffer,
            payload.idCompromis
        );
        commit(mutationstype.GET_HISTORY, data);
    },

    async getIdToGetHistory({ commit }: any, payload: object) {
        commit(mutationstype.SET_ID_TO_GET_HISTORY, payload);
    },

    setParticipate({ commit }: any, payload: boolean) {
        commit("mutationStateParticipate", payload);
    },

    setParticipantSelected({ commit }: any, payload: boolean) {
        commit("mutationParticipantSelected", payload);
    },

    async setListOfferShared({ commit }: any, payload: any) {
        const results = await OfferService.listOfferShared(payload);
        commit(mutationstype.SET_LIST_OFFER_SHARED, results);
        return results;
    },

    setDetailOfferShared({ commit }: any, payload: boolean) {
        commit("mutationDetailOfferShared", payload);
        return payload;
    },

    async transmitDIU({ _ } : any , payload: any) {
        const { data } = await OfferService.transmitDIU(payload);
        return data.success;
    },

    async fetchAroundNotaries({ commit } : any, payload: any) {
        const { data } = await OfferService.getNotary(payload);
        commit(mutationstype.SET_AROUND_NOTARIES, data)
    }
};
export const getters: Object = {
    getNotaryList(state: any) {
        return state.notaryList;
    },

    getMyListOffers(state: any) {
        return state.myListBienOffered;
    },

    getOfferList(state: any) {
        return state.listOffer;
    },

    getOldIdBienOffered(state: any) {
        return state.oldIdBienOffered;
    },

    getCurrentIdBienOffered(state: any) {
        return state.oldIdBienOffered;
    },

    getStatusRequested(state: any) {
        return state.makeRequest;
    },
    getCompromisList(state: any) {
        return state.listCompromis;
    },
    getCommentList(state: any) {
        return state.comments;
    },
    getListHistory(state: any) {
        return state.historyList;
    },
    getIdToGetHistory(state: any) {
        return state.idToGetHistory;
    },
    getParticipate(state: any) {
        return state.participate;
    },
    getParticipatantSelected(state: any) {
        return state.participantSelected;
    },

    getListOfferShared(state: any) {
        return state.listOfferShared;
    },

    getDetailOfferShared(state: any) {
        return state.detailOfferShared;
    },
};
