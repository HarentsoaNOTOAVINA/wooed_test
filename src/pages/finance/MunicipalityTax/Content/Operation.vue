<template>
    <div class="tax-operation">
        <OperationCard
            :tax-item="item"
            v-for="(item, index) in validTax"
            :key="index"
            @on-choose-tax="
                ($event) => {
                    $emit('on-choose-tax', $event);
                }
            "
        />
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import OperationCard from './Card/OperationCard.vue';

    interface TypeMunTaxDetails {
        id: number;
        title: string;
        type: string;
        triggerEvent: string;
        link: string;
        taxValues: [
            {
                id: number;
                title: string;
                value: number;
                unit: string;
            }
        ];
    }
    const validTax = ref<TypeMunTaxDetails[]>([]);
    const props = defineProps<{
        tax: TypesTaxes;
    }>();

    onMounted(() => {
        adaptTax();
    });

    function adaptTax() {
        validTax.value = props.tax.municipalTaxDetails.filter(
            (item) => item.taxValues.length
        );
    }

    function taxHandler(value: any) {
        console.log(value, 'EMITTED');
    }
</script>
<style lang="scss" scoped>
    .tax-operation {
        @apply lg:grid xl:grid-cols-3 lg:grid-cols-2 gap-[20px] mt-[20px] mb-[30px] flex flex-col items-center;
    }
</style>
