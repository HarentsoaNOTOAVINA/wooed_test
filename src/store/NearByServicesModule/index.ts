import NearbyService from '../../services/nearbyService';

export const state = {
    serviceList: [],
    listServiceApproximated: [],
    serviceCreated: [],
    serviceEdited: [],
    serviceCategories: [],
};

const mutationstype = Object.freeze({
    GET_LIST_SERVICE: 'GET_LIST_SERVICE',
});

export const mutations = {
    [mutationstype.GET_LIST_SERVICE](state: any, payload: Object) {
        state.listServiceApproximated = payload;
    },
    setServiceList(state: any, payload: any) {
        state.serviceList = [...payload];
    },
    mutationsServiceCreated(state: any, payload: any) {
        state.serviceCreated = payload;
    },
    mutationsServiceCategory(state: any, payload: any) {
        state.serviceCategories = payload;
    },
    mutationsServiceEdited(state: any, payload: any) {
        state.serviceEdited = payload;
    },
};

export const actions = {
    async setListServicesApproximated({ commit }: any): Promise<any> {
        let data = await NearbyService.getListServiceApproximated();
        commit(mutationstype.GET_LIST_SERVICE, data);
        console.log(data, 'data Store listService');
    },

    async deleteService({ commit }: any, idService: number) {
        const data = await NearbyService.deleteServiceApproximated(idService);

        return data;
    },
    async setServiceCategory({ commit }: any, payload: any) {
        const serviceCategory = await NearbyService.getListServiceCategory();
        commit('mutationsServiceCategory', serviceCategory);
    },

    async createService({ commit }: any, payload: any) {
        const createService = await NearbyService.createService(payload);
        commit('mutationsServiceCreated', createService);
        console.log('create service:', createService);
    },
    async editService({ commit }: any, {id , payload}:any) {
        const editService = await NearbyService.editService(id,payload);
        commit('mutationsServiceEdited', editService);
        console.log('edit service:', editService);
    },
};

export const getters = {
    getServiceList(state: any) {
        return state.serviceList;
    },
    getServiceCategory(state: any) {
        return state.serviceCategories;
    },
    getCreateService(state: any) {
        return state.serviceCreated;
    },
    getEditService(state: any) {
        return state.serviceEdited;
    },
    getListServicesApproximated(state: any) {
        return state.listServiceApproximated;
    },
};
