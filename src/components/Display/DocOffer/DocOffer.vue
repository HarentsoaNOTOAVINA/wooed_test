<script setup lang="ts">
    import Title from '../../Common/Title/Title.vue';
    import Paragraphe from '../../Common/Paragraphe/Paragraphe.vue';
    import { separatorMillier } from '../../../utils/separator-number/SeparatorMiller';
    // import moment from 'moment';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { computed, onMounted, reactive, ref, watch } from 'vue';
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
        }
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

    const route = useRoute();
    const store: Store<any> = useStore();
    const detailsLoaded = ref(false);

    const dataResutlHead = computed(() => store.getters['PropertyDetailModule/getPropertyDetail'].data);

    watch(() => dataResutlHead.value,
        async (newValue) => {
            console.error(newValue);
            if (!newValue) {
                await store.dispatch('PropertyDetailModule/setPropertyData', route.params.id);
            } else {
                detailsLoaded.value = true;
            }
        },
        { immediate: true, deep: true }
    )
</script>

<template>
    <div>
        <Title
            v-if="hasTitle"
            type="h3"
            :label="titleResult"
            weight="600"
            class="offer__result-title"
        />

        <div class="doc__main-content">
            <span class="offer__result-span"> Les soussignées(es): </span>
            <ul class="condition-list">
                <li v-if="detailsLoaded" class="list-disc ml-6">{{ dataResutlHead.user.name  }}</li>
                <li
                    class="list-disc ml-6"
                    v-for="(name, index) in names"
                    :key="index"
                >
                    {{ name }}
                </li>
            </ul>

            <h4 class="offer__result-title-dark">
                Font, par les présentes, offre d’achat pour le bien ci-après:
            </h4>

            <div v-if="detailsLoaded" class="offer__result-head">
                <p>Titre : {{ dataResutlHead.details }}</p>
                <p>Prix : {{ separatorMillier(dataResutlHead.prices) }} €</p>
                <p>Et référence : {{ dataResutlHead.reference }}</p>
                <p>Au prix de : {{ separatorMillier(priceOffer) }} €</p>
            </div>

            <div v-else class="h-[84px] relative flex flex-col items-center">
                <Loader />
            </div>

            <h4 class="offer__result-title-dark">Pour autant que :</h4>
            <ul class="name-list">
                <li
                    class="list-decimal ml-6"
                    v-for="(condition, index) in conditions"
                    :key="index"
                >
                    {{ condition }}
                </li>
            </ul>

            <div class="offer__result-content">
                <Paragraphe v-if="conditionShowingSuspens">
                    Les soussignés font la présente offre avec la condition
                    suspensive: De l'obtention d'un crédit de
                    <span class="offer__value"
                        >{{ separatorMillier(conditionCreditAmount) }} €
                    </span>
                    aux conditions normales du marché. Au cas où cette condition
                    ne se réalise pas, aucune indemnité ne sera, due de quelque
                    chef ou de quelque nature que ce soit. Cette clause
                    suspensive est valable pendant un délai de
                    <span span class="offer__value"
                        >{{ durationCredit }} semaine(s)</span
                    >
                    à dater de la signature du compromis de vente.
                </Paragraphe>
                <br />
                <Paragraphe>
                    En cas de non-obtention du crédit, la garantie sera
                    intégralement restituée à l’acquéreur. <br />

                    Pour le surplus, la vente se fera aux conditions de vente
                    ordinaires de droit. La présente est valable jusqu'au plus
                    tard le
                    <span span class="offer__value">{{
                        dateOffer
                    }}</span>
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

                    <span span class="offer__value"
                        >{{ depositSignature }} %</span
                    >
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
                    <span span class="offer__value">{{ notaryName }}</span> à
                    <span span class="offer__value">{{
                        documentDwelling
                    }}</span>
                    pour les vendeurs, à l'intervention du notaire à Bruxelles,
                    pour les acquéreurs.
                </Paragraphe>
            </div>

            <div class="offer__result-footer">
                <div class="offer__result-footer-signature">
                    <p>
                        Fait à :
                        <span span class="offer__value">{{
                            documentDwelling
                        }}</span>
                    </p>
                    <p>Nom et signatures</p>
                    <div class="inputHidden" v-if="hasInputHidden">
                        <input type="hidden" name="inputHid" id="hidden" />
                    </div>
                    <div class="signature__img" v-if="imageSignature != ''">
                        <img :src="`${imageSignature}`" alt="img signature" />
                        <ul>
                            <li
                                class="ml-6"
                                v-for="(name, index) in names"
                                :key="index"
                            >
                                {{ name }}
                            </li>
                        </ul>
                    </div>
                    <div v-else style="min-height: 144px;" />
                </div>

                <div class="offer__result-footer-date">
                    <p>
                        le
                        <span span class="offer__value">{{ documentDate }}</span>
                    </p>
                    <p>le(s) propriétaire(s)</p>
                    <div class="relative h-[144px]">
                        <p v-if="detailsLoaded" class="text-center absolute inset-x-0 bottom-0">
                            {{ dataResutlHead.user.name }}
                        </p>
                    </div>
                </div>
                <slot name="sign"></slot>
            </div>
        </div>
    </div>
</template>

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
            @apply mt-[138px] flex flex-row justify-between font-normal;
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
    }
    .name-list .condition-list {
        @apply my-1.5;
    }

    .paragraphe__normal {
        @apply mb-2 text-justify font-light;
    }

    .doc__main-content {
        @apply mt-1 pb-4;
    }
</style>
