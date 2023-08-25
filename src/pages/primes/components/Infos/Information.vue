<template>
    <div class="info__container">
        <!--Informations-->
        <div class="info__informations" v-if="items.name === nameTab.INFO">
            <div class="info__container">
                <div class="info__content">
                    <P class="info__subtitle">Béneficiaires</P>
                    <div class="info__beneficiary-container">
                        <div 
                            class="info__beneficiary"
                            v-for="(benef, idBenef) in dataProced?.beneficiary" :key="idBenef"
                        >
                            <div class="info__beneficiary-content">
                                <div class="">
                                    <P class="info__beneficiary-name" v-if="benef?.name">{{ benef?.name }}</P>
                                    <P class="info__beneficiary-description" v-if="benef?.description"> {{ benef?.description }}</P>
                                </div>
                                <hr class="info__divider">
                                <div class="info__beneficiary-disponibility">
                                    <P class="info__beneficiary-disponibility-title">Cette prime est disponible pour des :</P>
                                    <div 
                                        class="info__beneficiary-disponibility-content"
                                        v-for="(benefDispo, idBenefDispo) in benef?.disponibility" :key="idBenefDispo"
                                    >
                                        <P class="info__beneficiary-disponibility-content-label" v-if=" benefDispo?.name">{{ benefDispo?.name }}</P>
                                        <P class="info__beneficiary-disponibility-content-value">{{ benefDispo?.value }}</P>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="info__description" v-if="dataProced?.source">
                        <P class="info__subtitle">{{ dataProced.source.title }}</P>
                        <span v-html="data.prime?.source?.description"></span>
                </div>

                <div class="info__link-container">
                    <P  class="info__subtitle">Obtenir plus d'information</P>
                    <div class="info__link-content">
                        <a 
                            v-for="(link, idLink) in dataProced?.links" :key="idLink"
                            :href="link"
                            target="_blank"
                            class="info__link"
                        >
                            <Icon icon-name="Link" /> lien {{ idLink+1 }}
                        </a>
                    </div>
                </div>
            </div>   
        </div>

        <!--Conditions-->
        <div class="info__conditions" v-if="items.name === nameTab.CONDITION">
            <span v-html="dataProced?.conditions"></span>
        </div>

        <!--Montant-->
        <div class="info__montant" v-if="items.name === nameTab.MONTANT">
            <div class="" v-if="dataProced?.amount?.choices.length > 0">
                <Select 
                    :options="extractOptionsValue(dataProced.amount.choices)"
                    name="select"
                    label="Séléctionner votre choix"
                    @change-select="handleSelect"
                />
                <div class="">
                    <template 
                        class="" 
                        v-for="(inpDetailChoice, idInpDetaiChoice) in dataProced.amount.choices" 
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
                    v-for="(inputDetails, idInput) in dataProced?.amount?.details" 
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
                <!-- <div class="info__actions" v-if="isShowBtn">
                    <Button type-button="secondary" @click="handleCalculate">Valider</Button>
                </div> -->
            </div>
            <div class="info__response">
                <div class="info__loading" v-if="loadingCost">
                    <LoadingButton theme="dark" />
                </div>
                <P v-if="primeCost" v-html="'Le montant de la prime est '+formatMoney(primeCost)+'.'"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { nameTab } from "@/pages/primes/components/Infos/data";
import { useStore } from 'vuex';
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
import Input from '@/components/Common/Input/Input.vue';
import Select from '@/components/Common/Select/Select.vue';



const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    },
    items : {
        type : Object,
        default : () => {}
    },
    typeAction : {
        type : String,
        default : 'Primes'
    }
})


const store = useStore();
const primeCost = ref<any>(null);
const loadingCost = ref<boolean>(false);
const count = ref<number>(0);
const params = ref<any>({
    idChoice : null,
    quantities : [],
})
const idChoice = ref<any>(null);
const dataProced = ref<any>(props.typeAction === 'Primes' ? props.data.prime : props.data);

onMounted(() => {
    getData();
})

watch(() => params.value, (value) => {
    if(count.value > 0 && params.value.quantities.length > 0){
        handleCalculate(value)
    }
    count.value++;
}, {immediate : true, deep : true});


watch(() => idChoice.value, (value) => {
    idChoice.value = value;
}, {immediate : true, deep : true})

function getData(){
    
    // const data = props.typeAction === 'Primes' ? props.data.prime : props.data  
    console.error(props.data);
    if(props.typeAction === 'Primes'){
        params.value.idChoice = props.data.prime.amount.choices.length > 0 ? null : props.data.prime.amount.id;
    }else{
        params.value.idChoice = props.data.amount.choices.length > 0 ? null : props.data.amount.id;
    }
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

function handleShowButton(data : Array<any>) : boolean{
    let value : boolean = false;
   data.forEach((item : any) => {
        if(!value){
            value = item.hasInput ? true : false;
        }else{
            return;
        }
   })
   return value;
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

</script>

<style lang="scss" scoped>
.info{
    &__container{

    }

    &__container{
    }

    &__informations{

    }

    &__conditions{
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

    &__container{
        @apply flex flex-col gap-[20px];
    }
    &__content{
        @apply flex flex-col gap-[10px];
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
}
</style>