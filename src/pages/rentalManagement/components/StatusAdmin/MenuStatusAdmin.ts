
import ConditionExploitation from './Conditions/ConditionExploitation.vue';
import Equipment from './Equipement/Equipment.vue';
import Authorization from './Authorization/Authorization.vue';
import Obligation from './Obligation/Obligation.vue';
import ModifyAccommodation from './ModifyAccommodation/ModifyAccommodation.vue';
import CedeAccommodation from './CedeAccommodation/CedeAccommodation.vue';
import StopActivity from './StopActivity/StopActivity.vue';

export interface StatusData {
    label: string;
    icon: string;
    query: string;
    component: object;
}

export const statusData: StatusData[] = [
    {
        label: 'Equipement obligatoire',
        icon: 'Maintains',
        query: 'equipement-obligatoire',
        component: Equipment,
    },
    {
        label: 'Conditions d’exploitations',
        icon: 'Tablet',
        query: 'conditions-exploitations',
        component: ConditionExploitation,
    },
    {
        label: 'Autorisations',
        icon: 'Authorization',
        query: 'autorisations',
        component: Authorization,
    },
    {
        label: 'Obligations',
        icon: 'Obligation',
        query: 'obligations',
        component: Obligation,
    },
    {
        label: "Modifier l'hébergement",
        icon: 'Modify',
        query: 'modifier-hebergement',
        component: ModifyAccommodation,
    },
    {
        label: "Céder l'hébergement",
        icon: 'Cede',
        query: 'ceder-hebergement',
        component: CedeAccommodation,
    },
    {
        label: "Cesser l'activité",
        icon: 'Cease',
        query: 'cesser-activite',
        component: StopActivity,
    },
];