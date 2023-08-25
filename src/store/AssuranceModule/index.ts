import { AssuranceService } from "@/services/assuranceService"

interface TypeAssurance {
    value: number,
    theProperty: number,
    propertyType: string,
}
interface TypeDataAssurance {
    company: [],
    cover: [],
}

interface TypeState {
    assurance: TypeAssurance,
    dataAssurance: TypeDataAssurance,
}

export const state  = {
    assurance: null,
    // dataAssurance: null,
}

export const getters = {
    getAssurance(state: TypeState) {
        return state.assurance
    },
    getDataAssurance(state: TypeState) {
        return state.dataAssurance
    },
}

export const mutations = {
    mutateAssurance(state: TypeState, payload: TypeAssurance) {
        state.assurance = payload
    },
    mutateDataAssurance(state: TypeState, payload: TypeDataAssurance) {
        state.dataAssurance = payload
    },
}

export const actions = {
    async setAssurance({commit}: any, payload: TypeAssurance) {
        commit('mutateAssurance', payload);
    },
    async setDataAssurance({commit}: any, payload: TypeDataAssurance) {
        commit('mutateDataAssurance', payload);
    },
}