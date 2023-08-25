<template>
    <div class="care-container">
        <Steps
            :data="dataStep"
            stepPosition="horizontal"
            :disable="disabled"
            @next="next"
            @prev="prev"
        />
    </div>
</template>
<script lang="ts" setup>
    import SimulationBase from '../SimulationBase/SimulationBase.vue';
    import Steps from '@/components/Display/Steps/index.vue';
    import SimulationPersonalize from '../SimulationPersonalize/SimulationPersonalize.vue';
    import Comparaison from '../Comparaison/Comparaison.vue';
    import { ref, watch } from 'vue';
    import store from '@/store';

    const dataStep: typeDataSteps[] = [
        {
            label: 'Simulation de base',
            content: SimulationBase,
        },
        {
            label: 'Simulation personnalisée',
            content: SimulationPersonalize,
        },
        {
            label: 'Comparaison',
            content: Comparaison,
        },
    ];

    const disabled = ref<boolean>(false);
    // interface

    interface typeDataSteps {
        label: string;
        content?: object;
    }

    // fn
    watch(
        () => store.getters['AssuranceModule/getDataAssurance'],
        (v) => {
            disabled.value = !disabled.value;
        },
        { immediate: true }
    );

    const next = async (nextPage: string) => {
        console.log('next step');
    };
    const prev = (prevPage: string) => {
        console.log('previous step');
    };
</script>
<style lang="scss" scoped>
    .care-container {
        &:deep() {
            .step-content {
                width: 100%;
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>
