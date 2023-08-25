import { Http } from "./http";

export class SecurityService{
    static async getListOfNeighborhood(params : number){
        return await Http.get(`/neighborhood-officers/by-the-property/${params}`)
    }

    static async getAlarmSecurity(params : number){
        return await Http.get(`/alarm-system?theProperty=${params}`);
    }

    static async getCameraSecurity(params : number){
        return await Http.get(`/surveillance-camera?theProperty=${params}`)
    }

    static async createAlarmSecurity(params : any){
        return await Http.post('/alarm-system', params);
    }

    static async createCameraSecurity(params : any){
        return await Http.post('/surveillance-camera', params);
    }

    static async getCameraType(){
        return await Http.get('/surveillance-camera-type');
    }

    static async getAlarmType(){
        return await Http.get('/type-of-alarm-system');
    }

    static async declaration(params : any){
        return await Http.post('/security/declaration-date', params);
    }

    static async deleteCamera(params : number | string){
        return await Http.delete(`/surveillance-camera/${params}`);
    }

    static async deleteAlarm(params : number | string){
        return await Http.delete(`/alarm-system/${params}`);
    }
}