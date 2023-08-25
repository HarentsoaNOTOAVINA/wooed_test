import axios from 'axios';
class WMSService{
    static async getWithQueryParams(url: string, params: any) {
        let formatted_params = '?';
        const p = Object.keys(params);
        p.forEach((elt) => {
            formatted_params += `${elt}=${params[elt]}&`;
        });
        formatted_params += ';';
        formatted_params = formatted_params.replace('&;', '');

        console.log(formatted_params);
        return axios.get(url + formatted_params);
    }

    static WalloniesService(url : string, options : any){
        return this.getWithQueryParams(url, options );
    }
}

export default WMSService;