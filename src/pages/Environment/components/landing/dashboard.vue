<script lang='ts' setup>
import {ref,reactive, onMounted,onBeforeMount, computed} from 'vue';
import {Steps as aSteps, Step as aStep} from "ant-design-vue";

import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import InnondationIcon from "@/components/Icon/Environment/innondation.vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
   
const store = useStore();
const route = useRoute()
const status = ref<any>([
        {
            label : "Statut environnemental du bien",
            type : "category"
        },
        {
            label : "Inondations",
            icon : InnondationIcon,
            type : "flood"
        },
        // {
        //     label : "Erosion",
        //     icon : ErosionIcon,
        //     type :"erosion"
        // }
    ])
    const text = reactive({
        title : "Status génarale de mon bien",
        titleProcess : "Procédure de déclaration environnementale"
    })
    const steps = ref<any[]>([
        {
            id : 0,
            title : "Envoi de la déclaration",
        },
        {
            id : 2,
            title : "Reception de l'accusé de réception",
        },
        {
            id : 3,
            title : "Validation de votre déclaration",
        },
        {
            id : 4,
            title : "Début de l'expoitation",
        },
    ]);

    const _status = reactive<{[key : string] : any}>({
        environment : {
            value : null,
            isResult : false,
        },
        flood : {
            value : null,
            isResult : false,
        }
    });

    
    
</script>
<template>
    <div class="dashboard-container">
        <div class="dashboard-title">
            <Paragraphe>{{ text.title }}</Paragraphe>
        </div>
        <hr>
        <div class="dashboard-step">
            <div class="dashboard-title">
                <Paragraphe>{{ text.titleProcess }}</Paragraphe>
            </div>
            <a-steps
                
                :responsive="true"
                :direction="'horizontal'"
                :label-placement="'vertical'"
                :current="0"
            >
                
                <a-step v-for="(step, key) in steps"
                    :key="key"
                    :title="step.title"
                />
            </a-steps>
        </div>
        <div class="dashboard-info">
            <ul>
                <li>Classe : </li>
                <li>Localisation : </li>
                <li>Region : </li>
                <li>Status : </li>
            </ul>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
.dashboard{
    &-title{
        @apply mb-2 ;
        color : var(--color-gray-icon);
        font-size : 18px;
        font-weight: 500;
    }
    &-step{
        @apply my-5;
        :deep(){
            .ant-steps-item-title{
                font-size : 14px;
            }
            

                .ant-steps-item-finish{
                    .ant-steps-item-title{
                        color : var(--color-gray-icon);
                    }
                    .ant-steps-item-tail::after{
                        background-color : var(--color-primary);
                    }
                    .ant-steps-item-icon{
                    color : var(--color-gray-icon);
                        border-color: var(--color-primary);
                        .ant-steps-icon{
                            color : var(--color-primary);
                        }
                    }
                }
                .ant-steps-item-process{
                    .ant-steps-item-title{
                        color : var(--color-gray-icon);
                    }
                    .ant-steps-item-icon{
                        background : var(--color-primary);
                        border-color: var(--color-primary);
                    }
                }
        }
    }
    &-container{
        @apply w-full flex flex-col gap-y-2 p-2 rounded-[8px] h-full;
        color : var(--color-gray-icon);
        background-color: white;
        
        .card{
            &-container{
                @apply flex flex-col gap-y-2 mt-5;

                @screen md{
                @apply w-full flex flex-row
                 gap-x-2;
                }
            }
            &-response{
                border : 1px solid var(--color-gray);
                border-radius : 20px;
                font-weight: bold;
                text-align: center;
                background-color: var(--color-stroke-gray);
            }
            &-item{
                border : 1px solid var(--color-gray);
                @apply p-2 rounded-[8px] flex-col ;
                &-title{
                    font-weight: 500;
                    flex-grow: 1;
                }
                &-header{
                    @apply flex justify-start gap-5 mb-3;
                }
                @screen md{
                    @apply p-5 w-1/3 ;
                    flex-shrink : 5;
                }
            }
        
        }
        @screen md{
            @apply flex flex-col gap-x-10 py-5 ;
        }
    }
    &-info{
        @apply w-full rounded-[8px] p-5;
        border : 0.5px solid var(--color-gray-icon);
        ul{
            list-style: square;
        }

    }
    
}
</style>