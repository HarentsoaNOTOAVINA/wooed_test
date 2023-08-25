import QuarterCommitteeList from "@/pages/community/QuarterCommittee/QuarterCommitteeList.vue";
import Service from "@/pages/community/Services/Services.vue";
import Education from "@/pages/community/Education/Education.vue";
import Consultation from "@/pages/community/Consultation/Consultation.vue";

interface ISideMenu{
    id : number;
    label : string;
    name : string;
    icon ?: string
    component ?: object
}
 

export const dataSideMenu : ISideMenu[] = [
    {
        id : 0,
        label : "Consultation",
        name : "Consultation",
        icon : "Consultation",
        component : Consultation
    },
    {
        id : 1,
        label : "Comité de quartier",
        name : "quarterCommittee",
        icon : "QuarterCommittee",
        component : QuarterCommitteeList

    },
    {
        id : 2,
        label : "Divers services",
        name : "Service",
        icon : "Service",
        component : Service

    },
    {
        id : 3,
        label : "Education",
        name : "Education",
        icon : "Education",
        component : Education
    },
]