<script lang="ts" setup>
import Stepper from "@/pages/manageProperty/components/Stepper/Stepper.vue";
import { ref, watch } from "vue";
import Adress from "@/pages/manageProperty/Adress/Adress.vue";
import Button from "@/components/Common/Button/Button.vue";
import { data } from "@/pages/manageProperty/components/Stepper/data";
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import { notification } from "ant-design-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";


const activeComponent = ref<Array<any>>([Adress]);
const current = ref<number>(0);
const routes = useRouter();

// const activeNext = ref<any>({
//     adress : false,
//     provider : false,
//     cadastre : false,
//     photos : false,
//     caracteristic : false,
//     inside : false,
//     energy : false
// })
const activeNextBtn = ref<boolean>(false);
const paramsData = ref<any>({});
const loadAdd = ref<boolean>(false);
const store = useStore()
watch(() => current.value, (value) => {
    current.value = value;

    data.forEach(item => {
        if(item.children.includes(value)){
           item.subMenu.forEach(subItem => {
                if(subItem.id === value){
                    activeComponent.value = [subItem.component]
                }
           })
        }
    })
}, {immediate : true, deep : true});

watch(() => activeComponent.value, (value) => {
    activeComponent.value = value;
}, {immediate : true, deep : true});

function onClickNext(){
    if(current.value < data[data.length - 1]?.children[data[data.length - 1].children.length - 1]){
        current.value++
    }
}

function onClickPrev(){
    if(current.value > 0){
        current.value--;
    }
}

function handleActiveNext(){
    activeNextBtn.value = true;
}

function handleDisableNext(){
    activeNextBtn.value = false;
}


function handleGetData(params : any){
    paramsData.value = {
        ...paramsData.value,
        ...params
    }
    
}

async function handleSave(){

    loadAdd.value = true;
    setTimeout(() => {
       
    }, 3000);

    await store.dispatch('ManagePropertyModule/createProperty', paramsData.value)
    .then(res => {
        notification['success']({
            message : "Succès",
            description : "Votre bien à été ajouté avec succès"
        })
        routes.push('/manage-property');
    })
    .catch(err => {
        notification['error']({
            message : "Erreur",
            description : "Erreur lors de l'ajout de vos bien."
        })
    })
    .finally(() => {
        loadAdd.value = false;
    })

}

</script>

<template>
    <div class="add-property add-property__container">
        <Stepper 
            :active-id="current"
        />
        <div class="add-property__content">
            <KeepAlive>
                <component 
                    :idActive="current"
                    :is="activeComponent[activeComponent.length - 1]"
                    @activeNext="handleActiveNext"
                    @disableNext="handleDisableNext"
                    @getData="handleGetData"
                />
            </KeepAlive>

            <div class="add-property__footer">
                <hr class="add-property__divider">
                <div class="add-property__footer-content">
                    <P>(*) Champ obligatoire </P>
                    <div class="add-property__footer-action">
                        <Button 
                            type-button="gray" 
                            @click="onClickPrev" 
                            v-if="current > 0"
                        >
                            Précédent
                        </Button>
                        
                        <Button 
                            type-button="secondary" 
                            @click="onClickNext" 
                            :disabled="!activeNextBtn"
                            v-if="current < data[data.length - 1]?.children[data[data.length - 1].children.length - 1]"
                        >
                            Suivant
                        </Button>
                        
                        <Button 
                            type-button="secondary" 
                            :disabled="!activeNextBtn"
                            v-if="current === data[data.length - 1]?.children[data[data.length - 1].children.length - 1]"
                            @click="handleSave"
                        >
                            <LoadingButton size="xs" v-if="loadAdd" />
                            Terminer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.add-property{
    &__container{
        @apply container flex flex-col md:flex-row my-[10px] gap-[10px];
    }

    &__content{
        @apply bg-white rounded-[8px] p-[10px] flex-1 flex flex-col justify-between min-h-[calc(100vh_-_130px)] md:min-h-[calc(100vh_-_100px)];
    }

    &__footer{
        @apply flex flex-col gap-[10px] mt-[10px];
    }

    &__divider{
        @apply text-slate-200;
    }

    &:deep(){
        .button__secondary{
            @apply text-[12px] w-[120px];
        }
        .button__gray{
            @apply text-[12px] w-[120px];
        }
    }

    &__footer-action{
        @apply flex justify-end gap-[10px];
    }
}
</style>