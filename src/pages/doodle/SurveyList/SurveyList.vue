<template>
    <div class="survey-list survey-list__container ">
        <Loader v-if="loading" />
        <div class="survey-list__body" v-else>
            <div class="survey-list__header">
                <div class="survey-list__header-content">
                    <P>List des sondages</P>
                    <Button 
                        type-button="border"
                        @click="onClickAdd"
                    >
                        Ajouter
                    </Button>
                </div>
                <hr class="survey-list__divider">
            </div>

            <div class="survey-list__content">
                <div class="survey-list__empty-container" v-if="listSurvey.length <= 0">
                    <a-empty 
                        description="Votre sondage est vide"
                    />
                </div>
                <div class="survey-list__list" v-else>
                    <Card 
                        v-for="(item, index) in listSurvey" 
                        :key="index"
                        :survey="item"
                        @on-click="handleGoDetails"
                        @on-delete="handleDelete"
                        :loading-delete="loadingDelete"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import Button from '@/components/Common/Button/Button.vue';
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import Loader from '@/components/Common/Loader/Loader.vue';
import { notification, Empty as AEmpty } from "ant-design-vue";
import Card from '@/pages/doodle/components/Card.vue';
import { useRouter } from 'vue-router';


const emit = defineEmits(['onChangeComp']);
const store = useStore();
const loading = ref<boolean>(false);
const listSurvey = ref<any[]>([]);
const loadingDelete = ref<boolean>(false)
const count = ref<number>(0);
const router = useRouter();



onMounted(() => {
    getSurveyInStore();
})

watch(() => store.getters['SurveyModule/getMySurvey'], (value) => {
    if(count.value > 0){
        listSurvey.value = value;
    }
    count.value++;
}, {immediate : true, deep : true});

function onClickAdd(){
    emit('onChangeComp', "addSurvey");
}

function getSurveyInStore(){
    const dataStore = store.getters['SurveyModule/getMySurvey'];
    if(dataStore.length > 0){
        listSurvey.value = dataStore;
    }else{
        getListSurvey();
    }
}

async function getListSurvey(){
    loading.value = true;
    try {
        const response = await store.dispatch('SurveyModule/getMySurvey');
        listSurvey.value = response;
        
    } catch (err) {
    }finally{
        loading.value = false;
    }
}

function handleGoDetails(id : number){
    router.push(`/survey/${id}`);
}

async function handleDelete(id : number){
    console.log("Ho fafana aho\n", id);
    loadingDelete.value = true;
    try {
        const response = await store.dispatch('SurveyModule/deleteSurvey', id);
        console.log("response\n", response);
        
        notification['success']({
            'message' : "Succès",
            'description': "Sondage supprimé avec succès"
        })
        
    } catch (err) {
        notification['error']({
            'message' : "Erreur",
            'description': "Une erreur s'est produite, veuillez réessayer plus tard"
        })
        
    }finally{
        loadingDelete.value = false;
    }

    
}


</script>

<style lang='scss' scoped>
.survey-list{
    &__container{
        @apply flex flex-col min-h-full flex-1;
    }

    &__body{
        @apply min-h-full
    }

    &:deep(){
        .button__border{
            @apply w-[120px] font-normal;
        }
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__header-content{
        @apply flex justify-between;
    }

    &__divider{
        @apply text-slate-300;
    }

    &__content{
        @apply min-h-full flex justify-center items-center;
    }

    &__empty-container{
        @apply min-h-full flex justify-center items-center mt-[20px];
    }

    &__list{
        @apply grid sm:grid-cols-2 md:grid-cols-4 gap-[10px] w-full  mt-[10px];
    }
}
</style>