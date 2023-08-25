import { Http } from './http';

export default class UrbanismeService {
    // ----------------- Redraw --------------------------------
    static async getListNeighborRedraw(idProperty: any) {
        return await Http.get(
            `/neighborhood/redesign/list-by/theProperty?theProperty=${idProperty}&type=urbanisme`,
            idProperty
        );
    }

    static async postDescription(params: any) {
        return await Http.post(`/community/posts`, params);
    }

    static async deleteNeighborRedraw(idNeighborhood: number) {
        return await Http.delete(`/theservices/${idNeighborhood}`);
    }
    // -------------------- End redraw ---------------------------

    //Public Inquiry START
    static async getListPublicInquiry() {
        return await Http.get('/public_inquiry/list');
    }

    static async createPublicInquiry(params: any) {
        return await Http.post('/new-project-immo/alert/new', params);
    }
    //#################### END
    //New property START
    static async getAllNewProject() {
        return await Http.get('/new-project/list');
    }
    static async getAllProjectType() {
        return await Http.get('/new-project/projecttype/list');
    }
    static async getAllProjectTypeCoords(params: any) {
        return await Http.post('/new-project/by/projecttype', params);
    }
    static async getAllCategory() {
        return await Http.get('new-project/workscategory/subfilter/list');
    }
    static async getAllProjectCategoryCoords(params: any) {
        return await Http.post(
            'new-project/by/workscategory/sub-filter',
            params
        );
    }
    static async createNewProjectAlert(params: any) {
        return await Http.post('/new-project-immo/alert/new', params);
    }

    // -------------- Urban status --------------
    static async getPrasUrbanStatus(params: any) {
        return await Http.get(
            `/pras/zone/byproperty?thePropertyId=${params.thePropertyId}&regionId=${params.regionId}`
        );
    }
    static async getPpasUrbanStatus(params: any) {
        return await Http.get(`/ppas/zone/byproperty?`, params);
    }
    
    static async getDetailsProperty(params : number){
        return await Http.get(`/the_property/${params}`);
    }
}
