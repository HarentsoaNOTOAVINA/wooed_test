<template>
    <div class="map">
        <div v-if="loadingMap" class="address__map--loading">
            <Loader />
        </div>
        <Map
            v-else
            :is-display-public-cadaster="true"
            :property-coord="(defaultLatLng as any)"
            :polygon-cluster="cadastreData"
            :is-replace-marker="true"
            @on-return-event-map-click="handleClickMap"
            class="map--container"
        />
        <div class="map__form">
            <Button
                type-button="secondary"
                class="map__form-back"
                @click="goBack"
            >
                <Icon icon-name="ArrowBack" />
                <span> Retour </span>
            </Button>
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
        <Modal
            :is-show-modal="isShowModal"
            :closable="true"
            width="500"
            :title="activeLabel"
            @on-back="isShowModal = false"
        >
            <template #content>
                <form class="map__modal">
                    <ContentValue
                        label="Adresse"
                        :value="locationParams && locationParams.address"
                        class="map__contentAddress"
                    >
                        <Icon icon-name="MapMarkerLine" />
                    </ContentValue>
                    <!-- Type de bien -->
                    <Select
                        name="propertyType"
                        label="Type du bien"
                        :options="allPropertyType"
                        :disabled="!allPropertyType.length"
                        :loading="!allPropertyType.length"
                        placeholder="Selectionnez"
                        @change-select="handleChange"
                    />
                    <!-- Occupation du bien -->
                    <Select
                        name="occupation"
                        label="Occupation du bien"
                        :options="option"
                        placeholder="Selectionnez"
                        @change-select="handleChange"
                    />
                    <!-- Upload photo -->
                    <div class="file__upload">
                        <label for="" class="text-grayIcon font-[600]">
                            Photo de mon bien
                        </label>
                        <UploadWithAudio
                            :type-image="true"
                            :show-preview="false"
                            @uploadFileWithBase64="uploadFileWithBase64"
                        />
                        <div class="file__preview">
                            <div
                                v-for="(item, key) in nestedFilesUpload"
                                :key="key"
                            >
                                <AudioRecorder
                                    @click="
                                        () => {
                                            assignCurrentCardUpload(key);
                                        }
                                    "
                                    @on-save-record="saveRecordHandler"
                                    :index="key"
                                    :file="item"
                                />
                            </div>
                        </div>
                    </div>
                    <hr class="__hr" />
                    <div class="map__modal-button">
                        <Button
                            type-button="secondary"
                            @click="handleAddProperty"
                        >
                            <LoadingButton size="xs" v-if="loadingFinish" />
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import Map from '@/components/section/MapSection/MapSection.vue';
    import { onMounted, ref, watch } from 'vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import { LatLng } from 'leaflet';
    import { useStore } from 'vuex';
    import Input from '@/components/Common/Input/Input.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { useRouter } from 'vue-router';
    import Select from '@/components/Common/Select/Select.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import ContentValue from '@/components/Display/ContentValue/ContentValue.vue';
    import useUserPosition from '@/composables/useUserPosition';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import useGeocode from '@/composables/useGeocode';
    import UploadWithAudio from '@/components/Display/UploadImage/UploadImageAudio.vue';
    import AudioRecorder from '@/components/Display/AudioRecord/AudioRecord.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { notification } from 'ant-design-vue';

    interface Option {
        value: string;
        label: string;
    }

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
    enum title {
        text = 'Ajout du bien à gérer',
    }
    // const slug = useSlug();

    const store = useStore();
    const router = useRouter();
    const propertyCoords = ref<Array<any>>([]);
    const isShowModal = ref<boolean>(false);
    const activeLabel = ref<string>(title.text);
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
    const nestedFilesUpload = ref<
        Array<{ urlImg: ''; file: any; soundFile?: Blob }>
    >([]);
    const currentCardUpload = ref<number>();
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

    const option: Option[] = [
        {
            value: "J'occupe seul le bien",
            label: "J'occupe seul le bien",
        },
        {
            value: 'Je loue le bien',
            label: 'Je loue le bien',
        },
        {
            value: "J'occupe le bien à titre de résidence secondaire",
            label: "J'occupe le bien à titre de résidence secondaire",
        },
    ];
    const params = ref<any>({
        operationType: 'occupied',
        images: [],
        detailLocation: {},
    });
    const loadingFinish = ref<boolean>(false);
    // const unsavedChanges = ref<boolean>(true);

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
                detailLocation: { ...v },
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

    function assignCurrentCardUpload(index: number) {
        currentCardUpload.value = index;
    }


    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        console.log(params.value, 'Params value');
    }

    function uploadFileWithBase64(result: { urlImg: any; file: File }) {
        nestedFilesUpload.value = [...nestedFilesUpload.value, { ...result }];
        const __entries: any[] = [];
        nestedFilesUpload.value.forEach((entry) => {
            __entries.push({
                file: entry.file,
                soundFile: entry?.soundFile,
            });
        });
        params.value.images = __entries;
    }

    function saveRecordHandler(record: Blob) {
        nestedFilesUpload.value = [
            ...nestedFilesUpload.value.map((item, index) => {
                if (index === currentCardUpload.value) {
                    return {
                        ...item,
                        soundFile: record,
                    };
                } else return item;
            }),
        ] as any;
    }

    async function getPropertyType() {
        if (allPropertyType.value.length === 0) {
            const dataType = await store.dispatch(
                'AddProductModule/getProperyType'
            );
            allPropertyType.value = dataType;
        }
    }

    function handleAddProperty() {
        console.log(params.value, 'Enregitrer le param');
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        handleFinish();
    }

    // const saveForm = function () {
    //     unsavedChanges.value = false;
    // };

    async function handleFinish() {
        // saveForm();
        loadingFinish.value = true;
        try {
            const { data, status, code } = await store.dispatch(
                'AddProductModule/createProduct'
            );
            console.log(status, 'REQUEST');
            if (
                status == '201' ||
                status == '200' ||
                code === '201' ||
                code === '200'
            ) {
                notification['success']({
                    message: 'Succès',
                    description: 'Votre bien a été publié avec succès',
                });
                store.dispatch('AddProductModule/resetDataAction');
                router.push('/manage-property');
            }
        } catch (e: any) {
            loadingFinish.value = false;
            notification['error']({
                message: 'Erreur',
                description:
                    e.data?.data?.detail ??
                    "Une erreur s'est produite, veuillez réessayer plus tard.",
            });
        } finally {
            loadingFinish.value = false;
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

    function goBack() {
        router.go(-1);
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

    .map {
        height: calc(100vh - 62px);
        @apply relative;

        &--container {
            &:deep(#map),
            &:deep(#sv) {
                height: calc(100vh - 62px);
            }
        }

        &__modal {
            @apply min-h-[290px] place-content-14px;

            &-button {
                @apply flex justify-end;
            }

            &:deep(.CardWrapperTitle) {
                @apply shadow-none;
            }

            &:deep(.custom-select__wrapper) {
                @apply mb-0;
            }
        }

        &__form {
            @apply max-w-[calc(100%-64px)] w-full absolute top-[10px] left-[56px] z-[999] flex items-center gap-[14px];

            @screen md {
                @apply max-w-[500px] left-[50%] translate-x-[-50%];
            }

            &-back {
                @apply flex items-center gap-[5px];

                &:deep(button) {
                    @apply bg-white text-grayIcon;
                }
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

        &__contentAddress {
            @apply w-full;

            &:deep(.value) {
                @apply flex-row-reverse justify-end gap-[10px] font-[400];
            }
        }
    }
    .file {
        &__upload {
            &:deep() {
                .ant-upload-list-picture-card-container {
                    display: none;
                }
            }
        }
        &__preview {
            @apply flex flex-wrap justify-center sm:justify-start gap-[10px];

            &__upload {
                @apply mb-[20px] w-full align-middle;
            }
        }
    }
</style>
