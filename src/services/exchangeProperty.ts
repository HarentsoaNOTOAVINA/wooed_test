import { Http } from "./http";

export default class SearchExchangableProperty {
    static async contact(params: {
        isDefinitive?: boolean;
        myPropertyId?: number;
        thePropertyId?: number;
        urlDetailProperty?: string;
        dateStart?: string;
        dateEnd?: string;
    }) {
        return await Http.post('/the_property/contact_owner_for_exchange', params as any)
    }
    static async postAds(params: {
        isDefinitive?: boolean;
        thePropertyId?: number;
        theProperties?: number;
        urlDetailProperty?: string;
        dateStart?: string;
        dateEnd?: string;
    }) {
        return await Http.post('/the_property/post_announcement_for_exchange', params as any)
    }
}
