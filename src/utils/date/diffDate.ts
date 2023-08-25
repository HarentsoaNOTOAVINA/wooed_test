import moment from "moment";

export function diffDate(date: string) {
    let result = moment().diff(date, 'days');
    if (result > 0) {
        return result + ' jours';
    } else {
        result = moment().diff(date, 'h');
        if (result > 0) {
            return result + ' heures';
        } else {
            result = moment().diff(date, 'minute');
            if (result > 0) {
                return result + ' mins';
            } else {
                result = moment().diff(date, 's');
                if (result < 0) {
                    return 'expired'
                } else {
                    return result + ' sec';
                }
            }
        }
    }
};