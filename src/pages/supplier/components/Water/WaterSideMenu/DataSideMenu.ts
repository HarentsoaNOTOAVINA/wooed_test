import MyConnection from '../MyConnection/MyConnection.vue';
import ManageNetwork from '../ManageNetwork.vue';
import RainExcess from '../RainExcess.vue';
import Supplier from '../Supplier/Supplier.vue';
import MoveBranchement from '../BranchementWork/MoveBranchement.vue';
import StrengthenBranchement from '../BranchementWork/StrengthenBranchement.vue';
import LengthenBranchement from '../BranchementWork/LengthenBranchement.vue';
import RemoveBranchement from '../BranchementWork/RemoveBranchement.vue';
import InstallControl from '../MeterWork/InstallControl.vue';
import MeterPlus from '../MeterWork/MeterPlus.vue';
import LowPresure from '../MeterWork/LowPresure.vue';
import OpenInstallation from '../MeterWork/OpenInstallation.vue';
import MoveMeter from '../MeterWork/MoveMeter.vue';
import ControlMeter from '../MeterWork/ControlMeter.vue';
import CloseMeter from '../MeterWork/CloseMeter.vue';
import RemoveMeter from '../MeterWork/RemoveMeter.vue';
import ReportProblem from '../MeterWork/ReportProblem.vue';
import WaterQuality from '../WaterQuality/WaterQuality.vue';
import CiternInstallation from '../CiternInstallation/CiternInstallation.vue';
import Consumption from '../Consumption/Consumption.vue';
import MyAccount from '@/pages/supplier/components/Gas/MyAccount.vue';

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
        id: 1,
        label: "Raccordement à l'eau",
        name: "connectionWater",
        icon: 'GasPipe',
        subMenu: [
            {
                id: 11,
                label: "Gestionnaire de réseau de distribution",
                name: "manageNetwork",
                component: ManageNetwork
            },
            {
                id: 12,
                label: "Raccordement",
                name: "myConnection",
                component: MyConnection
            },
            {
                id: 13,
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
                id: 31,
                label: "Contrôle de l’installation",
                name: "installControl",
                component: InstallControl
            },
            {
                id: 32,
                label: "Placer un nouveau compteur/un compteur additionnel",
                name: "meterPlus",
                component: MeterPlus
            },
            {
                id: 33,
                label: "Placement d’un boîtier impuls",
                name: "lowPresure",
                component: LowPresure
            },
            {
                id: 34,
                label: "(R)ouvrir une installation /un compteur scellé(e)",
                name: "openInstallation",
                component: OpenInstallation
            },
            {
                id: 35,
                label: "Déplacer le compteur",
                name: "moveMeter",
                component: MoveMeter
            },
            {
                id: 36,
                label: "Contrôler le compteur",
                name: "controlMeter",
                component: ControlMeter
            },
            {
                id: 37,
                label: "Fermer le compteur",
                name: "closeMeter",
                component: CloseMeter
            },
            {
                id: 38,
                label: "Enlever le compteur",
                name: "removeMeter",
                component: RemoveMeter
            },
            {
                id: 39,
                label: "Signalez un problème quant à la couleur, l'odeur ou le goût de votre eau potable ou quant à un problème d’approvisionnemen",
                name: "reportProblem",
                component: ReportProblem
            },
        ]
    },
    {
        id: 4,
        label: "Mon fournisseur eau",
        name: "waterSupplier",
        icon: 'SolarPanel',
        component: Supplier
    },
    {
        id: 5,
        label: "Ma consommation eau",
        name: "waterConsumption",
        icon: 'SolarPanel',
        component: Consumption
    },
    {
        id: 6,
        label: "Qualité de l’eau",
        name: "waterQuality",
        icon: 'SolarPanel',
        component: WaterQuality
    },
    {
        id: 7,
        label: "Je dispose d’un excédent d’eau de pluie",
        name: "waterExceed",
        icon: 'SolarPanel',
        component: RainExcess
    },
    {
        id: 8,
        label: "Installation d'une nouvelle citerne",
        name: "citernInstallation",
        icon: 'SolarPanel',
        component: CiternInstallation
    },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')