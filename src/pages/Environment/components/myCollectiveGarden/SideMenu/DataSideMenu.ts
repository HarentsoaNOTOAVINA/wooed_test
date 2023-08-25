import DocumentVue from "@/components/Icon/Document.vue"
import Actor from "../Actor.vue"
import Pitch from '@/pages/Environment/components/Pitch.vue';
import ProjectDisplay from "../ProjectDisplay.vue"
import Document from "../Document.vue"
import Action from "../Action.vue"
import Resource from "../Resource.vue"
import Accounting from "../Accounting.vue"
import InvoiceList from '../Accounting/components/InvoiceList.vue';
import Chat from "../Chat.vue"
import Documentation from "../Documentation.vue"

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
        label: "Document",
        name: "document",
        icon: 'Document',
        component: Document
    },
    {
        id: 4,
        label: "Action",
        name: "action",
        icon: 'Action',
        component: Action,
    },
    {
        id: 5,
        label: "Ressources",
        name: "resource",
        icon: 'Resource',
        component: Resource
    },
    {
        id: 6,
        label: "Comptabilité",
        name: "accounting",
        icon: 'Accounting',
        component: InvoiceList
    },
    {
        id: 7,
        label: "Chat",
        name: "chat",
        icon: 'ChatDouble',
        component: Chat
    },
    // {
    //     id: 8,
    //     label: "Documentation",
    //     name: "documentation",
    //     icon: 'Documentation',
    //     component: Documentation
    // },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')