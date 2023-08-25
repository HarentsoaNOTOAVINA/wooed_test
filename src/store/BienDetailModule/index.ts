import BienDetailService from "@/services/bienDetailService";

const mutationstype = Object.freeze({
    GET_DETAIL: 'GET_DETAIL',
});

export const mutations: Object = {
    [mutationstype.GET_DETAIL](
        state: any,
        payload: String
    ) {
        state.detailsBien = payload;
    },
};
export const actions: Object = {
    async setDetailBien({ commit }: any, payload: String): Promise<any> {
        console.log(payload, 'params');
        const res: Promise<any> =
            await BienDetailService.getDetail(payload);
        commit(mutationstype.GET_DETAIL, res);
    },
};
export const getters: Object = {
    getDetailBien(state: any) {
        return state.detailsBien;
    },
};
export const state = {
    detailsBien: null,
};
