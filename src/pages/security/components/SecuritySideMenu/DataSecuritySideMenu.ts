import Agent from "@/pages/security/components/Agent.vue";
import Camera from "@/pages/security/components/Camera.vue";
import AddAlarmSystem from "@/pages/security/components/AddAlarmSystem.vue";
import Degradation from "@/pages/security/components/Degradation.vue";

interface ISideMenu {
    id: number;
    label: string;
    name: string;
    icon?: string
    component?: object
    url?: string; 
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: "Mon agent de quartier",
        name: "agent",
        icon: "Agent",
        component: Agent
    },
    {
        id: 1,
        label: "Caméra de surveillance",
        name: "Camera",
        icon: "Camera",
        component: Camera
    },
    {
        id: 2,
        label: "Ajout d’un système d’alarme",
        name: "alarmSystem",
        icon: "AlarmSystem",
        component: AddAlarmSystem
    },
    {
        id: 3,
        label: "Dégradations",
        name: "degradation",
        icon: "Degradation",
        component: Degradation,
        url: "https://www.police.be/fr/declaration-en-ligne"
    },
    {
        id: 4,
        label: "Partenariat local de Prévention",
        name: "partenariat",
        icon: "Partenariat",
    },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')