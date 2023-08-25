<template>
    <div class="request request__container">
        <Loader v-if="loading" /> 
        <div class="request__content">
            <div class="request__header-container">
                <div class="request__header">
                    <BackButton @click="handleBack"/>
                    <P>{{ infos[current].label }}</P>
                </div>
                <hr class="request__divider">
            </div>

            <div class="request__steps-container">
                <div class="request__steps">
                    <a-steps 
                        :current="current" 
                        :responsive="false" 
                        direction="horizontal"
                    >
                        <a-step v-for="item in infos" :key="item.id"/>
                    </a-steps>

                    <div class="request__steps-content">
                        <div class="request__informations" v-if="current === DataInfo.INFO">
                            <div >
                                <div class="request__content-body">
                                    <P class="request__subtitle">Béneficiaires</P>
                                    <div class="request__beneficiary-container">
                                        <div 
                                            class="request__beneficiary"
                                            v-for="(benef, idBenef) in detailsProcedure?.beneficiary" :key="idBenef"
                                        >
                                            <div class="request__beneficiary-content">
                                                <div class="">
                                                    <P class="request__beneficiary-name" v-if="benef?.name">{{ benef?.name }}</P>
                                                    <P class="request__beneficiary-description" v-if="benef?.description"> {{ benef?.description }}</P>
                                                </div>
                                                <hr class="request__divider">
                                                <div class="request__beneficiary-disponibility">
                                                    <P class="request__beneficiary-disponibility-title">Cette prime est disponible pour des :</P>
                                                    <div 
                                                        class="request__beneficiary-disponibility-content"
                                                        v-for="(benefDispo, idBenefDispo) in benef?.disponibility" :key="idBenefDispo"
                                                    >
                                                        <P class="request__beneficiary-disponibility-content-label" v-if=" benefDispo?.name">{{ benefDispo?.name }}</P>
                                                        <P class="request__beneficiary-disponibility-content-value">{{ benefDispo?.value }}</P>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="request__description" v-if="detailsProcedure?.source">
                                        <P class="request__subtitle">{{ detailsProcedure.source.title }}</P>
                                        <span v-html="detailsProcedure?.source?.description"></span>
                                </div>

                                <div class="request__link-container">
                                    <P  class="request__subtitle">Obtenir plus d'information</P>
                                    <div class="request__link-content">
                                        <a 
                                            v-for="(link, idLink) in detailsProcedure?.links" :key="idLink"
                                            :href="link"
                                            target="_blank"
                                            class="request__link"
                                        >
                                            <Icon icon-name="Link" /> lien {{ idLink+1 }}
                                        </a>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div class="request__conditions" v-if="current === DataInfo.CONDITION">
                             <span v-html="detailsProcedure?.conditions"></span>
                        </div>
                        <div class="request__montant" v-if="current === DataInfo.MONTANT">
                            
                            <div class="" v-if="detailsProcedure?.amount?.choices.length > 0">
                <Select 
                    :options="extractOptionsValue(detailsProcedure.amount.choices)"
                    name="select"
                    label="Séléctionner votre choix"
                    @change-select="handleSelect"
                />
                <div class="">
                    <template 
                        class="" 
                        v-for="(inpDetailChoice, idInpDetaiChoice) in detailsProcedure.amount.choices" 
                        :key="idInpDetaiChoice"
                    >
                        <div 
                            v-if="inpDetailChoice.id === idChoice"
                        >
                            <Input 
                                v-for="(inpChoice, idInpChoice) in inpDetailChoice.details" 
                                :key="idInpChoice"
                                :name-input="''+idInpChoice"
                                @input="handleChange"
                                :label="inpChoice.label"
                            />
                        </div>
                    </template>
                </div>
            </div>
            <div class="info__form" v-else>
                <div 
                    class=""
                    v-for="(inputDetails, idInput) in detailsProcedure?.amount?.details" 
                    :key="idInput"
                >
                    <Input 
                        v-if="inputDetails?.hasInput"
                        input-type="number"
                        :label="inputDetails?.label+' ('+inputDetails?.unity+')'"
                        :name-input="''+idInput"
                        @input="handleChange"
                    />
                    <P v-else>{{ inputDetails?.display }}</P>
                </div>
            </div>
            <div class="info__response">
                <div class="info__loading" v-if="loadingCost">
                    <LoadingButton theme="dark" />
                </div>
                <P v-if="primeCost" v-html="'Le montant de la prime est '+formatMoney(primeCost)+'.'"/>
            </div>
                        </div>
                    </div>
                </div>
    
                <div class="request__footer">
                    <div class="request__page-action">
                        <Button 
                            type-button="border" 
                            @click="handlePrev"
                            v-if="current !== 0"
                        >
                            Précédent
                        </Button>
                        <Button 
                            type-button="border" 
                            @click="handleNext" 
                            v-if="current+1 < infos.length"
                        >
                            Suivant
                        </Button>
                    </div>
                    <Button 
                        @click="handleProcedure"
                        type-button="secondary" 
                        v-if="current+1 === infos.length"
                    >
                        <LoadingButton size="xs" v-if="loadingProcedure" />
                        Procedure
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import BackButton from '@/components/Common/BackButton/BackButton.vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, onMounted, watch, computed } from "vue";
import Loader from '@/components/Common/Loader/Loader.vue';
import { Steps as ASteps, Step as AStep, notification } from 'ant-design-vue';
import Button from '@/components/Common/Button/Button.vue';
import { infos, nameTab } from "@/pages/primes/MakeRequest/data";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import Input from '@/components/Common/Input/Input.vue';
import Select from '@/components/Common/Select/Select.vue';

enum DataInfo{
    INFO = 0,
    CONDITION = 1,
    MONTANT = 2
}

const router = useRouter();
const routes = useRoute();

const idChoice = ref<any>(null);
const primeCost = ref<any>(null);
const store = useStore();
const allTypeOfWork = ref<any>(null);
const loading = ref<boolean>(false); 
const current = ref<number>(0);
const loadingProcedure = ref<boolean>(false);
const detailsProcedure = ref<any>(null);
const loadingCost = ref<boolean>(false);
const count = ref<number>(0);
const params = ref<any>({
    idChoice : null,
    quantities : [],
})

onMounted(() => {
    getProcedure();
})

watch(() => current.value , (value) => {
    current.value = value;
    console.log(value);
    
}, {immediate : true, deep : true});

watch(() => detailsProcedure.value, (value) => {
    detailsProcedure.value = value;
}, {immediate : true, deep : true});

watch(() => params.value, (value) => {
    if(count.value > 0 && params.value.quantities.length > 0){
        handleCalculate(value)
    }
    count.value++;
}, {immediate : true, deep : true});


watch(() => idChoice.value, (value) => {
    idChoice.value = value;
}, {immediate : true, deep : true})

function handleBack(){
    router.back();
}

function handleNext(){
    current.value++;
}

function handlePrev(){
    current.value--;
}

async function getProcedure() {
    loading.value = true;
    const dataStore = await store.getters['PrimesModule/getDetailsPrime'];
    if(dataStore){
        detailsProcedure.value = dataStore;
    }else{
        router.back();
    }
    console.log(detailsProcedure.value);
    loading.value = false;
}



function handleChange(e : any){
    console.log("aaaaaa\n", e);
    
    for(let i in e){
        if(params.value.quantities.length < +i+1){
            params.value.quantities = [
                ...params.value.quantities,
                e[i]
            ]
        }else{
            params.value.quantities[+i] = e[i];
        }
    }
}

async function handleCalculate(value : any){
    loadingCost.value = true;
    const data = await store.dispatch('PrimesModule/calculate', value);
    primeCost.value = data.amount;
    console.log(data);
    
    loadingCost.value = false;    
}

function formatMoney(value : any, separator ?: string) : string{
    let toArray : Array<string> = value.toString().split('');
    let count : number = 0;
    let newArray : Array<any> = [];
    
    for(let i : number = toArray.length; i >= 0; i--){
        count++;
        newArray = [
            toArray[i],
            ...newArray
        ]
        if(count === 3 && i !== 0){
            newArray = [
                separator ?? ' ',
                ...newArray
            ];
            count = 0;
        }
    }
    return newArray.join('');
}

function extractOptionsValue(data : Array<any>) : Array<any>{
    let newArray : Array<any> = [];
    data.forEach((item : any) => {
        newArray = [
            ...newArray,
            {
                ...item,
                label : item.name,
                value : item.id
            }
        ]
    })
    return newArray;
}

function handleSelect(e : any){
    for(let i in e){
        params.value.idChoice = e[i];
        idChoice.value = e[i];
    }
    console.log("eeeeee\n", idChoice.value);
}

async function handleProcedure(){
    loadingProcedure.value = true;
    // console.log("details\n", detailsProcedure.value.id);
    // console.log("Property\n", localStorage.getItem('idProperty'));

    try{
        const dataReturn =  await store.dispatch('PrimesModule/postProcedure', {
            property : localStorage.getItem('idProperty'),
            prime : detailsProcedure.value.id
        })
        console.log("##############\n", dataReturn);
        router.push(`/primes/${localStorage.getItem('idProperty')}`)
    }catch(err){

    }finally{
        loadingProcedure.value = false;

    }
}

</script>


<style lang="scss" scoped>
.request{
    &__container{
        @apply container flex flex-col bg-white rounded-[8px] my-[10px] min-h-[calc(100vh_-_100px)] p-[10px];
    }

    &__content{
        @apply flex-1;
    }

    &__footer{
        @apply w-full flex justify-between gap-[10px];
        &:deep(){
            .button__border, .button__secondary{
                @apply min-w-[120px];
            }
        }
    }

    &__page-action{
        @apply flex gap-[10px]
    }

    &__steps-container{
        @apply flex flex-col justify-between min-h-[calc(100vh_-_200px)];
    }

    &__header{
        @apply flex gap-[20px] items-center;
    }

    &__divider{
        @apply text-slate-200;
    }

    &__header-container{
        @apply flex flex-col gap-[20px] mb-[20px];
    }

    &__steps{
        &:deep() {
            .ant-steps-item-process
                > .ant-steps-item-container
                > .ant-steps-item-icon {
                background-color: var(--color-primary);
                border-color: transparent;
            }
            .ant-steps-item-wait .ant-steps-item-icon {
                border-color: transparent;
                background-color: var(--color-gray);
            }
            .ant-steps-item-icon {
                width: 20px;
                height: 20px;
                margin: 0;
            }
            .ant-steps-icon {
                display: none;
            }
            .ant-steps-item-title::after {
                top: 10px;
                height: 2px;
                left: 5px;
            }
            .ant-steps-item-container {
                position: relative;
                @screen lg {
                    position: initial;
                }
            }
            .ant-steps-horizontal:not(.ant-steps-label-vertical)
                .ant-steps-item {
                padding-left: 5px;
            }
            .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
                display: inline-flex;
                position: absolute;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                top: 0; 
                left: 0;
                font-size: 9px;
                color: #fff;
            }
            .ant-steps-item-icon {
                position: relative;
            }
            .ant-steps-item-finish .ant-steps-item-icon {
                background-color: var(--color-primary);
                border-color: #fff;
            }
            .ant-steps-item-finish
                > .ant-steps-item-container
                > .ant-steps-item-content
                > .ant-steps-item-title::after {
                background-color: var(--color-primary);
            }
            .ant-steps-item-title {
                // display: none;
            }
            .ant-steps-vertical {
                flex: 0 0 calc(35% - 10px);
                border: 1px solid var(--color-gray);
                border-radius: 8px;
                padding: 20px;
            }
            .ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail {
                left: 10px;
                padding-top: 24px;
                &::after {
                    width: 2px;
                }
            }
            .ant-steps-vertical > .ant-steps-item {
                flex: none;
                .ant-steps-item-title {
                    margin-left: 25px;
                    font-size: 14px;
                    line-height: 18px;
                }
            } 
            .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
                background-color: var(--color-primary);
            }
            .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title, .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                font-weight: 500;
            }

            .ant-steps-item-title{
                @apply pt-[15px];
            }
        }
    }

    &__informations{
        &:deep(){
            li, p{
                @apply text-justify;
            }

            b{
            }

            span{
                @apply flex flex-col gap-[10px];
            }
        }
    }

    &__conditions {
        &:deep(){
            li, p{
                @apply text-justify;
            }

            b{
            }

            span{
                @apply flex flex-col gap-[10px];
            }
        }
    }
    &__montant{
        &:deep(){
            .custom-input__fields{
                @apply mb-0;
            }

            .button__secondary{
                @apply font-thin w-[100px];
            }
        }
    }

    &__steps-content{
        @apply p-[20px];
    }

    &__subtitle{
        @apply font-semibold;
    }

    &__beneficiary-container{
        @apply flex flex-col gap-[10px];
    }

    &__beneficiary{
        @apply border rounded-[8px] p-[10px] border-slate-200;
    }

    &__beneficiary-name{
        @apply font-semibold;
    }

    &__beneficiary-disponibility{

    }

    &__beneficiary-disponibility-title{
        @apply font-semibold;
    }

    &__beneficiary-disponibility-content{
        @apply flex justify-between;
    }

    &__beneficiary-content{
        @apply flex flex-col gap-[20px];
    }

    &__beneficiary-disponibility-content-value{
        @apply text-blue-600;
    }
    &__beneficiary-disponibility-content-label{
        @apply text-slate-700 font-mono;
    }

    &__divider{
        @apply text-slate-300;
    }

    &__link-content{
        @apply flex flex-col;
    }

    &__link{
        @apply text-blue-600 flex gap-[10px] cursor-pointer italic;

        &:deep(){
            svg{
                @apply text-blue-600;
            }
        }
    }

    &__form{
        @apply flex flex-col gap-[10px];
    }

    &__actions{
        @apply flex justify-end;
    }

    &__loading{
        @apply w-[100%] flex justify-center items-center;
    }
    &__response{
        @apply mt-[20px];
    }
    .info__response{
        @apply mt-[20px]
    }
}
</style>