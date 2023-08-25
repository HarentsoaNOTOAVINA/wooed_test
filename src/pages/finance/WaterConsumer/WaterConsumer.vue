<script lang="ts" setup>
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import { onMounted, ref, watch } from "vue";
import { waterData } from "@/pages/finance/WaterConsumer/data";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Input from "@/components/Common/Input/Input.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import BackButtonVue from "@/components/Common/BackButton/BackButton.vue";
import Button from "@/components/Common/Button/Button.vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import { notification } from "ant-design-vue";

const store = useStore();
const data = ref<any>(waterData);
const route = useRoute();
const emit = defineEmits(['component', 'prev'])
const windowWidth = ref<any>(window.innerWidth)
const params = ref<any>({
    theProperty : route.params.id,
    annualConsumptionState : 0,
    annualConsumptionPrice : 0,
    consumptionName : "water",
    limitDate : "",
    anticipatedAmount : 0,
});
const isValide = ref<boolean>(false);
const loadingSave = ref<boolean>(false);


enum type{
    water = "water"
}

watch(() => params.value, (value : any) => {
    store.dispatch('FinancialModule/getConsumer', value);
    isValide.value = Object.values(value).every(item => item !== 0 && item !== "")
}, {immediate : true, deep : true})

onMounted(() => {
    resize();
});

function prev(){
    emit('prev');
}

function resize(){
    window.onresize = () => {
        windowWidth.value = window.innerWidth;
    }
}

function handleChange(value : any){
    for(let i in value){
        params.value[i] = value[i];
    }
}


function handleFinish(){
    loadingSave.value = true;
    store.dispatch('FinancialModule/postConsumer', type.water)
        .then(() => {
            notification['success']({
                message: 'Enregistrer',
                description: "Consommation d'eau enregistré",
            });
            prev();
        })
        .finally(() => {
            loadingSave.value = false;
        })

}


</script>

<template>
    <div class="water__container">
            <div class="water__header">
                <div class="water__back" @click="prev">
                    <BackButtonVue />
                </div>
                <P class="water__title">Consommation d'eau</P>
            </div>
            <hr class="water__divider">
            <div class="">
                <div class="water__subItem" v-for="item in data" :key="item.id">
                    <P class="water__subtitle">{{item.title}}</P>
                    <hr v-if="item.id !== data.length-1" class="water__divider">
                    <div class="water__subItem-content">
                            <div class="" v-for="subItem in item.item">
                                <Input
                                    v-if="subItem.type === 'number'"
                                    :name-input="subItem.name"
                                    :label="subItem.label"
                                    :placeholder="subItem.placeholder"
                                    :disabled="subItem.disable"
                                    :input-type="subItem.type"
                                    @input="handleChange"
                                    :required="subItem.required"
                                />
                                <Input 
                                    v-if="subItem.type === 'text'"
                                    :name-input="subItem.name"
                                    :label="subItem.label"
                                    :placeholder="subItem.placeholder"
                                    :disabled="subItem.disable"
                                    @input="handleChange"
                                    :required="subItem.required"
                                />
                                <InputDate 
                                    v-if="subItem.type === 'date'"
                                    :name="subItem.name"
                                    :label="subItem.label"
                                    @handle-date-format-en="handleChange"
                                    :required="subItem.required"
                                />
                                <Switch 
                                    v-if="subItem.type === 'switch'"
                                    :name="item.name"
                                    checked-name="OUI"
                                    unchecked-name="NON"
                                />
                            </div>
                    </div>
                </div>
            </div>
            <Button 
                type-button="secondary" 
                class="water__footer-btn" 
                :width="windowWidth < 768 ? '100%' : '130px'" 
                @click="handleFinish"
                :disabled="!isValide"
            >
                <LoadingButton size="xs" v-if="loadingSave"/>
                Enregistrer
            </Button>
    </div>
</template>

<style lang="scss" scoped>
    .water{
        &__container{
            @apply bg-white rounded-[8px] p-[18px] flex flex-col gap-[18px] min-h-[100vh_-_20px];
        }
        &__title{
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px] ;
        }
        &__subtitle{
            color : #949FB5;
            font-weight: 400;
        }
        &__subItem{
            @apply flex flex-col gap-[24px];
        }
        &__subItem-content{
            @apply md:grid md:grid-cols-2 gap-[24px];
        }
        &__header{
            @apply flex;
        }
        &__back{
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__divider{
            color: #F2F2F2;
        }
        &__footer-btn{
            @apply flex justify-end;
            &:deep(){
                button{
                    @apply flex gap-[5px] justify-center;
                }
            }
        }
    }
</style>