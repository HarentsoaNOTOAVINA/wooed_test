<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      v-if="!showMenuYear"
      :dataBreadcrumbs="breadcrumbData"
      class="expenses"
      :button="true"
      :disable-submit-button="false"
      labelButton="Enregistré une facture"
      :modal-state="showModal"
      modal-title="Enregistré une facture"
      @on-click="toggleModal"
    >
      <div :class="yearsData.length >= 1 ? 'expenses__content-wrapper' : 'expenses__content-wrapper--empty'">
        <div v-if="yearsData.length >= 1" class="expenses__container">
          <Button
            type-button="gray"
            v-for="(item, index) in yearsData"
            :key="index"
            @click="handleClick(item)"
          >
            {{ item.year }}
          </Button>
        </div>
        <CardWrapper v-else>
          <Icon icon-name="EmptySessionList" />
          <div class="expenses__emptyText">
            <label
              >Vous n’avez pas encore de factures enregistrés, veuillez créer une en
              cliquant sur le bouton <strong>"Enregistré une facture"</strong></label
            >
          </div>
        </CardWrapper>
      </div>
      <template #modalContent>
        <div>
          <InputDate
            label="Année"
            name="year"
            :picker="'year'"
            format="YYYY"
            @handle-year="handleSession"
          />
          <div class="modal-form">
            <Button type-button="primary-cancel" class="btn" @click="toggleModal">
              Annuler
            </Button>
            <Button
              type-button="primary"
              :disabled="currentSession === undefined"
              class="btn"
              @click="setSession"
            >
              Créer
            </Button>
          </div>
        </div>
      </template>
    </MainCard>
    <SessionDetails v-else @show-menu-value="returnClick" />
  </Transition>
</template>
<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import SessionDetails from "@/pages/syndic/components/Accounting/components/SessionDetails.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const breadcrumbData = [
  {
    label: "Dépenses extraordinaires",
  },
];

const store = useStore();

const showMenuYear = ref<boolean>(false);
const showModal = ref<boolean>(false);

const yearsData = computed(() => store.getters["SyndicModule/getYearList"]);
const currentSession = ref<object>();

onMounted(async () => {
  store.commit("SyndicModule/SET_CURRENT_SESSION", { type: "extraordinaryExpenses" });
  await store.dispatch("SyndicModule/fetchTypedInvoices");
});

function handleClick(value: any) {
  showMenuYear.value = true;
  store.commit("SyndicModule/SET_CURRENT_SESSION", value);
  store.commit("SyndicModule/SET_NEW_INVOICE_DETAILS", value);
}

function returnClick(value: any) {
  if (value === 0) {
    showMenuYear.value = false;
  }
}

function toggleModal() {
  showModal.value = !showModal.value;
}

function handleSession(value: any) {
  currentSession.value = value;
}

function setSession() {
  toggleModal();
  store.commit("SyndicModule/SET_CURRENT_SESSION", currentSession.value);
  store.commit("SyndicModule/SET_NEW_INVOICE_DETAILS", currentSession.value);
  showMenuYear.value = true;
}
</script>
<style lang="scss" scoped>
.expenses {
  &__content-wrapper {
    &--empty {
      @apply h-full flex items-center justify-center;
      
      &:deep() {
        .card-wrapper {
          @apply max-w-[400px];
        }
      }
    }
  }

  &__container {
    @apply flex flex-wrap gap-[14px];

    &:deep() {
      button {
        @apply text-primary font-[600] rounded-[8px];
      }
    }
  }

  &__emptyText {
    @apply text-center my-2;
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
