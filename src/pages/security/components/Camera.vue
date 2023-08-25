<template>
    <div>
        <Loader v-if="loading" />
        <MainCard :dataBreadcrumbs="breadcrumbListsData" v-else>
            <div class="camera__container" v-if="cameraList">
                <div class="camera__items">
                    <div class="camera__title">
                        <Title
                            type="h2"
                            weight="600"
                            label="Surveillance camera"
                        />
                        <hr class="__hr" />
                    </div>
                    <div class="camera__form-item">
                        <Add
                            title="Ajouter caméra" 
                            @onClick="handleClickAdd" 
                        />
                           
                            <template
                                v-for="(item, index) in cameraList"
                            >
                                <Card 
                                    :key="index"
                                    :type="item.type.name"
                                    :file-path="item.documentPath"
                                    @on-delete="handleDeleteCamera"
                                    :id="item.id"
                                    :loading-delete="loadingDelete"
                                    type-security="camera"
                                    :url-redirection="urlRedirection"
                                    v-if="!item.declarationDate"
                                    @on-declare="handleDeclare"
                                    :loading-declare="loadingDeclare"
                                />
                            </template>
                    </div>
                </div>
                <div class="camera__items">
                    <div class="camera__title">
                        <Title
                            type="h2"
                            weight="600"
                            label="Caméra déjà déclarés."
                        />
                        <hr class="__hr" />
                    </div>
                    <div class="camera__form-item">
                        <template 
                            v-for="(item, index) in cameraList" 
                        >
                            <Card 
                                :key="index"
                                :type="item.type.name"
                                :file-path="item.documentPath"
                                @on-delete="handleDeleteCamera"
                                :id="item.id"
                                :loading-delete="loadingDelete"
                                :declaration-date="item.declarationDate"
                                type-security="camera"
                                v-if="item.declarationDate"
                                :url-redirection="urlRedirection"
                            />
                        </template>

                        <a-empty
                            v-if="cameraList.length <= 0"
                            class="camera__empty"
                            description="Vous n'avez pas encore de camera déclaré."
                        />
                    </div>
                </div>
            </div>

            <Modal
                :isShowModal="isShowModal"
                @onBack="handleCloseModal"
                title="Ajouter Caméra de surveillance"
            >
                <template #content>
                    <div>
                        <Select 
                            name="typeName"
                            label="Type de caméra"
                            :options="cameraType"
                            @change-select="handleChange"
                        />
                        <div class="">
                            <P class="camera__label">Fichier</P>
                            <Upload 
                                name="document"
                                @uploadSingleWithName="handleChange"
                            />
                        </div>
                    </div>
                    <div class="camera__modal-footer">
                        <Button typeButton="secondary" @click="onClickAddCamera">
                            <LoadingButton size="xs" v-if="loadingAdd" />
                            Ajouter
                        </Button>
                    </div>
                </template>
            </Modal>
        </MainCard>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from "vuex";
    import Add from "@/pages/security/components/Add.vue";
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { notification } from "ant-design-vue";
    import Card from "@/pages/security/components/Card.vue";
    import { useRoute } from "vue-router";

    const breadcrumbListsData = [
        {
            label: 'Camera de surveillance',
        },
    ];

    const inputData = [
        {
            id : 0,
            name : "typeName"
        }
    ]

    const store = useStore();
    const isShowModal = ref<boolean>(false)
    const loadingAdd = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const cameraType = ref<any>(null);
    const cameraList = ref<any>(null);
    const loadingDelete = ref<boolean>(false);
    const urlRedirection = ref<string>('https://idp.iamfas.belgium.be/fasui/BOSA-Aline28a30d17-e44f-4e16-8622-862b3e97cff4NVOI')
    const loadingDeclare = ref<boolean>(false);
    const routes = useRoute();
    
    const params = ref<any>({
        theProperty  : routes.params.id,
        typeName : '',
        document : null
    })

    watch(() => store.getters['SecurityModule/getListCameraSurveillance'], (value) => {
        cameraList.value = value;
    }, {immediate : true, deep : true})

    onMounted(() => {
        checkStoreCamera();
    })

    function checkStoreCamera(){
        const data = store.getters['SecurityModule/getListCameraSurveillance'];
        if(data){
            cameraList.value = data;
        }else{
            getSurveillanceCamera();
        }

        checkStoreType();
    }

    function checkStoreType(){
        const data = store.getters['SecurityModule/getCameraType'];

        if(data){
            cameraType.value = data
        }else{
            getCameraType();
        }
    }

    async function getSurveillanceCamera(){
        loading.value = true;
        const data = await store.dispatch('SecurityModule/getAllCamera', routes.params.id);
        cameraList.value = data;
        console.log("Camera surveillance\n", data);
        loading.value = false;
        
    }

    async function getCameraType(){
        const data = await store.dispatch('SecurityModule/getCameraType');
        console.log("#########\n", data);
        cameraType.value = data;
    }

    function handleClickAdd(){
        isShowModal.value = true;
    }

    function handleChange(item : any){
        console.log("Item\n", item);
        params.value = {
            ...params.value,
            ...item
        }
        
    }

    function handleCloseModal(){
        isShowModal.value = !isShowModal.value
    }

    async function onClickAddCamera(){
        loadingAdd.value = true;
        console.log("params\n", params.value);

        await store.dispatch('SecurityModule/createCamera', params.value)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre camera a été ajouté avec succès'
            })
        })
        .catch(err => {
            notification['error']({
                message : 'Erreur',
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            loadingAdd.value = false;
            handleCloseModal();
        })
        
    }
    async function handleDeleteCamera(idItem : number){
        console.table({idItem})
        loadingDelete.value = true;
        await store.dispatch('SecurityModule/deleteCamera', idItem)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre camera a été supprimer avec succès'
            })
        })
        .catch(err => {
            notification['error']({
                message : 'Erreur',
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            loadingDelete.value = false;
        })
    }

    async function handleDeclare(idItem : number){
        console.table({idItem})
        loadingDeclare.value = true;

        await store.dispatch('SecurityModule/declarationCamera', idItem)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre camera a été déclarer avec succès'
            })
        })
        .catch(err => {
            notification['error']({
                message : 'Erreur',
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            loadingDeclare.value = false;
        })
        
    }
</script>

<style lang="scss" scoped>
    .camera {
        &__container {
            @apply flex flex-col gap-y-[14px];
        }
        &__items {
            @apply flex flex-col gap-y-[18px];
        }
        &__title {
            @apply flex flex-col gap-y-[10px];
            h2 {
                @apply text-[14px] text-primary;
            }
        }

        &__modal-footer{
            @apply flex justify-end;
        }

        &__label{
            font-size: 14px;
            font-weight: 500;
            color: var(--color-gray-icon);
            margin-bottom: 10px;
            display: block;
        }

        &__form-item{
            @apply flex gap-[10px] flex-wrap;
        }

        &__empty{
            @apply flex justify-center items-center flex-col w-[100%];
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
