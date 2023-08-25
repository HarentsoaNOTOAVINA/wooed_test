// @ts-ignore
import HomeService from '@/services/home';

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
});

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.homeData = payload;
    },
};
export const state = {
    homeData: [],
};

export const actions = {
    async setData({ commit }: any) {
        const data = await HomeService.getHomeData();
        commit(mutationType.GET_DATA, data);
    },
};
export const getters = {
    getHomeData(state: any) {
        return state.homeData;
    },
};
