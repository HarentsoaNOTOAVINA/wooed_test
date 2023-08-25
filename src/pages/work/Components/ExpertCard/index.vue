<template>
    <div class="expertCard" @click="showModalRate(expertData)">
        <div class="expertCard__header">
            <div class="expertCard__titleContainer">
                <!-- <Rate  class="expertCard__rating"/> -->
                <span class="expertCard__title">{{
                    expertData.office.name
                }}</span>
                <div class="expertCard__rateContainer">
                    <Star />
                    <span class="expertCard__rate">4</span>
                </div>
            </div>
            <CheckBox
                class="expertCard__input"
                @handleCheck="handleChoiceExpert"
                :name="expertData.id"
            />
        </div>
        <div class="expertCard__contentContainer">
            <div class="expertCard__content">
                <Location />
                <span>{{
                    expertData.office.address
                        ? expertData.office.address
                        : noData
                }}</span>
            </div>
            <div class="expertCard__contentRaw">
                <div class="expertCard__raws">
                    <MessageBox size="xs" />
                    <span>{{
                        expertData.office.mail ? expertData.office.mail : noData
                    }}</span>
                </div>
                <div class="expertCard__raws">
                    <Phone />
                    <span>{{
                        expertData.office.phone
                            ? expertData.office.phone
                            : noData
                    }}</span>
                </div>
                <div class="expertCard__raws">
                    <Calendar size="xs" />
                    <span>{{
                        expertData.office.fax ? expertData.office.fax : noData
                    }}</span>
                </div>
                <div class="expertCard__raws">
                    <Number size="xs" />
                    <span>{{
                        expertData.office.number
                            ? expertData.office.number
                            : noData
                    }}</span>
                </div>
                <div class="expertCard__raws">
                    <Globe size="xs" />
                    <span
                        ><a target="_blank" rel="noopener noreferrer">
                            {{
                                expertData.office.web
                                    ? expertData.office.web
                                    : noData
                            }}</a
                        ></span
                    >
                </div>
            </div>
        </div>
        <ModalRate
            @cancelRating="cancelRating"
            @validateRate="validateRate"
            @onCloseModalRate="onCloseModalRate"
            :showModalRate="isShowModalRate"
            :expertName="expertName"
            :loadingBtn="loadingBtn"
        />
    </div>
</template>

<script setup lang="ts">
    import ModalRate from '@/components/Display/ModalRate/ModalRate.vue';
    import Star from '@/components/Icon/Star.vue';
    import Rate from '@/components/Display/Rate/Rate.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Location from '@/components/Icon/Location.vue';
    import MessageBox from '@/components/Icon/MessageBox.vue';
    import Phone from '@/components/Icon/Phone.vue';
    import Calendar from '@/components/Icon/Calendar.vue';
    import Number from '@/components/Icon/Number.vue';
    import Globe from '@/components/Icon/Globe.vue';
    import { ref } from 'vue';

    const props = defineProps([
        'expertData',
        'isShowModalRate',
        'expertName',
        'expertRate',
        'loadingBtn',
    ]);
    const noData = ref<string>('Non renseigné');
    let checked = ref<boolean>(false);
    let list = ref<Array<object>>([]);

    const emit = defineEmits<{
        (event: 'handleChoiceExpert', value: any): void;
        (event: 'showModalRate', value: any): void;
        (event: 'onCloseModalRate'): void;
        (event: 'validateRate', value: any): void;
        (event: 'cancelRating'): void;
    }>();

    const cancelRating = () => {
        emit('cancelRating');
    };

    const validateRate = (value: any) => {
        emit('validateRate', value);
    };

    const onCloseModalRate = () => {
        emit('onCloseModalRate');
    };

    const showModalRate = (expert: any) => {
        emit('showModalRate', expert);
    };

    const selectedCard = (event: any, id: any) => {
        console.log('idididid:', event);
    };

    const handleChoiceExpert = (id: any) => {
        console.log('item selected:', id);
        emit('handleChoiceExpert', id);
    };
</script>

<style lang="scss" scoped>
    .expertCard {
        @apply h-fit w-[300px] justify-center p-[10px] my-[18px] rounded-lg;
        border: 1px solid var(--color-primary);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        overflow-wrap: anywhere;
        @screen md {
            @apply w-[450px] h-auto;
        }
        @screen lg {
            @apply h-[290px];
        }

        &__rating {
            @apply flex justify-center;
        }

        &__rateContainer {
            @apply flex;
        }

        &__rate {
            @apply text-center;
        }

        &__titleContainer {
            @apply flex flex-col;
        }

        &__header {
            @apply flex;
        }

        &__input {
            width: 300px;
        }

        &__titleContainer {
            @apply flex w-full justify-start;
        }
        &__title {
            // @apply ;
        }
        &__contentContainer {
            @apply flex flex-col gap-[10px];
        }
        &__content {
            @apply w-full flex flex-row justify-between mt-[14px] mb-[8px] gap-[10px];
        }

        &__contentRaw {
            display: grid;
            column-gap: 50px;
            row-gap: 10px;
            grid-template-columns: auto auto;
            // @apply flex flex-row gap-[30px];
        }

        &__raws {
            @apply flex gap-[7px] items-center gap-[5px];
        }
    }

    .expertCard:hover {
        box-shadow: 0 0 11px rgba(0, 0, 0, 0.2);
    }
</style>
