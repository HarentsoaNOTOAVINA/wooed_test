<template>
  <div class="transport-card__section">
    <Card class="transport-card__container">
      <div class="transport-card__content">
        <div class="transport-card__head-items">
          <Title class="transport-card__title" :label="pageTitle" type="h3" weight="600" />
        </div>
        <hr class="__hr" />
        <BackButton :text="'retour'" @return="backTo" />
        <div class="transport-card__items-wrap">
          <slot />
        </div>
      </div>

      <div
        v-show="displaySliderButton"
        :class="[requiredFieldExist ? 'transport-card__fieldRequired' : '']"
        class="transport-card__btn-foot"
      >
        <span v-if="requiredFieldExist" class="transport-card__fieldRequired--content"
          >(*) champ obligatoire</span
        >
        <div v-if="!showPostAnnounceButton" class="w-full flex justify-end gap-x-4">
          <Button
            v-if="!disablePreviousButton"
            type-button="border"
            class="btn-foot"
            @click="handleClick('previous')"
            :disabled="disablePreviousButton"
          >
            Précedent
          </Button>
          <Button
            type-button="secondary"
            class="btn-foot"
            @click="handleClick('next')"
            :disabled="disableNextButton"
          >
            Suivant
          </Button>
        </div>
        <div v-else class="w-full flex">
          <Button type-button="primary" @click="submitForm" class="mx-auto">
            Poster l'annonce
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import Title from "@/components/Common/Title/Title.vue";
import Card from "@/components/Display/Card/Card.vue";
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import Button from "@/components/Common/Button/Button.vue";

import { notification } from 'ant-design-vue';

import { ref } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const router = useRouter();

const isLoadSubmit = ref<boolean>(false);

const props = defineProps({
  pageTitle: {
    type: String,
    default: "",
  },
  requiredFieldExist: {
    type: Boolean,
    default: false,
  },
  disableNextButton: {
    type: Boolean,
    default: false,
  },
  disablePreviousButton: {
    type: Boolean,
    default: false,
  },
  displaySliderButton: {
    type: Boolean,
    default: false,
  },
  showPostAnnounceButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["switch-displayed-form", "back-to"]);

function handleClick(value: any) {
  emit("switch-displayed-form", value);
}

async function submitForm() {  
  let success = await store.dispatch("TransportModule/submitAnnouncement");
  success ? successProcess() : notification['error']({
    message: 'Erreur',
    description: "Vous n'aviez pas bien rempli les formulaires"
  })
}

function backTo() {
  emit("back-to");
}

function successProcess() {
  notification['success']({
    message: 'Success',
    description: "Votre annonce vient d'etre publier"
  });
  router.push('/transport/annonces');
}

</script>
<style lang="scss" scoped>
.transport-card {
  background-color: #fff;

  &__section {
    @screen md {
      height: calc(100vh - 94px);
      @apply flex-1;
    }
  }

  &__container {
    @apply h-full grid content-between;
    background-color: #fff;
    min-height: calc(100vh - 100px);
  }

  &__head-items {
    @apply hidden mt-0 mb-[18px];

    @screen md {
      @apply inline-block;
    }
  }

  &__items-wrap {
    @apply px-[14px] -mx-[14px];

    @screen md {
      height: calc(100vh - 240px);
      @apply overflow-y-auto pb-4;
      // @include scrollbar;
    }
  }

  &__title {
    @apply text-[14px] text-grayIcon;

    @screen md {
      @apply text-[16px];
    }
  }

  &__button {
    @apply mb-[18px];
  }

  &__btn-foot {
    @apply flex justify-end gap-x-4 mt-4 z-10;
    background-color: #fff;

    @screen md {
      @apply -mt-4;
    }

    .btn-foot-primary,
    .btn-foot-secondary {
      @apply w-1/2 font-semibold rounded-full my-2 py-1;

      @screen md {
        @apply w-1/5;
      }
    }

    .btn-foot {
      @apply w-1/2 font-semibold rounded-full my-2 py-1 z-10;

      @screen md {
        @apply w-1/5;
      }
    }

    &:deep() {
      button {
        @apply w-full;
      }
    }
  }

  &__fielRequired {
    @apply flex flex-col;

    @screen sm {
      @apply flex flex-row justify-between items-center;
    }
  }

  &__fielRequired--content {
    @apply block mb-[14px];

    @screen sm {
      @apply mb-[0];
    }
  }
}

.__hr {
  @apply hidden;

  @screen md {
    @apply block mb-4 text-gray;
  }
}
</style>
