<template>
    <CardWrapper class="subscription__card__item__wrapper">
        <div class="subscription__card__item">
            <Title
                type="h3"
                :label="(subscriptionCards?.name.toUpperCase() as string)"
                weight="600"
            />
            <Title v-if="customPrices > 0" type="h1" :label="`${customPrices.toFixed(2)} €`" weight="600" />
            <Title v-else type="h1" :label="parsedAmount" weight="600" />
            <Button
                :disabled="choosen"
                :theme="
                    subscriptionCards?.name.toUpperCase() === 'W-PREMIUM'
                        ? 'light'
                        : undefined
                "
                @click="handleChooseCard"
                type-button="secondary"
                ><LoadingButton size="sm" v-if="loadingRegistration" />
                <span v-else>Bénéficier</span></Button
            >
            <p class="subscription__card__item__desc">
                {{ subscriptionCards?.description }}
            </p>
            <div
                v-if="
                    subscriptionCards?.name === 'W-Access' ||
                    subscriptionCards?.services?.length
                "
            >
                <div
                    v-if="subscriptionCards?.services?.length"
                    class="subscription__card__item-container"
                >
                    <span
                        v-if="subscriptionCards?.services.length"
                        class="more-label"
                        @click="moreClick(subscriptionCards?.id)"
                        >Voir plus</span
                    >
                    <Transition appear name="fadeHeight" mode="out-in">
                        <ul
                            ref="index"
                            v-if="more"
                            class="subscription__card__item__info"
                        >
                            <li
                                v-for="(
                                    item, index
                                ) in subscriptionCards?.services"
                                :key="index"
                            >
                                <span class="info-icon">&check;</span
                                ><span class="info-text">{{ item.name }}</span>
                            </li>
                        </ul>
                    </Transition>
                </div>
                <div v-if="subscriptionCards?.name === 'W-Access'">
                    <RadioGroup
                        @change="handleRadio"
                        :items="servicesAccess"
                        name="access"
                    />
                </div>
            </div>
            <div
                v-if="subscriptionCards?.name === 'W-Custom'"
                class="subscription__card__item-container"
            >
                <span
                    v-if="servicesFree.length"
                    class="more-label"
                    @click="moreClick(subscriptionCards?.id)"
                    >Voir plus</span
                >
                <ul ref="teste" class="subscription__card__item__info">
                    <Transition appear name="fadeHeight" mode="out-in">
                        <div v-if="more" class="subscription__card__item__info">
                            <li
                                v-for="(item, index) in servicesFree"
                                :key="index"
                            >
                                <span class="info-icon">&check;</span
                                ><span class="info-text">{{ item.name }}</span>
                            </li>
                        </div>
                    </Transition>
                    <li
                        v-for="(itemCustom, indexCustom) in servicesCustom"
                        :key="indexCustom"
                    >
                        <CheckBox
                            @click-with-value="handleCheck"
                            :label="itemCustom.name"
                            :value="String(itemCustom.id)"
                            name="custom"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </CardWrapper>
</template>

<script lang="ts" setup>
    import RadioGroup from '@/components/Common/RadioGroup/RadioGroup.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { computed, PropType, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import UserService from '@/services/userService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useRouter } from 'vue-router';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import MoreOption from '@/components/Display/MoreOption/MoreOption.vue';
    import SubscriptionCard from '../SubscriptionCard.vue';

    const router = useRouter();
    const store = useStore();
    const props = defineProps({
        subscriptionCards: {
            type: Object as PropType<ISubscriptionCards>,
            require: true,
        },
        servicesAccess: {
            type: Object as PropType<any>,
        },
        servicesFree: {
            type: Object as PropType<any>,
        },
        servicesCustom: {
            type: Object as PropType<any>,
        },
        cardList: {
            type: Object as PropType<any>,
        },
        moreValue: {
            type: Boolean,
            default: false,
        },
        choosen: {
            type: Boolean,
            default: false
        }
    });

    const loadingRegistration = ref<boolean>(false);
    const theme = ref<{
        backgroundColor: string;
        descColor: string;
        infoColor: string;
        titleColor: string;
    }>({
        backgroundColor: '#FFF',
        descColor: '#606060',
        infoColor: '#949fb5',
        titleColor: 'var(--color-secondary)',
    });
    let customChoice = ref<Array<number>>([]);
    let accessChoice = ref<any>('');
    const parsedAmount = computed(
        () => `${props.subscriptionCards?.price.toFixed(2)} €`
    );

    const emit = defineEmits<{
        (e: 'on-choose-card', value: ISubscriptionCards | undefined): void;
        (e: 'on-more-click', value: any): void;
    }>();

    const more = ref<boolean>(props.moreValue);
    const index = ref<any>(null);
    const customPrices = ref(0);

    watch(
        () => props.moreValue,
        (value) => {
            more.value = value;
        },
        { immediate: true }
    );

    function moreClick(item: any) {
        more.value = !more.value;
        emit('on-more-click', index);
    }

    function handleCheck(e: any) {
        customPrices.value = 0;
        const currentElement = Number(e.custom);
        const index = customChoice.value.findIndex((element : any) => element === currentElement);
        index >= 0 ? customChoice.value.splice(index, 1) : customChoice.value.push(currentElement);
        if (customChoice.value.length) {
            customChoice.value.forEach((el: any) => {
                const currentChoice: any = props.servicesCustom.find((element: any) => element.id === el);
                customPrices.value += currentChoice.price
            })
        }  
    }

    function handleRadio(e: any) {
        accessChoice.value = e.access;
        console.log('value radio choice:', accessChoice.value);
    }

    async function handleChooseCard() {
        /**
         * IF CHOOSEN CARD IS FREE => DIRECTLY SUBMIT
         */
        if (
            (
                props.subscriptionCards as ISubscriptionCards
            ).name.toUpperCase() === 'W-FREE'
        ) {
            const userDetails = store.getters['UserModule/getRegisteredUser'];
            /**
             * init stripe obj values WITHOUT STRIPE TOKEN => FREE
             */
            let stripeValue = {
                abonnementValue: (props.subscriptionCards as ISubscriptionCards)
                    .id,
            };

            /**
             * append values on final params to submit
             */
            let finalParams: Object = {
                ...userDetails,
                resetToken: '',
                stripe: { ...stripeValue },
                urlClient: window.location.origin + '/success',
            };

            /**
             * call api
             */
            try {
                loadingRegistration.value = true;
                const { data } = await UserService.signup(finalParams);
                const { code } = data;
                if (/^2/g.test(code)) {
                    loadingRegistration.value = false;
                    router.push('/confirmation');
                }
            } catch (error) {
                //TODO HANLDE ERROR => NOTIFICATION PREF
                console.log(error);
            } finally {
                loadingRegistration.value = false;
            }
        } else {
            /**
             * PROCESS TO PAYMENT
             */
            if (accessChoice.value) {
                store.dispatch(
                    'SubscriptionModule/setCardChoice',
                    accessChoice.value
                );
            } else if (customChoice.value.length !== 0) {
                store.dispatch(
                    'SubscriptionModule/setCardChoice',
                    customChoice.value
                );
            }
            emit('on-choose-card', props.subscriptionCards);
        }
    }
    onMounted(() => {
        if (props.subscriptionCards?.name.toUpperCase() === 'W-CUSTOM') {
            theme.value = {
                backgroundColor: 'var(--color-secondary)',
                descColor: '#ffffff94',
                infoColor: '#FFF',
                titleColor: '#FFF',
            };
        }
    });
</script>

<style lang="scss" scoped>
    .subscription__card__item {
        &:deep() {
            h3,
            h1 {
                color: v-bind('theme.titleColor');
            }
        }
        @apply flex justify-center flex-col items-center;

        // width: 246.5px;
        &__wrapper {
            border-radius: 8px;
            padding: 18px;
            background-color: v-bind('theme.backgroundColor');
            // widows: 100%;
            width: 100%;
            box-shadow: 0 0 10px 1px var(--color-gray);
            max-width: 320px;
            min-height: 377px;
            // height: max-content;
            @screen sm {
                padding: 24px;
            }
        }
        gap: 25px;
        &__desc {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            color: v-bind('theme.descColor');
        }
        &-container {
            @apply flex items-center flex-col gap-[18px];
            &:deep() {
                .ant-radio-group {
                    @apply w-full;
                }
            }
        }
        &__info {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            @apply w-full flex justify-items-center flex-col gap-[13px];
            .info-icon {
                font-size: 20px;
                color: var(--color-primary);
            }
            li {
                @apply flex gap-[13px];
                .info-text {
                    color: v-bind('theme.infoColor');
                }
            }
        }
        .more-label {
            border-bottom: 1px solid;
            @apply font-[600] text-center text-primary w-max border-primary;
            &:hover {
                @apply text-blueFooter cursor-pointer border-blueFooter;
            }
        }
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 800px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
