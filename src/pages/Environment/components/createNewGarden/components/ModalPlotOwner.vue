<template>
    <div class="modalPlotOwner">
        <Input
            placeholder="À : propriétaire.be"
            class="modalPlotOwner__custom-input"
        />
        <TextArea
            label="Message"
            :autoSize="rows"
            placeholder="Ajouter votre message..."
            nameInput="message"
        />
        <div class="modalPlotOwner__button">
            <Button class="modalPlotOwner__button-cancel"> Annuler </Button>
            <Button> Envoyer </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';

    const rows = { minRows: 6, maxRows: 10 };
</script>

<style lang="scss" scoped>
    .modalPlotOwner {
        @apply flex flex-col gap-[18px];
        &__custom-input {
            @apply mb-0;
            &:deep() {
                .custom-input__label-icon {
                    @apply hidden;
                }
            }
        }
        &__button {
            @apply flex justify-end items-center gap-[14px];
            &-cancel {
                &:deep() {
                    button {
                        @apply text-primary bg-gray;
                    }
                }
            }
        }
    }
</style>
