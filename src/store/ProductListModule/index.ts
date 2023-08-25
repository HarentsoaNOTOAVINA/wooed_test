import ProductsListService from '@/services/productsListService';
import { getSessionPersistedStore, setSessionPersistStore } from '@/utils/persist_store';

const operationType = getSessionPersistedStore({key: 'operationType', initValue: 'sale'})

const mutationType = <Readonly<any>>Object.freeze({
    GET_DATA: 'GET_DATA',
    SET_MAPDATA: 'SET_MAPDATA',
    GET_OPERATION_TYPE: 'GET_OPERATION_TYPE',
    RESET_DATA: 'RESET_DATA',
    
});

export const state = {
    productsListData: [],
    mapData: [],
    operationType
};

export const mutations = {
    [mutationType.GET_DATA](state: any, payload: Object) {
        state.productsListData = payload;
    },
    [mutationType.SET_MAPDATA](state: any, payload: Object) {
        state.mapData = payload;
    },
    [mutationType.GET_OPERATION_TYPE](state: any, payload: String) {
        state.operationType = payload;
    },
    [mutationType.RESET_DATA](state: any, payload: String) {
        state.mapData = [];
        state.productsListData = [];
    },
    setPerUserList(state: any, payload: any) {
        state.productsListData = payload
    }

};


export const actions = {
    async setData({ commit }: any, payload: any) {
        let mapData: any = [];
        let parsedData: any[] = [];
        if (payload) {
            parsedData = payload
        } else {
            let params = {
                operationType: state.operationType,
            }
            const { data } = await ProductsListService.getProductsList(params);
            parsedData = data;
        }
        
        

        parsedData.forEach((item: any, index: number) => {
            mapData.push({
                lat: item.latitude,
                lng: item.longitude,
                prices: item.prices,
                activeClass: '',
                id: item.id,
            });
        });

        commit(mutationType.GET_DATA, parsedData);
        commit(mutationType.SET_MAPDATA, mapData);
        // return parsedData;
    },
    
    setOperationType({ commit }: any, payload: string) {
        console.log(payload, 'STORE');
        commit(mutationType.GET_OPERATION_TYPE, payload);
        setSessionPersistStore({key: 'operationType', value: payload})
    },
    async setListMyProperty({ commit }: any) {
        let data = await ProductsListService.getPropertyPerUser();
        if(data.success){
            console.log('data my List Property store', data.data);
            commit("setPerUserList", data.data);
        }
    },
};
export const getters = {
    getProductsListData(state: any) {
        return state.productsListData;
    },
    getMapData(state: any) {
        return state.mapData;
    },
    getOperationType(state: any) {
        return state.operationType
    }
};
