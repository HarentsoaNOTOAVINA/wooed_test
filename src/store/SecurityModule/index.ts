import { SecurityService } from "@/services/securityService";
import { createFormData } from "@/utils/formdata/formData";

const mutationsType = {
    GET_NEIGHTBORHOOD : 'GET_NEIGHTBORHOOD',
    GET_ALL_ALARM_SERCURITY : 'GET_ALL_ALARM_SERCURITY',
    GET_CAMERA_SURVEILLANCE : 'GET_CAMERA_SURVEILLANCE',
    CREATE_ALARM : 'CREATE_ALARM',
    CREATE_CAMERA : 'CREATE_CAMERA',
    GET_ALARM_TYPE : 'GET_ALARM_TYPE',
    GET_CAMERA_TYPE : 'GET_CAMERA_TYPE',
    DELETE_CAMERA : 'DELETE_CAMERA',
    DELETE_ALARM : 'DELETE_ALARM',
    DECLARATION_CAMERA : 'DECLARATION_CAMERA',
    DECLARATION_ALARM : 'DECLARATION_ALARM',
}

export const state = {
    listOfNeightborhood : null,
    listAlarmSecurity : null,
    listCameraSurveillance : null,
    alarmType : null,
    cameraType : null,
}

export const mutations = {
    [mutationsType.GET_NEIGHTBORHOOD](state : any, payload : Array<any>){
        state.listOfNeightborhood = payload;
    },

    [mutationsType.GET_ALL_ALARM_SERCURITY](state : any, paylaod : Array<any>){
        state.listAlarmSecurity = paylaod;
    },

    [mutationsType.GET_CAMERA_SURVEILLANCE](state : any, payload : Array<any>){
        state.listCameraSurveillance = payload;
    },

    [mutationsType.CREATE_ALARM](state : any, payload : any){
        state.listAlarmSecurity = [
            payload,
            ...state.listAlarmSecurity
        ];
    },

    [mutationsType.CREATE_CAMERA](state : any, payload : any){
        state.listCameraSurveillance = [
            payload,
            ...state.listCameraSurveillance
        ];
    },

    [mutationsType.GET_ALARM_TYPE](state : any, payload : any){
        state.alarmType = payload;
    },

    [mutationsType.GET_CAMERA_TYPE](state : any, payload : any){
        state.cameraType = payload;
    },

    [mutationsType.DELETE_CAMERA](state : any, payload : string | number){
        state.listCameraSurveillance = state.listCameraSurveillance.filter((item : any) => item.id !== payload);
    },

    [mutationsType.DELETE_ALARM](state : any, payload : string | number){
        state.listAlarmSecurity = state.listAlarmSecurity.filter((item : any) => item.id !== payload);
    },

    [mutationsType.DECLARATION_CAMERA](state : any, payload : {idCamera : number, data : {declarationDate : string}}){
        state.listCameraSurveillance = state.listCameraSurveillance.map((item : any) => {
            if(item.id === payload.idCamera){
                return {
                    ...item,
                    ...payload.data
                }
            }else{
                return item;
            }
        })
    },

    [mutationsType.DECLARATION_ALARM](state : any,  payload : {idAlarm : number, data : {declarationDate : string}}){
        state.listAlarmSecurity = state.listAlarmSecurity.map((item : any) => {
            if(item.id === payload.idAlarm){
                return {
                    ...item,
                    ...payload.data
                }
            }else{
                return item;
            }
        })
    }

}

export const actions = {
    async getNeightborhood({commit} : any, payload : number){
        const {data} = await SecurityService.getListOfNeighborhood(payload);
        commit(mutationsType.GET_NEIGHTBORHOOD, data);
        return data;
    },

    async getAllCamera({commit} : any, payload : number){
        const {data} = await SecurityService.getCameraSecurity(payload);
        commit(mutationsType.GET_CAMERA_SURVEILLANCE, data);
        return data;
    },

    async getAllAlarm({commit} : any, payload : number){
        const { data } = await SecurityService.getAlarmSecurity(payload);
        commit(mutationsType.GET_ALL_ALARM_SERCURITY, data);
        return data;
    },

    async createAlarm({commit} : any, payload : any){
        const { data } = await SecurityService.createAlarmSecurity(createFormData(payload));
        commit(mutationsType.CREATE_ALARM, data.data);
        return data;
    },

    async createCamera({commit} : any, payload : any){
        const { data } = await SecurityService.createCameraSecurity(createFormData(payload));
        commit(mutationsType.CREATE_CAMERA, data.data);
        return data;
    },

    async getCameraType({commit} : any){
        const { data } = await SecurityService.getCameraType();
        commit(mutationsType.GET_CAMERA_TYPE, formatSelect(data));
        return formatSelect(data);
    },

    async getAlarmType({commit} : any){
        const { data } = await SecurityService.getAlarmType();
        commit(mutationsType.GET_ALARM_TYPE, formatSelect(data));
        return formatSelect(data);
    },

    async declarationCamera({commit} : any, payload : string | number){
        const {data} = await SecurityService.declaration({surveillanceCamera : payload})
        console.log("Déclaration\n", data);
        commit(mutationsType.DECLARATION_CAMERA, {idCamera : payload, data : data.data})
        return data;
    },

    async declarationAlarme({commit} : any, payload : string | number){
        const { data } = await SecurityService.declaration({alarmSystem : payload})
        console.log("Déclaration\n", data);
        commit(mutationsType.DECLARATION_ALARM, {idAlarm : payload, data : data.data});
        return data;
    },

    async deleteCamera({commit} : any, payload : string | number){
        const {data} = await SecurityService.deleteCamera(payload);
        commit(mutationsType.DELETE_CAMERA, payload);
        return data;
    },

    async deleteAlarm({commit} : any, payload : string | number){
        const { data } = await SecurityService.deleteAlarm(payload);
        commit(mutationsType.DELETE_ALARM, payload);
        return data;
    }

}

export const getters = {
    getAllNeightborhood(state : any){
        return state.listOfNeightborhood;
    },

    getAllAlarmSercurity(state : any){
        return state.listAlarmSecurity;
    },

    getListCameraSurveillance(state : any){
        return state.listCameraSurveillance;
    },
    
    getAlarmType(state : any){
        return state.alarmType;
    },

    getCameraType(state : any){
        return state.cameraType;
    },
}


function formatSelect(value : Array<any>) : Array<any>{
    let newArray : Array<any> = [];
    value.map((item : any) => newArray = [...newArray, {label : item.name, value : item.name}])
    return newArray
}