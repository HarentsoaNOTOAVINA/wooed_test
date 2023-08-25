import { isAnArrayorPush } from '@/utils/formdata/formData';
import NotaryService from '@/services/NotaryService';

export const state = {
    compromise: {},
    documents: null,
    responseCompromisNotary: null,
    responseDeedSales: null,
};

const mutationstype = Object.freeze({
    GET_DOC_NOTARY: 'GET_DOC_NOTARY',
    GET_RESPONSE_NOTARY: 'GET_RESPONSE_NOTTARY',
});

export const mutations = {
    mutationCompromise(state: any, payload: any) {
        state.compromise = { ...state.compromise, ...payload };
    },

    [mutationstype.GET_DOC_NOTARY](state: any, payload: String) {
        state.documents = payload;
    },

    mutationCompromisNotary(state: any, payload: any) {
        state.compromise = { ...state.compromise, ...payload };
    },

    [mutationstype.GET_RESPONSE_NOTARY](state: any, payload: String) {
        state.responseCompromisNotary = payload;
    },

    [mutationstype.GET_RESPONSE_NOTARY](state: any, payload: String) {
        state.responseDeedSales = payload;
    },
};

export const actions = {
    async postCompromise({ state, commit }: any) {
        const formData = new FormData();
        Object.keys(state.compromise).forEach((item) => {
            state.compromise[item].forEach((file: any, index: any) => {
                formData.append(`${item}[${index}][file]`, file);
            });
        });
    },

    async setDocNotary({ commit }: any): Promise<any> {
        let { data } = await NotaryService.getDocuments();
        commit(mutationstype.GET_DOC_NOTARY, data);
    },

    async postCompromiseNotary({ commit }: any, payload: any) {
        let {data} = await NotaryService.addCompromit(payload);
        commit(mutationstype.GET_RESPONSE_NOTARY, data);
        return data
    },

    async postDeedSales({ commit }: any, payload: any) {
        let data = await NotaryService.addDeed(payload);
        commit(mutationstype.GET_RESPONSE_NOTARY, data);
    },
};
export const getters = {
    getDocNotary(state: any) {
        return state.documents;
    },

    getResponseNotary(state: any) {
        return state.responseCompromisNotary;
    },

    getResponseDeedNotary(state: any) {
        return state.responseDeedSales;
    },
};
