<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="address__container">
            <Paragraphe class="address__container__info">
                <Info :size="'xs'" /><small
                    >Entrez votre addresse ou cliquez sur la carte.</small
                >
            </Paragraphe>
            
            <div class="">
                <div v-if="loadingMap" class="address__map--loading">
                    <Loader />
                </div>
                <Map
                    v-else
                    :is-display-public-cadaster="true"
                    :is-auto-complete="!loadingMap"
                    :auto-complete="autocompleteResult"
                    :location-params="locationParams"
                    :property-coord="(defaultLatLng as any)"
                    :polygon-cluster="cadastreData"
                    :is-replace-marker="true"
                    @on-return-event-map-click="handleClickMap"
                    @on-event-auto-complete="handleClickMap"
                    @input-handler="inputHandler"
                />
            </div>
            <div
                :class="item.name === 'address' ? 'address__map-info' : ''"
                v-for="item in inputList"
                :key="item.id"
            >
                <div v-if="item.type === 'text'" class="address__info">
                    <Paragraphe :fontSize="'16'">
                        {{ item.label }} :
                        <b>
                            {{
                                (locationParams as ILocationParams)[
                                    item.name as keyof ILocationParams
                                ] ?? ''
                            }}
                        </b>
                    </Paragraphe>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Map from '@/components/section/MapSection/MapSection.vue';
    import { onMounted, ref, watch } from 'vue';
    import { LatLng } from 'leaflet';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Info from '@/components/Icon/Info.vue';
    import { inputList } from '@/pages/addProperty/components/Address/data';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import useGeocode from '@/composables/useGeocode';
    import { useStore } from 'vuex';
    import useUserPosition from '@/composables/useUserPosition';

    const error = ref<any>({});
    const store = useStore();
    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });
    const loading = ref<boolean>(false);

    const content = ref<string>(props.titleLabel);
    const { autocompleteResult } = useAutoComptetion('address');
    const { userPosition } = useUserPosition();

    const defaultLatLng = ref<ILocationParams>({});

    const cadastreData = ref<[]>([]);
    const currentLatLng = ref<ILocationParams>();
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
    const { geocodeResult } = useGeocode(
        defaultLatLng as any,
        currentLatLng as any
    );
    const loadingMap = ref<boolean>(true);

    onMounted(() => {
        getUserAdress();
        let defaultLocationParam =
            store.getters['AddProductModule/getAddPropertyDatas']
                .detailLocation;
        console.log(defaultLocationParam, 'defaultLocationParam');
        // locationParams.value = valueParams(defaultLocationParam);
    });

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
        () => autocompleteResult.value,
        (v) => {
            if (v) {
                emit('getLatLong', v);
            }

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
            cadastreData.value = newVal;
        },
        { immediate: true }
    );

    watch(
        () => geocodeResult.value,
        (v) => {
            v && locationHandler(v);

            if (v) {
                emit('getAdress', v[0]);
            }
        },
        { immediate: true, deep: true }
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
            if (v) {
                store.dispatch('AddProductModule/setPropertyData', {
                    data: { detailLocation: { ...v } },
                });
            }
        },
        { immediate: true, deep: true }
    );

    // watch(
    //     () => store.getters['AddProductModule/getAddPropertyDatas'],
    //     (data) => {
    //         locationParams.value = valueParams(data.detailLocation);
    //         console.log(data, "watch locationParams");
    //     },
    //     { immediate: true }
    // );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
        (e: 'getAdress', value: any): void;
        (e: 'getLatLong', value: any): void;
        (e: 'getDefaultAdress', value: any, latLng: any): void;
    }>();

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        // error.value = requiredControl(inputList, locationParams.value);

        // if (Object.values(error.value).every((v) => v !== '')) {
        //     emit('onClickNext');
        // }
        console.log(
            store.getters['AddProductModule/getAddPropertyDatas']
                .detailLocation,
            'NEXT'
        );

        if (locationParams.value && locationParams.value.address) {
            emit('onClickNext');
        }
    }

    function dataValidityHandler(v: ILocationParams) {
        return Object.values(v).every((v) => v !== '' && v !== 0);
    }

    function handleClickMap(e: LatLng) {
        
        defaultLatLng.value = e;
    }
    function locationHandler(params: Array<gm_ILocationResult>) {
        emit('getDefaultAdress', params[0], defaultLatLng.value);
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

    function inputHandler(obj: { address: string } | object) {
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
        locationParams.value = {
            ...locationParams.value,
            address: dataStore.address,
            latitude: dataStore.latitude,
            longitude: dataStore.longitude,
        };
        defaultLatLng.value = {
            lat: +dataStore.latitude,
            lng: +dataStore.longitude,
            // iconUrl : `${window.location.origin}/src/static/images/map/red-marker.png`
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
    .address {
        &__container {
            @apply flex flex-col gap-[14px];
            &__info {
                @apply flex items-center gap-[10px];
                color: var(--color-primary);
            }
        }
        &__map {
            &--loading {
                min-height: 400px;
                @apply relative;
            }
        }
        &__map-info {
            @apply flex flex-col gap-[14px];
        }
    }
</style>
