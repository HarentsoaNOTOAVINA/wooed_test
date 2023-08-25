import { createFormData } from '@/utils/formdata/formData';
import PrimeService from "@/services/primesService";

const mutationsType = {
    GET_ALL_PRIMES : 'GET_ALL_PRIMES',
    DELETE_PROCEDURE : 'DELETE_PROCEDURE',
    GET_DETAILS_PROCEDURE : 'GET_DETAILS_PROCEDURE',
    LIST_TYPE_OF_WORK : 'LIST_TYPE_OF_WORK',
    LIST_SUBSECTION : 'LIST_SUBSECTION', 
    LIST_PRIME : 'LIST_PRIME', 
    DETAILS_PRIME : 'DETAILS_PRIME', 
    UPDATE_PROCEDURE : 'UPDATE_PROCEDURE',
}


export const state = {
    listPrimes : null,
    detailsProcedure : null,
    listTypeOfWork : null,
    listSubsection : null,
    listPrime: null,
    detailsPrime: null
}

export const mutations = {

    [mutationsType.GET_ALL_PRIMES](state : any, payload : Array<any>){
        state.listPrimes = payload;
    },

    [mutationsType.DELETE_PROCEDURE](state : any, payload : number){
        state.listPrimes = state.listPrimes.filter((item : any) => item.id !== payload);
    },

    [mutationsType.GET_DETAILS_PROCEDURE](state : any, payload : any){
        state.detailsProcedure = payload;
    },

    [mutationsType.LIST_TYPE_OF_WORK](state : any, payload : any){
        state.listTypeOfWork = payload;
    },

    [mutationsType.LIST_SUBSECTION](state : any, payload : any){
        state.listSubsection = payload;
    },

    [mutationsType.LIST_PRIME](state : any, payload : any){
        state.listPrime = payload;
    },

    [mutationsType.DETAILS_PRIME](state : any, payload : any){
        state.detailsPrime = payload;
    },

    [mutationsType.UPDATE_PROCEDURE](state : any, payload : any){
        state.detailsProcedure = {
            ...state.detailsProcedure,
            procedures : payload
        }
        if(state.listPrimes){

        }
    },

}

export const actions = {
    async getAllPrimes({commit} : any, payload : number | string){
        const {data} = await PrimeService.getAllPrimes(payload);
        commit(mutationsType.GET_ALL_PRIMES, data);
        return data;
    },

    async deleteProcedure({commit} : any, payload : number | string){
        const { data } = await PrimeService.deletePrimes(payload);
        commit(mutationsType.DELETE_PROCEDURE, payload);
        return data;
    },

    async getDetailsProcedure({commit} : any, payload : number | string){
        const { data } = await PrimeService.getDetailsProcedure(payload);
        commit(mutationsType.GET_DETAILS_PROCEDURE, data);
        return data;
    },

    async getListTypeOfWork({commit} : any){
        const { data } = await PrimeService.getListTypeofWork();
        commit(mutationsType.LIST_TYPE_OF_WORK, extract(data));
        return extract(data);
    },

    async getSubsection({commit} : any, params : number | string){
        const { data } = await PrimeService.getSubsection(params);
        commit(mutationsType.LIST_SUBSECTION, extract(data));
        return extract(data);
    },

    async getListPrime({commit} : any, params : object){
        const { data } = await PrimeService.getPrime(params);
        commit(mutationsType.LIST_PRIME, data);
        return data;
    },

    async calculate({commit} : any, params : any){
        const {data} = await PrimeService.calculateCost(params);
        return data.data;
    },

    async getDetailsPrime({commit} : any, params : number | string){
        const { data } = await PrimeService.getDetailsPrime(params);
        commit(mutationsType.DETAILS_PRIME, data);
        // commit(mutationsType.GET_DETAILS_PROCEDURE, data);
        return data;
    },
    
    async detailsPrime({commit} : any, payload : any){
        commit(mutationsType.GET_DETAILS_PROCEDURE, payload);
    },
    async postProcedure({commit} : any, params : any){
        const {data} = await PrimeService.postProcedures(createFormData(params));
        
        // commit(mutationsType.UPDATE_PROCEDURE,data.data);
        return data.data;
    }


}

export const getters = {
    getAllPrimes(state : any){
        return state.listPrimes;
    },

    getDetailsProcedure(state : any){
        return state.detailsProcedure;
    },

    getAllTypeOfWork(state : any){
        return state.listTypeOfWork;
    },

    getSubsection(state : any){
        return state.listSubsection;
    },

    getListPrime(state : any){
        return state.listPrime;
    },

    getDetailsPrime(state : any){
        return state.detailsPrime;
    },
}

function extract(data : Array<any>){
    let newArray : Array<any> = [];
    data.forEach((item : any) => {
        newArray = [
            ...newArray,
            {
                value: item.id,
                label: item.name
            }
        ]
    })
    return newArray
}