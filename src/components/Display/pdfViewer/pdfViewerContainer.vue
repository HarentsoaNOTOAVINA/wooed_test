<script setup lang="ts">
    import * as pdfjs from 'pdfjs-dist';
    import { ref, computed, onMounted, watch } from 'vue';
    import PdfViewer from '@/components/Display/pdfViewer/pdfViewer.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useRoute } from 'vue-router';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Slider from '../Slider/Slider.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import Info from '@/components/Icon/Info.vue';

    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const maxPAgeNum = ref<number>(0);
    const showUploadModal = ref<boolean>(false);
    let pdfPages = ref<any>([]);
    let payload: any;
    let __pdf: any;
    // emit functions
    const emit = defineEmits<{
        (e: 'save', payload: any): void;
        (e: 'upload', payload: any): void;
    }>();

    // props
    const props = defineProps({
        pdfUrl: {
            type: String,
            default:
                window.location.origin + '/pdfImmo/toSearch/lease/teste.pdf',
        },
        buttonLabel: {
            type: String,
            default: 'Enregistrer',
        },
    });

    onMounted(async () => {
        pdfPages.value = await getDocument();
        isLoading.value = false;
    });

    function getDocument() {
        const promise: any = new Promise(async (resolve, reject) => {
            const workerPromise = import(
                'pdfjs-dist/build/pdf.worker.entry' as never
            );
            let pages: any[] = [];
            const worker = await workerPromise;
            pdfjs.GlobalWorkerOptions.workerSrc = worker;
            const docs = pdfjs.getDocument(props.pdfUrl);
            const pdf: any = await docs.promise;
            __pdf = pdf;
            maxPAgeNum.value = pdf.numPages;
            for (let page = 1; page < pdf.numPages + 1; page++) {
                const __page = pdf.getPage(page);
                pages.push(__page);
            }
            resolve(pages);
        });
        return promise;
    }
    async function handleSaveBtn() {
        const result = await __pdf.saveDocument();
        const pdfBlob = new Blob([result], {
            type: 'application/pdf',
        });
        (pdfBlob as any).lastModifiedDate = new Date();
        // emit('save', pdfBlob);
        downloadDocumentFile(pdfBlob);
    }

    function downloadDocumentFile($event: any) {
        let a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL($event);
        a.href = url;
        a.download = 'testfile.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const zoomValue = ref(50);
    const zoom = computed(() => Number(zoomValue.value) / 50);

    function updateZoomValue(value: number) {
        zoomValue.value = value;
    }
    function openUploadModal() {
        showUploadModal.value = true;
    }
    function uploadHandler($event: any) {
        payload = $event;
    }
    function send() {
        showUploadModal.value = false;
        emit('upload', payload);
    }
</script>

<template>
    <Loader v-if="!pdfPages?.length" />
    <div v-else class="sign-container">
        <div class="m-2 flex p-5 bg-[var(--color-light-warn)] gap-3 rounded-md">
            <Info />
            <Paragraphe class="py-2">
                Veuillez Télecharger et remplir le document suivant puis le
                téléverser ici même, en appyant sur le bouton (uploader le
                document) plus bas, après que vous l'ayez rempli.
            </Paragraphe>
        </div>
        <div class="pdf__wrapper">
            <div class="pdf__container">
                <Slider
                    :min="10"
                    :max="100"
                    :defaultValue="50"
                    @change="updateZoomValue"
                    class="pdf__zoomRange"
                />
                <div
                    class="pdf__content"
                    :style="{
                        transform: 'scale(' + zoom + ')',
                        transformOrigin: '0 0',
                    }"
                >
                    <PdfViewer
                        v-for="(page, idx) in pdfPages"
                        :key="idx"
                        :page-num="idx"
                        :page="page"
                        :pdf-url="props.pdfUrl"
                    />
                </div>
            </div>
        </div>

        <div class="sign-action">
            <Button
                class="sign-action-btn"
                type="secondary"
                @click="handleSaveBtn"
            >
                Télécharger le document
            </Button>
            <Button
                class="sign-action-btn"
                type="secondary"
                @click="openUploadModal"
            >
                uploader le document
            </Button>
        </div>
        <Modal
            :visible="showUploadModal"
            :closable="true"
            @on-back="() => (showUploadModal = false)"
        >
            <template #content>
                <div class="flex flex-col justify-between">
                    <div
                        class="m-2 flex p-5 bg-[var(--color-light-warn)] gap-3 rounded-md"
                    >
                        <Info />
                        <Paragraphe class="py-2">
                            Ajouter ici le document PDF après que vous ayez
                            rempli.
                        </Paragraphe>
                    </div>
                    <div class="w-full grid place-content-center">
                        <Upload @upload-single-with-name="uploadHandler" />
                    </div>
                    <div class="w-full grid place-content-end">
                        <Button @click="send"> Enregister et envoyer </Button>
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/style.scss';
    .sign {
        &-container {
            width: 90vw;
            display: grid;
            place-content: center;
            @screen md {
                width: 100%;
            }
        }
        &-action {
            @apply w-full flex  gap-5 justify-end mt-5;
            &-btn {
            }
        }
    }
    .pdf {
        &__wrapper {
            @apply relative overflow-x-hidden;
        }
        &__container {
            overflow-x: auto;
            height: calc(100vh - 160px);
            @include scrollbar;
        }
        &__zoomRange {
            @apply absolute top-0 left-2 z-[1] w-[100px] opacity-50 transition-all;
            &:deep() {
                .app-slider__mark {
                    @apply hidden;
                }
            }
            &:hover {
                @apply opacity-100 transition-all;
            }
        }
        &__content {
            min-width: 700px;
        }
    }
</style>
