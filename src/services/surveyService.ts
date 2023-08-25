import { Http } from '@/services/http';


export default class SurveyService{
    static async createSurvey(params : any){
        return await Http.post('/polls', params);
    }

    static async mySurvey(){
        return await Http.get('/polls');
    }

    static async voteSurvey(params : any){
        return await Http.post('/poll/vote/add_date', params);
    }

    static async getDetailsSurvey(params : string | number){
        return await Http.get(`/polls/${params}`);
    }

    static async inviteParticipant(params : any){
        return await Http.post('/polls/invitation', params);
    }

    static async updateVote(params: any){
        return await Http.put('/poll/vote/remove_date', params);
    }

    static async listEmail(){
        return await Http.get('/user/emails');
    }

    static async deleteSurvey(params : number | string){
        return await  Http.delete(`/polls/${params}`);
    }

    static async reserveDateSurvey(params : any){
        return await Http.post('/poll/reserve_dates', params);
    }
}