import PropertyType from '@/pages/addProduct/components/PropertyType/PropertyType.vue';
import Property from "@/pages/addProduct/components/Property2/Property.vue";
import Adress from '@/pages/addProduct/components/Address/Address.vue';
import LivingArea from "@/pages/addProduct/components/LivingArea/LivingArea.vue";
import General from "@/pages/addProduct/components/General/General.vue";
import Photos from '@/pages/addProduct/components/Photos/Photos.vue';
import Price from '@/pages/addProduct/components/Price/Price.vue';
import Inside from '@/pages/addProduct/components/Inside/Inside.vue';
import Energy from '@/pages/addProduct/components/Energy/Energy.vue';
import Description from '@/pages/addProduct/components/Description/Description.vue';
import Documents from '@/pages/addProduct/components/Documents/Documents.vue';
import GeneralDescription from '@/pages/addProduct/components/GeneralDescription/GeneralDescription.vue'
import DetailDescription from '@/pages/addProduct/components/DetailsDescription/DetailDescription.vue'
import Visites from  "@/pages/addProduct/components/Visites/Visites.vue"
import Disponibility from "@/pages/addProduct/components/DisponibilityMinute/Disponibility.vue";
import Confirmation from "@/pages/addProduct/components/Confirmation/Confirmation.vue";
import Environment from "@/pages/addProduct/components/Envirironment/Environment.vue"
import Urbanisme from "@/pages/addProduct/components/Urbanisme/Urbanisme.vue";
import Immopass from "@/pages/addProduct/components/Immopass/Immopass.vue";
import Electric from "@/pages/addProduct/components/Electric/Electric.vue";
import WaterConnection from "@/pages/addProduct/components/WaterConnection/WaterConnection.vue";
import SewerConnection from "@/pages/addProduct/components/SewerConnection/SewerConnection.vue";
import CadastralReturn from "@/pages/addProduct/components/CadastralReturn/CadastralReturn.vue";
import Dispo from "@/pages/addProduct/components/Disponibility/Disponibility.vue";

interface ContentField {
    name: string,
    label: string | Array<string>,
    type: string,
}

interface Content {
    id: number,
    title: string | Array<string>,
    component?: object,
    contentFields?: ContentField[],
}

interface Data {
    title : string | Array<string>,
    content ?: Content[],
    component ?: object
}

export const data : Data[] = [
    {
        title: 'information de base',
        content: [
            {
                id: 0,
                title: "Type d'annonce",
                component: PropertyType,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
            {
                id: 1,
                title: "Type de biens",
                component: Property,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
            {
                id: 2,
                title: "Adresse",
                component: Adress,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
            {
                id : 3,
                title : "Superficie habitable",
                component : LivingArea,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
          },
        ]
    },
    {
        title: 'Descriptions détaillées de votre bien',
        content: [
            {
                id: 4,
                title: "Détails des pièces",
                component: General,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
            {
                id: 5,
                title: "Etat du bien",
                component: Immopass,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
        ]
    },
    {
        title: 'Disponibilité',
        content: [
            {
                id: 6,
                title: "Détails des pièces",
                component: General,
                contentFields: [
                    {
                        label: 'test',
                        name: 'test',
                        type: ''
                    },
                ]
            },
        ]
    }
]