<template>
  <MobilityCard :dataBreadcrumbs="breadcrumbListsData" class="carpooling__section">
    <div class="carpooling__container">
      <Router-link
        v-for="(item, index) in dataBikes"
        :key="index"
        :to="item.link"
        class="carpooling__items"
      >
        <div class="carpooling__content">
          <Icon :icon-name="item.icon" />
          <span>{{ item.label }}</span>
        </div>
        <Icon icon-name="ArrowNext" />
      </Router-link>
    </div>
  </MobilityCard>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
import MobilityCard from "@/pages/mobility/components/MobilityCard.vue";

const dataBikes = [
  {
    icon: "CarFind",
    label: "Chercher un covoitureur",
    link: "/mobilite/recherche-covoitureur",
  },
  {
    icon: "TrainCar",
    label: "Proposer mes services de covoitureur",
    link: "/mobilite/service-covoitureur",
  },
];

const breadcrumbListsData = [
  {
    url: "/mobilite",
    label: "Mobilité",
  },
  {
    label: "Covoiturage",
  },
];
</script>

<style lang="scss" scoped>
@import "@/style.scss";
.carpooling {
  &__container {
    @apply flex flex-col gap-y-[18px];
  }
  &__items {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    @apply bg-white text-grayIcon flex items-center justify-between p-[16px] border border-gray rounded-[4px];
    @include hoverButtonDark;
  }
  &__content {
    @apply flex items-center gap-x-[16px];
  }
}
</style>
