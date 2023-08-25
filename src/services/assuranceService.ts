import { Http } from './http';

export class AssuranceService {
    static async getComparaison() {
        return await Http.get('/insurance/home_insurance/simulation/compare');
    }

    static async postSimulation(params: {theProperty: number, value: number, propertyType: string, cover?: Array<any>}) {
        return await Http.post('/insurance/home_insurance/simulation', params as any);
    }

    static async postMaifSimulation(params: any) {
        return await Http.post('/insurance/maif/simulation', params as any);
    }
}