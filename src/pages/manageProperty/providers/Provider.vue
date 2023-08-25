<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
import { ref } from "vue";
import Input from '@/components/Common/Input/Input.vue';

const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})


const connectedWater = ref<boolean>(false);
const connectedGaz = ref<boolean>(false);
const connectedElectricity = ref<boolean>(false);
const params = ref<any>({});
const emit = defineEmits(['getData']);

function handleChange(e : any){
    console.log("Event\n", e);
    for(let i in e){
        switch (i) {
            case 'isGazConnect':
                connectedGaz.value = e[i];
                break;
            case 'isWaterConnect':
                connectedWater.value = e[i];
                break;
            case 'isElectricityConnect':
                connectedElectricity.value = e[i];
                break;
        
            default:
                break;
        }
    }

    params.value = {
        ...params.value,
        ...e
    }
    console.log("pararms\n", params.value);
    emit('getData', params.value)
}
</script>

<template>
    <div class="providers providers__container">
        <div class="providers__header">
            <P>Mon fournisseur, eau, gaz, electricité</P>
            <hr class="providers__divider">
        </div>
        
        <div class="providers__content">
            <div class="providers__item">
                <CheckBox 
                    label="Raccordée au gaz"
                    name="isGazConnect"
                    @handleCheck="handleChange"
                />
                <div class="" v-if="connectedGaz">
                    <Input 
                        label="Nom du fournisseur de gaz"
                        nameInput="providerGaz"
                        @input="handleChange"
                    />
                </div>
            </div>
            <div class="providers__item">
                <CheckBox 
                    name="isWaterConnect"
                    label="Raccordée à l'eau"
                    @handleCheck="handleChange"
                />
                <div class="" v-if="connectedWater">
                    <Input 
                        label="Nom du fournisseur d'eau"
                        nameInput="providerWater"
                        @input="handleChange"
                    />
                </div>
            </div>
            <div class="providers__item">
                <CheckBox
                    name="isElectricityConnect" 
                    label="Raccordée à l'éléctricité"
                    @handleCheck="handleChange"
                />
                <div class="" v-if="connectedElectricity">
                    <Input 
                        nameInput="providerElectricity"
                        label="Nom du fournisseur d'électricité"
                        @input="handleChange"
                    />
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.providers{
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
    &__item{
        @apply flex flex-col gap-[10px];
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-0;
        }
    }
    
}
</style>