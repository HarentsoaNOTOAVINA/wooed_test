import { Http } from "./http";


export default class PrimeService{
    static async getAllPrimes(params : number | string){
        return await Http.get(`/prime/procedures/${params}`);
    }

    static async deletePrimes(params : number | string){
        return await Http.delete(`/prime/procedures/${params}`)
    }

    static async getDetailsProcedure(params : number | string){
        return await Http.get(`/prime/procedures/details/${params}`);
    }

    static async procedures(params : any){
        return await Http.post('/prime/procedures', params);
    }
    
    static async calculateCost(params : any){
        return await Http.post('/prime/amounts/calculation', params);
    }

    static async getListTypeofWork(){
        return await Http.get('/typeofworks');
    }

    static async getSubsection(params : number | string){
        return await Http.get(`/subsections?id=${params}`)
    }

    static async getPrime(params : object){
        return await Http.get(`/primes/search`, params)
    }

    static async getDetailsPrime(params : number | string){
        return await Http.get(`/primes/${params}`)
    }

    static async postProcedures(params : any){
        return await Http.post(`/prime/procedures`, params);
    }
}