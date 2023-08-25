<script lang='ts' setup>
import {ref,reactive, onMounted, watch} from 'vue';
import useAutoComptetion from "@/composables/useAutoComplete";
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';
import Radio from '@/components/Common/Radio/Radio.vue';
import Select from '@/components/Common/Select/Select.vue';
import Slider from '@/components/Display/Slider/Slider.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import Input from '@/components/Common/Input/Input.vue';
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import {TARGET_FIELDS}  from "./data";
import { useStore } from 'vuex';

const store = useStore();

const departureCity = useAutoComptetion("departureCity");
const arrivalCity = useAutoComptetion("arrivalCity");

const targetChoice = ref<boolean>(false);
const dayChoice = ref<boolean>(false);
const values : any  = {};
const checkAllGo = ref<boolean>(false);
const checkAllBack = ref<boolean>(false);
const isRoudTrip = ref<boolean>(false);
let payload : { [key : string] : any }  = ref<any>({});


const targetRadioHandler = ({target} : any)=>{
    if(target.value === "isAroundMe"){
        payload.value = {...payload.value, ...{ departureCity : null}};
        payload.value = {...payload.value, ...{ arrivalCity : null}};

        payload.value = { ...payload.value, ...{ [target.value] : true}};
        payload.value = {...payload.value , ...{"isOnMyRoute" : false}};
        targetChoice.value = true;
        
    }
    else{
        targetChoice.value = false;
        payload.value = {...payload.value, ...{ adress : null}};
        payload.value = {...payload.value, ...{ maximunDetour : null}};
        payload.value = {...payload.value, ...{"isOnMyRoute" : true}};
        payload.value = {...payload.value, ...{"isAroundMe" : false}};



    }
}
const frequencyRadioHandler = ({target} : any)=>{
    
    if(target.value === "isCommuteRegularly"){
        payload.value = {...payload.value, ...{ dateOfOutwardJourney : null}};
        payload.value = {...payload.value, ...{ dateOfReturnTrip : null}};
        
        payload.value = {...payload.value, ...{[target.value] : true}};
        payload.value = {...payload.value, ...{"isTravelOnce" : false}};
        
        dayChoice.value = true;
    }
    else{
        payload.value = {...payload.value, ...{ dayDepartureRegular : null}};
        payload.value = {...payload.value, ...{ dayReturnRegular : null}};
       
        payload.value = {...payload.value, ...{"isTravelOnce" : true}};
        payload.value = {...payload.value, ...{"isCommuteRegularly" : false}};

        dayChoice.value = false;
    }
    

}

const inputHandler  = ($event : any)=>{
    console.log("DBG input field", $event)
    payload.value = {...payload.value, ...$event};
} 

const sliderHandler = (name : any,$event : any)=>{
    console.log("DBG slider", {[name] : $event});
    payload.value = {...payload.value, ...{[name] : $event}};

}
 
const dateHandler = ($event : any)=>{
    console.log("DBG date", $event);
    payload.value = {...payload.value, ...$event};

}
const checkboxHandler = (name  : string, $event : any)=>{
    console.log("DBG checkbox", {[name] : $event});
    if(!!$event){
        isRoudTrip.value = true;
    }
    else{
        isRoudTrip.value = false;

    }
    payload.value = {...payload.value, ...$event};
}
const handleDayDepartureCheckBox = (name  : string,value : any, $event : any)=>{
    console.log("DBG  checkbox", {[name] :value},!!$event);
    if(!values[name]?.length){
        values[name] = [];
    }

    if(Array.isArray(value)){
        // values[name] = $event ? value : [];

            if(value.toString() === values[name].toString()){
                checkAllGo.value = false;
                values[name] = [];
            }else{   
                checkAllGo.value = true;
                values[name] = value;
            }


    }else{
        const condition = !!$event;
        if(condition){

            values[name] =  [ ...values[name] ,value as never];
        }

    }
    values[name] = values[name].filter((item : any) => !!item) // enlever les string vide : '';
    console.table(values[name]);
    payload.value ={...payload.value, ...values} ;
}

const  handleDayReturnCheckBox = (name  : string,value : any, $event : any)=>{

    console.log("DBG  checkbox", {[name] :value},!!$event);
    if(!values[name]?.length){
        values[name] = [];
    }
    if(Array.isArray(value)){
        // values[name] = $event ? value : [];

            if(value.toString() === values[name].toString()){
                checkAllBack.value = false;
                values[name] = [];
            }else{
                checkAllBack.value = true;
                values[name] = value;
            }

    }else{
        const condition = !!$event;
        if(condition){

            values[name] =  [ ...values[name] ,value as never];
        }

    }
    values[name] = values[name].filter((item : any) => !!item) // enlever les string vide : '';
    console.table(values[name]);
    payload.value ={...payload.value, ...values} ;

}
watch(payload,
    (newValue)=>{
        store.commit('TransportModule/UPDATE_TARGET_PURPOSE', newValue);
        console.log('DBG Watcher');
    })

watch(() => departureCity.autocompleteResult,
  (value) => {
    let address = { departureCity: value.value?.address };
    inputHandler(address);
},
  { immediate: true, deep: true }
);

watch(() => arrivalCity.autocompleteResult,
  (value) => {
    let address = { arrivalCity: value.value?.address };
    inputHandler(address);
},
  { immediate: true, deep: true }
);

</script>
<template>
        <div class="target-container">
            <div class="target-body">
                <div 
                    v-for="(field, key) in TARGET_FIELDS"
                    :key="key"
                    class="target-field"
                    >
                    <!-- <Select
                        :label="field.label"
                        :name="field.name"
                        :placeholder="field.options[0].label"
                        :options="field.options"
                        @change-select="handleChange"
                    /> -->
                    <div 
                        v-if="field.type === 'target-radio'"
                        class="target-field-radio"
                    >
                        <Paragraphe>{{ field.label }}</Paragraphe>
                        <Radio
                        
                        :element="field.options"
                        :align="field.direction"
                        class="radioElementClass"
                        :name="field.name"
                        @get-radio-input="targetRadioHandler"
                        />
                    </div>
                    <div 
                        v-if="field.type === 'frequency-radio'"
                        class="target-field-radio"
                    >
                        <Paragraphe>{{ field.label }}</Paragraphe>
                        <Radio
                        
                        :element="field.options"
                        :align="field.direction"
                        class="radioElementClass"
                        :name="field.name"
                        @get-radio-input="frequencyRadioHandler"
                        />
                    </div>
                    <Input
                        v-else-if="field.type === 'input' && !targetChoice"
                        :input-type="'text'"
                        :label="field.label"
                        :name-input="field.name"
                        id="departureCity"
                        @input="inputHandler"
                    />
                    <Input
                        v-else-if="field.type === 'conditionned-departure-input' && targetChoice"
                        :input-type="'text'"
                        :label="field.label"
                        :name-input="field.name"
                        id="arrivalCity"
                        @input="inputHandler"
                    />

                    <Input
                        v-else-if="field.type === 'conditioned-input' &&  !targetChoice"
                        :input-type="'text'"
                        :label="field.label"
                        :name-input="field.name"
                        @input="inputHandler"
                    />

                    <div 
                        v-else-if="field.type === 'slider' && targetChoice"
                        class="target-field-slider"
                    >
                        <Paragraphe>{{ field.label }}</Paragraphe>
                            <Slider
                                @change="sliderHandler(field.name, $event)"
                            />
                    </div>
                    <InputDate
                        v-else-if="field.type === 'date-departure' && !dayChoice"
                        :label="field.label"
                        :name="field.name"
                        @handle-date="dateHandler"
                        :min="true"
                    />
                    <InputDate
                        v-else-if="field.type === 'date-returnTrip' && !dayChoice && isRoudTrip"
                        :label="field.label"
                        :name="field.name"
                        @handle-date="dateHandler"
                        :min="true"
                    />

                    <CheckBox
                        v-else-if="field.type === 'checkbox'"
                        :label="field.label"
                        :return-boolean="true"
                        @click="checkboxHandler(field.name, $event)"
                    />

                    <div 
                        v-else-if="field.type === 'multi-checkbox' && field.name === 'dayDepartureRegular' && dayChoice "
                        class="target-field-checkbox">
                        <div class="__checkbox-label">
                            <Paragraphe>{{ field.label }}</Paragraphe>
                        </div>
                        <div class="__checkbox-container">
                            <CheckBox
                            v-for="(checkbox) in field.options"
                            :key="checkbox.label"
                            :label="checkbox.label"
                            :isChecked="checkAllGo"
                            @click="handleDayDepartureCheckBox(field.name,checkbox.value, $event)"
                            />
                        </div>
                    </div>
                    <div 
                        v-else-if="field.type === 'multi-checkbox' && field.name === 'dayReturnRegular' && dayChoice && isRoudTrip"
                        class="target-field-checkbox">
                        <div class="__checkbox-label">
                            <Paragraphe>{{ field.label }}</Paragraphe>
                        </div>
                        <div class="__checkbox-container">
                            <CheckBox
                            v-for="(checkbox) in field.options"
                            :key="checkbox.label"
                            :label="checkbox.label"
                            :isChecked="checkAllBack"
                            :return-boolean="true"
                            @click="handleDayReturnCheckBox(field.name,checkbox.value, $event)"
                            />
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    
</template>
<style lang="scss" scoped>

    .target{
        &-container{
            :deep(){
                .ant-checkbox-wrapper{
                    color : var(--color-gray-icon);
                    font-weight: normal;
                }
            }
        }
        &-field{
            @apply mb-2;
            &-slider, &-checkbox, &-radio{
                p{
                    color : var(--color-gray-icon);
                    font-display: 14px;
                    font-weight: 500;
                }
            }
            &-radio{
                p{
                    @apply mb-2;
                }
            }
            &-checkbox{
                
                .__checkbox{
                    &-label{
                        @apply mb-2;
                    }
                    &-container{
                        @apply w-full flex flex-row flex-wrap gap-2;
                        color : black;
                        
                }
                
                }
            }
        }
        
    }
</style>