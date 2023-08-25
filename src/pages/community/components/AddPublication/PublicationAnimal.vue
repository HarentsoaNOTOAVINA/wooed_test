<template>
    <div class="wrap-fields">
        <Input 
            placeholder="Type d'animal" 
            name-input="animalType"
            class="fields-item"
            @input="handleChange"
        />
        <Input 
            placeholder="Nom de l'animal" 
            name-input="animalName"
            class="fields-item"
            @input="handleChange"
        />
        <Input 
            placeholder="Couleur" 
            name-input="animalColor"
            class="fields-item"
            @input="handleChange"
        />
        <Select
            name="animalSex"
            placeholder="Sex de l'animal"
            :options="[
                { label: 'Male', value: 'Male' },
                { label: 'Femelle', value: 'Femelle' },
            ]"
            @change-select="handleChange"
        />
        <TextArea 
            class="description" 
            name-input="content" 
            placeholder="Description" 
            @handle-change="handleChange"
        />
        <Upload
            :type-image="true"
            @upload-single-with-name="handleChange"
            name="file"
        />
        <div class="modal-button">
            <Button typeButton="secondary" @click="createPost">
                <LoadingButton size="xs" v-if="laoding"/>
                Publier
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import { ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from "ant-design-vue";
    
    const store = useStore();
    const routes = useRoute();
    const laoding = ref<boolean>(false);
    const emit = defineEmits(['closeModal'])

    const params = ref<any>({
        committee : routes.params?.id,
        type : 'animal',
        files : []
    })

    watch(() => params.value, (value) =>{
        store.dispatch('CommunityModule/getDetailsPublication', value)
    }, {immediate : true, deep : true});

    function handleChange(item : any){
        console.log("item\n", item);
        for(let i in item){
            if(i === 'file'){
                console.log("ato am file ah zao");
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
        console.table(params.value);
    }

    async function createPost(){
        laoding.value = true; 
        await store.dispatch('CommunityModule/createPost')
        // .then(() => {
        //     // store.dispatch('CommunityModule/getAllPublication', routes.params.id);
        //     emit('closeModal');
        //     laoding.value = false;
        //     notification['success']({
        //         message :"Succèss",
        //         description : "Publié avec succès"
        //     })
        // })   
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
            params.value = {
                committee : routes.params?.id,
                type : 'animal',
                files : []
            }
            laoding.value = false;
        })
    }

</script>

<style lang="scss" scoped>
    .modal-button {
        @apply flex justify-end mt-[15px];
    }
    .description {
        margin-bottom: 15px;
    }
    .wrap-fields {
        .fields-item {
            margin-bottom: 15px;
        }
    }

</style>
