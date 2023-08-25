<script lang='ts' setup>
import {ref,reactive, onMounted, computed, watch} from 'vue';
import Button from '@/components/Common/Button/Button.vue';
import Loader from '@/components/Common/Loader/Loader.vue';
// import {Steps as aSteps, Step as aStep} from "ant-design-vue";
import {ProcessStepType} from "./data";
import moment from "moment";
import {Empty} from 'ant-design-vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';

// const region = computed(()=> store.getters["EnvironmentModule/getRegion"])
const store = useStore();
const route = useRoute();
const router = useRouter();
const stepId = ref<number>();

const fields = ref<{[key :  string] : any}>();
const permitProcessData = ref<{[key : string] : any}>({})
const stepToshow = ref<ProcessStepType[]>();
const showForm = ref<boolean>(false);

    const text = reactive({
        title : "Procédure",
        titleProcess : "Procédure de déclaration environnementale"
    })
    const isloading = ref<boolean>(true);
    const steps = ref<any[]>([
        {
            id : 0,
            title : "Envoi de la déclaration",
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
    let payload : {[key : string] : any} = {};
    const processData = ref<ProcessStepType[]>();
    const ultimateDate = ref<any>(moment().format('L'));
    onMounted(async ()=>{
        await store.dispatch("EnvironmentModule/setRegion");
        store.dispatch("EnvironmentModule/fetchPermitProcess", +route.params.id);

    })

    // function handleEffectiveDate(subitem : any,$event : Date){
    //     subitem.value = $event;
    //     ultimateDate.value= moment().add(15,'days').format('L');
    // }

    function checkCurrentStep(){
    const currentStatus = permitProcessData.value?.currentStatus;
    
    processData.value?.some((ProcessStep : any, idx)=>{

        if (ProcessStep.status === currentStatus){
            if(currentStatus === 'requestSent'){
                ProcessStep["created"] = permitProcessData.value["created"]
            }else{

                ProcessStep[`${currentStatus}EffectiveDate`] = permitProcessData.value
                                                ?.statusData[`${currentStatus}EffectiveDate`]
                ProcessStep[`${currentStatus}UltimateDate`] = permitProcessData.value
                                                ?.statusData[`${currentStatus}UltimateDate`]
            }
            if(idx < (processData.value?.length as number)){
                stepToshow.value  =  processData.value?.slice(0,idx+2)
            }else{
                stepToshow.value  = processData.value
            }
        }
        return (ProcessStep.status === currentStatus)
    })

    }
    function callback(){
        notification.success({message : "Les modificationns ont bien été enregistrer"})        
    }


    watch(()=> store.getters["EnvironmentModule/getRegion"] ,
            async (v)=>{
                switch ((v as string)?.toLowerCase()) {
            case 'flandre':
                processData.value =  (await import("./data")).ProcessData.FLANDRE;
                break;
            case 'wallonie':
                processData.value=  (await import("./data")).ProcessData.WALLONIE;
                break;
            default:
                processData.value=  (await import("./data")).ProcessData.Bruxelle;
                break;
            }
            showForm.value  = true;
        }, {deep : true, immediate : true})
    
    watch(()=> store.getters['EnvironmentModule/getPermitProcessData'],
    (v)=>{
        permitProcessData.value = v;
        checkCurrentStep();
        isloading.value = false;

    }, {deep : true, immediate : true});
    
    
    function effectiveDateHaindler(key : any  ,$event : any){
        payload = { ...payload, effectiveDate : $event};
    }
    
    function validateStep(){
        const __process = stepToshow.value?.slice(-1)[0];
        payload = {
            ...payload,
            step : __process?.status
        }
        store.dispatch("EnvironmentModule/updateProcessStep",{
            data : payload,
            callback 
        })
    }
</script>
<template>
    <Loader v-if="isloading" />
    <div v-else class="environment-container">

            <div class="environment-title">
                <Paragraphe>{{ text.title }}</Paragraphe>
            </div>
            <hr>
        <Empty v-if="!permitProcessData.value?.length" >
            <template #description>
                <Paragraphe> Vous n'avez pas fait de demande de permit d'environnement.</Paragraphe>
            </template>
        </Empty>
        <template v-else>
        <div  class="dashboard-step">
            <div class="dashboard-title">
                <Paragraphe>{{ text.titleProcess }}</Paragraphe>
            </div>
            <!-- <a-steps
                
                :responsive="true"
                :direction="'horizontal'"
                :label-placement="'vertical'"
                :current="0"
            >
                
                <a-step v-for="(step, key) in steps"
                    :key="key"
                    :title="step.title"
                />
            </a-steps> -->
        </div>
        <div class="environment-form" v-if="showForm && stepToshow?.length">
            <div v-for="(field, key) in stepToshow"
                :key="key"
                class="form-item"
            >
                <div class="form-item-label">
                    <Paragraphe> {{ field?.name }}</Paragraphe>
                </div>
                <div v-for="(item, k) in field.fields"
                    :key="k"
                    class="form-subitem"
                >
                    <Paragraphe >{{ item?.label }}</Paragraphe>
                    <div v-if="item.type === 'date'">
                        
                        <InputDate
                            :name="item.type"
                            @handle-change="effectiveDateHaindler(item.key as any, $event)"

                        />
                        <div v-if="key === (stepToshow.length - 1)"
                            class="w-full mt-5 flex flex-row justify-end"
                            >
                            <Button type-button="primary" @click="validateStep"> 
                                Valider
                            </Button>

                        </div>
                    </div>
                    <div v-else-if="item.type === 'display'">
                        <template v-if="field.status === 'requestSent'">
                            {{ new Date((field as any).created).toLocaleDateString() }}
                        </template>
                        <template v-else>
                            {{!item.value ? item.value('23/03/2023')  : '---' }}
                        </template>
                    </div>
                    <div 
                        v-else-if="item.type === 'info'"
                        class="form-item-info"
                        >
                        {{ item?.value }}
                    </div>
                    
                </div>
            </div>
        </div>
        </template>        
    </div>
</template>
<style lang="scss" scoped>
.form-{
    &item{
        @apply py-5 px-1 mb-3;
        hr{
            @apply mt-1 mx-5;
            font-weight: 100;
        }
        &-info{
            background-color: #749fce3b;
            @apply p-2 rounded-[8px]; 
        }
        border : .5px solid var(--color-gray-icon);
        border-radius: 8px;
        &-label{
            color : var(--color-gray-icon);
            font-weight: bold;
        }
    }
    &subitem{
        @apply px-5 pb-2;
        &-label{
            font-weight: bold;
        }

        
    }

}
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