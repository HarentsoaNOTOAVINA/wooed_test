<template>
    <div class="not-connected">
        <SupplierNameInfo class="mb-[10px]" />
        <template v-if="supplier === 'FLUVIUS'">
            <FluviusStep />
            <FluviusTable />
        </template>
        <template v-if="supplier === 'ORES'">
            <OresTable />
        </template>
        <template v-if="supplier === 'SIBELGA'"> <SibelgaTable /> </template>

        <div class="not-connected__operation">
            <Button
                @click="redirectHandler"
                class="not-connected__operation__btn"
                >Demander le raccordement</Button
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import FluviusStep from './Fluvius/FluviusStep.vue';
    import FluviusTable from './Fluvius/Table.vue';
    import OresTable from './Ores/Table.vue';
    import SibelgaTable from './Sibelga/Table.vue';
    import { link as redirectionLink } from './connection-request.data';
    import SupplierNameInfo from '../../../SupplierNameInfo.vue';

    const props = defineProps<{
        supplier: string;
    }>();

    function redirectHandler() {
        window.open((redirectionLink as any)[props.supplier], '_blank');
    }
</script>
<style lang="scss" scoped>
    .not-connected {
        @apply mb-[20px] overflow-auto;
        &__operation {
            @apply flex justify-end mt-[20px];
            &__btn {
                @apply w-full md:w-auto;
                &:deep() {
                    button {
                        @apply w-full;
                    }
                }
            }
        }
    }
</style>
