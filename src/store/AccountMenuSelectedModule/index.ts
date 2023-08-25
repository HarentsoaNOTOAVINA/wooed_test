import {
    getSessionPersistedStore,
    setSessionPersistStore,
} from '@/utils/persist_store';

const selectedMenuStore = getSessionPersistedStore({
    key: 'selectedMenu',
    initValue: '',
});
interface IState {
    selectedMenu: string;
}

export const state: IState = {
    selectedMenu: selectedMenuStore,
};

export const getters = {
    getSelectedMenu(state: IState) {
        return state.selectedMenu;
    },
};

export const mutations = {
    setSelectedMenu(state: IState, label: string) {
        state.selectedMenu = label;
    },
};

export const actions = {
    setSelectedMenu({ commit }: any, label: string) {
        commit('setSelectedMenu', label);
        setSessionPersistStore({ key: 'selectedMenu', value: label });
    },
};
