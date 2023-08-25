import miniMailBoxService from "@/services/miniMailBoxService";
import { responsiveArray } from "ant-design-vue/lib/_util/responsiveObserve";


export const state = ()=>({
    messsages : [],
    categories : [],

})

export const mutations = {
    setMessageList(state : any, payload : []){
        state.messsages = payload;
    },
    setCategories(state :  any, payload : []){
        state.categories = payload ; 
    }
}

export const actions = {
    getMessages({commit} : any,payloads: any){
        const rsp  = miniMailBoxService.getMessages(payloads);
        rsp.then(({data}) =>{
            if(Array.isArray(data)){
                console.log("from store", data);
                commit("setMessageList", data);
            }else{
                if (data.mailMessage) {
                commit("setMessageList", data.mailMessage);

                }
            }
        })

    },
    getMailCategories({commit} : any){
        const resp = miniMailBoxService.getCategories();
        resp.then(({data, code} : any)=>{
            if (code === 200) {
                commit('setCategories',data);
            }
        })
    }

}

export const getters = {
    getMessageList(state  : any){
        return state.messsages;
    },
    getCategoryList(state : any){
        return state.categories;
    }
}