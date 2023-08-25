import { Http } from './http';

export default class WAgenda {
    static async fetchAgendaEvent(params: any) {
        return await Http.get(`/load-events?start=${params.startingDate}&end=${params.endingDate}`);
    }

    static async postNewAgendaEvent(params: any) {
        return await Http.post(`/load-events?start=${params.startingDate}&end=${params.endingDate}`, params.data);
    }
}