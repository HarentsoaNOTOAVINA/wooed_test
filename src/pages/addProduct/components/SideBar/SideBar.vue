<script lang="ts" setup>
import ASteps from "ant-design-vue/lib/steps/index";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { data, dataGround, dataLocation, dataLocationMinute } from "@/pages/addProduct/components/SideBar/data";
import ArrowMenu from '@/components/Icon/ArrowMenu.vue';
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { Store, useStore } from "vuex";

let props = defineProps({
      currentItem : {
            type : Number
      }
})

enum Role{
      pro = 'ROLE_PRO',
      part = 'ROLE_PART'
}

enum Country{
      Belgique = "Belgiques",
      Flandre = "Flandre",
      Luxembourg = "Luxembourg"
}

const store : Store<any> = useStore();
const AStep = ASteps.Step;
let current = ref<any>(props.currentItem);
let currentSubItem = ref<any>(0)
const menuList = ref<any>(data);
const roleUser = ref<string>('');
let propertyData = computed(() => store.getters['AddProductModule/getAddPropertyDatas']);
let opType = ref<string>('');
let propType = ref<number>(); 

const emit = defineEmits<{
        (event: 'component', comp: object, label: string): void;
        (event: 'data', value: any): void;
    }>();

watch(() => props.currentItem ,(first, second) => {
      currentSubItem.value = first;
      setTimeout(() => {
            changeComponent(data, first);
      });
      
      current.value = first;
}, {immediate : true, deep : true})

watch(() => store.getters['AddProductModule/getAddPropertyDatas'], (value) => {
      for(let i in value){
            if(i === 'propertyType'){
                  
                  propType.value = value[i];
                  if(value[i] === 2){
                        menuList.value = dataGround;

                  }
            }
      }
}, {immediate : true, deep : true});

watch(() => store.getters['AddProductModule/getAddPropertyDatas'], (value) => {
      for(let i in value){
            if(i === 'locationType'){
                  if(value[i].split(' ').includes('minute')){
                        menuList.value = dataLocationMinute;
                  }
            }
      }
}, {immediate : true, deep : true})

watch(() => store.getters['ProductsListModule/getOperationType'], (value) => {
      opType.value = value;
      switch (value) {
            case 'lease':
                  menuList.value = dataLocation;
                  break;
            case 'sale':
                  if(getTypeProperty(propType.value)){
                        menuList.value = dataGround;
                  }else{
                        
                        menuList.value = data;
                  }
                 
            default:
                  break;
      }
},{immediate : true, deep : true});

onMounted(() => {
      getRoleUsers();
      getLocation();
      emit('data', menuList.value)

})

watch(() => current.value,(first) => {
      current.value = first
}, {immediate : true, deep : true});

function getTypeProperty(id : any){
      const allType : Array<any> = store.getters['AddProductModule/getPropertyType']; 
      const type = allType.find(item => item.id === id)
      if(type && type.name === "Terrain"){
            return true
      }else{
            return false
      }
}

function changeComponent(data : Array<any>, first : any){
      menuList.value.forEach((item : any) => {
            if(!item.subMenu){
                  if(item.subMenu.includes(+first)){
                        emit('component', item.component, Array.isArray(item.label) ? item.label[getLocation()] : item.label);
                  }  
            }else{
                  item.subMenu.forEach((subItem: any) => {
                        if(subItem.id === first){
                              emit('component', subItem.component, Array.isArray(subItem.label) ? subItem.label[getLocation()] : subItem.label);
                        }
                        
                  });
            }
      })
}

async function getRoleUsers(){
      roleUser.value =  await store.getters['UserModule/getUserDetails'].roles.includes('ROLE_PRO') ? Role.pro : Role.part;        
}

function getLocation() : number{

    const country = store.getters['AddProductModule/getAddPropertyDatas']?.detailLocation?.country;
    let indice : number = 0;

      watch(() => store.getters['AddProductModule/getAddPropertyDatas'], (value) => {
            if(value.detailLocation?.country){
                  switch (value.detailLocation?.country) {
                        case Country.Belgique:
                              indice = 0
                              break;
                  
                        case Country.Luxembourg:
                              indice = 1
                              break;
                  
                        case Country.Flandre:
                              indice = 2;
                              break;
                  
                        default:
                              indice = 0;
                              break;
                  }
            }
            
      }, {immediate : true, deep : true});
      return indice;
}
</script>

<template>
      <div class="steps__container">
            <div class="" v-for="(item, idItem) in menuList" :key="idItem">
                  <div class="steps__phone-steps" v-if="item.children.includes(+current)">
                        <div class="steps__icon"> {{idItem + 1}} </div>
                        <Paragraphe>{{ Array.isArray(item.label) ? item.label[getLocation()] : item.label}}</Paragraphe>
                  </div>
            </div>

            <a-steps
                  direction="vertical"
                  size="small"
                  class="hidden md:flex"
            >
                  <a-step v-for="item in menuList" :key="item.id" :class="[item.children.includes(+current) ? '' : '']">
                        <template #title>
                              {{ Array.isArray(item.label) ? item.label[getLocation()] : item.label}}
                        </template>
                        <template #subTitle v-if="item.children.includes(+current)">
                              <arrow-menu/>
                        </template>
                        <template #description>
                              <a-steps
                                    class="steps-description hidden md:flex" 
                                    direction="vertical"
                                    :current="currentSubItem"
                                    v-if="item.children.includes(+current)"
                              >
                                    <a-step v-for="subItem in item.subMenu" :key="subItem.id" :class="[subItem.id === currentSubItem ? 'sub-item-active' : '']">
                                          <template #title>
                                                {{Array.isArray(subItem.label) ? subItem.label[getLocation()] : subItem.label}}
                                          </template>
                                    </a-step>
                              </a-steps>
                        </template>
                  </a-step>
            </a-steps>

      </div>
</template>

<style lang="scss" scoped>
      .steps{
            &__container{
                  @apply bg-[white] w-[100%] md:w-[315px] rounded-[8px] p-[12px];
                  .sub-item-active{
                        background-color: var(--color-gray);
                        @apply rounded-[8px]  h-[42px] flex items-center;
                  }
                  
                  &:deep(){
                        .ant-steps-item-icon{
                              background-color: var(--color-gray-icon);
                              width: 18px;
                              height: 18px;
                              border-color: var(--color-gray-icon);
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin-top: 5px;

                        }
                        .ant-steps-icon{
                              color: white;
                              font-size: 12px;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon{
                              border-color: transparent;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon{
                              color: transparent;
                        }
                        .ant-steps-item-title{
                              color: rgba(0, 0, 0, 0.60);
                              font-weight: 600;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
                              color: white;
                        }
                        .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description{
                              color: rgba(0, 0, 0, 0.60);
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-icon{
                              display: none;
                        }
                        .ant-steps-item-description .ant-steps-item-container .ant-steps-item-tail{
                              display: none;
                        }
                        .ant-steps-item-container{
                              padding-left: 12px;
                        }
                        .ant-steps-item-tail{
                              padding-left: 12px;
                        }
                        .ant-steps-item-description .ant-steps-item-content{
                              display: flex;
                              align-items: center;
                        }
                        .ant-steps-vertical.ant-steps-small .ant-steps-item-container .ant-steps-item-tail{
                              left: 22px;
                        }
                        .ant-steps-item-title{
                              width: 100%;
                              display: flex;
                              justify-content: space-between;
                        }
                        .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
                              color : rgba($color: (#000000), $alpha: 0.60);
                              font-weight: 600;
                        }
                  }
            }
            &__none{
                  @apply hidden;
            }
            &__flex{
                  @apply flex;
            }
            &__icon{
                  background-color: var(--color-gray-icon);
                  width: 18px;
                  height: 18px;
                  border-color: var(--color-gray-icon);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-top: 5px;
                  color: white;
                  border-radius: 50%;
            }

            &__phone-steps{
                  @apply flex gap-[10px] items-center text-[14px] font-semibold md:hidden w-[100%];
            }
      }

</style>