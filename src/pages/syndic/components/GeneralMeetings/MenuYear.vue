<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      v-if="!showPage"
      :dataBreadcrumbs="breadcrumbData"
      class="menuYear"
      @handleClickReturn="back"
    >
      <div class="menuYear__container">
        <div
          v-for="(item, index) in dataBikes"
          :key="index"
          class="menuYear__items"
          @click="handleClick(item)"
        >
          <div class="menuYear__content">
            <Icon :icon-name="item.icon" />
            <span>{{ item.label }}</span>
          </div>
          <Icon icon-name="ArrowNext" />
        </div>
      </div>
    </MainCard>
    <component v-else :is="activeDisplay" @backToPage="returnClick" :currentSession="currentSession" />
  </Transition>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import { defineAsyncComponent, ref, shallowRef, onMounted, computed } from "vue";
import { useStore } from "vuex";

const Convocation = defineAsyncComponent(() => import("@/pages/syndic/components/GeneralMeetings/Convocation.vue"));
const ProcesVerbal = defineAsyncComponent(() => import("@/pages/syndic/components/GeneralMeetings/ProcesVerbal.vue"));

const store = useStore();

const emit = defineEmits<{
  (event: "showMenuValue", value: boolean): void;
  (event: "backPrincipal", value: any): void;
}>();

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const showPage = ref<boolean>(false);
const activeDisplay = shallowRef<any>();

const breadcrumbData = [
  {
    label: "Assemblées générales",
    url: "",
  },
  {
    label: currentSession.value.year,
  },
];

const dataBikes = [
  {
    icon: "SmartHome",
    label: "Convocation",
    component: Convocation,
  },
  {
    icon: "SmartHome",
    label: "Procès-verbal",
    component: ProcesVerbal,
  },
  // {
  //   icon: "SmartHome",
  //   label: "Divers",
  //   component: undefined,
  // },
];

onMounted(async () => await fetchSessionData());

async function fetchSessionData() {
  await store.dispatch("SyndicModule/fetchCurrentAgendas");
  await store.dispatch("SyndicModule/fetchCurrentDecisions");
  await store.dispatch("SyndicModule/fetchMeetingTranscript");
}

function back(value: any) {
  emit("showMenuValue", value);
}

function handleClick(item: any) {
  if (item.component) {
    showPage.value = true;
    activeDisplay.value = item.component;
  }
}

function returnClick(value: any) {
  if (value === 0) {
    emit("backPrincipal", value);
  }
  if (value === 1) {
    showPage.value = false;
  }
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";
.menuYear {
  &__container {
    @apply flex flex-col gap-y-[18px];
  }
  &__items {
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    line-height: 17px;
    @apply bg-white text-grayIcon flex items-center justify-between p-[16px] border border-gray rounded-[4px];
    @include hoverButtonDark;
  }
  &__content {
    @apply flex items-center gap-x-[16px];
  }
}

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
