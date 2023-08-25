import LocationData from "@/pages/rentalManagement/components/LocationData/LocationData.vue";
import Documents from "@/pages/rentalManagement/components/Documents/Documents.vue";
import StatusAdmin from "@/pages/rentalManagement/components/StatusAdmin/StatusAdmin.vue";

interface ISideMenu {
    id: number;
    label: string;
    name: string;
    icon?: string;
    query?: string;
    component?: object;
    url?: string; 
}

export const dataSideMenu: ISideMenu[] = [
    {
        id: 0,
        label: "Données",
        name: "data",
        icon: "FinancialRessources",
        query: "donnees",
        component: LocationData
    },
    {
        id: 1,
        label: "Documents",
        name: "documents",
        icon: "Document",
        query: "documents",
        component: Documents
    },
    {
        id: 2,
        label: "Status administratif",
        name: "administrativeStatus",
        icon: "Status",
        query: "status-administratif",
        component: StatusAdmin
    },
]
