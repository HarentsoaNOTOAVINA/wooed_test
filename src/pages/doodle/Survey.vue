<template>
    <div>
        <div class="survey survey__container">
            <div class="survey__header">
                <Paragraphe class="survey__title">Doodle</Paragraphe>
            </div>
            <div class="survey__content">
                <component 
                    :is="activeComp[activeComp.length - 1]"
                    @back="handleBack"
                    @onChangeComp="handleChangeComp"
                />
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import AddSurvey from '@/pages/doodle/Add/AddSurvey.vue'
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import ListSurvey from '@/pages/doodle/SurveyList/SurveyList.vue'
import { ref, shallowRef, watch } from "vue";

const activeComp = ref<Array<any>>([ListSurvey]);


function handleChangeComp(component : string){
    switch (component) {
        case "addSurvey":
            activeComp.value = [
                ...activeComp.value,
                AddSurvey
            ]
            break;
    
        default:
            break;
    }

}

function handleBack(){
    activeComp.value.pop();
}

</script>

<style lang='scss' scoped>
.survey{
    &__container{
        @apply flex flex-col gap-[10px] container my-[10px]  min-h-[calc(100vh_-_100px)];
    }

    &__header{
        @apply bg-white rounded-[8px] p-[20px];
    }

    &__content{
        @apply bg-white p-[10px] rounded-[8px] flex-1;
    }

    &__title{
        @apply font-semibold;
    }
}
</style>