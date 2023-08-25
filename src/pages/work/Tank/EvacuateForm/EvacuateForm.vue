<template>
    <div>
        <Loader v-if="isLoading" />
    </div>
    <div class="work">
        <div class="work__form">
            <DatePicker
                name="evacuateDate"
                label="Date de l'evacuation"
                @handleDateFormatFr="handleDate($event)"
            />
            <div class="work__up">
                <UploadImage @uploadFileList="handleUpload" />
            </div>
            <div class="work__btnContainer">
                <Button @on-click="addEvacuation">
                    <LoadingButton v-if="btnLoad" size="xs" /> Ajouter
                </Button>
            </div>
        </div>
        <div class="work__docContainer">
            <div class="work__docTitle">
                <Title type="h3">Vos documents:</Title>

                <Info size="sm" @click="openModal" />
            </div>
            <div class="work__doc" v-for="item in files" @click="showPdf">
                <div
                    class="work__file"
                    v-for="subItem in item.thePropertyDocuments"
                >
                    <AdobeReaderIcon />
                    <span> {{ moment(item.date).format("L") }}</span>
                    <!-- <span>subItem: {{ baseUrl + subItem.path }}</span> -->
                    <PdfModal
                        :pdfPath="baseUrl + subItem.path"
                        :show="isShowPdf"
                        @close-modal="closePdf"
                    />
                </div>
            </div>
        </div>
        <div>
            <Modal
                width="900"
                title="Evacuation d'un reservoir"
                :isShowModal="isShowModal"
                @onBack="onCloseModal"
            >
                <template #content>
                    <component
                        :is="activeView[activeView.length - 1]"
                        :demandData="props.demandData"
                        :obliData="props.obliData"
                        @changeComponent="changeComponent"
                        @closeModalDispense="closeModalFromDisp"
                    />
                    <!-- <EvacuateMenu /> -->
                </template>
            </Modal>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import DatePicker from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import AdobeReaderIcon from '@/components/Icon/AdobeReaderIcon.vue';
    import Info from '@/components/Icon/Info.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import EvacuateMenu from '../EvacuateMenu/EvacuateMenu.vue';
    import DemandDispense from '../DemandDispense/DemandDispense.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import PdfModal from '@/components/Display/PdfModal/PdfModal.vue';
    import DemandDispenseNotary from '../DemandDispenseNotary/DemandDispenseNotary.vue';
    import { Store, useStore } from 'vuex';
    import { createFormData } from '@/utils/formdata/formData';
    import { useRoute, useRouter } from 'vue-router';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { onMounted, ref } from 'vue';
    import moment from "moment"

    onMounted(() => {
        console.log(
            `${window.location.origin}/upload/controls/pdfs63e49070b5e46.pdf`
        );
        console.log('obli data:', props.obliData);
        console.log('demand data:', props.demandData);

        getListEvacuation();
    });

    const route = useRoute();
    const props = defineProps(['demandData', 'obliData']);

    const store: Store<any> = useStore();
    let isShowModal = ref<boolean>(false);
    let activeView = ref<Array<object>>([EvacuateMenu]);
    let btnLoad = ref<boolean>(false);
    let isLoading = ref<boolean>(false);
    let paramsToSend = ref<object>({
        thePropertyId: route.params.id,
    });
    let propertyDoc = ref<Array<object>>([]);
    let doc = ref<Array<string>>([]);
    let isShowPdf = ref<boolean>(false);
    const baseUrl = window.location.origin;
    let files = ref<any>();

    const closeModalFromDisp = () => {
        onCloseModal();
        // isShowModal.value = false;
    };

    const closePdf = () => {
        isShowPdf.value = false;
    };

    const showPdf = () => {
        isShowPdf.value = true;
    };

    const extractFile = () => {
        files.value = propertyDoc.value.map(
            ({ thePropertyDocuments, date }: any) => ({
                thePropertyDocuments,
                date,
            })
        );
        console.log('files and date:', files.value);

        doc.value = files.value
            .map((obj: { thePropertyDocuments: any[] }) =>
                obj.thePropertyDocuments.map((doc: any) => doc.path)
            )
            .reduce((acc: string | any[], val: any) => acc.concat(val), []);
        console.log('paths:', doc.value);
    };

    const getListEvacuation = async () => {
        try {
            isLoading.value = true;
            let data = await store.dispatch('WorksModule/setListEvacuation', {
                thePropertyId: route.params.id,
            });
            isLoading.value = false;
            propertyDoc.value = data.map(
                ({ thePropertyDocuments, date }: any) => ({
                    thePropertyDocuments,
                    date,
                })
            );
            extractFile();
            // propertyDoc.value = data.thePropertyDocuments
            console.log('code list evacuation:', propertyDoc.value);
        } catch (error) {}
    };

    const addEvacuation = async () => {
        let params = createFormData(paramsToSend.value);

        try {
            btnLoad.value = true;
            let { data, code } = await store.dispatch(
                'WorksModule/setAddEvacuation',
                params
            );
            if (code === 200) {
                notification['success']({
                    message:
                        "Vos donnée d'evacuation ont été enregister avec succes",
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            btnLoad.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoad.value = false;
        }
    };

    const changeComponent = (item: object | any) => {
        if (item.case === 'dispense') {
            activeView.value.push(DemandDispense);
            console.log('active view:', item);
        } else {
            activeView.value.push(DemandDispenseNotary);
            console.log('active view:', item);
        }
    };

    const onCloseModal = () => {
        isShowModal.value = false;
        activeView.value = [EvacuateMenu];
        console.log('close');
    };

    const openModal = () => {
        isShowModal.value = true;
    };

    const handleDate = (value: any) => {
        paramsToSend.value = {
            ...paramsToSend.value,
            date: value.evacuateDate,
        };
        console.log('value date evacuation:', paramsToSend.value);
    };

    const handleUpload = (value: any) => {
        paramsToSend.value = {
            ...paramsToSend.value,
            document: value,
        };
        console.log('value up evacuate:', paramsToSend.value);
    };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[18px];
        }

        &__up {
            @apply w-fit;
        }

        &__btnContainer {
            @apply w-full flex justify-end;
        }

        &__docContainer {
            @apply mt-[14px];
        }

        &__docTitle {
            @apply flex items-center gap-[10px];
        }

        &__doc {
            @apply flex items-center items-center gap-[8px] mt-[14px];
        }

        &__file {
            @apply flex flex-row;
        }

        &__IconBtn {
            // @apply ;
        }
    }
</style>
