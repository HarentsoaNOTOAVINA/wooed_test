<template>
    <div class="filter-container" ref="outside">
        <template v-if="props.operationType !== 'lease'">
            <transition name="fade-filter" appear>
                <div class="filter__icon">
                    <div
                        @click="handleShowFilter()"
                        class="filter__icon-container"
                    >
                        <span> Filtres </span>
                        <Icon icon-name="Filter" />
                    </div>
                </div>
            </transition>
            <transition name="fade-step" appear>
                <div v-show="isDisplayFilterCard" class="spec__filter">
                    <div class="spec__filter__content">
                        <Icon
                            v-if="isDisplayFilterCard"
                            icon-name="Close"
                            class="spec__filter-close"
                            @click="isDisplayFilterCard = false"
                        />
                        <div class="spec__filter__content-wrap">
                            <div class="spec__filter__address">
                                <label for="address">Filtrer par adresse</label>
                                <!-- <div class="input_address">
                                    <MarkerIcon /> -->
                                <!-- <input
                                            @input="handleEmptyAddr"
                                            id="address"
                                            name="addressFilter"
                                            placeholder="Entrez une adresse"
                                            label=""
                                            :value="props.defaultAddress"
                                        /> -->
                                <!-- <input
                                        id="address"
                                        name="addressFilter"
                                        placeholder="Entrez une adresse"
                                        label=""
                                        :value="addressInput"
                                    />
                                </div> -->
                                <Input
                                    :icon-field="true"
                                    icon-name="MapMarkerLine"
                                    id="address"
                                    placeholder="Entrez une adresse"
                                    name-input="address"
                                    :vmodel="defaultCriteria.addressFilter"
                                />
                            </div>

                            <Select
                                :value="params?.propertyType"
                                :disabled="!propertyTypeOptions?.length"
                                @change-select="handleSelectSpecFilter"
                                label="Filtrer par type de bien"
                                placeholder="Selectionnez"
                                name="propertyType"
                                :options="propertyTypeOptions"
                                :defaultValue="defaultCriteria.propertyType"
                            />
                            <Select
                                :value="params?.locationType"
                                @change-select="handleSelectSpecFilter"
                                label="Filtre par type de location"
                                placeholder="Selectionnez"
                                name="locationType"
                                :options="locationType"
                                v-if="isLease"
                                :defaultValue="defaultCriteria.locationType"
                            />

                            <template
                                v-if="
                                    showTemplateAccommodationTourist && isLease
                                "
                            >
                                <div
                                    class="tourist_accommodation"
                                    v-for="(
                                        field, index
                                    ) in dataAccomodationTourist"
                                >
                                    <div
                                        v-if="
                                            field.type === 'number' &&
                                            (params.locationType ==
                                                field.condition ||
                                                defaultCriteria.locationType ==
                                                    field.condition)
                                        "
                                        class="find__item-form"
                                    >
                                        <label for="field.name">{{
                                            field.label
                                        }}</label>
                                        <Input
                                            :input-type="field.type"
                                            :name-input="
                                                field.name
                                                    ? field.name
                                                    : 'nameDefault'
                                            "
                                            :placeholder="field.placeholder"
                                            @input="handleDataAccommodation"
                                            :vmodel="
                                                defaultCriteria[field.name]
                                            "
                                        />
                                    </div>
                                    <div
                                        v-if="
                                            field.type === 'date' &&
                                            (params.locationType ==
                                                field.condition ||
                                                defaultCriteria.locationType ==
                                                    field.condition)
                                        "
                                        class="find__item-form"
                                    >
                                        <label for="field.name">{{
                                            field.label
                                        }}</label>
                                        <InputDate
                                            :name="
                                                field.name
                                                    ? field.name
                                                    : 'selectDefault'
                                            "
                                            :format="'DD/MM/YYYY'"
                                            :placeholder="field.placeholder"
                                            @handle-date-format-en="
                                                handleDataAccommodation
                                            "
                                            :value="formatDate(defaultCriteria[field.name])"
                                        />
                                    </div>
                                </div>
                            </template>

                            <Select
                                :value="params?.priceRangeFilter"
                                @change-select="handleSelectSpecFilter"
                                label="Filtrer par tranche de prix"
                                placeholder="Selectionnez"
                                name="Price"
                                :options="prices"
                                :defaultValue="
                                    defaultCriteria.minPrice &&
                                    defaultCriteria.maxPrice
                                        ? defaultCriteria.minPrice +
                                          '-' +
                                          defaultCriteria.maxPrice
                                        : null
                                "
                            />
                            <MinMax
                                v-if="showRoomCountField"
                                label="Nombre de chambres"
                                unity=""
                                :names="{
                                    min: 'roomCountMin',
                                    max: 'roomCountMax',
                                }"
                                @change="handleSelectSpecFilter"
                                class="py-0"
                            />

                            <Switch
                                item-label="Acquisition collaboratives"
                                name="collaborativeAcquisitionFilter"
                                @handle-switch="handleSelectSpecFilter"
                            />
                            <div class="spec__filter__button">
                                <Button
                                    class="reset__btn"
                                    @click="handleShowMap"
                                    type-button="border"
                                >
                                    Rechercher sur la carte
                                </Button>
                                <Button
                                    class="reset__btn"
                                    @click="handleSearch"
                                    type-button="secondary"
                                >
                                    <!-- <LoadingButton
                                        size="xs"
                                        v-if="loadingFinish"
                                    /> -->
                                    Rechercher dans la liste
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </template>
    </div>
</template>

<script setup lang="ts">
    import MinMax from '@/components/Common/MinMax/MinMax.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { ref, onMounted, watch, onUnmounted, onBeforeMount } from 'vue';
    import Input from '@/components/Common/Input/Input.vue';
    import AddProductService from '@/services/addProductService';
    import useAutoComplete, {
        ExtractAdressComponents,
    } from '@/composables/useAutoComplete';
    import MarkerIcon from '@/components/Icon/MarkerIcon.vue';
    import Refresh from '@/components/Icon/Refresh.vue';
    import Close from '@/components/Icon/Close.vue';
    import FilterIcon from '@/components/Icon/Filter.vue';
    import { Affix as AAffix } from 'ant-design-vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { useStore } from 'vuex';
    import { initPriceOptions } from '@/utils/price';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import router from '@/routes';
    import { useRoute } from 'vue-router';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';

    const emit = defineEmits<{
        (e: 'on-filter', value: any): void;
        (e: 'on-filter-address', value: any): void;
        (e: 'on-reset-filter'): void;
        (e: 'change-select', value: any): void;
        (e: 'handleShowMap', payload: string): void;
    }>();
    const props = defineProps({
        operationType: {
            type: String,
            default: '',
        },
        defaultAddress: {
            type: String,
            default: '',
        },
    });

    const store = useStore();
    const route = useRoute();
    const habitable: number[] = [];
    const showRoomCountField = ref<boolean>(false);
    const isDisplayFilterCard = ref<boolean>(false);
    const isDisplayFilterIcon = ref<boolean>(false);
    const params = ref<any>({ operationType: route.params.operationType });
    const { fullLocationResult } = useAutoComplete('address');
    const mediaScreen = ref<number>(window.innerWidth);
    const outside = ref<HTMLElement>();
    const prices = ref<any[]>([]);
    const formatter = new Intl.NumberFormat('fr-Fr');
    const addressInput = ref<string>(props.defaultAddress);
    const propertyTypeOptions = ref<any[]>([{ label: 'N/A', value: '' }]);
    let locationType = ref<any[]>([{ label: 'Aucun', value: '' }]);
    let showTemplateAccommodationTourist = ref<boolean>(false);
    let isLease = ref<boolean>(false);
    const priceRange = [
        {
            value: JSON.stringify(null),
            label: 'N/A',
        },
        {
            value: JSON.stringify([800, 1000]), // pour le test
            label: '50000 € - 100000 €',
        },
        {
            value: JSON.stringify([100000, 200000]),
            label: '100000 € - 200000 €',
        },
    ];
    let dataAccomodationTourist: any = [
        {
            label: 'Adultes(13 ans et +)',
            name: 'adultNumber',
            type: 'number',
            placeholder: 0,
            fill: false,
            condition: 'Hébergement touristique',
        },
        {
            label: 'Enfant(2 à 12ans)',
            name: 'childrenNumber',
            type: 'number',
            placeholder: 0,
            fill: false,
            condition: 'Hébergement touristique',
        },
        {
            label: 'Bébés(2 à 12ans)',
            name: 'babyNumber',
            type: 'number',
            placeholder: 0,
            fill: false,
            condition: 'Hébergement touristique',
        },
        {
            label: "Date d'arrivée",
            name: 'arrivalDate',
            type: 'date',
            placeholder: new Date().toLocaleString('be-Be'),
            fill: false,
            condition: 'Hébergement touristique',
        },
        {
            label: 'Date de départ',
            name: 'departureDate',
            type: 'date',
            placeholder: new Date().toLocaleString('be-Be'),
            fill: true,
            condition: 'Hébergement touristique',
        },
    ];
    const defaultCriteria = ref<any>();
    const loadingFinish = ref<boolean>(false);

    //======= lifecycle =========
    onBeforeMount(() => {
        store.dispatch('FindPropertyModule/fetchPropertyTypes');
        store.getters['ProductsListModule/getOperationType'] === 'lease'
            ? getLocationType()
            : null;
        if (route.params.operationType === 'sale') {
            store.dispatch('AddProductModule/getProperyType', 'sell');
        } else {
            store.dispatch('AddProductModule/getProperyType');
        }
    });
    onMounted(() => {
        if (route.params.operationType === 'sale') {
            prices.value = initPriceOptions();
            prices.value.unshift({
                label: `Moins de ${formatter.format(50000)} EUR`,
                value: '0-50000',
            });
            prices.value.push({
                label: `1 000 000 - 2 000 000 EUR`,
                value: '1000000-2000000',
            });
            prices.value.push({
                label: `Plus de ${formatter.format(2000000)} EUR`,
                value: '2000000-',
            });
        } else {
            prices.value = initPriceOptions(100, 500, 10000);
        }
        // ajouter l'écouteur d'événements pour détecter les clics à l'extérieur de l'élément
        document.addEventListener('click', handleClickOutside);
        handleSearch();
        if (
            defaultCriteria.value.propertyType &&
            !habitable.includes(defaultCriteria.value.propertyType)
        ) {
            showRoomCountField.value = true;
        }
        if (defaultCriteria.value.locationType === 'Hébergement touristique') {
            showTemplateAccommodationTourist.value = true;
        }
    });

    // retirer l'écouteur d'événements lorsque le composant est démonté
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
    //=============================

    async function getLocationType() {
        isLease.value = true;
        locationType.value = await store.dispatch(
            'FindPropertyModule/fetchLocationTypes'
        );
    }

    function handleSelectSpecFilter(obj: any) {
        let value = {};
        if (Object.keys(obj)[0] === 'Price') {
            const res = (Object.values(obj)[0] as string).split('-');
            params.value = {
                ...params.value,
                minPrice: res[0],
                maxPrice: res[1],
            };
        } else {
            params.value = {
                ...params.value,
                ...obj,
            };

            console.log(params.value, 'Params && value');
        }
        if (
            params.value?.propertyType &&
            habitable.includes(params.value.propertyType)
        ) {
            showRoomCountField.value = false;
        } else {
            showRoomCountField.value = true;
        }
        Object.values(obj)[0] == 'Hébergement touristique'
            ? (showTemplateAccommodationTourist.value = true)
            : (showTemplateAccommodationTourist.value = false);

        emit('on-filter', obj);
    }

    function handleDataAccommodation(obj: any) {
        params.value = {
            ...params.value,
            ...obj,
        };
    }

    function handleEmptyAddr(evt: any) {
        params.value = {
            ...params.value,
            ...evt,
        };
        const [_, v] = Object.entries(evt)[0];
        !v && emit('on-filter-address', v);
    }

    function handleSearch() {
        store.dispatch('FindPropertyModule/findProperties', params.value);
    }

    // function onResetFilter() {
    //     params.value = {
    //         addressFilter: null,
    //         propertyTypeFilter: null,
    //         priceRangeFilter: null,
    //     };
    //     emit('on-reset-filter');
    // }

    // fonction appelée lorsque l'utilisateur clique à l'extérieur de l'élément
    const handleClickOutside = (event: MouseEvent) => {
        const targetNode = event.target as Node;
        if (outside.value && !outside.value.contains(targetNode)) {
            // fermer votre bloc ici
            isDisplayFilterCard.value = false;
        }
    };

    function handleShowFilter() {
        isDisplayFilterCard.value = !isDisplayFilterCard.value;
    }

    watch(
        () => fullLocationResult.value,
        (ac: any) => {
            if (!!ac && !!ac.address_components) {
                params.value = {
                    country: null,
                    region: null,
                    municipality: null,
                    road: null,
                };
                addressInput.value = ac.formatted_address;
                params.value = {
                    ...params.value,
                    ...ExtractAdressComponents(ac.address_components),
                };
            }

            // address_components.forEach((elt: any) => {
            //     if (elt.types.includes('country')) {
            //         params.value.country = elt.short_name;
            //     } else if (elt.types.includes('administrative_area_level_1')) {
            //         params.value.region = elt.short_name;
            //     } else if (elt.types.includes('locality')) {
            //         params.value.municipality = elt.short_name;
            //     } else if (elt.types.includes('route')) {
            //         params.value.road = elt.short_name;
            //     }
            // });
        },
        { immediate: true, deep: true }
    );

    watch(
        // () => store.getters['FindPropertyModule/getPropertyTypes'],
        () => store.getters['AddProductModule/getPropertyType'],
        (value) => {
            propertyTypeOptions.value = value;

            value.forEach((elt: any) => {
                const _ = [
                    'potager - terrain à cultiver',
                    'emplacement publicitaire',
                    'garage',
                    'terrain',
                    'emplacement de parking',
                ];
                if (_.includes((elt.name as string).toLocaleLowerCase())) {
                    habitable.push(elt.id);
                }
            });
        },
        { immediate: true }
    );

    watch(
        () => store.getters['FindPropertyModule/getCriteria'],
        (value) => {
            params.value = {
                ...params.value,
                ...{ addressFilter: value.formatedAddress },
            };
            defaultCriteria.value = value;
            console.log('objecttttt', defaultCriteria.value);
            console.log('teste value', value);
        },
        { immediate: true, deep: true }
    );

    function handleShowMap() {
        store.dispatch('FindPropertyModule/findProperties', params.value);

        emit('handleShowMap', 'find');
    }

    const formatDate = (value: string) => {
        if (!value) {
            return ''; // Gérer les cas où la valeur est vide
        }

        const parts = value.split('-'); // Diviser la valeur en parties (jour, mois, année)
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        // Formater les parties pour ajouter un zéro devant si nécessaire
        const formattedDay = day.length === 1 ? `0${day}` : day;
        const formattedMonth = month.length === 1 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
    };
</script>

<style lang="scss" scoped>
    @import '@/style.scss';

    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.3s ease-in-out;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }
    // .filter__icon {
    //     @screen sm {
    //         @apply hidden;
    //     }
    //     &__container {
    //         @apply w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-secondary;
    //         &:deep() {
    //             path {
    //                 fill: white;
    //             }
    //         }
    //     }
    // }
    .filter {
        &__icon {
            @apply font-[600] flex justify-end bg-white rounded-[8px] px-[14px] py-[4px];
            @screen md {
                @apply hidden;
            }
            &-container {
                @apply flex gap-[8px] bg-gray py-[4px] px-[14px] rounded-[24px] cursor-pointer;
                &:hover,
                &:hover:active {
                    @include hoverButtonDark;
                }
            }
        }
    }
    .filter-container {
        @apply relative z-[1];
    }
    .spec__filter {
        // @apply top-[74px] left-0 w-[321px] z-[1];
        max-width: 321px;
        width: calc(100vw - 20px);
        @apply fixed left-[10px] z-[1] mt-[15px];
        @screen sm {
            @apply left-auto;
        }
        @screen md {
            display: block !important;
            @apply static w-[321px] mt-0;
        }
        &:deep() {
            label {
                @apply text-grayIcon font-[600];
            }
            .custom-select__wrapper {
                @apply mb-0;
            }
        }
        &__content-wrap {
            max-height: calc(100vh - 235px);
            @apply relative flex flex-col gap-[18px] overflow-y-auto pr-[10px] mr-[-10px];
            @include scrollbar;
            @screen md {
                max-height: calc(100vh - 198px);
            }
        }
        &-close {
            box-shadow: 0px 5px 10px 0px #00000020;
            @apply flex justify-center items-center absolute top-[-4px] right-[-4px] w-[20px] h-[20px] rounded-full cursor-pointer bg-white transition-all;
            &:hover {
                box-shadow: 0px 5px 10px 0px #00000050;
                @apply transition-all;
                &:deep() {
                    svg path {
                        @apply fill-primary;
                    }
                }
            }
        }
        .right-icon {
            @apply absolute cursor-pointer top-[10px] right-[10px];
            @screen md {
                @apply hidden;
            }
        }
        &__button {
            @apply w-full flex flex-col gap-[14px];
        }
        .reset__btn {
            &:deep() {
                div,
                button {
                    @apply w-full;
                }
            }
        }
        .valid__btn {
            @screen md {
                @apply hidden;
            }
            &:deep() {
                button {
                    @apply w-full py-[8px];
                }
            }
        }
        &__content {
            box-shadow: 0px 5px 10px 0px #00000050;
            @apply mr-0 p-[14px] bg-white rounded-[12px] relative;
            @screen md {
                @apply shadow-none;
            }
        }
        &__bottom {
            // @apply flex w-full gap-x-[20px];
            * {
                @apply w-full;
            }
        }
        &__address {
            @apply w-full flex flex-col gap-[8px];
            label {
                color: var(--color-gray-icon);
                font-size: 14px;
                // font-weight: 500;
            }
            .input_address {
                @apply flex flex-row mt-2 rounded-[4px] gap-1 items-center;
                border: 1px solid var(--color-stroke-gray);
                input {
                    @apply w-full py-2;
                }
            }
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .custom-input__fields {
                    .ant-input {
                        @apply pl-[34px] pr-[11px];
                    }
                    .unit {
                        @apply left-[11px] w-max;
                    }
                    .icon {
                        svg path {
                            @apply fill-grayIcon;
                        }
                    }
                }
            }
        }
    }

    .find__item-form {
        @apply flex flex-col gap-[8px];
        &:deep() {
            .ant-space {
                gap: 0 !important;
            }
        }
    }
</style>
