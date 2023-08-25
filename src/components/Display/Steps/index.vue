<script lang="ts" setup>
import ASteps from "ant-design-vue/lib/steps";
import { ref } from "vue";
import ArrowMenu from '@/components/Icon/ArrowMenu.vue';
import Button from "@/components/Common/Button/Button.vue";


const AStep  = ASteps.Step;
// const step = ref<number>(0);
const idActive = ref<Array<number>>([1]);
const idItemActive = ref<Array<number>>([0]);


let current = ref<number>(0);

const next = (nextPage: string) => {
      current.value++;
      emit('next', nextPage);
};

const prev = (prevPage: string) => {
      current.value--;
      emit('prev', prevPage);
};


const emit = defineEmits(['component', 'next', 'prev']);
defineProps<{
      data : any;
      stepPosition: string;
      disable: boolean,
}>();


function clickItem(item : any, subitem ?: any) : void{
      if(subitem){
            idActive.value = [...idActive.value, subitem.id];
            emit('component', subitem.component);
      }else{
            emit('component', item.component);
      }
      idItemActive.value = [...idItemActive.value, item.id];
      
}
</script>

<template>
      <div class="container steps__container">
            <div v-if="stepPosition === 'vertical'">
                  <a-steps 
                        :current="current"  
                        direction="vertical"
                        size="small"
                        class=""
                  >
                        <a-step v-for="(item, key) in data" :key="key" class="" >
                              <template #title >
                                    {{item.label}}
                              </template>
                              <template #subTitle v-if="item.id === idItemActive[idItemActive.length - 1]">
                                    <arrow-menu/>
                              </template>
                              <template #description >
                                    <a-steps 
                                          class="steps-description hidden md:flex" 
                                          direction="vertical" 
                                          v-if="item.id === idItemActive[idItemActive.length - 1]"
                                          :current="idActive[idActive.length - 1]"
                                    >
                                          <a-step v-for="(subItem, _k) in item.subMenu"  :key="_k+'r'" :class="[subItem.id === idActive[idActive.length - 1] ? 'sub-item-active' : '']">
                                                <template #title>
                                                      {{subItem.label}}
                                                </template>
                                          </a-step>
                                    </a-steps>
                              </template>
                        </a-step>
                  </a-steps>
            </div>
            <div v-if="stepPosition === 'horizontal'">
                  <div class="horizontal-steps">
                        <a-steps :current="current">
                              <!-- <a-step v-for="item in data" :key="item.label" :title="item.label" /> -->
                              <a-step v-for="item in data" :key="item.label" >
                                    <template #title>
                                          <span>
                                                {{ item.label }}
                                          </span> 
                                    </template>
                              </a-step>
                        </a-steps>
                        <div class="steps-content">
                              <!-- {{ data[current].content }} -->
                              <keep-alive>
                                    <component
                                          :is="data[current].content"
                                          @onNext="next"
                                          @onPrev="prev"
                                    />
                              </keep-alive>
                        </div>
                        <div class="steps-btn">
                              <Button
                                    typeButton="border"
                                    html-type="button"
                                    @on-click="prev(data[current - 1].label)"
                                    v-if="current > 0"
                              >
                                    Précedent
                              </Button>
                              <Button
                                    typeButton="border"
                                    html-type="button"
                                    @on-click="next(data[current + 1].label)"
                                    v-if="current < data.length - 1"
                                    :disabled="disable"
                              >
                                    Suivant
                              </Button>
                        </div>
                  </div>
            </div>
      </div>
</template>

<style lang="scss" scoped>
     
      .steps{
            &__container{
                  // @apply bg-[white] w-[100%] md:w-[315px] rounded-[8px] p-[12px];
                  @apply bg-[white] my-[18px] container rounded-[8px] p-[12px];
                  width: 100%;
                  .sub-item-active{
                        background-color: var(--color-gray);
                        @apply rounded-[8px] w-[200px] h-[42px] flex items-center;
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
                        .ant-steps-label-horizontal{
                              width: 75%;
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
            
      }
      .horizontal-steps{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 25px;
            align-items: center;
      }
      .steps-btn{
            width: 75%;
            display: flex;
            justify-content: space-between;
      }
      .steps-content {
            margin-top: 18px;
            // border: 1px dashed #e9e9e9;
            // background-color: var(--color-gray);
            // min-height: 200px;
            border-radius: 6px;
            background-color: #fafafa;
            gap: 18px;
            width: 100%;
            text-align: center;
            padding-top: 20px;
      }
</style>