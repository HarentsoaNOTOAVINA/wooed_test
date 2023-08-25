export const state = {
    actionType: 'edit'
};


export const mutations = {
 
    mutationActionType(state : any, payload : any){
        state.actionType = payload
    },

};

export const actions = {
    setActionType({ commit }: any, actionType: string) {
        commit('mutationActionType', actionType);
    },
};

export const getters = {
  
    getActionType(state:any) {
        return state.actionType;
    },
};


