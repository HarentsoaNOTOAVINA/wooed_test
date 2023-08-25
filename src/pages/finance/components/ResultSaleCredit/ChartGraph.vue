<template>
    <Pie
        :options="chartOpt"
        :data="(chartData as any)"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="(plugins as any)"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
        v-if="forceRendering"
    />
    <div v-else class="h-[600px]"></div>
</template>
<script lang="ts" setup>
    import { Pie } from 'vue-chartjs';
    import {
        Chart as ChartJs,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        CategoryScale,
    } from 'chart.js';
    import { PropType, ref, watch } from 'vue';
    ChartJs.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
    const forceRendering = ref<boolean>(false);
    const chartOpt = ref<any>({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
        },
    });
    const props = defineProps({
        chartData: {
            type: Object,
        },
        saleResult: {
            type: Object as PropType<TypesSaleResult>,
        },
        chartId: {
            type: String,
            default: 'bar-chart',
        },
        datasetIdKey: {
            type: String,
            default: 'label',
        },
        width: {
            type: Number,
            default: 600,
        },
        height: {
            type: Number,
            default: 600,
        },
        cssClasses: {
            default: '',
            type: String,
        },
        styles: {
            type: Object,
            default: () => {},
        },
        plugins: {
            type: Object,
            default: () => {},
        },
    });

    watch(
        () => props.chartData,
        (v) => {
            forceRendering.value = false
            setTimeout(() => {
                forceRendering.value = true
            })
        },
        { immediate: true, deep: true }
    );
</script>
<style lang="scss" scoped></style>
