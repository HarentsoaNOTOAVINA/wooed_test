<template>
    <div>
        <Input
            placeholder="Ex: baby sitter"
            name-input="category"
            label="Votre service"
            @input="handleChange"
        />
        <InputDate 
            name="date" 
            label="Date" 
            placeholder="Date de demande de service"
            @handle-date-format="handleChange"
        />
        <div class="fields-flex">
            <TimePicker
                name="startTime" 
                placeholder="Heure debut"
                @change="handleChange"
            />
            <TimePicker 
                name="endTime" 
                placeholder="Heure fin"
                @change="handleChange"
            />
        </div>
        <Input
            placeholder="Lieu du travail"
            name-input="address"
            label="Lieu"
            :id="address"
            @input="handleChange"
        />
        <Input
            placeholder="Prix de votre service (€)"
            name-input="price"
            label="Prix"
            input-type="number"
            @input="handleChange"
        />
        <TextArea
            class="description"
            name-input="content"
            placeholder="Description"
            label="Description"
            @handle-change="handleChange"
        /> 
        <div class="modal-button" v-if="!contre">
            <Button typeButton="secondary" @click="handleSubmit">
                <LoadingButton size="xs" v-if="loading" />
                Publier
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Common/Button/Button.vue';
import Input from '@/components/Common/Input/Input.vue';
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
import useAutoComptetion from '@/composables/useAutoComplete';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import {notification } from "ant-design-vue";

const address = ref<string>('address')

const props = defineProps({
    contre : {
        type : Boolean,
        default : false
    },
    publication : {
        type : Object,
        default : {}
    }
})

const {autocompleteResult} = useAutoComptetion(props.contre ? 'contre' : 'address');
const store = useStore();
const loading = ref<boolean>(false)
const params = ref<any>({
    type : "newService",
}) 
const emit = defineEmits(['closeModal'])

watch(() => params.value, (value) => {
    store.dispatch('CommunityModule/getDetailsPublication', value)
}, {immediate : true, deep : true});

watch(() => props.contre , (value) => {
    if(value){
        address.value = "contre"
    }else{
        address.value = 'address'
    }
}, {immediate : true})

watch(() => autocompleteResult, (value) => {
    console.log(value.value?.address);
    
    params.value = {
        ...params.value,
        address : value.value?.address,
        latitude : value.value?.lat,
        longitude : value.value?.lng,
    }
}, {immediate : true, deep : true});

function handleChange(item : any){
    console.log("Hanlde change item\n", item);
    params.value = {
        ...params.value,
        ...item
    }
}

async function handleSubmit(){
    console.log("params value\n", params.value);

    loading.value = true;

    await store.dispatch('CommunityModule/createPost', params.value)
    .then(res => {
        notification['success']({
            message : "Succès",
            description : "Votre publication a été publié avec succès"
        })
        emit('closeModal');
    })
    .catch(err => {
        console.log("Erreur\n",err);
        
        notification['error']({
            message : "Erreur",
            description : err.data?.message
        })
    })
    .finally(() => {
        loading.value = false;
    })

}


</script>

<style lang="scss" scoped>
    .fields-flex {
        @apply grid grid-cols-2 gap-[15px] my-[15px] 
    }
    .custom-input__fields {
        margin-bottom: 15px;
    }
    .modal-button {
        @apply flex justify-end mt-[15px];
    }
</style>