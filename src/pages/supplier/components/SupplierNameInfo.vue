<template>
    <div class="ores__item-supplier">
        <span class="font-[600]">Mon fournisseur</span>
        <Button>{{ supplier }}</Button>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import { onMounted, PropType, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    // defineProps({
    //     supplier: {
    //         type: String as PropType<'ORES' | 'SIBELGA' | 'FLUVIUS'>,
    //         default: 'ORES',
    //     },
    // });

    const supplier = ref<string>('');
    onMounted(() => {
        getSupplierName();
    });

    function getSupplierName() {
        supplier.value = store.getters['SupplierModule/getSupplierName'];
        console.log(supplier.value, 'supplier.value');
    }
</script>

<style lang="scss" scoped>
    .ores {
        &__item-supplier {
            @apply flex justify-between items-center px-[14px] py-[12px] rounded-[4px] bg-gray;
            &:deep() {
                button {
                    @apply text-[10px] px-[14px] py-[4px];
                }
            }
        }
    }
</style>
