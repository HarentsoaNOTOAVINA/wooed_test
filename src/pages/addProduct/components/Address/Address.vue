<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    // import Map from './Map/Map.vue';
    import Map from '@//pages/addProduct/components/ParticularChoice/Map.vue';
    import { onBeforeMount, onMounted, ref, watch } from 'vue';
    import { LatLng } from 'leaflet';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Info from '@/components/Icon/Info.vue';
    import {
        inputList,
        polygons,
    } from '@/pages/addProduct/components/Address/data';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import useGeocode from '@/composables/useGeocode';
    import { useStore } from 'vuex';
    import useUserPosition from "@/composables/useUserPosition";

    const store = useStore();
    const { autocompleteResult } = useAutoComptetion('address');
    const {userPosition} = useUserPosition();

    // const defaultLatLng = ref<Array<any>>([]);
    const defaultLatLng = ref<ILocationParams>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
    });
    const cadastreData = ref<[]>([]);
    const currentLatLng = ref<ILocationParams>();
    const loactionParams = ref<ILocationParams>({
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

    const emit = defineEmits<{
        (e: 'getAdress', value: any): void;
        (e: 'getLatLong', value: any): void;
        (e: 'getDefaultAdress', value: any, latLng: any): void;
    }>();

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    // onBeforeMount( () => {
    onMounted(() => {
        // getUserAdress() 
        // const val = store.dispatch(
        //     'AddProductModule/getCadasrteByCoord',
        //     defaultLatLng.value
        // );
        // val.then((result: []) => {
        //     cadastreData.value = [...result];
        //     loadingMap.value = false;
        // }).catch((err: any) => console.log(err));
        
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n", userPosition);
        
    });
    watch(() => userPosition.value, (value) => {
            // console.log("zazazazaza\n", value.lat);
            defaultLatLng.value = {
                lat : value.lat,
                lng : value.lng
            }
            loactionParams.value = {
            ...loactionParams.value,
                latitude : value.lat,
                longitude : value.lng
            }

            getCoordinates(value.lat, value.lng);
    },{immediate : true, deep : true});

    watch(() => defaultLatLng.value, (v) => {
        const val = store.dispatch(
            'AddProductModule/getCadasrteByCoord',
            defaultLatLng.value
        );
        val.then((result: []) => {
            cadastreData.value = [...result];
            loadingMap.value = false;
        }).catch((err: any) => console.log(err));
    }, {immediate: true});

    watch(
        () => autocompleteResult.value,
        (v) => {
            console.log('&&&&&&&&&&&&&&&&&&&&\n', v);

            if (v) {
                emit('getLatLong', v);
            }

            defaultLatLng.value = {
                lat: (v as ILocationParams).lat,
                lng: (v as ILocationParams).lng,
            };

            // currentLatLng.value = {
            //     lat: (v as ILocationParams).lat,
            //     lng: (v as ILocationParams).lng,
            // };
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
        () => loactionParams.value,
        (v) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { detailLocation: { ...v } },
                step: { address: dataValidityHandler(v) },
            });
        },
        { immediate: true, deep: true }
    );

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
        loactionParams.value = {
            ...loactionParams.value,
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
                loactionParams.value = {
                    ...loactionParams.value,
                    country: locationObj.long_name,
                    codeCountry: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('locality'):
                loactionParams.value = {
                    ...loactionParams.value,
                    municipality: locationObj.long_name,
                    codeMunicipality: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('administrative_area_level_1'):
                loactionParams.value = {
                    ...loactionParams.value,
                    region: locationObj.long_name,
                    codeRegion: locationObj.short_name,
                };
                break;
            case locationObj.types.includes('postal_code'):
                loactionParams.value = {
                    ...loactionParams.value,
                    postalCode: locationObj.long_name,
                };
                break;
        }
    }

    function inputHandler(obj: { address: string } | object) {
        for (const key in obj) {
            if (key === 'address') {
                loactionParams.value = {
                    ...loactionParams.value,
                    address: obj[key as keyof typeof obj],
                };
            } else if (key === '') {
            }
        }
    }


    async function getUserAdress(){
        const dataStore = store.getters['UserModule/getUserDetails'];
        loactionParams.value = {
            ...loactionParams.value,
            address : dataStore.address,
            latitude : dataStore.latitude,
            longitude : dataStore.longitude
        }
        defaultLatLng.value = {
            lat : +dataStore.latitude,
            lng : +dataStore.longitude,
            // iconUrl : `${window.location.origin}/src/static/images/map/red-marker.png`
        }
        console.log("############################\n", defaultLatLng.value);

        store.dispatch('AddProductModule/getCadasrteByCoord',{
                lat : dataStore.latitude,
                lng : dataStore.longitude
        }).then((result : []) =>{
            cadastreData.value = [...result];
            loadingMap.value = false;
        }).catch((err  : any) => console.log(err))
    }

    function getCoordinates(lat : number, lng : number){
        store.dispatch('AddProductModule/getCadasrteByCoord',{
                lat,
                lng
        }).then((result : []) =>{
            cadastreData.value = [...result];
            loadingMap.value = false;
        }).catch((err  : any) => console.log(err))
    }

</script>

<template>
    <div class="address__container">
        <Paragraphe class="address__container__info">
            <Info :size="'xs'" /><small
                >Entrez votre addresse ou cliquez sur la carte.</small
            >
        </Paragraphe>
        <div :class="item.name === 'address' ? 'address__map-info' : ''" v-for="item in inputList" :key="item.id">
            <Input
                v-if="item.type === 'input'"
                :id="item.id"
                :label="item.label"
                :name-input="item.name"
                :value="(loactionParams as ILocationParams)[item.name as keyof ILocationParams]"
                :required="item.required"
                @input="inputHandler"
                :default-value="propertyDatas.detailLocation[item.name]"
            />
            <div v-else-if="item.type === 'text'" class="address__info">
                <Paragraphe :fontSize="'16'">
                    {{ item.label }} :
                    <b>
                        {{
                            (loactionParams as ILocationParams)[
                                item.name as keyof ILocationParams
                            ] ?? 'null'
                        }}
                    </b>
                </Paragraphe>
            </div>

            <div class="address__map" v-if="item.name === 'address'">
                <div v-if="loadingMap" class="address__map--loading">
                    <Loader />
                </div>
                <!-- <Map
                    v-else
                    :defaultLatLng="defaultLatLng"
                    :cadastre-data="cadastreData"
                    :currentLatLng="currentLatLng"
                    @on-click-map="handleClickMap"
                /> -->
                <Map
                    v-else
                    :is-display-public-cadaster="true"
                    :property-coord="(defaultLatLng as any)"
                    :polygon-cluster="cadastreData"
                    :is-replace-marker="true"
                    @on-return-event-map-click="handleClickMap"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .address {
        &__container {
            @apply flex flex-col gap-[14px];
            &__info {
                @apply flex items-center gap-[10px];
                color: var(--color-primary);
            }
        }
        &__map {
            @apply border border-primary rounded-sm;
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
