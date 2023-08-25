<template>
    <div class="logBook__regulation">
        <div class="logBook__regulation-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Carnet de bord</Paragraphe>
        </div>
        <hr class="separator" />

        <div class="logBook__file-content" v-if="!loadign">
            <PdfViewerContainer
                :pdf-url="dataFileBook"
                button-label="Enregister Carnet de bord"
                @save="handleSavePdf"
            />
        </div>
        <div class="loading"><Loader v-if="loadign" /></div>
    </div>
</template>

<script setup lang="ts">
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import PdfViewerContainer from '@/components/Display/pdfViewer/pdfViewerContainer.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();

    let loadign = ref<boolean>(false);
    let dataToGetPdfEditor = ref<object>({
        type: 'work',
        file: 'tpl_20140901_carnet_bord_chauffage_type_1_fr-edited.pdf',
    });

    let dataFileBook = ref<string>();

    onMounted(async () => {
        // console.log(window.location.origin, 'BASE URL');
        await getPdfEditable();
    });

    async function getPdfEditable() {
        try {
            loadign.value = true;
            let { data } = await store.dispatch(
                'WorksModule/getEditablePdf',
                dataToGetPdfEditor.value
            );
            dataFileBook.value = `${window.location.origin + data}`;
            console.log(dataFileBook.value, 'Resultat pdf');
        } catch (error) {
            console.error('Error get Cost Boiler : ', error);
        } finally {
            loadign.value = false;
        }
    }

    function handleSavePdf() {
        console.log('Save pdf');
    }
</script>

<style scoped lang="scss">
    .logBook {
        &__regulation {
            @apply relative bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__regulation-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .loading {
        @apply absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .separator {
        @apply my-[15px];
    }
</style>
