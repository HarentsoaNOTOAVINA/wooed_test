import { params } from './../pages/make-offer/formulaire/dataFormMakeOffer';
import { Http } from './http';

export default class UserService {
    static async login(params: Object) {
        return await Http.post('/login_check', params);
    }

    static async signup(params: Object) {
        return await Http.post('/auth/signup', params);
    }

    static async validate(params: Object) {
        return await Http.post(`/auth/validate/account/${(params as any).id}`);
    }
    // test to immo back api
    static async getPropertyType() {
        return await Http.get('/theproperty/property-type/list');
    }

    static async confirmMail(params: { url: string; email: string }) {
        return await Http.post('/auth/forgotpassword', params);
    }

    static async reinitializePassword(params: {
        token: string;
        password: string;
    }) {
        return await Http.post('/auth/reinitialisepassword', params as any);
    }

    static async editPassword(params: {
        lastPassword: string;
        newPassword: string;
    }) {
        return await Http.post('/auth/editpassword', params as any);
    }

    static async getAllUser() {
        return await Http.get('/users');
    }
    
    static async getAllSolicitations() {
        return await Http.get('/users/solicitations');
    }
    static async getPromo() {
        return await Http.get('/user_service_promos');
    }

    static async checkEmail(params : any) {
        return await Http.get(`/user/by/mail?email=${params.email}`)
    }

}

// auth/signup
