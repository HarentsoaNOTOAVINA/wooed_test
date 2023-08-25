<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard :dataBreadcrumbs="breadcrumbData" @handleClickReturn="back">
      <Transition appear name="fade-step" mode="out-in">
        <div v-if="currentReport === undefined">
          <ReportTitle
            v-for="(report, index) in reportList"
            :key="index"
            :documentLabel="`Rapport ajouter le ${formatDate(report.created)}`"
            @set-display-details="setCurrentInvoice(report)"
          />
        </div>
        <ReportDetails v-else :data="currentReport" @back-to-page="backToInvoiceList" />
      </Transition>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import ReportTitle from "@/pages/syndic/components/Accounting/components/SheetTitle.vue";
import ReportDetails from "@/pages/syndic/components/Council/ReportDetails.vue";
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

interface BreadCrumb {
  label: string;
  url?: string;
}

const store = useStore();
const emit = defineEmits(["back-to-prev"]);

const reportList = ref<any>();
const currentReport = ref<object>();
const activeDisplayTitle = ref<string>("Liste de factures");

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label: "Commissaire aux comptes",
    url: "",
  },
  {
    label: "Rapport",
    url: "",
  },
  {
    label: "Liste de rapports",
  },
]);

watch(
  () => activeDisplayTitle.value,
  (value) => {
    activeDisplayTitle.value = value;
  },
  { immediate: true, deep: true }
);

onMounted(
  async () =>
    (reportList.value = await store.dispatch("SyndicModule/fetchAccountAuditorReport"))
);

function back(value: any) {
  emit("back-to-prev", value);
}

function backToInvoiceList() {
  currentReport.value = undefined;
  breadcrumbData.value[2].label = "Liste de rapports";
}

function setCurrentInvoice(value: any) {
  currentReport.value = value;
  breadcrumbData.value[2].label = `Rapport ajouter le ${formatDate(value.created)}`;
}

function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fr-FR", options);
}
</script>
<style lang="scss" scoped>
.fade-step-enter-active,
.fade-step-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-step-enter-from,
.fade-step-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
