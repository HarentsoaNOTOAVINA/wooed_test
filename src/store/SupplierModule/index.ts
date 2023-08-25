import {
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

interface States {
    supplierName: string;
    energyType: string;
    supplierList: any
}

const persistedSupplierName = getSessionPersistedStore({
    key: 'supplierName',
    initValue: '',
});
const persistedEnergyType = getSessionPersistedStore({
    key: 'energyType',
    initValue: '',
});

export const state: States = {
    supplierName: persistedSupplierName,
    energyType: persistedEnergyType,
    supplierList: null,
};

export const getters = {
    getSupplierName(state: States) {
        return state.supplierName;
    },
    getSupplierList(state: States) {
        return state.supplierList;
    },
    getEnergyType(state: States) {
        return state.energyType;
    },
};

export const mutations = {
    mutateSupplierName(state: States, playload: string) {
        state.supplierName = playload;
    },
    mutateEnergyType(state: States, playload: string) {
        state.energyType = playload;
    },
    mutateSupplierList(state: States, playload: string) {
        state.supplierList = playload;
    },
};

export const actions = {
    updateSupplierName({ commit }: any, playload: string) {
        commit('mutateSupplierName', playload);
        setSessionPersistStore({ key: 'supplierName', value: playload });
    },
    updateEnergyType({ commit }: any, playload: string) {
        commit('mutateEnergyType', playload);
        setSessionPersistStore({ key: 'energyType', value: playload });
    },
    updateSupplierList({ commit }: any, playload: string) {
        commit('mutateSupplierList', playload);
    },
};
