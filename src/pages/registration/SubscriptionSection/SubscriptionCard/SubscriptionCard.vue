<template>
    <transition name="fade-step" mode="in-out">
        <Loader v-if="loadCards" />
        <div v-else class="subscription">
            <div class="subscription__header">
                <div @click="goBack" class="subscription__header__back">
                    <ArrowBack color="light" /><span> Retour</span>
                </div>
                <div class="subscription__header__content">
                    <Title
                        type="h2"
                        label="Choisir l'abonnement"
                        weight="600"
                    />
                </div>
            </div>
            <div class="subscription__core">
                <CardItem
                    v-for="(card, index) in cardList"
                    :key="index"
                    @on-choose-card="hanldeChooseCard"
                    :subscription-cards="card"
                    :servicesAccess="cardAccessServices"
                    :servicesFree="cardFreeServices"
                    :servicesCustom="cardCustomServies"
                    :card-list="cardList"
                    @on-more-click="moreClickValue"
                    :more-value="moreValue"
                    :choosen="card.id === choosenPlanId"
                />
                <!-- <CardItem                    
                    @on-choose-card="hanldeChooseCard"
                    :subscription-cards="cardFree[0]"
                /> -->
            </div>
        </div>
    </transition>
</template>
<script lang="ts" setup>
    import { onMounted, reactive, ref, onBeforeMount, watch } from 'vue';
    import { Router, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import Paragraphe from '../../../../components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardItem from './CardItem/CardItem.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import Loader from '../../../../components/Common/Loader/Loader.vue';

    const router: Router = useRouter();
    const store: Store<any> = useStore();
    let cardList = reactive<Array<ISubscriptionCards>>([]);
    const loadCards = ref<boolean>(false);
    const choosenPlanId = ref();
    // let cardFree = ref<any>();
    let cardAccessServices = ref<any>({});
    let cardFreeServices = ref<any>();
    let cardCustomServies = ref<any>();
    let registerUserStore = ref<any>();
    let cardSyndicServices = ref<any>();
    onBeforeMount(() => {
        initCard();
        // checkRoleType();
        getCustomSubscriptionList();
        getAccessSubscriptionList();
    });

    const emit = defineEmits<{
        (e: 'on-choose-card', v: ISubscriptionCards | undefined): void;
        (e: 'on-get-next-card', v: ISubscriptionCards | null): void;
    }>();

    async function checkRoleType() {
        console.log(
            'all cards:',
            store.getters['SubscriptionModule/getSubscriptionCard'].data
        );

        if (registerUserStore.value.typeRole.includes('syndic')) {
            cardSyndicServices.value = store.getters[
                'SubscriptionModule/getSubscriptionCard'
            ].data.filter((item: any) => item.forSyndic === true);
            cardList = cardSyndicServices.value;
        }
    }

    async function getCustomSubscriptionList() {
        try {
            cardCustomServies.value = await store.dispatch(
                'SubscriptionModule/setCustomSubscription'
            );
            console.log('custom:', cardCustomServies.value);
        } catch (error) {}
    }

    async function getAccessSubscriptionList() {
        try {
            let res = await store.dispatch(
                'SubscriptionModule/setAccessSubscription'
            );

            cardAccessServices.value = res.data.map(({ id, name }: any) => ({
                value: id,
                label: name,
            }));

            console.log('access sub', cardAccessServices.value);
        } catch (error) {}
    }

    async function getSubscriptionCard(usertype: string) {
        loadCards.value = true;
        try {
            // loadCards.value = true;
            await store.dispatch(
                'SubscriptionModule/setSubscriptionCards',
                usertype
            );
            cardList = Object.assign(
                cardList,
                store.getters['SubscriptionModule/getSubscriptionCard'].data
            )
                .sort((a: ISubscriptionCards, b: ISubscriptionCards) =>
                    a.price > b.price ? 1 : -1
                )
                .filter((item: any) => item.forSyndic === false);
            console.log('all packs except syndic:', cardList);
            let wfree = cardList.filter((item: any) => item.name === 'W-Free');
            cardFreeServices.value = wfree[0].services;

            // cardAccessServices.value = wfree

            let customCard: ISubscriptionCards = {
                id: wfree[0].id,
                name: 'W-Custom',
                price: 0,
                description: 'pack custom',
                services: [],
            };
            cardList.push(customCard);
            checkRoleType(); //if role includes syndic only show syndic packs
            console.log('card list farany:', cardList);

            // cardFree.value = cardList.filter((el: any) => el.name === 'W-Free');
            // console.log('free data:', cardFree.value);
        } catch (error) {
            console.log(error);
        } finally {
            loadCards.value = false;
        }
    }
    async function initCard() {
        registerUserStore.value = store.getters['UserModule/getRegisteredUser'];
        const usertype: string =
            registerUserStore.value.type === 'professional' ? 'pro' : 'part';
        getSubscriptionCard(usertype);
        console.log(usertype);
    }

    function goBack() {
        store.dispatch('UserModule/setIsFromSubscription', true);
        router.go(-1);
    }

    function hanldeChooseCard(params: ISubscriptionCards | undefined) {
        // console.log('lllllllllllllllllllll:', params);
        choosenPlanId.value = params?.id;

        emit('on-choose-card', params);
        getNextCard(params as ISubscriptionCards);
    }

    function getNextCard(params: ISubscriptionCards) {
        const cardListLen: number = cardList.length;
        let nextCard: ISubscriptionCards | null = null;
        const indexofCurrentCard: number = cardList.indexOf(params);
        const isLastCard: boolean = indexofCurrentCard === cardListLen - 1;

        if (!isLastCard) {
            const indexofNextCard: number = indexofCurrentCard + 1;
            nextCard = cardList[indexofNextCard];
        }

        emit('on-get-next-card', nextCard);
    }

    const moreValue = ref<boolean>(false);
    watch(
        () => moreValue.value,
        (value) => {
            moreValue.value = value;
        },
        { immediate: true }
    );

    function moreClickValue(item: any) {
        // cardList.forEach((card, index) => {
        //     if (card.id === item) {
        setTimeout(() => {
            moreValue.value = false;
            console.log('rereeeeeeeeeeeeeeeeeeee');
        }, 500);
        //     }
        //     else {
        //     }
        //     // console.log('card id', card.id);
        //     // console.log('item', item);
        // });
    }
</script>
<style lang="scss" scoped>
    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.3s ease-in-out;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        // transform: scale(0);
    }
    // this styles if for test pupose
    .subscription {
        // position: relative;
        padding: 18px;
        &__header {
            * {
                color: #fff;
            }
            background-color: var(--color-primary);
            border-radius: 8px;
            min-height: 268px;
            padding: 25px 38px;
            &__content {
                @apply flex justify-center flex-col items-center;
                * {
                    text-align: center;
                }
            }
            &__back {
                @apply flex items-center gap-[10px];
                &:hover {
                    cursor: pointer;
                }
            }
        }
        &__core {
            // position: absolute;
            top: 66%;
            height: 100%;
            width: 100%;
            padding: 0 calc(72px - 18px);
            padding-bottom: 30px;
            @media screen and (max-width: 430px) {
                padding: 0 calc(10px - 18px);
            }
            right: 0;
            @apply flex justify-center flex-row flex-wrap gap-[50px];
            margin-top: -77px;
        }
    }
</style>
