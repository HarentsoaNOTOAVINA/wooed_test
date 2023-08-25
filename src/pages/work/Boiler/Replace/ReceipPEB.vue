<template>
    <div class="boilerExpert__documents">
        <div class="boilerExpert__documents-nav">
            <ArrowBack @click="$emit('prev')" />
            <Paragraphe>Réception PEB de l’installation</Paragraphe>
        </div>
        <hr class="separator" />
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
</script>

<style scoped lang="scss">
    .boilerExpert {
        &__documents {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__documents-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
    }

    .separator {
        @apply my-[15px];
    }
</style>
