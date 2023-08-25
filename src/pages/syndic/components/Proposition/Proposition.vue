<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      v-if="!showPage"
      :dataBreadcrumbs="breadcrumbData"
      class="proposition"
      @handleClickReturn="back"
    >
      <div class="proposition__container">
        <div
          v-for="(item, index) in shortcuts"
          :key="index"
          class="proposition__items"
          @click="handleClick(item)"
        >
          <div class="proposition__content">
            <Icon :icon-name="item.icon" />
            <span>{{ item.label }}</span>
          </div>
          <Icon icon-name="ArrowNext" />
        </div>
      </div>
    </MainCard>
    <component
      v-else
      :is="activeDisplay"
      @back-to-prev="backToPrevious"
    />
  </Transition>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import { defineAsyncComponent, ref, shallowRef, onMounted, computed } from "vue";
import { useStore } from "vuex";

interface BreadCrumb {
  label: string;
  url?: string;
}

const PropositionForm = defineAsyncComponent(
  () => import("@/pages/syndic/components/Proposition/PropositionForm.vue")
);
const PropositionList = defineAsyncComponent(
  () => import("@/pages/syndic/components/Proposition/PropositionList.vue")
);

const store = useStore();

const emit = defineEmits<{
  (event: "showMenuValue", value: boolean): void;
  (event: "backPrincipal", value: any): void;
}>();

const showPage = ref<boolean>(false);
const activeDisplay = shallowRef<any>();

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label: "Propositions",
  }
]);

const shortcuts = [
  {
    icon: "SmartHome",
    label: "Soumettre une proposition",
    component: PropositionForm,
  },
  {
    icon: "SmartHome",
    label: "Liste de propositions",
    component: PropositionList,
  },
];

onMounted(async () => await store.dispatch("SyndicModule/fetchPropositions"));

function back(value: any) {
  emit("showMenuValue", value);
}

function handleClick(item: any) {
  if (item.component) {
    showPage.value = true;
    activeDisplay.value = item.component;
  }
}

function backToPrevious() {
  showPage.value = false;
  activeDisplay.value = undefined;
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

.proposition {
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
