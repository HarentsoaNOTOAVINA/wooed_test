<template>
    <div class="subscription-card md:container">
        <div class="subscription-card__title">
            <p class="flex items-center flex-row gap-[10px]">
                <span @click="$emit('goback')" class="go-back"
                    ><ArrowBack
                /></span>
                <Title type="h3" label="Abonnement" weight="600" />
            </p>
            <MenuIndicator />
        </div>
        <div class="subscription-card__content">
            <CardWrapper class="flex flex-col">
                <div>
                    <Title
                        class="subscription-card__content__title"
                        label="Information bancaire"
                        type="h2"
                        weight="600"
                    />
                    <div class="subscription-card__content__form">
                        <div>
                            <label
                                ><span class="required">*</span
                                ><span>Numéro de carte</span></label
                            >
                            <div id="card-number-element"></div>
                        </div>
                        <div class="column">
                            <div style="width: 100%">
                                <label
                                    ><span class="required">*</span
                                    ><span>Date d'expiration</span></label
                                >
                                <div id="card-expiry-element"></div>
                            </div>
                            <div style="width: 100%">
                                <label
                                    ><span class="required">*</span
                                    ><span>CVC</span></label
                                >
                                <div id="card-cvc-element"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="subscription-card__content__form__button">
                    <small
                        class="subscription-card__content__form__error"
                        v-if="errorMsg"
                        >{{ errorMsg }}</small
                    >
                    <Button
                        @click="isAllCardFieldsValid ? processPayement() : null"
                        :disabled="!isAllCardFieldsValid || loadPayement"
                        html-type="submit"
                        type-button="primary"
                        ><LoadingButton size="sm" v-if="loadPayement" />
                        <span v-else>Valider</span></Button
                    >
                </div>
            </CardWrapper>
            <CardWrapper class="flex w-full flex-col justify-between">
                <div class="subscription-card__content__card">
                    <Title
                        class="subscription-card__content__card__title"
                        :label="(subscriptionCards as ISubscriptionCards).name.toUpperCase()"
                        type="h2"
                        weight="600"
                    />
                    <div class="subscription-card__content__card__price">
                        <Title type="h2" weight="600" :label="formattedPrice" />
                    </div>
                    <div class="subscription-card__content__card__desc">
                        <Paragraphe>
                            {{
                                (subscriptionCards as ISubscriptionCards)
                                    .description
                            }}
                        </Paragraphe>
                    </div>
                    <div class="subscription-card__content__card__services">
                        <ul>
                            <li
                                v-for="(sevice, index) in (subscriptionCards as ISubscriptionCards).services"
                                :key="index"
                            >
                                <CheckList /> <span>{{ sevice.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    v-if="nextCard"
                    class="subscription-card__content__card__suggestion"
                >
                    <Title
                        weight="400"
                        label="Vous pouvez aussi soliciter de notre pack:"
                        type="h3"
                    />
                    <div class="flex justify-center w-full">
                        <div
                            class="subscription-card__content__card__suggestion__item"
                        >
                            <span class="name">{{
                                nextCard.name.toUpperCase()
                            }}</span>
                            <span class="sep"></span>
                            <span class="price"
                                >{{ nextCard.price.toFixed(2) }} €</span
                            >
                        </div>
                    </div>
                </div>
            </CardWrapper>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { loadStripe, Stripe } from '@stripe/stripe-js';
    import { computed, onMounted, PropType, reactive, ref, watch } from 'vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MenuIndicator from '@/components/Icon/MenuIndicator.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import UserService from '@/services/userService';
    import { useStore } from 'vuex';
    import router from '@/routes';
    import CheckList from '@/components/Icon/CheckList.vue';

    const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
    let stripe: Stripe | Object = reactive({});
    const store = useStore();

    let cardNbElement: any = reactive({});
    let cardExpElement: any = reactive({});
    let cardCVCElement: any = reactive({});
    const loadPayement = ref<boolean>(false);

    let validCardFields = reactive<{
        cardNbElement: boolean;
        cardExpElement: boolean;
        cardCVCElement: boolean;
    }>({
        cardNbElement: false,
        cardExpElement: false,
        cardCVCElement: false,
    });

    const errorMsg = ref<string>();

    const isAllCardFieldsValid = ref<boolean>(false);
    const cardChoosen = ref<Array<number>>(
        store.getters['SubscriptionModule/getCardChoosen']
    );

    const formattedPrice = computed(
        () =>
            `${(props.subscriptionCards as ISubscriptionCards).price.toFixed(
                2
            )} €`
    );

    const props = defineProps({
        subscriptionCards: {
            type: Object as PropType<ISubscriptionCards | undefined | {}>,
        },
        nextCard: {
            type: Object as PropType<ISubscriptionCards | null>,
        },
    });
    let cardType = ref<any>(props.subscriptionCards);
    let persoSub = ref<boolean>(false);

    onMounted(() => {
        console.log('typetype:', cardType.value);

        initStripeApi();
    });

    watch(
        () => validCardFields,
        (valid) => {
            isAllCardFieldsValid.value = Object.values(valid).every(
                (value) => value
            );
        },
        { deep: true }
    );

    async function initStripeApi() {
        try {
            stripe = (await loadStripe(STRIPE_KEY)) as Stripe;
            // create elt
            let element = (stripe as Stripe).elements();
            cardNbElement = element.create('cardNumber', {
                classes: {
                    base: 'card-number-stripe',
                },
            });
            cardExpElement = element.create('cardExpiry', {
                classes: {
                    base: 'card-expiry-stripe',
                },
            });
            cardCVCElement = element.create('cardCvc', {
                classes: {
                    base: 'card-cvc-stripe',
                },
            });

            // mount elt
            (cardNbElement as any).mount('#card-number-element');
            (cardExpElement as any).mount('#card-expiry-element');
            (cardCVCElement as any).mount('#card-cvc-element');

            // trigger event elt
            cardNbElement.on('change', function (event: object) {
                validCardFields.cardNbElement = (event as any).complete
                    ? true
                    : false;
            });
            cardExpElement.on('change', function (event: object) {
                validCardFields.cardExpElement = (event as any).complete
                    ? true
                    : false;
            });
            cardCVCElement.on('change', function (event: object) {
                validCardFields.cardCVCElement = (event as any).complete
                    ? true
                    : false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function processPayement() {
        interface IStripe {
            id: any;
            abonnementValue: string | number;
        }

        /**
         * get user details
         */
        const userDetails = store.getters['UserModule/getRegisteredUser'];

        /**
         * get id Card
         */
        const idCard: number | string = (
            props.subscriptionCards as ISubscriptionCards
        ).id;

        /**
         * init stripe obj values
         */
        let stripeValue: IStripe = {
            id: '',
            abonnementValue: idCard,
        };

        /**
         * append values on final params to submit
         */

        let finalParams: Object = {
            ...userDetails,
            resetToken: '',
            urlClient: window.location.origin + '/success',
        };

        /**
         * start calling api
         */
        loadPayement.value = true;
        try {
            /**
             * get stripe token
             */
            const { token, error } = await (stripe as Stripe).createToken(
                cardNbElement
            );
            if (error) {
                // TODO hanlde error
                console.log(error);
                loadPayement.value = false;
            } else {
                /**
                 * add token to stripe value
                 */
                console.log(token);
                stripeValue = {
                    ...stripeValue,
                    id: token.id,
                };

                /**
                 * FINAL PARAMS FORM
                 * add personnal and custom services ids
                 */

                let serviceValue = ref<Array<number>>([]);
                switch (cardType.value.name) {
                    case 'W-Custom' || 'W-Access':
                        persoSub.value = true;
                        break;
                    default:
                        persoSub.value = false;
                        break;
                }

                finalParams = {
                    ...finalParams,
                    stripe: {
                        ...stripeValue,
                        abonnementValue: cardType.value.id,
                        personnalAbonnement: persoSub.value,
                        service: cardChoosen.value,
                    },
                };

                /**
                 * subscribe
                 */
                const { data } = await UserService.signup(finalParams);
                const { code } = data;
                if (code === 200) {
                    router.push('/confirmation');
                } else if (code === 208) {
                    errorMsg.value =
                        "L'utilisateur que vous essayez de creer existe dejà!";
                }
                console.log(code, errorMsg.value);
            }
        } catch (error) {
            // TODO handle error
            if (error) {
                errorMsg.value =
                    "Une erreur s'est produite. Veuillez reéssayez";
            } else {
                router.push('/confirmation');
            }
            // if (re)
        } finally {
            loadPayement.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .subscription-card {
        min-height: 100%;
        padding: 24px 18px;

        &__title {
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
            @apply flex justify-between items-center mb-[18px];
            .go-back {
                &:hover {
                    cursor: pointer;
                }
            }
        }
        &__content {
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
            @apply flex gap-[20px] flex-wrap-reverse;
            min-height: 82vh;
            @screen md {
                @apply flex-nowrap;
            }

            &__title {
                margin: 0 0 64px 0;
                color: var(--color-secondary);
                @screen sm {
                    margin: 64px 0;
                }
            }
            &__form {
                @apply flex gap-y-[40px] flex-col;
                label {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--color-gray-icon);
                    margin-bottom: 10px;
                    .required {
                        color: red;
                        margin-right: 5px;
                    }
                }
                .column {
                    width: 100%;
                    // display: flex;
                    @apply flex flex-wrap gap-x-[10px] gap-y-[40px];
                    @screen sm {
                        @apply flex-nowrap;
                    }
                }
                &__error {
                    color: salmon;
                    font-size: 16px;
                }
                &__button {
                    text-align: center;
                    margin-top: 40px;
                    @screen md {
                        margin-bottom: 40px;
                    }
                    &:deep() {
                        button {
                            width: 100%;
                            margin-top: 20px;
                            @screen sm {
                                width: calc(50% - 5px);
                            }
                        }
                    }
                }
            }
            &__card {
                &__services,
                &__desc,
                &__price {
                    margin-bottom: 40px;
                }
                &__title {
                    margin: 0 0 32px 0;
                    color: var(--color-secondary);
                    @screen sm {
                        margin: 64px 0 32px 0;
                    }
                }
                &__desc {
                    font-style: normal;
                    font-weight: 300;
                    font-size: 12px;
                    line-height: 15px;
                    text-align: left;
                    color: var(--color-gray-icon);
                }
                &__services {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: var(--color-secondary);
                    li {
                        @apply flex items-center gap-[10px];
                    }
                }
                &__price {
                    background-color: var(--color-secondary);
                    padding: 24px 18px;
                    border-radius: 8px;
                    &:deep() {
                        h2 {
                            color: #fff;
                            text-align: center;
                        }
                    }
                }
                &__suggestion {
                    @screen sm {
                        margin-bottom: 40px;
                    }
                    background-image: url('@/static/images/bg-suggestion-card.png');
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 24px;
                    border-radius: 8px;
                    @apply flex flex-col justify-center gap-[24px];
                    &:deep() {
                        h3 {
                            color: #fff;
                            text-align: center;
                        }
                    }
                    &__item {
                        background-color: #fff;
                        border-radius: 8px;
                        color: var(--color-secondary);
                        @apply text-center flex-wrap p-[14px] flex flex-row justify-center items-center gap-[10px];
                        font-weight: 600;
                        width: fit-content;
                        .name {
                            font-size: 14px;
                        }
                        .sep {
                            border-left: 1px solid var(--color-secondary);
                            background-color: red;
                            // padding: 10px;
                            height: 25px;
                        }
                        .price {
                            font-size: 24px;
                        }
                    }
                }
            }
        }
    }
    #card-number-element,
    #card-expiry-element,
    #card-cvc-element {
        background: white;
        padding: 10px;
        border: 1px solid var(--color-primary);
        border-radius: 2px;
        margin-bottom: 10px;
    }
</style>
