<template>
    <div class="document__container" @click="displayPdfModal">
        <PdfIcon class="document__icon" />
        <span class="document__title">{{ documentLabel }}</span>
    </div>
</template>
<script lang="ts" setup>
import PdfIcon from '@/components/Icon/AdobeReaderIcon.vue';
const emit = defineEmits(['click'])
const props = defineProps({
    documentLabel: {
        type: String,
        default: ''
    }
})

function displayPdfModal() {
    emit('click');
}
</script>
<style lang="scss" scoped>
.document {
    &__container {
        @apply flex duration-300 w-full py-3 px-5 rounded-lg border my-2;
        border-color: var(--color-stroke-gray);
        @screen md {
            &:hover {
                @apply cursor-pointer;
                color: var(--color-primary);
            }
        }
    }

    &__title {
        @apply truncate;
    }

    &__icon {
        @apply h-5 w-5 mr-4;
    }

}
</style>