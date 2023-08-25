import { Http } from './http';

export default class WorksService {
    //Tanks' works START
    static async getMenuNotBuried() {
        return await Http.get('/tank/work/not/buried');
    }
    static async getMenuOthers() {
        return await Http.get('/tank/work/buried');
    }
    static async getExpertList(reg: any) {
        return await Http.get(
            `thepropertycarework/bureaux/etude/list?region=${reg}&speciality=Tank`
        );
    }
    static async sendMailToExpert(params: any) {
        return await Http.post('/tank/work/contact/reparation', params);
    }
    static async sendDemand(params: any) {
        return await Http.post('/tank/work/contact/for/tank', params);
    }
    static async saveWork(params: any) {
        return await Http.post('/tank/work/publish', params);
    }
    static async sendDemandDoubleTank(params: any) {
        return await Http.post('/theproperty_work/demands/add', params);
    }
    static async listDemandDoubleTank(params: any) {
        return await Http.post('/theproperty_work/demands/list', params);
    }
    static async sendDemandResponseDoubleTank(params: any) {
        return await Http.post('/theproperty_work/responses/add', params);
    }
    static async listRespondDoubleTank(id: any) {
        return await Http.get(
            `/theproperty_work/responses/list?idDemand=${id}`
        );
    }
    static async getPollutionPdf() {
        return await Http.get(
            '/urbanism/pdf/search?type=tank_pollution&file=FORM_DeclarationPollution_art4_FR.pdf'
        );
    }
    static async getCostCalculate(params: any) {
        return await Http.post('/tank/work/estimate', params);
    }
    static async getObliMenuList(params: any) {
        return await Http.get(`/model/bychoicecat/list?id=${params}`);
    }
    static async addControl(params: any) {
        return await Http.post('theproperty_work/controls/add', params);
    }
    static async addEvacuation(params: any) {
        return await Http.post('theproperty_work/evacuation/add', params);
    }
    static async getEvacuation(params: any) {
        return await Http.get('theproperty_work/evacuation/list', params);
    }
    static async addDispense(params: any) {
        return await Http.post('dispense/add', params);
    }
    static async demandDispenseNotary(params: any) {
        return await Http.post('dispense/contact', params);
    }
    static async validateAuthLeaveTank(params: any) {
        return await Http.post('theproperty_work/authorization/add', params);
    }
    static async getListAuthLeaveTank(params: any) {
        return await Http.get(
            `theproperty_work/authorization/list?thePropertyId=${params}`
        );
    }
    static async validateFillTank(params: any) {
        return await Http.post('theproperty_work/filling/add', params);
    }
    static async getListFillTank(params: any) {
        return await Http.get(
            `theproperty_work/filling/list?thePropertyId=${params}`
        );
    }
    static async getSoilReconSubMenu(params: any) {
        return await Http.get(`submodel/bymodel/list?id=${params}`);
    }
    static async getEpxertSoilPollution() {
        return await Http.get(
            'tank/work/pollution/sol/list?speciality=Pollution'
        );
    }
    static async rateExpert(params: any) {
        return await Http.post('/rating/add', params);
    }
    //Tanks' works END

    // ELEVATOR's works START
    static async getMaintainsList() {
        return await Http.get('/typeofwork/maintenance');
    }

    static async getElevatorExpert() {
        return await Http.get('/thepropertycarework/entreprise/list');
    }

    static async postCostElevator(params: object) {
        return await Http.post('/thepropertycarework/estimate', params);
    }

    static async postRregisterMaintainsElevator(params: object) {
        return await Http.post('/thepropertycarework/publish', params);
    }
    // ELEVATOR's works END

    // Tank Maintains START
    static async addLastControl(params: object) {
        return await Http.post('/theproperty_work/controls/add', params);
    }

    static async addNextControl(params: object) {
        return await Http.post('/theproperty_work/next/add', params);
    }

    static async getLastControl(idTheProperty: string) {
        return await Http.get(
            `/theproperty_work/controls/list?thePropertyId=${idTheProperty}`
        );
    }

    static async getNextControl(idTheProperty: string) {
        return await Http.get(
            `/theproperty_work/next/list?thePropertyId=${idTheProperty}`
        );
    }

    static async getListExpertMaintainsTankBoiler(params: object) {
        return await Http.get(
            `/thepropertycarework/bureaux/etude/list`,
            params
        );
    }

    static async contactExpertTank(params: object) {
        return await Http.post(
            '/thepropertycarework/entreprise/contact',
            params
        );
    }

    static async calculCostMaintainsTank(params: object) {
        return await Http.post('/thepropertycarework/estimate', params);
    }

    // Tank Maintains END

    // Boiler Maintains START
    static async addLastControlPEB(params: object) {
        return await Http.post('/theproperty_work/peb/add', params);
    }
    static async addNextControlPEB(params: object) {
        return await Http.post('/theproperty_work/next/peb/add', params);
    }
    static async getLastControlPEB(params: object) {
        return await Http.get('/theproperty_work/peb/list', params);
    }
    static async getNextControlPEB(params: object) {
        return await Http.get('/theproperty_work/next/peb/list', params);
    }
    // Boiler Maintains END

    // Boiler work START
    static async listMenuBoiler() {
        return await Http.get('/boiler/work/subsection');
    }

    static async getExpertListDynam(params: Object) {
        return await Http.get(
            '/thepropertycarework/bureaux/etude/list',
            params
        );
    }

    static async sendDeviseInstallation(params: Object) {
        return await Http.post('/boiler/work/contact/reparation', params);
    }

    static async calculCostBoiler(params: Object) {
        return await Http.post('/boiler/work/estimate', params);
    }

    static async addCaracteristicBoiler(params: Object) {
        return await Http.post('/boiler/work/property/add', params);
    }

    static async saveWorkBoiler(params: Object) {
        return await Http.post('/boiler/work/publish', params);
    }

    static async listChoiceCategoryBoiler(idTypeOfWork: number) {
        return await Http.get(
            `/category/choice/bysubsection/list?id=${idTypeOfWork}`
        );
    }
    static async sendMailForDemandBoiler(params: object) {
        return await Http.post('/boiler/work/contact/for/boiler', params);
    }
    static async contactHomeGrade() {
        return await Http.post('/boiler/work/contact/home/grade');
    }

    // Boiler work END

    // Check if property is has Boiler or Tank
    static async checkIfHasBoiler(params: object) {
        return await Http.post('/theproperty_work/have/boiler', params);
    }

    // EMERGENCY's work START
    static async getListElectricienEmergency() {
        return await Http.get('/thepropertyurgentwork/electrician/list');
    }
    static async getListPlumberEmergency() {
        return await Http.get('/thepropertyurgentwork/plumber/list');
    }
    static async contactExpertEmergency(params: object) {
        return await Http.post('/thepropertyurgentwork/contact', params);
    }
    static async postRegisterEmergencyWork(params: object) {
        return await Http.post('/thepropertyurgentwork/publish', params);
    }
    // EMERGENCY's work END

    // Work Transformation START
    static async typeOfWorkList() {
        return await Http.get('/work/processing/typeofwork/list');
    }
    static async subSectionList(params: object) {
        return await Http.get('/subsection/bytypeofwork/list', params);
    }
    static async choiceCategoryList(params: object) {
        return await Http.get('/category/choice/bysubsection/list', params);
    }
    static async modelList(params: object) {
        return await Http.get('/model/bychoicecat/list', params);
    }
    static async subModelList(params: object) {
        return await Http.get('/submodel/bymodel/list', params);
    }
    static async listExpTrans() {
        return await Http.get('/user/provider/work/list');
    }
    static async contactExpTrans(params: object) {
        return await Http.post(
            '/work/processing/external/provider/contact',
            params
        );
    }
    static async rulesApplicable(params: object) {
        return await Http.post('/work/rules/list', params);
    }
    static async saveTrans(params: object) {
        return await Http.post('/work/processing/estimation/save', params);
    }

    // Work Transformation END
}
