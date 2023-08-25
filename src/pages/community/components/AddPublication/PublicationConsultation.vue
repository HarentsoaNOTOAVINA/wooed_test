<template>
    <div>
        <div class="wrap-form">
            <Select
                label="type de sujet à consultation"
                name="otherTypeConsultation"
                placeholder="Selectionner un sujet"
                :options="[
                    { label: 'Urbanism', value: 'Urbanism' },
                    { label: 'Infrastructure', value: 'Infrastructure' },
                    { label: 'Mobilité', value: 'mobility' },
                    { label: 'Sécurité', value: 'security' },
                    { label: 'Autre', value: 'other' },
                ]" 
                @change-select="handleChange"
            />
            <TextArea
                name-input="subject"
                label="Sujet à consultation"
                placeholder="Ajouter un sujet à consulté"
                @handle-change="handleChange"
            />
            <InputDate
                name="dateCloture"
                label="Fin de vote de votre sujet"
                placeholder="Date"
                @handle-date="handleChange"
            />
        </div>
        <div class="modal-button">
            <Button typeButton="secondary" @click="handleSubmit">
                <LoadingButton v-if="loading" size="xs"/>
                Publier
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { ref } from 'vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import store from '@/store';
    import { notification } from "ant-design-vue";

    const params = ref<any>({
        type : 'consultation'
    })
    const emit = defineEmits(['closeModal'])

    const loading = ref<boolean>(false);

    function handleChange(item : any){
        params.value = {
            ...params.value,
            ...item
        }
    }

    async function handleSubmit(){
        loading.value = true;
        console.log("submit");
        console.log(params.value);
        await store.dispatch('CommunityModule/postCommunity', params.value)
        .then(() => {
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
        }).finally(() => {
            loading.value = false;
        })
        
    }
</script>

<style scoped>
    .modal-button {
        @apply flex justify-end;
        margin-top: 15px;
    }
    .custom-select__wrapper {
        margin-bottom: 0;
    }
    .wrap-form {
        @apply flex flex-col gap-[10px];
    }
</style>
