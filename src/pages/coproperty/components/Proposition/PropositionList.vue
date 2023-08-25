<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard :dataBreadcrumbs="breadcrumbData" @handleClickReturn="back">
      <Transition appear name="fade-step" mode="out-in">
        <div v-if="currentProposition === undefined">
          <PropositionTitle
            v-for="(proposition, index) in propositionList"
            :key="index"
            :documentLabel="`Proposition soumise le ${formatDate(proposition.created)}`"
            @set-display-details="setCurrentProposition(proposition)"
          />
        </div>
        <PropositionDetails
          v-else
          :proposition="currentProposition"
          @back-to-page="backToPropositionList"
        />
      </Transition>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import PropositionTitle from "@/pages/syndic/components/Accounting/components/SheetTitle.vue";
import PropositionDetails from "@/pages/syndic/components/Proposition/PropositionDetails.vue";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

interface BreadCrumb {
  label: string;
  url?: string;
}

const store = useStore();
const emit = defineEmits(["back-to-prev"]);

const propositionList = computed(() => store.getters["SyndicModule/getPropositionList"]);
const currentProposition = ref<object>();
const activeDisplayTitle = ref<string>("Liste de factures");

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label: "Propositions",
    url: "",
  },
  {
    label: "Liste de propositions",
  },
]);

watch(
  () => activeDisplayTitle.value,
  (value) => {
    activeDisplayTitle.value = value;
  },
  { immediate: true, deep: true }
);

function back(value: any) {
  breadcrumbData.value[2] 
    ? backToPropositionList()
    : emit("back-to-prev", value);
}

function backToPropositionList() {
  currentProposition.value = undefined;
  breadcrumbData.value.pop();
  delete breadcrumbData.value[1].url;
}

async function setCurrentProposition(value: any) {
  currentProposition.value = value;
  breadcrumbData.value.push({ label: `Proposition du ${formatDate(value.created)}` });
  breadcrumbData.value[1].url = ""
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
