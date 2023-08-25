import PropertyDetailService from '@/services/PropertyDetailService';
import ProductsListService from '@/services/productsListService';
import { setPersistStore, getPersistedStore } from '@/utils/persist_store';

// const propertyDetail: any = getPersistedStore({
//     key: 'propertyDetail',
//     initValue: {},
// });

export const state = {
    propertyDetail: {},
    propertyLocation: [],
    propertyPolygone: [],
    propertyList: [],
    myPropertySelected: {},
    roadwayServiceDetails: undefined
};

export const mutations = {
    mutationPropertyDetail(state: any, payload: any) {
        state.propertyDetail = payload;
    },
    mutationPropertyLocation(state: any, payload: any) {
        state.propertyLocation = payload;
    },
    mutationPropertyPolygone(state: any, payload: any) {
        state.propertyPolygone = payload;
    },
    mutationPropertyList(state: any, payload: any) {
        state.propertyList = payload;
    },
    mutationMyPropertySelected(state: any, payload: any) {
        state.myPropertySelected = payload;
    },
    mutationRoadwayServiceDetails(state: any, payload: any) {
        state.roadwayServiceDetails = payload;
    }
};

export const actions = {
    async setPropertyList({ commit }: any) {
        const propertyList = await ProductsListService.getProductsList('');
        commit('mutationPropertyList', propertyList);
    },
    async setMyPropertySelected({ commit }: any, propertySelected: object) {
        commit('mutationMyPropertySelected', propertySelected);
    },
    async setPropertyData({ state, commit }: any, payload: any) {
        console.log('first');
        const data = await PropertyDetailService.getProductDetail(payload);
        let propertyLocation: any = [];
        let propertyPolygone: any = [];
        console.log('data ho testena', data.data.polyCadastre);

        propertyLocation.push({
            lat: data.data.latitude,
            lng: data.data.longitude,
        });

        // propertyPolygone.push(
        //     { lat: 50.84665167605899, lng: 4.350414276123048 },
        //     { lat: 50.84440259845273, lng: 4.349427223205567 },
        //     { lat: 50.84429420643197, lng: 4.354748725891114 },
        //     { lat: 50.84684135234525, lng: 4.3580961227417 }
        // );
        propertyPolygone.push(data.data.polyCadastre);

        commit('mutationPropertyDetail', data);
        commit('mutationPropertyLocation', propertyLocation);
        commit('mutationPropertyPolygone', propertyPolygone);

        // setPersistStore({ key: 'propertyDetail', value: data });
    },
    async fetchRoadwayServiceDetails({ commit }: any, payload: any) {
        const { data } = await PropertyDetailService.fetchRoadwayServiceDetails(payload);
        commit("mutationRoadwayServiceDetails", data[0]);
    }
};

export const getters = {
    getPropertyDetail(state: any) {
        return state.propertyDetail;
    },
    getMyPropertySelected(state: any) {
        return state.myPropertySelected;
    },
    getPropertyCoords(state: any) {
        return state.propertyLocation;
    },
    getPropertyPoly(state: any) {
        return state.propertyPolygone;
    },
    getPropertyList(state: any) {
        return state.propertyList;
    },
    getOperationTye(state: any) {
        return state.propertyDetail.data.operationType;
    },
    getPropertyOwner(state: any) {
        return state.propertyDetail.data.isMe;
    },
    getTotalOffer(state: any) {
        return state.propertyDetail.data.totalOffer;
    },
    getTotalUserOffer(state:any){
        return state.propertyDetail.data.offers;
    },
    getPropertyOwnerByMail(state:any){
        return state.propertyDetail.data.user.email;
    },
    getRoadwayServiceDetails(state: any) {
        return state.roadwayServiceDetails;
    }
};
