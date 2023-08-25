<template>
  <Layout 
    title="Station d'épuration individuelle"
    :display-next-btn="false"
  >
    <template #body>
      <PdfViewer
        v-if="pdfPath"
        :button-label="'Valider'"
        :pdf-url="pdfPath"
        @save="handlePdfFile"
      />
    </template>
  </Layout>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router"
import Layout from "../layout.vue";
import PdfViewer from "@/components/Display/pdfViewer/pdfViewerContainer.vue";
import { notification } from 'ant-design-vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const pdfPath = ref<string>();
const base_url = window.location.origin

onMounted(() => fetchRelatedPdf())

async function handlePdfFile(value: any) {
  const payload = { theProperty: route.params.id, file: value }
  store.dispatch("EnvironmentModule/setWaterTreatmentData", payload);
  let { data, status } = await store.dispatch("EnvironmentModule/postWaterTreatmentDeclaration");
  status === 201 ? backTo() : notification['error']({ message: 'Erreur', description: "Une erreur s'est produite, veuillez reessayer ulterieurement"});
}

function backTo() {
  notification['success']({
    message: 'Success',
    description: 'Votre demande a été envoyer'
  })
  router.push({ name: 'environment-detail', params: { id: route.params.id } })
}

async function fetchRelatedPdf() {
  let propertyDetails = await store.dispatch("UrbanismeModule/getDetailsProperty", route.params.id);
  let payload = { region: propertyDetails.region, type: 'station-d-epuration' }
  let response = await store.dispatch("EnvironmentModule/getWaterTreatmentFile", payload)
  pdfPath.value = base_url+response.filePath;
}
</script>
