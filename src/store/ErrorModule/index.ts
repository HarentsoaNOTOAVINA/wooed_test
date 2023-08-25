interface IState {
    errorStatus: number | string;
    errorRedirection?: string;
    urlOnline?: string;
    abonnementError?: boolean; //
}

export const state: IState = {
    errorStatus: 0,
    errorRedirection: '',
    urlOnline: '',
    abonnementError: false,
};

export const getters = {
    getErrorStatus(state: IState) {
        return state.errorStatus;
    },
    getErrorRedirection(state: IState) {
        return state.errorRedirection;
    },
    getUrlOnline(state: IState) {
        return state.errorRedirection;
    },
    getAbonnementError(state: IState) {
        return state.abonnementError;
    }
};

export const mutations = {
    setError(state: IState, { errorStatus, errorRedirection }: IState) {
        state.errorRedirection = errorRedirection;
        state.errorStatus = errorStatus;
    },
    setUrl(state: IState, url: string) {
        state.urlOnline = url;
    },
    setAbonnementError(state: IState, value: boolean) {
        state.abonnementError = value;
    }
};

export const actions = {
    setError({ commit }: any, playload: IState) {
        commit('setError', playload);
    },
    setUrl({ commit }: any, url: string) {
        commit('setUrl', url);
    },
    setAbonnementError({ commit }: any, value: boolean) {
        commit('setAbonnementError', value);
    },
};
