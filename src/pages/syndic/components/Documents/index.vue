<template>
  <MainCard :button="true" labelButton="Enregistrer" :dataBreadcrumbs="breadcrumbData" :disable-submit-button="false"
    class="document" @on-click="submitForm" :borderBottom="true">
    <div class="document__container">
      <div class="document__form-upload" v-for="(item, index) in documentData" :key="index">
        <label>
          <span class="font-[600] block mb-2">
            {{ item.label }}
          </span>
        </label>
        <CardWrapper>
          <div class="flex flex-col">
            <div 
              v-for="(doc, index) in sharedDocuments"
              :key="index"
            >
              <div 
                v-show="doc.type === item.name"
                class="document-list__container cursor-pointer" 
                @click="setPdfPath(doc.path)"
              >
                <Icon icon-name="AdobeReaderIcon" class="document-list__icon" />
                <span class="document-list__title">{{ item.label }}</span>
              </div>
            </div>

          </div>
          <UploadImage :name="item.name" :needBase64="false" @upload-single-with-name="handleUpload"
            :key="`${item.name}-${uploadKey}`" class="my-2" />
        </CardWrapper>
      </div>
    </div>
    <PdfModal :pdf-path="pdfPath" :show="pdfPath.length >= 1" @close-modal="setPdfPath('')" />
  </MainCard>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import UploadImage from "@/components/Display/UploadImage/UploadImage.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { notification } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";

import { useStore } from "vuex";

interface Idoc {
  type?: string;
  file?: object;
  [key: string]: any;
}

const store = useStore();

const breadcrumbData = [
  {
    label: "Partager des documents",
  },
];

const documentData = [
  {
    id: 0,
    name: "insuranceContracts",
    label: "Contrats d'assurance",
  },
  {
    id: 1,
    name: "contractsConcluded",
    label: "Contrats conclus avec les fournisseurs",
  },
  {
    id: 2,
    name: "maintenanceContracts",
    label: "Contrats d'entretien",
  },
  {
    id: 3,
    name: "syndicContracts",
    label: "Contrat conclu avec le syndic",
  },
  {
    id: 4,
    name: "planningPermit",
    label: "Permis d'urbanisme",
  },
  {
    id: 5,
    name: "environmentalPermit",
    label: "Permis d'environnement",
  },
];

const sharedDocuments = computed(() => store.getters["SyndicModule/getSharedDocuments"]);
const pdfPath = ref<string>("");
const uploadKey = ref(0);

onMounted(async () => await store.dispatch("SyndicModule/fetchSharedDocuments"));

function setPdfPath(value: any) {
  pdfPath.value = value;
}

function handleUpload(value: any) {
  let [key] = Object.keys(value);
  let data: Idoc = { type: key, file: value[key] };
  store.commit("SyndicModule/ADD_DOCUMENT_TO_SHARE", data);
}

async function submitForm() {
  let success = await store.dispatch("SyndicModule/postDocumentsToShare");

  if (success) {
    notification["success"]({ message: "Vos documents sont enregistrer" });
    uploadKey.value++;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }
}
</script>
<style lang="scss" scoped>
.document {
  &__container {
    @apply flex flex-col gap-[18px];
  }

  &__form-upload {
    @apply flex flex-col;
  }
}

.document-list {
  &__container {
        @apply flex duration-300 w-full py-3 px-5 rounded-lg border mb-2;
        border-color: var(--color-stroke-gray);
        @screen md {
            &:hover {
                @apply cursor-pointer;
                color: var(--color-primary);
            }
        }
    }

    &__title {
        @apply truncate;
    }

    &__icon {
        @apply h-5 w-5 mr-4;
    }
}
</style>
