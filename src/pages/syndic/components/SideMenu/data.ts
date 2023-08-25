import { defineAsyncComponent } from 'vue';

const Plots = defineAsyncComponent(() => import('@/pages/syndic/components/Plots/index.vue'));
const GeneralMeetings = defineAsyncComponent(() => import('@/pages/syndic/components/GeneralMeetings/index.vue'));
const Documents = defineAsyncComponent(() => import('@/pages/syndic/components/Documents/index.vue'));
const Tchat = defineAsyncComponent(() => import('@/pages/syndic/components/Tchat/index.vue'));
const AccountReport = defineAsyncComponent(() => import('@/pages/syndic/components/AccountAuditor/Report.vue'));
const AccountCommunication = defineAsyncComponent(() => import('@/pages/syndic/components/AccountAuditor/Communication.vue'));
const CouncilReport = defineAsyncComponent(() => import('@/pages/syndic/components/Council/Report.vue'));
const CouncilCommunication = defineAsyncComponent(() => import('@/pages/syndic/components/Council/Communication.vue'));
const SyndicProfile = defineAsyncComponent(() => import('@/pages/syndic/components/SyndicProfile/index.vue'));
const CurrentExpenses = defineAsyncComponent(() => import('@/pages/syndic/components/Accounting/CurrentExpenses.vue'));
const ExtraordinaryExpenses = defineAsyncComponent(() => import('@/pages/syndic/components/Accounting/ExtraordinaryExpenses.vue'));
const Total = defineAsyncComponent(() => import('@/pages/syndic/components/Accounting/Total.vue'));
const Proposition = defineAsyncComponent(() => import ('@/pages/syndic/components/Proposition/Proposition.vue'));

interface SubMenu {
    id: number,
    label: string,
    name?: string,
    routeName?:string,
    icon?: string,
    component?: object
}
interface ISideMenu {
    id: number,
    label: string,
    name?: string,
    icon?: string,
    subMenu?: SubMenu[],
    component?: object
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: "Liste des lots et propriétaires",
        name: "plots-and-owners",
        icon: 'SquareList',
        component: Plots
    },
    {
        id: 1,  
        label: "Assemblées générales",
        name: "general-meeting",
        icon: 'Meetings',
        component: GeneralMeetings
    },
    {
        id: 2,  
        label: "Documents",
        name: "syndic-doc-list",
        icon: 'FileLines',
        component: Documents
    },
    {
        id: 3,
        label: "Comptabilité",
        name: "accounting",
        icon: 'Accounting',
        subMenu: [
            {
                id: 31,
                label: "Dépenses courantes",
                name: "current-expenses",
                component: CurrentExpenses,
            },
            {
                id: 32,
                label: "Dépenses extraordinaires",
                name: "extraordinary-expenses",
                component: ExtraordinaryExpenses,
            },
            {
                id: 33,
                label: "Total",
                name: "total",
                component: Total,
            },
        ]
    },
    {
        id: 4,
        label: "Chat",
        name: "tchat",
        icon: 'ChatDouble',
        component: Tchat
    },
    {
        id: 5,
        label: "Propositions",
        name: "proposition",
        icon: "Proposition",
        component: Proposition
    },
    {
        id: 6,
        label: "Conseil de copropriété",
        name: "co-ownership-council",
        icon: 'Quotes',

        subMenu: [
            {
                id: 61,
                label: "Rapport",
                name: "council-report",
                component: CouncilReport
            },
            {
                id: 62,
                label: "Autre communication",
                name: "council-communication",
                component: CouncilCommunication
            }
        ]
    },
    {
        id: 7,
        label: "Commissaire aux comptes",
        name: "account-auditor",
        icon: 'Auditor',
        subMenu: [
            {
                id: 71,
                label: "Rapport",
                name: "account-report",
                component: AccountReport
            },
            {
                id: 72,
                label: "Autre communication",
                name: "account-communication",
                component: AccountCommunication
            }
        ]
    },
    // {
    //     id: 8,
    //     label: "Titulaire du compte",
    //     name: "syndic-profile",
    //     icon: 'UserCocolis',
    //     component: SyndicProfile
    // },
]