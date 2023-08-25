import Financial from '@/services/FinancialService';
import { isAnArrayorPush2 } from '@/utils/formdata/formData';
import { getPersistedStore, setPersistStore } from '@/utils/persist_store';

const choosenProperty = getPersistedStore({key: 'choosenProperty', initValue: null})

export const state = {
    listMyProperty: null,
    consumerWater : null,
    consumerGaz : null,
    consumerElectric : null,
    consumerTankDetail : [],
    financialHelpDetail: {},
    choosenProperty,
};

const mutationstype = Object.freeze({
    GET_LIST_MY_PROPERTY: 'GET_LIST_MY_PROPERTY',
    GET_CONSUMER_WATER : 'GET_CONSUMER_WATER',
    GET_CONSUMER_GAZ : 'GET_CONSUMER_GAZ',
    GET_CONSUMER_ELECTRIC : 'GET_CONSUMER_ELECTRIC',
    GET_CONSUMER_TANK_DETAIL : 'GET_CONSUMER_TANK_DETAIL',
    SET_FINANCIAL_HELP_DETAILS : 'SET_FINANCIAL_HELP_DETAILS'
});

export const mutations = {
    [mutationstype.GET_LIST_MY_PROPERTY](state: any, payload: String) {
        state.listMyProperty = payload;
    },

    [mutationstype.GET_CONSUMER_WATER](state : any, payload : any){
        state.consumerWater = {...payload};
    },

    [mutationstype.GET_CONSUMER_GAZ](state : any, payload : any){
        state.consumerGaz = {...payload};
    },

    [mutationstype.GET_CONSUMER_ELECTRIC](state : any, payload : any){
        state.consumerElectric = {...payload};
    },

    [mutationstype.GET_CONSUMER_TANK_DETAIL](state : any, payload : any){
        state.consumerTankDetail = payload;
    },
    [mutationstype.SET_FINANCIAL_HELP_DETAILS](state : any, payload : any){
        state.financialHelpDetail = {...state.financialHelpDetail, ...payload};
    },
    mutateChoosenProperty(state: any, payload: any) {
        state.choosenProperty = {...payload}
    }

};

export const actions = {
    updateChoosenProperty({commit}: any, payload: any) {
        commit('mutateChoosenProperty', payload)
        setPersistStore({key: 'choosenProperty', value: payload})
    },

    updateFinancialHelpDetail({commit, state}: any, payload: any) {
        commit(mutationstype.SET_FINANCIAL_HELP_DETAILS, payload);
    },

    async submitFinancialHelpDetail({state}: any){
        const formData = new FormData()
        Object.keys(state.financialHelpDetail).forEach((item: any) => {
            isAnArrayorPush2(item, state.financialHelpDetail[item], formData)
        })
        let response = await Financial.updateFinanceHelpDetails(formData)
        return response 
    },

    async setListMyProperty({ commit }: any) {
        let { data } = await Financial.getPropertyPerUser();
        console.log('data my List Property store', data);
        commit(mutationstype.GET_LIST_MY_PROPERTY, data);
    },

    async getConsumer({commit} : any, payload : {
        theProperty : number | string,
        annualConsumptionState : string | number,
        annualConsumptionPrice : string | number,
        limitDate : string,
        anticipatedAmount : string | number,
        consumptionName : string,
    }){
        enum Choice{
            GAZ = "gaz",
            WATER = "water",
            ELECTRICITY = "electricity"
        }

        switch (payload.consumptionName) {
            case Choice.WATER:
                commit(mutationstype.GET_CONSUMER_WATER, payload);
                break;
            case Choice.GAZ:
                commit(mutationstype.GET_CONSUMER_GAZ, payload);
                break;
            case Choice.ELECTRICITY:
                commit(mutationstype.GET_CONSUMER_ELECTRIC, payload);
                break;
            default:
                return;
        }
    },

    async postConsumer({state} : any, payload : string){
        enum Choice{
            GAZ = "gaz",
            WATER = "water",
            ELECTRICITY = "electricity"
        }
        let response = null;
        switch (payload) {
            case Choice.WATER:
                response = await Financial.getConsumerData(state.consumerWater);
                break;
            case Choice.GAZ:
                response = await Financial.getConsumerData(state.consumerGaz);
                break;
            case Choice.ELECTRICITY:
                response = await Financial.getConsumerData(state.consumerElectric);
                break;
            default:
                return;
        }

    },

    async getTankDetail({commit} : any, payload : string | number){
        const {data, status} = await Financial.getDetailsOfTank(payload);
        if(status === 200){
            commit(mutationstype.GET_CONSUMER_TANK_DETAIL, data);
            return data;
        }else{
            return;
        }
    }
};
export const getters = {
    getListMyProperty(state: any) {
        return state.listMyProperty;
    },
    getConsumerWater(state : any){
        return state.consumerWater;
    },

    getConsumerGaz(state : any){
        return state.consumerGaz;
    },

    getConsumerElectric(state : any){
        return state.consumerElectric;
    },

    getTankDetail(state : any){
        return state.consumerTankDetail;
    },
    getFinancialHelpDetail(state: any){
        return state.financialHelpDetail;
    },
    getChoosenProperty(state: {choosenProperty: any}) {
        return state.choosenProperty;
    }
};
