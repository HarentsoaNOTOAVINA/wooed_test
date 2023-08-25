<template>
    <div class="filePreview" @click="showModal" :title="fileName">
        <div class="filePreview__file">
            <Icon icon-name="AdobeReaderIcon" />
            <span> {{ fileName }} </span>
        </div>
        <PdfModal :show="show" :pdf-path="filePath" @close-modal="closePdf" />
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import PdfModal from '@/components/Display/PdfModal/PdfModal.vue';
    import { ref } from 'vue';

    const props = defineProps({
        fileName: {
            type: String,
            default: 'fichier.pdf',
        },
        filePath: {
            type: String,
            default: '',
        },
    });

    const show = ref<boolean>(false);

    function showModal() {
        show.value = true;
    }

    function closePdf() {
        show.value = false;
    }
</script>

<style lang="scss" scoped>
    .filePreview {
        @apply cursor-pointer w-[102px] h-[102px] rounded-[10px] p-[8px] border-gray border flex justify-center items-center overflow-x-hidden transition-all;
        &__file {
            @apply flex flex-col gap-[10px] text-center w-full;
            &:deep() {
                .icon {
                    svg {
                        @apply w-[40px] h-[40px];
                    }
                }
            }
            span {
                @apply truncate block;
            }
        }
        &:hover {
            @apply border-strokeGray bg-gray transition-all scale-[1.1];
        }
    }
</style>
