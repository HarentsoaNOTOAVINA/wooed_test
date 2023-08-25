<script lang="ts" setup>
import { string } from 'vue-types';
import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue'

import AddIcon from "@/components/Icon/AddSecurity.vue";



const emit = defineEmits(['onClick'])

const props = defineProps({
    title : {
        type : String,
        default : "Ajouter"
    }
})


function handleClickAdd(){
    emit('onClick');
}


</script>

<template>
    <div class="add__container" @click="handleClickAdd">
        <AddIcon />
        <Paragraph class="add__title">{{title}}</Paragraph>
    </div>
</template>

<style lang="scss" scoped>
    .add{
        &__container{
            @apply border border-dashed border-slate-400 p-[20px] rounded-[8px] h-auto w-[270px] cursor-pointer flex flex-col justify-center items-center hover:bg-slate-50;
        }

        &__title{
            @apply text-center;
        }
    }
</style>