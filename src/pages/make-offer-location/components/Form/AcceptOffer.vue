<template>
    <RentOfferCard
        page-title="Liste des dossiers"
        :disable-submit-button="true"
    >
        <div class="accept-offer__container">
            <div v-for="(item, index) in documentList" :key="index" class="w-full">
                <span class="font-semibold">
                    {{ item.groupLabel }}
                </span>
                <div v-for="(element, idx) in item.groupElements" :key="idx">
                    <DocumentTitle 
                        :document-label="element.documentLabel" 
                        @click="displayDocument" 
                    />
                </div>
            </div>
        </div>
        <PdfModal 
            :show="displayPdfModal"
            :pdf-path="pdfPath"
            @close-modal="hideDocument"
        />
    </RentOfferCard>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import RentOfferCard from "../RentOfferCard/RentOfferCard.vue";
import DocumentTitle from "./DocumentTitle.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import { documentList } from "@/pages/make-offer-location/data";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from 'axios';

const store = useStore();
const router = useRouter();
// onMounted(()=>{
//     router.push("/signature-offre-location");
// });

const displayPdfModal = ref<boolean>(false);
const currentDocument = ref<object>({});

const pdfLink = computed(() => store.getters['RentalModule/getRawDocumentCode']);

const pdfPath = ref<any>();

function displayDocument(payload: any) {
    currentDocument.value = payload;
    displayPdfModal.value = true;
    pdfPath.value = store.getters['RentalModule/getRawDocumentCode']; // TODO: need more attention to correct it
}

// async function displayDocument() {
//     console.error(permaLink.value);
    
//     // currentDocument.value = payload;
//     // await store.dispatch('RentalModule/fetchEditableDocument');
//     pdfPath.value = await axios.get(permaLink.value, {responseType: "blob"}).then(response => {
//             console.log("Success", response);
//             const blob = new Blob([response.data]);
//             const ObjectUrl = URL.createObjectURL(blob);
//             pdfPathFinder.value = ObjectUrl;
//         })
//     displayPdfModal.value = true;
// }

function hideDocument(value: boolean) {
    currentDocument.value = {};
    displayPdfModal.value = false
}

</script>
<style lang="scss" scoped>
.accept-offer {
    &__container {
        @apply flex flex-wrap;
    }
}
</style>