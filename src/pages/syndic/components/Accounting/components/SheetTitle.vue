<template>
    <div class="document__container" @click="setDisplayDetails">
        <span class="document__title">{{ documentLabel }}</span>
    </div>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
const emit = defineEmits(['set-display-details'])
const props = defineProps({
    documentLabel: {
        type: String,
        default: ''
    }
})

function setDisplayDetails() {
    emit('set-display-details');
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";
.document {
    &__container {
        @apply flex duration-300 w-full py-3 px-5 rounded-lg border my-2;
        @include hoverButtonDark;
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

}
</style>