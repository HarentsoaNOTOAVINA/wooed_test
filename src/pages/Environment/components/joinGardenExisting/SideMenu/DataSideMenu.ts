import Actor from "@/pages/Environment/components/joinGardenExisting/Actor.vue"
import Pitch from '@/pages/Environment/components/Pitch.vue';
import ProjectDisplay from "@/pages/Environment/components/joinGardenExisting/ProjectDisplay.vue"
import RequestInformation from "@/pages/Environment/components/joinGardenExisting/RequestInformation.vue"
import SendApplication from "@/pages/Environment/components/joinGardenExisting/SendApplication.vue"

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
    name: string,
    icon?: string,
    subMenu?: SubMenu[],
    component?: object
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: "Terrain",
        name: "pitch",
        icon: 'Pitch',
        component: Pitch
    },
    {
        id: 1,
        label: "Acteurs",
        name: "actor",
        icon: 'Actor',
        component: Actor
    },
    {
        id: 2,
        label: "Présentation du projet",
        name: "projectDisplay",
        icon: 'ProjectDisplay',
        component: ProjectDisplay
    },
    {
        id: 3,
        label: "Demander des informations complémentaires",
        name: "requestInformation",
        icon: 'RequestInformation',
        component: RequestInformation
    },
    {
        id: 4,
        label: "Envoyer sa candidature",
        name: "sendApplication",
        icon: 'SendApplication',
        component: SendApplication
    },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')