<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="container">
            <div class="container">
                <div class="" v-for="(item, index) in visit" :key="index">
                    <Select
                        v-if="item.type === 'select'"
                        :name="item.name"
                        :label="item.label"
                        :options="item.subOption"
                        placeholder="Sélectionnez"
                        :default-value="
                            params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0][item.name]
                        "
                        @change-select="changeHandler"
                    />
                </div>

                <div class="" v-for="(item, index) in visit" :key="index">
                    <div
                        class="container__card"
                        v-if="
                            item.subOption &&
                            params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['type'] ===
                                item.subOption[0]['value']
                        "
                    >
                        <div
                            class="visite__item"
                            v-for="(visitType, idVisitType) in mySelfData"
                            :key="idVisitType"
                        >
                            <Switch
                                v-if="visitType.type === 'switch'"
                                :name="visitType.name"
                                :item-label="visitType.label"
                                :value="
                                    params.visitingHours &&
                                    params.visitingHours[0][visitType.name]
                                "
                                @handle-switch="changeHandler"
                            />
                            <template
                                v-if="
                                    visitType.subItem &&
                                    params.visitingHours &&
                                    params.visitingHours[0][visitType.name]
                                "
                            >
                                <div
                                    class=""
                                    v-for="(sub, idSub) in visitType.subItem"
                                    :key="idSub"
                                >
                                    <Input
                                        v-if="
                                            sub.type === 'number' ||
                                            sub.type === 'text' || sub.type === 'phone'
                                        "
                                        :name-input="sub.name"
                                        :label="sub.label"
                                        :input-type="sub.type"
                                        :vmodel="
                                            params.visitingHours &&
                                            params.visitingHours[0][sub.name]
                                        "
                                        @input="changeHandler"
                                    />
                                    <Select
                                        v-if="sub.type === 'select'"
                                        :name="sub.name"
                                        :label="sub.label"
                                        :options="sub.options"
                                        :default-value="
                                            params.visitingHours &&
                                            params.visitingHours[0][sub.name]
                                        "
                                        @change-select="changeHandler"
                                    />
                                </div>
                            </template>
                        </div>
                    </div>
                    <div
                        class="container__card"
                        v-if="
                            item.subOption &&
                            params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['type'] ===
                                item.subOption[1]['value']
                        "
                    >
                        <div
                            class="visite__item"
                            v-for="(
                                visitType, idVisitType
                            ) in toAnotherMemberData"
                            :key="idVisitType"
                        >
                            <Switch
                                v-if="visitType.type === 'switch'"
                                :name="visitType.name"
                                :item-label="visitType.label"
                                :value="
                                    params.visitingHours &&
                                    params.visitingHours[0][visitType.name]
                                "
                                @handle-switch="changeHandler"
                            />
                            <template
                                v-if="
                                    params.visitingHours &&
                                    params.visitingHours[0] &&
                                    params.visitingHours[0]['determineHour']
                                "
                            >
                                <div
                                    class=""
                                    v-for="(sub, idSub) in visitType.subItem"
                                    :key="idSub"
                                >
                                    <Select
                                        v-if="sub.type === 'select'"
                                        :name="sub.name"
                                        :label="sub.label"
                                        :options="sub.options"
                                        :default-value="
                                            params.visitingHours &&
                                            params.visitingHours[0][sub.name]
                                        "
                                        @change-select="changeHandler"
                                    />
                                    <Switch
                                        v-if="sub.type === 'switch'"
                                        :name="sub.name"
                                        :item-label="sub.label"
                                        :value="
                                            params.visitingHours &&
                                            params.visitingHours[0][sub.name]
                                        "
                                        @handle-switch="changeHandler"
                                    />
                                    <Radio
                                        v-if="sub.type === 'radio'"
                                        :name="sub.name"
                                        :element="sub.options"
                                        @handle-change-radio="changeHandler"
                                    />
                                </div>
                            </template>
                        </div>
                    </div>
                    <div
                        class="container__card"
                        v-if="
                            item.subOption &&
                            params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['type'] ===
                                item.subOption[2]['value']
                        "
                    >
                        <div
                            class="visite__item"
                            v-for="(visitType, idVisitType) in freeVisitData"
                            :key="idVisitType"
                        >
                            <Switch
                                v-if="visitType.type === 'switch'"
                                :name="visitType.name"
                                :item-label="visitType.label"
                                :value="
                                    params.visitingHours &&
                                    params.visitingHours[0][visitType.name]
                                "
                                @handle-switch="changeHandler"
                            />
                            <template
                                v-if="
                                    visitType.subItem &&
                                    params.visitingHours &&
                                    params.visitingHours[0] &&
                                    params.visitingHours[0][
                                        'isOrderSecureKeyBox'
                                    ]
                                "
                            >
                                <div
                                    class=""
                                    v-for="(sub, idSub) in visitType.subItem"
                                    :key="idSub"
                                >
                                    <Radio
                                        v-if="sub.type === 'radio'"
                                        :name="sub.name"
                                        :element="sub.options"
                                        @handle-change-radio="changeHandler"
                                    />
                                    <Switch
                                        v-else-if="sub.type === 'switch'"
                                        :name="sub.name"
                                        :item-label="sub.label"
                                        :value="
                                            params.visitingHours &&
                                            params.visitingHours[0][sub.name]
                                        "
                                        @handle-switch="changeHandler"
                                    />
                                </div>
                                <template v-if="paramsData.isWithPlace">
                                    <div
                                        class=""
                                        v-for="(
                                            placementItem, idPlacement
                                        ) in withPlacement"
                                        :key="idPlacement"
                                    >
                                        <Switch
                                            v-if="
                                                placementItem.type === 'switch'
                                            "
                                            :name="placementItem.name"
                                            :value="
                                                params.visitingHours &&
                                                params.visitingHours[0][
                                                    placementItem.name
                                                ]
                                            "
                                            :item-label="placementItem.label"
                                            @handle-switch="changeHandler"
                                        />
                                        <template v-if="placementItem.subItem">
                                            <div
                                                class=""
                                                v-for="(
                                                    subOpt, idSubOpt
                                                ) in placementItem.subItem"
                                                :key="idSubOpt"
                                            >
                                                <Input
                                                    v-if="
                                                        placementItem.name ===
                                                            'withWebcam' &&
                                                        paramsData.withWebcam
                                                    "
                                                    :input-type="subOpt.type"
                                                    :name-input="subOpt.name"
                                                    :label="subOpt.label"
                                                    :vmodel="
                                                        params.visitingHours &&
                                                        params.visitingHours[0][
                                                            subOpt.name
                                                        ]
                                                    "
                                                    @input="changeHandler"
                                                    placeholder="€"
                                                />
                                                <Input
                                                    v-if="
                                                        placementItem.name ===
                                                            'withSensor' &&
                                                        paramsData.withSensor
                                                    "
                                                    :input-type="subOpt.type"
                                                    :name-input="subOpt.name"
                                                    :label="subOpt.label"
                                                    :vmodel="
                                                        params.visitingHours &&
                                                        params.visitingHours[0][
                                                            subOpt.name
                                                        ]
                                                    "
                                                    @input="changeHandler"
                                                    placeholder="€"
                                                />
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
                <div
                    class="visite__date-container"
                    v-if="
                        (params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['typeOfShedule'] &&
                            mySelfData[1].subItem &&
                            params.visitingHours[0]['typeOfShedule'] ===
                                mySelfData[1].subItem[0].options[0].value) ||
                        (params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['fixedHour'] &&
                            toAnotherMemberData[0].subItem &&
                            params.visitingHours[0]['fixedHour'] ===
                                toAnotherMemberData[0].subItem[1].options[1]
                                    .value) ||
                        (visit[0].subOption &&
                            params.visitingHours &&
                            params.visitingHours[0] &&
                            params.visitingHours[0]['type'] ===
                                visit[0].subOption[2].value &&
                            params.visitingHours[0]['determineHour'])
                    "
                >
                    <!-- <div
                    class="visite__date-container"
                    v-if="
                        (paramsData.typeOfShedule &&
                            mySelfData[1].subItem &&
                            paramsData.typeOfShedule ===
                                mySelfData[1].subItem[0].options[0].value) ||
                        (paramsData.fixedHour &&
                            toAnotherMemberData[0].subItem &&
                            paramsData.fixedHour ===
                                toAnotherMemberData[0].subItem[1].options[1]
                                    .value) ||
                        (visit[0].subOption &&
                            paramsData.visitingHours &&
                            paramsData.visitingHours[0] &&
                            paramsData.visitingHours[0]['type'] ===
                                visit[0].subOption[2].value &&
                                paramsData.visitingHours[0]['determineHour'])
                    "
                > -->
                    <Agenda @agenda-event="getAgendaEvent" />
                </div>
            </div>

            <div class="container">
                <div class="visite__header">
                    <P class="visite__title">Publicités</P>
                    <hr class="visite__divider" />
                </div>

                <div class="visite__body">
                    <Select
                        v-if="publicity"
                        name="publicity"
                        label="Choisir le type de publicité"
                        :options="publicity"
                        placeholder="Sélectionnez"
                        :default-value="
                            params.publicity && params.publicity.type
                        "
                        @change-select="changeHandler"
                    />

                    <div
                        class=""
                        v-if="
                            params.publicity &&
                            params.publicity.type &&
                            params.publicity.type === publicity[0].value
                        "
                    >
                        <Input
                            input-type="number"
                            label="Nombre de panneaux"
                            placeholder="Nombre de panneaux"
                            name-input="panelNumber"
                            :vmodel="params.publicity.panelNumber"
                            @input="changeHandler"
                        />
                        <Switch
                            item-label="Utilisé l'adresse du bien?"
                            name="isUsePropertyAddress"
                            :value="params.publicity.isUsePropertyAddress"
                            @handle-switch="changeHandler"
                        />
                        <div class="" v-if="isAutocompleteAdress">
                            <Input
                                name-input="deliveryAddress"
                                label="Adresse de livraison"
                                placeholder="Adresse de livraison"
                                id="deliveryAddress"
                                :vmodel="params.publicity.deliveryAddress"
                                @input="changeHandler"
                            />
                        </div>
                        <div class="" v-else>
                            <span class="visite__location">
                                <Icon icon-name="Map" />
                                {{ allData.detailLocation.address }}
                            </span>
                        </div>
                        <div class="visite__link">
                            <Icon icon-name="Link" />
                            <a href="">Suivie de la livraison</a>
                        </div>
                    </div>

                    <div
                        class=""
                        v-if="
                            params.publicity &&
                            params.publicity.type &&
                            params.publicity.type === publicity[1].value
                        "
                    >
                        <div class="visite__link">
                            <Icon icon-name="Link" />
                            <a href="">Facebook</a>
                        </div>
                        <div class="visite__link">
                            <Icon icon-name="Link" />
                            <a href="">Instagram</a>
                        </div>
                    </div>
                    <div
                        class=""
                        v-if="
                            params.publicity &&
                            params.publicity.type &&
                            params.publicity.type === publicity[2].value
                        "
                    >
                        <Influancer :data="dataInfluancer" />
                        <LoadingB size="md" theme="dark" v-if="isLoading" />
                    </div>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import {
        publicity,
        dates,
        days,
        saleLinkRedirection,
        visit,
        freeVisitData,
        toAnotherMemberData,
        mySelfData,
        withPlacement,
    } from './data';
    import AddFile from '@/components/Icon/AddFile.vue';
    import { computed, reactive, ref, watch, onMounted } from 'vue';
    import { Store, storeKey, useStore } from 'vuex';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import CheckIcon from '@/components/Icon/Check.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import LoadingB from '@/components/Icon/LoadingButton.vue';
    import Agenda from '@/components/Display/Agenda/Agenda.vue';
    import AddContainer from '../AddContainer.vue';
    import Influancer from './Influancer.vue';
    import { valueParams } from '../../utils/default-value';

    const isVisible = ref<boolean>(false);
    const store: Store<any> = useStore();
    const text = reactive({
        publicSale: 'Vente public volontaire',
        modal: {
            title: 'Modéle 3D',
            header: 'Publication reussi !',
            content: 'Voulez vous faire la modélisation 3D du bien?',
            action: 'Continuer',
        },
    });
    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionType']
    );
    const paramsData = ref<any>({
        publicity: {},
        isWithPlace: true,
        visitingHours: [],
    });
    const idOfTypeToShow = ref<any>(null);
    const isAutocompleteAdress = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const dataInfluancer = ref<any>(null);

    const props = defineProps({
        isFinished: {
            type: Boolean,
            default: false,
        },
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
    });

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const params = ref<any>({
        visitingHours: [],
        publicity: {},
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            // params.value = value;
            params.value = {
            ...params.value,
            ...value,
        };
        },
        { immediate: true }
    );

    onMounted(async () => {
        const storeParams =
            store.getters['AddProductModule/getAddPropertyDatas'];
            // params.value = storeParams;
        params.value = {
            ...params.value,
            ...storeParams,
        };
        console.log('visit params >>>', params.value);
    });

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        console.log(params.value, 'PARAMS VISIT');
        emit('onClickNext');
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        console.log('NEXT>>>>>>>>>>>>\n', params.value);
    }

    const numberInstance = ref<number>(1);
    const { autocompleteResult } = useAutoComptetion(
        'deliveryAddress',
        isAutocompleteAdress.value,
        isLoading.value
    );
    const allData = computed(
        () => store.getters['AddProductModule/getAddPropertyData']
    );

    watch(
        () => props.isFinished,
        (newVal) => {
            if (newVal) {
                isVisible.value = !isVisible.value;
            }
        }
    );
    watch(
        () => params.value,
        (value) => {
            // console.log('PARAMS>>>>>>>>>>>>\n', params.value);
            // store.dispatch('AddProductModule/setPropertyData', {
            //     data: { ...value },
            // });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => paramsData.value,
        (value) => {
            if (
                value.visitingHours &&
                value.visitingHours[0] &&
                !value.visitingHours[0]['determineHour']
            ) {
                paramsData.value.typeOfShedule = '';
                paramsData.value.fixedHour = '';
                numberInstance.value = 1;
            }
            // if (!value.visitingHours[0]['determineHour']) {
            //     numberInstance.value = 1;
            // }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => params.value,
        (value) => {
            if (
                value.visitingHours &&
                value.visitingHours[0] &&
                !value.visitingHours[0]['determineHour']
            ) {
                params.value.visitingHours[0]['typeOfShedule'] = '';
                params.value.visitingHours[0]['fixedHour'] = '';
                numberInstance.value = 1;
            }
            // if (!value.visitingHours[0]['determineHour']) {
            //     numberInstance.value = 1;
            // }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => params.value,
        (value) => {
            if (
                value.publicity &&
                value.publicity.type &&
                value.publicity.type === publicity[0].value &&
                !value.isUsePropertyAddress
            ) {
                isAutocompleteAdress.value = true;
                console.log('zaaaaaaaaaaaaa\n', isAutocompleteAdress.value);
            } else {
                isAutocompleteAdress.value = false;
            }
        },
        { immediate: true, deep: true }
    );

    /**
     * new version
     */

    function changeHandler(value: any) {
        const firstKey = Object.keys(value)[0];

        switch (firstKey) {
            case 'publicity': {
                params.value['publicity'] = {
                    ...params.value['publicity'],
                    type: value.publicity,
                };
                // params.value.publicity = paramsData.value['publicity'];
                break;
            }
            case 'panelNumber':
            case 'isUsePropertyAddress':
            case 'deliveryAddress': {
                params.value['publicity'] = {
                    ...params.value['publicity'],
                    ...value,
                };
                break;
            }
            // case 'phone': {
            //     params.value.visitingHours = [
            //         {
            //             ...params.value.visitingHours[0],
            //             phone: "'" + value.phone + "'",
            //         },
            //     ];
            //     break;
            // }
            default: {
                paramsData.value = {
                    ...paramsData.value,
                    ...value,
                };
                params.value.visitingHours = [
                    {
                        ...params.value.visitingHours[0],
                        ...value,
                    },
                ];
                break;
            }
        }

        if (
            params.value.publicity &&
            params.value.publicity.type &&
            params.value.publicity.type === publicity[2].value
        ) {
            getUserInfluencer();
        }
        console.log(params.value, '>>>>>>>>>');
    }

    function getAgendaEvent(value: any) {
        params.value.visitingHours = [
            {
                ...params.value.visitingHours[0],
                ...value.data,
            },
        ];
    }

    async function getUserInfluencer() {
        if (!dataInfluancer.value) {
            try {
                isLoading.value = true;
                const data = await store.dispatch(
                    'AddProductModule/getUserInfluencer'
                );
                console.log('data influ >>>>>>>>>>', data);
                dataInfluancer.value = data;
            } catch (error) {
            } finally {
                isLoading.value = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        @apply flex w-full flex-col gap-[10px];

        &__card {
            @apply border rounded-[8px] flex gap-[20px] flex-col border-slate-200 p-[20px];
        }
        &__add-icon {
            @apply cursor-pointer;
        }
    }
    .content-50 {
        @apply w-[50%];
    }
    .date {
        &-container {
            @apply flex flex-row w-full justify-between;
            color: var(--color-gray-icon);
        }
        &-item {
            @apply w-[50%] p-5;
            border-radius: 8px;
        }
    }
    .content-100 {
        @apply w-[100%];
    }
    .modal {
        &-wrapper {
            border-radius: 8px;
        }
        &-container {
            @apply w-full flex-col;
            border-radius: 8px;
        }
        &-icon-success,
        &-text-header,
        &-text-content,
        &-action {
            @apply w-full flex;
            place-content: center;
        }
        &-text-header {
            @apply text-lg;
            font-weight: bold;
        }
        &-action {
            @apply mt-5;
        }
    }

    .visite {
        &__item {
            @apply flex gap-[20px] flex-col;
        }

        // &__date-container{
        //     @apply flex flex-row-reverse;
        // }

        &__date {
            @apply flex-1 mr-[20px];
        }

        &__content {
            @apply flex-1 flex flex-col gap-[10px];
        }

        &__divider {
            @apply text-slate-300;
        }

        &__header {
            @apply flex flex-col gap-[20px] mt-[20px];
        }

        &__title {
            @apply font-semibold;
        }

        &__body {
        }
        &__location {
            @apply flex gap-[20px] mt-[20px];
        }
        &__link {
            @apply flex gap-[5px] text-blue-500 mt-[20px] italic;
        }

        &__loader {
            @apply w-full h-full flex justify-center items-center;
        }
    }
</style>
