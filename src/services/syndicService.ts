import { Http } from './http';

export default class Syndic {
    static async fetchMyLots() {
        return await Http.get('/lot/get');
    }

    static async postNewLot(params: any) {
        return await Http.post('/lot/add', params);
    }

    static async deleteLot(params: any) {
        return await Http.delete(`/lot/${params.id}`);
    }

    static async updateLot(params: any) {
        return await Http.put(`/lot/${params.id}`, params.data);
    }

    static async postDocument(params: any) {
        return await Http.post('/co_ownership/documents', params);
    }

    static async fetchSharedDocuments() {
        return await Http.get('/co_ownership/documents');
    }

    static async createConversation(params: any) {
        return await Http.post('/conversations', params);
    }

    static async createSession(params: any) {
        return await Http.post('/co_ownership/general_meetings', params)
    }

    static async fetchSessionList(params: any) {
        return await Http.get(`/co_ownership/general_meetings?coOwnership=${params.coOwnership}`);
    }

    static async postNewAgenda(params: any) {
        return await Http.post('/co_ownership/general_meetings/agendas', params);
    }

    static async fetchAgendas(params: any) {
        return await Http.get(`/co_ownership/general_meetings/agendas?ownershipGeneralMeeting=${params.sessionId}`);
    }

    static async postDecision(params: any) {
        return await Http.post('/co_ownership/general_meetings/decisions', params);
    }

    static async fetchDecisions(params: any) {
        return await Http.get(`co_ownership/general_meetings/decisions?generalMeeting=${params.sessionId}`)
    }

    static async postMeetingTranscript(params: any) {
        return await Http.post('/co_ownership/general_meetings/transcripts', params);
    }

    static async fetchMeetingTranscript(params: any) {
        return await Http.get(`/co_ownership/general_meetings/transcripts?generalMeeting=${params.sessionId}`);
    }

    static async postInvoice(params: any) {
        return await Http.post('/co_ownership/invoices', params);
    }

    static async fetchTypedInvoices(params: any) {
        return await Http.get(`/co_ownership/invoices?coOwnership=${params.coOwnership}&type=${params.type}`);
    }

    static async fetchAllInvoices(params: any) {
        return await Http.get(`/co_ownership/invoices?coOwnership=${params.coOwnership}`);
    }

    static async fetchCurrentSessionInvoices(params: any) {
        return await Http.get(`/co_ownership/invoices?coOwnership=${params.coOwnership}&year=${params.session}&type=${params.type}`)
    }

    static async fetchInvoiceDetailsRelatedToLot(params: any) {
        return await Http.get(`/co_ownership/lot_accounts?lot=${params.lotId}&invoice.coOwnership=${params.coOwnership}&year=${params.session}&invoice=${params.invoiceId}`)
    }

    static async fetchTypedAccountTotal(params: any) {
        return await Http.get(`/co_ownership/total_accounts?coOwnership=${params.coOwnership}&year=${params.session}&type=${params.type}`)
    }

    static async fetchNonTypedAccountTotal(params: any) {
        return await Http.get(`/co_ownership/total_accounts?coOwnership=${params.coOwnership}&year=${params.session}`)
    }

    static async fetchTypedLotAccountTotal(params: any) {
        return await Http.get(`/co_ownership/lot_total_accounts?lot=${params.lotId}&invoice.coOwnership=${params.coOwnership}&year=${params.session}&type=${params.type}`)
    }

    static async fetchNonTypedLotAccountTotal(params: any) {
        return await Http.get(`/co_ownership/lot_total_accounts?lot=${params.lotId}&invoice.coOwnership=${params.coOwnership}&year=${params.session}`)
    }

    static async postCoOwnershipAccountBalance(params: any) {
        return await Http.post('/co_ownership/balances', params);
    }

    static async fetchCoOwnershipAccountBalance(params: any) {
        return await Http.get(`/co_ownership/balances?coOwnership=${params.coOwnership}&year=${params.session}&type=${params.type}`);
    }

    static async fetchLotAccountBalance(params: any) {
        return await Http.get(`/co_ownership/lot_balances?balance.coOwnership=${params.coOwnership}&year=${params.session}&type=${params.type}&lot=${params.lotId}&balance=${params.balanceId}`);
    }

    static async postCouncilReport(params: any) {
        return await Http.post('/co_ownership/council_reports', params);
    }

    static async fetchCouncilReports(params: any) {
        return await Http.get(`/co_ownership/council_reports?coOwnership=${params.coOwnership}`);
    }

    static async postAccountAuditorReport(params: any) {
        return await Http.post('/co_ownership/auditor_reports', params);
    }

    static async fetchAccountAuditorReport(params: any) {
        return await Http.get(`/co_ownership/auditor_reports?coOwnership=${params.coOwnership}`);
    }

    static async notifySyndicMembers(params: any) {
        return await Http.post('/notifications', params);
    }

    static async postPropositions(params: any) {
        return await Http.post('/co_ownership/propositions', params);
    }

    static async fetchPropositions(params: any) {
        return await Http.get(`/co_ownership/propositions?coOwnership=${params.coOwnership}`);
    }

    static async postPropositionVotes(params: any) {
        return await Http.post('/co_ownership/proposition_votes', params);
    }

    static async fetchPropositionVotes(params: any) {
        return await Http.get(`/co_ownership/proposition_votes?proposition=${params.propositionId}`);
    }

    static async fetchSyndicList() {
        return await Http.get('/user/role/syndic');
    }

    static async submitCoOwnershipApplication(params: any) {
        return await Http.post('/co_ownership/request', params);
    }

    static async submitSyndicConfirmation(params: any) {
        return await Http.post('/co_ownership/the_property/syndic_responses', params);
    }

    static async updateThePropertyCoOwnership(params: any) {
        return await Http.put(`/co_ownership/the_property/${params.coOwnershipId}`, params.data);
    }

    static async fetchSyndicResponse(params: any) {
        return await Http.get(`/co_ownership/property/syndic_responses?coOwnershipTheProperty=${params.coOwnershipTheProperty}&theProperty=${params.thePropertyId}`)
    }

    // static async getSynficResponse(params: any) {
    //     return await Http.get(`/co_ownership/property/syndic_responses?coOwnershipTheProperty=${params.coOwnershipTheProperty}&theProperty=${params.thePropertyId}`)
    // }
}