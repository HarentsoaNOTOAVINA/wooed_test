import HeritageService from '@/services/HeritageService';

export const state = {
    brugisResult: {},
};

export const mutations = {
    mutationBrugisResult(state: any, payload: any) {
        state.brugisResult = payload;
    },
};

export const actions = {
    async setBrugisResult({ commit }: any, params: any) {
        const brugisData = await HeritageService.checkBrugis(params);
        commit('mutationBrugisResult', brugisData);
    },
};
export const getters = {
    getBrugisResult(state: any) {
        return state.brugisResult;
    },
};
