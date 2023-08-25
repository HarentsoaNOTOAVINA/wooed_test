import Image from "@/pages/addProperty/components/Confirmation/Image.vue";
import GeneralInfo from "@/pages/addProperty/components/Confirmation/GeneralInfo.vue";
import Address from "@/pages/addProperty/components/Confirmation/Address.vue";
import Price from "@/pages/addProperty/components/Confirmation/Price.vue";
import Description from "@/pages/addProperty/components/Confirmation/Description.vue";
import Visite from "@/pages/addProperty/components/Confirmation/Visite.vue";
import DetailedInformation from "@/pages/addProperty/components/Confirmation/DetailedInformation.vue";
import Inside from "@/pages/addProperty/components/Confirmation/Interieur.vue";
import Caracteristic from "@/pages/addProperty/components/Confirmation/Caracteristic.vue";

interface DataSell {
    id: number,
    title: string,
    name?: string,
    type?: string,
    component: object,
    componentModal?: object,
}

const dataSell: DataSell[] = [
    {
        id: 1,
        title: 'Annonce',
        name: 'image',
        type: 'image',
        component: Image
    },
    {
        id: 2,
        title: 'Description sommaire du bien ',
        component: Description
    },
    {
        id: 3,
        title: 'Information de base',
        component: GeneralInfo
    },
    {
        id: 4,
        title: 'Adresse',
        component: Address
    },
    {
        id: 5,
        title: 'Prix',
        component: Price
    },
    {
        id: 5,
        title: 'Informations detaillées',
        component: DetailedInformation
    },
    // {
    //     id: 6,
    //     title: 'Intérieur',
    //     component: Inside
    // },
    {
        id: 7,
        title: 'Caractéristique énergetique',
        component: Caracteristic
    },
    // {
    //     id: 6,
    //     title: 'Visites',
    //     component: Visite
    // },
]


export const groundData : DataSell[] = [
    {
        id: 1,
        title: 'Annonce',
        name: 'image',
        type: 'image',
        component: Image
    },
    {
        id: 2,
        title: 'Description',
        component: Description
    },
    {
        id: 3,
        title: 'Information de base',
        component: GeneralInfo
    },
    {
        id: 4,
        title: 'Adresse',
        component: Address
    },
    {
        id: 5,
        title: 'Prix',
        component: Price
    },
    {
        id: 6,
        title: 'Caractéristique énergetique',
        component: Caracteristic
    },
]

export default dataSell