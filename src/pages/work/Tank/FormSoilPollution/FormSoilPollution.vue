<template>
    <div class="work">
        <pdfViewerContainer
            :pdfUrl="pdf"
            buttonLabel="dddd"
            @save="handleSave"
        />
    </div>
</template>

<script setup lang="ts">
    import { computed, onBeforeMount, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import pdfViewerContainer from '@/components/Display/pdfViewer/pdfViewerContainer.vue';
    const store: Store<any> = useStore();
    const pdf = ref<string>();
    onBeforeMount(() => {
        getPollutionPdf();
    });

    const getPollutionPdf = async () => {
        await store.dispatch('WorksModule/setPollutionPdf');
        const res = computed(
            () => store.getters['WorksModule/getPollutionPdf']
        );
        let data = res.value;
        pdf.value = `${window.location.origin}`+ data.data; 
        // pdf.value = data.data.replace('back-immov2.dev73', 'localhost:3002');
        console.log('pdf value:', pdf.value);
        console.log('pdf value:', data.data);
    };

    const handleSave = () => {};
</script>

<style lang="scss" scoped></style>
