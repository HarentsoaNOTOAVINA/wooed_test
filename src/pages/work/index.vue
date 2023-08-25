<template>
    <div class="container work__menu">
        <div class="work__title-menu">
            <Title class="title" type="p" label="Listes des travaux" />
            <hr class="separator" />
            <div
                class="work__menu-content"
                v-for="(menuWork, index) in dataMenuWork"
                :key="index"
                @click="gotoWorkType(menuWork.nameRoute)"
            >
                <div class="work__icon-label">
                    <component :is="menuWork.icon" />
                    <p>{{ menuWork.label }}</p>
                </div>
                <div class="work__icon-next">
                    <ArrowNext />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import ArrowNext from '@/components/Icon/ArrowNext.vue';
    import { dataMenuWork } from './data/dataMenuWork';
    import router from '@/routes';
    import { onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store = useStore();
    const route = useRoute();

    function gotoWorkType(nameRoute: string) {
        router.push({ name: nameRoute });
    }
</script>

<style scoped lang="scss">
    .work {
        &__menu {
            @apply mt-[10px] bg-[#fff] rounded-[8px] h-screen;
        }
        &__menu-content {
            @apply flex items-center justify-between  mb-[15px];
            border: 1px solid var(--color-gray);

            @screen md {
                @apply cursor-pointer;
                &:hover {
                    @apply bg-[var(--color-gray)];
                }
            }
        }
        &__icon-label {
            @apply flex items-center justify-start gap-[15px] py-[18px] px-[20px];
        }
        &__icon-next {
            @apply mr-[20px] hidden;

            @screen sm {
                @apply block;
            }
        }
    }

    .title {
        @apply pt-[10px];
    }
</style>
