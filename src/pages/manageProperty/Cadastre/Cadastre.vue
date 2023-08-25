<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Input from '@/components/Common/Input/Input.vue';
import { ref } from "vue";

const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})

const params = ref<any>({})
const emit = defineEmits(['getData'])

function handleChange(e : any){
    params.value = {
        ...params.value,
        ...e
    }  
    
    console.log("Params\n", params.value);
    emit('getData', params.value);
}
</script>

<template>
    <div class="cadastre cadastre__container">
        <div class="cadastre__header">
            <P>Cadastre</P>
            <hr class="cadastre__divider">
        </div>
        
        <div class="cadastre__content">
            <div class="">
                <Input 
                    label="Cadastre"
                    :required="true"
                    name-input="cadastre"
                    @input="handleChange"
                />
            </div>
            <div class="">
                <Input 
                    label="Révenue cadastral"
                    :required="true"
                    name-input="cadastralreturn"
                    input-type="number"
                    placeholder="€"
                    @input="handleChange"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cadastre{
    &__container{
        @apply flex flex-col gap-[30px];
    }

    &__content{
        @apply flex flex-col gap-[20px];
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }


    &__divider{
        @apply text-slate-300;
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }
}
</style>