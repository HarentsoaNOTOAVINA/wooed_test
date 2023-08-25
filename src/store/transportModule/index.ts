import Transport from '@/services/transportService';
import TransportMenu from '@/pages/transport/components/TransportMenu.vue';
import { shallowRef } from 'vue';

import { createFormData } from '@/utils/formdata/formData';
import { formatDateFr } from '@/utils/date/format';
import { itineraire } from '@/utils/google/direction';

export const state = () => ({
    predifinedSizes: [],
    announcementList: [],
    announcementData: {},
    objectData: {},
    proposalData: {},
    addressFilterData: {},
    targetPurpose: {},
    myPendingValidatedAnnouncement: {},
    myPendingPropositions: {},
    myRouteList: {},
    activeComponent: shallowRef(TransportMenu),
    propositionList: [],
    validPropositonData: {},
    itineraryData: undefined,
    registrationCard: undefined,
    movingFormula: undefined,
    selectedProposition: undefined,
    redirectedFromImmo: false,
    volumeFormIndex: undefined,
    movingTchatPreference: undefined,
    movingCompanyList: [],
    movingCompanyContact: undefined
});

export const mutations = {
    UPDATE_ANNOUNCEMENT_DATA(state: any, payload: any) {
        state.announcementData = { ...state.announcementData, ...payload };
    },

    SET_PREDIFINED_SIZES(state: any, payload: any) {
        state.predifinedSize = payload;
    },

    SET_ANNOUNCEMENT_LIST(state: any, payload: any) {
        state.announcementList = payload;
    },

    UPDATE_OBJECT_DATA(state: any, payload: any) {
        state.objectData = { ...state.objectData, ...payload };
    },

    UPDATE_PHOTOS_FILE(state: any, payload: any) {
        state.announcementData = { ...state.announcementData, ...payload };
    },

    UPDATE_PROPOSAL_DATA(state: any, payload: any) {
        state.proposalData = { ...state.proposalData, ...payload };
    },

    REINITIATE_DATA(state: any) {
        state.announcementData = {};
        state.objectData = {};
    },

    REINITIATE_PROPOSAL_DATA(state: any) {
        state.proposalData = {}
    },

    UPDATE_TARGET_PURPOSE(state: any, payload: any) {
        state.targetPurpose = { ...state.targetPurpose, ...payload };
    },

    SET_MY_PENDING_VALIDATED_ANNOUNCEMENTS(state: any, payload: any) {
        state.myPendingValidatedAnnouncement = payload;
    },

    SET_MY_PENDING_PROPOSITIONS(state: any, payload: any) {
        state.myPendingPropositions = payload;
    },

    SET_MY_ROUTE_LIST(state: any, payload: any) {
        state.myRouteList = payload;
    },

    SET_ACTIVE_COMPONENT(state: any, payload: any) {
        state.activeComponent = payload;
    },

    SET_ADDRESS_FILTER_DATA(state: any, payload: any) {
        state.addressFilterData = { ...state.addressFilterData, ...payload }
    },

    SET_PROPOSITION_LIST(state: any, payload: any) {
        state.propositionList = payload;
    },

    SET_VALID_PROPOSITION(state: any, payload: any) {
        state.validPropositonData = payload;
    },

    SET_ITINERARY(state: any, payload: any) {
        state.itineraryData = payload;
    },

    SET_REGISTRATION_CARD(state: any, payload: any) {
        state.registrationCard = payload;
    },

    SET_SELECTED_PROPOSITION(state: any, payload: any) {
        state.selectedProposition = payload;
    },

    UPDATE_REDIRECTION_STATE(state: any, payload: any) {
        state.redirectedFromImmo = payload;
    },

    SET_VOLUME_FORM_INDEX(state: any, payload: any) {
        state.volumeFormIndex = payload;
    },

    SET_MOVING_COMPANIES(state: any, payload: any) {
        state.movingCompanyList = payload;
    },

    SET_MOVING_COMPANY_CONTACT(state: any, payload: any) {
        state.movingCompanyContact = payload;
    }

};

export const actions = {
    async submitAnnouncement({ commit, state }: any) {
        state.announcementData.announcementObjects = [state.objectData];
        let payload = createFormData(state.announcementData);
        let { data, status } = await Transport.postAnnouncements(payload);
        if (data.success && status === 201) commit('REINITIATE_DATA');
        return { success: data.success }
    },

    async submitProposal({ commit, state }: any) {
        let { data, status } = await Transport.postProposalData(state.proposalData);
        if (status === 201) commit('REINITIATE_PROPOSAL_DATA');
        return { status: status }
    },

    setAnnouncementData({ commit }: any, payload: any) {
        commit('UPDATE_ANNOUNCEMENT_DATA', payload);
    },

    setObjectData({ commit }: any, payload: any) {
        commit('UPDATE_OBJECT_DATA', payload);
    },

    setProposalData({ commit }: any, payload: any) {
        commit('UPDATE_PROPOSAL_DATA', payload);
    },

    async fetchSizes({ commit }: any) {
        let response = await Transport.fetchSizes();
        commit('SET_PREDIFINED_SIZES', response.data);
    },

    async fetchAnnouncements({ commit }: any) {
        let payload = "status=en ligne";
        let response = await Transport.fetchAnnouncements(payload);
        let data = updateKeyValue(response.data);
        commit('SET_ANNOUNCEMENT_LIST', data);
        return data;
    },

    async addObjectPhotos({ commit }: any, payload: any) {
        commit('UPDATE_PHOTOS_FILE', payload);
    },

    async postIdentityDocuments({ commit, rootState }: any, payload: any) {
        const userID = rootState.UserModule.user.id;

        const { data, success } = await Transport.postIdentityDocuments(userID, payload);
        console.log("DBG data", data);
        if (data) {
            return true;
        }
    },

    async postTargetPurpose({ state }: any) {
        const { data } = await Transport.postTargetPurpose(state.targetPurpose);
    },

    async fetchPendingValidAnnouncements({ commit }: any, payload: any) {
        const response = await Transport.fetchPendingValidatedAnnouncements(payload);
        commit('SET_MY_PENDING_VALIDATED_ANNOUNCEMENTS', updateKeyValue(response.data));
    },

    async fetchPendingPropositions({ commit }: any, payload: any) {
        const response = await Transport.fetchPendingPropositions(payload);
        commit('SET_MY_PENDING_PROPOSITIONS', updateKeyValue(response.data));
    },

    async fetchRouteList({ commit }: any, payload: any) {
        const response = await Transport.fetchMyRouteList(payload);
        commit('SET_MY_ROUTE_LIST', updateKeyValue(response.data));
    },

    reinitiateProposalData({ commit }: any) {
        commit('REINITIATE_PROPOSAL_DATA');
    },

    setActiveComponent({ commit }: any, payload: any) {
        commit('SET_ACTIVE_COMPONENT', shallowRef(payload));
    },

    setAddressFilterData({ commit }: any, payload: any) {
        commit('SET_ADDRESS_FILTER_DATA', payload);
    },

    async fetchSearchByRayResult({ state }: any, ray: any) {
        let from = {
            latitude: state.addressFilterData.departureLatitude,
            longitude: state.addressFilterData.departureLongitude
        };
        let to = {
            latitude: state.addressFilterData.arrivalLatitude,
            longitude: state.addressFilterData.arrivalLongitude
        };
        const params = {
            'from[latitude]': from.latitude,
            'from[longitude]': from.longitude,
            'to[latitude]': to.latitude,
            'to[longitude]': to.longitude,
            'ray': ray
        };
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => searchParams.append(key, value));
        const response = await Transport.searchAnnouncementsByRay(searchParams);
        let data = updateKeyValue(response.data);
        return data;
    },

    setPropositionList({ commit, state, rootState }: any, payload: any) {
        const userID = rootState.UserModule.user.id;
        let announcement: any;
        state.announcementList.forEach((element: any) => {
            if (element.reference === payload) announcement = element
        })
        if (announcement.user === userID) commit('SET_PROPOSITION_LIST', announcement.propositions);
    },

    async validateProposition({ commit }: any, payload: any) {
        let response = await Transport.validateProposition(payload);
        return response;
    },

    async fetchItinerary({ commit }: any, payload: any) {
        let data = await itineraire(
            {
                lat: payload.from.lat,
                lng: payload.from.lng
            },
            {
                lat: payload.to.lat,
                lng: payload.to.lng
            }
        );
        commit("SET_ITINERARY", data);
    },

    async updateCardRegistrationInfo({ commit }: any, payload: any) {
        commit('SET_SELECTED_PROPOSITION', payload.id);
        return await Transport.updateCardRegistrationInfo(payload);
    },

    async fetchCardRegistrationInfo({ commit, state }: any) {
        let response = await Transport.getRegistrationCardInfo({ id: state.selectedProposition });
        commit('SET_REGISTRATION_CARD', response.data);
    },

    async getCardRegistrationInfo({ _ }: any, payload: any) {
        return await Transport.getRegistrationCardInfo(payload);
    },

    async fetchMovingFormula({ commit }: any, payload: any) {
        let response = await Transport.fetchMovingFormula(payload);
        return response.data;
    },

    async fetchMovingCompanies({ commit }: any, payload: any) {
        let response = await Transport.fetchMovingCompanies(payload);
        commit('SET_MOVING_COMPANIES', response.data);
    },

    async simulateTransportFee({ state }: any) {
        // need to format the object data to handle the required data in the payload
        let objectData = state.objectData;
        objectData.quantity = parseInt(objectData.quantity);
        delete objectData.weight;

        const payload = {
            departureLatitude: state.announcementData.departureLatitude,
            departureLongitude: state.announcementData.departureLongitude,
            arrivalLatitude: state.announcementData.arrivalLatitude,
            arrivalLongitude: state.announcementData.arrivalLongitude,
            announcementObjects: [objectData]
        }
        let { data } = await Transport.simulateObjectTransportFee(payload);
        return data.price
    }
};

export const getters = {
    getAnnouncementData(state: any) {
        return state.announcementData;
    },

    getPredifinedSizes(state: any) {
        return state.predifinedSize;
    },

    getAnnouncementList(state: any) {
        return state.announcementList;
    },

    getObjectData(state: any) {
        return state.objectData;
    },

    getProposalData(state: any) {
        return state.proposalData;
    },

    getMyPendingValidatedAnnoucements(state: any) {
        return state.myPendingValidatedAnnouncement;
    },

    getMyPendingPropositions(state: any) {
        return state.myPendingPropositions;
    },

    getRouteList(state: any) {
        return state.myRouteList;
    },

    getActiveComponent(state: any) {
        return state.activeComponent;
    },

    getAddressFilterData(state: any) {
        return state.addressFilterData;
    },

    getPropositionList(state: any) {
        return state.propositionList;
    },

    getItineraryData(state: any) {
        return state.itineraryData;
    },

    getRegistrationCardInfo(state: any) {
        return state.registrationCard;
    },

    getRedirectionState(state: any) {
        return state.redirectedFromImmo;
    },

    getVolumeFormIndex(state: any) {
        return state.volumeFormIndex;
    },

    getTchatMovingPreference(state: any) {
        return state.movingTchatPreference;
    },

    getMovingCompanyList(state: any) {
        return state.movingCompanyList;
    },
    
    getMovingCompanyContact(state: any) {
        return state.movingCompanyContact;
    }
};

function updateKeyValue(data: any[]) {
    let updatedList: any[] = []
    data.forEach(async (element: any) => {
        element.dateExpiration = getRemainingDays(element.endingDate);
        element.startingDate = formatDateFr(element.startingDate);
        element.endingDate = formatDateFr(element.endingDate);
        element.address = `De ${element.departureAddress} à ${element.arrivalAddress}`;
        element.deliveryDate = `${element.startingDate.slice(0, 6)}. - ${element.endingDate.slice(0, 6)}.`

        if (element.announcementObjects.length > 0) {
            const item = element.announcementObjects[0];
            item.name ? element.title = item.name : element.title = element.type;
        } else {
            element.format = 'non repertorié';
            element.title = 'non repertorié'
        }

        if (element.photos.length > 0) {
            element.image = element.photos[0].path
        } else {
            element.image = `${window.location.origin}/src/static/images/empty-img.png`
        }

        if (element.dateExpiration !== 'expired') updatedList.push(element);
    })
    return updatedList;
}

function getRemainingDays(inputDate: string) {
    const inputTime = new Date(inputDate).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = inputTime - currentTime;
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

    if (remainingDays < 0) {
        return 'expired';
    } else if (remainingDays === 0) {
        return 'today';
    } else {
        return remainingDays;
    }
}