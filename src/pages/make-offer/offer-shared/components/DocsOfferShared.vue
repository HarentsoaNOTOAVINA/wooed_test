<template>
    <div class="docShared__container">
        <Title
            v-if="hasTitle"
            type="h3"
            :label="titleResult"
            weight="600"
            class="offer__result-title"
        />

        <div class="mb-3.5">
            <span class="offer__result-span"> Les soussignées(es): </span>
            <ul class="condition-list">
                <li class="list-disc ml-6">
                    {{ dataResutlHead.user.name }}
                    <span class="font-bold">propriétaire</span>
                </li>
                <li
                    v-if="isParticipate"
                    class="list-disc ml-6"
                    v-for="(buyer, i) in detailParticipants.buyers"
                    :key="i"
                >
                    {{ buyer.user.name }}
                    <span class="font-bold">
                        &nbsp; : &nbsp;{{ buyer.quote }}%</span
                    >
                </li>
            </ul>

            <h4 class="offer__result-title-dark">
                Font, par les présentes, offre d’achat pour le bien ci-après:
            </h4>

            <div class="offer__result-head">
                <p>Titre : {{ dataResutlHead.details }}</p>
                <p>Prix : {{ separatorMillier(dataResutlHead.prices) }}</p>
                <p>Et référence : {{ dataResutlHead.reference }}</p>
                <p>Au prix de : {{ separatorMillier(priceOffer) }} €</p>
            </div>

            <h4 class="offer__result-title-dark">Pour autant que :</h4>
            <ul
                class="name-list"
                v-for="(buyer, index) in detailParticipants.buyers"
                :key="index"
            >
                <li
                    class="list-disc ml-6"
                    v-for="(condition, i) in buyer.conditions"
                    :key="i"
                >
                    {{ condition.description }}
                </li>
            </ul>

            <div class="offer__result-content">
                <Paragraphe v-if="conditionShowingSuspens">
                    Les soussignés font la présente offre avec les conditions
                    ci-dessus.
                </Paragraphe>
                <br />
                <Paragraphe>
                    En cas de non réponse, la garantie sera intégralement
                    restituée à l’acquéreur. <br />

                    Pour le surplus, la vente se fera aux conditions de vente
                    ordinaires de droit. La présente est valable jusqu'au plus
                    tard le
                    <span span class="offer__value">
                        {{
                            moment(
                                detailParticipants.buyers[0].user.validityDate
                            ).format('DD-MM-YYYY')
                        }}
                    </span>
                    à défaut d’acceptation par le(s)propriétaire(s) dans ce
                    délai les soussignés seront libérés de leur offre.
                </Paragraphe>
                <br />
                <Paragraphe>
                    Si la présente offre est acceptée dans le délai précité,
                    elle sera suivie d'un compromis de vente que les soussignés
                    s'engagent à signer dans les 30 jours ouvrables sous réserve
                    d’obtention des renseignements obligatoires. <br />

                    En cas d'acception par le(s) propriétaire(s) le prix sera
                    payable comme suit : <br />

                    <span span class="offer__value">100 %</span>
                    à la signature de la convention d’option, au moyen d'un
                    virement bancaire émis au nom du notaire de l'acquéreur, qui
                    conservera cette garantie jusqu'au jour de l'acte
                    authentique et auquel moment elle constituera un acompte sur
                    le prix.
                </Paragraphe>
                <br />
                <Paragraphe>
                    En cas d'acception par le propriétaire, l'acte sera signé
                    devant le notaire
                    <span span class="offer__value">{{
                        detailParticipants.notary.name
                    }}</span>
                    pour les vendeurs, à l’intervention du notaire à Bruxelles,
                    pour les acquéreurs.
                </Paragraphe>
            </div>

            <div class="offer__result-footer">
                <div class="offer__result-footer-signature">
                    <p>Noms et signatures</p>
                    <div class="inputHidden" v-if="hasInputHidden">
                        <input type="hidden" name="inputHid" id="hidden" />
                    </div>
                    <div class="signature__participant" v-if="isParticipate">
                        <div
                            class="signature__participant-content"
                            v-for="(buyer, index) in detailParticipants.buyers"
                            :key="index"
                        >
                            <img :src="buyer.signSimple" alt="img signature" />
                            <p class="text-center">
                                {{ buyer.user.name }}
                            </p>
                        </div>
                    </div>
                    <div class="signature__img" v-if="imageSignature != ''">
                        <img :src="`${imageSignature}`" alt="img signature" />
                        <p class="text-center">
                            {{ nameBuyer }}
                        </p>
                    </div>
                </div>

                <slot name="sign"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import moment from 'moment';
    import { computed, onMounted, reactive, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    defineProps({
        hasTitle: {
            type: Boolean,
            default: false,
        },
        titleResult: {
            type: String,
            default: '',
        },
        names: {
            type: Array<String>,
            default() {
                return [];
            },
        },
        conditions: {
            type: Array<String>,
            default() {
                return [];
            },
        },
        imageSignature: {
            type: String,
            default() {
                return '';
            },
        },
        priceOffer: {
            type: Number,
            default: 0,
        },

        hasInputHidden: {
            type: Boolean,
            default: false,
        },
        conditionCreditAmount: {
            type: Number,
            default: 0,
        },
        durationCredit: {
            type: Number,
            default: 0,
        },
        dateOffer: {
            type: String,
            default() {
                return '...';
            },
        },
        depositSignature: {
            type: Number,
            default: 0,
        },
        documentDwelling: {
            type: String,
            default() {
                return '...';
            },
        },
        documentDate: {
            type: String,
            default() {
                return '';
            },
        },
        conditionShowingSuspens: {
            type: Boolean,
            default: true,
        },
        notaryName: {
            type: String,
            default() {
                return '...';
            },
        },
        nameBuyer: {
            type: String,
        },
    });

    interface IUser {
        name: string;
    }

    interface IDataResultHead {
        details: string;
        prices: string;
        reference: string;
        user: IUser;
    }

    interface IDetailParticipant {
        id: number;
        user: any;
        path: string;
        filename: string;
        status: string;
        totalQuotes: number;
        notary: any;
        buyers: any;
    }

    const route = useRoute();
    const store = useStore();

    // let titleResult = 'Aperçu du document';
    // const store: Store<any> = useStore();
    let isParticipate = store.getters['MakeOfferModule/getParticipate'];
    let dataResutlHead = reactive<IDataResultHead>({
        details: 'Moderne',
        prices: '1000000',
        reference: 'IMM191121113154',
        user: {
            name: 'My username',
        },
    });
    let detailParticipants = reactive<IDetailParticipant>({
        id: 0,
        user: '',
        path: '',
        filename: '',
        status: '',
        totalQuotes: 0,
        notary: '',
        buyers: [
            {
                id: 1,
                quote: 0,
                user: {
                    id: 2,
                    email: '',
                    name: '',
                    logo: '',
                },
                validityDate: moment(),
                conditions: [
                    // {
                    //     id: 1,
                    //     description: 'condition numero 1',
                    // },
                ],
                signSimple: '',
            },
        ],
    });

    onMounted(() => {
        dataHead();
        getDetailsParticipant();
    });

    const dataHead = () => {
        if (
            store.getters['PropertyDetailModule/getPropertyDetail'].data !==
            null
        ) {
            Object.assign(
                dataResutlHead,
                store.getters['PropertyDetailModule/getPropertyDetail'].data
            );
        } else {
            getDetailsBien();
        }
    };

    function getDetailsParticipant() {
        store.getters['MakeOfferModule/getDetailOfferShared'] !== null
            ? (detailParticipants =
                  store.getters['MakeOfferModule/getDetailOfferShared'])
            : null;
    }

    async function getDetailsBien() {
        try {
            await store.dispatch(
                'BienDetailModule/setDetailBien',
                route.params.id
            );

            dataResutlHead = Object.assign(
                dataResutlHead,
                store.getters['BienDetailModule/getDetailBien'].data
            );
        } catch (error) {}
    }
</script>

<style lang="scss" scoped>
    .offer {
        &__result-head {
            @apply font-semibold mb-3;
        }

        &__result-title-dark {
            @apply mt-2.5 font-normal text-[#949FB5];
        }

        &__result-content {
            @apply mt-3.5;
        }

        &__result-footer {
            @apply mt-[38px] flex flex-row justify-between font-normal;
        }

        &__value {
            @apply font-medium;
        }
    }

    .signature {
        &__img {
            &:deep(img) {
                @apply w-36 h-32;
            }
        }
        &__participant {
            @apply flex items-center h-[95px] flex-wrap flex-row;

            &-content {
                @apply w-[135px];
            }
        }
    }
    .name-list .condition-list {
        @apply my-1.5;
    }

    .paragraphe__normal {
        @apply mb-2 text-justify font-light;
    }
</style>
