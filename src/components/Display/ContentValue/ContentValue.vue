<template>
    <div class="contentValue">
        <div class="label">
            <span> {{ label }} </span>
        </div>
        <div class="value">
            <span v-if="value"> {{ value }} </span>
            <span v-if="unity" class="unity">{{ unity }}</span>
            <template v-else>
                <slot />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        label: {
            type: String,
            default: 'teste',
        },
        value: {
            type: String || Number,
            default: '',
        },
        unity: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .contentValue {
        @apply flex flex-col gap-[10px];
        @screen sm {
            @apply w-[50%];
        }
        @screen md {
            @apply w-full;
        }
        @screen lg {
            @apply w-[50%];
        }
        .label {
            @apply font-[600] text-secondary;
        }
        .value {
            @apply flex justify-between items-center min-h-[38px] font-[600] bg-gray text-grayIcon px-[11px] py-[4px] rounded-[4px];
        }
    }
</style>
