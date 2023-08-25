<template>
    <transition appear name="fade-page" mode="out-in">
        <loader v-if="!showMapComponent" />
        <div v-else class="find-map">
            <loader class="find-loadingState" v-if="showSearchLoading" />
            <div class="find-map__card">
                <Map
                    :key="mapkey"
                    :need-marker-event-handler="enableTouchEvent"
                    :handle-single-layer="true"
                    :is-need-public-cadaster="true"
                    :need-price-marker="showPrice"
                    :need-draw-control="true"
                    :need-draw-buttons="false"
                    :need-edit-control="false"
                    :need-polygon-layer="true"
                    :need-marker-layer="showmarkers"
                    :focus-position="coordsToFocusOn"
                    :markers-coordinates="[coordsToFocusOn.position]"
                    :marker-custom-coordinates="mapData"
                    :polygon-layer-color="'red'"
                    :polygon-coordinates="polygons"
                    :enable-polygon-drawer="polygonDrawerState"
                    :custom-polygon-drawer-label="customPolygonDrawerLabel"
                    :custom-marker-drawer-label="'Selectionner un bien'"
                    :isinteractive-public-cadaster="true"
                    :control-config="{
                        rectangle: false,
                        circle: false,
                        marker: false,
                        polyline: false,
                        circlemarker: false,
                    }"
                    @on-polygon-created="onPolygonCreated"
                    @touched="MapElementEventHandler"
                />
            </div>
            <div class="find-map__form">
                <Button
                    type-button="gray"
                    class="btn find-map__btn--list"
                    @click="hideMap"
                >
                    <ArrowBack />
                    <template class="mobile-hide"> Retour </template>
                </Button>
                <Input
                    :icon-field="true"
                    icon-name="MapMarkerLine"
                    id="addressMap"
                    placeholder="Adresse"
                    name-input="addressMap"
                />
                <div class="find-map__btn"></div>
            </div>

            <Modal
                :is-show-modal="visible"
                :closable="true"
                @cancel="closeActionModal"
            >
                <!-- <template v-if="showInterestMArkerForm" #content>
                    <div class="modal-container">
                        <div>
                            <Input
                                label="Nom de l'alerte : "
                                @input="setMarkerName"
                                :name-input="'name'"
                            />
                        </div>
                        <div class="modal-action">
                            <Button @click="createAlert">
                                Creer l'alerte
                            </Button>
                            <Button @click="closeActionModal">
                                Annuler
                            </Button>
                        </div>
                    </div>
                </template> -->
                <template #content>
                    <div class="modal-container">
                        <div class="">
                            <Paragraphe
                                v-if="isOwnerMember"
                                class="modal-info-success"
                            >
                                Le propriétaire est membre de l'application.
                            </Paragraphe>
                            <Paragraphe v-else class="modal-info-warn">
                                Le propriétaire n'est pas membre de
                                l'application.
                            </Paragraphe>
                        </div>
                        <div class="modal-action">
                            <Tooltip
                                placement="top"
                                title="Notifier le propriétaire pour votre intêret pour son bien une fois inscrit dans l'application."
                            >
                                <Button @click="createAlert"
                                    >Marquer mon intêret</Button
                                >
                            </Tooltip>
                            <Tooltip
                                placement="top"
                                title="Faire une offre sur le bien sélectionner et notifier le propriétaire une fois membre de l'application."
                            >
                                <Button v-if="!isSector" @click="makeOffer"
                                    >Faire une offre</Button
                                >
                            </Tooltip>
                            <Button @click="closeActionModal"> Fermer </Button>
                        </div>
                    </div>
                </template>
            </Modal>

            <!-- <PropertyCard 
                v-if="showPropertyCard && props.requestOrigin === 'find'" 
                :data="propertyDetails"
                @close="hidePropertyCard"
            />    -->

            <div v-if="showPropertyCard" class="find-map__detail">
                <Icon
                    icon-name="Close"
                    class="find-map__detail--close"
                    @click="hidePropertyCard"
                />
                <ProductCard
                    :DataCard="propertyDetails"
                    :key="propertyDetails.id"
                    @moreInfo="$emit('moreInfo')"
                    @on-handle-product="gotoItsDetail"
                />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import PropertyCard from './PropertyCard.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import useGeocode from '../composable/useGeocode';
    import useAutoComplete, {
        ExtractAdressComponents,
    } from '@/composables/useAutoComplete';
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Map from '@/components/section/map/index.vue';
    import { computed, onMounted, Ref, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';

    import { notification, message, Tooltip } from 'ant-design-vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { ICustomControlParams, ICoords } from '@/typings/interfaces';
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import Close from '@/components/Icon/Close.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    interface IinterstMark {
        name: string;
        coordinates: any[];
    }
    let interestMark: {} = {
        name: '',
        coordinates: [],
    };
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const polygons = ref<any[]>([]);
    const showSearchLoading = ref<boolean>(true);
    const polygonDrawerState = ref<boolean>(false);
    const isSector = ref<boolean>(false);
    const USECASE = {
        SEARCH: 0,
        INTEREST: 1,
    };
    interface IAddressComponets {
        long_name: string;
        short_name: string;
        types: Array<string>;
    }
    interface ICoordToFocusOn {
        position: ICoords;
        zoom?: number;
    }

    const emit = defineEmits<{
        (e: 'handlehideMap', value: any): void;
        (e: 'handleGoToDetail', value: any): void;
    }>();

    const props = defineProps({
        requestOrigin: {
            type: String,
            default: 'find',
        },
    });

    const mapkey = ref<number>(0);
    const params = route.params;
    const coordsToFocusOn = ref<ICoordToFocusOn>({
        position: {
            lng: 4.3571696,
            lat: 50.8476424,
        },
        zoom: 12,
    });
    const propertyDetails = ref<any>({});
    const showPropertyCard = ref<boolean>(false);
    const showPrice = ref<boolean>(false);
    const showmarkers = ref<boolean>(false);
    const customPolygonDrawerLabel = ref<string>('');
    const enableTouchEvent = ref<boolean>(false);
    const isOwnerMember = ref<boolean>(false);
    const showInterestMArkerForm = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const mapData = ref<Array<any>>([
        {
            lng: 4.3571696,
            lat: 50.8476424,
        },
    ]);
    const defaultLatLng = ref<ICoords>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
    });
    const currentLatLng = ref<ICoords>();

    const { geocodeResult } = useGeocode(currentLatLng as any);
    const showMapComponent = ref(false);
    const formater = Intl.NumberFormat('be-BE', {
        style: 'currency',
        currency: 'EUR',
    });
    let useCase = 0;
    let formattedPayload: any[] = [];
    let payload: { [key: string]: any };
    let cadasterOwner = ref<any>({});
    let thePropertyId: number = -1;
    // const customControls = ref<ICustomControlParams[]>([
    //     {
    //         label : "Dessiner sur la carte",
    //         callback : enablePolygonDrawer
    //     }
    // ]);
    const { fullLocationResult, autocompleteResult } = useAutoComplete(
        'addressMap',
        showMapComponent,
        true
    );
    setTimeout(() => {
        showMapComponent.value = true;
    }, 2500);

    // mapData.value = computed(() => {
    //     const val = store.getters['ProductsListModule/getMapData'];
    //     return val.map((item: any) => ({
    //         lat: item.lat,
    //         lng: item.lng,
    //         id: item.id,
    //     }));
    // }).value;

    onMounted(() => {
        console.log('DBG route', route);
        switch (props.requestOrigin) {
            case 'find':
                showPrice.value = true;
                showmarkers.value = true;
                polygonDrawerState.value = true;
                enableTouchEvent.value = false;
                customPolygonDrawerLabel.value = 'Dessiner sur la carte';
                break;
            case 'lease':
                showPrice.value = true;
                showmarkers.value = true;
                polygonDrawerState.value = true;
                enableTouchEvent.value = false;
                customPolygonDrawerLabel.value = 'Dessiner sur la carte';
                break;
            case 'interest':
                showPrice.value = false;
                showmarkers.value = true;
                mapData.value = [];
                enableTouchEvent.value = true;
                polygonDrawerState.value = true;
                customPolygonDrawerLabel.value =
                    'Tracer un secteur sur la carte';

                break;
            case 'interest-per-address':
                showPrice.value = false;
                showmarkers.value = true;
                mapData.value = [];
                polygonDrawerState.value = false;
                enableTouchEvent.value = false;
                break;
            default:
                break;
        }
        // if ( === 'find') {
        // enableTouchEvent.value = true;
        // }
        mapkey.value += 1;
        showSearchLoading.value = false;
    });
    function hideMap() {
        // emit('handlehideMap', 'map');
        router.back();
    }
    function resetPolygon() {
        polygons.value = [];
        // mapkey.value += 1;
    }
    function setMarkerName($event: any) {
        interestMark = {
            ...interestMark,
            ...$event,
        };
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
    function sendAlerte() {
        store.dispatch('FindPropertyModule/findProperties', {
            coordinates: formattedPayload,
        });
    }

    function closeActionModal() {
        visible.value = false;
        showInterestMArkerForm.value = false;
        isSector.value = false;
    }
    function hidePropertyCard() {
        showPropertyCard.value = false;
    }

    async function onPolygonCreated($event: any) {
        formattedPayload = [];
        resetPolygon();

        $event.latlng.forEach((item: any) => {
            formattedPayload.push(JSON.stringify(item) as never);
            polygons.value.push(item);
        });
        interestMark = {
            ...interestMark,
            ...{ coordinates: polygons.value },
        };
        // mapkey.value += 1;
        switch (props.requestOrigin) {
            case 'find':
                showSearchLoading.value = true;
                store.dispatch('FindPropertyModule/findProperties', {
                    coordinates: formattedPayload,
                    operationType: 'sale',
                });

                break;
            case 'lease':
                showSearchLoading.value = true;
                store.dispatch('FindPropertyModule/findProperties', {
                    coordinates: formattedPayload,
                    operationType: 'lease',
                });
                break;
            case 'interest':
                isSector.value = true;
                visible.value = true;
                showInterestMArkerForm.value = false;
                // cadasterOwner.value = await store.dispatch(
                //     'CollectiveGardenModule/checkCadastreOwner',
                //     polygons.value
                // );
                break;
        }
    }

    function showCreateAlertModal() {
        showInterestMArkerForm.value = true;
    }
    function createAlert() {
        store.commit('FindPropertyModule/setCriteria', interestMark);
        store.dispatch('FindPropertyModule/createAlerte', callback);
        visible.value = false;
        showInterestMArkerForm.value = false;
    }
    function makeOffer() {
        if (thePropertyId >= -1) {
            router.push(`/faire-une-offre/${thePropertyId}`);
        }
        isSector.value = false;
    }

    async function MapElementEventHandler($event: any) {
        if (!!$event.id) {
            // router.push(`/detail/${$event.id}`);
            store.dispatch('PropertyDetailModule/setPropertyData', $event.id);
        } else {
            showPropertyCard.value = false;
        }
        if (props.requestOrigin === 'interest') {
            coordsToFocusOn.value = {
                position: {
                    lat: $event.lat,
                    lng: $event.lng,
                },
                zoom: 18,
            };
            currentLatLng.value = {
                lat: $event.lat,
                lng: $event.lng,
            };
            cadasterOwner.value = await store.dispatch(
                'CollectiveGardenModule/checkCadastreOwner',
                $event
            );
        }
    }

    const gotoItsDetail = (id: any) => {
        emit('handleGoToDetail', id);
    };

    watch(
        () => geocodeResult.value,
        (v) => {
            if (!!v && !!v[0]?.formatted_address) {
                interestMark = {
                    ...interestMark,
                    address: v[0].formatted_address,
                };
            }
        },
        { immediate: true, deep: true }
    );
    /**
     * limit text in n words
     * params :
     * text : string -> raw text
     * count : number -> number of words to keep
     * return text :string -> filtered text
     */

    function limitTextNumber(text: string, count: number = 10) {
        const _text = text.split(' ');
        return _text.length <= count
            ? text
            : _text.splice(0, count).join(' ') + '...';
    }
    watch(
        () => store.getters['PropertyDetailModule/getPropertyDetail'],
        (value) => {
            if (!!value.data) {
                propertyDetails.value = value.data;
                console.log(propertyDetails.value, 'Property detail .value');
                // propertyDetails.value = {
                //     id: _value.id,
                //     address: _value.address,
                //     price: formater.format(_value.prices as number),
                //     details: limitTextNumber(_value.details as string, 10),
                //     disponibility: _value.disponibility,
                //     roomcount: _value.roomcount,
                //     image: `${import.meta.env.VITE_API_ROOT_URL}${
                //         _value.images[0].path
                //     }`,
                //     surface: _value.surface,
                //     propertyType: _value.propertyType.name,
                // };
                showPropertyCard.value = true;
            }
        },
        { immediate: true, deep: true }
    );
    watch(
        () => cadasterOwner.value,
        (v) => {
            if (
                (props.requestOrigin === 'interest' ||
                    props.requestOrigin === 'interest-per-address') &&
                !!v?.cadastres
            ) {
                polygons.value = [];
                visible.value = true;
                (v.cadastres as any[]).forEach((elt: any) => {
                    if (elt.polygon && Array.isArray(elt.polygon)) {
                        polygons.value.push(elt.polygon);
                        interestMark = {
                            ...interestMark,
                            ...{ coordinates: elt.polygon },
                        };
                    }
                });

                mapkey.value += 1;

                if (!!(v.users as any[]).length) {
                    isOwnerMember.value = true;
                    thePropertyId = v.users[0].thePropertyId;
                } else {
                    isOwnerMember.value = false;
                }
            }
        },
        { immediate: true, deep: true }
    );
    watch(
        () => fullLocationResult.value,
        (value) => {
            if (!!value) {
                if (
                    props.requestOrigin === 'find' ||
                    props.requestOrigin === 'lease'
                ) {
                    showSearchLoading.value = true;
                    if (props.requestOrigin === 'lease') {
                        payload = {
                            ...payload,
                            ...{ operationType: 'lease' },
                        };
                    } else {
                        payload = {
                            ...payload,
                            ...{ operationType: 'sale' },
                        };
                    }
                    store.dispatch('FindPropertyModule/findProperties', {
                        ...payload,
                        ...ExtractAdressComponents(value.address_components),
                    });
                }
            }
        },
        { immediate: true, deep: true }
    );
    watch(
        () => autocompleteResult.value,
        async (value) => {
            if (!!value) {
                if (
                    props.requestOrigin !== 'find' &&
                    props.requestOrigin !== 'lease' &&
                    !!value.lat &&
                    !!value.lng
                ) {
                    coordsToFocusOn.value = {
                        position: {
                            lat: value.lat,
                            lng: value.lng,
                        },
                        zoom: 18,
                    };
                    mapkey.value += 1;
                }
                if (props.requestOrigin === 'interest-per-address') {
                    cadasterOwner.value = await store.dispatch(
                        'CollectiveGardenModule/checkCadastreOwner',
                        {
                            lat: value.lat,
                            lng: value.lng,
                        }
                    );
                }
            }
        },
        { immediate: true, deep: true }
    );
    // watch(
    //     () => polygonDrawerState.value,
    //     (value) => {
    //         mapkey.value += 1;
    //     }
    // );
    watch(
        () => store.getters['ProductsListModule/getMapData'],
        (value) => {
            mapData.value = [];
            value.forEach((item: any, index: number) => {
                mapData.value.push({
                    lat: item.lat,
                    lng: item.lng,
                    prices: formater.format(item.prices as number),
                    activeClass: '',
                    id: item.id,
                });
            });
            mapkey.value += 1;
            showSearchLoading.value = false;
        },
        { immediate: true }
    );

    watch(
        () => props.requestOrigin,
        (v) => {},
        { immediate: true }
    );
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    #addressMap {
        width: 100%;
        border: 1px solid var(--color-stroke-gray);
        padding: 10px;
        border-radius: 4px;
    }
    .find-map {
        :deep() {
            .leaflet-google-mutant {
                z-index: 1 !important;
            }
            .custom-loader {
                z-index: 1001;
                background-color: #f2f2f2c9;
            }
        }
        @apply relative;
        &__card {
            height: calc(100vh - 63px);
        }
        &__form {
            @apply w-full absolute top-[10px] flex items-center gap-[10px] pl-[56px] pr-[14px] z-[999];
            @screen md {
                @apply flex flex-row justify-between top-[32px] pl-[74px] pr-[32px];
            }
            &:deep() {
                .custom-input__fields {
                    @apply w-full;
                    // @screen md {
                    //     width: calc(100% - 359px);
                    // }
                    @apply mb-0;
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
        &__btn {
            @apply hidden;
            @screen md {
                @apply w-[50%] flex items-center gap-[10px] justify-end text-sm;
            }

            &--mobile {
                @apply w-full absolute bottom-[18px] flex flex-col items-center justify-center z-[999] gap-[10px] px-[14px];
                @screen sm {
                    @apply flex-row;
                }
                @screen md {
                    @apply hidden;
                }
                .btn {
                    @apply w-full;
                    &:deep() {
                        button {
                            @apply w-full;
                        }
                    }
                }
            }
            &--interest {
                @apply hidden;
                @screen md {
                    @apply w-full absolute bottom-[18px] flex flex-col items-center justify-center z-[999] gap-[10px] px-[14px];
                }
                .btn {
                    @apply w-full;
                    &:deep() {
                        button {
                            @apply w-full;
                        }
                    }
                }
            }
        }
        &__detail {
            width: calc(100% - 20px);
            @apply max-w-[300px] absolute left-0 bottom-0 z-[1000] m-[10px];
            &--close {
                box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1254901961);
                @apply absolute top-[-4px] right-[-4px] cursor-pointer flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white transition-all;
                &:hover {
                    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3137254902);
                    @apply transition-all;
                }
            }
            &:deep() {
                .card {
                    max-height: calc(100vh - 130px);
                    @apply m-0 overflow-y-auto;
                    @include scrollbar;
                }
            }
        }
        &:deep() {
            button {
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
            }
        }
    }
    .modal {
        &-container {
        }
        &-action {
            @apply pt-2 flex flex-row justify-end gap-2;
        }
        &-info {
            &-warn {
                @apply bg-[var(--color-light-warn)] p-3 rounded-[4px] mb-5;
            }
            &-success {
                @apply bg-[var(--color-light-success)] p-3 rounded-[4px] mb-5;
            }
        }
    }
    .mobile {
        &-hide {
            display: none;
            @apply py-10;
            @screen md {
                @apply py-1;
                display: inline;
            }
        }
    }

    .fade-page-enter-active,
    .fade-page-leave-active {
        transition: all 0.25s ease;
        visibility: hidden;
    }

    .fade-page-enter-from,
    .fade-page-leave-to {
        opacity: 0;
        visibility: visible;
    }
    :deep {
        .leaflet-top.leaflet-right {
            @apply px-5 w-full text-base;

            top: auto;
            bottom: 10px;
            button {
                @apply w-full;
            }
        }
        @screen md {
            .leaflet-top.leaflet-right {
                @apply w-auto text-sm;
                top: 32px;
                bottom: auto;
            }
        }
        .leaflet-top .leaflet-control {
            @apply text-[14px] m-0 p-[5px] h-[38px];
            @screen md {
                @apply px-[20px];
            }
        }
    }
</style>
