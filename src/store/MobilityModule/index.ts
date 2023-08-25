import { MobilityService } from "@/services/mobilityService";
import { createFormData } from "@/utils/formdata/formData";

const mutationTypes = {
    GET_LIST_WORKSITE: 'GET_LIST_WORKSITE',
    GET_FIND_CARPOOLING_DETAILS : 'GET_FIND_CARPOOLING_DETAILS',
    GET_CARPOOLING : 'GET_CARPOOLING',
    PROPOSITION_CARPOOLING : 'PROPOSITION_CARPOOLING',
    ADD_NEW_CORPOOLING : 'ADD_NEW_CORPOOLING'
}

export const state = {
    listWorksite: null,
    findCarpoolingDetails : null,
    carpoolingList : [],
    propositionCarpoolingList : null,
} 

export const mutations = {
    [mutationTypes.GET_LIST_WORKSITE](state : any, payload : any){
        state.listWorksite = payload;
    },
    [mutationTypes.GET_FIND_CARPOOLING_DETAILS](state : any, payload : any){
        state.findCarpoolingDetails = {
            ...state.findCarpoolingDetails,
            ...payload
        }
    },
    [mutationTypes.GET_CARPOOLING](state : any, payload : any){
        state.carpoolingList = payload;
    },

    // [mutationTypes.PROPOSITION_CARPOOLING](state : any, payload : any){
    //     state.propositionCarpoolingList = payload;
    // },
    
    [mutationTypes.ADD_NEW_CORPOOLING](state : any, payload : any){
        state.carpoolingList = [
            payload,
            ...state.carpoolingList
        ]
    }
}

export const actions = {
    async getListWorkSite({commit}: any, params : any) {
        const { data } = await MobilityService.getListWorksite(params)
        commit(mutationTypes.GET_LIST_WORKSITE, formatMapData(data));
        console.log("dara\n",formatMapData(data));
        
        return formatMapData(data)
    },
    
    async addAlert({commit} : any, payload : any){
        const {data } = await MobilityService.addAlert(createFormData(payload));
        console.log("Alert post\n", data);
        
        return data;
    },

    async findCarpoolingDetails({commit} : any, params : any){
        commit(mutationTypes.GET_FIND_CARPOOLING_DETAILS, params);
    },

    async carpoolingService({commit} : any, params ?: any){
        const {data} = await MobilityService.carpoolingService(params);
        commit(mutationTypes.GET_CARPOOLING, data);
        return data;
    },
    
    async propositionService({commit} : any, params : any){
        const {data} = await MobilityService.propositionService(params);
        commit(mutationTypes.ADD_NEW_CORPOOLING, data);
        return data;
    },

    async signalWorksite({commit} : any, params : {id : number, data : any}){
        const { data } = await MobilityService.signalWorksite(params);

        return data;
    }
}

export const getters = {    
    getListWorkSite(state : any){
        return state.listWorksite;
    },

    getAllCarpooling(state : any){
        return state.carpoolingList;
    },
}

function formatMapData(data : Array<any>){
    let newArray : Array<any> = [];

    data.map((item : any) => {
        return newArray = [...newArray, {
            ...item,
            icon : `${window.location.origin}/src/static/images/map/orange-marker.png`,
            lat : item.latitude,
            lng : item.longitude
        }]
    })   
    // return deleteItem(newArray);
    return newArray;
}

function deleteItem(data : Array<any>){
    data.forEach(item => { 
        delete item['latitude']; 
        delete item['longitude']
    })
    return data;
}