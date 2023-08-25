<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import CircleBell from '@/components/Icon/CircleBell.vue';
    import CardList from '../Components/CardList.vue';
    import Description from './Description.vue';
    import { onMounted, ref, computed } from 'vue';
    import { notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import {
        Breadcrumb as ABreadcrumb,
        BreadcrumbItem as ABreadcrumbItem,
    } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { createFormData } from '@/utils/formdata/formData';

    const store: Store<any> = useStore();
    const route = useRoute();
    let router = useRouter();

    let activeComp = ref<any>(CardList);
    let showInfo = ref<boolean>(true);
    let dataListNeighbordhood = ref<any>([]);
    let showModalDelete = ref<boolean>(false);
    let loadingButton = ref<boolean>(false);
    let description = ref<string>('');
    let idNeighborhood = ref<number>();
    let loadingRequest = ref<boolean>(false);
    let showTitle = ref<boolean>(true);
    let showBreadCrumb = ref<boolean>(false);
    let loadingCoord = ref<boolean>(false);
    let dataPost = ref<any>();

    onMounted(() => {
        getListNeighbordhood();
    });

    async function getListNeighbordhood() {
        try {
            loadingRequest.value = true;
            await store.dispatch(
                'UrbanismeModule/setNeighborhoodList',
                route.params.id
            );
            let data = computed(
                () => store.getters['UrbanismeModule/getNeighborhoodList'].data
            );
            console.log(data.value, 'dartatatata');

            dataListNeighbordhood.value = [...data.value];
            console.log(dataListNeighbordhood.value, 'DATA LISTE NEIGHT');
        } catch (error) {
            console.log(error);
        } finally {
            loadingRequest.value = false;
        }
    }

    function toHandleDescription(item: object) {
        console.log('testetste');
        dataPost.value = item;
        activeComp.value = Description;
        showTitle.value = false;
        showBreadCrumb.value = true;
        showInfo.value = !showInfo.value;
        var file = dataURLtoFile(`${dataPost.value.images}`, 'image.png');
        console.log(file, 'file file');
        dataPost.value = {
            ...dataPost.value,
            files: [{ file: file }],
            designNeighborhood: dataPost.value.id,
        };
        console.log('dataPost', dataPost.value);
    }

    function gotoListeNeighbor() {
        activeComp.value = CardList;
        showTitle.value = true;
        showInfo.value = true;
        showBreadCrumb.value = false;
    }

    function handleRemoveNeighbord(idNeighbor: number) {
        showModalDelete.value = true;
        idNeighborhood.value = idNeighbor;
    }

    function closeModalDelete() {
        showModalDelete.value = false;
    }

    async function deleteNeighbord() {
        // try {
        //     loadingButton.value = true;
        //     let response = await store.dispatch(
        //         'NearByServicesModule/deleteService',
        //         idNeighborhood.value
        //     );
        //     if (response.status === 204) {
        //         notification['success']({
        //             message: 'Suppression success',
        //             description: 'Votre quartier a été supprimer avec success.',
        //         });
        //         dataListNeighbordhood.value =
        //             dataListNeighbordhood.value.filter((service: any) => {
        //                 return !service.id
        //                     .toString()
        //                     .includes(idNeighborhood.value);
        //             });
        //     } else if (response.status === 403) {
        //         notification['warning']({
        //             message: 'Warning',
        //             description:
        //                 "Vous n'avez pas le droit de supprimer ce quartier.",
        //         });
        //     }
        // } catch (error) {
        // } finally {
        //     loadingButton.value = false;
        //     showModalDelete.value = false;
        // }
    }

    function descriptionArea(value: any) {
        description.value = value.description;
        dataPost.value = {
            ...dataPost.value,
            ...{ content: description.value },
        };
        console.log(description.value);
        console.log(dataPost.value, 'DataPost');
    }

    async function postCoordinate() {
        let { imagePath, images, id, ...postBack } = dataPost.value;
        console.log(postBack, 'POST BACK');

        try {
            loadingCoord.value = true;
            await store.dispatch(
                'UrbanismeModule/postDescriptionNeig',
                postBack
            );

            let responseRedraw = computed(
                () => store.getters['UrbanismeModule/getPostDescriptionRedraw']
            );
            if (responseRedraw.value.status == 201) {
                notification['success']({
                    message: 'Enregistrement ',
                    description:
                        'Votre description a été enregistrer avec success.',
                });

                router.push({ name: 'home' });
            }
        } catch (error) {
            console.error(error);
        } finally {
            loadingCoord.value = false;
        }
    }

    function dataURLtoFile(dataurl: any, filename: any) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
</script>

<template>
    <div class="container urbanisme__container">
        <div class="urbanisme__title">
            <Paragraphe class="title-redraw" v-if="showTitle">
                Liste
            </Paragraphe>
            <a-breadcrumb separator="|" v-if="showBreadCrumb">
                <a-breadcrumb-item class="menuItem-active-link">
                    <span class="urbanisme__label" @click="gotoListeNeighbor"
                        >Liste</span
                    >
                </a-breadcrumb-item>
                <a-breadcrumb-item class="menuItem-active-link">
                    <span class="urbanisme__label-active">Description</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <hr class="separator-redraw" />
        </div>
        <div class="urbanisme__information" v-if="showInfo && !loadingRequest">
            <Paragraphe class="info-urba"
                ><CircleBell class="bell" color-fill="var(--color-green)" />Vous
                etes sur la page qui affiche la liste d’image qui ont ete
                redessiner via l’application mobile.</Paragraphe
            >
        </div>

        <div class="urbanisme__menu">
            <div class="loader" v-if="loadingRequest"><Loader /></div>
            <component
                :is="activeComp"
                :dataList="dataListNeighbordhood"
                :showLoadingBtnCoord="loadingCoord"
                @showDescrition="toHandleDescription"
                @handleDescription="descriptionArea"
                @handlePostCoordinate="postCoordinate"
                @onDelete="handleRemoveNeighbord"
            />
        </div>
        <Modal
            title="Confirmation"
            :isShowModal="showModalDelete"
            @onBack="closeModalDelete"
        >
            <template #content>
                <Paragraph>
                    Voulez-vous vraiment supprimer cet image?</Paragraph
                >
                <div class="urbanisme__action-remove">
                    <Button
                        typeButton="gray"
                        @on-click="closeModalDelete"
                        v-if="!loadingButton"
                        >Annuler</Button
                    >
                    <Button typeButton="secondary" @on-click="deleteNeighbord"
                        ><LoadingButton
                            size="sm"
                            v-if="loadingButton"
                        />Valider</Button
                    >
                </div>
            </template>
        </Modal>
    </div>
</template>

<style scoped lang="scss">
    .urbanisme {
        &__container {
            @apply mt-[20px] bg-[#fff] p-[10px] rounded-[8px];
        }
        &__information {
            @apply mt-[15px] p-[15px] rounded-[8px] text-[var(--color-green)];
            background: rgba(103, 205, 132, 0.14);
        }

        &__menu {
            @apply mt-[15px] relative;
        }
        &__menu-list {
            @apply flex gap-[15px] mt-[15px] rounded-[4px] p-[20px];
            border: 1px solid var(--color-gray);
        }
        &__action-remove {
            @apply mt-[7px] flex items-center justify-end gap-[8px];
        }
        &__label {
            @apply cursor-pointer;
        }
        &__label-active {
            @apply font-bold;
        }
    }

    .title-redraw {
        @apply mb-[20px] font-semibold;
    }

    .separator-redraw {
        border: 1px solid var(--color-gray);
    }
    .bell {
        @apply w-[155px];
    }
    .info-urba {
        @apply flex gap-[10px];
    }
</style>
