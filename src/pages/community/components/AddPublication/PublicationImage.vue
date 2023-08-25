<template>
    <div class="publication__image">
        <TextArea 
            placeholder="Description" 
            name-input="content" 
            @handle-change="handleChange"
        />
        <UploadImage
            :type-image="true"
            @upload-single-with-name="handleChange"
            name="file"
        />
        <div class="modal-button">
            <Button typeButton="secondary" @click="handlePostImage">
                <LoadingButton v-if="loading" size="xs" />
                Publier
            </Button> 
        </div>
    </div>
</template>

<script setup lang="ts">
import TextArea from '@/components/Common/TextArea/TextArea.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import Button from '@/components/Common/Button/Button.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from "vue-router";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { notification } from "ant-design-vue";

const store = useStore();
const router = useRouter();
const routes = useRoute();
const loading = ref<boolean>(false)
const params = ref<any>({
    type : 'image',
    committee : routes.params.id,
    files : []
});
const emit = defineEmits(['closeModal'])

watch(() => params.value, (value) => {
    console.log(value);
    store.dispatch('CommunityModule/getDetailsPublication', value);
}, {immediate : true, deep : true});

function handleChange(item : any){
    console.log("item\n",item);
    for(let i in item){
        if(i === 'file'){
            params.value.files = [];
            params.value.files = [
                ...params.value.files,
                item
            ]
        }else{
            params.value = {
                ...params.value,
                ...item
            }
        }
    }
}

async function handlePostImage(){
        loading.value = true;
        await store.dispatch('CommunityModule/createPost')
        .then(res => {
            notification['success']({
                message : "Succès",
                description : "Votre publication a été publié avec succès"
            })
        })
        .catch(err => {
            console.log("erreur\n", err);
            
            notification['error']({
                message : "Erreur",
                description : err.data?.message
            })
        })
        .finally(() => {
            emit('closeModal');
            loading.value = false;
        })
    }

</script>

<style lang="scss" scoped>
    .publication {
        &__image {
            @apply flex flex-col gap-[15px];
        }
    }

    .modal-button {
        @apply flex justify-end;
    }
</style>
