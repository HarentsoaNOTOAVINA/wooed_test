<template>
    <div class="offer__card">
        <div class="offer__head">
            <span class="offer__owner">{{ dataUserOffer.user.name }}</span>
            <Button @on-click="gotoOffer">Voir les offres</Button>
        </div>
        <div>
            <span>Date d'envoie : </span>
            <span class="offer__detail">{{
                moment(dataUserOffer.datedAt).format('dddd D MMMM YYYY')
            }}</span>
        </div>
        <div>
            <span>Prix proposé : </span>
            <span class="offer__detail"
                >{{ separatorMillier(dataUserOffer.prices) }} €</span
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import moment from 'moment';

    const props = defineProps({
        dataUserOffer: {
            type: Object,
            required: true,
        },
    });
    const emit = defineEmits<{
        (e: 'gotoOfferCard', value: object): void;
    }>();

    const gotoOffer = (idProperty: number, idUser: number) => {
        // props.dataUserOffer.value.id = id;
        // console.log('id dataUser offer:', (props.dataUserOffer.value.id = id));
        console.log('go to offer');
        emit('gotoOfferCard', { idProperty, idUser });
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
        &__owner {
            @apply font-semibold;
        }
        &__price {
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
