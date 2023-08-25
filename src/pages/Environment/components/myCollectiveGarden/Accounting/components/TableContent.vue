<template>
    <div class="tableContent">
        <div
            v-for="(item, index) in data"
            class="tableContent__items"
            :key="index"
        >
            <span>{{ item.label }}</span>
            <span class="count">{{ item.count }}</span>
        </div>
        <hr v-if="total" class="__hr" />
        <div v-if="total" class="tableContent__items">
            <span>{{ totalLabel }}</span>
            <span class="count">{{ totalCount }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps({
        dataTableContent: {
            type: Array,
            default: [],
        },
        total: {
            type: Boolean,
            default: true,
        },
        totalLabel: {
            type: String,
            default: 'Total',
        },
        totalCount: {
            type: String,
            default: (0).toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'}),
        }
    });

    const data = ref<Array<any>>(props.dataTableContent);
</script>

<style lang="scss" scoped>
    .tableContent {
        @apply flex flex-col gap-[14px] bg-gray p-[10px] rounded-[4px];
        @screen lg {
            @apply px-[18px] py-[14px] rounded-[8px];
        }
        &__items {
            @apply flex justify-between gap-[14px] font-[600];
            .count {
                @apply text-secondary whitespace-nowrap;
            }
        }
    }
    .__hr {
        @apply text-white w-full;
    }
</style>
