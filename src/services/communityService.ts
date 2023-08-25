import { Http } from './http';
export class CommunityService{
    static async updateProfilCommunity(params: any){
        return await Http.post(`/user/profile/edit`, params);
    }
    static async getListOfCommunity(){
        return await Http.get('/community/list_committee');
    }

    static async getDetailOfCommunity(id :string){
        return await Http.get(`/community/detail_committee?idCommittee=${id}`);
    }

    static async joinCommunity(params : any){
        return await Http.post(`/community/join_committee`, params);
    }

    static async createCommunity(params : any){
        return await Http.post(`/community/new_committee`, params);
    }

    static async leaveCommunity(params : any){
        return await Http.post(`/community/quit_committee`, params);
    }

    static async createPost(params : any){
        return await Http.post(`/community/posts`, params);
    }

    static async getAllPublication(params : any){
        return await Http.get(`/community/posts?committee=${params}`)
    }

    static async updatePublication(params : {id : string | number, data : any}){
        return await Http.put(`/community/posts/${params.id}`, params.data);
    }

    static async deletePublication(params : string | number){
        return await Http.delete(`/community/posts/${params}`)
    }

    static async likePublication(params : any){
        return await Http.post('/community/posts/like', params);
    }

    static async getListOfComment(params : number | string){
        return await Http.get(`/community/post/comments?post=${params}`);
    }   

    static async postCommnet(params : any){
        return await Http.post(`/community/post/comments`, params);
    }    

    static async deleteComment(params : number){
        return await Http.delete(`/community/post/comments/${params}`);
    }

    /**
     * Consultation
     */

    static async getCommunityConsultation(params : any){
        return await Http.post('/community/consultations', params);
    }

    static async postCommunity(params : any){
        return await Http.post('/community/posts', params);
    }

    static async voteConsultation(params : any){
        return await Http.post('/community/consultation/votes', params)
    }

    /**
     * Divers services
     */
    static async getDiversService(params : any){
        return await Http.post('/community/divers_services', params);
    }

    static async voteParty(params : any){
        return await Http.post('/community/vote_party', params);
    }

    static async validateParty(params : {id : number, data : any}){
        return await Http.put(`/community/posts/${params.id}`, params.data);
    }

    static async responceServices(params : any){
        return await Http.post('/community/service/responses', params);
    }

    static async accepteResponse(params : any){
        return await Http.post('/community/conclude/service', params);
    }
    
    static async houseWarningPresent(params : any){
        return await Http.post('/community/present_in_house_warming', params)
    }

    static async subscribePurchase(params : any){
        return await Http.post('/community/grouped_purchase/register', params);
    }

    static async signalPublication(params : any){
        return await Http.post('/community/post/signal', params);
    }
    static async plp(params : any){
        return await Http.post('/community/posts', params);
    }

    static async votePartener(params : any){
        return await Http.post('/community/plp/votes', params);
    }

    static async sendEmailPlp(params : any){
        return await Http.post('/community/plp/send', params);
    }


    /**
     * chat
     */

    static async redirectToMessage(params : any){
        return await Http.get(`/conversation?user=${params}`);
    }
}