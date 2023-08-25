<template>
    <Modal
        :is-show-modal="show"
        @on-back="closeModal"
        :width="screenType >= 1024 ? '800' : '520'"
        :title="documentTitle"
    >
        <template #content>
            <div class="pdfModal__items">
                <!-- <vue-pdf-embed :source="pdfPath" /> -->
                <iframe
                    :src="pdfPath"
                    frameborder="0"
                    width="100%"
                    height="500px"
                ></iframe>
            </div>
        </template>
    </Modal>
</template>
<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import VuePdfEmbed from 'vue-pdf-embed';
    import Modal from '@/components/Display/Modal/Modal.vue';

    import { useStore } from 'vuex';

    const screenType = ref<number>(screen.width);

    const emit = defineEmits(['close-modal']);

    const store = useStore();

    const pdfRawCode = computed(
        () => store.getters['RentalModule/getRawDocumentCode']
    );

    const props = defineProps({
        pdfPath: {
            type: String,
            default:
                'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
        },
        show: {
            type: Boolean,
            default: false,
        },
        documentTitle: {
            type: String,
            default: 'Document',
        },
    });
    function closeModal() {
        emit('close-modal');
    }
</script>
<style lang="scss" scoped>
    .pdfModal {
        &__items {
            height: calc(100vh - 249px);
            iframe {
                @apply h-full;
            }
        }
    }
</style>
