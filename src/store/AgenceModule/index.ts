import AgenceModule from '@/services/agencyService';
interface IAgence {
    id: number;
    name: String;
    logo: string;
    email: string;
    address: string;
    personalNumber: number;
    numberUsing?: string;
    tva: any;
}

interface IAgenceState {
    selectedAgence: IAgence;
    listeAgence: any;
    publication: any;
}
const mutationType: Readonly<any> = Object.freeze({
    GET_SELECTED_AGENCE: 'GET_SELECTED_AGENCE',
    GET_LISTE_AGENCE: 'GET_LISTE_AGENCE',
    GET_PUBLICATION_AGENCE: 'GET_PUBLICATION_AGENCE',
});

export const state: IAgenceState = {
    selectedAgence: <IAgence>{},
    listeAgence: [],
    publication: [],
};

export const mutations: object = {
    [mutationType.GET_SELECTED_AGENCE](state: IAgenceState, payload: any) {
        state.selectedAgence = payload;
    },
    [mutationType.GET_LISTE_AGENCE](state: IAgenceState, payload: any) {
        state.listeAgence = payload;
    },
    [mutationType.GET_PUBLICATION_AGENCE](state: IAgenceState, payload: any) {
        state.publication = payload;
    },
};

export const getters: Object = {
    getSelectedAgence(state: IAgenceState) {
        return state.selectedAgence;
    },
    getAgencyList(state: IAgenceState) {
        return state.listeAgence;
    },
    getAgencyPublication(state: IAgenceState) {
        return state.publication;
    },
};

export const actions: Object = {
    async setAgencyList({ commit }: any) {
        const { data } = await AgenceModule.getAgenciesList();
        console.log(data, 'agencyliste');
        commit(mutationType.GET_LISTE_AGENCE, data);
    },
    async setAgencyPublication({ commit }: any, payload: any) {
        const { data } = await AgenceModule.getAgencyPublication(payload);
        console.log('publicaion ', data);
        commit(mutationType.GET_PUBLICATION_AGENCE, data);
    },
    setSelectedAgence({ commit }: any, payload: any): void {
        commit(mutationType.GET_SELECTED_AGENCE, payload);
    },
};
