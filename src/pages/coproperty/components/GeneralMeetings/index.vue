<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      v-if="!displayDetails"
      :dataBreadcrumbs="breadcrumbData"
      class="generalMeeting"
      :button="true"
      :disable-submit-button="false"
      labelButton="Créer une session"
      :modal-state="showModal"
      :modal-title="'Créer une session'"
      @on-click="toggleModal"
    >
      <div v-if="sessionList.length >= 1" class="generalMeeting__container">
        <Button
          type-button="gray"
          v-for="(item, index) in sessionList"
          :key="index"
          @click="handleClick(item)"
        >
          {{ item.year }}
        </Button>
      </div>
      <CardWrapper v-else>
        <Icon icon-name="EmptySessionList" />
        <div class="text-center my-2">
          <label>Vous n’avez pas encore de sessions d'assemblée générale, veuillez créer une en cliquant sur le bouton <strong>"Créer une session"</strong></label>
        </div>
      </CardWrapper>
      <template #modalContent>
        <div>
          <InputDate
            label="Année"
            name="year"
            :picker="'year'"
            format="YYYY"
            @handle-year="handleChange"
          />
          <div class="modal-form">
            <Button type-button="primary-cancel" class="btn" @click="toggleModal">
              Annuler
            </Button>
            <Button :disabled="disableCreateBtn" type-button="primary" class="btn" @click="createSession">
              Créer
            </Button>
          </div>
        </div>
      </template>
    </MainCard>
    <SessioDetails
      v-else
      @show-menu-value="returnClick"
      @back-principal="returnClick"
    />
  </Transition>
</template>
<script lang="ts" setup>
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Button from "@/components/Common/Button/Button.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import SessioDetails from "@/pages/syndic/components/GeneralMeetings/MenuYear.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import { notification } from "ant-design-vue";

import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const breadcrumbData = [
  {
    label: "Assemblées générales",
  },
];

const sessionList = computed(() => store.getters["SyndicModule/getSessionList"]);
const displayDetails = ref<boolean>(false);
const dataYears = ref<any>();
const showModal = ref<boolean>(false);
const disableCreateBtn = ref<boolean>(true);

onMounted(async () => await store.dispatch("SyndicModule/fetchSessionList"));

function handleClick(value: any) {
  store.commit("SyndicModule/SET_CURRENT_SESSION", value);
  displayDetails.value = true;
  dataYears.value = value;
}

function returnClick(value: any) {
  if (value === 0) displayDetails.value = false;
}

function toggleModal() {
  showModal.value = !showModal.value;
}

function handleChange(value: any) {
  store.commit("SyndicModule/SET_NEW_SESSION", value);
  disableCreateBtn.value = false;
}

async function createSession() {
  let success = await store.dispatch("SyndicModule/createSession");
  toggleModal();
  success
    ? notification["success"]({ message: "Session créer avec succés" })
    : notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
}
</script>
<style lang="scss" scoped>
.generalMeeting {
  &__container {
    @apply flex flex-wrap gap-[14px];

    &:deep() {
      button {
        @apply text-primary font-[600] rounded-[8px];
      }
    }
  }
}

.modal-form {
  @apply w-full flex justify-center gap-x-[18px] mt-2;
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
