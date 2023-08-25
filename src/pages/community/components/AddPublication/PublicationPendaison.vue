<template>
    <div>
        <InputDate 
            name="date" 
            label="Date" 
            placeholder="Date" 
            @handle-date-format="handleChange"
        />
        <TimePicker 
            name="hour" 
            placeholder="Heure" 
            label="Heure"
            @change="handleChange"
        />
        <div class="fields-flex">
        </div> 
        <Input
            placeholder="Lieu du travail"
            name-input="place"
            label="Lieu"
            id="address" 
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
import InputDate from '@/components/Common/InputDate/InputDate.vue';
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
import useAutoComptetion from '@/composables/useAutoComplete';
import { ref, watch } from 'vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { useStore } from 'vuex';
import { notification } from "ant-design-vue";

const store = useStore()
const { autocompleteResult } = useAutoComptetion('address');
const loading = ref<boolean>(false);
const emit = defineEmits(['closeModal']);

const params = ref<any>({
    type : 'houseWarming'
})

watch(() => autocompleteResult, (value) => {
    params.value = {
        ...params.value,
        place : value.value?.address,
        latitude : value.value?.lat,
        longitude : value.value?.lng
    }
}, {immediate : true, deep : true})

watch(() => params.value, (value) => {
    store.dispatch('CommunityModule/getDetailsPublication', value);
}, {immediate : true, deep : true})

function handleChange(item : any){
    console.log("item\n", item);
    params.value = {
        ...params.value,
        ...item
    }
}

async function handleSubmit(){
    loading.value = true;
    await store.dispatch('CommunityModule/createPost')
    .then(res => {
        notification['success']({
            message : "Succès",
            description : "Votre publication a été publié avec succès"
        })
        emit('closeModal');
    })
    .catch(err => {
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