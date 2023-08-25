<template>
    <Card class="card">
        <Paragraphe class="card__head">
            <slot name="head" />
        </Paragraphe>
        <hr class="__hr" />
        <div class="card__content">
            <slot name="content" />
        </div>
    </Card>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Card from '@/components/Display/Card/Card.vue';
</script>

<style lang="scss" scoped>
    .card {
        @apply bg-gray flex flex-col gap-[12px];
        @screen md {
            @apply gap-[18px];
        }
        &__head {
            @apply text-secondary font-[600];
        }
    }
    .__hr {
        @apply text-white w-full;
    }
</style>
