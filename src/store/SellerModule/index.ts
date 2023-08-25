import sellerService from '@/services/sellerService';

export const state = {
    propertiesList: [],
    offerList: [],
    proertiesWithOffer: [],
    offerByUserByProperties: [],
    validateOffer: [],
    refuseOffer: [],
};

export const mutations = {
    mutationPropertiesList(state: any, payload: any) {
        state.propertiesList = payload;
    },
    mutationOfferList(state: any, payload: any) {
        state.offerList = payload;
    },
    mutationPropertiesWithOffer(state: any, payload: any) {
        state.proertiesWithOffer = payload;
    },
    mutationOfferByUserByProperties(state: any, payload: any) {
        state.offerByUserByProperties = payload;
    },
    mutationValidateOffer(state: any, payload: any) {
        state.validateOffer = payload;
    },
    mutationRefusedOffer(state: any, payload: any) {
        state.refuseOffer = payload;
    },
};

export const actions = {
    async setPropertiesList({ commit }: any) {
        const propertiesList = await sellerService.getOfferByProperty();
        commit('mutationPropertiesList', propertiesList);
    },

    async setOfferByProperties({ commit }: any, theProperty: number) {
        console.log('miantso anle izy 1');
        const offerByProperties = await sellerService.getOfferListPerUser({
            theProperty,
        });
        commit('mutationOfferByUserByProperties', offerByProperties);
    },

    async setOfferUser({ commit }: any, { payloadProperty, payloadUser }: any) {
        const offerByUser = await sellerService.getByUserByProperty(
            payloadProperty,
            payloadUser
        );
        commit('mutationOfferByUserByProperties', offerByUser);
    },
    async postValidateOfferSimple({ commit }: any, payload: any) {
        const postValidate = await sellerService.validateOffer(payload);
    },
    async postValidateOffer({ commit }: any, payload: any) {
        //oneSpan
        const postValidate = await sellerService.validateOnSpanOffer(payload);
        console.log('response validate:', postValidate);
        commit('mutationValidateOffer', postValidate);
        return postValidate;
    },
    async postDeclineOffer({ commit }: any, payload: any) {
        const postValidate = await sellerService.validateOffer(payload);
        commit('mutationRefusedOffer', postValidate);
        console.log('validation', postValidate);
    },
};

export const getters = {
    getPropertiesOfferList(state: any) {
        return state.proertiesWithOffer;
    },
    getPropertiesList(state: any) {
        return state.propertiesList;
    },
    getOfferList(state: any) {
        return state.offerList;
    },
    getOfferByProperties(state: any) {
        return state.offerByUserByProperties;
    },
    getDataValidateOffer(state: any) {
        return state.validateOffer;
    },
    getDataRefusedOffer(state: any) {
        return state.refuseOffer;
    },
};
