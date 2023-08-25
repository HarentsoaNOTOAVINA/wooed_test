import SurveyService from "@/services/surveyService"

const mutationsType = {
    GET_MY_SURVEY : 'GET_MY_SURVEY',
    GET_DETAILS_SURVEY  : 'GET_DETAILS_SURVEY',
    GET_LIST_EMAIL : 'GET_LIST_EMAIL',
    DELETE_SURVEY : 'DELETE_SURVEY',
    INVITATION : 'INVITATION',
    CLEAR_SURVEY : 'CLEAR_SURVEY', 
    CREATE_SURVEY : 'CREATE_SURVEY',
    VOTE_SURVEY : 'VOTE_SURVEY',
}


export const state = {
    mySurvey : [],
    detailsSurvey : null,
    listEmail : null,
}


export const mutations = {
    [mutationsType.GET_MY_SURVEY](state : any, payload : any){
        state.mySurvey = payload;
    },

    [mutationsType.GET_DETAILS_SURVEY](state : any, payload : any){
        state.detailsSurvey = payload;
    },

    [mutationsType.GET_LIST_EMAIL](state : any, payload : any){
        state.listEmail = payload;
    },

    [mutationsType.DELETE_SURVEY](state : any, payload : number | string){
        state.mySurvey = state.mySurvey.filter((item : any) => item.id !== payload);
    },

    [mutationsType.INVITATION](state : any, payload : {pollId : number, data : any}){
        // state.mySurvey = state.mySurvey.forEach((element : any) => {
        //     if(element.id === payload.pollId){
        //         element.participants = payload.data.participants
        //     }
        // });

        state.detailsSurvey = {
            ...state.detailsSurvey,
            participants : payload.data.participants
        }

    },

    [mutationsType.CLEAR_SURVEY](state : any){
        state.mySurvey = [];
    },

    [mutationsType.CREATE_SURVEY](state : any, payload : any){
        state.mySurvey = [
            ...state.mySurvey,
            payload
        ]
    },

    [mutationsType.VOTE_SURVEY](state : any, payload : {id : number, data : any}){
        console.log("Payload\n",payload);
        console.log("State\n", state.detailsSurvey);
        
        state.detailsSurvey.dates = state.detailsSurvey.dates.map((item: any) => {
            if(item.id === payload.id){
                console.log("ittem\n", item);
                
                let indexToDelete : number = 0;
                let exist : boolean = false;
                item.votes.forEach((vote : any, indexVote : number) => {
                    if(vote.author.email === payload.data.author.email){
                        indexToDelete = indexVote;
                        exist = true
                    }
                });

                if(exist){
                    console.log("Efa misy\n", indexToDelete);
                    // return item.votes.splice(indexToDelete, 1);
                    return {
                        ...item,
                        // votes : item.votes.splice(indexToDelete, 1)
                        votes : item.votes.filter((v : any) => v.author.email !== payload.data.author.email)
                    }
                }else{
                    console.log("Mbola tsy misy");
                    
                    return {
                        ...item,
                        votes : [
                            ...item.votes,
                            payload.data
                        ]
                    }
                }

            }else{
                return item
            }
        });
    }
}


export const actions = {
    async createSurvey({commit} : any, params : any){
        const { data } = await SurveyService.createSurvey(params);
        console.error(data);
        commit(mutationsType.CREATE_SURVEY, data.data);
        return data;
    },

    async getMySurvey({commit} : any){
        const {data} = await SurveyService.mySurvey();
        commit(mutationsType.GET_MY_SURVEY, data);
        return data;
    },

    async getDetailsSurvey({commit} : any, payload : string | number){
        const { data } = await SurveyService.getDetailsSurvey(payload);
        commit(mutationsType.GET_DETAILS_SURVEY, data);
        return data;
    },

    async inviteParticipant({commit} : any, payload : any){
        const { data } = await SurveyService.inviteParticipant(payload);
        commit(mutationsType.INVITATION, {pollId : payload.pollId, data : data.data})
        return data.data;
    },

    async updateVote({commit} : any, payload : any){
        const { data } = await SurveyService.updateVote(payload);
        return data;
    },

    async getListEmail({commit} : any){
        const { data } = await SurveyService.listEmail();
        commit(mutationsType.GET_LIST_EMAIL,  formatOptions(data));
        return formatOptions(data);
    },

    async deleteSurvey({commit} : any, payload : string | number){
        const { data } = await SurveyService.deleteSurvey(payload);
        commit(mutationsType.DELETE_SURVEY, payload);
        return data;
    },

    async reserveDateSurvey({commit} : any, payload : any){
        const { data } = await SurveyService.reserveDateSurvey(payload);
        return data;
    },

    async voteSurvey({commit} : any, payload : any){
        const { data } = await SurveyService.voteSurvey(payload);
        commit(mutationsType.VOTE_SURVEY, {
            id : payload.date,
            data : data.data
        })
        console.error("Ito ilay vote\n", data);
        return data;
    }
}

export const getters = {
    getMySurvey(state : any){
        return state.mySurvey;
    },

    getDetailsSurvey(state : any){
        return state.detailsSurvey;
    },

    getEmailList(state : any){
        return state.listEmail;
    }
}

function formatOptions(data : Array<any>) : Array<any>{
    let newArray : Array<any> = [];
    data.forEach((item) => {
        newArray = [
            ...newArray,
            {
                ...item,
                label : item.firstname + ' ' + item.name,
                value : JSON.stringify(item)
            }
        ]
    })
    return newArray;
}