import AddProductService from '@/services/addProductService';
import { createFormData, isAnArrayorPush } from '@/utils/formdata/formData';
import ProductsListService from '@/services/productsListService';
import {
    setSessionPersistStore,
    getSessionPersistedStore,
} from '@/utils/persist_store';

interface DetailLoc {
    address: string;
    codeCountry?: string;
    coodeMunicipality?: string;
    codeRegion?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    municipality?: string;
    postalCode?: string;
    region?: string;
}
interface IStep {
    documentFields?: [];
    cadastre?: [];
    propertyStep: IStepType;
    propertyDatas?: {
        detailLocation?: DetailLoc;
        propertyType?: number;
        surface?: number;
        roomcount?: number;
        transactionType?: string;
    };
    propertyType: Array<any>;
    kitchenElt: Array<any>;
    dailyNeeded: Array<any>;
    features: Array<any>;
    options: Array<any>;
    destinations: Array<any>;
    allTheProperty: Array<any>;
    contactList: Array<{
        name: string;
        address: string;
    }>;
    urbanDocumentValue: Object;
    showDocumentForm: boolean;
    listOfSyndic: Array<any>;
    suggestedPrices: Array<any>;
    notaryList: Array<any>;
    energeticData?: { [key: string]: any };
    toitureList?: Array<any>;
    transactionTypes: Array<any>;
    allUserInfluencer: Array<any>;
    particularChoice: string;
}

interface IStepType {
    type: boolean;
    address: boolean;
    media: boolean;
    price: boolean;
    general: boolean;
    interior: boolean;
    energyCharacteristic: boolean;
    adDesc: boolean;
    documents: boolean;
    generalDescription: boolean;
    detailDescription: boolean;
    visite: boolean;
    livingArea: boolean;
    property: boolean;
}

const mutationType: Readonly<any> = {
    GET_PROPERTY_TYPE: 'GET_PROPERTY_TYPE',
    GET_KITCHEN_ELT: 'GET_KITCHEN_ELT',
    GET_DAILY_NEEDED: 'GET_DAILY_NEEDED',
    GET_FEATURES: 'GET_FEATURES',
    GET_OPTIONS: 'GET_OPTIONS',
    POST_THE_PROPERTY: 'POST_THE_PROPERTY',
    GET_ALL_PROPERTY: 'GET_ALL_PROPERTY',
    GET_DESTINATIONS: 'GET_DESTINATIONS',
    SET_URBAN_DOCUMENT: 'SET_URBAN_DOCUMENT',
    SHOW_DOCUMENT_FORM: 'SHOW_DOCUMENT_FORM',
    GET_LIST_OF_SYNDIC: 'GET_LIST_OF_SYNDIC',
    SET_AREA: 'SET_AREA',
    GET_TRANSACTION_TYPES: 'GET_TRANSACTION_TYPES',
    GET_USER_INFLUENCER: 'GET_USER_INFLUENCER',
};

enum Role {
    pro = 'ROLE_PRO',
    part = 'ROLE_PART',
}

export const state: IStep = {
    propertyStep: {
        address: false,
        type: false,
        media: false,
        price: false,
        general: false,
        interior: false,
        energyCharacteristic: false,
        adDesc: false,
        documents: false,
        generalDescription: true,
        detailDescription: true,
        visite: true,
        livingArea: false,
        property: false,
    },
    contactList: [],
    propertyDatas: {
        detailLocation: {
            address: '',
        },
        propertyType: -1,
        roomcount: -1,
        surface: 0,
    },
    propertyType: [],
    kitchenElt: [],
    destinations: [],
    dailyNeeded: [],
    features: [],
    options: [],
    allTheProperty: [],
    documentFields: [],
    urbanDocumentValue: {},
    showDocumentForm: false,
    cadastre: [],
    listOfSyndic: [],
    suggestedPrices: [],
    notaryList: [],
    energeticData: {},
    toitureList: [],
    transactionTypes: [],
    allUserInfluencer: [],
    particularChoice: '',
};

export const getters = {
    getEnergeticData(state: any) {
        return state.energeticData;
    },
    getNotaryList(state: IStep) {
        return state.notaryList;
    },
    getTransactionType(state: IStep) {
        return state.propertyDatas?.transactionType;
    },
    getSuggestedPrices(state: IStep) {
        return state.suggestedPrices;
    },

    getDocumentsFields(state: IStep) {
        return state.documentFields;
    },
    getCadastreData(state: IStep) {
        return state.cadastre;
    },
    getAddPropertyStep(state: IStep) {
        return state.propertyStep;
    },
    getAddPropertyDatas(state: IStep) {
        if ((state.propertyDatas as { detailLocation: {} })?.detailLocation)
            return state.propertyDatas;
    },
    getPropertyType(state: any) {
        return state.propertyType;
    },
    getKitchenElt(state: any) {
        return state.kitchenElt;
    },

    getDailyNeeded(state: any) {
        return state.dailyNeeded;
    },

    getFeatures(state: any) {
        return state.features;
    },

    getOptions(state: any) {
        return state.options;
    },

    getAllTheProperty(state: any) {
        return state.allTheProperty;
    },
    getPropertyCoordinates(state: any) {
        if (state.propertyStep.address) {
            return {
                lat: state.propertyDatas?.detailLocation.latitude,
                lng: state.propertyDatas?.detailLocation.longitude,
            };
        } else {
            return {
                lat: null,
                lng: null,
            };
        }
    },
    getContactList(state: any) {
        return state.contactList;
    },
    getOperationTye(state: any) {
        if (state.propertyDatas?.operationType) {
            return state.propertyDatas?.operationType;
        }
    },

    getDestinations(state: any) {
        return state.destinations;
    },

    getAllUrbanDocument(state: any) {
        return state.urbanDocumentValue;
    },

    getShowDocumentForm(state: any) {
        return state.showDocumentForm;
    },

    getListOfSyndic(state: any) {
        return state.listOfSyndic;
    },

    getToitures(state: any) {
        return state.toitureList;
    },
    getAddPropertyData(state: any) {
        return state.propertyDatas;
    },
    getTransactionTypes(state: any) {
        return state.transactionTypes;
    },

    getUserInfluencer(state: any) {
        return state.allUserInfluencer;
    },
    getParticularChoice(state: any) {
        return state.particularChoice;
    },
};

export const mutations = {
    setEnergeticData(state: any, payload: any) {
        state.energeticData = { ...payload };
    },
    setNotaryList(state: IStep, payload: []) {
        state.notaryList = [...payload];
    },
    setSuggestedPrices(state: IStep, payload: any) {
        state.suggestedPrices = [...payload];
    },
    setDocumentFields(state: IStep, payloads: any) {
        state.documentFields = payloads;
    },
    mutateParticularChoice(state: IStep, payloads: string) {
        state.particularChoice = payloads;
    },
    resetCadastreState(state: IStep) {
        state.cadastre = [];
    },
    setContactList(state: IStep, payload: any) {
        state.contactList = payload;
    },
    updateStep(state: IStep, payload: IStepType) {
        state.propertyStep = { ...state.propertyStep, ...payload };
    },
    updateData(state: IStep, payload: object) {
        state.propertyDatas = { ...state.propertyDatas, ...payload };
    },
    resetData(state: IStep) {
        state.propertyDatas = {
            detailLocation: {
                address: '',
            },
            propertyType: -1,
            roomcount: -1,
            surface: 0,
        };
    },
    [mutationType.GET_PROPERTY_TYPE](state: any, payload: Object) {
        state.propertyType = payload;
    },
    [mutationType.GET_KITCHEN_ELT](state: any, payload: Object) {
        state.kitchenElt = payload;
    },

    [mutationType.GET_DAILY_NEEDED](state: any, payload: Object) {
        state.dailyNeeded = payload;
    },

    [mutationType.GET_FEATURES](state: any, payload: Object) {
        state.features = payload;
    },

    [mutationType.GET_OPTIONS](state: any, payload: Object) {
        state.options = payload;
    },
    [mutationType.GET_ALL_PROPERTY](state: any, payload: object) {
        state.allTheProperty = payload;
    },
    [mutationType.GET_DESTINATIONS](state: any, payload: Array<any>) {
        state.destinations = payload;
    },
    [mutationType.SET_URBAN_DOCUMENT](state: any, payload: Object) {
        state.urbanDocumentValue = { ...state.urbanDocumentValue, ...payload };
    },
    [mutationType.SHOW_DOCUMENT_FORM](state: any, payload: any) {
        state.showDocumentForm = payload;
    },
    [mutationType.GET_LIST_OF_SYNDIC](state: any, payload: any) {
        state.listOfSyndic = payload;
    },
    setToitures(state: any, payload: []) {
        state.toitureList = [...payload];
    },
    [mutationType.SET_AREA](state: any, payload: number) {
        state.propertyDatas = {
            ...state.propertyDatas,
            cadastralArea: payload,
        };
    },
    [mutationType.GET_TRANSACTION_TYPES](state: any, payload: any[]) {
        state.transactionTypes = payload;
    },

    [mutationType.GET_USER_INFLUENCER](state: any, payload: Array<any>) {
        state.allUserInfluencer = payload;
    },
};

export const actions = {
    setPropertyData({ commit }: any, params: any) {
        const { step, data } = params;
        if (step) commit('updateStep', params.step);
        commit('updateData', params.data);

        // const sessionParams = getSessionPersistedStore({key : 'params'}) ?? null;

        // setSessionPersistStore({key: 'params', value:{
        //     data : sessionParams ? {
        //         ...sessionParams['data'],
        //         ...data
        //     }  : data,
        //     step : sessionParams ? {
        //         ...sessionParams['step'],
        //         ...step
        //     } : step
        // }});
    },

    async getProperyType({ commit }: any, payload: string) {
        const { data } = await AddProductService.getPropertyType();
        let finalData = [];
        if (data && data.length > 0) {
            switch (payload) {
                case 'sell':
                    finalData = data.filter((value: any) => value.isSell);
                    break;
                case 'rent':
                    finalData = data.filter((value: any) => value.isLocation);
                    break;
                default:
                    finalData = data;
                    break;
            }
        }

        commit(mutationType.GET_PROPERTY_TYPE, finalData);

        return formatDaily(finalData);
    },

    async getKitchenElt({ commit }: any, payload: string) {
        const { data } = await AddProductService.getPropertyType();
        let finalData = [];
        if (data && data.length > 0) {
            switch (payload) {
                case 'sell':
                    finalData = data.filter((value: any) => value.isSell);
                    break;
                case 'rent':
                    finalData = data.filter((value: any) => value.isLocation);
                    break;
                default:
                    finalData = data;
                    break;
            }
        }

        commit(mutationType.GET_KITCHEN_ELT, finalData);

        return formatDaily(finalData);
    },

    async getDailyNeeded({ commit }: any) {
        const data = await AddProductService.getDailyNeeded();
        commit(mutationType.GET_DAILY_NEEDED, data.data);
        // commit(mutationType.GET_DAILY_NEEDED, formatDaily(data.data));
        return data;
    },

    async getFeatures({ commit }: any) {
        const data = await AddProductService.getFeatures();
        commit(mutationType.GET_FEATURES, data);
        return data;
    },

    async getOptions({ commit }: any) {
        const data = await AddProductService.getOptions();
        commit(mutationType.GET_OPTIONS, data);
        return data;
    },

    async createProduct({ state, commit }: any) {
        console.log(state.propertyDatas);
        // const initialPropertyDatas = {
        //     detailLocation: {
        //         address: '',
        //     },
        //     propertyType: -1,
        //     roomcount: -1,
        //     surface: 0,
        // };

        // const formData = new FormData();

        // Object.keys(state.propertyDatas).forEach((item) => {
        //     if (
        //         item === 'images' ||
        //         item === 'leaseCopy' ||
        //         item === 'documents'
        //     ) {
        //         if (state.propertyDatas[item]) {
        //             if (item == 'images') {
        //                 state.propertyDatas[item].forEach(
        //                     (image: any, index: number) => {
        //                         formData.append(`${item}[][file]`, image.file);
        //                         if (!!image.soundFile) {
        //                             formData.append(
        //                                 `${item}[][soundFile]`,
        //                                 image?.soundFile
        //                             );
        //                         }
        //                     }
        //                 );
        //             } else if (item === 'leaseCopy') {
        //                 formData.append(item, state.propertyDatas[item]);
        //             } else if (item === 'documents') {
        //                 state.propertyDatas[item].forEach(
        //                     (doc: any, idObj: number) => {
        //                         Object.keys(doc).forEach((i: any) => {
        //                             if (doc[i]) {
        //                                 formData.append(
        //                                     `${item}[${idObj}][${i}]`,
        //                                     doc[i]
        //                                 );
        //                             }
        //                         });
        //                     }
        //                 );
        //             }
        //         }
        //     } else {
        //         isAnArrayorPush(item, state.propertyDatas[item], formData);
        //     }
        // });

        const { data, status } = await AddProductService.postTheProperty(
            createFormData(state.propertyDatas)
        );
        console.log('response\n', data);
        // state.propertyDatas = { ...initialPropertyDatas };
        return { data, status };
    },

    async getAllTheProperty({ commit }: any) {
        const data = await ProductsListService.getProductsListPerUser();
        commit(mutationType.GET_ALL_PROPERTY, data);
    },
    getContactList({ commit }: any, payload: any) {
        const data = AddProductService.getContactList(
            payload.type,
            payload.params
        );
        data.then((data) => {
            commit('setContactList', data.data);
        });
    },
    getGetEnergeticCaracteristic({ commit }: any, payload: any) {
        const resp = AddProductService.getErgeticCaracteristic(payload);
        resp.then(({ data, status }: any) => {
            commit('setEnergeticData', data);
        });
    },
    resetDataAction({ commit }: any) {
        commit('resetData');
    },
    async getDestinations({ commit }: any) {
        const { data } = await AddProductService.getDestinations();
        // const role = await getUserRole();
        // console.log("Role\n", role);
        commit(mutationType.GET_DESTINATIONS, data);

        // if(role === Role.pro){

        //     commit(mutationType.GET_DESTINATIONS, data);
        // }else{
        //     commit(mutationType.GET_DESTINATIONS, data.filter((i :any) => i.id !== 2));
        // }
    },
    async getDocumentFields({ commit }: any, payload: { [key: string]: any }) {
        const resp = await AddProductService.getDcumentsFieds(payload);

        console.log('response : ', resp.data);
        commit('setDocumentFields', resp.data);
    },

    async setShowDocumentForm({ commit }: any, payload: any) {
        commit(mutationType.SHOW_DOCUMENT_FORM, payload);
    },

    async setUrbanDocument({ commit }: any, payload: any) {
        commit(mutationType.SET_URBAN_DOCUMENT, payload);
    },

    async postUrbanDocument({ state }: any) {
        const formData = new FormData();

        Object.keys(state.urbanDocumentValue).forEach((item) => {
            isAnArrayorPush(item, state.urbanDocumentValue[item], formData);
        });

        const { data } = await AddProductService.postUrbaDocument(formData);
        if (data) {
            console.log('Post document urbanistique');
        }
    },
    async getCadasrteByCoord(
        { commit }: any,
        payload: { lat: number; lng: number }
    ) {
        const response: any[] = [];
        let area: any = null;
        const res = await AddProductService.getCadastreByCoordinates(payload);
        response.push(res.data);
        area = res.area;
        commit(mutationType.SET_AREA, res.area);
        return response;
    },
    async getListOfSyndic({ commit }: any) {
        const { data, status } = await AddProductService.getListOfSyndic();
        commit(mutationType.GET_LIST_OF_SYNDIC, formatSyndic(data));

        // if(status === 200){
        // }
    },
    async getSuggestedPrice({ state, commit }: any, payload: any) {
        const propertyType = state.propertyType.filter(
            (item: any) => item.id === state.propertyDatas.propertyType
        )[0].name;

        const params = {
            address: state.propertyDatas.detailLocation.address,
            municipality: state.propertyDatas.detailLocation.municipality,
            country: state.propertyDatas.detailLocation.country,
            surface: state.propertyDatas.livingArea,
            propertyType,
            roomcount: state.propertyDatas.roomcount,
        };
        // const params = {
        //     "address": "Rue Jean-Baptiste Decock 52, 1080 Molenbeek-Saint-Jean, Belgique",
        //     "municipality": "Molenbeek",
        //     "country": "Belgique",
        //     "surface": 120,
        //     "propertyType": "Maison",
        //     "roomcount": 3
        // }
        const { data } = await AddProductService.getSuggestedPrice(params);
        commit('setSuggestedPrices', data);
    },
    async fetchNotaryList({ commit }: any) {
        const { data, status } = await AddProductService.fetchNotaryList();
        commit('setNotaryList', data);
    },
    async fetchToitureList({ commit }: any) {
        const { data } = await AddProductService.getToiture();
        commit('setToitures', addLableToValue(data));
    },

    async getTransactionTypes({ commit }: any) {
        try {
            const { data } = await AddProductService.getTransactionTypes();
            commit(mutationType.GET_TRANSACTION_TYPES, data);
        } catch (error) {
            console.log(
                'Erreur lorse de la recuperation des types de transactions\n',
                error
            );
        }
    },

    async getUserInfluencer({ commit }: any) {
        try {
            const { data } = await AddProductService.getUserInfluencer();

            return data;
        } catch (error) {
            console.log(
                'Erreur lors de la recuperation des users influencer\n',
                error
            );
        }
    },

    async saveParamsSession() {
        try {
            const allParams = getSessionPersistedStore({ key: 'params' });
            const { data } = await AddProductService.saveParamsSession(
                createFormData(allParams)
            );
            return data;
        } catch (error) {}
    },

    async getParamsSession() {
        try {
            const { data } = await AddProductService.getSaveParamsSession();
            return data;
        } catch (error) {}
    },

    setParticularChoice({ commit }: any, payload: string) {
        commit('mutateParticularChoice', payload);
    },
};

function format(data: Array<any>) {
    interface I {
        label: string;
        value: number;
    }

    let newArray: I[] = [];
    for (let i = 0; i < data.length; i++) {
        newArray = [
            ...newArray,
            {
                label: data[i].propertyDestinations,
                value: data[i].id,
            },
        ];
    }

    return newArray;
}

function formatSyndic(data: Array<any>) {
    interface ISyndic {
        id: number;
        label: string;
        value: number;
    }

    let newArray: ISyndic[] = [];

    for (let i = 0; i < data.length; i++) {
        newArray = [
            ...newArray,
            {
                id: data[i].id,
                label: data[i].name + ' ' + data[i].firstname,
                value: data[i].id,
            },
        ];
    }

    return newArray;
}

function formatDaily(data: Array<any>) {
    interface IDaily {
        id: number;
        label: string;
        value: number;
    }

    let newArray: IDaily[] = [];
    for (let i = 0; i < data.length; i++) {
        newArray = [
            ...newArray,
            {
                id: data[i].id,
                label: data[i].name,
                value: data[i].id,
            },
        ];
    }
    return newArray;
}

function addLableToValue(data: Array<any>) {
    interface IRoof {
        id: number;
        label: string;
        value: string;
    }

    let newArray: IRoof[] = [];
    for (let i = 0; i < data.length; i++) {
        newArray = [
            ...newArray,
            {
                id: data[i].value,
                label: data[i].label,
                value: data[i].label,
            },
        ];
    }
    return newArray;
}
// async function getUserRole(){
//     const store = useStore();
//     const list = await store.getters['UserModule/getUserDetails'].roles.includes('ROLE_PRO') ? Role.pro : Role.part;
//     return list;
// }
