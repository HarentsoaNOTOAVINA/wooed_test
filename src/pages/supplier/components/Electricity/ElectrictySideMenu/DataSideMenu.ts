import Maintains from '@/pages/supplier/components/Electricity/SolarPannel/Maintains.vue';
import MyConnection from '@/pages/supplier/components/Gas/MyConnection.vue';
import Supplier from '../Supplier.vue';
import StrengthenBranchement from '@/pages/supplier/components/Gas/BranchementWork/StrengthenBranchement.vue';
import LengthenBranchement from '@/pages/supplier/components/Gas/BranchementWork/LengthenBranchement.vue';
import RemoveBranchement from '@/pages/supplier/components/Gas/BranchementWork/RemoveBranchement.vue';
import MeterPlus from '@/pages/supplier/components/Gas/MeterWork/MeterPlus.vue';
import LowPresure from '@/pages/supplier/components/Gas/MeterWork/LowPresure.vue';
import OpenGazInstallation from '@/pages/supplier/components/Gas/MeterWork/OpenGazInstallation.vue';
import ModifyPower from '@/pages/supplier/components/Gas/MeterWork/ModifyPower.vue';
import MoveMeter from '@/pages/supplier/components/Gas/MeterWork/MoveMeter.vue';
import ControlMeter from '@/pages/supplier/components/Gas/MeterWork/ControlMeter.vue';
import CloseMeter from '@/pages/supplier/components/Gas/MeterWork/CloseMeter.vue';
import RemoveMeter from '@/pages/supplier/components/Gas/MeterWork/RemoveMeter.vue';
import MoveBranchement from '@/pages/supplier/components/Gas/BranchementWork/MoveBranchement.vue';
import PowerInterrupt from '../MeterWork/PowerInterrupt.vue';
import Consumption from '../../Gas/Consumption.vue';
import Replacement from '../SolarPannel/Replacement.vue';
import ElectricProduction from '../SolarPannel/ElectricProduction.vue';
import Community from '../SolarPannel/Community.vue';
import MyAccount from '@/pages/supplier/components/Gas/MyAccount.vue';
import Installation from '../SolarPannel/Installation/Installation.vue';
import GreenCertificate from '../SolarPannel/GreenCertificate/GreenCertificate.vue';
import GlobalCost from '../GlobalCost/GlobalCost.vue';

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
        label: "Raccordement à l'éléctricité",
        name: "connectionGas",
        icon: 'GasPipe',
        subMenu: [
            {
                id: 11,
                label: "Mon raccordement",
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
                id: 31,
                label: "Placer un compteur additionnel",
                name: "meterPlus",
                component: MeterPlus
            },
            {
                id: 32,
                label: "Placement d’un boîtier impuls basse pression",
                name: "lowPresure",
                component: LowPresure
            },
            {
                id: 33,
                label: "(R)ouvrir une installation au gaz naturel/un compteur scellé(e)",
                name: "openGazInstallation",
                component: OpenGazInstallation
            },
            {
                id: 34,
                label: "Modifier la puissance",
                name: "modifyPower",
                component: ModifyPower
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
                label: "Interruption de courant",
                name: "powerInterrupt",
                component: PowerInterrupt
            },
        ]
    },
    {
        id: 4,
        label: "Consommation/Fournisseur d'éléctricité",
        name: "supplier",
        icon: 'ElectricityEnergy',
        subMenu: [
            {
                id: 41,
                label: "Fournisseur d'éléctricité",
                name: "electricitySupplier",
                component: Supplier
            },
            {
                id: 42,
                label: "Consommation d'éléctricité",
                name: "electricityConsumption",
                component: Consumption
            },
        ]
    },
    {
        id: 5,
        label: "Panneaux solaires",
        name: "solarPanel",
        icon: 'SolarPanel',
        subMenu: [
            {
                id: 51,
                label: "Installation",
                name: "installation",
                component: Installation
            },
            {
                id: 52,
                label: "Entretient",
                name: "entretient",
                component: Maintains
            },
            {
                id: 53,
                label: "Remplacement",
                name: "replacement",
                component: Replacement
            },
            {
                id: 54,
                label: "Mon compteur << vert >>",
                name: "injectionMeter",
                component: MyAccount
            },
            {
                id: 55,
                label: "Ma production éléctrique",
                name: "electricProd",
                component: ElectricProduction
            },
            {
                id: 56,
                label: "Communauté",
                name: "community",
                component: Community
            },
            {
                id: 57,
                label: "Mes certificats verts",
                name: "greenCard",
                component: GreenCertificate
            },
        ]
    },
    {
        id: 6,
        label: "Coût global de ma consommation éléctrique",
        name: "globalCost",
        icon: 'CounterWork',
        component: GlobalCost
    }
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')