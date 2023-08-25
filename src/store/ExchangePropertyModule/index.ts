export const state = {
    ownerPropertyCoords: {},
}

export const getters = {
    getOwnerPropertyCoords(state: any) {
        return state.ownerPropertyCoords;
    },
};

export const mutations = {
    mutateOwnerPropertyCoords(state: any, payload: object) {
        state.ownerPropertyCoords = payload
    },
}

export const actions = {
    async setOwnerPropertyCoords({commit}: any, payload: object) {
        commit('mutateOwnerPropertyCoords', payload);
    },
}