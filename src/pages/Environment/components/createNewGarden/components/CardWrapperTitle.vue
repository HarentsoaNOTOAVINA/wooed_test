<template>
    <CardWrapper class="cardWrapper">
        <Title type="h3" :label="title" class="cardWrapper__title" />
        <hr class="__hr" />
        <div class="cardWrapper__items">
            <slot />
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .cardWrapper {
        @apply flex flex-col gap-[18px];
        @screen md {
            @apply p-[18px];
        }
        &__title {
            @apply text-[14px] text-secondary font-[600];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
