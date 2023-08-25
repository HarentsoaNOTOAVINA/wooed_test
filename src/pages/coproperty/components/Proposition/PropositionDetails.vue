<template>
  <Transition appear name="fade-step" mode="out-in">
    <div class="currentContent__container">
      <BackButton text="Liste de propositions" @return="back" />
      <div class="currentContent__container-container">
        <CardWrapper class="currentContent__container-wrap">
          <Title type="h3" label="Proposition" class="currentContent__subtitle" />
          <Paragraphe>
            {{ proposition.description }}
          </Paragraphe>
          <div class="proposition__container">
            <div v-for="(vote, index) in votes" :key="index" class="proposition__items">
              <div class="proposition__content w-2/3">
                <div class="w-1/2">
                  <div class="proposition__sub-title">Numéro du lot</div>
                  <div>{{ vote.lot.numberLot }}</div>
                </div>
                <div class="w-1/2">
                  <div class="proposition__sub-title">Propriétaire</div>
                  <div>{{ vote.lot.ownerName }}</div>
                </div>
              </div>
              <div class="w-1/3 flex justify-end">
                <div v-if="vote.requestPrecision" class="proposition__precision-request">
                  {{ vote.requestPrecision }}
                </div>
                <Icon v-else :icon-name="vote.isHeFor ? 'Accepted' : 'Refused'" />
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import Title from "@/components/Common/Title/Title.vue";
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

interface Option {
  value: string;
  label: string;
}

interface Count {
  label: string;
  count: string;
}

const store = useStore();

const emit = defineEmits<{
  (event: "backToPage", value: boolean): void;
  (event: "backPrincipal"): void;
}>();

const props = defineProps({
  proposition: {
    type: Object,
    default: {},
  },
});

const showPage = ref<boolean>(false);
const pdfPath = ref<string>("");

const votes = ref<any>();
const lotList = computed(() => store.getters["SyndicModule/getMyLotList"]);

onMounted(async () => {
  votes.value = await store.dispatch("SyndicModule/fetchPropositionVotes", {
    propositionId: props.proposition.id,
  });
  votes.value = updateLotData(votes.value);
});

function updateLotData(array: any[]) {
  array.forEach((element: any) => {
    const lotId = getId(element.lot);
    let [lotDetails] = lotList.value.filter(
      (element: any) => element.id === parseInt(lotId)
    );
    delete lotDetails.coOwnership;
    delete lotDetails.coOwnershipLotAccounts;
    element.lot = lotDetails;
  });
  return array;
}

function getId(url: string) {
  const splitUrl = url.split("/");
  return splitUrl[splitUrl.length - 1];
}

function setPdfPath(value: any) {
  pdfPath.value = value;
}

function back(value: any) {
  emit("backToPage", value);
}

function handleOptionsConsistency(lots: any) {
  let result: Option[] = [];
  if (Array.isArray(lots) && lots.length >= 1)
    lots.forEach((lot: any) => result.push({ value: lot.id, label: lot.numberLot }));
  return result;
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
@import "@/style.scss";

.currentContent {
  &__container {
    @apply flex flex-col gap-[14px];
  }

  &__title {
    @apply text-primary font-[600] text-[14px] pl-[24px];
  }

  &__subtitle {
    @apply text-secondary font-[600] text-[14px];
  }

  &__container {
    @apply flex flex-col gap-[18px];

    &-container {
      @apply flex flex-col gap-[18px];
    }

    &-wrap {
      @apply flex flex-col gap-[18px];

      .currentContent__subtitle {
        @apply text-primary;
      }

      &:deep() {
        .custom-input__fields,
        .custom-select__wrapper {
          @apply mb-0;
        }

        .date__space {
          gap: 0 !important;
        }

        .date__label {
          @apply mb-[10px];
        }

        label {
          @apply font-[600] text-black;
        }
      }
    }
  }
}

.proposition {
  &__container {
    @apply flex flex-col gap-y-[18px];
  }

  &__items {
    // font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    @apply bg-white text-grayIcon flex flex-row items-center justify-between p-[16px] border-2 border-gray rounded-[4px];
  }

  &__content {
    @apply flex flex-row items-center gap-x-[16px];
  }

  &__sub-title {
    @apply font-semibold mb-2;
    color: var(--color-primary);
  }

  &__precision-request {
    @apply p-2 rounded-md;
    background-color: var(--color-gray);
  }
}

.__hr {
  @apply text-gray w-full;
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
