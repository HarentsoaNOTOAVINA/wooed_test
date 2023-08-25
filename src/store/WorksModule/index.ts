import WorksService from '@/services/WorksService';
import Rental from '@/services/rentalServices';
import Elevator from '@/pages/work/Maintains/Elevator/Elevator.vue';

import { createFormData, isAnArrayorPush2 } from '@/utils/formdata/formData';

export const state = {
    dataIdToPost: {},
    listExpertDynam: [],
    notBuriedMenu: [],
    otherMenu: [],
    listExpert: [],
    contactExpert: [],
    contactMunicipality: [],
    saveWork: [],
    demandDoubleTank: [],
    listDemandDoubleTank: [],
    respondDemandDoubleTank: [],
    listResponseDoubleTank: [],
    pollutionPdf: [],
    costCalculated: [],
    obliMenu: [],
    addControl: [],
    addEvacuation: [],
    listEvacuation: [],
    addDispense: [],
    demandDispenseNotary: [],
    demandAuthLeaveTank: [],
    listAuthLeaveTank: [],
    validateFillTank: [],
    listFillTank: [],
    reconSoilSubMenu: [],
    listExpertSoilPollution: [],
    recon: '',
    rating: '',
    //MAINTAINCE Start
    listMaintains: [],
    listExpertTankBoiler: [],
    // Elevator start
    expertElevator: [],
    dataCostElevator: {},
    dataSaveWorkMaintainsElevator: {
        idExpert: null,
        idTheProperty: null,
        idWorkCost: null,
        estimatedCost: null,
    },
    // Elevator end

    // Maintains Tank Start
    listLastControl: [],
    listNextControl: [],

    // Maintains Tank End

    // Emergency Start
    expertElectricien: [],
    expertPlumber: [],
    // Emergency End

    // MAINTAINCE End

    // WORK BOILER Start
    dataToSaveWorkBoiler: {},
    listMenuBoiler: [],

    // WORK BOILER END
};

export const mutations = {
    mutationDataIdToPost(state: any, payload: any) {
        state.dataIdToPost = { ...state.dataIdToPost, ...payload };
    },
    mutationNotBuried(state: any, payload: Array<any>) {
        state.notBuriedMenu = payload;
    },
    mutationOther(state: any, payload: Array<any>) {
        state.otherMenu = payload;
    },
    mutationListExpertDynam(state: any, payload: Array<any>) {
        state.listExpertDynam = payload;
    },
    mutationListExpert(state: any, payload: Array<any>) {
        state.listExpert = payload;
    },
    mutationContactExpert(state: any, payload: any) {
        state.contactExpert = payload;
    },
    mutationContactMunicipality(state: any, payload: any) {
        state.contactMunicipality = payload;
    },
    mutationSaveWork(state: any, payload: any) {
        state.saveWork = payload;
    },
    mutationDemandDoubleTank(state: any, payload: any) {
        state.demandDoubleTank = payload;
    },
    mutationListDemandDouleTank(state: any, payload: any) {
        state.listDemandDoubleTank = payload;
    },
    mutationRespondDemandDoubleTank(state: any, payload: any) {
        state.respondDemandDoubleTank = payload;
    },
    mutationsListResponseDoubleTank(state: any, payload: any) {
        state.listResponseDoubleTank = payload;
    },
    mutationPollutionPdf(state: any, payload: any) {
        state.pollutionPdf = payload;
    },
    mutationCostCalculated(state: any, payload: any) {
        state.costCalculated = payload;
    },
    muatationObliMenu(state: any, payload: any) {
        state.obliMenu = payload;
    },
    mutationAddControl(state: any, payload: any) {
        state.addControl = payload;
    },
    mutationAddEvacuation(state: any, payload: any) {
        state.addEvacuation = payload;
    },
    mutationListEvacuation(state: any, payload: any) {
        state.listEvacuation = payload;
    },
    mutationAddDispense(state: any, payload: any) {
        state.addDispense = payload;
    },
    mutationDemandDispenseNotary(state: any, payload: any) {
        state.demandDispenseNotary = payload;
    },
    mutationDemandAuthLeaveTank(state: any, payload: any) {
        state.demandAuthLeaveTank = payload;
    },
    mutationListAuthLeaveTank(state: any, payload: any) {
        state.listAuthLeaveTank = payload;
    },
    mutationFillTank(state: any, payload: any) {
        state.validateFillTank = payload;
    },
    mutationListFillTank(state: any, payload: any) {
        state.listFillTank = payload;
    },
    mutationReconSoilSubMenu(state: any, payload: any) {
        state.reconSoilSubMenu = payload;
    },
    mutationListExpertSoilPollution(state: any, payload: any) {
        state.listExpertSoilPollution = payload;
    },
    mutationRecon(state: any, payload: any) {
        state.recon = payload;
    },
    mutationRating(state: any, payload: any) {
        state.rating = payload;
    },
    // Maintaince list menu
    mutationMenuMaintains(state: any, payload: Array<any>) {
        state.listMaintains = payload;
    },
    // Elevator start
    mutationExpertElev(state: any, payload: Array<any>) {
        state.expertElevator = payload;
    },
    mutationCostElev(state: any, payload: object) {
        state.dataCostElevator = payload;
    },
    mutationIdExpertElev(state: any, payload: object) {
        state.dataSaveWorkMaintainsElevator.idExpert = payload;
    },

    // Elevatr end

    // Maintains Tank start
    mutationListLastControl(state: any, payload: object) {
        state.listLastControl = payload;
    },

    mutationListNextControl(state: any, payload: object) {
        state.listNextControl = payload;
    },

    mutationExpertTank(state: any, payload: object) {
        state.listExpertTankBoiler = payload;
    },
    // Maintains Tank end

    // Work boiler start
    mutationListMenuBoiler(state: any, payload: object) {
        state.listMenuBoiler = payload;
    },
    mutationDataSaveBoiler(state: any, payload: object) {
        state.dataToSaveWorkBoiler = {
            ...state.dataToSaveWorkBoiler,
            ...payload,
        };
    },
    // Work boiler end

    // Emergency  start
    mutationExpertElec(state: any, payload: object) {
        state.expertElectricien = payload;
    },
    mutationExpertPlumb(state: any, payload: object) {
        state.expertPlumber = payload;
    },
    // Emergency end
};

export const actions = {
    setDataIdToPost({ commit }: any, params: any) {
        commit('mutationDataIdToPost', params);
    },
    async setNotBuriedMenu({ commit }: any) {
        const dataNotBuriedMenu = await WorksService.getMenuNotBuried();
        commit('mutationNotBuried', dataNotBuriedMenu);
    },
    async setOtherMenu({ commit }: any) {
        const dataOtherMenu = await WorksService.getMenuOthers();
        commit('mutationOther', dataOtherMenu);
    },
    async setListExpertDynam({ commit }: any, params: object) {
        const dataListExpert = await WorksService.getExpertListDynam(params);
        commit('mutationListExpertDynam', dataListExpert);
    },
    async setListExpert({ commit }: any, payload: any) {
        const dataListExpert = await WorksService.getExpertList(payload);
        commit('mutationListExpert', dataListExpert);
    },
    async setContactExpert({ commit }: any, payload: any) {
        const data = await WorksService.sendMailToExpert(payload);
        commit('mutationContactExpert', data);
    },
    async setContactMunicipality({ commit }: any, payload: any) {
        const data = await WorksService.sendDemand(payload);
        commit('mutationContactMunicipality', data);
    },
    async setSaveWork({ commit }: any, payload: any) {
        const data = await WorksService.saveWork(payload);
        commit('mutationSaveWork', data);
        return data;
    },
    async setDemandDoubleTank({ commit }: any, payload: any) {
        const formdata = new FormData();

        Object.keys(payload).forEach((item: any) => {
            isAnArrayorPush2(item, payload[item], formdata);
        });

        const data = await WorksService.sendDemandDoubleTank(formdata);
        commit('mutationDemandDoubleTank', data);

        return data;
    },
    async setListDemandDoubleTank({ commit }: any, payload: any) {
        const data = await WorksService.listDemandDoubleTank(payload);
        commit('mutationListDemandDouleTank', data);
    },
    async setRespondDemandDoubleTank({ commit }: any, payload: any) {
        const data = await WorksService.sendDemandResponseDoubleTank(payload);
        commit('mutationRespondDemandDoubleTank', data);
        return data;
    },
    async setListResponseDoubleTank({ commit }: any, payload: any) {
        const data = await WorksService.listRespondDoubleTank(payload);
        commit('mutationsListResponseDoubleTank', data);
    },
    async setPollutionPdf({ commit }: any) {
        const data = await WorksService.getPollutionPdf();
        commit('mutationPollutionPdf', data);
    },
    async setCostCalculated({ commit }: any, payload: any) {
        const data = await WorksService.getCostCalculate(payload);
        commit('mutationCostCalculated', data);
    },
    async setObliMenu({ commit }: any, payload: any) {
        const { data } = await WorksService.getObliMenuList(payload);
        commit('muatationObliMenu', data);
        return data;
    },
    async setAddControl({ commit }: any, payload: any) {
        const { data } = await WorksService.addControl(payload);
        commit('mutationAddControl', data);
        return data;
    },
    async setAddEvacuation({ commit }: any, payload: any) {
        const { data } = await WorksService.addEvacuation(payload);
        commit('mutationAddEvacuation', data);
        return data;
    },
    async setListEvacuation({ commit }: any, payload: any) {
        const { data } = await WorksService.getEvacuation(payload);
        commit('mutationListEvacuation', data);
        return data;
    },
    async setAddDispense({ commit }: any, payload: any) {
        const { data } = await WorksService.addDispense(payload);
        commit('mutationAddDispense', data);
        return data;
    },
    async setDemandDispenseNotry({ commit }: any, payload: any) {
        const { data } = await WorksService.demandDispenseNotary(payload);
        commit('mutationDemandDispenseNotary', data);
        return data;
    },
    async setDemandAuthLeaveTank({ commit }: any, payload: any) {
        const { data } = await WorksService.validateAuthLeaveTank(payload);
        commit('mutationDemandAuthLeaveTank', data);
        return data;
    },
    async setListAuthLeaveTank({ commit }: any, payload: any) {
        const { data } = await WorksService.getListAuthLeaveTank(payload);
        commit('mutationListAuthLeaveTank', data);
        return data;
    },
    async setFillTank({ commit }: any, payload: any) {
        const { data } = await WorksService.validateFillTank(payload);
        commit('mutationFillTank', data);
        return data;
    },
    async setListFillTank({ commit }: any, payload: any) {
        const { data } = await WorksService.getListFillTank(payload);
        commit('mutationListFillTank', data);
        return data;
    },
    async setReconSoilSubMenu({ commit }: any, payload: any) {
        const { data } = await WorksService.getSoilReconSubMenu(payload);
        commit('mutationReconSoilSubMenu');
        return data;
    },
    async setListExpertSoilPollution({ commit }: any, payload: any) {
        const { data } = await WorksService.getEpxertSoilPollution();
        commit('mutationListExpertSoilPollution', data);
        return data;
    },
    async setRecon({ commit }: any, payload: any) {
        commit('mutationRecon', payload);
    },
    async setRating({ commit }: any, payload: any) {
        const { data } = await WorksService.rateExpert(payload);
        commit('mutationRating', payload);
        return data;
    },
    // get list maintenance
    async setMaintainsMenu({ commit }: any) {
        const { data } = await WorksService.getMaintainsList();
        commit('mutationMenuMaintains', formatDataMenuMaintains(data));
        return formatDataMenuMaintains(data);
    },

    // elevator start
    async setExpertElevator({ commit }: any) {
        const dataElevator = await WorksService.getElevatorExpert();
        commit('mutationExpertElev', dataElevator);
    },
    async setCostElevator({ commit }: any, params: object) {
        const costElevator = await WorksService.postCostElevator(params);
        commit('mutationCostElev', costElevator);
    },

    async registerWorkMaintainsElevator({ commit }: any, params: any) {
        const formData = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formData);
        });
        let response = await WorksService.postRregisterMaintainsElevator(
            formData
        );
        return response;
    },

    setIdExpertElevator({ commit }: any, idExpert: number) {
        commit('mutationIdExpertElev', idExpert);
    },
    // elevator end

    // work maintains tank START
    async addLastControl({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.addLastControl(formdata);

        return response;
    },
    async addNextControl({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.addNextControl(formdata);

        return response;
    },

    async setListLastControls({ commit }: any, idTheProperty: string) {
        let lists = await WorksService.getLastControl(idTheProperty);

        commit('mutationListLastControl', lists);

        return lists;
    },
    async setListNextControls({ commit }: any, idTheProperty: string) {
        let listsNextControl = await WorksService.getNextControl(idTheProperty);

        commit('mutationListLastControl', listsNextControl);

        return listsNextControl;
    },

    async setListExpertTankBoiler({ commit }: any, params: object) {
        let listExpert = await WorksService.getListExpertMaintainsTankBoiler(
            params
        );

        // commit('mutationListLastControl', listExpert);

        return listExpert;
    },

    async contactExpertTank({ commit }: any, params: object) {
        let contact = await WorksService.contactExpertTank(params);

        return contact;
    },

    async calculCostMaintainsTank({ commit }: any, params: object) {
        let result = await WorksService.calculCostMaintainsTank(params);

        return result;
    },

    // work maintains tank END

    // work maintains boiler START
    async addLastControlBoiler({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.addLastControlPEB(formdata);

        return response;
    },
    async addNextControlBoiler({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.addNextControlPEB(formdata);

        return response;
    },
    async getListControlPEB({ commit }: any, params: object) {
        let lists = await WorksService.getLastControlPEB(params);

        return lists;
    },
    async getListNextControlPEB({ commit }: any, params: object) {
        let listNextControlPEB = await WorksService.getNextControlPEB(params);

        return listNextControlPEB;
    },

    // work maintains boiler End

    // work Boiler Start
    async setListMenuBoiler({ commit }: any, params: any) {
        let listMenu = await WorksService.listMenuBoiler();
        commit('mutationListMenuBoiler', listMenu);
        return listMenu;
    },

    async sendDevise({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.sendDeviseInstallation(formdata);

        return response;
    },
    async calculCostBoiler({ commit }: any, params: any) {
        const formdata = new FormData();

        console.log(params, 'Params');

        Object.entries(params).forEach((item: any) => {
            formdata.append(item[0], item[1]);
        });

        let response = await WorksService.calculCostBoiler(formdata);

        return response;
    },
    async addCaracteristicInstallation({ commit }: any, params: any) {
        let response = await WorksService.addCaracteristicBoiler(params);

        return response;
    },

    async saveBoilerWork({ commit }: any, params: any) {
        const formdata = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formdata);
        });

        let response = await WorksService.saveWorkBoiler(formdata);

        return response;
    },

    async setDataSaveBoiler({ commit }: any, params: any) {
        commit('mutationDataSaveBoiler', params);
    },

    async listChoiceCategory({ commit }: any, idTypeOfWork: number) {
        let response = await WorksService.listChoiceCategoryBoiler(
            idTypeOfWork
        );

        return response;
    },

    async sendMailForDemandBoiler({ commit }: any, params: number) {
        let response = await WorksService.sendMailForDemandBoiler(
            createFormData(params)
        );

        return response;
    },

    async contactHomeGrade({ commit }: any, params: any) {
        let response = await WorksService.contactHomeGrade();

        return response;
    },
    async getEditablePdf({ commit }: any, params: any) {
        let response = await Rental.getEditableDocument(params);

        return response;
    },

    // Work Boiler End

    // check if exist boiler and tank
    async checkBoiler({ commit }: any, params: object) {
        let response = await WorksService.checkIfHasBoiler(params);

        return response;
    },

    // emergency start
    async setListElectricien({ commit }: any) {
        const listElec = await WorksService.getListElectricienEmergency();
        commit('mutationExpertElec', listElec);
    },
    async setListPlumber({ commit }: any) {
        const listPlumb = await WorksService.getListPlumberEmergency();
        commit('mutationExpertPlumb', listPlumb);
    },
    async sendMailExpertEmergency({ commit }: any, params: object) {
        let result = await WorksService.contactExpertEmergency(params);
        return result;
    },
    async registerWorEmergency({ commit }: any, params: any) {
        const formData = new FormData();

        Object.keys(params).forEach((item: any) => {
            isAnArrayorPush2(item, params[item], formData);
        });
        console.log('RESPONET');
        let response = await WorksService.postRegisterEmergencyWork(formData);

        return response;
    },
    // emergency end

    // transformation start
    async getTypeOfWork({ commit }: any, params: object) {
        let listTypeOfWork = await WorksService.typeOfWorkList();

        return listTypeOfWork;
    },
    async getSubSection({ commit }: any, params: object) {
        let listSubSection = await WorksService.subSectionList(params);

        return listSubSection;
    },
    async getChoiceCategory({ commit }: any, params: object) {
        let listChoiceCategory = await WorksService.choiceCategoryList(params);

        return listChoiceCategory;
    },
    async getModel({ commit }: any, params: object) {
        let listModel = await WorksService.modelList(params);

        return listModel;
    },
    async getSubModel({ commit }: any, params: object) {
        let listSubModel = await WorksService.subModelList(params);

        return listSubModel;
    },
    async listExpertTrans({ commit }: any) {
        let resultat = await WorksService.listExpTrans();

        return resultat;
    },
    async contactExpertTrans({ commit }: any, params: object) {
        let resultat = await WorksService.contactExpTrans(params);

        return resultat;
    },
    async rulesApplicable({ commit }: any, params: object) {
        let resultat = await WorksService.rulesApplicable(params);

        return resultat;
    },
    async saveTrans({ commit }: any, params: object) {
        let resultat = await WorksService.saveTrans(params);

        return resultat;
    },

    // transformation end
};

export const getters = {
    getDataIdToPost(state: any) {
        return state.dataIdToPost;
    },
    getNotBuriedMenu(state: any) {
        return state.notBuriedMenu;
    },
    getOtherMenu(state: any) {
        return state.otherMenu;
    },
    getListExpertDynam(state: any) {
        return state.listExpertDynam;
    },
    getListExpert(state: any) {
        return state.listExpert;
    },
    getContactExpert(state: any) {
        return state.contactExpert;
    },
    getContactMunicipality(state: any) {
        return state.contactMunicipality;
    },
    getSaveWork(state: any) {
        return state.saveWork;
    },
    getSendDemandDoubleTank(state: any) {
        return state.demandDoubleTank;
    },
    getListDemandDoubleTank(state: any) {
        return state.listDemandDoubleTank;
    },
    getResponseDemandDoubleTank(state: any) {
        return state.respondDemandDoubleTank;
    },
    getListResponseDoubleTank(state: any) {
        return state.listResponseDoubleTank;
    },
    getPollutionPdf(state: any) {
        return state.pollutionPdf;
    },
    getCostCalculated(state: any) {
        return state.costCalculated;
    },
    getObliMenu(state: any) {
        return state.obliMenu;
    },
    getAddControl(state: any) {
        return state.addControl;
    },
    getAddEvacuation(state: any) {
        return state.addEvacuation;
    },
    getListEvacuation(state: any) {
        return state.listEvacuation;
    },
    getListAuthLeaveTank(state: any) {
        return state.listAuthLeaveTank;
    },
    getRecon(state: any) {
        return state.ex;
    },
    // Maintains list
    getMaintainsMenu(state: any) {
        return state.listMaintains;
    },
    // Elevator start
    getExpertElevator(state: any) {
        return state.expertElevator;
    },
    getCostElevator(state: any) {
        return state.dataCostElevator;
    },
    getIdExpert(state: any) {
        return state.dataSaveWorkMaintainsElevator.idExpert;
    },
    // Elevator end

    // Maintains Tank start
    getListLastControls(state: any) {
        return state.listLastControl;
    },

    getListExpertTank(state: any) {
        return state.listExpertTankBoiler;
    },
    // Maintains Tank end

    // Work Boiler start
    getListMenuBoiler(state: any) {
        return state.listMenuBoiler;
    },
    getDataSaveBoiler(state: any) {
        return state.dataToSaveWorkBoiler;
    },

    // Work Boiler end

    // Emergency start
    getListElectricien(state: any) {
        return state.expertElectricien;
    },
    getListPlumber(state: any) {
        return state.expertPlumber;
    },
    // Emergency end
};

// function formatSideBarData
function formatDataMenuMaintains(value: Array<any>): Array<any> {
    let newArray: Array<any> = [];
    value.forEach((item: any) => {
        switch (item.name) {
            case 'Ascenseurs':
                newArray = [
                    ...newArray,
                    {
                        ...item,
                        key: 'elevator-maintains',
                        label: 'Ascenseurs',
                        icon: 'ElevatorIcon',
                        component: Elevator,
                    },
                ];
                break;
            case 'Chaudière':
                newArray = [
                    ...newArray,
                    {
                        ...item,
                        key: 'boiler-maintains',
                        label: 'Chaudière',
                        icon: 'BoilerIcon',
                    },
                ];
                break;

            case 'Citernes':
                newArray = [
                    ...newArray,
                    {
                        ...item,
                        key: 'tank-maintains',
                        label: 'Citernes',
                        icon: 'TankIcon',
                    },
                ];
                break;

            default:
                break;
        }
    });
    return newArray;
}
