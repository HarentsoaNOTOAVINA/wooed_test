<template>
    <div class="identityActors">
        <Title
            type="h3"
            label="Identifier les acteurs du projet"
            class="identityActors__title"
        />
        <hr class="__hr" />
        <ProjectActors />
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import ProjectActors from './components/ProjectActors.vue';
</script>

<style lang="scss" scoped>
    .identityActors {
        @apply flex flex-col gap-[24px];
        &__title {
            @media (max-width: 575px) {
                @apply hidden;
            }
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
