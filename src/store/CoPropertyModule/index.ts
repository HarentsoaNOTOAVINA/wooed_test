import { createFormData } from '@/utils/formdata/formData';
import Coproperty from "@/services/coProperty";
import Syndic from '@/services/syndicService';

export const state = {
    coOwnershipIds: undefined,
    activeCoOwnership: undefined,
    sessionList: []
}

export const mutations = {
    SET_CO_OWNERSHIP_IDS(state: any, payload: any) {
        state.coOwnershipId = payload;
    },

    SET_ACTIVE_CO_OWNERSHIP(state: any, payload: any) {
        state.activeCoOwnership = payload;
    },

    UPDATE_SESSION_LIST(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.sessionList, payload)) {
            state.sessionList.push(payload);
        }
    },
    
    RESET_STATE_OF(state: any, payload: any) {
        let [key] = Object.keys(payload);
        state[key] = payload[key];
    }
}

export const actions = {
    async fetchSyndicList({ _ }: any) {
        const { data } = await Coproperty.fetchSyndicList();
        return data;
    },

    async submitCoOwnershipApplication({ _ }: any, payload: any) {
        const { data, status } = await Coproperty.submitCoOwnershipApplication(payload);
        return data.success;
    },

    async submitSyndicConfirmation({ _ }: any, formValue: any) {
        const payload = createFormData(formValue);
        const { data, status } = await Coproperty.submitSyndicConfirmation(payload);
        return data.success;
    },

    async updateThePropertyCoOwnership({ _ }: any, formValue: any) {
        const formData = createFormData(formValue.data);
        const payload = { 
            coOwnershipId: formValue.coOwnershipId,
            data: formData
        }
        const { data } = await Coproperty.updateThePropertyCoOwnership(payload);
        return data;
    },

    async getSyndicResponse({ _ }: any, payload: any) {
        const { data } = await Coproperty.fetchSyndicResponse(payload);
        return data;
    },

    async fetchUsersCoOwnership({ commit }: any) {
        const { data } = await Coproperty.fetchUserCoOwnership();
        commit('SET_CO_OWNERSHIP_IDS', data);
        
        // for now we just work with ONE coOwnership
        commit('SET_ACTIVE_CO_OWNERSHIP', data[0].id)
    },

    async fetchSessionList({ commit, state }: any) {
        const { data } = await Syndic.fetchSessionList({
            coOwnership: state.activeCoOwnership,
        });
        data.forEach((element: any) => commit('UPDATE_SESSION_LIST', element));
    },
}

export const getters = {
    getCoOwnershipIds(state: any) {
        return state.coOwnershipIds;
    }
}

function checkIdIfObjectExists(array: any[], object: any) {
    return array.some((element: any) => element.id === object.id);
}