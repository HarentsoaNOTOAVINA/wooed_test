<template>
    <div class="wrap-form">
        <Input 
            placeholder="Adresse" 
            id="address" 
            name-input="place"
            @input="handleChange"
        />
        <InputDate 
            placeholder="Date de la fête" 
            name="date"
            @handle-date-format="handleChange"
        />
        <TimePicker  
            placeholder="Heure de la fête" 
            name="hour"
            class="time-picker"
            @change="handleChange"
        />
        <InputDate 
            placeholder="Fin du vote" 
            name="dateCloture" 
            @handle-date-format="handleChange"
        />
        <TextArea
            class="description"
            name-input="content"
            placeholder="Description"
            @handle-change="handleChange"
        />
        <div class="modal-button">
            <Button typeButton="secondary" @click="createPost">
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
    import useAutoComptetion from '@/composables/useAutoComplete';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from "ant-design-vue";

    const {autocompleteResult} = useAutoComptetion('address');

    const routes = useRoute();
    const store = useStore();
    const loading = ref<boolean>(false);
    const emit = defineEmits(['closeModal'])

    const params = ref<any>({
        committee : routes.params.id,
        type : 'blockParty',
        latitude : 0,
        longitude : 0,
    })

    watch(() => params.value, (value) => {
        store.dispatch('CommunityModule/getDetailsPublication', value);
    }, {immediate : true, deep: true}); 

    watch(() => autocompleteResult, (value) => {
        params.value = {
            ...params.value,
            place : value.value?.address,
            latitude : value.value?.lat,
            longitude : value.value?.lng
        }
        
    }, {immediate : true, deep : true})

    function handleChange(item : any){
        params.value = {
            ...params.value,
            ...item
        }
    }

    async function createPost(){
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
    .modal-button {
        @apply flex justify-end mt-[15px];
    }
    .wrap-form {
        &:deep() {
            .date__space,
            .custom-input__fields {
                margin-bottom: 15px;
            }
            .time-picker {
                margin-bottom: 10px;
            }
        }
    }

    .time-picker{
        &:deep(){
            .ant-picker{
                @apply w-[100%];
            }
        }
    }
</style>
