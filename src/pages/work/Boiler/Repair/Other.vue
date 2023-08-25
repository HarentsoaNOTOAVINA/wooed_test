<template>
    <div class="boilerRepairEmergency__regulation">
        <div class="boilerRepairEmergency__regulation-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Autres</Paragraphe>
        </div>
        <hr class="separator" />
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
</script>

<style scoped lang="scss">
    .boilerRepairEmergency {
        &__regulation {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__regulation-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .separator {
        @apply my-[15px];
    }
</style>
