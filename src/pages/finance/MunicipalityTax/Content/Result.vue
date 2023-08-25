<template>
    <div class="tax-result">
        <div class="tax-result__details">
            <Title
                type="h3"
                class="tax-result__details__title"
                label="Taxes appliqués"
            />
            <ul class="tax-result__details__body">
                <li v-for="(item, index) in selectedTaxList" :key="index">
                    <span>{{ item.title }}</span>
                    <span
                        >{{
                            separatorHandleFloat(item.selectedValue.toFixed(2))
                        }}
                        €</span
                    >
                </li>
            </ul>
        </div>
        <div class="tax-result__total">
            <span>TOTAL</span>
            <span>{{ separatorHandleFloat(totalTax.toFixed(2)) }} €</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import { computed, onBeforeMount, onMounted, watch } from 'vue';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';

    const props = defineProps<{
        selectedTaxList: any[];
    }>();

    const emit = defineEmits<{
        (fn: 'on-total-tax-changed', v: number): void;
    }>();

    onMounted(() => {
        totalTax.value;
        console.log(props.selectedTaxList);
    });

    const totalTax = computed((): number =>
        props.selectedTaxList.reduce((cum, curr) => {
            return cum + curr.selectedValue;
        }, 0)
    );

    watch(
        () => totalTax.value,
        (v) => {
            v && emit('on-total-tax-changed', props.selectedTaxList as any);
        },
        { immediate: true, deep: true }
    );
</script>
<style lang="scss" scoped>
    .tax-result {
        @apply text-[var(--color-gray-icon)];
        &__details,
        &__total {
            @apply bg-gray rounded-[8px] font-semibold;
        }
        &__details {
            &__title {
                @apply uppercase font-semibold text-[18px] text-center py-[20px] border-b border-b-[#FFF] text-[var(--color-primary)];
            }
            &__body {
                @apply p-[20px];
                li {
                    @apply flex items-center justify-between pb-[5px] mb-[10px] border-b border-b-[var(--color-primary)];
                }
                li:last-child {
                    @apply border-none mb-0;
                }
            }
        }
        &__total {
            @apply p-[20px] mt-[10px] flex items-center justify-between text-[var(--color-primary)];
        }
    }
</style>
