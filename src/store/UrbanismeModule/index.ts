import UrbanismeService from '@/services/UrbanismeService';
import { isAnArrayorPush2 } from '@/utils/formdata/formData';

export const state = {
    neighborhoodList: [],
    publicInquiry: [],
    createPublicInquiry: [],
    propertyDetail: [],
    //new property
    allNewPropertyProject: [],
    allProjectType: [],
    allProjectTypeCoords: [],
    allCatergoryType: [],
    allCategoryCoords: [],
    createNewProjectAlert: [],
    //------------
    responseRedrawDescription: {},
    prasStatusUrban: {},
    ppasStatusUrban: {},
};

export const mutations = {
    mutationNeighborhoodList(state: any, payload: Array<object>) {
        state.neighborhoodList = payload;
    },
    mutationPublicInquiry(state: any, payload: any) {
        state.publicInquiry = payload;
    },
    mutationPropertyDetail(state: any, payload: any) {
        state.propertyDetail = payload;
    },
    mutationCreatePublicInquiry(state: any, payload: any) {
        state.createPublicInquiry = payload;
    },
    mutationAllNewPropertyProject(state: any, payload: any) {
        state.allNewPropertyProject = payload;
    },
    mutationAllProjectType(state: any, payload: any) {
        state.allProjectType = payload;
    },
    mutationsAllProjectTypeCoords(state: any, payload: any) {
        state.allProjectTypeCoords = payload;
    },
    mutationAllCategoryType(state: any, payload: any) {
        state.allCatergoryType = payload;
    },
    mutationAllCategoryCoords(state: any, payload: any) {
        state.allCategoryCoords = payload;
    },
    mutationCreatedNewAlert(state: any, payload: any) {
        state.createNewProjectAlert = payload;
    },
    mutationPostDescriptionRedraw(state: any, payload: any) {
        state.responseRedrawDescription = payload;
    },
    mutationPrasStatusUrban(state: any, payload: any) {
        state.prasStatusUrban = payload;
    },
    mutationPpasStatusUrban(state: any, payload: any) {
        state.ppasStatusUrban = payload;
    },
};

export const actions = {
    async setNeighborhoodList({ commit }: any, params: any) {
        const neighborhoodListData =
            await UrbanismeService.getListNeighborRedraw(params);
        console.log('store test list:', neighborhoodListData.data);
        commit('mutationNeighborhoodList', neighborhoodListData);
    },

    async setPublicInquiryList({ commit }: any) {
        const publicInquiryData = await UrbanismeService.getListPublicInquiry();
        commit('mutationPublicInquiry', publicInquiryData);
        console.log('public inquiry store data:', publicInquiryData);
    },

    setPropertydetail({ commit }: any, detailProperty: object) {
        commit('mutationPropertyDetail', detailProperty);
    },

    async getDetailsProperty({ commit }: any, payload: number) {
        const { data } = await UrbanismeService.getDetailsProperty(payload);
        console.log('aaaaaaaaaaaa\n', data);

        commit('mutationPropertyDetail', [data]);
        return data;
    },

    async postDescriptionNeig({ commit }: any, params: any) {
        let formData = new FormData();
        Object.keys(params).forEach((key) => {
            if (key === 'files') {
                params[key].forEach((item: any, keyItem: number) => {
                    let k = `${key}[${keyItem}]`;
                    let val = item;
                    for (let i in item) {
                        formData.append(`${k}[${i}]`, item[i]);
                    }
                });
            } else {
                isAnArrayorPush2(key, params[key], formData);
            }
        });
        let resultPostDesc = await UrbanismeService.postDescription(formData);

        commit('mutationPostDescriptionRedraw', resultPostDesc);
        console.log(resultPostDesc, 'Result post desc store');
    },

    async setCreatePublicInquiry({ commit }: any, params: any) {
        const createdPublicInquiry = await UrbanismeService.createPublicInquiry(
            params
        );
        commit('mutationCreatePublicInquiry', createdPublicInquiry);
        console.log('created public inquiry', createdPublicInquiry);
    },

    async setAllNewPropertyProject({ commit }: any) {
        const allProject = await UrbanismeService.getAllNewProject();
        commit('mutationAllNewPropertyProject', allProject);
        console.log('all new property project store:', allProject);
    },
    async setAllProjectType({ commit }: any) {
        const allProjectType = await UrbanismeService.getAllProjectType();
        commit('mutationAllProjectType', allProjectType);
    },
    async setAllProjectTypeCoords({ commit }: any, params: any) {
        const allCoords = await UrbanismeService.getAllProjectTypeCoords(
            params
        );
        commit('mutationsAllProjectTypeCoords', allCoords);
    },
    async setAllCategoryType({ commit }: any) {
        const allCategory = await UrbanismeService.getAllCategory();
        commit('mutationAllCategoryType', allCategory);
    },
    async setAllCategoryCoords({ commit }: any, params: any) {
        const allCategoryCoords =
            await UrbanismeService.getAllProjectCategoryCoords(params);
        commit('mutationAllCategoryCoords', allCategoryCoords);
    },
    async setCreatedNewAlert({ commit }: any, params: any) {
        const createdNewAlert = await UrbanismeService.createNewProjectAlert(
            params
        );
        commit('mutationCreatedNewAlert', createdNewAlert);
    },

    async setPrasStatusUrban({ commit }: any, params: any) {
        const pras = await UrbanismeService.getPrasUrbanStatus(params);

        commit('mutationPrasStatusUrban', pras);
    },

    async setPpasStatusUrban({ commit }: any, params: any) {
        const ppas = await UrbanismeService.getPpasUrbanStatus(params);

        commit('mutationPpasStatusUrban', ppas);
    },
};
export const getters = {
    getNeighborhoodList(state: any) {
        return state.neighborhoodList;
    },
    getPublicInquiryList(state: any) {
        return state.publicInquiry;
    },
    getPropertyDetail(state: any) {
        return state.propertyDetail;
    },
    getCreatedPublicInquiry(state: any) {
        return state.createPublicInquiry;
    },
    getAllNewPropertyProject(state: any) {
        return state.allNewPropertyProject;
    },
    getAllProjectType(state: any) {
        return state.allProjectType;
    },
    getAllProjectTypeCoords(state: any) {
        return state.allProjectTypeCoords;
    },
    getAllCategoryType(state: any) {
        return state.allCatergoryType;
    },
    getAllCategoryCoords(state: any) {
        return state.allCategoryCoords;
    },
    getCreatedNewAlert(state: any) {
        return state.createNewProjectAlert;
    },
    getPostDescriptionRedraw(state: any) {
        return state.responseRedrawDescription;
    },

    getPrasStatusUrban(state: any) {
        return state.prasStatusUrban;
    },
    getPpasStatusUrban(state: any) {
        return state.ppasStatusUrban;
    },
};
