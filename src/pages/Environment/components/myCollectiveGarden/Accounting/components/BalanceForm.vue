<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      :dataBreadcrumbs="breadcrumbData"
      class="menuYear"
      @handleClickReturn="back"
    >
      <div class="currentContent__container">
            <div class="extraordinairesContent__container-wrap">
              <label>Appel de fonds</label>
              <div class="extraordinairesContent__form">
                <Input
                  :key="`amount${key}`"
                  name-input="amount"
                  inputType="number"
                  label="Montant"
                  placeholder="Montant"
                  unity="€"
                  @input="handleChange"
                />
                <InputDate
                  :key="`sendingDate${key}`"
                  name="sendingDate"
                  label="Date d’envoie"
                  @handle-date-format-fr="handleChange"
                />
                <InputDate
                  :key="`paymentDate${key}`"
                  name="paymentDate"
                  label="Date de paiement"
                  @handle-date-format-fr="handleChange"
                />
              </div>
            </div>
        <Button class="mt-4" @click="submitForm"> Enregistré </Button>
      </div>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import Button from "@/components/Common/Button/Button.vue";
import Input from "@/components/Common/Input/Input.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

interface BreadCrumb {
  label: string;
  url?: string;
}

const store = useStore();

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const key = ref(0);

const payload = ref<any>({});

const emit = defineEmits(["backToPage"])

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label:
      currentSession.value.type === "currentExpenses"
        ? "Dépenses courantes"
        : "Dépenses extraordinaires",
    url: "",
  },
  {
    label: currentSession.value.year,
    url: ""
  },
  {
    label: "Appel de fonds",
  },
]);

function handleChange(value: any) {
  payload.value = { ...payload.value, ...value };
}

function back(value: any) {
  emit("backToPage", value);
}

async function submitForm() {
  let success = await store.dispatch(
    "SyndicModule/postCurrentCoOwnershipAccountBalance",
    payload.value
  );
  if (success) {
    notification["success"]({ message: "Appel de fonds enregistré" });
    key.value++;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";
.extraordinairesContent {
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
      .extraordinairesContent__subtitle {
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
      .extraordinairesContent__subtitle {
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
