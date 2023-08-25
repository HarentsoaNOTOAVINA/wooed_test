import moment from "moment";

export function formatDateFr(date : Date | string){
    return moment(date).format("D MMMM YYYY");
}

export function formatHourFr(date : Date | string){
    return moment(date).format('LTS')
}