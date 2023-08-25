import CollectiveGardenService from '@/services/collectiveGardenService';
import SurveyService from '@/services/surveyService';
import { createFormData } from '@/utils/formdata/formData';
import { LatLng } from 'leaflet';
import { shallowRef } from 'vue';
import Pitch from '@/pages/Environment/components/Pitch.vue';
interface CollectiveGardenState {
    id?: number;
    name?: string;
    actors?: any[];
    cadastre?: any[];
    created?: string;
    document?: any;
    gardenProjectSets?: any;
    occupancyAgreement?: any;
    ownerId?: number;
    step?: number;
    users?: any;
    location?: {
        lat: number;
        lng: number;
    };
}
interface stateI {
    collectiveGarden: CollectiveGardenState;
}

interface ImessageBody {
    content: string;
    projectId: number;
    subject: string;
}
interface Imessage {
    messageBody: ImessageBody;
    type: string;
}

interface Iresource {
    managementType?: string;
    type?: string;
    category?: string[];
    name?: string;
    quantity?: string;
    Documents?: any[];
    colectiveGarden?: number;
}

interface participant {
    name: string;
    email: string;
    telephone: string;
    role: string;
}

interface Idate {
    date: string;
    time: string;
    index?: number;
}

interface Imeeting {
    title?: string;
    dates?: Idate[];
    place?: string;
    description?: string;
    collectiveGarden?: number;
}

interface Iinvitation {
    pollId?: number;
    redirectLink?: string;
    participants?: participant[];
}

interface Ireunion {
    invitation?: Iinvitation;
    meeting?: Imeeting;
}
interface stateI {
    collectiveGarden: CollectiveGardenState;
    parcelsAttributionDocs: any[];
    parcelsAttributionApp: any;
    collectiveGardenList: any[];
    individualGardenList: any[];
    selectedGarden?: {[key : string]: any};
    messages: Imessage[];
    activeDisplay: any;
    parcelEnvironmentStatus: any;
    resourceElements: Iresource[];
    resourceTemp: Iresource;
    warnUser: any;
    reunionData: Ireunion;
    reunionDates: Idate[];
    invoices ?: any,
}


export const state: stateI = {
    collectiveGarden: {
        id: -1,
    },
    parcelsAttributionDocs: [],
    parcelsAttributionApp: undefined,
    parcelEnvironmentStatus: undefined,
    collectiveGardenList: [],
    individualGardenList: [],
    selectedGarden: undefined,
    messages: [],
    activeDisplay: Pitch,
    resourceElements: [],
    resourceTemp: {},
    warnUser: { value: false, idx: 1 },
    reunionData: { invitation: {}, meeting: {} },
    reunionDates: [],
    invoices : []
};
export const mutations = {
    setCollectiveGardenData(state: stateI, payload: CollectiveGardenState) {
        state.collectiveGarden = {
            ...state.collectiveGarden,
            ...payload,
        };
    },
    setActorList(state: stateI, payload: any) {
        state.collectiveGarden.actors?.push(payload);
    },
    setLocation(state: stateI, payload: LatLng) {
        state.collectiveGarden.location = payload;
    },
    setParcelsAttributionDocs(state: stateI, data: any[]) {
        // TODO: need validation if we should display all pdf file or filter them by its name
        for (let element of data) {
            element.requestFiles.forEach((file: any) =>
                state.parcelsAttributionDocs.push(file)
            );
        }
    },
    updateParcelsAttributionApp(state: stateI, payload: any) {
        state.parcelsAttributionApp = payload;
    },
    setCollectiveGardenList(state: stateI, payload: any) {
        state.collectiveGardenList = payload;
    },
    setIndividualGardenList(state: stateI, payload: any) {
        state.individualGardenList = payload;
    },
    setCurrentGarden(state: stateI, payload: any) {
        state.selectedGarden = payload;
    },
    setMessagesData(state: stateI, payload: any) {
        let idx = state.messages.findIndex(
            (message: any) => message.type === payload.type
        );
        idx >= 0
            ? (state.messages[idx] = payload)
            : state.messages.push(payload);
    },
    updateActiveDisplay(state: stateI, payload: any) {
        state.activeDisplay = payload;
    },
    cleanUpGardenList(state: stateI) {
        state.collectiveGardenList = [];
        state.individualGardenList = [];
        state.selectedGarden = undefined;
        state.parcelEnvironmentStatus = undefined;
    },
    cleanUpTemporaryData(state: stateI) {
        state.messages = [];
        state.parcelEnvironmentStatus = undefined;
    },
    setParcelEnvironmentStatus(state: stateI, payload: any) {
        state.parcelEnvironmentStatus = payload;
    },
    updateResources(state: stateI, payload: any) {
        let idx = payload.idx;
        let data = payload.data;

        idx >= 0
            ? (state.resourceElements[idx] = data)
            : (state.resourceElements = [...state.resourceElements, ...[data]]);
    },
    updateTempResource(state: stateI, payload: any) {
        state.resourceTemp = { ...state.resourceTemp, ...payload };
    },
    resetResourceTemp(state: stateI) {
        state.resourceTemp = {};
    },
    cleanUpResources(state: stateI) {
        state.resourceElements = [];
    },
    updateWarningStatus(state: stateI, payload: boolean) {
        state.warnUser = payload;
    },
    removeCurrentResource(state: stateI, idx: number) {
        state.resourceElements.splice(idx, 1);
    },
    updateReunionData(state: stateI, payload: Ireunion) {
        payload.hasOwnProperty('invitation')
            ? (state.reunionData.invitation = {
                  ...state.reunionData.invitation,
                  ...payload.invitation,
              })
            : payload.hasOwnProperty('meeting')
            ? (state.reunionData.meeting = {
                  ...state.reunionData.meeting,
                  ...payload.meeting,
              })
            : console.error('unknown issue happen!');
    },
    setReunionDates(state: stateI, payload: Idate) {
        if (payload.index !== undefined) {
            let idx = state.reunionDates.findIndex(
                (date: any) => date.index === payload.index
            );
            if (idx >= 0)
                state.reunionDates[idx] = {
                    ...state.reunionDates[idx],
                    ...payload,
                };
            else state.reunionDates = [...state.reunionDates, ...[payload]];
        }
    },
    removeReunionDate(state: stateI, index: any) {
        if (index !== undefined) {
            let idx = state.reunionDates.findIndex(
                (date: any) => date.index === parseInt(index)
            );
            if (idx >= 0) state.reunionDates.splice(idx, 1);
        }
    },
    removeParticipant(state: stateI, id: any) {
        let actor = state.collectiveGarden.actors?.find(
            (actor: any) => actor.id === id
        );
        let idx = state.reunionData.invitation?.participants?.findIndex(
            (participant: any) => participant.name === actor.name
        );
        if (idx && idx >= 0)
            state.reunionData.invitation?.participants?.splice(idx, 1);
    },
    setInvoice(state : stateI, payload : any){
        state.invoices = payload
    },

};
export const getters = {
    getInVoices(state : stateI){
        return state.invoices;
    },
    getCollectiveGardenData(state: stateI) {
        return state.collectiveGarden;
    },
    getLocation(state: stateI) {
        return state.collectiveGarden.location;
    },
    getParcelsAttributionDocs(state: stateI) {
        return state.parcelsAttributionDocs;
    },
    getParcelsAttrbutionApp(state: stateI) {
        return state.parcelsAttributionApp;
    },
    getParcelEnvironmentStatus(state: stateI) {
        return state.parcelEnvironmentStatus;
    },
    getCollectiveGardenList(state: stateI) {
        return state.collectiveGardenList;
    },
    getIndividualGardenList(state: stateI) {
        return state.individualGardenList;
    },
    getSelectedGarden(state: stateI) {
        return state.selectedGarden;
    },
    getApplicationMessage(state: stateI) {
        let idx = state.messages.findIndex(
            (message: any) => message.type === 'application'
        );
        if (idx >= 0) return state.messages[idx].messageBody.content;
        else return undefined;
    },
    getAskInformationMessage(state: stateI) {
        let idx = state.messages.findIndex(
            (message: any) => message.type === 'ask-information'
        );
        if (idx >= 0) return state.messages[idx].messageBody.content;
        else return undefined;
    },
    getActiveDisplay(state: stateI) {
        return state.activeDisplay;
    },
    getResources(state: stateI) {
        return state.resourceElements;
    },
    getWarning(state: stateI) {
        return state.warnUser;
    },
    getReunionDates(state: stateI) {
        return state.reunionDates;
    },
    getReunionData(state: stateI) {
        return state.reunionData;
    },
};
export const actions = {
    async postCollectiveGardenData({ rootState, commit }: any, payload: any) {
        payload.users = [rootState.UserModule.user.id];
        const { data }: any =
            await CollectiveGardenService.postCollectiveGardenData(payload);
        if (data.success) commit('setCollectiveGardenData', data.data);
    },
    async postCollectiveGardenActors({ commit }: any, payload: any) {
        const { data }: any =
            await CollectiveGardenService.postCollectiveGardenActor(
                payload.data
            );
        if (data.success) {
            // commit('setCollectiveGardenData',data.data);
            payload.callback();
            commit('setActorList', data.data);
        }
    },
    async postCollectiveGardenDocument({ commit }: any, payload: any) {
        const { data }: any =
            await CollectiveGardenService.postCollectiveGardenDocument(
                payload.data
            );
        if (data.success) {
            //commit('setCollectiveGardenData',data.data);
            payload.callback();
        }
    },
    async UpdateCollectiveGardenData(
        { commit }: any,
        payload: { [key: string]: any }
    ) {
        const { data }: any =
            await CollectiveGardenService.updateCollectiveGardeData(
                payload.id,
                payload.data
            );
        if (data.success) {
            commit('setCollectiveGardenData', data.data);
            payload.callback();
        }
    },
    checkCadastreOwner({ commit }: any, payload: { [key: string]: any }) {
        return new Promise(async (resolve, reject) => {
            const { data } = await CollectiveGardenService.checkCadastreOwner(
                payload
            );
            // if (data.success) {
                resolve(data.data);
            // } else {
            //     reject("La requete n'a pas aboutit");
            // }
        });
    },
    async postSollicitation(_: any, payload: any) {
        const { data }: any = await CollectiveGardenService.postSollicitation(
            payload.data
        );
        if (data.success) payload.callback();
    },

    async fetchParcelsAttribution({ commit }: any, payload: any) {
        let response = await CollectiveGardenService.fetchParcelsAttributionDoc(
            payload
        );
        commit('setParcelsAttributionDocs', response.data);
    },
    async postParcelsAttributionApplication({ state }: any) {
        let data = state.parcelsAttributionApp;
        data = createFormData(data);
        let response = await CollectiveGardenService.postParcelsAttributionApp(
            data
        );
        return response;
    },
    async fetchGardenList({ commit }: any, payload?: any) {
        let response: any;
        payload
            ? (response = await CollectiveGardenService.fetchMyGardenList(
                  payload
              ))
            : (response =
                  await CollectiveGardenService.fetchCollectiveGardenList());
        let data = response.data.filter(
            (element: any) => element.document !== null
        );
        let collectiveGardens = data.filter(
            (element: any) => element.document.collectivePlot.length >= 1
        );
        let individualGardens = data.filter(
            (element: any) => element.document.individualPlot.length >= 1
        );
        commit('setCollectiveGardenList', collectiveGardens);
        commit('setIndividualGardenList', individualGardens);
    },
    setCurrentGarden({ commit }: any, payload: any) {
        let data = sortActorsByFunction(payload);
        commit('setCurrentGarden', data);
    },
    async postMessage({ state }: any, type: string) {
        let idx = state.messages.findIndex(
            (message: any) => message.type === type
        );
        let messageBody = state.messages[idx].messageBody;
        let response = await CollectiveGardenService.contactGardenOwner(
            messageBody
        );
        return response;
    },
    async contactMunicipality(_: any, payload: any) {
        const { data }: any = await CollectiveGardenService.contactMunicipality(
            payload.data
        );
        if (data.success) {
            payload.callback();
        }
    },
    async fetchEnvironmentStatus({ commit }: any, payload: any) {
        let response = await CollectiveGardenService.fetchEnvironmentStatus(
            payload
        );
        commit('setParcelEnvironmentStatus', response.data);
        return response;
    },
    setResourceData({ commit, state }: any, payload: any) {
        let idx = state.resourceElements.findIndex(
            (resource: any) => resource.type === payload.type
        );
        if (idx >= 0) payload = { ...state.resourceElements[idx], ...payload };
        commit('updateResources', { data: payload, idx: idx });
    },
    checkResource({ commit, state }: any, payload: any) {
        let idx = state.resourceElements.findIndex(
            (resource: any) => resource.type === payload.type
        );
        if (idx >= 0) commit('updateWarningStatus', { value: true, idx: idx });
    },
    async postProjectResources({ state, commit }: any, payload: any) {
        const type = state.selectedGarden.type === 'collective-gardens' 
            ? 'Parcelles collectives' 
            : 'Parcelles individuelles';
        const projectID = state.selectedGarden.id;
        const idx = state.resourceElements.findIndex((resource: any) => resource.type === payload.type);
        const { 
            managementType, 
            type: resourceType, 
            category, 
            name: resourceName, 
            quantity: resourceQuantity, 
            documents: gardenProjectResourcesDocuments 
        } = state.resourceElements[idx];
        const resourceCategory = Array.isArray(category) ? category : [category];
        const data = createFormData({
            resourceManagementType: managementType || type,
            resourceType,
            resourceCategory,
            resourceName,
            resourceQuantity,
            gardenProjectResourcesDocuments,
            colectiveGarden: projectID,
        });
      
        const response = await CollectiveGardenService.postProjectResources(data);
        if (response.status === 201) commit('removeCurrentResource', idx);
    },
    setActiveDisplay({ commit }: any, payload: any) {
        commit('updateActiveDisplay', payload);
    },
    async postActionData(_ : any, payload: any){
        const formData = createFormData(payload.data);
        const { data }: any = await CollectiveGardenService.postActionData(
            formData
        );
        if (data) {
            payload.callback();
        }
    },
    async fetchEnvironnmentalStatusbyCoordinates(_: any, payload: any) {
        const { data }: any =
            await CollectiveGardenService.fetchEnveronnmentalStatusbyCoordinates(
                payload
            );
        if (data.success) {
            return data?.data;
        }
    },
    async createConversation({ state }: any) {
        const users: any[] = [];
        (state as stateI).collectiveGarden.actors?.forEach((actor) => {
            actor.password = '123456';
            users.push({ user: actor });
        });

        const payload = {
            name: (state as stateI).collectiveGarden.name,
            colectiveGarden: (state as stateI).collectiveGarden.id,
            participants: users,
            initPasswordUrl: `${window.location.origin}/connexion/`,
        };

        const { data }: any = await CollectiveGardenService.createConversation(
            payload
        );
    },
    async createSurvey({ state, commit }: any) {
        let payload = state.reunionData.meeting;
        let response = await SurveyService.createSurvey(payload);
        response = response.data;
        if (response.success) {
            let pollId = response.data.id;
            let payload = { pollId: pollId, redirectLink: `/survey/${pollId}` };
            commit('updateReunionData', { invitation: payload });
        }
        return response.success;
    },
    async postReunionInvitation({ state }: any) {
        let payload = state.reunionData.invitation;
        let response = await SurveyService.inviteParticipant(payload);
        response = response.data;
        return response.success;
    },
    async createCollectiveGatdenLot({state, dispatch} : any, callback : any){
        const data = await CollectiveGardenService.creatteCollectiveGardenLot({
                colectiveGarden : (state as stateI).selectedGarden?.id ? (state as stateI).selectedGarden?.id :  -1,
            });
        if (data.success) {
            callback();
            await dispatch('postMessage', 'application');
        }
    },
    async getSelectedGardenInvoice({state, commit} : any){
        const data = await CollectiveGardenService.fetchCollectiveGardenAccounting({
            'invoice.colectiveGarden' : (state as stateI).selectedGarden?.id ? (state as stateI).selectedGarden?.id :  -1,
        })
        if (data.success) {
            commit('setInvoice', data.data)
        }
    }
};

function sortActorsByFunction(value: any) {
    // TODO: update it 'cause for now it just short it in alphabetic order
    let actors = value.actors;
    actors.forEach((actor: any) =>
        !actor.function.length ? (actor.function = 'Participant') : ''
    );
    actors.sort((a: any, b: any) => {
        const fnA = a.function.toUpperCase();
        const fnB = b.function.toUpperCase();
        if (fnA < fnB) return -1;
        else if (fnA > fnB) return 1;
        else return 0;
    });
    value.actors = actors;
    return value;
}
