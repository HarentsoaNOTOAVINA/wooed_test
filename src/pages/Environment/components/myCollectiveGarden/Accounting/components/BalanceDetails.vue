<template>
  <Transition appear name="fade-step" mode="out-in">
    <div class="currentContent__container">
      <BackButton text="Solde comptable" @return="back" />
      <div class="currentContent__container-container">
        <CardWrapper class="currentContent__container-wrap">
          <div class="currentContent__form--container">
            <Title type="h3" label="Détails" class="currentContent__subtitle" />
            <hr class="__hr" />
            <TableContent :dataTableContent="invoiceDetails" :total="false" />
          </div>
          <div class="currentContent__form--container">
            <Title
              type="h3"
              label="Quotes-parts par lot"
              class="currentContent__subtitle"
            />
            <hr class="__hr" />
            <div class="currentContent__form">
              <Select
                name="lotId"
                label="Sélectionner un lot"
                placeholder="Sélectionner un lot"
                :options="lotList"
                @change-select="handleQuotaDetails"
              />
            </div>
            <TableContent
              :dataTableContent="balanceDetails"
              totalLabel="Solde à charge du lot"
              :totalCount="balanceLotInCharge"
            />
          </div>
        </CardWrapper>
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import Select from "@/components/Common/Select/Select.vue";
import Title from "@/components/Common/Title/Title.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import TableContent from "@/pages/syndic/components/Accounting/components/TableContent.vue";
import { ref, computed } from "vue";
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

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const lotList = computed(() => {
  let temp = store.getters["SyndicModule/getMyLotList"];
  return handleOptionsConsistency(temp);
});

const emit = defineEmits<{
  (event: "backToPage", value: boolean): void;
  (event: "backPrincipal"): void;
}>();

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

const showPage = ref<boolean>(false);
const pdfPath = ref<string>("");

const invoiceDetails = [
  {
    label: "Montant",
    count: props.data.amount.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'}),
  },
  {
    label: "Date d'envoie",
    count: props.data.sendingDate,
  },
  {
    label: "Date de payement",
    count: props.data.paymentDate,
  },
];

const balanceDetails = ref<Count[]>([
  {
    label: "Solde à charge du propriétaire (40%)",
    count: (0).toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'}),
  },
  {
    label: "Solde à charge du locataire (60%)",
    count: (0).toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'}),
  },
]);

const balanceLotInCharge = ref((0).toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'}));

function back(value: any) {
  emit("backToPage", value);
}

function handleOptionsConsistency(lots: any) {
  let result: Option[] = [];
  if (Array.isArray(lots) && lots.length >= 1)
    lots.forEach((lot: any) => result.push({ value: lot.id, label: lot.numberLot }));
  return result;
}

async function handleQuotaDetails(value: any) {
  let payload = { balanceId: props.data.id, ...value };
  let [data] = await store.dispatch("SyndicModule/fetchCurrentLotAccountBalance", payload);
  balanceDetails.value[0].count = data.ownerBalance.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'});
  balanceDetails.value[1].count = data.tenantBalance.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'});
  balanceLotInCharge.value = data.lotBalance.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'});
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

  &__form {
    @apply flex flex-col gap-[14px];

    &--container {
      @apply flex flex-col gap-[14px];

      .currentContent__subtitle {
        @apply text-grayIcon;
      }
    }

    @screen md {
      @apply gap-[18px];
    }
  }

  &__button {
    @apply flex justify-end;
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
