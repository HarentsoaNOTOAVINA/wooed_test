import FindPropertyService from '@/services/findPropertyServices';
import { ActionContext } from 'vuex';

interface IState{
    propertyList : any[];
    options : any[];
    societies : any[];
    isFromFindProperty : boolean;
    propertyTypes : any[];
    transactionTypes : any[];
    locationTypes : any[];
    criteria : {[key: string]: any};
}

export const state : IState  = {
    
        propertyList : [],
        options: [],
        societies : [],
        isFromFindProperty : false,
        propertyTypes : [],
        transactionTypes : [],
        locationTypes : [],
        criteria : {}
    }

export const mutations = {
    setCriteria(state  : IState,payload : any){
        state.criteria = {...state.criteria, ...payload}
    },
    resetCriteria(state  : IState){
        state.criteria = {} 
    },
    setOptions(state  : IState,payload : any){
        state.options = payload
    },
    resetPropertyList(state : any){
        state.propertyList = []
    },
    setSocieties(state : IState,payload : any){
        state.societies = payload
    },
    setIsFromFindProperty(state : IState,payload : boolean){
        state.isFromFindProperty = payload
    },
    setTrasactionTypes(state : IState,payload : any){
        state.transactionTypes = payload;
    },
    setLocationTypes(state : IState,payload : any){
        state.locationTypes = payload;
    },
    setPropertyTypes(state : IState,payload : any){
        state.propertyTypes = payload;
    },
}

export const getters = {
    getPropertyLists(state : IState){
        return state.propertyList
    },
    getTransactionTypes(state : IState){
        return state.transactionTypes
    },
    getLocationTypes(state : IState){
        return state.locationTypes
    },
    getSocietiesList(state : IState){
        return state.societies
    },
    getIsFromFindProperty(state : IState){
        return state.isFromFindProperty ;
    },
    getPropertyTypes(state : IState){
        return state.propertyTypes;
    },
    getCriteria(state : IState){
        return state.criteria;
    },
}

export const actions = {
    findProperties({ state,commit, dispatch }: ActionContext<any, any>,payload : Object){
        
        commit('setCriteria',payload)  
        
        const result = FindPropertyService.getWithQueryParams("the_property/search",payload);
        
        result.then(({data }) =>{
            state.propertyList = [ ...data];
            dispatch('ProductsListModule/setData',[ ...data], { root: true })
            // commit('ProductsListModule/GET_DATA',[ ...data], { root: true })
            // commit('ProductsListModule/SET_MAPDATA',[ ...data], { root: true })
        })
    },
    async getPropertyTypes() {
        const result = await FindPropertyService.get('/property_types');
        if (result) {
            return result.data;
        }
    },
    async getOptions({ commit }: any) {
        const data = await FindPropertyService.getOptions();
        if (data.code === 200) {
            commit('setOptions', data);
        }
    },
    async getSociety({commit} : any ){
        const result = await FindPropertyService.get("/society/list")
        commit("setSocieties",result.data)
        
    },
    async fetchPropertyTypes({commit} : any){
        const data = await FindPropertyService.fetchPropertyTypes();
        if (data){
            commit("setPropertyTypes",data.data)
        }
    },
    async fetchTransactionTypes({commit} : any){
        const data = await FindPropertyService.fetchTransactionTypeList();
        if (data){
            commit("setTrasactionTypes",data.data)
        }
    },
    async fetchLocationTypes({commit} : any){
        const data = await FindPropertyService.fetchLocationtypeList();
        if (data){
            commit("setLocationTypes",data.data)
        }
        return data.data;
    },

    async createAlerte({state} : any, callback : any){
        const {data} = await FindPropertyService.postAlertCriteria(state.criteria)
        callback(data.success)
    }
    
}
