<template>
    <div class="establishAgreement">
        <Title
            type="h3"
            label="Etablir une convention d’occupation"
            class="establishAgreement__title"
        />
        <hr class="__hr" />
        <div class="establishAgreement__pdf">
            <PdfViewer  />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import pdfViewer from '@/components/Display/pdfViewer/pdfViewerContainer.vue';
</script>

<style lang="scss" scoped>
    .establishAgreement {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
