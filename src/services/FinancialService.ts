import { Http, HttpCalcul } from './http';
export default class Financial {
    static async getPriceEvolution(params: any) {
        return await Http.get('/immogo/estimation', params);
    }
    static async getSellingPrice(params: {theProperty: number}) {
        return await Http.get('/calcul/new_sales', params as any);
    }
    /**
     *
     * @start COUT ANNUEL
     */
    static async getPropertyPerUser() {
        return await Http.get('/the_property/per_user');
    }
    static async getTotalRevenu(theProperty: number) {
        return await Http.get('/total_revenu', {theProperty} as any);
    }
    static async updateTotalRevenu(params: any) {
        return await Http.post('/total_revenu', params);
    }

    static async getConsumerData(params: any) {
        return await Http.post('/the_property/use/consumption', params);
    }
    static async getConsumption(params: any) {
        return await Http.post('/the_property/consumption/list', params);
    }

    static async getDetailsOfTank(params: any) {
        return await Http.get(
            `/theproperty_work/next/list?thePropertyId=${params}`
        );
    }

    static async updateFinanceHelpDetails(params: any) {
        return await Http.post('/assistance_obtaineds', params);
    }

    static async updateCopropertyDatas(id: number, params: any) {
        return await Http.put(`/the_property/${id}`, params);
    }

    static async filterCopropertyAmount(params: {
        ['date[after]']: string;
        ['theProperty.id']: number;
    }) {
        return await Http.get(`condominium_fees`, params as any);
    }
    /**
     * @end
     *****************************************************************/

    /**
     * @start CALCUL
     */
    static async getSaleConstants(page: number = 1, itemsPerPage: number = 10) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.get(`/calcul/sale_constants`, {
            page,
            itemsPerPage,
        } as any);
    }

    static async postSale(params: any) {
        console.log(params);
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.post('/sales', params);
    }
    static async postNewSale(params: any) {
        console.log(params);
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.post('/new_sales', params);
    }
    static async postCredit(params: any) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.post(`/credits`, params);
    }
    static async postNewCredit(params: any) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.post(`/new_credits`, params);
    }
    static async getCreditCalcul(params: any) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.get(`/credit_adds`, params);
    }

    static async getCapitalGainConstants(
        page: number = 1,
        itemsPerPage: number = 10
    ) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        return await HttpCalcul.get(`/plus_value_constants`, {
            page,
            itemsPerPage,
        } as any);
    }
    static async postCapitalGainConstants(params: any) {
        // HttpCalcul.setBaseUrl(import.meta.env.VITE_API_CALCUL);
        // return await HttpCalcul.post(`/calcul/plus_values`, params);
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_BASE_URL);
        return await HttpCalcul.post(`/calcul/plus_values`, params);
    }
    /**
     * @end CALCUL
     *****************************************************************/

    /**
     * @start SIMULATION
     */

    static async simulateBank(params: any) {
        HttpCalcul.setBaseUrl(import.meta.env.VITE_API_BASE_URL);
        return await HttpCalcul.post('/bank/simulation/all', params);
    }

    static async chooseBank(params: any) {
        return await Http.post('/simulation/bank/add', params);
    }

    static async getChosenBank(params: any) {
        return await Http.get('/simulation/bank/list', params);
    }

    /**
     * @end SIMULATION
     *****************************************************************/

    /**
     * @start TAX COMMUNALE
     */

     static async getTaxes(params?: any) {
        return await Http.get('/municipal_taxes', params);
    }
    static async updateTaxes(id: string, params: any) {
        return await Http.put(`/the_property/${id}/municipal-tax`, {
            municipalTax: params
        } as any);
    }
    /**
     * @end TAX COMMUNALE
     *****************************************************************/
}