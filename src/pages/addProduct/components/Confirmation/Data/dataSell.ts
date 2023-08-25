import Image from "@/pages/addProduct/components/Confirmation/Image.vue";
import GeneralInfo from "@/pages/addProduct/components/Confirmation/GeneralInfo.vue";
import Address from "@/pages/addProduct/components/Confirmation/Address.vue";
import Price from "@/pages/addProduct/components/Confirmation/Price.vue";
import Description from "@/pages/addProduct/components/Confirmation/Description.vue";
import Visite from "@/pages/addProduct/components/Confirmation/Visite.vue";
import DetailedInformation from "@/pages/addProduct/components/Confirmation/DetailedInformation.vue";
import Inside from "@/pages/addProduct/components/Confirmation/Interieur.vue";
import Caracteristic from "@/pages/addProduct/components/Confirmation/Caracteristic.vue";

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
        title: 'Information detaillé',
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
    {
        id: 6,
        title: 'Visites',
        component: Visite
    },
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