<template>
    <div>
        <MainCard :button="true" :labelButton="payload.length ? 'Envoyer' : ''" :dataBreadcrumbs="breadcrumbListsData"
            class="award" :borderBottom="true" :disable-submit-button="storedApplication !== undefined"
            @on-click="submitApplication">
            <div class="award__container">
                <div class="award__map--item">
                    <!-- <div id="iFrameAtlas">
                        <iframe
                            src="https://geodata.environnement.brussels/client/embed/097aaca5-88e0-4436-93cd-33c272e107e4"
                            width="100%" height="100%" style="position:absolute;" frameborder="0"></iframe>
                    </div> -->
                    <!-- Le code suivant propose une intégration responsive, avec un rapport de taille fixé par défaut.  -->
        <!-- Si vous souhaitez gérer vous-même la taille de la boîte contenant l'iframe, supprimez le style ci-dessous et la DIV #iFrameAtlas.  -->
                <div id="iFrameAtlas">
                    <iframe src="https://geodata.environnement.brussels/client/embed/9c49fffb-1a01-4b15-954e-9c8bc9558216" width="100%" height="100%"
                        style="position:absolute;" frameborder="0"></iframe>
                </div>
                </div>
                <div class="award__pdf">
                    <!-- <vue-pdf-embed :source="attributionDocPath" /> -->
                    <PdfViewer :button-label="'Valider'" :pdf-url="attributionDocPath" @save="handlePdfFile" />
                </div>
                <div class="info-list">
                    <div>
                        <span class="text-black">
                            Il est obligatoirement accompagné des documents
                            suivants :
                        </span>
                        <ul class="list-disc pl-[20px]">
                            <li>
                                une photocopie recto/verso de la carte
                                d'identité ;
                            </li>
                            <li>un certificat de résidence.</li>
                        </ul>
                    </div>
                </div>

                <div class="award__form-upload">
                    <label>
                        <span class="font-[600]">
                            La candidature est adressée au Collège des
                            bourgmestre et échevins (avenue Paul Hymans 2 à 1200
                            Bruxelles, par lettre recommandée)
                        </span>
                    </label>
                    <UploadImage name="candidacy" :needBase64="false" @upload-file-list="handleUpload" :key="uploadKey" />
                </div>
                <div v-if="parcelsDocs.length >= 1" class="award__items">
                    <label>
                        <span class="font-[600]">
                            Mes parcelles biologiques
                        </span>
                    </label>
                    <div class="award__items-list">
                        <CardWrapper v-for="(item, index) in parcelsDocs" :key="index" class="award__items-content" @click="setPdfPath(item.path)">
                            <Icon icon-name="FilePdf" />
                            <label>
                                Fichier {{ index + 1  }}
                            </label>
                        </CardWrapper>
                    </div>
                </div>
            </div>
        </MainCard>
        <PdfModal :pdf-path="pdfPath" :show="pdfPath.length >= 1" @close-modal="resetPdfPath"/>
    </div>
</template>

<script lang="ts" setup>
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import PdfViewer from "@/components/Display/pdfViewer/pdfViewerContainer.vue";
import PdfModal from '@/components/Display/PdfModal/PdfModal.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import Icon from '@/components/Common/Icon/Icon.vue';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watch, computed } from 'vue';
import { notification } from 'ant-design-vue';

const route = useRoute();
const store = useStore();
const router = useRouter();

const currentProperty = route.params.id;
const storedApplication = computed(() => store.getters["CollectiveGardenModule/getParcelsAttributionApp"]);
const parcelsDocs = computed(() => store.getters["CollectiveGardenModule/getParcelsAttributionDocs"]);

const breadcrumbListsData = [
    {
        label: 'Jardin collectif',
        url: `/environnement/${currentProperty}/jardin-collectif`
    },
    {
        label: 'Attribution des parcelles biologiques',
    },
];

const payload = ref<any[]>([]);
const pdfPath = ref<string>('')
const docPath = "/pdfImmo/toSearch/environment/attributionParcelle/Reglement-JARDINS-BIOLOGIQUES-FR.pdf";
const attributionDocPath = `${window.location.origin}${docPath}`;
const uploadKey = ref(0);

watch(() => payload.value,
    (value) => {
        payload.value = value
    },
    { immediate: true, deep: true }
)

function setPdfPath(value: any) {
    pdfPath.value = value
}

function resetPdfPath() {
    pdfPath.value = ''
}

function handleUpload(value: any) {
    payload.value = []
    if (value.length) {
        value.forEach((element: any) => payload.value.push({ file: element }));
        store.commit("CollectiveGardenModule/updateParcelsAttributionApp", { theProperty: currentProperty, requestFiles: payload.value });
    } else {
        store.commit("CollectiveGardenModule/updateParcelsAttributionApp", undefined)
    }
}

async function submitApplication() {
    let { data, status } = await store.dispatch("CollectiveGardenModule/postParcelsAttributionApplication");
    if (status === 201) {
        notification['success']({
            message: "Votre candidature a été envoyer"
        })
        uploadKey.value++;
    } else {
        notification['error']({
            message: "Une erreur s'est produite",
            description: "Veuillez réessayer s'il vous plait"
        })
    }
}

function handlePdfFile(value: any) {
    console.error(value);
}
</script>

<style lang="scss" scoped>
#iFrameAtlas {
    position: relative;
    width: 100%;
    padding-bottom: 55%;
}

@media (orientation:portrait) {
    #iFrameAtlas {
        padding-bottom: initial;
        height: 200vw;
        max-height: 85vh;
    }
}

.award {
    &__container {
        @apply flex flex-col gap-[18px] mb-[18px];
    }

    &__map--item {
        max-height: 85vh;

        @screen md {
            max-height: calc(100vh - 75px);
        }
    }

    &__form-upload {
        @apply flex flex-col gap-[10px];
    }

    .info-list {
        @apply bg-gray text-grayIcon rounded-[8px] p-[18px] flex flex-col gap-[24px];
    }

    &__items {
        @apply flex flex-col gap-[18px];

        &-list {
            @apply grid grid-cols-2 gap-[14px];

            @screen sm {
                @apply grid-cols-4;
            }

            @screen md {
                @apply grid-cols-2;
            }

            @screen lg {
                @apply grid-cols-4 gap-[18px];
            }

            a {
                @apply w-full block;
            }

            a:hover {
                @apply text-primary;
            }
        }

        &-content {
            @apply flex flex-col justify-center text-center gap-[18px] w-full cursor-pointer;

            label {
                @apply truncate block;
            }
        }
    }
}
</style>
