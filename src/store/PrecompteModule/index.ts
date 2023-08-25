import PrecompteService from "@/services/PrecompteServices";

export const mutationsType = Object.freeze({
    GET_PROPERTY_DETAILS  : 'GET_PROPERTY_DETAILS',
    PRECOMPTE_INFO : 'PRECOMPTE_INFO'
})


export const state = {
    propertyDetails : null,
    precompte : null
}

export const mutations = {
    [mutationsType.GET_PROPERTY_DETAILS](state : any, payload : any){
        state.propertyDetails = payload;
    },
    [mutationsType.PRECOMPTE_INFO](state : any, payload : any){
        state.precompte = payload;
    }
}

export const actions = {
    async getAllTheProperty({commit} : any, payload : string | number){
        const {data} = await PrecompteService.getPropertyDetails(payload);
        commit(mutationsType.GET_PROPERTY_DETAILS, data);
        return data;
    },

    async postPrecount({commit} : any, payload : any){
        const {data} = await PrecompteService.postPrecompte(payload);
        commit(mutationsType.PRECOMPTE_INFO, data);
        return data;
    },

    async putPrecount({commit} : any, payload : {idPrecount : string | number, params : Object}){
        const  data  = await PrecompteService.putPrecompte(payload.params, payload.idPrecount);
        commit(mutationsType.PRECOMPTE_INFO, data);
        return data;
    }
}

export const getters = {
    getPropertyDetails(state : any){
        return state.propertyDetails;
    },

    getPrecompte(state : any){
        return state.precompte;
    }

}