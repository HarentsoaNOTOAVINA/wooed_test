<template>
  <MainCard :dataBreadcrumbs="breadcrumbListsData" class="trajet__section">
    <div class="trajet__container">
      <TransportSlideMenu
        :slideMenu="slideMenuData"
        :announceMenu="true"
        @set-active-component="setActiveComponent"
      />
      <div class="trajet__items">
        <div class="trajet__container--empty">
          <div class="trajet__items--empty">
            <Icon icon-name="BigMarkerRoad" />
            <div>
              <Paragraphe>
                Enregistrer un trajet pour être automatiquement alerte(e) lorsqu’un colis
                se trouve sur votre route.
              </Paragraphe>
            </div>
            <Button class="trajet__button"> Enregistrer un trajet </Button>
          </div>
        </div>
      </div>
    </div>
  </MainCard>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import TransportSlideMenu from "@/pages/transport/components/TransportSlideMenu.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { ref } from "vue";
import Button from "@/components/Common/Button/Button.vue";
import PurposeTarget from '@/pages/transport/components/targetPurpose/targetPurpose.vue';
import { useStore } from "vuex";

const store = useStore();
const list = ref<boolean>(true);

const breadcrumbListsData = [
  {
    label: "Mes trajets",
  },
];

const slideMenuData = [
  {
    label: "Nouveau trajet",
    icon: "NewTrajet",
    labelContent: "Proposer un trajet",
    // routeName: "transport",
    component: PurposeTarget,
  },
  {
    label: "En ligne",
    icon: "MarkerRoad",
    labelContent: "0 en ligne",
  },
];

function setActiveComponent(value: any) {
  store.dispatch("TransportModule/setActiveComponent", value.component);
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";
.trajet {
  &__container {
    @apply h-full flex flex-col gap-y-[18px];
    &--empty {
      @apply h-full;
      @media (min-height: 442px) {
        @apply h-full flex justify-center items-center;
      }
    }
  }
  &__items {
    @apply h-full flex flex-col gap-[14px];
    &--empty {
      @apply max-w-[416px] flex flex-col gap-y-[10px] py-[10px] text-grayIcon text-center;
      &:deep {
        p {
          @apply mb-0;
        }
        svg {
          @apply w-[60px] h-[60px];
          path {
            @apply stroke-strokeGray;
          }
        }
      }
    }
  }
  &__button {
    &:deep() {
      button {
        @apply bg-gray text-grayIcon font-[600];
      }
    }
  }
}
</style>
