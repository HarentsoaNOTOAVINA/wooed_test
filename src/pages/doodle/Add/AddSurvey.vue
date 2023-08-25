<template>
    <div class="add-survey add-survey__container">
        <div class="add-survey__header">
            <BackButton 
                @click="onClickBack"
            />
            <P class="add-survey__title">{{ infos.title }}</P>
        </div>
        <div class="add-survey__form">

            <div class="add-survey__forn-container">
                <div class="add-survey__form-head">
                    <P class="add-survey__date-title">Information de base</P>
                    <hr class="add-survey__divider">
                </div>

                <div class="add-survey__title-container">
                    <Input 
                        name-input="title"
                        label="Titre"
                        @input="handleChange"
                    />
                </div>
                <div class="add-survey__address-container">
                    <Input 
                        label="Lieu"
                        name-input="place"
                        @input="handleChange"
                    />
                </div>
        
                <div class="add-survey__description-container">
                    <TextArea 
                        label="Description"
                        name-input="description"
                        @handle-change="handleChange"
        
                    />
                </div>
            </div>

            
            <div class="add-survey__date-container">
                
                <div class="add-survey__form-head">
                    <P class="add-survey__date-title">Horaire suggeré</P>
                    <hr class="add-survey__divider">
                </div>
                <div class="add-survey__date-body">
                    <div class="add-survey__date-content">
                        <div 
                            class="add-survey__date-item"
                            v-for="item in nbTime" :key="item"
                        >
                            <InputDate 
                                label="Date"
                                name="date"
                                :min="true"
                                @handle-date-eng="handleChange($event, item)"
                            />
                            <TimePicker 
                                label="Heure"
                                name="time"
                                @change="handleChange($event, item)"
                            />
                        </div>
                    </div>
                    <div class="add-survey__date-add">
                        <div 
                            class="add-survey__date-action"
                            @click="addTime"
                        >
                            +
                        </div>
                        <div 
                            class="add-survey__date-action"
                            @click="minusTime"
                            v-if="nbTime > 1"
                        >
                            -
                        </div>
                    </div>
                </div>
            </div>

            <div class="add-survey__btn-container">
                <Button type-button="border" @click="handleCancel"> 
                    Annuler 
                </Button>
                <Button type-button="secondary" @click="onAddSurveyHandler"> 
                    <LoadingButton size="xs" v-if="loadingAdd" />
                    Ajouter 
                </Button>
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import Input from '@/components/Common/Input/Input.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import Button from '@/components/Common/Button/Button.vue';
import BackButton from '@/components/Common/BackButton/BackButton.vue';
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import { ref } from "vue";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { useStore } from "vuex";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const infos = {
    title : 'Créer votre sondage de groupe'
}

const store = useStore()
const router = useRouter()
const emit = defineEmits(['back']);
const nbTime = ref<number>(1);
const loadingAdd = ref<boolean>(false);
const params = ref<any>({
    dates : [
        {
            date : '',
            time : ''
        }
    ]
})

function onClickBack(){
    emit('back');
}

function addTime(){
    nbTime.value++;
}

function minusTime(){
    if(nbTime.value > 1){
        nbTime.value--;
    }
}

function handleChange(e : any, occur ?: number){
    if(Object.keys(e)[0] === 'date' || Object.keys(e)[0] === 'time'){
        console.log('date\n', occur);
        if(occur){
            console.log("length\n", params.value.dates.length);
            console.log("Occurance\n", occur);
            
            if(params.value.dates.length >= occur){
                params.value.dates[occur-1][Object.keys(e)[0]] = Object.values(e)[0];
            }else{
                params.value.dates = [
                    ...params.value.dates,
                    {
                        date : '',
                        time : ''
                    }
                ]
                params.value.dates[occur-1][Object.keys(e)[0]] = Object.values(e)[0];
            }
        }
    }else{
        params.value = {
            ...params.value,
            ...e
        }
    }
    console.log(params.value);
    
}

async function onAddSurveyHandler(){
    loadingAdd.value = true;

    try{
        const response = await store.dispatch('SurveyModule/createSurvey', params.value);
        console.log(response);
        notification['success']({
            message : "Succès",
            description : "Sondage ajouté avec succès"
        })
    emit('back');

        
    }catch(err){
        notification['error']({
            message : "Erreur",
            description : "Une erreur s'est produite, veuillez réessayer plus tard"
        })
    }finally{
        loadingAdd.value = false;
    }

}

function handleCancel(){
    emit('back');
}

</script>

<style lang='scss' scoped>
.add-survey{
    &__container{
        @apply p-[10px] flex flex-col gap-[20px];
    }

    &__date-container{
        @apply flex gap-[10px];

        &:deep(){
            .time-picker{
                @apply flex-1 flex flex-col gap-[8px];
                
                .paragraphe__normal{
                    color: var(--color-gray-icon);
                    @apply font-medium text-[14px];
                }
            }
        }
    }

    &__header{
        @apply flex gap-[10px];
    }

    &__divider{
        @apply text-slate-300;
    }

    &__title{
        color: var(--color-gray-icon);
        @apply font-medium;
    }

    &__form{
        @apply flex flex-col gap-[20px];
    }
    
    &__date-container{
        @apply  border rounded-[8px] p-[10px] border-slate-300 flex flex-col;
    }

    &__date-body{
        @apply flex gap-[10px];
    }

    &__date-content{
        @apply flex-1 flex flex-col gap-[10px];
    }

    &__date-add{
        @apply flex flex-col gap-[10px] text-xl justify-center items-center;
    }

    &__date-title{
        color: var(--color-gray-icon);
        @apply font-semibold;
    }

    &__date-item{
        @apply flex-1 flex gap-[10px];
    }

    &__date-action{
        @apply bg-slate-100 rounded-[50%] h-[35px] w-[35px] flex justify-center items-center cursor-pointer hover:bg-slate-200;
    }

    &__title-container{

    }

    &__address-container{

    }

    &__description-container{

    }

    &__btn-container{
        @apply w-full flex justify-end gap-[10px];
        &:deep(){
            .button__secondary{
                @apply w-[120px] font-normal;
            }
            .button__border{
                @apply w-[120px] font-normal;
            }
        }
    }

    &__forn-container{
        @apply flex flex-col gap-[10px] border rounded-[8px] p-[10px] text-slate-300;
    }

    &__form-head{
        @apply flex flex-col gap-[10px];
    }

    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
        .icon{
            @apply cursor-pointer;
        }
    }
}
</style>