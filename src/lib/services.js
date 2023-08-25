import axios from 'axios';
import { HttpService } from '../services/http.service';
import { UserService } from '../services/user.service';
import { SearchService } from '../services/search.service';
import { ColisService } from '../services/colis.service';
import { ProductService } from '../services/product.service';
import { BienService } from '../services/bien.service';
import { ModelService } from '../services/model.service';
import { AlerteService } from '../services/alerte.service';
import { OffreService } from '../services/offre.service';
import { SyndicService } from '../services/syndic.service';
import { ChatService } from '../services/chat.service';
// import { EducationService } from '../services/education.service';
// Create a custom axios instance
export const instance = () => {
    const token = localStorage.getItem('token');
    const AuthStr = `bearer ${token}`;
    const headers = token
        ? {
              Authorization: AuthStr,
          }
        : {};
    var numberOfAjaxCAllPending = 1;
    const instance = axios.create({
        baseURL: process.env.BASE_URL,
        headers: headers,
    });
    // instance.onRequest((config) => {
    //     // Here we check if user is logged in
    //     // if (app.$auth.loggedIn) {
    //         // If the user is logged in we can now get the token, we get something like `Bearer yourTokenJ9F0JFODJ` but we only need the string without the word **Bearer**, So we split the string using the space as a separator and we access the second position of the array **[1]**
    //         // const token = app.$auth.strategy.token.get().split(' ')[1];
    //         const token = app.$auth.strategy.token.get().split(' ')[1];
    //         instance.setToken(token, 'Bearer'); // Here we specify the token and now it works!!
    //     // }
    // });
    instance.interceptors.request.use(
        function (config) {
            config.url = config.url.replace('/api', '');
            numberOfAjaxCAllPending++;
            return config;
        },
        function (error) {
            // Pace.done()
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        function (response) {
            numberOfAjaxCAllPending--;
            if (numberOfAjaxCAllPending === 0) {
                const event = new CustomEvent('ajax-done');
                document.dispatchEvent(event);
            }
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    const Http = new HttpService(instance);
    //  Http.axios = instance

    const services = {
        simulation: new ModelService(Http, 'simulation'),
        user: new UserService(Http, 'user'),
        search: new SearchService(Http, 'search'),
        colis: new ColisService(Http, 'colis'),
        bien: new BienService(Http, 'bien'),
        abus: new BienService(Http, 'abus'),
        product: new ProductService(Http, 'product'),
        workEstimation: new BienService(Http, 'workEstimation'),
        alert: new AlerteService(Http, 'alerte'),
        offre: new OffreService(Http, 'offre'),
        rdv: new OffreService(Http, 'rdv'),
        service: new OffreService(Http, 'service'),
        society: new OffreService(Http, 'society'),
        promo: new OffreService(Http, 'promo'),
        mail: new OffreService(Http, 'mail'),
        subscription: new ModelService(Http, 'subscription'),
        mangopay: new ModelService(Http, 'mangopay'),
        visite: new ModelService(Http, 'visite'),
        prestataire: new BienService(Http, 'prestataire'),
        vivaqua: new BienService(Http, 'vivaqua'),
        markOfInterested: new BienService(Http, 'markOfInterested'),
        syndic: new SyndicService(Http, 'syndic'),
        chat: new ChatService(Http, 'chat'),
        bill: new ModelService(Http, 'bill'),
        calculation: new ModelService(Http, 'calculation'),
        education: new ModelService(Http, 'education'),
    };
    return { services, http: Http };
    // Inject to context as $api
};
