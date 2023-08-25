<template>
    <div>
        <Input
            placeholder="Type"
            name-input="typeProduct"
            label="Type d'objet à vendre"
            @input="handleChange"
        />
        <Input 
            placeholder="Lieu" 
            id="address" 
            name-input="address"
            label="Lieu du vente"
            @input="handleChange"
        />
        <Input 
            placeholder="Prix (€)"
            name-input="price"
            label="Prix"
            input-type="number"
            @input="handleChange"
        />
        <Input
            placeholder="Quantité"
            name-input="quantity"
            label="Quantité disponible (stères/m3)"
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
        <div class="modal-button">
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
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import useAutoComptetion from '@/composables/useAutoComplete';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { ref, watch } from 'vue';
import { notification } from "ant-design-vue";
import store from '@/store';

const {autocompleteResult} = useAutoComptetion('address');
const emit = defineEmits(['closeModal'])

const loading = ref<boolean>(false)
const params = ref<any>({
    type : "sale"
});

watch(() => autocompleteResult, (value) => {
    params.value = {
        ...params.value,
        address : value.value?.address,
        latitude : value.value?.lat,
        longitude : value.value?.lng
    }
}, {immediate : true, deep : true})

watch(() => params.value, (value) => {
    store.dispatch('CommunityModule/getDetailsPublication', value);
}, {immediate : true, deep : true});

function handleChange(item : any){
    params.value = {
        ...params.value,
        ...item
    }
}

async function handleSubmit(){
    console.log("params\n", params.value);
    loading.value = true
    await store.dispatch('CommunityModule/createPost')
    .then(res => {
        notification['success']({
            message : "Succès",
            description : "Votre publication a été publié avec succès"
        })
        emit('closeModal');
    })
    .catch(err => {
        console.log("erreur\n", err);
        
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
    .date__space {
        @apply mb-[15px];
    }
</style>