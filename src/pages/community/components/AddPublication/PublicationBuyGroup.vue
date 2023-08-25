<template>
    <div>
        <Input
            placeholder="Categorie"
            name-input="category"
            label="Categorie"
            @input="handleChange"
        />
        <Input
            placeholder="Prix"
            name-input="price"
            label="Prix"
            input-type="number"
            @input="handleChange"
        />
        <InputDate  
            name="dateCloture" 
            label="Fin de l'achat groupé" 
            placeholder="Date" 
            @handle-date-format="handleChange"
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
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { notification } from "ant-design-vue";


const loading = ref<boolean>(false)
const store = useStore();
const emit = defineEmits(['closeModal']);
const params = ref<any>({
    type : "purchase",
})


watch(() => params.value, (value) => {
    store.dispatch('CommunityModule/getDetailsPublication', value);
}, {immediate : true, deep : true})

function handleChange(item : any){
    console.log(item);
    params.value = {
        ...params.value,
        ...item
    }
}

async function handleSubmit(){
    console.log("params", params.value);
    loading.value = true,
    await store.dispatch('CommunityModule/createPost')
    .then(res => {
        notification['success']({
            message : "Succès",
            description : "Votre publication a été publié avec succès"
        })

        emit('closeModal');
    }).catch(err => {
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