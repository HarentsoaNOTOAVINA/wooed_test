export default interface DataProps {
    images?: Array<{ path: string }>;
    address?: string;
    advanced?: string;
    annualenergy?: number;
    bathroomcount?: number;
    bedroomcount?: number;
    certnumber?: number;
    chambercaracteristics?: [];
    details?: string;
    id: number;
    isSollicited ?: null | boolean;
    latitude?: number;
    longitude?: number;
    operationType?: string;
    prices?: number;
    priceSolicited  ?:  null | number;
    solicitationTimeRemaining ?: {
        days ?: number;
        hours ?: number;
    }; 
    primaryenergy?: number;
    propertyType: {
        id?: number;
        name: string;
        status?: boolean;
        isSell?: boolean;
        isLocation?: boolean;
    };
    reference?: string;
    register?: string;
    roomcount: number;
    status?: any;
    surface?: number;
    title?: string;
    user?: {
        id?: number;
        email?: string;
        name: string;
        firstname: string;
        logo?: any;
    };
    favoritesTotal?: number;
    viewTotal?: number;
    isMyFavorite?: any;
    prospectiverent?: any;
    coownershipcharge?: any;
    firstannualwaterexpense?: any;
    firstannualgasexpense?: any;
    annualspendingonelectricity?: any;
    averageannualconsumption?: any;
    secondannualwaterexpense?: any;
    secondannualgasexpense?: any;
    cadastralreturn?: any;
    propertytax?: any;
    documentStatus?: any;
    startPrice ?: any;
}
