<template>
    <div class="relativeInfo__map">
        <!-- loading maps -->
        <div v-if="loadingMap" class="address__map--loading">
            <Loader />
        </div>

        <!-- display maps -->
        <Map
            v-else
            :is-display-public-cadaster="true"
            :property-coord="(defaultLatLng as any)"
            :polygon-cluster="cadastreData"
            :is-replace-marker="true"
            @on-return-event-map-click="handleClickMap"
            class="relativeInfo__map--container"
        />

        <!-- display autocomplete -->
        <div class="relativeInfo__map--form">
            <Input
                :icon-field="true"
                icon-name="MapMarkerLine"
                id="address"
                placeholder="Adresse"
                :vmodel="locationParams.address"
                name-input="addressMap"
                @input="inputHandler"
            />
        </div>

        <!-- Modal information relative -->
        <ModalInformation
            :show-modal="isShowModal"
            @closeModal="isShowModal = false"
        />
    </div>
</template>

<script setup lang="ts">
    import Map from '@/components/section/MapSection/MapSection.vue';
    import { onMounted, ref, watch } from 'vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import { LatLng } from 'leaflet';
    import { useStore } from 'vuex';
    import Input from '@/components/Common/Input/Input.vue';
    import { useRouter } from 'vue-router';
    import useUserPosition from '@/composables/useUserPosition';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import useGeocode from '@/composables/useGeocode';
    import ModalInformation from './ModalInformation.vue';

    interface gm_ILocationResult {
        formatted_address: string;
        geometry: { location: { lat: number; lng: number } };
        address_components: Array<{
            long_name: string;
            short_name: string;
            types: Array<string>;
        }>;
    }

    interface ILocationParams {
        lat?: number | string;
        lng?: number | string;
        latitude?: number | string;
        longitude?: number | string;
        address?: string;
        country?: string;
        region?: string;
        municipality?: string;
        postalCode?: string | number;
        codeRegion?: string;
        codeMunicipality?: string;
        codeCountry?: string;
    }

    const store = useStore();
    const isShowModal = ref<boolean>(false);
    const cadastreData = ref<[]>([]);
    const loadingMap = ref<boolean>(true);
    const { userPosition } = useUserPosition();
    const { autocompleteResult } = useAutoComptetion('address');
    const currentLatLng = ref<ILocationParams>();
    const defaultLatLng = ref<ILocationParams>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
    });
    const { geocodeResult } = useGeocode(
        defaultLatLng as any,
        currentLatLng as any
    );
    const allPropertyType = ref<any>(
        store.getters['AddProductModule/getPropertyType']
    );
    const locationParams = ref<ILocationParams>({
        address: '',
        country: '',
        codeCountry: '',
        latitude: 0,
        longitude: 0,
        municipality: '',
        codeMunicipality: '',
        postalCode: '',
        region: '',
        codeRegion: '',
    });
    const params = ref<any>({ images: [], addressDetail: {} });

    onMounted(() => {
        getUserAdress();
        getPropertyType();
    });

    watch(
        () => isShowModal.value,
        (v) => {
            isShowModal.value = v;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => allPropertyType.value,
        (v) => {
            allPropertyType.value = v;
        },
        { immediate: true, deep: true }
    );
    watch(
        () => userPosition.value,
        (value) => {
            defaultLatLng.value = {
                lat: value.lat,
                lng: value.lng,
            };
            locationParams.value = {
                ...locationParams.value,
                latitude: value.lat,
                longitude: value.lng,
            };

            getCoordinates(value.lat, value.lng);
        },
        { immediate: true, deep: true }
    );
    watch(
        () => defaultLatLng.value,
        (v) => {
            const val = store.dispatch(
                'AddProductModule/getCadasrteByCoord',
                defaultLatLng.value
            );
            val.then((result: []) => {
                cadastreData.value = [...result];
                loadingMap.value = false;
            }).catch((err: any) => console.log(err));
        },
        { immediate: true }
    );
    watch(
        () => currentLatLng.value,

        async (v) => {
            await store.dispatch('AddProductModule/getCadasrteByCoord', v);
        },
        { deep: true }
    );
    watch(
        () => locationParams.value,
        (v) => {
            console.log(v, 'location Params');
            locationParams.value = v;
            params.value = {
                ...params.value,
                addressDetail: { ...v },
            };
            console.log(params.value, 'Params value');
        },
        { immediate: true, deep: true }
    );
    watch(
        () => geocodeResult.value,
        (v) => {
            console.log(v, 'geocode result');

            v && locationHandler(v);
        },
        { immediate: true, deep: true }
    );
    watch(
        () => autocompleteResult.value,
        (v) => {
            defaultLatLng.value = {
                lat: (v as ILocationParams).lat,
                lng: (v as ILocationParams).lng,
            };
        },
        { deep: true }
    );
    watch(
        () => store.getters['AddProductModule/getCadastreData'],
        (newVal) => {
            console.log('DBG cadastre store change');
            cadastreData.value = newVal;
        },
        { immediate: true }
    );

    async function getPropertyType() {
        if (allPropertyType.value.length === 0) {
            const dataType = await store.dispatch(
                'AddProductModule/getProperyType',
                'sale'
            );
            allPropertyType.value = dataType;
        }
    }

    function locationHandler(params: Array<gm_ILocationResult>) {
        params[0].address_components.forEach((item) => {
            extractLocationDetails(item);
        });
        const formattedParams: { latitude: any; longitude: any } = {
            latitude: (params[0].geometry.location as any).lat(),
            longitude: (params[0].geometry.location as any).lng(),
        };
        locationParams.value = {
            ...locationParams.value,
            ...JSON.parse(JSON.stringify(formattedParams)),
            address: params[0].formatted_address,
        };
    }

    function extractLocationDetails(locationObj: {
        long_name: string;
        short_name: string;
        types: Array<string>;
    }) {
        switch (true) {
            case locationObj.types.includes('country'):
                locationParams.value = {
                    ...locationParams.value,
                    country: locationObj.long_name,
                    codeCountry: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('locality'):
                locationParams.value = {
                    ...locationParams.value,
                    municipality: locationObj.long_name,
                    codeMunicipality: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('administrative_area_level_1'):
                locationParams.value = {
                    ...locationParams.value,
                    region: locationObj.long_name,
                    codeRegion: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('postal_code'):
                locationParams.value = {
                    ...locationParams.value,
                    postalCode: locationObj.long_name,
                };
                break;
        }
    }

    function handleClickMap(e: LatLng) {
        isShowModal.value = true;
        defaultLatLng.value = e;
    }

    function inputHandler(obj: { address: string } | object) {
        console.log('adress input handler ====>', obj);

        for (const key in obj) {
            if (key === 'address') {
                locationParams.value = {
                    ...locationParams.value,
                    address: obj[key as keyof typeof obj],
                };
            } else if (key === '') {
            }
        }
    }

    async function getUserAdress() {
        const dataStore = store.getters['UserModule/getUserDetails'];

        if (dataStore) {
            locationParams.value = {
                ...locationParams.value,
                address: dataStore.address,
                latitude: dataStore.latitude,
                longitude: dataStore.longitude,
            };
            defaultLatLng.value = {
                lat: +dataStore.latitude,
                lng: +dataStore.longitude,
            };

            store
                .dispatch('AddProductModule/getCadasrteByCoord', {
                    lat: dataStore.latitude,
                    lng: dataStore.longitude,
                })
                .then((result: []) => {
                    cadastreData.value = [...result];
                    loadingMap.value = false;
                })
                .catch((err: any) => console.log(err));
        }
    }

    function getCoordinates(lat: number, lng: number) {
        store
            .dispatch('AddProductModule/getCadasrteByCoord', {
                lat,
                lng,
            })
            .then((result: []) => {
                cadastreData.value = [...result];
                loadingMap.value = false;
            })
            .catch((err: any) => console.log(err));
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .relativeInfo__map {
        height: calc(100vh - 62px);
        @apply relative;
        &--container {
            &:deep(#map),
            &:deep(#sv) {
                height: calc(100vh - 62px);
            }
        }
        &__modal {
            @apply min-h-[290px];
            &:deep(.CardWrapperTitle) {
                @apply shadow-none;
            }
        }
        &__infoContainer {
            @apply flex flex-col-reverse gap-[14px];
            @screen md {
                @apply grid;
            }
        }
        &__img-wrap {
            @apply h-[256px] overflow-hidden bg-strokeGray;
            // @apply rounded-[8px];
            img {
                border: 1px solid transparent;
            }
        }
        &__imgContainer {
            @apply h-full object-cover;
        }
        &__img {
            @apply w-full object-fill;
        }
        &--form {
            @apply max-w-[calc(100%-64px)] w-full absolute top-[10px] left-[56px] z-[999];
            @screen md {
                @apply max-w-[500px] left-[50%] translate-x-[-50%];
            }
            &:deep() {
                .custom-input__fields {
                    @apply w-full;
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
        &__info-detail {
            @apply place-content-18px;
        }
        &__backToInfo {
            @apply flex gap-[14px] items-center cursor-pointer rounded-[24px] px-[14px] py-[5px] mx-[-14px] my-[-5px] max-w-max;
            &:hover {
                @apply bg-gray;
            }
        }
    }

    .streetViewClass {
        width: 100%;
        height: calc(100vh - 62px);
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }
</style>
