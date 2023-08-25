<script lang="ts" setup>
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import { computed, onMounted, ref } from "vue";
import { tankData } from "@/pages/finance/Tank/data";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Input from "@/components/Common/Input/Input.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import BackButtonVue from "@/components/Common/BackButton/BackButton.vue";
import Button from "@/components/Common/Button/Button.vue"
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Loader from "@/components/Common/Loader/Loader.vue";
import { Empty as AEmpty } from "ant-design-vue";
import moment from "moment";

const data = ref<any>(tankData);
const store = useStore();
const route = useRoute();
const emit = defineEmits(['prev']);
const windowWidth = ref<any>(window.innerWidth);
const informations = ref<any>();


const loading = ref<boolean>(false);

onMounted(() => {
    resize();
    getDetails();
})

function resize(){
    window.onresize = () => {
        windowWidth.value = window.innerWidth;
    }
}

function prev(){
    emit('prev');
}

function getDetails(){
    loading.value = true;
    store.dispatch('FinancialModule/getTankDetail', route.params.id)
    .finally(() => {
        loading.value = false;
    })
}

function formatDate(date : any){
    return moment(date).format('LL');
}
</script>

<template>
    <div class="tank__container">
            <div class="tank__header">
                <div class="tank__back" @click="prev">
                    <BackButtonVue />
                </div>
                <P class="tank__title">Citerne</P>
            </div>
            <hr class="tank__divider">
            <Loader  v-if="loading"/>
            <div class="" v-else-if="informations">
                <div class="tank__subItem" v-for="item in data" :key="item.id">
                    <P class="tank__subtitle">{{item.title}}</P>
                    <hr v-if="item.id !== data.length-1" class="tank__divider">
                    <div class="tank__subItem-container">
                            <div class="tank__subItem-content" v-for="subItem in item.item">
                                <Input 
                                    v-if="subItem.type === 'number'"
                                    :name-input="subItem.name"
                                    :label="subItem.label"
                                    :placeholder="subItem.placeholder"
                                    :disabled="subItem.disable"
                                    :input-type="item.type"
                                    :value="`${informations[0].cost} €`"
                                />
                                <Input 
                                    v-if="subItem.type === 'text'"
                                    :name-input="subItem.name"
                                    :label="subItem.label"
                                    :placeholder="subItem.placeholder"
                                    :disabled="subItem.disable"
                                    :value="formatDate(informations[0].date)"
                                />
                                <InputDate 
                                    v-if="subItem.type === 'date'"
                                    class="mb-[10px]"
                                    :name="subItem.name"
                                    :label="subItem.label"
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
            <div class="tank__empty-container" v-else>
                <a-empty description="Aucune donnée à afficher"/>
                <div class="tank__redirection">
                    <Button type-button="border">Se rendre vers travaux</Button>
                </div>
            </div>
           
            <Button 
                v-if="informations"
                type-button="secondary" 
                class="tank__footer-btn"  
                :width="windowWidth < 768 ? '100%' : '120px'"
                disabled
            >
                Enregistrer
            </Button>
    </div>
</template>

<style lang="scss" scoped>
    .tank{
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
            @apply gap-[24px];
        }
        &__subItem-container{
            @apply flex flex-col gap-[24px];
        }
        &__header{
            @apply flex;
        }
        &__back{
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
        &__divider{
            color : #F2F2F2;
        }
        &__footer-btn{
            @apply flex justify-end;
        }
        &__redirection{
            @apply w-[100%] flex justify-center items-center;
        }

        &__empty-container{
            @apply flex flex-col gap-[20px];
        }

    }
</style>