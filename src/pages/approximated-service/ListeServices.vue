<template>
    <div class="container listService__content">
        <div class="listService__content-title">
            <Paragraph type="bold">Liste</Paragraph>
            <Button @on-click="modalAddHandler"
                ><AddIcon color="white" /> Ajout un service proximité
            </Button>
        </div>
        <ListServiceCard
            v-if="dataListService.length > 0"
            :showTitle="true"
            @on-handle-remove="handleRemoveService"
            @on-handle-edit="handleEditService"
            :dataServices="dataListService"
        />

        <div v-else class="listService__empty">
            <a-empty description="Aucun service à proximité" />
        </div>

        <div class="loader" v-if="loadingService"><Loader /></div>

        <!--Modal  delete service-->
        <Modal
            title="Confirmation"
            :isShowModal="showModalDelete"
            @onBack="closeModalDelete"
        >
            <template #content>
                <Paragraph>
                    Voulez-vous vraiment supprimer cet service?</Paragraph
                >
                <div class="listService__action-remove">
                    <Button
                        typeButton="gray"
                        @on-click="closeModalDelete"
                        v-if="!loadingButton"
                        >Annuler</Button
                    >
                    <Button typeButton="secondary" @on-click="deleteService"
                        ><LoadingButton
                            size="sm"
                            v-if="loadingButton"
                        />Valider</Button
                    >
                </div>
            </template>
        </Modal>

        <!-- modal add services -->
        <AddService
            :showModalAdd="showIt"
            @modalHandler="modalAddHandler"
            @addService="add"
            :loading-button="loadingBtn"
            :dataEditing="valueEditing"
            :isEditing="isEditing"
        />
    </div>
</template>
<script setup lang="ts">
    import AddService from './components/addService/AddService.vue';
    import ListServiceCard from './components/ListServiceCard/ListServiceCard.vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import AddIcon from '@/components/Icon/AddIcon.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, onMounted, ref } from 'vue';
    import store from '@/store';
    import { isAnArrayorPush2 } from '@/utils/formdata/formData';
    let showIt = ref<boolean>(false);
    let showModalDelete = ref<boolean>(false);
    let loadingService = ref<boolean>(false);
    let loadingButton = ref<boolean>(false);
    let idService = ref<any>();
    let isEditing = ref<boolean>(false);
    let editedService = ref<any>();
    let addedService = ref<any>();
    let dataListService = ref<any>([]);
    let loadingBtn = ref<boolean>(false);
    let valueEditing = ref<object>();

    const router = useRouter();
    onMounted(async () => {
        getListServices();
    });

    async function getListServices() {
        try {
            loadingService.value = true;
            await store.dispatch(
                'NearByServicesModule/setListServicesApproximated'
            );
            let data = computed(
                () =>
                    store.getters[
                        'NearByServicesModule/getListServicesApproximated'
                    ]
            );
            console.log(data.value, 'dartatatata');

            dataListService.value = [...data.value];
            console.log(dataListService.value, 'DataListService ....');
        } catch (error) {
            console.log(error);
        } finally {
            loadingService.value = false;
        }
    }

    const modalAddHandler = () => {
        showIt.value = !showIt.value;
        isEditing.value = false;
        valueEditing.value = {};
    };

    function handleRemoveService(id: number) {
        showModalDelete.value = true;
        idService.value = id;
        console.log(id, ': Id clickdkd');
    }

    function closeModalDelete() {
        showModalDelete.value = false;
    }
    async function deleteService() {
        try {
            loadingButton.value = true;
            let response = await store.dispatch(
                'NearByServicesModule/deleteService',
                idService.value
            );
            if (response.status === 204) {
                notification['success']({
                    message: 'Suppression success',
                    description: 'Votre service a été supprimer avec success.',
                });
                dataListService.value = dataListService.value.filter(
                    (service: any) => {
                        return !service.id.toString().includes(idService.value);
                    }
                );
            } else if (response.status === 403) {
                notification['warning']({
                    message: 'Warning',
                    description:
                        "Vous n'avez pas le droit de supprimer ce service.",
                });
            }
        } catch (error) {
        } finally {
            loadingButton.value = false;
            showModalDelete.value = false;
        }
    }

    const add = async (params: any) => {
        delete params.servicePromos[0].id; 
        delete params.servicePromos[0].minAmount; 
        console.log('parameters:', params);
        const formData = new FormData();
        console.log(Object.keys(params));
        Object.keys(params).forEach((item) => {
            console.log('iiiiiii:', item);
            if (item === 'servicePromos') {
                params.servicePromos.forEach((param: any) => {
                    Object.keys(param).forEach((item: any) => {
                        formData.append(
                            `servicePromos[0][${item}]`,
                            params.servicePromos[0][item]
                        );
                    });
                });
            } else if (Array.isArray(params[item])) {
                params[item].forEach((file: any) => {
                    formData.append(item, file);
                });
            } else {
                formData.append(`${item}`, params[item]);
            }
        });

        if (!isEditing.value) {
            loadingBtn.value = true;
            try {
                await store.dispatch(
                    'NearByServicesModule/createService',
                    formData
                );
                const data = computed(
                    () => store.getters['NearByServicesModule/getCreateService']
                );
                addedService.value = data.value.data;
                modalAddHandler(); //close after submit
                if (data.value.status === 201) {
                    notification['success']({
                        message: 'Service ajouter avec succes',
                    });
                    loadingBtn.value = false;
                }
                console.log('added:', editedService.value);
            } catch (error) {
                notification['error']({
                    message: "Une erreur s'est produite",
                    description: "Veuillez réessayer s'il vous plait",
                });
            } finally {
                loadingBtn.value = false;
                // router.go(0);
                modalAddHandler(); //close after submit
                showIt.value = false;
                setTimeout(() => {
                    // router.go(0);
                }, 3000);
            }
        } else {
            try {
                loadingBtn.value = true;
                const paramsEdit = {
                    id: params.id,
                    title: params.title,
                    email: params.email,
                    phone: params.phon,
                    website: params.website,
                    address: params.address,
                    latitude: params.latitude,
                    longitude: params.longitude,
                    user: params.user,
                    // servicePromos: params.servicePromos[0][dateStart]
                };
                //edit
                await store.dispatch('NearByServicesModule/editService', {
                    id: idService.value,
                    payload: formData,
                });
                const data = computed(
                    () => store.getters['NearByServicesModule/getEditService']
                );
                editedService.value = data.value.data;
                console.log('editedService:', data.value);
                if (data.value.status === 200) {
                    notification['success']({
                        message: 'Service modifier avec succes',
                    });
                    loadingBtn.value = false;
                } else if (data.value.status === 403) {
                    notification['error']({
                        message: "Une erreur s'est produite",
                        description: 'Vous ne pouvez modifier',
                    });
                }
            } catch (error) {
                notification['error']({
                    message: "Une erreur s'est produite",
                    description: "Veuillez réessayer s'il vous plait",
                });
            } finally {
                loadingBtn.value = false;
                showIt.value = false;
                setTimeout(() => {
                    // router.go(0);
                }, 3000);
            }

            console.log('edit', editedService.value);
        }
    };

    const handleEditService = async (value: any) => {
        isEditing.value = true;
        // modalAddHandler();
        showIt.value = !showIt.value;
        idService.value = value.id;
        valueEditing.value = value;
        console.log('value editing:', JSON.stringify(valueEditing.value));
    };
</script>

<style scoped lang="scss">
    .listService {
        &__content {
            @apply mt-[20px] bg-[#FFFFFF] p-[20px] rounded-[8px];

            &:deep() {
                .button__primary {
                    @apply flex items-center justify-between gap-[10px];
                }
            }
        }
        &__content-title {
            @apply flex items-center justify-between;
        }
        &__btn-add {
            @apply flex items-center justify-between;
        }
        &__action-remove {
            @apply mt-[7px] flex items-center justify-end gap-[8px];
        }

        &__empty {
            @apply mt-[10px];
        }
    }
</style>
