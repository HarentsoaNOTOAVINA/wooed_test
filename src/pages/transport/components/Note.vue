<template>
    <div class="Note__container">
        <BellSolid class="Note__icon" />
        <span class="Note__content">{{ text }}</span>
    </div>
</template>
<script lang="ts" setup>
import BellSolid from '@/components/Icon/BellSolid.vue';
const props = defineProps({
    text: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
$color-green : #67CD84;
.Note {
    &__container {
        @apply flex py-[12px] px-[14px] rounded mb-4;
        color: var(--color-green);
        background: rgba($color-green, 0.14);
    }
    &__icon {
        @apply w-16 mt-2 mr-2.5;
        @screen md {
            @apply w-10 h-5 mt-0 mr-2;
        }
    }
    &__content {
        @apply block font-medium text-[12px];
        @screen md {
            @apply text-[14px]
        }
    }
}
</style>