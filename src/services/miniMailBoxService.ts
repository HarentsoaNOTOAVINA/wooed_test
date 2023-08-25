import { Http } from "./http"; 

export default class MiniMailBox{
    static async getMessages(params : any){
        return Http.getWithQueryParams("/mail_mini/mail/box", params);   
    }
    static async getCategories(){
        return Http.get("mail_mini/mail/category");
    }
    // mini boite email 
    static async getEmailsList(id: any){
        return Http.get(`/mail/emails?inbox.id=${id}`);
    }
    static async getEmailsItem(id: any){
        return Http.get(`/mail/emails/${id}`);
    }
    static async postEmails(params : any){
        return Http.post("/mail/emails", params);
    }
    static async replyEmail(id : any, params: any){
        return Http.post(`/mail/emails/${id}/reply`, params);
    }
    static async getInboxesById(id: any){
        return Http.get(`/mail/inboxes?userId=${id}`);
    }
    static async getEmailByInboxes(id: number){
        return Http.get(`/mail/inboxes/${id}/emails`);
    }
    static async getInboxes(){
        return Http.get("/mail/inboxes");
    }
    static async createInbox(params: any){
        return Http.post("/mail/inboxes", params);
    }
    static async downloadFile(id: any){
        return Http.get(`/mail/attachments/${id}/download`);
    }
}

