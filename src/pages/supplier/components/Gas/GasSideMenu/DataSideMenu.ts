import MyAccount from '../MyAccount.vue';
import supplierMenu from '@/pages/supplier/supplierMenu.vue';
import MyConnection from '../MyConnection.vue';
import MoveBranchement from '../BranchementWork/MoveBranchement.vue';
import StrengthenBranchement from '../BranchementWork/StrengthenBranchement.vue';
import LengthenBranchement from '../BranchementWork/LengthenBranchement.vue';
import RemoveBranchement from '../BranchementWork/RemoveBranchement.vue';
import MeterPlus from '../MeterWork/MeterPlus.vue';
import LowPresure from '../MeterWork/LowPresure.vue';
import OpenGazInstallation from '../MeterWork/OpenGazInstallation.vue';
import ModifyPower from '../MeterWork/ModifyPower.vue';
import MoveMeter from '../MeterWork/MoveMeter.vue';
import ControlMeter from '../MeterWork/ControlMeter.vue';
import CloseMeter from '../MeterWork/CloseMeter.vue';
import RemoveMeter from '../MeterWork/RemoveMeter.vue';
import ReportGazSmell from '../MeterWork/ReportGazSmell.vue';
import NoMoreGaz from '../MeterWork/NoMoreGaz.vue';
import Consumption from '../Consumption.vue';
import Supplier from '../Supplier.vue';
interface SubMenu {
    id: number,
    label: string,
    name?: string,
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
        label: "Raccordement au gaz",
        name: "connectionGas",
        icon: 'GasPipe',
        subMenu: [
            {
                id: 11,
                label: "Ma rue est-elle raccordée au gaz de ville?",
                name: "myConnection",
                component: MyConnection
            },
            {
                id: 12,
                label: "Mon compteur",
                name: "MyAccount",
                component: MyAccount
            },
        ]
    },
    {
        id: 2,
        label: "Travaux relatifs au branchement",
        name: "work",
        icon: 'GasStation',
        subMenu: [
            {
                id: 21,
                label: "Déplacer le branchement",
                name: "move",
                component: MoveBranchement
            },
            {
                id: 22,
                label: "Renforcer le branchement",
                name: "strengthen",
                component: StrengthenBranchement
            },
            {
                id: 23,
                label: "Allonger le branchement",
                name: "lengthen",
                component: LengthenBranchement
            },
            {
                id: 24,
                label: "Enlever le branchement",
                name: "remove",
                component: RemoveBranchement
            },
        ]
    },
    {
        id: 3,
        label: "Travaux relatifs au compteur",
        name: "meterWork",
        icon: 'CounterWork',
        subMenu: [
            {
                id: 30,
                label: "Placer un compteur additionnel",
                name: "meterPlus",
                component: MeterPlus
            },
            {
                id: 31,
                label: "Placement d’un boîtier impuls basse pression",
                name: "lowPresure",
                component: LowPresure
            },
            {
                id: 32,
                label: "(R)ouvrir une installation au gaz naturel/un compteur scellé(e)",
                name: "openGazInstallation",
                component: OpenGazInstallation
            },
            {
                id: 33,
                label: "Modifier la puissance",
                name: "modifyPower",
                component: ModifyPower
            },
            {
                id: 34,
                label: "Déplacer le compteur",
                name: "moveMeter",
                component: MoveMeter
            },
            {
                id: 35,
                label: "Contrôler le compteur",
                name: "controlMeter",
                component: ControlMeter
            },
            {
                id: 36,
                label: "Fermer le compteur",
                name: "closeMeter",
                component: CloseMeter
            },
            {
                id: 37,
                label: "Enlever le compteur",
                name: "removeMeter",
                component: RemoveMeter
            },
            {
                id: 38,
                label: "Signalez une odeur de gaz",
                name: "reportGazSmell",
                component: ReportGazSmell
            },
            {
                id: 39,
                label: "Je n'ai plus de gaz: que faire?",
                name: "noMoreGaz",
                component: NoMoreGaz
            },
        ]
    },
    {
        id: 4,
        label: "Consommation/Fournisseur de gaz",
        name: "supplier",
        icon: 'ElectricityEnergy',
        subMenu: [
            {
                id: 40,
                label: "Fournisseur de gaz",
                name: "gasSupplier",
                component: Supplier
            },
            {
                id: 41,
                label: "Consommation de gaz",
                name: "gasConsumption",
                component: Consumption
            },
        ]
    },
    // {
    //     id: 5,
    //     label: "Panneau solaire",
    //     name: "solarPanel",
    //     icon: 'SolarPanel',
    //     component: supplierMenu
    // },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')