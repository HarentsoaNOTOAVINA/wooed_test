import Environment from "@/services/EnvironmentService";

interface ItankDeclaration{
    location : string;
    capacity : string;
    region ?: string;
    
}
interface IprocessFields{
    "Bruxelles-capitale" ?: object;
    wallonie ?: object;
    flandres ?: object;
}

interface Iitem {
    id: number,
    label: string,
    type: string,
    data: any,
}
interface IPprocess{
    currentStatus ?: string;
    currentStatusID ?: any;
    created ?: string;  
    statusData ?:{[key : string] : any} 
}

interface IState{
    tankDeclarationData : ItankDeclaration;
    ProcessFields : IprocessFields;
    waterTreatmentDeclaration : object;
    permitList  : any[];
    permitId : number;
    TankObligationData  : any[];
    Permitprocess ?: IPprocess
}
const ProcessFields : string[] = ['EffectiveDate','UltimateDate']

export const state : IState = {
    tankDeclarationData : {
        location : 'enfouie',
        capacity : '1B'
    },
    waterTreatmentDeclaration: {},
    ProcessFields : {},
    permitList: [],
    permitId : -1,
    TankObligationData: [],
    Permitprocess  : {
        currentStatusID : 0
    }
}



export const mutations = {
    setPermitPRocessData( state :  IState, payload : any){
    state.Permitprocess = {
            ...state.Permitprocess,
            currentStatus : payload.status,
            created : payload.created,
            statusData : payload.status === 'requestSent' 
                ?  {}
                : ProcessFields.map((field : string)=> ({
                ...state.Permitprocess?.statusData,
                ...{ 
                    [field] : payload[`${state.Permitprocess?.currentStatus}${field}`]
                }
            }))
        };
    },
    setPermitId(state : IState, payload : number){
        state.permitId = payload;
    },
    setTankCapacity(state : IState, payload : string){
        state.tankDeclarationData.capacity = payload;
    },
    setTankLocation(state : IState, payload : string){
        state.tankDeclarationData.location = payload;
    },
    updateWaterTreatementData(state: any, payload: any) {
        state.waterTreatmentDeclaration = { ...state.waterTreatmentDeclaration, ...payload };
    },
    updatePermitList(state: any, payload: any) {
        state.permitList = payload;
    },
    updateTankObligationData(state: any, payload: any) {
        state.TankObligationData = payload;
    }
} 
export const getters = {
    getPErmitProcessCurrentStatus(stat : IState){
        return state.Permitprocess?.currentStatus;
    },
    getTankDeclarationData(state : IState){
        return state.tankDeclarationData;
    },
    getRegion(state : IState){
        return state.tankDeclarationData.region;
    },
    getWaterTreatmentData(state: any) {
        return state.waterTreatmentDeclaration;
    },
    getProcessFields(state : IState){
        const region  = state.tankDeclarationData.region?.toLowerCase();
        // const region : string  = "flandres";
        let result = null;
        switch (region) {
            case 'bruxelles-capitale':
                result =  state.ProcessFields["Bruxelles-capitale"];
                break;
            case 'wallonie':
                result =  state.ProcessFields["wallonie"];
                break;
            case 'flandres':
                result =  state.ProcessFields["flandres"];
                break;
            default:
                result =  state.ProcessFields["Bruxelles-capitale"]
                break;
        }
        return result;
    },
    getPermitList(state: any) {
        return state.permitList;
    },
    getTankObligationData(state: any) {
        return state.TankObligationData;
    },
    getPermitProcessData(state: IState) {
        return state.Permitprocess;
    },
    
}

export const actions = {
    setRegion({state ,rootState} : any){
        const __rootState = rootState.PropertyDetailModule;
        if(!!__rootState.propertyDetail?.data?.region){
            state.tankDeclarationData.region = __rootState.propertyDetail.data.region
        }else if(__rootState.myPropertySelected?.region){
            state.tankDeclarationData.region = __rootState.myPropertySelected.region
        }else{
            state.tankDeclarationData.region = ""
        }
    },
    async getEnvironmentalStatus({rootState} :  any, payload: any){
        const {data,success} = await Environment.fetchEnvironMentalStatus(payload)
            if(success){
                return data;
            }else{
                return success
            }  
    },
    async getFloodStatus(_ : any, payload : any){
        const {data,success} = await Environment.fetchFloodStatus(payload)
            if(success){
                return data;
            }else{
                return success
            }
    },
    async postRegisterData(_ : any, {payload, callback} : any){
        const {data,success} = await Environment.postRegisterData(payload)
        if (data.success) {
            callback();            
        }
    },
    async getPermitForm({state ,rootState} : any){
            // const region = "Bruxelles-capitale";
        let region : string = state.tankDeclarationData.region ;
        // const __rootState = rootState.PropertyDetailModule;
        // if(!!__rootState.propertyDetail?.data?.region){
        //     region = __rootState.propertyDetail.data.region
        // }else if(__rootState.myPropertySelected?.region){
        //     region = __rootState.myPropertySelected.region
        // }else{
        //     region = ""
        // }
        try {
            if(!!region){
                return new Promise(async (resolve, reject) =>{
                const payload = {
                    'type' : 'citerne',
                    'category.name' : (state as IState).tankDeclarationData.capacity,
                    'emplacement' : (state as IState).tankDeclarationData.location,
                    'category.region.name' : region
                }
            const {data,success} = await Environment.fetchPermitForm(payload);
            if(success && data.length){
                resolve(data[0].filePath);  
            }else{
                reject(new Error("data not found"))
            }
            });
            }else{
                throw new Error("data not found");
            }
        }catch (error) {
            throw error;
        }
        
    },
    setWaterTreatmentData({ commit }: any, payload: any) {
        commit("updateWaterTreatementData", payload);
    },

    async getWaterTreatmentFile({ commit }: any, payload: any) {
        let response = await Environment.fetchWaterTreatmentDeclaration(payload);
        return response.data[0]
    },

    async postWaterTreatmentDeclaration({ state }: any) {
        let payload = state.waterTreatmentDeclaration;
        let formData = new FormData();        
        formData.append('file', payload.file);
        formData.append('theProperty', payload.theProperty);
        return await Environment.postPermitData(payload)
    },

    async fetchTankObligationData({ commit }: any, payload: any) {
        let response = await Environment.fetchTankObligationList(payload);
        let data = response.data;
        for (let idx in data) {
            data[idx].content = JSON.parse(data[idx].content);
            data[idx].obligation = JSON.parse(data[idx].obligation);
        }
        data = formatObligationData(data);
        commit('updateTankObligationData', data);
    },

    async fetchPermitList({ commit }: any, payload: any) {
        let response = await Environment.fetchPermitList(payload);
        commit('updatePermitList', response.data)
        return response.data
    },
    async postPermitData( _ : any, {payload, callback} : any){
        const {data,success} = await Environment.postPermitData(payload)
        if (data.success) {
            callback();            
        }
    },
    async fetchProcessFields({state , rootState} : any){
        const __rootState = rootState.PropertyDetailModule;
        if(!!__rootState.propertyDetail?.data?.region){
            state.tankDeclarationData.region = __rootState.propertyDetail.data.region
        }else if(__rootState.myPropertySelected?.region){
            state.tankDeclarationData.region = __rootState.myPropertySelected.region
        }else{
            state.tankDeclarationData.region = ""
        }
        try {
            const {data,success} = await Environment.fetchProcessFields();
            if (success) {
                (state as IState).ProcessFields = {...state.ProcessFields, ...data}
            }
        } catch (error : any) {
            throw new Error(error);   
        }
            
    },
    async fetchPermitProcess({commit} : any,id : number | string){

            const {data, success} = await Environment.fetchPermitProcess({theProperty : id})
            if(success){
                const _data = data?.length ?  data[0]?.permitPropertyProcedure : {};
                commit('setPermitPRocessData', _data);
                commit('setPermitId', +data[0]?.id);

            }else{
                throw new Error(data.message);
            }
    },
    async updateProcessStep({state} : any, payload: any ){
        const  {data} = await Environment.updateProcessStep((state as IState).permitId,payload.data);
        if(data.success){
            payload.callback();
        }
    }
}

function formatObligationData(data: any) {
    let obligationList: any[] = [];
    data.forEach((element: any) => {
        let contents = element.content;
        let obligationItems = element.obligation.items;
        obligationItems.forEach((item: any) => {
            if(contents) item.content = contents.filter((content: any) => content.itemID === item.id)
        });
        if (obligationList.length === 0) {
            if (element.obligation.titre.length > 1) {
                obligationList.push(element.obligation);
            }
        } else {
            let titleList : string[] = [];
            obligationList.forEach((e: any) => {
                if (e.titre.length > 1) titleList.push(e.titre);
            });
            if (!titleList.includes(element.obligation.titre)) {
                if(!element.obligation.items.length) {
                    if (element.content.length === 1 && element.content[0].itemID === -1) {
                        let content = element.content[0]
                        let item : Iitem = {
                            id : content.itemID,
                            label : content.data[0].submenu[0].label,
                            type : content.type,
                            data: content.data,
                        }
                        element.obligation.items = [ ...element.obligation.items, ...[item] ]
                    } 
                }
                if (element.obligation.titre.length > 1) obligationList.push(element.obligation);
            }
        }
    })
    return obligationList
}
