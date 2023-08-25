<template>
  <div class="electric-container">
    <div class="electric-container__items">
      <Title
        type="h2"
        weight="600"
        label="SPF Finances – AGDP – Service PRODOCS Déclaration Cadastre (43B)"
        class="head-title"
      />
      <hr class="__hr" />
      <Alert>
        Les panneaux solaires n'ont aucun impact sur le calcul de votre cadastre.
      </Alert>
    </div>
    <hr class="__hr" />
    <!-- PDF -->
    <Button>Enregistrer</Button>
  </div>
</template>
<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import Title from "@/components/Common/Title/Title.vue";
import Alert from "@/components/Display/Alert/Alert.vue";
</script>
<style lang="scss" scoped>
@import "@/style.scss";
.electric-container {
  @apply flex flex-col gap-[18px] items-end w-full;
  @apply overflow-x-auto;
  @include scrollbar;
  &__items {
    @apply w-full flex flex-col gap-[18px];
  }
}
.head-title {
  @apply text-[16px] text-grayIcon w-full;
}
.__hr {
  @apply text-gray w-full;
}
</style>
