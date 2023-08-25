
import Consumer from "@/pages/finance/Consumer/Consumer.vue";
import Help from "@/pages/finance/help/FinancialHelpPageContent.vue";
import PropertyTax from "@/pages/finance/property-tax/propertyTax.vue";
import CopropertyCharge from "@/pages/finance/CopropertyCharge/CopropertyCharge.vue";
import MonthlyLoanPayment from '@/pages/finance/MonthlyLoanPayment/MonthlyLoanPayment.vue';
import FinreInsurance from '@/pages/finance/FireInsurance/FireInsurance.vue';
import MunicipalityTax from '@/pages/finance/MunicipalityTax/MunicipalityTax.vue';
// import CleanGarden from "@/pages/finance/CleaningGardening/CleaningGardening.vue";
// FRAIS D'AQUISITION
import Sale from '@/pages/finance/Sale/Sale.vue'
import Credit from '@/pages/finance/Credit/Credit.vue'
import SaleCredit from "../SaleCredit/SaleCredit.vue";
import PlusValue from "../PlusValue/PlusValue.vue";
interface ISideMenu{
    id : number;
    label : string;
    name : string;
    icon ?: string
    component ?: object
}

// Frais d'aquisition
export const acquisitionFee: ISideMenu[] = [
    {
        id : 0,
        label : "Plus value",
        name : "plusValue",
        icon : "PlusValue",
        component : PlusValue
    },
]

// Frais de vente
export const sellingFee: ISideMenu[] = [
    {
        id : 1,
        label : "Vente",
        name : "sale",
        icon : "FinancialRessources",
        component : Sale
    },
    {
        id : 2,
        label : "Crédit",
        name : "credit",
        icon : "Tax",
        component : Credit
    },
    {
        id : 3,
        label : "Vente et crédit",
        name : "saleCredit",
        icon : "SaleCredit",
        component : SaleCredit
    },
]

// Cout annuel de mon bien
export const dataSideMenu : ISideMenu[] = [
    {
        id : 0,
        label : "Aides",
        name : "help",
        icon : "Help",
        component : Help
    },
    {
        id : 1,
        label : "Mensualité du crédit",
        name : "credyMonthly",
        icon : "CreditCard",
        component : MonthlyLoanPayment

    },
    {
        id : 2,
        label : "Précompte immobilier",
        name : "immobilingDeposit",
        icon : "FinancialRessources",
        component : PropertyTax

    },
    {
        id : 3,
        label : "Taxe communal",
        name : "municipalTax",
        icon : "Tax",
        component : MunicipalityTax
    },
    {
        id : 4,
        label : "Consommation",
        name : "consumer",
        icon : "Bill",
        component : Consumer
    },
    {
        id : 5,
        label : "Charge de copropriété",
        name : "accomodationCharge",
        icon : "Bills",
        component : CopropertyCharge

    },
    // {
    //     id : 6,
    //     label : "TOTAL",
    //     name : "totalAmount",
    //     icon : "AddOptions",

    // },
    // {
    //     id : 6,
    //     label : "Assurance incendie",
    //     name : "fireInsurance",
    //     icon : "AssuranceFire",
    //     component : FinreInsurance

    // },
    // {
    //     id : 8,
    //     label : "Nettoyage et Jardinage",
    //     name : "gardening",
    //     icon : "WateringCan",
    //     component : CleanGarden

    // }
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge');