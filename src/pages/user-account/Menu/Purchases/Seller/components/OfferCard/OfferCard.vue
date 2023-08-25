<template>
    <!-- <div class="container offer"> -->
    <div class="offer__card">
        <div class="offer__head">
            <span class="offer__owner">{{ dataCard.user.firstname }}</span>
            <span class="offer__price"
                >{{ separatorMillier(dataCard.prices) }}€</span
            >
        </div>
        <div class="offer__dateNstatus flex flex-row justify-between">
            <div>
                <span>Date d'intervention : </span>
                <span class="offer__detail">{{
                    moment(dataCard.datedAt).format('DD/MM/YYYY')
                }}</span>
            </div>
            <span class="offer__status"
                >Status de l'offre: {{ offerStatus }}</span
            >
        </div>
        <div>
            <span>Prix proposé : </span>
            <span class="offer__detail"
                >{{ separatorMillier(dataCard.prices) }}€</span
            >
        </div>
        <div>
            {{
                dataCard.withcondition
                    ? 'Avec condition suspensive'
                    : 'Sans condition suspensive'
            }}
        </div>
        <a :href="dataCard.path" target="_blank" class="offer__docContainer">
            <PdfIcon />
            <span class="offer__doc">Voir le document de la demande</span>
        </a>
        <div class="mb-2" v-if="dataCard.status == 'counter'">
            <Paragraph class="oneline text-right"
                >Dernier prix proposé :
                <span class="font-bold italic"
                    >{{
                        separatorMillier(
                            dataCard.counterOffers[
                                dataCard.counterOffers.length - 1
                            ].prices
                        )
                    }}
                    €</span
                ></Paragraph
            >
            <Paragraph class="oneline text-right"
                >Dernier prix proposé :
                <span class="font-bold italic"
                    >{{
                        separatorMillier(
                            dataCard.counterOffers[
                                dataCard.counterOffers.length - 1
                            ].credit
                        )
                    }}
                    €</span
                ></Paragraph
            >
        </div>
        <div
            class="lg:flex lg:gap-[10px]"
            v-if="dataCard.status === 'sent' || dataCard.status === 'counter'"
        >
            <div class="offer__btnContainer" v-if="isLast">
                <Button typeButton="gray" @on-click="openRejectModal"
                    ><LoadingButton v-if="loadingBtnRefused" size="xs" />
                    Refuser</Button
                >
                <Button typeButton="secondary" @on-click="validateOffer"
                    ><LoadingButton v-if="loadingBtnAccepted" size="xs" />
                    Accepter</Button
                >
            </div>
            <Button
                class="offer__fco"
                typeButton="secondary"
                @on-click="gotoCounterOffer"
                >Faire une contre-offre</Button
            >
        </div>
    </div>

    <div
        class="offer__signature mt-3"
        v-if="!dataCard.isOnSpanSign && dataCard.status === 'sent'"
    >
        <SignatureCard @signature="validSignature" />
    </div>
</template>

<script lang="ts" setup>
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';

    import PdfIcon from '@/components/Icon/Pdf.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import DocOffer from '@/components/Display/DocOffer/DocOffer.vue';
    import SignatureCard from '@/components/Display/signatureCard/SignatureCard.vue';
    import { Store, useStore } from 'vuex';
    import { onBeforeMount, ref, watch } from 'vue';
    import moment from 'moment';
    const props = defineProps({
        dataCard: {
            type: Object,
            required: true,
        },
        loadingBtnAccepted: {
            type: Boolean,
            default: false,
        },
        loadingBtnRefused: {
            type: Boolean,
            default: false,
        },
        isLast: {
            type: Boolean,
        },
    });

    const store: Store<any> = useStore();

    onBeforeMount(() => {
        console.log('data card offer:', typeof props.dataCard);
    });

    const showLoadingBtnProps = ref<boolean>();
    watch(
        () => props.loadingBtnAccepted,
        (first) => {
            showLoadingBtnProps.value = first;
        },
        { immediate: true, deep: true }
    );

    let offerStatus = ref<string>();

    switch (props.dataCard.status) {
        case 'sent':
            offerStatus.value = 'En attente';
            break;
        case 'accepted':
            offerStatus.value = 'Accepté';
            break;
        case 'refused':
            offerStatus.value = 'Refusé';
            break;
        case 'counter':
            offerStatus.value = 'Contré';
            break;
        default:
            break;
    }

    const emit = defineEmits<{
        (e: 'openModal'): void;
        (e: 'gotoCounterOffer', value: number): void;
        (e: 'validateOffer'): void;
        (e: 'rejectOffer'): void;
        (e: 'validSign', value: string): void;
    }>();
    const openRejectModal = () => {
        emit('rejectOffer');
    };
    const gotoCounterOffer = (idOffer: number) => {
        idOffer = props.dataCard.id;
        emit('gotoCounterOffer', idOffer);
    };

    const validateOffer = () => {
        emit('validateOffer');
    };
    const validSignature = (sign: any) => {
        emit('validSign', sign);
    };
</script>

<style lang="scss" scoped>
    .offer {
        @apply py-[20px];

        &__card {
            border: #d6d6d6 1px solid;
            padding: 18px 10px 18px 10px;
            @apply rounded mt-[10px];
        }
        &__head {
            @apply flex flex-row justify-between mb-[14px];
        }
        &__dateNstatus {
            @apply flex flex-row justify-between;
        }
        &__owner {
            @apply font-semibold;
        }
        &__price {
            background-color: #d6d6d6;
            @apply rounded-lg pt-1 pb-1 pl-3 pr-3 text-sm not-italic font-normal;
        }
        &__status {
            background-color: #d6d6d6;
            @apply rounded-lg pt-1 pb-1 pl-3 pr-3 text-sm not-italic font-normal;
        }
        &__detail {
            @apply font-semibold;
        }
        &__docContainer {
            @apply flex mt-[17px];
        }
        &__doc {
            color: var(--color-primary);
        }
        &__btnContainer {
            @apply flex gap-[10px] mt-[27px];
        }
        &__fco {
            @apply mt-[10px] lg:mt-[27px];
        }
    }
</style>
