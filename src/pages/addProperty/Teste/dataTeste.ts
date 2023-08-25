import teste1 from '@/pages/addProperty/Teste/teste1.vue';
import teste2 from '@/pages/addProperty/Teste/teste2.vue';
import teste3 from '@/pages/addProperty/Teste/teste3.vue';
import teste4 from '@/pages/addProperty/Teste/teste4.vue';
import teste5 from '@/pages/addProperty/Teste/teste5.vue';
import teste6 from '@/pages/addProperty/Teste/teste6.vue';
import teste7 from '@/pages/addProperty/Teste/teste7.vue';
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
        title: 'Menu 1',
        content: [
            {
                id: 0,
                title: "Teste 1",
                component: teste1,
                contentFields: [
                    {
                        label: 'testeLabel1',
                        name: 'testeLabel1',
                        type: ''
                    },
                ]
            },
            {
                id: 1,
                title: "Teste 2",
                component: teste2,
                contentFields: [
                    {
                        label: 'testeLabel2',
                        name: 'testeLabel2',
                        type: ''
                    },
                ]
            },
            {
                id: 2,
                title: "Teste 3",
                component: teste3,
                contentFields: [
                    {
                        label: 'testeLabel3',
                        name: 'testeLabel3',
                        type: ''
                    },
                ]
            },
            {
                id : 3,
                title : "Teste 4",
                component : teste4,
                contentFields: [
                    {
                        label: 'testeLabel4',
                        name: 'testeLabel4',
                        type: ''
                    },
                ]
          },
        ]
    },
    {
        title: 'Menu 2',
        content: [
            {
                id: 4,
                title: "Teste 5",
                component: teste5,
                contentFields: [
                    {
                        label: 'testeLabel5',
                        name: 'testeLabel5',
                        type: ''
                    },
                ]
            },
            {
                id: 5,
                title: "Teste 6",
                component: teste6,
                contentFields: [
                    {
                        label: 'testeLabel6',
                        name: 'testeLabel6',
                        type: ''
                    },
                ]
            },
        ]
    },
    {
        title: 'Menu 3',
        content: [
            {
                id: 6,
                title: "Teste 7",
                component: teste7,
                contentFields: [
                    {
                        label: 'testeLabel7',
                        name: 'testeLabel7',
                        type: ''
                    },
                ]
            },
        ]
    }
]