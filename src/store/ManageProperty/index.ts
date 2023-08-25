import { createFormData } from '@/utils/formdata/formData';
import { ManagePropertyService } from './../../services/managePropertyService';


const mutationsType = <Readonly<any>>Object.freeze({
    GET_LIST_PROPERTY : 'GET_LIST_PROPERTY',
    GET_DETAILS_PROPERTY : 'GET_DETAILS_PROPERTY'
});

export const state = {
    listProperty : [],
    detailsProperty : null,
}

export const mutations = {
    [mutationsType.GET_LIST_PROPERTY](state : any, payload : any){
        state.listProperty = payload;
    },

    [mutationsType.GET_DETAILS_PROPERTY](state : any, payload : any){
        state.detailsProperty = payload;
    },
}

export const actions = {
    async getAllProperty({commit} :any, payload : any){
        const {data} = await ManagePropertyService.getProductsListPerUser();
        commit(mutationsType.GET_LIST_PROPERTY, data);
        return data;
    },

    async getDetailsProperty({commit} : any, payload : number){
        const {data} = await ManagePropertyService.getDetailsProperty(payload);
        commit(mutationsType.GET_DETAILS_PROPERTY, data);
        localStorage.setItem('idProperty', data.id);
        return data;
    },

    async detailsProperty({commit} : any, payload : any){
        commit(mutationsType.GET_DETAILS_PROPERTY, payload);
        return payload;
    },

    async createProperty({commit} : any, payload : any){
        const  {data} = await ManagePropertyService.addProperty(createFormData(payload));

        console.log("Data\n", data);
        
        return data;
    }

}

export const getters = {
    getAllProperty(state : any){
        return state.listProperty;
    },

    getDetailsProperty(state : any){
        return state.detailsProperty;
    }
}