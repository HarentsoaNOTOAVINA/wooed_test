import Rental from '@/services/rentalServices';
import { dataSideMenu } from '@/pages/make-offer-location/data';
interface IState{
    rentOfferDetails: {[key : string] :  any};
    activeDisplayData: any;
    hardCodedParams: {[key : string] :  any}; // TODO: set it dynamically from AcceptOffer page
    loadedDocument: any;
    SentOfferList : any[];
    ReceivedOfferList : any[];
}

export const state = {
    rentOfferDetails: {},
    activeDisplayData: dataSideMenu[0],
    hardCodedParams: { type: 'lease', file: 'teste.pdf' }, // TODO: set it dynamically from AcceptOffer page
    loadedDocument: null,
    SentOfferList : [],
    ReceivedOfferList : [],
    dataBailManagment: [],
    historyPaymentRent: [],
    housingCode : {},
};

const mutationstype = Object.freeze({
    SUBMIT_RENT_OFFER: 'POST_RENT_OFFER',
    SET_ACTIVE_DISPLAY: 'SET_ACTIVE_DISPLAY',
    FETCH_EDITABLE_DOC: 'FETCH_EDITABLE_DOC'
});

export const mutations = {
    [mutationstype.SUBMIT_RENT_OFFER](state: any, payload: any) {
        state.rentOfferDetails = payload;
    },
    [mutationstype.SET_ACTIVE_DISPLAY](state: any, payload: any) {
        state.activeDisplayData = payload;
    },
    [mutationstype.FETCH_EDITABLE_DOC](state: any, payload: any) {
        state.loadedDocument = payload;
    },
    setSentOfferList(state : IState, payload : any){
        state.SentOfferList = [...payload];
    },
    resetSentOfferList(state: IState){
        state.SentOfferList = [];
    },
    setReceivedOfferList(state: IState, payload : any){
        state.ReceivedOfferList = [...payload];
    },
    setDataBailManagment(state: any, payload: any){
        state.dataBailManagment = payload;
    },
    mutationHistoryPaymentRent(state: any, payload: any){
        state.historyPaymentRent = payload;
    },
    mutationHousingCode(state: any, payload: any){
        state.historyPaymentRent = payload;
    },
};

export const actions = {
    setRentOfferData({ commit }: any, payload: any) {
        commit(mutationstype.SUBMIT_RENT_OFFER, payload);
    },

    async submitCounterPropositionForm({ state }: any) {
        let response = await Rental.submitCounterProposition(
            state.rentOfferDetails
        );
        return response;
    },
    setActiveDisplayData({ commit }: any, payload: any) {
        commit(mutationstype.SET_ACTIVE_DISPLAY, payload)
    },
    async fetchEditableDocument({ commit, state }: any) { // TODO: add payload as params when the hardCodedParms value will be setted dynamically 
        let { data, status } = await Rental.getEditableDocument(state.hardCodedParams);        
        commit(mutationstype.FETCH_EDITABLE_DOC, data)
    },
    async fetchOfferList({ commit}: any ){
        commit("resetSentOfferList");
        let {data, status,success } = await Rental.getOfferLeaseList();
        console.log("DBG success", data);
            commit("setSentOfferList", data);
    },
    async signContract({ commit} : any, payload : any){
        // const promise = new Promise(async (resolve, reject) =>{
            const data = await  Rental.offerLeaseValidationRequest({
                offer : payload.offer,
                // theProperty : payload.thePropertyId,
                responseType :  "accepted",
                urlDetailTheProperty: payload.urlClient,
                urlSite  : payload.urlClient
            });
            console.log("DBG Code", data);
            if(data.success){
                const form = new FormData();
                Object.keys(payload).forEach((key : string)=>{
                    if(key === 'file'){
                        form.append(key, payload[key], 'file.pdf')
                    }else{
                        form.append(key, payload[key])
                    }
                
                })
                Rental.signContract(form).then(({data}) => {
                    
                    // resolve(data.data.url1);
                    
                })
            }
            // reject("validation error");
        // })
            
        // return promise;
    },
    async fetchReceivedOfferLease({commit} : any,payload : {[key : string]: number}){
        const {data, code} = await Rental.fetchReceivedOfferLease(payload); 
        console.log('DBG received offer code', code );
        if(code){
        console.log('DBG received offer', data );

           commit('setReceivedOfferList', data);
        }
    },
    async postInventoryDatas({commit} : any,payload : any){
        const {data, code} = await Rental.postInventoryDatas(payload); 
        console.log('DBG inventory data code ', code );
        if(code){
        console.log('DBG inventory data', data );

           commit('setReceivedOfferList', data);
        }

        return data;
    },

    async getDataBailManagment({commit}: any, payload : any){
        let data = await Rental.getDataBailManagement(payload);
        commit('setDataBailManagment', data);
        return data;
    },

    async putDataBailManagment({commit}: any, payload : any){
        return await Rental.putDataBailManagement(payload);
    },

    async setHistoryPaymentRent({commit}: any, payload : any){
        let response = await Rental.getHistoryPaymentRent(payload);
        
        commit("mutationHistoryPaymentRent", response);

        return response;
    },
    async postPaymentRent({commit}: any, payload : any){
        return await Rental.addPaymentRent(payload);
    },
    async updatePaymentRent({commit}: any, payload : any){
        return await Rental.updatePaymentRent(payload);
    },
    
    async addRequestLeave({commit}: any, payload : any){
        return await Rental.addRequestLeave(payload);
    },
    async listRequestLeave({commit}: any, filtre : any){
        return await Rental.listRequestLeave(filtre);
    },
    async listHousingCode({commit}: any, paramsFilter: any){
        let data = await Rental.getHousingCode(paramsFilter);

        commit("mutationHousingCode", data);
        return data;
    },
    
    // tourist accomodation
    async getPeriodOccupationTouristAccomode({commit}: any, params: any){
        let data = await Rental.getPeriodOccupationTouristAccomode(params);

        // commit("mutationHousingCode", data);
        return data;
    },


    
};


export const getters = {
    getRentalDetails(state: any) {
        return state.rentOfferDetails;
    },
    getActiveDisplayData(state: any) {
        return state.activeDisplayData;
    },
    getRawDocumentCode(state: any) {
        return state.loadedDocument;
    },
    getSentOfferList(state: IState) {
        return state.SentOfferList;
    },
    getReceivedOfferList(state: IState) {
        return state.ReceivedOfferList;
    },
    getBailManagmentData(state: any) {
        return state.dataBailManagment;
    },
    getHistoryPaymentRent(state: any) {
        return state.historyPaymentRent;
    },
    getHousingCode(state: any) {
        return state.housingCode;
    },
};