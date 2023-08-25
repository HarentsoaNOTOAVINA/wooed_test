import educationService from '@/services/educationService';

export const state = {
    levelList: [],
    schoolList: [],
    classList: [],
    educationPosted: [],
};

export const mutations = {
    mutationLevelList(state: any, payload: Array<object>) {
        state.levelList = payload;
    },
    mutationSchoolList(state: any, payload: Array<object>) {
        state.schoolList = payload;
    },
    mutationClassList(state: any, payload: Array<object>) {
        state.classList = payload;
    },
    mutationCreateEducation(state: any, payload: Array<object>) {
        state.educationPosted = payload;
    },
};

export const actions = {
    async setLevelList({ commit }: any) {
        const levelListData = await educationService.getLevelList();
        commit('mutationLevelList', levelListData);
        console.log('store level list:', levelListData);
    },
    async setSchoolList({ commit }: any, params: any) {
        const schoolListData = await educationService.getSchoolList(params);
        commit('mutationSchoolList', schoolListData);
        console.log('store school list:', schoolListData);
    },
    async setClassList({ commit }: any, params: any) {
        const classListData = await educationService.getClassList(params);
        commit('mutationClassList', classListData);
        console.log('store class list:', classListData);
    },
    async setCreateEducation({ commit }: any, params: any) {
        const createdEducationData = await educationService.createEducation(
            params
        );
        commit('mutationCreateEducation', createdEducationData);
        console.log('store education created:', createdEducationData);
    },
};
export const getters = {
    getLevelList(state: any) {
        return state.levelList;
    },
    getSchoolList(state: any) {
        return state.schoolList;
    },
    getClassList(state: any) {
        return state.classList;
    },
    getCreatedEducation(state: any) {
        return state.educationPosted;
    },
};
