<script lang="ts" setup>
import { data } from "@/pages/manageProperty/components/Stepper/data";
import ASteps from "ant-design-vue/lib/steps/index";
import ArrowMenu from '@/components/Icon/ArrowMenu.vue';
import { ref, watch } from "vue";


const props = defineProps({
        activeId : {
                type : Number,
                default : 0,
        }
})


const dataStep = ref<any>(data) 
const current = ref<number>(0);
const currentSub = ref<number>(props.activeId);
const AStep = ASteps.Step;

watch(() => props.activeId, (value) => {
        currentSub.value = value;
}, {immediate : true, deep : true})

watch(() => current.value, (value) => {
    current.value = value;
}, {immediate : true, deep : true});

watch(() => currentSub.value, (value) => {
    currentSub.value = value;
}, {immediate : true, deep : true});



</script>

<template>
    <div class="stepper__container">
        <div class="" v-for="(item, idItem) in dataStep" :key="idItem">
                <div class="stepper__phone-steps" v-if="item.children.includes(+currentSub)">
                    <div class="stepper__icon"> {{idItem + 1}} </div>
                    <Paragraphe>{{item.label}}</Paragraphe>
                </div>
        </div>
        <a-steps
            direction="vertical"
            :current="current"
            size="small"
            class="hidden md:flex"
        >
          <a-step v-for="(item, index) in dataStep" :key="index">
                <template #title>
                    {{item.label}}
                </template>
                <template #subTitle v-if="item.children.includes(+currentSub)">
                    <arrow-menu/>
                </template>
                <template #description>
                    <a-steps
                        class="hidden md:flex" 
                        direction="vertical"
                        :current="currentSub"
                        v-if="item.children.includes(+currentSub)"
                    >
                      <a-step 
                        v-for="(subItem, subIndex) in item.subMenu" :key="subIndex"
                        :class="[subItem.id === currentSub ? 'sub-item-active' : '']"
                        >
                            <template #title>
                                {{subItem.label}}
                            </template>
                      </a-step>
                    </a-steps>
                </template>
          </a-step>
        </a-steps>
    </div>
</template>

<style lang="scss" scoped>
.stepper{
    &__container{
            @apply bg-[white] w-[100%] md:w-[350px] md:min-h-[calc(100vh_-_100px)] rounded-[8px] p-[12px];
            .sub-item-active{
                background-color: var(--color-gray);
                @apply rounded-[8px] w-[270px] h-[42px] flex items-center;
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