import MessageContainer from '../MessageContainer.vue';
import MessageViewerEmpty from '../MessageViewerEmpty.vue';
interface SubMenu {
    id: number,
    label: string,
    name?: string,
    icon?: string,
    component?: object,
}
interface ISideMenu {
    id: number,
    label: string,
    name?: string,
    icon?: string,
    subMenu?: SubMenu[],
    component?: object
    type?: string,
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 1,
        label: "Boite de réception",
        name: "receptionBox",
        icon: 'MessageBox',
        type: 'RECEIVED'
        // component: MessageContainer
    },
    {
        id: 2,
        label: "Envoyés",
        name: "send",
        icon: 'MessageSent',
        type: 'SENDED'
        // component: MessageViewerEmpty
    },
]

export const dataSideMenuNotSyndic: ISideMenu[] = dataSideMenu.filter(item => item.name !== 'accomodationCharge')