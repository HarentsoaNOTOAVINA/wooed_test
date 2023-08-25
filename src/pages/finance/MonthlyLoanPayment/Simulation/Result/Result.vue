<template>
    <div class="simulation-result">
        <Title type="h3" class="simulation-result__title" label="RESULTAT DE LA SIMULATION" />
        <hr />
        <div v-if="simulationResult.length" class="simulation-result__card-list">
            <Card @on-chosen-bank="($event) => {$emit('on-chosen-bank', $event)}" v-for="(item, index) in simulationResult" :key="index" :item-result="item"/>
        </div>
        <a-empty v-else description="Pas de results correspondants" />
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Card from './Card/Card.vue';
    import {Empty as AEmpty} from 'ant-design-vue'
    
    defineProps<{
        havePartener?: boolean;
        simulationResult: TypeSimulationResult[];
    }>()
</script>
<style lang="scss" scoped>
    .simulation-result {
        &__title {
            @apply text-[var(--color-primary)];
        }
        &__card-list {
            @apply lg:grid xl:grid-cols-3 lg:grid-cols-2 gap-[20px] my-[30px] flex flex-col items-center;
        }
    }
</style>
