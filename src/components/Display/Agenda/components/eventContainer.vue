<template>
    <div>
        <div class="label-container__content">
            <Icon class="label-container__content-icon" :icon-name="'Star'"
                :color="'var(--color-primary)'" />
            <div class="label-container__content-label">
                <span class="label-container__label">{{ props.title }}</span>
                <span class="label-container__description">{{ props.timeText }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
const props = defineProps({
    timeText: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
.label-container {
  @apply w-full flex flex-col items-center mb-[4px];

  &__content {
    @screen md {
      @apply flex items-center gap-x-4;
    }

    &-icon {
      @apply hidden;

      @screen md {
        @apply block;
      }
    }
  }

  &__label, &__desciption {
    @apply block;
  }
}
</style>