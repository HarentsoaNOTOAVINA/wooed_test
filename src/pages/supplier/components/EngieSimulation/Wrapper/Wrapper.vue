<template>
    <div class="wrapper-card">
        <div class="wrapper-card__header">
            <Paragraphe
                class="wrapper-card__header__title text-center md:text-left"
            >
                {{ title }}
            </Paragraphe>
            <Button type-button="border" @click="$emit('on-back')">
                <ArrowBack />Retour</Button
            >
        </div>
        <div class="wrapper-card__body">
            <slot />
        </div>
        <div v-if="hasRefresh" @click="$emit(`on-refresh`)" class="wrapper-card__refresh">
            <Refresh />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Refresh from '@/components/Icon/Refresh.vue';

    const props = defineProps<{
        title: string;
        hasRefresh?: boolean;
    }>();
</script>
<style lang="scss" scoped>
    .wrapper-card {
        @apply bg-white rounded-[20px] w-full relative;
        &__header {
            @apply p-[20px] bg-[#fafafa] flex justify-between items-center flex-col md:flex-row gap-[20px];
            border-radius: 20px 20px 0 0;
            &:deep() {
                button {
                    @apply flex items-center;
                }
            }
            &__title {
                @apply text-secondary text-[22px];
            }
        }
        &__body {
            @apply md:p-[30px] p-[10px] min-h-[604px] md:min-h-[784px] flex justify-center items-center;
            &:deep() {
                button {
                    @apply text-[18px] uppercase w-full;
                }
            }
        }
        &__refresh {
            @apply absolute bottom-[20px] opacity-50 right-[20px] rounded-[50%] h-[50px] w-[50px] flex justify-center items-center
            shadow-[var(--color-stroke-gray)] shadow-md transition-all;
            &:hover {
                @apply cursor-pointer scale-[1.1] opacity-100;
            }
            &:deep() {
                svg {
                    @apply h-[50px] w-[50px];
                    path {
                        @apply fill-[var(--color-primary)];
                    }
                }
            }
        }
    }
</style>
