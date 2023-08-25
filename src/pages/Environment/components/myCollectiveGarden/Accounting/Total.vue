<template>
  <Transition appear name="fade-step" mode="out-in">
    <div>
      <MainCard
        v-if="!showMenuYear"
        :dataBreadcrumbs="breadcrumbData"
        class="total"
        :modal-state="showModal"
        @on-click="toggleModal"
      >
        <div :class="yearsData.length >= 1 ? 'total__content-wrapper' : 'total__content-wrapper--empty'">
          <div v-if="yearsData.length >= 1" class="total__container">
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
            <div class="total__emptyText">
              <label
                >Vous n’avez pas encore de factures enregistrés</label
              >
            </div>
          </CardWrapper>
        </div>
        <template #modalContent>
          <div>
            <InputDate label="Année" name="year" :picker="'year'" format="YYYY" />
            <div class="modal-form">
              <Button type-button="primary-cancel" class="btn" @click="toggleModal">
                Annuler
              </Button>
              <Button type-button="primary" class="btn"> Créer </Button>
            </div>
          </div>
        </template>
      </MainCard>
      <TotalContent v-else @back-to-page="returnClick" />
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import TotalContent from "@/pages/syndic/components/Accounting/components/TotalContent.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const breadcrumbData = [
  {
    label: "Total",
  },
];

interface YearData {
  year: number;
}

const showMenuYear = ref<boolean>(false);
const showModal = ref<boolean>(false);

const yearsData = computed(() => store.getters["SyndicModule/getYearList"]);

onMounted(async () => {
  store.commit("SyndicModule/SET_CURRENT_SESSION", { type: undefined });
  await store.dispatch("SyndicModule/fetchAllInvoices")
});

function handleClick(value: any) {
  showMenuYear.value = true;
  store.commit("SyndicModule/SET_CURRENT_SESSION", value);
}

function returnClick(value: any) {
  console.error(value);
  if (value === 0) {
    showMenuYear.value = false;
  }
}

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>
<style lang="scss" scoped>
.total {
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
