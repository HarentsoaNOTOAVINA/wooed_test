<template>
    <div>
        <div class="steps-container">
            <!-- <div
                class="step"
                v-for="(step, index) in steps"
                :key="index"
                :class="{ active: index === currentStepIndex }"
                @click="handleClick(index)"

            >
                {{ step.title }}
            </div> -->
        </div>
        <router-view
            v-if="currentStepComponent"
            :component="currentStepComponent"
        />
        <div class="button-container">
            <button v-if="currentStepIndex > 0" @click="prevStep">
                Précédent
            </button>
            <button
                v-if="currentStepIndex < steps.length - 1"
                @click="nextStep"
            >
                Suivant
            </button>
            <button v-if="currentStepIndex === steps.length - 1">
                Terminer
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Steps as ASteps, Button as AButton } from 'ant-design-vue';
    import { computed, ref, watch } from 'vue';
    import {
        RouterView,
        useRoute,
        useRouter,
    } from 'vue-router';

    interface Step {
        title: string;
        name: string;
        component: () => Promise<any>;
    }

    const { Step: AStep } = ASteps;
    const steps: Step[] = [
        {
            title: 'Étape 1',
            component: () => import('@/pages/routesChild/child1.vue'),
            name: 'child1',
        },
        {
            title: 'Étape 2',
            component: () => import('@/pages/routesChild/child2.vue'),
            name: 'child2',
        },
        {
            title: 'Étape 3',
            component: () => import('@/pages/routesChild/child3.vue'),
            name: 'child3',
        },
        {
            title: 'Étape 4',
            component: () => import('@/pages/routesChild/child4.vue'),
            name: 'child4',
        },
    ];

    const currentStepIndex = ref<number>(0);

    const router = useRouter();
    const route = useRoute();

    watch(
        () => route.name,
        (name) => {
            const index = steps.findIndex((step) => step.name === name);
            currentStepIndex.value = index !== -1 ? index : 0;
        },
        { immediate: true }
    );

    const currentStepComponent = computed(() => {
        const component = steps[currentStepIndex.value].component;
        return component ? component() : null;
    });

    function handleClick(value: number) {
        currentStepIndex.value = value
        router.push({ name: steps[currentStepIndex.value].name });
    }

    function prevStep() {
        currentStepIndex.value--;
        router.push({ name: steps[currentStepIndex.value].name });
    }

    function nextStep() {
        currentStepIndex.value++;
        router.push({ name: steps[currentStepIndex.value].name });
    }
</script>
<style lang="scss" scoped >
    .active {
        @apply text-primary;
    }
</style>
