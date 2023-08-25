<template>
    <div class="annual-income">
        <FinanceCard label-title="Revenus annuels">
            <transition name="fade-slider" mode="out-in">
                <div class="annual-income__content" v-if="step === ''">
                    <div
                        @click="step = 'occupy'"
                        class="annual-income__content__choice"
                    >
                        <Paragraphe
                            >J’occupe le bien à titre de résidence
                            principale</Paragraphe
                        >
                    </div>
                    <div
                        @click="step = 'occupy'"
                        class="annual-income__content__choice"
                    >
                        <Paragraphe
                            >J’occupe le bien à titre de résidence
                            secondaire</Paragraphe
                        >
                    </div>
                    <div
                        @click="step = 'rent'"
                        class="annual-income__content__choice"
                    >
                        <Paragraphe>Je loue le bien</Paragraphe>
                    </div>
                </div>
                <div v-else class="annual-income__content">
                    <ArrowBack
                        class="hover:cursor-pointer my-[10px]"
                        @click="step = ''"
                    />
                    <component :is="displayedComp" />
                </div>
            </transition>
        </FinanceCard>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ref, shallowRef, watch } from 'vue';
    import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
    import OccupyProperty from './Components/OccupyProperty.vue';
    import RentProperty from './Components/RentProperty.vue';

    const step = ref<string>('');
    const displayedComp = shallowRef<null | any>(null);

    watch(
        () => step.value,
        (v) => {
            switch (v) {
                case 'occupy':
                    displayedComp.value = OccupyProperty as any;
                    break;
                case 'rent':
                    displayedComp.value = RentProperty as any;
                    break;
            }
        }
    );
</script>
<style lang="scss" scoped>
    .annual-income {
        .fade-slider-enter-active,
        .fade-slider-leave-active {
            @apply transition-all;
        }
        .fade-slider-enter-from,
        .fade-slider-leave-to {
            @apply translate-x-[-100px] opacity-0;
        }
        @apply w-full;
        &__content {
            @apply h-[inherit];
            &__choice {
                @apply p-[30px] border border-primary rounded-[8px] mb-[20px] text-center hover:cursor-pointer;
            }
        }
    }
</style>
