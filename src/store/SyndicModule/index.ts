import { createFormData } from '@/utils/formdata/formData';
import Syndic from '@/services/syndicService';

interface IUser {
    id: number;
    name: string;
    email: string;
    firstname?: string;
    address?: string;
    telephone: string;
}

interface ILot {
    id: number;
    numberLot: string;
    location: string;
    quota: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhoneNumber: string;
    tenantEmail: string;
    tenantName: string;
    tenantPhoneNumber: string;
    syndic: string;
    tenant: IUser;
    owner: IUser;
}

export const state = () => ({
    coOwnership: undefined,
    lotList: [],
    lotOwnerList: [],
    lotTenantList: [],
    memberList: [],
    documentList: [],
    conversationParticipants: undefined,
    conversationText: '',
    newInvoice: {},
    newSession: {},
    sessionList: [],
    currentSession: {},
    agendaList: [],
    decisionList: [],
    meetingTranscipts: [],
    sharedDocuments: [],
    accountingSessions: [],
    invoiceList: [],
    coOwnershipAccountTotalDetails: {},
    currentLotAccountTotalDetails: {},
    coOwnershipAccountBalanceDetails: {},
    currentLotAccountBalanceDetails: {},
    propositionList: [],
    syndicDetails: undefined
});

export const mutations = {
    SET_COOWNERSHIP_ID(state: any, payload: any) {
        state.coOwnership = payload;
    },
    SET_SYNDIC_PROFILE(state: any, payload: any) {
        state.syndicDetails = payload;
    },
    UPDATE_LOT_LIST(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.lotList, payload)) {
            state.lotList.push(payload);
        }
    },
    UPDATE_OWNER_LIST(state: any, payload: any) {
        if (!checkEmailIfObjectExists(state.lotOwnerList, payload.email)) {
            state.lotOwnerList.push(payload);
        }
    },
    UPDATE_TENANT_LIST(state: any, payload: any) {
        if (!checkEmailIfObjectExists(state.lotTenantList, payload.email)) {
            state.lotTenantList.push(payload);
        }
    },
    UPDATE_MEMBER_LIST(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.memberList, payload)) {
            state.memberList.push(payload);
        }
    },
    UPDATE_CURRENT_LOT(state: any, payload: any) {
        state.lotList = updateObjectInArray(state.lotList, payload);
    },
    UPDATE_CURRENT_OWNER(state: any, payload: any) {
        state.lotOwnerList = updateObjectInArray(state.lotOwnerList, payload);
    },
    UPDATE_CURRENT_TENANT(state: any, payload: any) {
        state.lotTenantList = updateObjectInArray(state.lotTenantList, payload);
    },
    REMOVE_CURRENT_LOT(state: any, payload: any) {
        state.lotList = state.lotList.filter((lot: any) => lot.id !== payload);
    },
    REMOVE_CURRENT_OWNER(state: any, payload: any) {
        state.lotOwnerList = state.lotOwnerList.filter(
            (owner: any) => owner.lotId !== payload
        );
    },
    REMOVE_CURRENT_TENANT(state: any, payload: any) {
        state.lotTenantList = state.lotTenantList.filter(
            (tenant: any) => tenant.lotId !== payload
        );
    },
    ADD_DOCUMENT_TO_SHARE(state: any, payload: any) {
        payload.coOwnership = state.coOwnership;
        state.documentList.push(payload);
    },
    REMOVE_FROM_DOC_LIST(state: any, index: any) {
        state.documentList.splice(index, 1);
    },
    SET_PARTICIPANTS(state: any, payload: any) {
        state.conversationParticipants = payload;
    },
    SET_MESSAGE(state: any, payload: any) {
        state.conversationText = payload;
    },
    SET_NEW_SESSION(state: any, payload: any) {
        state.newSession = {
            coOwnership: state.coOwnership,
            year: payload.year,
        };
    },
    SET_CURRENT_SESSION(state: any, payload: any) {
        state.currentSession = { ...state.currentSession, ...payload };
    },
    UPDATE_SESSION_LIST(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.sessionList, payload)) {
            state.sessionList.push(payload);
        }
    },
    UPDATE_AGENDA_LIST(state: any, payload: any) {
        state.agendaList.push(payload);
    },
    UPDATE_DECISION_LIST(state: any, payload: any) {
        state.decisionList.push(payload);
    },
    SET_TRANSCRIPT_LIST(state: any, payload: any) {
        state.meetingTranscipts = payload;
    },
    UPDATE_TRANSCRIPT_LIST(state: any, payload: any) {
        state.meetingTranscipts.push(payload);
    },
    UPDATE_SHARED_DOC_LIST(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.sharedDocuments, payload)) {
            state.sharedDocuments.push(payload);
        }
    },
    SET_ACCOUNTING_SESSION_LIST(state: any, payload: any) {
        state.accountingSessions = payload;
    },
    SET_NEW_INVOICE_DETAILS(state: any, payload: any) {
        state.newInvoice = { ...state.newInvoice, ...payload };
    },
    UPDATE_INVOICE_LIST(state: any, payload: any) {
        state.invoiceList.push(payload);
    },
    SET_COOWNERSHIP_ACCOUNT_BALANCE_DETAILS(state: any, payload: any) {
        state.coOwnershipAccountBalanceDetails = payload;
    },
    SET_CURRENT_LOT_ACCOUNT_BALANCE_DETAILS(state: any, payload: any) {
        state.currentLotAccountBalanceDetails = payload;
    },
    UPDATE_PROPOSITIONS(state: any, payload: any) {
        if (!checkIdIfObjectExists(state.propositionList, payload)) {
            state.propositionList.push(payload);
        }
    },
    RESET_STATE_OF(state: any, payload: any) {
        let [key] = Object.keys(payload);
        state[key] = payload[key];
    }
};

export const actions = {
    checkUserRole({ state, rootState, commit }: any) {
        const keys = Object.keys(state.currentSession);
        if (!keys.includes('isSyndic')) {
            const userRoles = rootState.UserModule.user.reversedRoles;
            userRoles.includes('syndic')
                ? commit('SET_CURRENT_SESSION', { isSyndic: true })
                : commit('SET_CURRENT_SESSION', { isSyndic: false });
        }
    },

    setSyndicProfile({ rootState, commit }: any) {
        const currentUser = rootState.UserModule.user;
        const syndicProfile = {
            address: currentUser.address,
            email: currentUser.email,
            firstname: currentUser.firstname,
            id: currentUser.id,
            name: currentUser.name,
            telephone: currentUser.telephone
        };
        commit('SET_SYNDIC_PROFILE', syndicProfile);
    },

    async fetchMyLotList({ commit }: any) {
        let { data } = await Syndic.fetchMyLots();
        if (data.length !== 0) {
            data.forEach((element: any) => commit('UPDATE_LOT_LIST', element));
            let [lot] = data;
            commit('SET_COOWNERSHIP_ID', lot.coOwnership.id);
            let { ownerList, tenantList, memberList } = handleContactList(data);
            ownerList.forEach((element: any) =>
                commit('UPDATE_OWNER_LIST', element)
            );
            tenantList.forEach((element: any) =>
                commit('UPDATE_TENANT_LIST', element)
            );
            memberList.forEach((element: any) => 
                commit('UPDATE_MEMBER_LIST', element)
            );
        }
    },

    async postNewLot({ commit }: any, payload: any) {
        let { data } = await Syndic.postNewLot(payload);
        if (data.success) {
            const { ownerList, tenantList, memberList } = handleContactList([data.data]);
            commit('UPDATE_LOT_LIST', data.data);
            commit('UPDATE_OWNER_LIST', ownerList);
            commit('UPDATE_TENANT_LIST', tenantList);
            commit('UPDATE_MEMBER_LIST', memberList)
        }
        return data.success;
    },

    async deleteCurrentLot({ commit }: any, payload: any) {
        let { status } = await Syndic.deleteLot(payload);
        let success = status === 204;
        if (success) {
            commit('REMOVE_CURRENT_LOT', payload.id);
            commit('REMOVE_CURRENT_OWNER', payload.id);
            commit('REMOVE_CURRENT_TENANT', payload.id);
            // commit('REMOVE_CURRENT_MEMBER', payload.id)
        }
        return success;
    },

    async updateCurrentLot({ commit }: any, payload: any) {
        let { data } = await Syndic.updateLot(payload);
        if (data.success) {
            const contact = handleContactList([data.data]);
            const [currentOwner] = contact.ownerList;
            const [currentTenant] = contact.tenantList;
            commit('UPDATE_CURRENT_LOT', data.data);
            commit('UPDATE_CURRENT_OWNER', currentOwner);
            commit('UPDATE_CURRENT_TENANT', currentTenant);
        }
        return data.success;
    },

    async postDocumentsToShare({ commit, state }: any) {
        for (let i = 0; i < state.documentList.length; i++) {
            let formData = createFormData(state.documentList[i]);
            const { data, status } = await Syndic.postDocument(formData);

            if (status !== 201 && status !== 200) {
                console.error(
                    'Failed to post the document with type ',
                    state.documentList[i].type
                );
                break;
            }

            commit('UPDATE_SHARED_DOC_LIST', data);
            commit('REMOVE_FROM_DOC_LIST', i);
            i--;
        }
        return state.documentList.length === 0;
    },

    async fetchSharedDocuments({ commit, state }: any) {
        let data = await Syndic.fetchSharedDocuments();
        data.forEach((element: any) =>
            commit('UPDATE_SHARED_DOC_LIST', element)
        );
    },

    async createSession({ commit, state }: any) {
        const { data } = await Syndic.createSession(state.newSession);
        if (data.success) commit('UPDATE_SESSION_LIST', data.data);
        return data.success;
    },

    async fetchSessionList({ commit, state }: any) {
        const { data } = await Syndic.fetchSessionList({
            coOwnership: state.coOwnership,
        });
        if (data.length >= 1) data.forEach((element: any) => commit('UPDATE_SESSION_LIST', element));
    },

    async postNewAgenda({ commit }: any, payload: any) {
        const { data } = await Syndic.postNewAgenda(payload);
        if (data.success) commit('UPDATE_AGENDA_LIST', data.data);
        return data.success;
    },

    async fetchCurrentAgendas({ commit, state }: any) {
        const { data } = await Syndic.fetchAgendas({
            sessionId: state.currentSession.id,
        });
        data.forEach((element: any) => commit('UPDATE_AGENDA_LIST', element));
    },

    async postDecision({ commit, state }: any, payload: any) {
        const { data } = await Syndic.postDecision(payload);
        if (data.success) commit('UPDATE_DECISION_LIST', data.data);
        return data.success;
    },

    async fetchCurrentDecisions({ commit, state }: any) {
        const { data } = await Syndic.fetchDecisions({
            sessionId: state.currentSession.id,
        });
        data.forEach((element: any) => commit('UPDATE_DECISION_LIST', element));
    },

    async postMeetingTranscript({ commit }: any, payload: any) {
        const formData = createFormData(payload);
        const { data } = await Syndic.postMeetingTranscript(formData);
        if (data.success) {
            const fileList = data.coOwnershipMeetingTranscriptFiles;
            fileList.forEach((file: any) =>
                commit('UPDATE_TRANSCRIPT_LIST', file)
            );
        }
        return data.success;
    },

    async fetchMeetingTranscript({ commit, state }: any) {
        const { data } = await Syndic.fetchMeetingTranscript({
            sessionId: state.currentSession.id,
        });
        data.forEach((element: any) => {
            const fileList = element.coOwnershipMeetingTranscriptFiles;
            fileList.forEach((file: any) =>
                commit('UPDATE_TRANSCRIPT_LIST', file)
            );
        });
    },

    async initiateConversation({ state }: any) {
        const payload = {
            name: `copropriete_${state.coOwnership}`,
            coOwnership: state.coOwnership,
            participants: state.conversationParticipants,
            initPasswordUrl: `${window.location.origin}/connexion/`,
        };

        const { data } = await Syndic.createConversation(payload);
        return data.success;
    },

    async postInvoice({ commit }: any, params: any) {
        let payload = createFormData(params);
        let { data } = await Syndic.postInvoice(payload);
        commit('UPDATE_INVOICE_LIST', data.data);
        if (data.success) commit('RESET_STATE_OF', { newInvoice: {} });
        return data.success;
    },

    async fetchTypedInvoices({ commit, state }: any) {
        const payload = {
            coOwnership: state.coOwnership,
            type: state.currentSession.type,
        };
        let yearList = [];
        let { data } = await Syndic.fetchTypedInvoices(payload);
        if (data.length > 0) yearList = setYearList(data);
        commit('SET_ACCOUNTING_SESSION_LIST', yearList);
        commit('RESET_STATE_OF', { invoiceList: [] });
        data.forEach((element: any) => commit('UPDATE_INVOICE_LIST', element));
    },

    async fetchAllInvoices({ commit, state }: any) {
        const payload = { coOwnership: state.coOwnership };
        let yearList = [];
        let { data } = await Syndic.fetchAllInvoices(payload);
        if (data.length > 0) yearList = setYearList(data);
        commit('SET_ACCOUNTING_SESSION_LIST', yearList);
        commit('RESET_STATE_OF', { invoiceList: [] });
        data.forEach((element: any) => commit('UPDATE_INVOICE_LIST', element));
    },

    async fetchCurrentSessionInvoices({ commit, state }: any) {
        const payload = {
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            type: state.currentSession.type,
        };
        let { data } = await Syndic.fetchCurrentSessionInvoices(payload);
        commit('RESET_STATE_OF', { invoiceList: [] });
        data.forEach((element: any) => commit('UPDATE_INVOICE_LIST', element));
    },

    async fetchInvoiceDetailsRelatedToLot({ state }: any, selected: any) {
        let payload = {
            lotId: selected.lotId,
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            invoiceId: selected.invoiceId,
        };
        let { data } = await Syndic.fetchInvoiceDetailsRelatedToLot(payload);
        return data;
    },

    async fetchTypedAccountTotal({ commit, state }: any) {
        const payload = {
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            type: state.currentSession.type,
        };
        let { data } = await Syndic.fetchTypedAccountTotal(payload);
        return data;
    },

    async fetchNonTypedAccountTotal({ state }: any) {
        const payload = {
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
        };
        let { data } = await Syndic.fetchNonTypedAccountTotal(payload);
        return data;
    },

    async fetchTypedLotAccountTotal({ commit, state }: any, payload: any) {
        let { data } = await Syndic.fetchTypedLotAccountTotal({
            lotId: payload.lotId,
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            type: state.currentSession.type,
        });
        return data;
    },

    async fetchNonTypedLotAccountTotal({ commit, state }: any, payload: any) {
        let { data } = await Syndic.fetchNonTypedLotAccountTotal({
            lotId: payload.lotId,
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
        });
        return data;
    },

    async postCurrentCoOwnershipAccountBalance(
        { commit, state }: any,
        formValue: any
    ) {
        const payload = {
            coOwnership: state.coOwnership,
            year: state.currentSession.year,
            type: state.currentSession.type,
            amount: parseFloat(formValue.amount),
            sendingDate: formValue.sendingDate,
            paymentDate: formValue.paymentDate,
        };
        let { data } = await Syndic.postCoOwnershipAccountBalance(payload);
        // commit('SET_COOWNERSHIP_ACCOUNT_BALANCE_DETAILS', data.data);
        return data.success;
    },

    async fetchCoOwnershipAccountBalance({ commit, state }: any) {
        let { data } = await Syndic.fetchCoOwnershipAccountBalance({
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            type: state.currentSession.type,
        });
        // commit('SET_COOWNERSHIP_ACCOUNT_BALANCE_DETAILS', data);
        return data;
    },

    async fetchCurrentLotAccountBalance({ commit, state }: any, payload: any) {
        let { data } = await Syndic.fetchLotAccountBalance({
            coOwnership: state.coOwnership,
            session: state.currentSession.year,
            type: state.currentSession.type,
            lotId: payload.lotId,
            balanceId: payload.balanceId,
        });
        return data;
        // commit('SET_CURRENT_LOT_ACCOUNT_BALANCE_DETAILS', data);
    },

    async postCouncilReport({ _ }: any, formValue: any) {
        const payload = createFormData(formValue);
        let { data } = await Syndic.postCouncilReport(payload);
        return data.success;
    },

    async fetchCouncilReports({ state }: any) {
        const payload = { coOwnership: state.coOwnership };
        let { data } = await Syndic.fetchCouncilReports(payload);
        return data;
    },

    async postAccountAuditorReport({ _ }: any, formValue: any) {
        const payload = createFormData(formValue);
        let { data } = await Syndic.postAccountAuditorReport(payload);
        return data.success;
    },

    async fetchAccountAuditorReport({ state }: any) {
        const payload = { coOwnership: state.coOwnership };
        let { data } = await Syndic.fetchAccountAuditorReport(payload);
        return data;
    },

    async communicateWithMembers({ state }: any, formValue: any) {
        let count = 0;
        for (let i = 0; i < state.memberList.length; i++) {
            if (state.memberList[i].id) {
                let payload = {
                    message: formValue.message,
                    user: state.memberList[i].id,
                    title: formValue.object
                }
                const { data, status } = await Syndic.notifySyndicMembers(payload);
    
                if (status !== 201 && status !== 200) {
                    console.error(data);
                    break;
                }
            }

            count++;
        }
        return state.memberList.length === count;
    },

    async submitProposition({ state }: any, formValue: any) {
        const payload = {
            coOwnership: state.coOwnership,
            description: formValue.description,
            author: formValue.author,
        }
        const { data } = await Syndic.postPropositions(payload);
        return data.success;
    },

    async fetchPropositions({ commit, state }: any) {
        const payload = { coOwnership: state.coOwnership };
        const { data } = await Syndic.fetchPropositions(payload);
        data.forEach((element: any) => commit('UPDATE_PROPOSITIONS', element));
    },

    async fetchPropositionVotes({ commit }: any, payload: any) {
        const { data } = await Syndic.fetchPropositionVotes(payload);
        return data;
    },

    // async fetchSyndicList({ _ }: any) {
    //     const { data } = await Syndic.fetchSyndicList();
    //     return data;
    // },

    // async submitCoOwnershipApplication({ _ }: any, payload: any) {
    //     const { data, status } = await Syndic.submitCoOwnershipApplication(payload);
    //     return data.success;
    // },

    // async submitSyndicConfirmation({ _ }: any, formValue: any) {
    //     const payload = createFormData(formValue);
    //     const { data, status } = await Syndic.submitSyndicConfirmation(payload);
    //     return data.success;
    // },

    // async updateThePropertyCoOwnership({ _ }: any, formValue: any) {
    //     const formData = createFormData(formValue.data);
    //     const payload = { 
    //         coOwnershipId: formValue.coOwnershipId,
    //         data: formData
    //     }
    //     const { data } = await Syndic.updateThePropertyCoOwnership(payload);
    //     console.error(data, "Mise à jour fais");
    //     return data;
    // },

    // async getSyndicResponse({ _ }: any, payload: any) {
    //     const { data } = await Syndic.fetchSyndicResponse(payload);
    //     return data;
    // }
};

export const getters = {
    getMyLotList(state: any) {
        return state.lotList;
    },
    getCoOwnershipId(state: any) {
        return state.coOwnership;
    },
    getSyndicProfile(state: any) {
        return state.syndicDetails;
    },
    getOwnerList(state: any) {
        return state.lotOwnerList;
    },
    getTenantList(state: any) {
        return state.lotTenantList;
    },
    getMemberList(state: any) {
        return state.memberList;
    },
    getSessionList(state: any) {
        return state.sessionList;
    },
    getCurrentSession(state: any) {
        return state.currentSession;
    },
    getAgendaList(state: any) {
        return state.agendaList;
    },
    getDecisionList(state: any) {
        return state.decisionList;
    },
    getTranscripts(state: any) {
        return state.meetingTranscipts;
    },
    getSharedDocuments(state: any) {
        return state.sharedDocuments;
    },
    getYearList(state: any) {
        return state.accountingSessions;
    },
    getInvoiceList(state: any) {
        return state.invoiceList;
    },
    getInvoiceDetails(state: any) {
        state.newInvoice.coOwnership = state.coOwnership;
        return state.newInvoice;
    },
    getCoOwnershipAccountTotalDetails(state: any) {
        return state.coOwnershipAccountTotalDetails;
    },
    getCurrentLotAccountTotalDetails(state: any) {
        return state.currentLotAccountTotalDetails;
    },
    getCoOwnershipAccountBalanceDetails(state: any) {
        return state.coOwnershipAccountBalanceDetails;
    },
    getCurrentLotAccountBalanceDetails(state: any) {
        return state.currentLotAccountBalanceDetails;
    },
    getPropositionList(state: any) {
        return state.propositionList;
    }
};

function updateObjectInArray(array: any[], updatedObject: any) {
    const idx = array.findIndex(
        (element: any) => element.id === updatedObject.id
    );
    const newArray: any[] = [...array];
    if (idx >= 0) newArray[idx] = { ...newArray[idx], ...updatedObject };
    return newArray;
}

function checkIdIfObjectExists(array: any[], object: any) {
    return array.some((element: any) => element.id === object.id);
}

function checkEmailIfObjectExists(array: any[], email: any) {
    return array.find((element: any) => element.email === email);
}

function setYearList(array: any[]) {
    const years: object[] = [];
    const uniqueYears: number[] = [];
    array.forEach((element: any) => {
        let obj = { year: element.year };
        if (!uniqueYears.includes(element.year)) {
            uniqueYears.push(element.year);
            years.push(obj);
        }
    });
    return sortByYear(years);
}

function sortByYear(array: any[]) {
    array.sort(function(a, b) {
      return a.year - b.year;
    });
    return array;
}

function handleContactList(data: ILot[]) {
    let ownerList = data.map((lot: ILot) => ({
        name: lot.ownerName,
        telephone: lot.ownerPhoneNumber,
        email: lot.ownerEmail,
        lotId: lot.id,
        id:
            lot.hasOwnProperty('owner') && lot.owner !== null
                ? lot.owner.id
                : null,
    }));

    let tenantList = data.map((lot: ILot) => ({
        name: lot.tenantName,
        telephone: lot.tenantPhoneNumber,
        email: lot.tenantEmail,
        lotId: lot.id,
        id:
            lot.hasOwnProperty('tenant') && lot.tenant !== null
                ? lot.tenant.id
                : null,
    }));
    
    let memberList = ownerList.reduce((acc: any, cur: any) => {
        const existingObj = acc.find((object: any) => object.id === cur.id);
        existingObj
            ? Object.assign(existingObj, cur)
            : acc.push(cur);
        return acc
    }, tenantList);

    return { ownerList, tenantList, memberList };
}
