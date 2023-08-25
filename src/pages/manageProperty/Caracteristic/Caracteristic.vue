<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Loader from "@/components/Common/Loader/Loader.vue";
import Input from "@/components/Common/Input/Input.vue";
import Modal from "@/components/Display/Modal/Modal.vue";
import Button from "@/components/Common/Button/Button.vue";
import Add from "@/components/Icon/AddOptions.vue";
import Select from '@/components/Common/Select/Select.vue'
import {FontAwesomePromise} from "@/composables/useFontAwesome";

import {useStore} from "vuex";
import { ref, shallowRef, toRaw, onMounted, watch} from "vue";
import { garageOptions, gardenOptions, input, modalItemFeature, modalItemOption, otherLevel } from "@/pages/manageProperty/Caracteristic/data";
import DragAndDrop from '@/pages/addProduct/components/DradAndDrop/DragAndDrop.vue';

interface dropedelement{
      id : number,
      level : number
}

interface selectedFeatureElementType{
      item : number,
      level : number
}

const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})

const faReady = ref<boolean>(false);
const optionsReady = ref<boolean>(false);
const featuresready = ref<boolean>(false);
const niveau = ref<{}[]>([]);
const checked = ref<Array<any>>([]);
const loadingGetData = ref<boolean>(false);

const niveauEntity = ref<any>({
    title : "Niveau",
    level :  0,
    item : []
});

const paramsItem = ref<any>({
      id : 0,
      label : '',
      item : {
            name : '',
            icon : 'fab fa-hotjar'
      }
})

const params = ref<any>({
      thepropertyFeatures : [],
      otherOptions : []
});

const featuresSelected = ref<any[]>([]);
const emit = defineEmits(['getData'])
let level = ref<Number>(0);
let other = shallowRef<Array<any>>([]);
let isShow = ref<boolean>(false);
const isShowAddOptions = ref<boolean>(false);
const indexItem = ref<any>(0);
let newParamsItem = Object.assign({}, paramsItem.value);
const store = useStore();


onMounted(()=>{
    //   getDailyNeeded();
        getAllData();
        console.log("DBG feature data ",store.state.AddProductModule.features.data);
        if(store.state.AddProductModule.features.data){
                niveauEntity.value.item = store.state.AddProductModule.features.data;    
                featuresready.value = true;
                niveauEntity.value.item = store.state.AddProductModule.features.data
        }
        if(store.state.AddProductModule.options.data){
                other.value = store.state.AddProductModule.options.data
                optionsReady.value = true
                other.value = store.state.AddProductModule.options.data
        }
        console.log("DBG options data ",store.state.AddProductModule.options.data);
        FontAwesomePromise.then((state : any) =>{
              console.log(state);
              faReady.value = true;
        })
})


function incrementLevel() : void{
      const _ = JSON.stringify({
                        ...niveauEntity.value,
                        })
      niveau.value.push(JSON.parse(_));

      featuresSelected.value.push({features  : []});
      console.log(featuresSelected.value)
}

function getDropedList(list : dropedelement){
      console.log(list)
      featuresSelected.value[list.level].features.push({feature : +list.id})
      console.log("we have ", featuresSelected.value)
      const data  = {thepropertyFeatures : [...featuresSelected.value]}
    //   store.dispatch('AddProductModule/setPropertyData', {data, step : {general : true}})
      emit('getData', data);
console.log("bbbbbbbbbbbbb\n", featuresSelected.value);
    
}

function deleteDropedFeature(selected : selectedFeatureElementType){
      let selectedLevel = featuresSelected.value[selected.level].features
      const idx = selectedLevel.indexOf(selected.item);
      console.log("suppress",toRaw(selectedLevel), idx)
      featuresSelected.value[selected.level ].features = selectedLevel.filter((item : any) => selectedLevel.indexOf(item)  !== idx)
      const data  = {thepropertyFeatures : [...featuresSelected.value]}
    //   store.dispatch('AddProductModule/setPropertyData', {data, step : {general : true}})
      emit('getData', data);

}

function checkItem(item :any, allItem : any){
      console.log("thissss : ",item)
      let content = checked.value.some(e => e.optionId === +item);
      console.log("content", content)
      if(!content){
            checked.value.push({
                  "optionId": +item,
                  "name" : allItem.name,
                  "callGarden": false,
                  "costGarden": 0,
                  "garageNumberPlace": 0
            });
      }else{
            checked.value = checked.value.filter(i => i.optionId !== +item);
      }
      console.log("checked", toRaw(checked.value))
      const data  = {options : [...checked.value]}
      emit('getData', data);

    //   store.dispatch('AddProductModule/setPropertyData', {data, step : {general : true}})
}

function handleCallGardenSwitch(value: any){
      checked.value.map(item =>{
            if (item.optionId === 2) {
                  item.callGarden  = value
            }
      })
}

function handleCallGardenInput(event : any){
      const value = Object.values(event)[0]
     checked.value.map(item =>{
            if (item.optionId === 2) {
                  item.costGarden  = value
            }
      })
      console.log(checked.value)
}

function handlePlaceNumberInput(event : any){
      const value = Object.values(event)[0]
     checked.value.map(item =>{
            if (item.optionId === 4) {
                  item.garageNumberPlace  = value
            }
      })
      console.log(checked.value)
}





watch(()=> store.state.AddProductModule.features.data,function(newVal){
      niveauEntity.value.item = newVal;
      console.log("niveau : ", niveauEntity.value.item)
      if(store.state.AddProductModule.features.data){
            featuresready.value = true;
      }
      return newVal
})
watch(()=> store.state.AddProductModule.options.data,function(newVal){
      other.value = newVal;
      console.log("other : ", other.value)
      if(store.state.AddProductModule.options.data){
            optionsReady.value = true
      }
      return newVal
})

watch(()=> niveau.value, (newVal)=>{
            console.log("niveau à changer")
            niveau.value = newVal
            return newVal
      },
      {immediate : true}
)


watch(() => indexItem.value, (first) => {
      indexItem.value = first
}, {immediate : true, deep : true})

watch(() => isShow.value, (first) => {
      isShow.value = first;
},{immediate : true, deep : true})

watch(() => params.value, (first) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n", first);
      emit('getData', first);
      
}, {immediate : true, deep : true});

const handleDeleteLevel = (levelItem : any)=>{

    console.log("we have level item :  ", niveau.value.indexOf(levelItem))
    const idx = niveau.value.indexOf(levelItem);
    niveau.value = niveau.value.filter(item => niveau.value.indexOf(item)  !== idx)
    console.log("level : ", niveau.value)
    featuresSelected.value = featuresSelected
                            .value
                            .filter(item=> featuresSelected.value.indexOf(item) !== idx)
}

function onOpenModal(key: number){
      isShow.value = !isShow.value;
      indexItem.value = key;
}

function onOpenModalOptions(){      
      isShowAddOptions.value = !isShowAddOptions.value;
}

function handleChangeModalValue(value :any){      
      for(let i in value){
            newParamsItem.item.name = value[i];
            newParamsItem.label = i;
            newParamsItem.id = +indexItem.value;
      }
}

function handleChangeModalOptions(value : any, id : any){
      for(let i in value){
            newParamsItem.item.name = value[i];
            newParamsItem.label = i;
            newParamsItem.id = id;
      }
}

async function handleAddFeature(){
      let a = JSON.stringify(newParamsItem);
      let b = JSON.parse(a);
      
      if(params.value.thepropertyFeatures.length < +b.id+1){            
            params.value.thepropertyFeatures = [
                  ...params.value.thepropertyFeatures,
                  {
                        features : [
                              {
                                    feature : b.item
                              }
                        ]
                  }
            ]
      }else{            
            params.value.thepropertyFeatures[+b.id].features = [
                  ...params.value.thepropertyFeatures[+b.id].features,
                  {     
                        feature : b.item
                  }
            ]
      }
      isShow.value = false;
}

function handleAddOptions(){
      let a = JSON.stringify(newParamsItem)
      
      let b = JSON.parse(a);
      
      params.value[newParamsItem.label] = [
            ...params.value[newParamsItem.label],
            b.item
      ]
      console.log("aaaaaaaaaaa\n", params.value);
      isShowAddOptions.value = false;
}

async function getAllData(){
    loadingGetData.value = true;
    await getFeatures()
    .then(() => {
        getOptions();
    })
    .catch(err => {

    })
    .finally( async () => {
      setTimeout(() => {
            loadingGetData.value = false;
      }, 1000)
    })
    
}


async function getFeatures(){
    const allFeatures = await store.dispatch('AddProductModule/getFeatures');
    console.log("All features\n", allFeatures);
    
}

async function getOptions(){
    const allOptions = await store.dispatch('AddProductModule/getOptions');
    console.log("All options\n", allOptions);
    
}


</script>

<template>
    <div class="caracteristic caracteristic__container">
        <div class="caracteristic__header">
            <P>Caractéristiques</P>
            <hr class="caracteristic__divider">
        </div>

        <Loader v-if="loadingGetData"/>

        <div class="caracteristic__content" v-else>
                <P class="caracteristic__add-container" @click="incrementLevel">
                        <span>Ajouter un niveau</span>
                        <span class="caracteristic__add"> + </span>
                  </P>
                        <DragAndDrop 
                              :niveau="niveau"
                              :selectedFeatures="featuresSelected"
                              @on-drop-list="getDropedList"
                              @delete-level="handleDeleteLevel"
                              @delete-droped-features="deleteDropedFeature"
                              @on-open-modal="onOpenModal"
                              :features-added="params.thepropertyFeatures"
                        />
                  
                        <Modal
                              :is-show-modal="isShow"
                              @on-back="onOpenModal"
                              title="Autres"
                        >
                              <template #content>
                                    <div class="" v-for="(item, idItem) in modalItemFeature" :key="item.id">
                                          <Input 
                                                :name-input="item.name"
                                                :label="item.label"
                                                :input-type="item.type"
                                                @input="handleChangeModalValue"
                                          />
                                    </div>
                                    <div class="caracteristic__modal-footer">
                                          <Button type-button="secondary" @click="handleAddFeature">
                                                Valider
                                          </Button>
                                    </div>
                              </template>
                        </Modal>
                        <Modal
                              :is-show-modal="isShowAddOptions"
                              @on-back="onOpenModalOptions"
                              title="Autres options"
                        >
                              <template #content>
                                    <div class="" v-for="(item, idItem) in modalItemOption" :key="item.id">
                                          <Input 
                                                :name-input="item.name"
                                                :label="item.label"
                                                :input-type="item.type"
                                                @input="handleChangeModalOptions($event, idItem)"
                                          />
                                    </div>
                                    <div class="caracteristic__modal-footer">
                                          <Button type-button="secondary" @click="handleAddOptions">
                                                Valider
                                          </Button>
                                    </div>
                              </template>
                        </Modal>
                  <div class="caracteristic__other">
                        <div class="caracteristic__other-container">
                              <div 
                                    class="caracteristic__other-container-card" 
                                    v-for="item in other"
                                    :key="item.id" 
                                    :class="[checked.some(i => i.optionId === item.id)  ? 'caracteristic__checked' : '']" 
                                    @click="checkItem(item.id, item)"
                              >
                                    <div class="caracteristic__other-container-item" >
                                          <i 
                                                :class="[checked.some(i => i.optionId === item.id)  ? `caracteristic__selected-other ${item.icon}` : item.icon]" 
                                          />
                                          <Paragraphe 
                                                :class="[checked.some(i => i.optionId === item.id)  ? 'caracteristic__selected-other' : '']" 
                                          > 
                                                {{item.name}}
                                          </Paragraphe>
                                    </div>
                              </div>
                              <div 
                                    class="caracteristic__other-container-card caracteristic__checked"
                                    v-for="item in params.otherOptions"
                              >
                                    <div class="caracteristic__other-container-item">
                                          <i 
                                                :class="item.icon"
                                                class="caracteristic__selected-other"
                                          />
                                          <Paragraphe
                                                class="caracteristic__selected-other"
                                          >
                                                {{item.name}}
                                          </Paragraphe>
                                    </div>
                              </div>
                        </div>
                        <div class="caracteristic__other-container-card">
                              <div class="caracteristic__other-container-item" @click="onOpenModalOptions">
                                    <Add />
                                    <Paragraphe
                                    >
                                          Autres
                                    </Paragraphe>
                              </div>
                        </div>
                  </div>

                   <div class="">
                        <div class="" v-if="checked.some(elt => elt.name.toLowerCase() === 'jardin')">
                              <div class="caracteristic__options-input-container" v-for="item in gardenOptions" :key="item.id">
                                    <div class="" v-for="subItem in item.subOptions" :key="subItem.id">
                                          <Switch 
                                                v-if="subItem.type === 'switch'"
                                                :name="subItem.name"
                                                :item-label="subItem.label"
                                                @switchValue="handleCallGardenSwitch"
                                          />
                                          <Input 
                                                v-else
                                                :input-type="subItem.type"
                                                :label="subItem.label"
                                                :name-input="subItem.name"
                                                @input="handleCallGardenInput"
                                          />
                                    </div>
                              </div>
                        </div>
                        <div class="" v-if="checked.some(elt => elt.name.toLowerCase() === 'garage')">
                              <div class="" v-for="item in garageOptions" :key="item.id">
                                    <div class="" v-for="(subItem,id) in item.subOptions"  :key="id">
                                          <Input 
                                                :name-input="subItem.name"
                                                :input-type="subItem.type"
                                                :label="subItem.label"
                                                @input="handlePlaceNumberInput"
                                                
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>


        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.caracteristic{
    &__container{
        @apply flex flex-col gap-[30px];
    }

    &__content{
        @apply flex flex-col gap-[10px];
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__divider{
        @apply text-slate-300;
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }

    &__add-container{
        @apply flex cursor-pointer gap-[14px];
    }
    &__add{
        @apply h-[22px] w-[22px] flex justify-center items-center rounded-[50%];
        background-color: var(--color-gray);
    }
    &__level-container{
        @apply px-[14px] py-[10px] rounded-[4px];
        border: 0.5px solid var(--color-stroke-gray);
    }
    &__subitem-container{
        @apply flex flex-wrap  gap-[35px];
    }
    &__subitem-item{
        @apply flex flex-col items-center cursor-grab;
    }
    &__icon{
        @apply w-[35px] h-[35px] bg-slate-800 rounded-[50%] ;
    }
    &__title{
        @apply leading-[17px] text-[14px] text-[#8F8F8F];
    }
    &__level-container-item{
        @apply flex flex-col gap-[14px];
    }
    &__dragged{
        @apply rounded-[4px] min-h-[97px];
        border: 0.5px solid #606060;
    }
    &__master-container{
        @apply flex flex-col gap-[14px];
    }
    &__other-container{
        @apply flex gap-[14px] flex-wrap;
    }
    &__other-container-card{
        @apply rounded-[4px] h-[72px] w-[110px] flex justify-center items-center  cursor-pointer; 
        border: 0.5px solid #14223C;
    }
    &__other-container-item{
        @apply flex flex-col items-center justify-center;
    }
    &__checked{
        @apply border-none;
        background-color: var(--color-primary);
    }
    &__options-input-container{
        @apply flex flex-col gap-[10px];
    }
    &__selected-other{
        @apply text-[white];
    }
    &__modal-footer{
        @apply flex justify-end mt-[20px];
    }
    &__other{
        @apply flex  gap-[20px];
    }
    &__add-other{
        border: 0.5px solid #D6D6D6;
        @apply w-[82px] h-[60px] rounded-[8px] flex flex-col justify-center items-center;
    }
    &__daily-needed-container{
        // @apply flex gap-[10px] flex-wrap;
    }
    &__daily-needed{
        // border: 0.5px solid var(--color-stroke-gray);
        // @apply bg-white p-[10px] rounded-[8px] cursor-pointer w-fit flex;
    }

    &:deep(){
        .drag__drop-item{
            @apply rounded-[4px] border-slate-500;
        }

        .drag__subitem-container{
            @apply gap-[15px];
        }

        .drag__subitem-item{
            @apply border w-[auto] p-[10px] border-slate-300 rounded-[8px] min-h-[60px] min-w-[82px] flex flex-col justify-center items-center;
        }

        .drag__add{
            @apply mt-[12px];
        }

        .button__secondary{
            @apply text-[12px];
        }
    }
}
</style>