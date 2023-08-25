<template>
    <Loader v-if="loadMap" />
    <MainContainer v-else class="flex flex-col gap-2 md:gap-4">
        <div class="resultPage-header">
            <BreadCrumb
                :items="breadcrumbListsData"
                @handle-return="returnClick"
                class="mainCard__breadcrumb"
            />
            <div class="flex flex-row justify-between">
                <SpecFilter
                    :default-address="props.defaultAddress"
                    @handle-show-map="handleShowMap"
                    class="resultPage__filter-item md:hidden"
                />
                <Select
                    class="__custom-select"
                    name="priceFilter"
                    placeholder="Trier"
                    :options="options"
                    @change-select="handleSelect"
                />
            </div>
        </div>
        <div class="w-full resultPage__section">
            <div class="resultPage__filter hidden md:block">
                <SpecFilter
                    :default-address="props.defaultAddress"
                    @handle-show-map="handleShowMap"
                    class="resultPage__filter-item"
                />
            </div>
            <MainCard class="list resultPage__container">
                <div class="list__container">
                    <Loader v-if="loadresult" />
                    <TransitionComponent v-else>
                        <div
                            :class="{ empty__container: !dataCard.length }"
                            class="list_and_filter__container"
                        >
                            <CardWrapper
                                v-if="!dataCard.length"
                                class="empty__wrapper"
                            >
                                <Empty
                                    class="list__container-empty"
                                    :class="{ empty: !dataCard.length }"
                                >
                                    <template #description>
                                        <div class="flex flex-col gap-[14px]">
                                            <span class="text-grayIcon">
                                                Pas de resulat
                                            </span>
                                            <Button
                                                width="100%"
                                                @click="createAlerte"
                                            >
                                                Creer un alerte
                                            </Button>
                                        </div>
                                    </template>
                                </Empty>
                            </CardWrapper>
                            <div
                                v-else
                                class="list__container-product__container"
                            >
                                <ListProducts
                                    class="list__container-product"
                                    @on-handle-product="getProductDetail"
                                    :DataCard="dataCard"
                                    :loading="isLoading"
                                    :need-mark-interest="true"
                                />
                            </div>
                        </div>
                    </TransitionComponent>
                </div>
            </MainCard>
        </div>
    </MainContainer>
</template>

<script setup lang="ts">
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
    import {
        onMounted,
        provide,
        reactive,
        ref,
        computed,
        watch,
        onBeforeMount,
    } from 'vue';
    import ProductInfo from './ProductInfo/ProductInfo.vue';
    import Map from '@/components/section/map/index.vue';
    import { Store, useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    // import { useGoogleMapAPI } from '@/composables/google-maps-api';
    import { Empty, notification } from 'ant-design-vue';
    import { useRouter } from 'vue-router';
    import ProductsListService from '@/services/productsListService';
    import SpecFilter from '@/pages/product-list/Filter/SpecFilter.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    const router = useRouter();

    const selectedGarden = computed(
        () => store.getters['CollectiveGardenModule/getSelectedGarden']
    );

    let __from = 'sale';

    let breadcrumbListsData = [
        {
            label: 'Trouver un bien',
            url: '/',
        },
        {
            label: 'Résultats',
        },
    ];
    const options = ref<any[]>([
        {
            value: 'Prix asc',
            label: 'Prix asc',
        },
        {
            value: 'Prix dsc',
            label: 'Prix dsc',
        },
    ]);

    const props = defineProps({
        defaultAddress: {
            type: String,
            default: '',
        },
    });

    const emit = defineEmits<{
        (e: 'handleShowMap', payload: string): void;
    }>();

    const store: Store<any> = useStore();
    let dataCard = ref<any>([]);
    const initDataCard = ref<any>([]);
    const filterBag = ref<any>({
        propertyType: '',
        priceRange: null,
        region: '',
        country: '',
        municipality: '',
        roomcount: 0,
        collaborativeAcquisition: false,
    });
    let isShowCart = ref<boolean>(false);
    let isListCards = ref<boolean>(true);
    let isShowInfo = ref<boolean>(false);
    let singleData = reactive<any>({});
    const loadMap = ref<boolean>(true);
    const loadresult = ref<boolean>(true);
    let activeId = ref(0);
    let mapData = computed(
        () => store.getters['ProductsListModule/getMapData']
    );
    let operationType = computed(
        () => store.getters['ProductsListModule/getOperationType']
    );
    const isLoading = ref<boolean>(false);
    // ====== for spec filter =========
    const showCard = () => {
        isShowCart.value = false;
        isListCards.value = true;
        isShowInfo.value = false;
    };
    const getProductDetail = async (id: number) => {
        console.log(id);
        router.push({
            path: `detail/${id}`,
        });
    };
    provide('isInfo', isShowInfo);
    const showCart = () => {
        isShowCart.value = true;
        isListCards.value = false;
        isShowInfo.value = false;
    };
    const showInfo = () => {
        isShowInfo.value = true;
        isShowCart.value = false;
        isListCards.value = false;
    };
    const criteria = computed(
        () => store.getters['FindPropertyModule/getCriteria']
    );
    let filterObject = ref<object>({ isShowCart, isListCards, isShowInfo });

    provide('filterObject', filterObject);
    //=======================================

    function returnClick(value: any) {
        // emit('handleClickReturn', value);
    }
    function callback(success: boolean) {
        if (success) {
            notification.success({ message: 'Votre alerte a bien été créer' });
        } else {
            notification.error({
                message: "Oups! votre alerte n'a pas été créer. réessayez svp.",
            });
        }
    }
    function createAlerte() {
        store.dispatch('FindPropertyModule/createAlerte', callback);
    }

    watch(
        () => store.getters['ProductsListModule/getProductsListData'],
        async (v) => {
            dataCard.value = v;
            if (!loadMap.value) {
                loadresult.value = false;
            }
        },
        { immediate: true, deep: true }
    );

    onBeforeMount(() => {
        dataCard.value = [];
    });
    onMounted(async () => {
        dataCard.value = computed(() => {
            return store.getters['FindPropertyModule/getPropertyLists'];
        }).value;

        initDataCard.value = dataCard.value;
        loadMap.value = false;
        __from = criteria.value.operationType;
        setTimeout(() => {
            loadresult.value = false;
        }, 2000);
    });

    watch(
        () => filterBag.value,
        (v) => {
            /**
             * triage et persitence des tris
             */
            const {
                propertyType,
                priceRange,
                country,
                region,
                municipality,
                roomcount,
                collaborativeAcquisition,
            } = v;
            function _condition(toCheck: any, value: any, spec: boolean) {
                if (toCheck) {
                    if (spec) {
                        if (Array.isArray(JSON.parse(toCheck))) {
                            const [min, max] = JSON.parse(toCheck);
                            return value >= +min && value < +max;
                        } else {
                            return toCheck === toCheck;
                        }
                    } else {
                        return toCheck === value;
                    }
                } else {
                    return toCheck === toCheck;
                }
            }
            let tmp = [...initDataCard.value];
            tmp = tmp
                .filter((property: any) =>
                    _condition(propertyType, property.propertyType.name, false)
                )
                .filter((property: any) =>
                    _condition(priceRange, +property.prices, true)
                )
                .filter((property: any) =>
                    _condition(country, property.codeCountry, false)
                )
                .filter((property: any) =>
                    _condition(region, property.codeRegion, false)
                )
                .filter((property: any) =>
                    _condition(municipality, property.codeMunicipality, false)
                )
                .filter((property: any) =>
                    _condition(+roomcount, +property.roomcount, false)
                )
                .filter((property: any) =>
                    _condition(
                        collaborativeAcquisition,
                        property.collaborativeAcquisition,
                        false
                    )
                );
            dataCard.value = tmp;
            store.dispatch('ProductsListModule/setData', dataCard.value);
        },
        { deep: true, immediate: true }
    );

    const handleSelect = (value: any): void => {
        isListCards.value = false;
        if (value.priceFilter === 'Prix asc') {
            dataCard.value.sort((a: any, b: any) => a.prices - b.prices);
        } else {
            dataCard.value.sort((a: any, b: any) => b.prices - a.prices);
        }
        isListCards.value = true;
    };

    function handleSpecFilter(strFilter: any) {
        const [context, filterValue] = Object.entries(strFilter)[0];
        switch (context) {
            case 'propertyTypeFilter':
                filterBag.value.propertyType = filterValue;
                break;
            case 'priceRangeFilter':
                filterBag.value.priceRange = filterValue;
                break;
            case 'roomCountFilter':
                filterBag.value.roomcount = filterValue;
                break;
            case 'collaborativeAcquisitionFilter':
                filterBag.value.collaborativeAcquisition = filterValue;
                break;
        }
    }

    function handleAddressFilter(addressDetails: any) {
        filterBag.value = { ...addressDetails };
    }
    function fetchAll() {
        isLoading.value = true;
        const data = computed(
            () => store.getters['ProductsListModule/getProductsListData']
        );
        dataCard.value = [
            ...data.value.filter(
                (item: { status: null | string | number }) => item.status
            ),
        ];
        initDataCard.value = dataCard.value;
        isLoading.value = false;
    }

    async function locationFilter(name: string) {
        isLoading.value = true;
        const { data } = await ProductsListService.getProductsList({
            operationType: 'lease',
            locationType: name,
        });
        dataCard.value = [
            ...data.filter(
                (item: { status: null | string | number }) => item.status
            ),
        ];
        isLoading.value = false;
    }
    function onResetFilter() {
        filterBag.value = {
            propertyType: '',
            priceRange: null,
            region: '',
            country: '',
            municipality: '',
            roomcount: 0,
        };
    }
    watch(
        () => store.getters['FindPropertyModule/getCriteria'],
        (value) => {
            __from = value.operationType;
            breadcrumbListsData = [
                {
                    label:
                        __from === 'lease'
                            ? 'Trouver un bien en location'
                            : 'Trouver un bien',
                    url:
                        __from === 'lease'
                            ? `/trouver-un-bien-en-location`
                            : '/',
                },
                {
                    label: 'Résultats',
                },
            ];
        },
        { immediate: true, deep: true }
    );

    function handleShowMap() {
        emit('handleShowMap', 'find');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .resultPage {
        &-header {
            @apply mx-[15px] px-2 rounded-[8px]
                    flex flex-col justify-between bg-white
                    text-sm;
            @screen md {
                @apply container flex-row px-5;
            }

            :deep() {
                .__custom-select {
                    @screen md {
                        @apply m-[5px];
                    }
                    .ant-select {
                        @apply w-[150px] flex flex-row justify-end;
                        width: 50%;
                        @screen sm {
                            width: 100%;
                        }
                    }
                }
                .bread {
                    @apply px-0;
                }
                .filter__icon {
                    @apply px-[0px];
                }
                .spec__filte {
                    width: max-content;
                }
            }
        }
        &__section {
            @apply flex flex-col px-[15px] gap-y-[12px];
            @screen md {
                @apply flex-row gap-y-[12px] gap-x-[12px] mb-0 px-[0px] justify-between;
            }
            @screen lg {
                @apply flex-row gap-x-[12px] px-[0px] container;
            }
            @screen xl {
                @apply flex-row gap-x-[12px] px-[0px] container;
            }
        }
        &__filter {
            // @apply hidden;
            // @screen sm {
            //     @apply block;
            // }
            @apply h-[40px];
            @screen sm {
                @apply h-auto;
            }
            @screen md {
                min-height: calc(100vh - 94px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
            // &--mobile {
            //     @screen sm {
            //         @apply hidden;
            //     }
            // }
            &-item {
                @apply relative;
            }
            &:deep() {
                .filter__icon {
                    top: auto !important;
                }
                .ant-affix {
                    top: 0 !important;
                }
                .spec__filter__content {
                    @apply mr-0;
                }
            }
        }
        &__container {
            @apply px-0 mt-0 max-w-none w-full;
            &:deep() {
                .list__container-product {
                    .card {
                        border: solid 1px;
                        @apply border-gray;
                    }
                }
            }
        }
    }
    .list {
        &__container {
            // @apply h-[calc(100vh-22px)];
            @apply flex flex-col gap-4 h-full;
            .empty {
                &__container {
                    @apply h-full flex justify-center items-center;
                }
                &__wrapper {
                    @apply max-w-[400px] h-max;
                }
                // display: grid;
                // place-content: center;
                // @screen sm {
                //     @apply w-[70%];
                // }
            }
            &-product {
                @apply w-full grid grid-cols-1 gap-[12px] justify-items-center mb-[14px];
                @screen sm {
                    @apply grid-cols-2;
                }
                @screen md {
                    @apply grid-cols-1;
                }
                @media (min-width: 900px) {
                    @apply grid-cols-2;
                }
                @screen xl {
                    @apply grid-cols-3;
                }
                &__container {
                    @include scrollbar;
                    @apply w-full overflow-y-auto h-[calc(100vh-225px)] p-[7px] m-[-7px];
                    @screen md {
                        @apply h-[calc(100vh-185px)];
                    }
                }
            }
            &-filter {
                @apply hidden sm:hidden md:hidden lg:flex;
            }
            &-spinner {
                height: 70vh;
                font-size: 20px;
                @apply flex flex-col justify-center items-center;
            }
        }
        .my-map {
            height: 80vh;
            width: 100%;
            border-radius: 8px;
            z-index: 9;
        }
        &:deep() {
            .mainCard__items-wrap {
                @media (max-width: 767px) {
                    height: calc(100vh - 218px);
                    @apply overflow-y-auto;
                    @include scrollbar;
                }
            }
        }
    }
    .list_and_filter__container {
        @apply sm:flex;
    }
</style>
