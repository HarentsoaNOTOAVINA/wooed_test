<template>
    <div class="electric-container">
        <ElectricConnection :operation-type="opType" />
    </div>
</template>
<script lang="ts" setup>
    import ElectricConnection from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/ElectricConnection.vue';
    import { computed } from 'vue';
    const props = defineProps<{
        operationType: string
    }>();
    const opType = computed(() => `${props.operationType}-peb`);
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .electric-container {
        @apply flex flex-col gap-[18px];
        @apply overflow-x-auto;
        @include scrollbar;
    }
</style>
