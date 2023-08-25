<script lang="ts" setup>
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import { electriData } from "@/pages/finance/ElectricConsumer/data";
import { onMounted, ref, watch } from "vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Input from "@/components/Common/Input/Input.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import BackButtonVue from "@/components/Common/BackButton/BackButton.vue";
import Button from "@/components/Common/Button/Button.vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import { notification } from "ant-design-vue";




const data = ref<any>(electriData)
const store = useStore();
const route = useRoute();
const windowWidth = ref<any>(window.innerWidth)
const params = ref<any>({
    theProperty : route.params.id,
    annualConsumptionState : 0,
    annualConsumptionPrice : 0,
    consumptionName : "electricity",
    limitDate : "",
    anticipatedAmount : 0,
});
const loadingSave = ref<boolean>(false);
const isValide = ref<boolean>(false);

enum type{
    electric = "electricity"
}

const emit = defineEmits(['prev'])

watch(() => params.value, (value : any) => {
    store.dispatch('FinancialModule/getConsumer', value);
    isValide.value = Object.values(value).every(item => item !== 0 && item !== "")
}, {immediate : true, deep : true})

onMounted(() => {
    resize();
})

function prev(){
    emit('prev');
}

function resize(){
    window.onresize = () => {
        windowWidth.value = window.innerWidth;
    }
}

function handleChange(value : any){
    console.log("vanue\n", value);
    for(let i in value){
        params.value[i] = value[i];
    }
}

function handleFinish(){
    loadingSave.value = true;
    store.dispatch('FinancialModule/postConsumer', type.electric)
        .then(() => {
            notification['success']({
                message: 'Enregistrer',
                description: "Consommation électrique enregistré",
            });
            prev();
        })
        .finally(() => {
            loadingSave.value = false;
        })
}


</script>

<template>
    <div class="electric__container">
            <div class="electric__header">
                <div class="electric__back" @click="prev">
                    <BackButtonVue />
                </div>
                <P class="electric__title">Consommation électrique</P>
            </div>
            <hr class="electric__divider">
            <div class="">
                <div class="electric__subItem" v-for="item in data" :key="item.id">
                    <P class="electric__subtitle">{{item.title}}</P>
                    <hr v-if="item.id !== data.length-1" class="electric__divider">
                    <div class="electric__subItem-content">
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
                class="electric__footer-btn"  
                :width="windowWidth < 768 ? '100%' : '150px'" 
                @click="handleFinish" 
                :disabled="!isValide"
            >
                <LoadingButton size="xs" v-if="loadingSave" />
                Enregistrer
            </Button>
    </div>
</template>

<style lang="scss" scoped>
    .electric{
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
            color:#F2F2F2;
        }
        &__footer-btn{
            @apply flex justify-end;
        }
        &:deep(){
            button{
                @apply flex gap-[5px] justify-center;
            }
        }
    }
</style>