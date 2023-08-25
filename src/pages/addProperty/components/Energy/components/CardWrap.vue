<template>
    <div class="card">
        <div class="card__title-container">
            <Title type="h3" class="card__title">{{ title }}</Title>
        </div>
        <slot />
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';

    defineProps({
        title: {
            type: String,
            default: '',
        },
    });

</script>

<style lang="scss" scoped>
    .card {
        @apply flex flex-col gap-[14px] border border-slate-200 rounded-[8px] p-[10px] mb-[20px];

        &__title {
            @apply font-semibold text-slate-400 text-[16px];
        }

        &__title-container {
            @apply flex justify-center items-center pb-[10px] border-b border-slate-200;
        }
    }
</style>
