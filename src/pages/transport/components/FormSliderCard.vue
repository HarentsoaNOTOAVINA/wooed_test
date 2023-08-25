<template>
    <div class="all-objects-main-page__container">
        <slot />
        <div class="all-objects-main-page__footer-buttons">
            <button class="button__previous" @click="setNewDisplay('previous')">
                Précedent
            </button>
            <button type-button="primary" class="button__next" @click="setNewDisplay('next')">
                Suivant
            </button>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
// TODO: Add modal that will notify user if they leave the page by mistake and block the route change without user confirmation

const emit = defineEmits(['set-active-component']);

function setNewDisplay(value: string) {
    emit('set-active-component', value)
}
</script>
<style lang="scss" scoped>
.all-objects-main-page {
    &__container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__footer-buttons {
        @apply flex justify-end gap-x-4;

        .button__previous,
        .button__next {
            @apply w-1/2 font-semibold rounded-full my-2 py-1;

            @screen md {
                @apply w-1/5;
            }
        }

        .button {
            &__previous {
                @apply border;
                color: var(--color-primary);
                background-color: #fff;
                border-color: var(--color-primary);
            }

            &__next {
                color: #fff;
                background-color: var(--color-primary);
            }
        }
    }
}
</style>