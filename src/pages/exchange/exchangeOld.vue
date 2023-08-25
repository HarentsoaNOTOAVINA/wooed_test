<template>
    <div class="search-simple-property">
        <Modal
            :is-show-modal="isDisplaySelectedProperty"
            @on-back="isDisplaySelectedProperty = false"
        >
            <template #content>
                <div class="property__preview" v-if="selectedProperty">
                    <ProductCard :DataCard="selectedProperty" />
                    <Title
                        type="h3"
                        label="Proprietaire"
                        class="property__preview__title"
                    />
                    <hr />
                    <Paragraphe class="property__preview__owner-details"
                        ><EmailOutline /> {{ selectedPropertyOwner.email }}
                    </Paragraphe>
                    <Paragraphe class="property__preview__owner-details"
                        ><User /> {{ selectedPropertyOwner.name }}
                    </Paragraphe>
                    <Button
                        :is-load="isLoadPostOne"
                        class="property__preview__submit"
                        @click="() => handlePostAds(false)"
                        >Poster l'annonce</Button
                    >
                </div>
            </template>
        </Modal>
        <div v-if="isLoadProperties" class="relative loading__container">
            <Loader />
        </div>
        <div v-else>
            <div class="search-simple-property__choice__list">
                <div
                    @click="
                        () => {
                            isDisplayAdress = true;
                            isActiveZoning = false;
                        }
                    "
                    class="search-simple-property__choice"
                >
                    <transition name="fade-slide" mode="out-in">
                        <Input
                            label="Rechercher par adresse"
                            name-input="adress"
                            id="adress"
                            placeholder="Entrez une adresse"
                            v-if="isDisplayAdress"
                        />
                        <span v-else>Rechercher par adresse</span>
                    </transition>
                </div>
                <div
                    @click="
                        () => {
                            isDisplayAdress = undefined;
                            isActiveZoning = true;
                        }
                    "
                    class="search-simple-property__choice"
                >
                    <span>Rechercher par secteur</span>
                    <transition appear name="fade-slide" mode="out-in">
                        <div v-if="isActiveZoning">
                            <span class="info">
                                <Info /> Dessinez sur la carte pour filter les
                                biens alentours</span
                            >
                            <Select
                                name="propertyType"
                                @change-select="handleSelectPropertyType"
                                label="Type de bien"
                                placeholder="Selectionnez"
                                :options="propertyTypeList"
                            />
                        </div>
                    </transition>
                </div>
            </div>
            <div class="map__container">
                <!-- <Map
                    v-if="forceMapRendering"
                    id-map="map"
                    class="map"
                    :markers-coordinates="mapCoordinates"
                    :need-marker-layer="true"
                    :needPolygonLayer="true"
                    :need-draw-control="true"
                    :propertyPosition="_ownerPropertyCoords"
                    @on-polygon-created="getDrawPolygon"
                    @touched="handleSelectedProperty"
                /> -->
                <Map
                    v-if="forceMapRendering"
                    :markers-coordinates="mapCoordinates"
                    :propertyPosition="_ownerPropertyCoords"
                    :needPolygonLayer="true"
                    :need-draw-control="true"
                    id-map="map"
                    class="map"
                    @on-polygon-created="getDrawPolygon"
                    @touched="handleSelectedProperty"
                />
                <transition name="fade-scale" mode="out-in" appear>
                    <Button
                        @click="handleSearch"
                        :is-load="isLoadSearchProperties"
                        v-if="isDrawnDone"
                        type-button="secondary"
                        class="map__container__search"
                        >Rechercher</Button
                    >
                </transition>
                <transition name="fade-scale" mode="out-in" appear>
                    <Button
                        v-if="isPostReady"
                        @click="() => handlePostAds(true)"
                        :is-load="isLoadPostMultiple"
                        type-button="secondary"
                        class="map__container__post"
                        >Poster l'annonce</Button
                    >
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import productsListServices from '@/services/productsListService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Info from '@/components/Icon/Info.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import AddProductService from '@/services/addProductService';
    import ProductsListService from '@/services/productsListService';
    import Select from '@/components/Common/Select/Select.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { notification } from 'ant-design-vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import EmailOutline from '@/components/Icon/EmailOutline.vue';
    import User from '@/components/Icon/User.vue';
    import SearchExchangableProperty from '@/services/exchangeProperty';
    import { LatLng } from 'leaflet';
    import { useStore } from 'vuex';

    const isDisplaySelectedProperty = ref<boolean>(false);
    const isDisplayAdress = ref<boolean | undefined>(false);
    const isLoadProperties = ref<boolean>(true);
    const isActiveZoning = ref<boolean>(false);
    const isActiveZoningControl = ref<boolean>(false);
    const isSelectedOne = ref<boolean>(false);
    const isDrawnDone = ref<boolean>(false);
    const isLoadSearchProperties = ref<boolean>(false);
    const isPostReady = ref<boolean>(false);
    const isLoadPostMultiple = ref<boolean>(false);
    const isLoadPostOne = ref<boolean>(false);
    const forceMapRendering = ref<boolean>(true);
    const zoningParams = ref<any>(null);
    const mapCoordinates = ref<any[]>([]);
    const initMapCoordinates = ref<any[]>([]);
    const searchParam = ref<any>({});
    const drawControlDisplay = ref<string>('none');
    const propertyTypeList = ref<{ label: string; value: number }[]>([]);
    const propertyIdsList = ref<number[]>([]);
    const propertyIdsListTmp = ref<number[]>([]);
    const selectedProperty = ref<any>(null);
    const globalParams = ref<any>(null);

    const store = useStore();
    const ownerPropertyCoords =
        store.getters['ExchangePropertyModule/getOwnerPropertyCoords'];

    const props = defineProps<{
        // ownerPropertyCoords: any;
        globalParams: any;
    }>();
    const { fullLocationResult } = useAutoComptetion(
        'adress',
        isDisplayAdress as any
    );

    const _ownerPropertyCoords = ref<any>({
        lat: +ownerPropertyCoords.lat,
        lng: +ownerPropertyCoords.lng,
        zoom: 14,
    });

    const selectedPropertyOwner = computed(() => {
        const { user } = selectedProperty.value;
        const { email, firstname, name } = user;
        return { email, name: `${firstname} ${name}` };
    });

    onMounted(() => {
        getOtherProperties();
        getPropertyTypeList();
    });

    watch(
        () => fullLocationResult.value,
        (ac: any) => {
            if (ac) {
                const { address_components } = ac;
                const result = {
                    country: null,
                    region: null,
                    municipality: null,
                    road: null,
                };
                address_components.forEach((elt: any) => {
                    if (elt.types.includes('country')) {
                        result.country = elt.short_name;
                    } else if (
                        elt.types.includes('administrative_area_level_1')
                    ) {
                        result.region = elt.short_name;
                    } else if (elt.types.includes('locality')) {
                        result.municipality = elt.short_name;
                    } else if (elt.types.includes('route')) {
                        result.road = elt.short_name;
                    }
                });

                searchParam.value = { ...searchParam.value, ...result } as any;
                refreshMap();
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => isActiveZoningControl.value,
        (v) => {
            /**
             * display drawing control on map
             */
            drawControlDisplay.value = !!v ? 'block' : 'none';
            refreshMap(false);
        }
    );

    watch(
        () => isActiveZoning.value,
        () => {
            /**
             * reset values on each switch mode
             */
            refreshMap(false);
            mapCoordinates.value = [];
            isDrawnDone.value = false;
            isPostReady.value = false;
            propertyIdsList.value = [];
            isActiveZoningControl.value = false;
        }
    );

    const defaultLatLng = ref<ILocationParams>({
        lat: 50.824446059264694,
        lng: 4.38640342821515,
    });

    function handleClickMap(e: LatLng) {
        defaultLatLng.value = e;
    }

    function refreshMap(withFilter: boolean = true) {
        forceMapRendering.value = false;
        setTimeout(() => {
            if (withFilter) {
                filterPropertyRes();
            }
            forceMapRendering.value = true;
        });
    }

    async function getOtherProperties() {
        try {
            const { data } = await productsListServices.getProductsList({
                operationType: 'sale',
            });
            initMapCoordinates.value = data;
        } finally {
            isLoadProperties.value = false;
        }
    }
    async function getPropertyTypeList() {
        const list: any = await AddProductService.getPropertyType();
        propertyTypeList.value = list.data.map((item: any) => ({
            label: item.label,
            value: item.id,
        }));
    }
    async function handleSearch() {
        try {
            isLoadSearchProperties.value = true;
            const { data, code } =
                await ProductsListService.getProductsListByZone(
                    zoningParams.value
                );
            const propertyFound = data.length;
            notification.success({
                message: `${propertyFound} bien(s) trouvé(s)`,
            });
            if (code === 200) {
                mapCoordinates.value = data.map((item: any) => ({
                    lat: item.latitude,
                    lng: item.longitude,
                    id: item.id,
                    customIcon: '/icon/map/partener.png',
                    iconSize: [30, 30],
                    iconAnchor: [15, 0],
                }));
                propertyIdsList.value = mapCoordinates.value.map(
                    (item) => item.id
                );
                /**
                 * make copy of array in case of user will choose one property and switch to many properties
                 */
                propertyIdsListTmp.value = [...propertyIdsList.value];
                /**
                 * reset map
                 */
                refreshMap(false);
                /**
                 * make Post button appear
                 */
                isPostReady.value = true;
            }
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, veuillez reessayer`,
            });
        } finally {
            isLoadSearchProperties.value = false;
        }
    }
    function filterPropertyRes() {
        /**
         * Filter condition function
         * @param toCheck
         * @param value
         */
        function _condition(toCheck: any, value: any) {
            if (toCheck) {
                return toCheck === value;
            } else {
                return toCheck === toCheck;
            }
        }
        const { country, region, municipality } = searchParam.value;
        /**
         * use Filter property function to handle many filter at once && parse array to a valid array for map mapping
         */
        mapCoordinates.value = initMapCoordinates.value
            .filter((property: any) =>
                _condition(country, property.codeCountry)
            )
            .filter((property: any) => _condition(region, property.codeRegion))
            .filter((property: any) =>
                _condition(municipality, property.codeMunicipality)
            )
            .map((item: any) => ({
                lat: item.latitude,
                lng: item.longitude,
                id: item.id,
                customIcon: '/icon/map/partener.png',
                iconSize: [30, 30],
                iconAnchor: [15, 0],
            }));
    }
    function getDrawPolygon(coord: any) {
        const { latlng } = coord;
        /**
         * make zoning obj to search API
         * JSON.stringify is needed to parse polygon coord for API purpose
         */
        zoningParams.value = {
            ...zoningParams.value,
            coordinates: JSON.stringify(latlng)
                .replaceAll('[', '')
                .replaceAll(']', ''),
        };
        /**
         * display Search button
         */
        isDrawnDone.value = true;
    }
    function handleSelectPropertyType(type: any) {
        /**
         * display drawing control on map
         */
        zoningParams.value = {
            ...zoningParams.value,
            ...type,
        };
        if (type) {
            isActiveZoningControl.value = true;
        }
    }

    /**
     * handle selected property && get his ID
     * @param property
     */
    function handleSelectedProperty(property: any) {
        /**
         * reset property id list
         */
        propertyIdsList.value = [];
        selectedProperty.value = initMapCoordinates.value.find(
            (item) => item.id === property.id
        );
        isDisplaySelectedProperty.value = true;
        /**
         * this will help to know if user have chose one property
         */
        isSelectedOne.value = true;
        propertyIdsList.value = [selectedProperty.value.id];
    }
    async function handlePostAds(multiple: boolean = false) {
        let propertiesId = [];
        const { myPropertyId, ...rest } = props.globalParams;
        const parsedGlobalParams = {
            ...rest,
            thePropertyId: myPropertyId,
        };
        if (multiple && isSelectedOne.value) {
            propertiesId = propertyIdsListTmp.value;
        } else {
            propertiesId = propertyIdsList.value;
        }
        globalParams.value = {
            ...parsedGlobalParams,
            theProperties: [...propertiesId],
        };
        if (multiple) {
            isLoadPostMultiple.value = true;
        } else {
            isLoadPostOne.value = true;
        }
        try {
            const { data } = await SearchExchangableProperty.postAds(
                globalParams.value
            );
            console.log(data, 'RESULT');
            notification.success({ message: `Votre annonce a été posté!` });
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, veuillez reessayer`,
            });
        } finally {
            isLoadPostMultiple.value = false;
            isLoadPostOne.value = false;
            isDisplaySelectedProperty.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .property__preview {
        &:deep() {
            path {
                fill: var(--color-stroke-gray);
            }
        }
        hr {
            @apply text-primary;
        }
        &__title {
            @apply font-semibold text-primary;
        }
        &__owner-details {
            @apply flex items-center gap-[10px] text-strokeGray;
        }
        &__submit {
            @apply w-full mt-[20px];
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }
    .search-simple-property {
        .map {
            height: 50vh;
            width: 100%;
            &__container {
                @apply relative;
                &__search {
                    @apply absolute z-[1000] top-[10px] right-[10px];
                }
                &__post {
                    @apply absolute z-[1000] top-[50px] right-[10px];
                }
            }
            &__external-actions {
                @apply z-[1000] absolute right-[10px] top-[10px];
            }
            &:deep() {
                .leaflet-draw {
                    display: v-bind('drawControlDisplay');
                }
            }
        }
        .loading__container {
            @apply h-[600px];
            &:deep() {
                .custom-loader {
                    @apply bg-white;
                }
            }
        }
        .fade-slide-enter-acitve,
        .fade-slide-leave-active {
            @apply transition-all;
        }
        .fade-slide-enter-from,
        .fade-slide-leave-to {
            @apply translate-x-[-100px];
        }
        .fade-scale-enter-acitve,
        .fade-scale-leave-active {
            @apply transition-all;
        }
        .fade-scale-enter-from,
        .fade-scale-leave-to {
            @apply scale-0;
        }
        &__choice {
            @apply transition-all overflow-hidden p-[20px] w-full flex flex-col justify-center items-center border border-[var(--color-primary)] text-primary rounded-[8px] hover:cursor-pointer;
            &:deep() {
                .custom-input__fields {
                    @apply m-0 w-full;
                }
            }
            .info {
                @apply text-strokeGray flex gap-[10px] items-center;
                &:deep() {
                    svg {
                        @apply w-[20px] h-[20px];
                    }
                    path {
                        fill: var(--color-stroke-gray);
                    }
                }
            }
            &__list {
                @apply flex gap-[10px] md:flex-row flex-col mb-[20px];
            }
        }
    }
</style>
