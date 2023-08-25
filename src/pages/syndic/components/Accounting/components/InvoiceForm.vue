<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      v-if="!showPage"
      :dataBreadcrumbs="breadcrumbData"
      :button="true"
      :disable-submit-button="false"
      label-button="Enregistrer la facture"
      class="currentContent"
      @click="submitInvoice"
      @handleClickReturn="back"
      :loading="loading"
    >
      <div class="currentContent__container">
        <div class="currentContent__container-container">
          <CardWrapper class="currentContent__container-wrap">
            <UploadImage
              :key="`file${key}`"
              name="file"
              @upload-single-with-name="handleChange"
            />
            <div class="currentContent__form--container">
              <Title type="h3" label="Détails" class="currentContent__subtitle" />
              <hr class="__hr" />
              <div class="currentContent__form">
                <Input
                  :key="`totalAmount${key}`"
                  name-input="totalAmount"
                  inputType="number"
                  label="Montant total de la facture"
                  placeholder="Montant total de la facture"
                  unity="€"
                  @input="handleChange"
                />
                <InputDate
                  :key="`receptionDate${key}`"
                  name="receptionDate"
                  label="Date de réception"
                  @handle-date-format-fr="handleChange"
                />
                <InputDate
                  :key="`paymentDate${key}`"
                  name="paymentDate"
                  label="Date de payement"
                  @handle-date-format-fr="handleChange"
                />
                <!-- <Button> Payer </Button> -->
              </div>
            </div>
            <div class="currentContent__form--container">
              <Title
                type="h3"
                label="Fonds de roulement"
                class="currentContent__subtitle"
              />
              <hr class="__hr" />
              <Input
                :key="`workingCapitalAmount${key}`"
                name-input="workCapitalAmountBfPay"
                inputType="number"
                label="Montant du fonds de roulement avant payement"
                placeholder="Montant du fonds de roulement avant payement"
                unity="€"
                @input="handleChange"
              />
              <Input
                :key="`leftFundAmount${key}`"
                name-input="reserveFundAmountAfPay"
                label="Montant du fonds de réserve après payement"
                placeholder="Montant du fonds de réserve après payement"
                unity="€"
                :disabled="true"
                :value="leftFundAmount"
              />
            </div>
          </CardWrapper>
        </div>
      </div>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Title from "@/components/Common/Title/Title.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import UploadImage from "@/components/Display/UploadImage/UploadImage.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

interface BreadCrumb {
  label: string,
  url?: string
}

const store = useStore();

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const leftFundAmount = ref<number>(0);
const invoiceTotalAmount = ref<number>(0);
const workingCapitalAmount = ref<number>(0);
const key = ref(0);
const loading = ref(false);

const emit = defineEmits<{
    (event: "backToPage", value: boolean): void;
    (event: "backPrincipal"): void;
}>();

const showPage = ref<boolean>(false);

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label: 
      currentSession.value.type === 'currentExpenses' 
        ? "Dépenses courantes"
        : "Dépenses extraordinaires",
    url: "",
  },
  {
    label: currentSession.value.year,
    url: ""
  },
  {
    label: "Enregistré une facture"
  }
]);

watch(
  () => workingCapitalAmount.value,
  () => {
    calculateLeftFundAmount();
  },
  { immediate: true, deep: true }
);

watch(
  () => invoiceTotalAmount.value,
  () => {
    calculateLeftFundAmount();
  },
  { immediate: true, deep: true }
);

onMounted(() => store.commit("SyndicModule/SET_NEW_INVOICE_DETAILS", { type: currentSession.value.type }));

function handleChange(value: any) {
  store.commit("SyndicModule/SET_NEW_INVOICE_DETAILS", value);
  handleAmountSet(value);
}

function handleAmountSet(value: any) {
  const [key] = Object.keys(value);
  switch (key) {
    case "totalAmount":
      invoiceTotalAmount.value = parseInt(value[key]);
      break;
    case "workCapitalAmountBfPay":
      workingCapitalAmount.value = parseInt(value[key]);
      break;
  }
}

function calculateLeftFundAmount() {
  if (isNumber(workingCapitalAmount.value) && isNumber(invoiceTotalAmount.value)) {
    leftFundAmount.value = workingCapitalAmount.value - invoiceTotalAmount.value;
    store.commit("SyndicModule/SET_NEW_INVOICE_DETAILS", {
      reserveFundAmountAfPay: leftFundAmount.value,
    });
  }
}

function isNumber(value: any) {
  return typeof value === "number";
}

function back(value: any) {
    emit("backToPage", value);
}

async function submitInvoice() {
  loading.value = true
  const invoiceDetails = store.getters["SyndicModule/getInvoiceDetails"];
  const requiredKeys = [
    "coOwnership",
    "year",
    "type",
    "totalAmount",
    "receptionDate",
    "paymentDate",
    "workCapitalAmountBfPay",
    "reserveFundAmountAfPay",
    "file",
  ];
  let requiredKeysExist = checkIfKeysExist(invoiceDetails, requiredKeys);
  if (requiredKeysExist) {
    let success = await store.dispatch("SyndicModule/postInvoice", invoiceDetails);
    if (success) {
      notification["success"]({ message: "La facture a été enregistrer" });
      leftFundAmount.value = 0;
      key.value++;
      loading.value = false;
    } else {
      notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
      loading.value = false;
    }
  }
}

function checkIfKeysExist(obj: object, keys: string[]) {
  for (let i = 0; i < keys.length; i++) {
    if (!obj.hasOwnProperty(keys[i])) return false;
  }
  return true;
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
    @apply text-primary font-[600] text-[14px];
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
