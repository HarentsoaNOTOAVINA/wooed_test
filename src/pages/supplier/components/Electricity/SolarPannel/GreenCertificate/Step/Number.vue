<template>
    <div class="number">
        <Input
            class="w-full"
            label="Nombre effectif"
            input-type="number"
            placeholder="Entrez un nombre"
            name-input="number"
            @input="
                ($event) => {
                    $emit('on-input', $event);
                }
            "
        />
        <div class="number-expected">
            <span>Revenus générés</span>
            <strong>{{generalIncome}}</strong>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    defineProps<{
        generalIncome: string | number
    }>();
</script>
<style lang="scss" scoped>
    .number {
        @apply flex gap-[10px] flex-wrap w-full;
        &-expected {
            @apply w-full flex items-center justify-between p-[10px] rounded-[8px] bg-strokeGray mb-[10px];
        }
    }
</style>
