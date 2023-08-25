<template>
    <PropertyTaxSimulation v-if="isSimulation" />
    <template v-else>
        <PropertyTaxWallonia />
    </template>
</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import PropertyTaxBrussels from './Region/PropertyTaxBrussels.vue';
    import PropertyTaxFlanders from './Region/PropertyTaxFlanders.vue';
    import PropertyTaxWallonia from './Region/PropertyTaxWallonia.vue';
    import PropertyTaxSimulation from './Simulation/PropertyTaxSimulation.vue';

    const props = defineProps<{
        isSimulation: boolean;
    }>();
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
</style>
