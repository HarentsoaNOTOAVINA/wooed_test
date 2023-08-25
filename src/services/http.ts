import axios, { AxiosRequestConfig, AxiosError, AxiosStatic } from 'axios';
import routes from '@/routes/index';
import store from '@/store/index';

const MAX_TIMOUT = import.meta.env.VITE_MAX_TIMEOUT;

/**
 * @start CONFIG TOKEN
 * @desc inject token from localStorage into hearder on each request
 */
if (localStorage.getItem('token')) {
    (axios as AxiosStatic).defaults.headers.common['Authorization'] =
        localStorage.getItem('token') as string;
} else {
    delete (axios as AxiosStatic).defaults.headers.common['Authorization'];
}
/**
 * @end CONFIG TOKEN
 */

/**
 * @start AXIOS CONFIG
 */
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.timeout = MAX_TIMOUT;
/**
 * @end AXIOS CONFIG
 */

// Add this interceptor to handle 403 error globally
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response?.status === 403) {
        
        store.dispatch('ErrorModule/setAbonnementError', {
            abonnementError: true
        });
    }
    return Promise.reject(error);
});

export class Http {
    static setBaseUrl(url: string) {
        axios.defaults.baseURL = url;
    }

    static async get(
        url: string,
        params?: AxiosRequestConfig<any>
    ): Promise<any> {
        try {
            const { data } = await axios.get(url, { params });
            return data;
        } catch (e) {
            if ((e as AxiosError).response?.status === 401) {
                // routes.push('/connexion');
                localStorage.clear()
                window.location.href = `${window.location.origin}/connexion`
                return;
            } else if (
                (e as AxiosError).response?.status === 500 ||
                (e as AxiosError).response?.status === 404 ||
                (e as AxiosError).code === 'ECONNABORTED'
            ) {
                store.dispatch('ErrorModule/setError', {
                    errorStatus:
                        (e as AxiosError).response?.status ||
                        (e as AxiosError).code,
                });
                routes.push('/error');
            }
            const error = e as AxiosError;
            throw error.response;
        }
    }

    static async post(
        url: string,
        params?: AxiosRequestConfig<any>
    ): Promise<any> {
        console.log('POST >>>>>>>>>>>> http', params);

        try {
            const { data , status } = await axios.post(url, params);
            return { data , status };
        } catch (e) {
            const error = e as AxiosError;
            throw error.response;
        }
    }

    static async put(url: string, dataParams: AxiosRequestConfig<any>): Promise<any> {
        try {
            const res = await axios.put(url, dataParams);
            return res;
        } catch (e) {
            const error = e as AxiosError;
            throw error.response;
        }
    }

    static async patch(url: string, dataParams: AxiosRequestConfig<any>): Promise<any> {
        try {
            const res = await axios.patch(url, dataParams);
            return res;
        } catch (e) {
            const error = e as AxiosError;
            throw error.response;
        }
    }

    static async putt(url: string, payload: AxiosRequestConfig<any>): Promise<any> {
        try {
            const response = await axios.put(url, payload);
            return response;
        } catch (e) {
            const error = e as AxiosError;
            throw error.response;
        }
    }

    static async getWithQueryParams(url: string, params: any) {
        let formatted_params = '?';
        const p = Object.keys(params);
        p.forEach((elt) => {
            formatted_params += `${elt}=${params[elt]}&`;
        });
        formatted_params += ';';
        formatted_params = formatted_params.replace('&;', '');

        console.log(formatted_params);
        return this.get(url + formatted_params);
    }

    static async delete(url: string, id?: any): Promise<any> {
        try {
            const data = await axios.delete(url, id);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return error.response;
        }
    }
}

export class HttpCalcul extends Http{}
