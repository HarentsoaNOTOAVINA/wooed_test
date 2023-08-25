<template>
    <div class="container">
        <SubscriptionCard
            v-if="step === 0"
            @on-choose-card="handleChooseCard"
            @on-get-next-card="handleNextCard"
        />
        <SubscriptionForm
            :subscriptionCards="subscriptionCards"
            :nextCard="nextCard"
            v-if="step === 1"
            @goback="
                () => {
                    step = 0;
                }
            "
        />
    </div>
</template>
<script lang="ts" setup>
    import { ref, onBeforeMount } from 'vue';
    import SubscriptionCard from './SubscriptionCard/SubscriptionCard.vue';
    import SubscriptionForm from './SubscriptionForm/SubscriptionForm.vue';
    import {
        Router,
        useRouter,
        useRoute,
        RouteLocationNormalizedLoaded,
    } from 'vue-router';

    const router: Router = useRouter();
    const route: RouteLocationNormalizedLoaded = useRoute();

    const step = ref<number>(0);
    const subscriptionCards = ref<ISubscriptionCards | {}>({});
    const nextCard = ref<ISubscriptionCards | null>(null);

    onBeforeMount(() => {
        // console.log(route.query);
        // !!!route.query.active && router.push('/inscription');
    });
    function handleChooseCard(card: ISubscriptionCards | undefined) {
        step.value = 1;
        subscriptionCards.value = { ...card };
    }

    function handleNextCard(card: ISubscriptionCards | null) {
        nextCard.value = card;
    }
</script>
<style lang=""></style>
