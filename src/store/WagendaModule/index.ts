import WAgenda from '@/services/wagendaService';
import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;

export const state = () => ({
    eventList: [],
});

export const mutations = {
    SET_EVENT_LIST(state: any, payload: any) {
        state.eventList = payload;
    },
};

export const actions = {
    async fetchAgendaEvents({ commit }: any, payload: any) {
        const { data } = await WAgenda.fetchAgendaEvent(payload);
        commit("SET_EVENT_LIST", formatEventData(data))
    },

    async postNewAgendaEvent({ _ }: any, payload: any) {
        const { data } = await WAgenda.postNewAgendaEvent(payload);
        return data.success;
    },
};

export const getters = {
    getLoadedEvents(state: any) {
        return state.eventList;
    },
};

function convertUTCDate(utcDateString: string) {
    const dateObj = new Date(utcDateString);
    return dateObj.toISOString().slice(0, 16);
}

function formatEventData(arrayVal: any) {
    return arrayVal.map((element: EventInput) => ({
        id: createEventId(),
        title: element.title,
        allDay: element.allDay,
        start: convertUTCDate(String(element.start)),
        end:
            element.end !== undefined
                ? convertUTCDate(String(element.end))
                : convertUTCDate(addOneDay(String(element.start))),
        place: element.place
    }));
}

function addOneDay(dateString: string) {
    const dateObj = new Date(dateString);
    dateObj.setHours(dateObj.getHours() + 24);
    return dateObj.toISOString().slice(0, 16);
}

function createEventId() {
    return String(eventGuid++);
}
