<template>
    <Loader v-if="isLoadPdf" />
    <div v-else class="electric-container">
        <Title
            type="h2"
            weight="600"
            label="FORMULAIRE DE DEMANDE DE CERTIFICATION D’UNE INSTALLATION PHOTOVOLTAÏQUE en région Bruxelloise."
            class="head-title"
        />
        <Paragraphe class="text"
            >Formulaire à renvoyer, accompagné de ses annexes, à l’Organisme
            Certificateur Agréé (OCA) de votre choix 1</Paragraphe
        >
        <hr class="__hr" />
        <Alert>
            Informations utiles avant de compléter ce formulaire : Qui peut
            introduire une demande ? La demande peut être introduite par le
            propriétaire ou le titulaire de droit réel sur l’installation
            photovoltaïque, par l’installateur ou encore par un intermédiaire.
            Dans tous les cas, la demande doit être datée et signée par le
            titulaire de l’installation. Quand introduire la demande ?
            Idéalement, la demande devrait être introduite dès que toutes les
            annexes nécessaires à la constitution d’un dossier complet sont
            disponibles. À qui envoyer la demande ? Le formulaire doit être
            envoyé auprès d’un Organisme Certificateur Agréé (OCA) de votre
            choix. Une liste des OCA reconnu officiellement se trouve sur le
            site web de BRUGEL.
        </Alert>
        <hr class="__hr" ref="abc" />
        <!-- PDF -->
        <!-- <Button>Envoyer</Button> -->
        <!-- <PdfViewer
            class="bordered"
            :button-label="'Enregistrer les informations'"
            @save="handleSavePdf"
            :pdf-url="urlPDF"
        /> -->
        <div id="webviewer"></div>
        <Button @click="handleSavePdf">Enregistrer</Button>
    </div>
</template>
<script lang="ts" setup>
    // :pdf-url="urlPDF"
    import Button from '@/components/Common/Button/Button.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    // import PdfViewer from '@/components/Display/pdfViewer/pdfViewerContainer.vue';
    import WebViewer from '@pdftron/webviewer';
    import Rental from '@/services/rentalServices';
    import { onMounted, ref, watch } from 'vue';
import SupplierServices from '@/services/supplierService';

    const viewer = ref<any>(null);
    const abc = ref<any>(null)

    const isLoadPdf = ref<boolean>(false);
    const urlPDF = ref<string>('');
    const instance = ref<any>(null);

    onMounted(() => {
        fetchPDF();
        viewer.value = document.querySelector('#webviewer')
    });

    async function fetchPDF() {
        try {
            const { data } = await Rental.getEditableDocument({
                type: 'provider',
                file: 'Formulaire-certification-cogen0.pdf',
            });
            console.log(data, 'RESULT');
            urlPDF.value = `${window.location.origin}${data}`;
            pdf();
        } catch (error) {
        } finally {
            isLoadPdf.value = false;
        }
    }
    function pdf() {
        console.log(viewer.value);
        WebViewer(
            {
                path: `/webviewer`,
                initialDoc: urlPDF.value,
            },
            viewer.value
        ).then((webViewerInstance) => {
            console.log(webViewerInstance);
            instance.value = webViewerInstance;
        });
    }
    async function handleSavePdf() {
        console.log('object');
        const doc = instance.value.docViewer.getDocument();
        const { annotationManager } = instance.value.Core;
        const xfdfString = await annotationManager.exportAnnotations();
        doc.getFileData(
            {
            xfdfString
        }).then((data: any) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            const formdata = new FormData();
            formdata.append('files[0]', blob);
            formdata.append('idTheProperty', '4');
            formdata.append('type', 'file');

            SupplierServices.postGreenCertificate(formdata).then(res => {
                console.log(res);
            }).catch(e => console.log(e))
        })
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .electric-container {
        #webviewer {
            @apply overflow-scroll w-full h-[100vh];
        }
        @apply flex flex-col gap-[18px] items-end;
        @apply overflow-x-auto;
        @include scrollbar;
        &:deep() {
            .viewer-wrapper::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .head-title {
        @apply text-[16px] text-grayIcon w-full;
    }
    .__hr {
        @apply text-gray w-full;
    }
    .text {
        @apply w-full italic;
        color: var(--color-gray-icon);
    }
</style>
