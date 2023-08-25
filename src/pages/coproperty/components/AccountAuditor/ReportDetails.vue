<template>
  <Transition appear name="fade-step" mode="out-in">
    <div class="currentContent__container">
      <BackButton text="Liste de rapports" @return="back" />
      <div class="currentContent__container-container">
        <CardWrapper class="currentContent__container-wrap">
          <div v-for="(report, index) in props.data.coOwnershipFiles" :key="index">
            <div class="cursor-pointer" @click="setPdfPath(report.path)">
              <Icon icon-name="FilePdf" />
            </div>
          </div>

          <div class="currentContent__form--container">
            <Title type="h3" label="Commentaire" class="currentContent__subtitle" />
            <hr class="__hr" />
            {{ data.comment }}
          </div>
        </CardWrapper>
      </div>
      <PdfModal
        :pdf-path="pdfPath"
        :show="pdfPath.length >= 1"
        @close-modal="setPdfPath('')"
      />
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import Title from "@/components/Common/Title/Title.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import { ref } from "vue";
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
  data: {
    type: Object,
    default: {},
  },
});

const pdfPath = ref<string>("");

function setPdfPath(value: any) {
  pdfPath.value = value;
}

function back(value: any) {
  emit("backToPage", value);
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
