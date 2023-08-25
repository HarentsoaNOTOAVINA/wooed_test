<template>
    <div>
        <Loader 
            v-if="loading"
        />
        <MainCard :dataBreadcrumbs="breadcrumbListsData" v-else>
            <div class="alarm__container">
                <div class="alarm__items">
                    <div class="alarm__title">
                        <Title
                            type="h2"
                            weight="600"
                            label="Liste alarme"
                        />
                        <hr class="__hr" />
                    </div>
                    <div class="alarm__form-item">
                        <Add 
                            title="Ajouter Alarme"
                            @onClick="handleShowModal"
                        />
                        <template 
                                v-for="(item, index) in allAlarmSecurity" 
                            >
                            <Card 
                                :key="index"
                                :type="item.type.name"
                                :file-path="item.documents[0]"
                                @on-delete="handleDeleteAlarme"
                                :id="item.id"
                                :loading-delete="loadingDelete"
                                :declaration-date="item.declarationDate"
                                type-security="alarm"
                                v-if="!item.declarationDate"
                                :url-redirection="urlRedirection"
                                @on-declare="handleDeclare"
                                :loading-declare="loadingDeclare"
                            />
                        </template>
                    </div>
                </div>
                <div class="alarm__items">
                    <div class="alarm__title">
                        <Title
                            type="h2"
                            weight="600"
                            label="Alarme déjà déclarés"
                        />
                        <hr class="__hr" />
                    </div>

                </div>
                <div class="" v-if="allAlarmSecurity">
                    <div class="alarm__form-item">
                        <template
                                v-for="(item, index) in allAlarmSecurity" 
                            >
                            <Card 
                                :key="index"
                                :type="item.type.name"
                                :file-path="item.documents[0]"
                                @on-delete="handleDeleteAlarme"
                                :id="item.id"
                                :loading-delete="loadingDelete"
                                :declaration-date="item.declarationDate"
                                type-security="alarm"
                                v-if="item.declarationDate"
                                :url-redirection="urlRedirection"
                            />
                        </template>
                        <a-empty
                            v-if="allAlarmSecurity.length <= 0"
                            class="alarm__empty"
                            description="Vous n'avez pas encore d'alarme déclaré."
                        />
                    </div>
                </div>
            </div>

            <Modal
                :isShowModal="isShowModal"
                @onBack="handleShowModal"
                title="Ajouter un système d'alarme"
            >
                <template #content>
                    <div>
                        <Select 
                            name="typeName"
                            label="Type d'alarme"
                            :options="alarmType"
                            @change-select="handleChange"
                        />
                        <div class="">
                            <P class="alarm__label">Fichier</P>
                            <Upload 
                                name="document"
                                @uploadSingleWithName="handleChange"
                            />
                        </div>
                    </div>
                    <div class="alarm__modal-footer">
                        <Button typeButton="secondary" @click="handleAddAlarme">
                            <LoadingButton size="xs" v-if="laodingAdd" />
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
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { onMounted, ref, watch } from 'vue';
    import { useStore } from "vuex";
    import Add from "@/pages/security/components/Add.vue";
    import Input from '@/components/Common/Input/Input.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    // import { params } from '@/pages/make-offer/formulaire/dataFormMakeOffer';
    import { notification } from "ant-design-vue";
    import Card from "@/pages/security/components/Card.vue";
    import { useRoute } from "vue-router";


    const breadcrumbListsData = [
        {
            label: 'Système d’alarme',
        },
    ];

    const routes = useRoute();
    const store = useStore();
    const allAlarmSecurity = ref<any>(null)
    const alarmType = ref<any>(null);
    const isShowModal = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const laodingAdd = ref<boolean>(false);
    const loadingDelete = ref<boolean>(false);
    const urlRedirection = ref<string>('https://idp.iamfas.belgium.be/fasui/BOSA-Aline28a30d17-e44f-4e16-8622-862b3e97cff4NVOI')
    const loadingDeclare = ref<boolean>(false);

    const params = ref<any>({
        theProperty : routes.params.id,
        documents : [],
        typeName : ""
    });

    onMounted(() => {
        storeAlarm();
    })

    watch(() => store.getters['SecurityModule/getAllAlarmSercurity'], (value) => {
        allAlarmSecurity.value = value;
    }, {immediate : true, deep : true});

    function handleShowModal(){
        isShowModal.value = !isShowModal.value;
    }

   

    function storeAlarm(){
        const data = store.getters['SecurityModule/getAllAlarmSercurity'];

        if(data){
            allAlarmSecurity.value = data;
        }else{
            getAlarmSecurity();
        }
        storeType()
    }
    function storeType(){
        const data = store.getters['SecurityModule/getAlarmType'];
        if(data){
            alarmType.value = data;
        }else{
            getAlarmType();
        }
    }

    async function getAlarmSecurity(){
        loading.value = true;
        const data = await store.dispatch('SecurityModule/getAllAlarm', routes.params.id);
        console.log("Alarm security \n", data);
        allAlarmSecurity.value = data;
        loading.value = false;
    }

    async function getAlarmType(){
        const data = await store.dispatch('SecurityModule/getAlarmType');
        console.log("Type of alarme\n", data);
        alarmType.value = data;
    }

    function handleChange(item : any){
        console.log("item\n", item);
        for(let i in item){
            if(i === 'document'){
                params.value.documents = [
                    ...params.value.documents,
                    item[i]
                ]
            }else{
                params.value = {
                    ...params.value,
                    ...item
                } 
            }
        }
    }

    async function handleAddAlarme(){
        console.log("Params\n", params.value);
        laodingAdd.value = true;
        await store.dispatch('SecurityModule/createAlarm', params.value)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre alarme a été ajouté avec succès'
            })

        })
        .catch(err => {
            notification['error']({
                message : "Error",
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            laodingAdd.value = false;
            handleShowModal();
        })
    }

    async function handleDeleteAlarme(idItem : number){
        loadingDelete.value = true;
        await store.dispatch('SecurityModule/deleteAlarm', idItem)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre alarme a été supprimé avec succès'
            })

        })
        .catch(err => {
            notification['error']({
                message : "Error",
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            loadingDelete.value = false;
        })
        console.table({idItem})
    }

    async function handleDeclare(idItem : number){
        loadingDeclare.value = true;
        await store.dispatch('SecurityModule/declarationAlarme', idItem)
        .then(res => {
            notification['success']({
                message : 'Succès',
                description : 'Votre alarme a été declaré avec succès'
            })

        })
        .catch(err => {
            notification['error']({
                message : "Error",
                description : "Une erreur s'est produit, véuillez réessayer."
            })
        })
        .finally(() => {
            loadingDeclare.value = false;
        })
    }
</script>

<style lang="scss" scoped>
    .alarm {
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
