<script setup lang="ts">
    import { computed, onMounted, reactive, ref } from 'vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import moment from 'moment';
    import store from '@/store';
    import 'moment/min/locales';
    import { useRoute, useRouter } from 'vue-router';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import { notification } from 'ant-design-vue';

    moment.locale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
        ),
        monthsShort:
            'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
                '_'
            ),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split(
            '_'
        ),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function (number) {
            return number + (number === 1 ? 'er' : 'e');
        },
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        // In case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example).
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
        // },
        meridiem: function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // Used to determine first week of the year.
        },
    });

    const props = defineProps<{
        dataOffre?: any;
    }>();

    const route = useRoute();
    const router = useRouter();
    let modalShow = ref<boolean>(false);
    let reasonValue = ref<string>('');
    let loading = ref<boolean>(false);

    const dataStatus = reactive({
        status: 'Offre refusé',
        intervenant: 'Mathieu Gerard',
        date: '10 Novembre 2021',
        raison: 'La signature ne correspond pas',
        prices: '33000',
        valability: '12/12/22',
        conditions: [
            'my condition 1',
            'mon deuxieme condition',
            'mon troixiemes condition',
        ],
    });

    onMounted(() => {
        console.log(props.dataOffre, '>>>>>>>>>>TTTTTTTTTTTTTTTTTTTTT');
        console.log(props.dataOffre[0].status, 'Status >>>>>> TTTT');
        console.log(moment.locale(), 'local');
    });
    const gotoCounterOffer = () => {
        router.push({
            path: `/contre-offre/${props.dataOffre[0].id}`,
            query: { type: 'offer' },
        });
    };

    function handleModalRefused() {
        modalShow.value = !modalShow.value;
    }

    function handleChange(e: string) {
        reasonValue.value = e;
        console.log('handleChange:', e);
    }

    async function handleDeclineOffer() {
        console.log('dfadsa', props.dataOffre);

        const __dataDecline = {
            offer: props.dataOffre[0].id,
            signOwner: props.dataOffre[0].signOwner,
            signClient: props.dataOffre[0].signClient,
            responseType: 'refused',
            urlDetailTheProperty: `${window.location.origin}/detail/${props.dataOffre[0].theProperty.id}`,
            urlSite: `${window.location.origin}/}`,
            description: reasonValue.value,
        };
        try {
            loading.value = true;
            await store.dispatch(
                'SellerModule/postDeclineOffer',
                __dataDecline
            );
            const res = computed(
                () => store.getters['SellerModule/getDataRefusedOffer']
            );
            console.log('res refused', res.value);
        } catch (error) {
            notification['error']({
                message: "Une erreur s'est produite...",
                description: 'veuillez réessayer',
            });
        } finally {
            modalShow.value = !modalShow.value;
            loading.value = false;
            setTimeout(() => {
                notification['warning']({
                    message: "Vous avez refuser l'offre",
                });
                store.dispatch('MakeOfferModule/setStatusRequest', true);
                router.push('/');
            }, 2000);
        }
        console.log("Refuser: l'offre");
    }
</script>

<template>
    <div>
        <div
            class="offer__content"
            v-for="(offer, index) in props.dataOffre"
            :key="index"
        >
            <TransitionComponent>
                <div class="offer__status">
                    <div class="offer__status-online">
                        <div class="offer__status-title font-bold">
                            {{
                                offer.status == 'accepted'
                                    ? 'Offre accepté'
                                    : offer.status == 'refused'
                                    ? 'Offre refusé'
                                    : offer.status == 'counter'
                                    ? 'Contre offre'
                                    : 'Pas de réponse'
                            }}
                        </div>
                        <div :class="['offer__status-status ' + offer.status]">
                            {{
                                offer.status == 'accepted'
                                    ? 'Offre accepté'
                                    : offer.status == 'refused'
                                    ? 'Offre refusé'
                                    : offer.status == 'counter'
                                    ? 'Contre offre'
                                    : 'En attent de réponse'
                            }}
                        </div>
                    </div>

                    <div class="offer__status-content">
                        <Paragraph class="oneline"
                            >Titre du bien :
                            <span class="font-bold">{{
                                offer.theProperty.title
                            }}</span></Paragraph
                        >

                        <Paragraph class="oneline"
                            >Proprietaire du bien :
                            <span class="font-bold">{{
                                `${
                                    offer.theProperty.user.name +
                                    ' ' +
                                    offer.theProperty.user.firstname
                                }`
                            }}</span></Paragraph
                        >
                        <!--
                        <Paragraph
                            >Intervenant :
                            <span class="font-bold">{{
                                offer.intervenant
                            }}</span></Paragraph
                        > -->
                        <Paragraph class="oneline"
                            >Date de l'offre :
                            <span class="font-bold">{{
                                moment(offer.datedAt).format('LL')
                            }}</span></Paragraph
                        >

                        <!--<Paragraph class="oneline"
                            >Date d’intervention :
                            <span class="font-bold">{{
                                moment(offer.dateIntervention).format('LL')
                            }}</span></Paragraph
                        >
                        -->

                        <Paragraph
                            class="oneline"
                            v-if="offer.status == 'refused'"
                            >Raison :
                            <span class="font-bold">{{
                                offer.reason ? offer.reason : 'Aucun'
                            }}</span></Paragraph
                        >
                        <!--
                            v-if="offer.status == 'signed'"-->
                        <Paragraph class="oneline"
                            >Prix proposé :
                            <span class="font-bold"
                                >{{ separatorMillier(offer.prices) }} €</span
                            ></Paragraph
                        >

                        <div class="mb-2" v-if="offer.status == 'counter'">
                            <Paragraph class="oneline text-right"
                                >Dernier prix proposé :
                                <span class="font-bold italic"
                                    >{{
                                        separatorMillier(
                                            props.dataOffre[0].counterOffers[
                                                offer.counterOffers.length - 1
                                            ].prices
                                        )
                                    }}
                                    €</span
                                ></Paragraph
                            >
                            <Paragraph class="oneline text-right"
                                >Dernier crédit proposé :
                                <span class="font-bold italic"
                                    >{{
                                        separatorMillier(
                                            props.dataOffre[0].counterOffers[
                                                offer.counterOffers.length - 1
                                            ].credit
                                        )
                                    }}
                                    €</span
                                ></Paragraph
                            >
                        </div>

                        <Paragraph
                            class="oneline"
                            v-if="offer.status == 'signed'"
                            >Validation de l’offre :
                            <span class="font-bold">{{
                                dataStatus.valability
                            }}</span></Paragraph
                        >
                        <Paragraph
                            class="oneline flex"
                            v-if="offer.status == 'signed'"
                        >
                            <span class="mr-6">Conditions : </span>
                            <ul class="font-bold list-disc">
                                <li
                                    class="line-through"
                                    v-for="(
                                        condition, index
                                    ) in dataStatus.conditions"
                                    :key="index"
                                >
                                    {{ condition }}
                                </li>
                                <li>Condition non barrée</li>
                            </ul>
                        </Paragraph>
                    </div>

                    <div
                        class="offer__status-action"
                        v-if="index === 0 && offer.status == 'counter'"
                    >
                        <Button
                            typeButton="gray"
                            @on-click="handleModalRefused"
                        >
                            Réfuser
                        </Button>
                        <Button typeButton="secondary"> Accepter </Button>
                        <Button
                            typeButton="secondary"
                            @on-click="gotoCounterOffer"
                        >
                            Faire une contre-proposition
                        </Button>
                    </div>
                </div>
            </TransitionComponent>
        </div>

        <Modal
            class="offer__rejectModal"
            title="Refuser l'offre"
            :isShowModal="modalShow"
            @onBack="handleModalRefused"
        >
            <template #content>
                <TextArea
                    placeholder="La raison de votre refus"
                    label="Raison"
                    required
                    nameInput="reason"
                    v-model:value="reasonValue"
                    @onChange="handleChange"
                ></TextArea>
                <Button
                    class="offer__btnValidate"
                    @on-click="handleDeclineOffer"
                    >Valider</Button
                >
            </template>
        </Modal>
    </div>
</template>

<style scoped lang="scss">
    .offer {
        &__content {
            @apply mb-[10px];
        }
        &__status {
            @apply px-[24px] py-[18px] rounded-[4px];
            border: 0.5px solid var(--color-stroke-gray);
        }

        &__status-online {
            @apply flex flex-row items-center justify-between;
        }

        &__status-content {
            @apply mt-2;
        }

        &__status-status {
            @apply px-[18px] py-[4px] rounded-[100px];
            background: var(--color-stroke-gray);
        }

        &__status-action {
            @apply max-w-[492px] flex flex-row items-center justify-start flex-wrap gap-[14px] mt-[24px];
        }

        &__btnValidate {
            @apply lg:w-full lg:flex lg:justify-end;
            &:deep() {
                .button__primary {
                    @apply w-full lg:w-auto;
                }
            }
            @apply rounded text-sm font-semibold w-full mt-[20px];
        }
    }

    .oneline {
        @apply mt-3;
    }
    .accepted {
        background: var(--color-green);
    }
    .refused {
        color: var(--color-alert-str-rose);
        background: rgba(244, 67, 54, 0.2);
    }

    .signed {
        background: var(--color-stroke-gray);
    }

    .counter {
        background: var(--color-warn);
    }
</style>
