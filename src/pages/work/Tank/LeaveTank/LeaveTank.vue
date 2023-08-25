<template>
    <div class="work">
        <div class="work__form">
            <DatePicker
                :max="true"
                name="authDate"
                label="Date d'autorisation"
                placeholder="Selectionner la date de l'autorisation"
                @handleDateFormatFr="handleDate($event)"
            />
            <UploadImage @uploadFileList="handleUploadAuth" />
            <Button @on-click="validateAuth"
                ><LoadingButton size="xs" v-if="btnLoadAuth" /> Valider</Button
            >
            <template class="work__doc" v-for="item in docsAuth">
                <div
                    class="work__file"
                    v-for="subItem in item.thePropertyDocuments"
                    @click="showPdf"
                >
                    <AdobeReaderIcon />
                    <span>{{ item.date }}</span>
                    <PdfModal
                        :pdfPath="baseUrl + subItem.path"
                        :show="isShowPdf"
                        @close-modal="closePdf"
                    />
                </div>
            </template>
            <Hr />
        </div>
        <div class="work__form">
            <DatePicker
                :max="true"
                name="fillDate"
                label="Date du remplissage"
                placeholder="Selectionner la date du remplissage"
                @handleDateFormatFr="handleDate($event)"
            />
            <UploadImage @uploadFileList="handleUploadFill" />
            <Button @on-click="validateFill"
                ><LoadingButton size="xs" v-if="btnLoadFill" /> Valider</Button
            >
            <template class="work__doc" v-for="item in docsFill">
                <div
                    class="work__file"
                    v-for="subItem in item.thePropertyDocuments"
                    @click="showPdf"
                >
                    <AdobeReaderIcon />
                    <span>{{ item.date }}</span>
                    <PdfModal
                        :pdfPath="baseUrl + subItem.path"
                        :show="isShowPdf"
                        @close-modal="closePdf"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Hr from '@/components/Common/Hr/Hr.vue';
    import PdfModal from '@/components/Display/PdfModal/PdfModal.vue';
    import AdobeReaderIcon from '@/components/Icon/AdobeReaderIcon.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import DatePicker from '@/components/Common/InputDate/InputDate.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { Store, useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import { createFormData } from '@/utils/formdata/formData';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { onMounted, ref } from 'vue';
    import moment from 'moment';

    let dateAuth = ref<string>('');
    let dateFill = ref<string>('');
    let fileAuth = ref<Array<any>>([]);
    let fileFill = ref<Array<any>>([]);
    let btnLoadAuth = ref<boolean>(false);
    let btnLoadFill = ref<boolean>(false);
    const store: Store<any> = useStore();
    const route = useRoute();
    let authDoc = ref<Array<object>>([]);
    let authFiles = ref<any>();
    let docsAuth = ref<any>();
    let isShowPdf = ref<boolean>(false);
    const baseUrl: string = window.location.origin;

    onMounted(() => {
        getListAuth();
        getListFillTank();
    });

    const validateFill = async () => {
        btnLoadFill.value = true;
        let obj = {
            thePropertyId: route.params.id,
            date: dateFill.value,
            document: fileFill.value,
        };
        let params = createFormData(obj);
        try {
            let res = await store.dispatch('WorksModule/setFillTank', params);
            if (res.code === 200) {
                notification['success']({
                    message: 'Validation effectuer avec succes',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            btnLoadFill.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoadFill.value = false;
        }
    };

    const showPdf = () => {
        isShowPdf.value = true;
    };

    const closePdf = () => {
        isShowPdf.value = false;
    };

    let fillDocs = ref<Array<object>>([]);
    let docsFill = ref<any>();
    let fillFiles = ref<any>();

    const extractFileFill = () => {
        docsFill.value = fillDocs.value.map(
            ({ thePropertyDocuments, date }: any) => ({
                thePropertyDocuments,
                date,
            })
        );
        fillFiles.value = docsFill.value
            .map((obj: { thePropertyDocuments: any[] }) =>
                obj.thePropertyDocuments.map((doc: any) => doc.path)
            )
            .reduce((acc: string | any[], val: any) => acc.concat(val), []);
        console.log('paths fill:', fillFiles.value);
    };

    const getListFillTank = async () => {
        let res = await store.dispatch(
            'WorksModule/setListFillTank',
            route.params.id
        );
        fillDocs.value = res.map(({ thePropertyDocuments, date }: any) => ({
            thePropertyDocuments,
            date,
        }));
        extractFileFill();
        console.log('res fill:', res);

        // fillDocs.value =
    };

    const extractFile = () => {
        docsAuth.value = authDoc.value.map(
            ({ thePropertyDocuments, date }: any) => ({
                thePropertyDocuments,
                date,
            })
        );
        authFiles.value = docsAuth.value
            .map((obj: { thePropertyDocuments: any[] }) =>
                obj.thePropertyDocuments.map((doc: any) => doc.path)
            )
            .reduce((acc: string | any[], val: any) => acc.concat(val), []);

        console.log('paths:', authFiles.value);
    };

    const getListAuth = async () => {
        let res = await store.dispatch(
            'WorksModule/setListAuthLeaveTank',
            route.params.id
        );
        authDoc.value = res.map(({ thePropertyDocuments, date }: any) => ({
            thePropertyDocuments,
            date,
        }));
        extractFile();
        console.log('res auth:', res);
    };

    const validateAuth = async () => {
        let obj = {
            thePropertyId: route.params.id,
            date: dateAuth.value,
            document: fileAuth.value,
        };
        let params = createFormData(obj);
        try {
            btnLoadAuth.value = true;
            let res = await store.dispatch(
                'WorksModule/setDemandAuthLeaveTank',
                params
            );
            if (res.code === 200) {
                notification['success']({
                    message: 'Validation effectuer avec succes',
                });
            } else {
                notification['error']({
                    message: 'Une erreur est survenue',
                    description: 'Veuillez réessayer...',
                });
            }
            btnLoadAuth.value = false;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            btnLoadAuth.value = false;
            getListAuth();
        }
    };

    const handleUploadAuth = (value: any) => {
        fileAuth.value = value;
        console.log('up auth:', value);
    };

    const handleUploadFill = (value: any) => {
        fileFill.value = value;
        console.log('up fill:', fileFill.value);
    };

    const handleDate = (value: any) => {
        if (value.authDate) {
            dateAuth.value = value.authDate;
            console.log('auth date:', dateAuth.value);
        } else if (value.fillDate) {
            dateFill.value = value.fillDate;
            console.log('fill date:', dateFill.value);
        }
    };
</script>

<style lang="scss" scoped>
    .work {
        &__form {
            @apply flex flex-col gap-[18px];
        }

        &__doc {
            @apply flex items-center items-center;
        }

        &__file {
            @apply flex flex-row gap-[8px];
        }
    }
</style>
