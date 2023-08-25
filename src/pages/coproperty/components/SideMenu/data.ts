import { defineAsyncComponent } from 'vue';

const GeneralMeetings = defineAsyncComponent(() => import('@/pages/coproperty/components/GeneralMeetings/index.vue'));
const AccountReport = defineAsyncComponent(() => import('@/pages/coproperty/components/AccountAuditor/Report.vue'));
const CouncilReport = defineAsyncComponent(() => import('@/pages/coproperty/components/Council/Report.vue'));
const Proposition = defineAsyncComponent(() => import ('@/pages/coproperty/components/Proposition/Proposition.vue'));
const CoProperty = defineAsyncComponent(() => import ('@/pages/coproperty/components/CoProperty/index.vue'));

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
    // {
    //     id: 0,
    //     label: "Copropriété",
    //     name: "coproperty",
    //     icon: 'SquareList',
    //     component: CoProperty
    // },
    {
        id: 1,  
        label: "Assemblées générales",
        name: "general-meeting",
        icon: 'Meetings',
        component: GeneralMeetings

        // LISTE PAR ANNEE des PV
    },
    {
        id: 3,
        label: "Propositions",
        name: "proposition",
        icon: "Proposition",
        component: Proposition
    },
    {
        id: 4,
        label: "Conseil de copropriété",
        name: "co-ownership-council",
        icon: 'Quotes',
        component: CouncilReport
    },
    {
        id: 6,
        label: "Commissaire aux comptes",
        name: "account-auditor",
        icon: 'Auditor',
        component: AccountReport
    },
]