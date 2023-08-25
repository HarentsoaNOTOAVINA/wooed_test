import { Http } from '@/services/http';

export default class CollectiveGardenService {
    static async postCollectiveGardenData(params: any) {
        return await Http.post('/environment/collective_gardens', params);
    }
    static async postCollectiveGardenActor(params : any) {
        return await Http.post("/environment/actors", params);
    }
    static async postCollectiveGardenDocument(params : any) {
        return await Http.post("/environment/collective_garden/document", params);
    }
    static async updateCollectiveGardeData(id : number,params : any) {
        return await Http.put(`/environment/collective_gardens/${id}`, params);
    }
    static async postSollicitation(params : any) {
        return await Http.post("/community/posts", params);
    }
    static async checkCadastreOwner(params: any) {
        return await Http.post('/environment/cadastre/owner', params);
    }
    static async postParcelsAttributionApp(params: any) {
        return await Http.post('/environment/organicPlotRequests', params);
    }
    static async fetchParcelsAttributionDoc(params: any) {
        return await Http.get('/environment/organicPlotRequests', params);
    }
    static async fetchCollectiveGardenList() {
        return await Http.get('/environment/collective_gardens');
    }
    static async fetchMyGardenList(params: any) {
        return await Http.get('/environment/collective_gardens', params);
    }
    static async contactGardenOwner(params: any) {
        return await Http.post('/environment/collective_garden/contact_owner', params);
    }
    static async contactMunicipality(params: any) {
        return await Http.post('/environment/collective_garden/update', params);
    }
    static async fetchEnvironmentStatus(params: any) {
        return await Http.get('/brugis/catergory/by_coords', params);
    }
    static async postProjectResources(params: any) {
        return await Http.post('/environment/garden_project_resources', params);
    }
    static async postActionData(params: any) {
        return await Http.post('/environment/garden_project_actions', params)
    }
    static async fetchEnveronnmentalStatusbyCoordinates(params: any) {
        return await Http.getWithQueryParams('/brugis/catergory/by_coords', params)
    }
    static async createConversation(params: any) {
        return await Http.post('/conversations', params)
    }
    static async creatteCollectiveGardenLot(params: any) {
        return await Http.post('/environment/garden_project_actions_lot', params)
    }
    // static async creatteCollectiveGardenLot(params: any) {
    //     return await Http.patch('/environment/garden_project_actions_lot', params)
    // }
    static async fetchCollectiveGardenAccounting(params: any) {
        return await Http.getWithQueryParams('environment/garden_project_actions_lot_account', params)
    }
    

}