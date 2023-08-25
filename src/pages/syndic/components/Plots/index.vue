<template>
  <MainCard :dataBreadcrumbs="breadcrumbData" :button="true">
    <div :class="(plotList.length >= 1) ? 'plots__container' : 'plots__container--empty'">
      <div v-if="plotList.length >= 1" class="plots__list-container">
        <PlotCard
          v-for="(plot, index) in plotList"
          :key="index"
          :data="plot"
          @delete-current-lot="toggleModal('delete', plot)"
          @edit-current-lot="toggleModal('edit', plot)"
        />
      </div>
      <CardWrapper v-else>
        <Empty description="Vous n’avez pas encore un lot, veuillez créer un en cliquant sur le bouton “Ajouter un lot“ " />
      </CardWrapper>
    </div>
    <template #buttonFooter>
      <div class="plots__slider-btn">
        <Button
          type-button="secondary"
          class="plots__footer-btn"
          @click="toggleModal('add')"
        >
          Ajouter un lot
        </Button>
      </div>
    </template>
  </MainCard>
  <Modal
    :title="modalTitle"
    :isShowModal="displayModal"
    :width="screenType >= 1024 ? '800' : '520'"
    :key="modalKey"
    @onBack="toggleModal"
  >
    <template #content>
      <PlotOverView
        v-if="mode.delete"
        :data="temp"
        @cancel-deletion="toggleModal"
        @delete-current-plot="handleDelete"
      />
      <NewPlotForm v-else :mode="mode" :data="temp" @hide-form="toggleModal" />
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import PlotCard from "@/pages/syndic/components/Plots/PlotCard.vue";
import Modal from "@/components/Display/Modal/Modal.vue";
import NewPlotForm from "@/pages/syndic/components/Plots/NewPlotForm.vue";
import PlotOverView from "@/pages/syndic/components/Plots/PlotOverView.vue";
import Button from "@/components/Common/Button/Button.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { notification } from "ant-design-vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Empty } from "ant-design-vue";

interface IMode {
  edit: boolean;
  delete: boolean;
  add: boolean;
  [key: string]: boolean;
}

const screenType = ref<number>(screen.width);
const store = useStore();
const temp = ref<any>();
const displayModal = ref<boolean>(false);
const modalTitle = ref<string>("");
const modalKey = ref(0);
const breadcrumbData = [{ label: "Liste des lots et propriétaires" }];

const mode = ref<IMode>({ edit: false, delete: false, add: false });

const plotList = computed(() => store.getters["SyndicModule/getMyLotList"]);

onMounted(async () => {
  store.dispatch("SyndicModule/checkUserRole");
  store.dispatch("SyndicModule/setSyndicProfile");
  await store.dispatch("SyndicModule/fetchMyLotList");
});

function toggleModal(value: string, data?: any) {
  displayModal.value = !displayModal.value;
  handleMode(value);
  if (data) temp.value = data;
  if (displayModal.value === false) resetModal();
  modalKey.value++;
}

function handleMode(value: string) {
  resetModal();
  switch (value) {
    case "add":
      modalTitle.value = "Ajouter un nouveau lot";
      mode.value.add = true;
      break;
    case "delete":
      modalTitle.value = "Supprimer un lot existant";
      mode.value.delete = true;
      break;
    case "edit":
      modalTitle.value = "Modifier un lot existant";
      mode.value.edit = true;
      break;
    default:
      resetModal();
      break;
  }
}

async function handleDelete(value: any) {
  const success = await store.dispatch("SyndicModule/deleteCurrentLot", value);
  success
    ? notification["success"]({ message: "Lot supprimé" })
    : notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  toggleModal("", undefined);
  resetModal();
}

function resetModal() {
  const keys = Object.keys(mode.value);
  keys.forEach((key: string) => (mode.value[key] = false));
  modalTitle.value = "";
  temp.value = undefined;
}
</script>
<style lang="scss" scoped>
.plots {
  &__container {
    &--empty {
      @apply h-full flex items-center justify-center;
      &:deep() {
        .card-wrapper {
          @apply max-w-[400px];
        }
      }
    }
  }
  &__list-container {
    @apply grid gap-2;
  }
}
</style>
