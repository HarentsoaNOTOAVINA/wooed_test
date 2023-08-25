import { A } from 'vitest/dist/global-fe52f84b';
import { CommunityService } from './../../services/communityService';
import { createFormData } from "@/utils/formdata/formData";

enum Action{
    ADD = 'ADD',
    MINUS = 'MINUS'
}

const mutationTypes = {
    GET_LIST_COMMUNITY : 'GET_LIST_COMMUNITY',
    GET_DETAILS_COMMUNITY : 'GET_DETAILS_COMMUNITY',
    GET_NEW_PUBLICATION : 'GET_NEW_PUBLICATION',
    GET_ALL_PUBLICATION : 'GET_ALL_PUBLICATION',
    ON_CLICK_LIKE : 'ON_CLICK_LIKE',
    ON_DELETE_PUBLICATION : 'ON_DELETE_PUBLICATION',
    GET_LIST_COMMENTS : 'GET_LIST_COMMENTS',
    UPDATE_NUMBER_COMMENT : 'UPDATE_NUMBER_COMMENT',
    GET_CONSULTATION : "GET_CONSULTATION",
    GET_DIVERS_SERVICES : "GET_DIVERS_SERVICES",
    UPDATE_LIST_CONSULTATION : "UPDATE_LIST_CONSULTATION",
    UPDATE_LIST_PUBLICATION : "UPDATE_LIST_PUBLICATION",
    GET_COMMITTEE_ID : 'GET_COMMITTEE_ID', 
    UPDATE_VOTE_PARTY : 'UPDATE_VOTE_PARTY',
    UPDATE_VOTE_STATUS : 'UPDATE_VOTE_STATUS',
    UPDATE_SERVICE_LIST_RESPONSE : 'UPDATE_SERVICE_LIST_RESPONSE',
    UPDATE_SERVICE_LIST_STATUS : 'UPDATE_SERVICE_LIST_STATUS',
    CLEAR_DETAILS_PUBLICATION : 'CLEAR_DETAILS_PUBLICATION',
    UPDATE_PRESENTS_HOUSE_WARNING : 'UPDATE_PRESENTS_HOUSE_WARNING',
    UPDATE_PURCHASE_INSCRITS : 'UPDATE_PURCHASE_INSCRITS',
    FILTER_PUBLICATION : 'FILTER_PUBLICATION',
    VOTE_PLP : 'VOTE_PLP',
    CHANGE_STATUS_PLP : 'CHANGE_STATUS_PLP', 
}

export const state = {
    listCommunity : null,
    detailsCommunity : null,
    detailsPublication : null,
    allPublication : [],
    listComment : null,
    listConsultation : [],
    listDiversServices : null,
    communityId : null,
}

export const mutations = {
    [mutationTypes.GET_LIST_COMMUNITY](state : any, payload : any){
        state.listCommunity = payload;
    },

    [mutationTypes.GET_DETAILS_COMMUNITY](state : any, payload : any){
        state.detailsCommunity = payload;
    },

    [mutationTypes.GET_NEW_PUBLICATION](state : any, payload : any){
        state.detailsPublication = {
            ...state.detailsPublication,
            ...payload,
            ...JSON.parse(localStorage.getItem('consultations') || '{}')
        }
    },

    [mutationTypes.GET_ALL_PUBLICATION](state : any, payload : any){
        state.allPublication = payload;
    },

    [mutationTypes.ON_CLICK_LIKE](state : any, payload : number | string){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === +payload){
                return {
                    ...item,
                    likes : {
                        number : item.likes.isLiked === false ? item.likes.number +1 : item.likes.number -1,
                        isLiked : !item.likes.isLiked
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.ON_DELETE_PUBLICATION](state : any, payload : string | number){
        state.allPublication = state.allPublication.filter((item: any) => item.id !== payload);
        // state.listConsultation = state.listConsultation.filter((item : any) => item.id !== payload);
    },

    [mutationTypes.GET_LIST_COMMENTS](state : any, paylaod : any){
        state.listComment = paylaod;
    },

    [mutationTypes.UPDATE_NUMBER_COMMENT](state : any, payload : {idPost : number, action : string}){
        if(payload.action === Action.ADD){
            state.allPublication = state.allPublication.map((item : any) => {
                if(item.id === payload.idPost){
                    return {
                        ...item,
                        totalComments : item.totalComments + 1
                    }
                }else{
                    return item;
                }
            })
        }else{
            state.allPublication = state.allPublication.map((item : any) => {
                if(item.id === payload.idPost){
                    return {
                        ...item,
                        totalComments : item.totalComments - 1
                    }
                }else{
                    return item;
                }
            })
        }
    },

    [mutationTypes.GET_CONSULTATION](state : any, payload : any){
        state.listConsultation = payload;
    },

    [mutationTypes.GET_DIVERS_SERVICES](state : any, payload : any){
        state.listDiversServices = payload;
    },
    
    [mutationTypes.UPDATE_LIST_CONSULTATION](state : any, payload : any){
        state.listConsultation = [
            payload.data,
            ...state.listConsultation
        ]
    },
    [mutationTypes.UPDATE_LIST_PUBLICATION](state : any, payload : any){
        state.allPublication = [
            payload.data,
            ...state.allPublication
        ]
    },

    [mutationTypes.GET_COMMITTEE_ID](state : any, payload : string){
        state.communityId = payload;
    },

    [mutationTypes.UPDATE_VOTE_PARTY](state : any, payload : {idPost : number , data : any}){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.idPost){
                return {
                    ...item,
                    party : {
                        ...item.party,
                        votes : payload.data
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.UPDATE_VOTE_STATUS](state : any, payload : {status : string, idPost : number}){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.idPost){
                return {
                    ...item,
                    party : {
                        ...item.party,
                        status : payload.status
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.UPDATE_SERVICE_LIST_RESPONSE](state : any, payload : any){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.id){
                
                return {
                    ...item,
                    service : {
                        ...item.service,
                        responses : payload.service.responses
                    }
                };
            }else{
                return item;
            }
        })
    },

    [mutationTypes.UPDATE_SERVICE_LIST_STATUS](state : any, payload : any){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.id){
                return {
                    ...item,
                    service : {
                        ...item.service,
                        status : payload.service.status
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.CLEAR_DETAILS_PUBLICATION](state : any){
        state.detailsPublication = null;
    },

    [mutationTypes.UPDATE_PRESENTS_HOUSE_WARNING](state : any, payload : {idPost : number, present : {isPresent : true, present : any}}){
        if(payload.present.isPresent){
            state.allPublication = state.allPublication.map((item : any) => {
                if(item.id === payload.idPost){
                    return {
                        ...item,
                        houseWarming : {
                            ...item.houseWarming,
                            isPresent : payload.present.isPresent,
                            presents : [
                                ...item.houseWarming.presents,
                                payload.present.present
                            ]                            
                        }
                    }
                }else{
                    return item;
                }
            })
        }else{
            state.allPublication = state.allPublication.map((item : any) => {
                if(item.id === payload.idPost){
                    // item.houseWarming.presents.filter((p : any) => p.id !== payload.present.present.id);
                    return {
                        ...item,
                        houseWarming : {
                            ...item.houseWarming,
                            isPresent : payload.present.isPresent,   
                            presents : item.houseWarming.presents.filter((p : any) => p.id !== payload.present.present.id)                      
                        }
                    }
                }else{
                    return item;
                }
            })
        }
    },

    [mutationTypes.UPDATE_PURCHASE_INSCRITS](state : any, payload : {idPost : number, inscrits : {isRegistered : boolean, user : any}}){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.idPost){
                if(payload.inscrits.isRegistered){
                    return {
                        ...item,
                        purchase : {
                            ...item.purchase,
                            isRegistered : payload.inscrits.isRegistered,
                            inscrits : [
                                payload.inscrits.user,
                                ...item.purchase.inscrits
                            ]
                        }
                    }
                }else{
                    return {
                        ...item,
                        purchase : {
                            ...item.purchase,
                            isRegistered : payload.inscrits.isRegistered,
                            inscrits : item.purchase.inscrits.filter((u : any) => u.id !== payload.inscrits.user.id)
                        }
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.FILTER_PUBLICATION](state : any, payload : string){
        state.allPublication = state.allPublication.filter((item : any) => item.type === payload);
    },

    [mutationTypes.VOTE_PLP](state : any, payload : {post : number, votes : any}){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload.post){
                return {
                    ...item,
                    plp : {
                        ...item.plp,
                        votes : payload.votes
                    }
                }
            }else{
                return item;
            }
        })
    },

    [mutationTypes.CHANGE_STATUS_PLP](state : any, payload : number){
        state.allPublication = state.allPublication.map((item : any) => {
            if(item.id === payload){
                return {
                    ...item,
                    plp : {
                        ...item.plp,
                        status : "Sended"
                    }
                }
            }else{
                return item;
            }
        })
    }

}

export const actions = {
    async getListOfCommunity({commit, state} : any){
        const {data, status} = await CommunityService.getListOfCommunity();
        if(!Array.isArray(data)){
            const details = await CommunityService.getDetailOfCommunity(data.idCommittee);
            commit(mutationTypes.GET_LIST_COMMUNITY, null);
            commit(mutationTypes.GET_DETAILS_COMMUNITY, details.data);
        }else{
            commit(mutationTypes.GET_DETAILS_COMMUNITY, null);
            commit(mutationTypes.GET_LIST_COMMUNITY, data);
        }
    },

    async createCommunity({commit, state} : any, params : any){
        const {data} = await CommunityService.createCommunity(params);
        return data;
    },

    async joinCommunity({commit, state}: any, params : any){
        const {data} = await CommunityService.joinCommunity({idCommittee : params});
        return data;
    },

    async leaveCommunity({commit, state} : any, params : any){
        const {data} = await CommunityService.leaveCommunity({idCommittee : params});
        commit(mutationTypes.GET_DETAILS_COMMUNITY, null);
        commit(mutationTypes.GET_LIST_COMMUNITY, null);
        return data;
    },
    getDetailsPublication({commit} : any, payload : any){
        commit(mutationTypes.GET_NEW_PUBLICATION, payload);
    },

    async createPost({commit, state} : any){
        if(state.detailsPublication){
            const {data} = await CommunityService.createPost(createFormData(state.detailsPublication));
            commit(mutationTypes.UPDATE_LIST_PUBLICATION, data);
            commit(mutationTypes.CLEAR_DETAILS_PUBLICATION);
            return data;
        }
    },

    async getAllPublication({commit} : any, payload : any){
        const { data } = await CommunityService.getAllPublication(payload);
        commit(mutationTypes.GET_ALL_PUBLICATION, data);
        return data;
    },

    async updatePublication({commit} : any, payload : {id : string | number, data : any}){
        const { data } = await CommunityService.updatePublication(payload);
        return data;
    },

    async deletePublication({commit} : any, payload : string | number){
        await CommunityService.deletePublication(payload)
        .then((res : any) => {
            commit(mutationTypes.ON_DELETE_PUBLICATION, payload);
            return res;
        })
    },

    async likePublication({commit} : any, payload : string | number){
        commit(mutationTypes.ON_CLICK_LIKE, payload);
        const {data} = await CommunityService.likePublication({post : payload});
        return {data};
    },

    async getAllComment({commit} : any, payload : string | number){
        const {data} = await CommunityService.getListOfComment(payload);
        commit(mutationTypes.GET_LIST_COMMENTS, data);
        return data;
    },

    async createComment({commit} : any, payload : {post : number | string, content : string}){
        const {data} = await CommunityService.postCommnet(payload);
        commit(mutationTypes.GET_LIST_COMMENTS, data);
        commit(mutationTypes.UPDATE_NUMBER_COMMENT, {
            idPost : payload.post,
            action : Action.ADD
        })
        return data;
    },

    async getDetailsOfCommunity({commit} : any, payload : string){
        const {data} = await CommunityService.getDetailOfCommunity(payload);
        commit(mutationTypes.GET_DETAILS_COMMUNITY, data);
        return data;
    },

    async deleteComment({commit} : any, payload : {idPost : number, idComment : number}){
        const {data} = await CommunityService.deleteComment(payload.idComment);
        commit(mutationTypes.UPDATE_NUMBER_COMMENT, {idPost : payload.idPost, action : Action.MINUS});
        return data;
    },

    async getConsultation({commit} : any, payload : any){
        const {data} = await CommunityService.getCommunityConsultation(payload);
        commit(mutationTypes.GET_ALL_PUBLICATION, data.data);
        localStorage.setItem('consultations', JSON.stringify(payload));
        return data;
    },

    async getDiversServices({commit} : any, payload : any){
        const { data } = await CommunityService.getDiversService(payload);
        localStorage.setItem('consultations', JSON.stringify(payload));

        commit(mutationTypes.GET_ALL_PUBLICATION, data.data);
        return data.data;
    },

    async postCommunity({commit} : any, payload : any){
        const {data, status} = await CommunityService.postCommunity(payload);
        if(status === 201){
            commit(mutationTypes.UPDATE_LIST_PUBLICATION, data);
        }

        return data;
    },

    async voteConsultation({commit} : any, payload : {isFor : boolean, post : number}){
        const {data} = await CommunityService.voteConsultation(payload)
        return data;
    },

    getCommunityId({commit} : any, payload : string){
        commit(mutationTypes.GET_COMMITTEE_ID, payload);
    },

    async responseService({commit} : any, payload : {post : number, isOk: boolean}){
        const {data} = await CommunityService.responceServices(payload);
        return data;
    },

    async voteParty({commit} : any, payload : {post : number, isFor: boolean}){
        const {data} = await CommunityService.voteParty(payload);
        
        commit(mutationTypes.UPDATE_VOTE_PARTY, {idPost : payload.post, data : data.data.votes});
        return data;
    },

    async validateParty({commit} : any, payload : { id : number, status : number}){
        let dataToPost : {id : number, data : any} = {id : 0, data : null};
        switch (payload.status) {
            case 0:
                dataToPost = {
                    id : payload.id,
                    data : {status : 'Not accepted'}
                }
                break;
            case 1 :
                dataToPost = {
                    id : payload.id,
                    data : {status : "Accepted"}
                }
                break;

            default:
                break;
        }
        const { data } = await CommunityService.validateParty(dataToPost);
        commit(mutationTypes.UPDATE_VOTE_STATUS, {
            ...data,
            idPost : payload.id
        });
        return data;
    },

    async responseServcie({commit} : any, payload : {post : number, isOk : boolean}){
        const { data } = await CommunityService.responceServices(payload);
        commit(mutationTypes.UPDATE_SERVICE_LIST_RESPONSE, data.data);
        return data;
    },

    async accepteResponse({commit} : any, payload : {post : number, response : number}){
        const { data } = await CommunityService.accepteResponse(payload);
        commit(mutationTypes.UPDATE_SERVICE_LIST_STATUS, data.data);
        return data;
    },

    async contreProposition({commit, state} : any){
        const { data } = await CommunityService.responceServices(state.detailsPublication);
        commit(mutationTypes.UPDATE_SERVICE_LIST_RESPONSE, data.data);
        return data;
    },

    async houseWarningPresent({commit} : any, payload : {post : number}){
        const {data} = await CommunityService.houseWarningPresent(payload);
        commit(mutationTypes.UPDATE_PRESENTS_HOUSE_WARNING,{idPost : payload.post, present : data.data});
        return data;
    },

    async subscribeGroupPurchase({commit} : any, payload : number){
        const {data} = await CommunityService.subscribePurchase({post : payload});
        commit(mutationTypes.UPDATE_PURCHASE_INSCRITS, {idPost : payload, inscrits : data.data})
        return data;
    },

    async filterPublication({commit} : any, payload : string){
        const { data } = await CommunityService.getDiversService(JSON.parse((localStorage as any).getItem('consultations')));
        commit(mutationTypes.GET_ALL_PUBLICATION, data.data);

        commit(mutationTypes.FILTER_PUBLICATION, payload);
    },

    async votePlp({commit} : any, payload : {isFor : boolean, post : number}){
        const { data } = await CommunityService.votePartener(payload);
        commit(mutationTypes.VOTE_PLP, data.data);
        return data;
    },

    async handleSendMailPlp({commit} : any, payload : number){
        const { data } = await CommunityService.sendEmailPlp({post : payload});
        commit(mutationTypes.CHANGE_STATUS_PLP, payload);
        console.log("data\n", data);
    },

    async handleGetConversation({commit} : any, payload : number | string){
        const {data} = await CommunityService.redirectToMessage(payload);

        return  data;
    }

}

export const getters = {    
    getListCommunity(state : any){
        return state.listCommunity;
    },

    getDetailsCommunity(state : any){
        return state.detailsCommunity;
    },

    getAllPublication(state : any){
        return state.allPublication;
    },

    getListOfComment(state : any){
        return state.listComment;
    },

    getListConsultation(state : any){
        return state.listConsultation;
    },

    getListDiversServices(state : any){
        return state.listDiversServices;
    },

    getCommunityId(state : any){
        return state.communityId;
    }
}