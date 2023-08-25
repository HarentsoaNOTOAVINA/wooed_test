<template>
    <div class="service-nearby">
        <input id="nearby-input" hidden type="text" />
        <div class="service-nearby__categoriesItem">
            <ServicesCategory
                :servicesCategory="servicesCategory"
                @serviceHandler="categoryHandler"
            />
        </div>

        <div class="service-nearby__map">
            <Map
                v-if="showMap"
                :need-marker-layer="true"
                :service-list="serviceList"
                :need-service-list="true"
                :focus-position="(focusPosition as any)"
                :property-position="centerCoord"
                :is-need-public-cadaster="false"
                @on-get-distance="getDistance as any"
            />
            <div class="service-nearby__menuContainer">
                <div class="service-nearby__area-search">
                    <Select
                        name="search-zone"
                        :options="[
                            { label: '100m', value: 100 },
                            { label: '500m', value: 500 },
                            { label: '1km', value: 1000 },
                        ]"
                        :default-value="{ label: '100m', value: 100 }"
                        @change-select="getSearArea"
                    />
                </div>
                <div
                    class="service-nearby__menuList"
                    @click="showCateListMobil"
                >
                    <IconList />
                    <span>List des catégories</span>
                </div>
                <transition name="slide-fade">
                    <div
                        class="service-nearby__categoriesItemMobile"
                        v-if="showCateList"
                    >
                        <ServicesCategory
                            :servicesCategory="servicesCategory"
                            @serviceHandler="categoryHandler"
                        />
                    </div>
                </transition>
            </div>
        </div>

        <transition name="fade-category" mode="out-in">
            <div
                v-if="isShowServicesList"
                class="service-nearby__detail"
                :class="{
                    'service-nearby__detail--decrease-z-index':
                        isShowMoreDetail,
                }"
            >
                <div class="service-nearby__detail__close">
                    <Close
                        @click="
                            () => {
                                isShowServicesList = false;
                            }
                        "
                    />
                </div>
                <div class="service-nearby__detail__content">
                    <ServiceList
                        :services-list="serviceList"
                        @on-show-more-detail="showMoreDetailHandler"
                    />
                </div>
            </div>
        </transition>
        <transition name="fade-detail" mode="out-in">
            <div
                v-if="isShowServicesList"
                class="service-nearby__detail--mobile"
            >
                <swiper slides-per-view="auto" :grab-cursor="true">
                    <swiper-slide
                        v-for="(service, index) in serviceList"
                        :key="index"
                        class="mr-[20px]"
                    >
                        <ServiceItem
                            :service="service"
                            @click="
                                () => {
                                    showMoreDetailHandler(service);
                                }
                            "
                        />
                    </swiper-slide>
                </swiper>
            </div>
        </transition>
        <modal
            width="1000"
            :is-show-modal="isShowMoreDetail"
            @on-back="isShowMoreDetail = false"
        >
            <template #content>
                <ServiceDetail
                    v-if="isShowMoreDetail"
                    :service-detail="serviceDetail"
                    :distance-service-from-property="
                        distanceServiceFromProperty
                    "
                />
            </template>
        </modal>
        <div v-if="loadLocalServiceList" class="loading-container">
            <Loader />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Restaurant from '@/components/Icon/Services/Restaurant.vue';

    import IconList from '@/components/Icon/List.vue';
    // import { servicesCate } from './service-category';
    import ServicesCategory from './ServicesCategory/ServicesCategory.vue';
    import Map from '@/components/section/map/index.vue';
    import Close from '@/components/Icon/Close.vue';
    import ServiceList from './ServicesList/ServicesList.vue';
    import ServiceItem from './ServicesList/ServicesItem/ServicesItem.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ServiceDetail from './ServicesList/ServiceDetail/ServiceDetail.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import NearbyService from '@/services/nearbyService';
    import { useGP } from '@/composables/useGP';
    import 'leaflet/dist/leaflet.css';
    import 'swiper/css';
    import { onBeforeMount, onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import Loader from '@/components/Common/Loader/Loader.vue';

    interface TypesNearbyServiceParsed {
        types: Array<string>;
        url_photo: string;
        name: string;
        vicinity: string;
        icon: string;
        geometry: {
            location: {
                lat: Function;
                lng: Function;
            };
        };
        additionalInfo: {
            details: string;
            email: string;
            phone: string | number;
            servicePromos: Array<any>;
            website: string;
        };
    }
    interface TypesNearbyServiceFromServer {
        serviceCategory: {
            code: string;
            iconpath: string;
            icon: string;
        };
        latitude: string;
        longitude: string;
        title: string;
        website: string;
        phone: string | number;
        image: string;
        imgpath: string;
        id: number;
        email: string;
        details: any;
        address: string;
        servicePromos: Array<any>;
        servicecategory: {
            code: string;
            icon: string;
            iconPath: string;
            id: number;
            name: string;
            status: boolean;
        };
    }

    // const BASE_URL_BACK = import.meta.env.VITE_API_ROOT_URL;
    const BASE_URL_BACK = import.meta.env.VITE_API_BASE_URL_UPLOADS;

    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const localServiceList = ref<Array<TypesNearbyServiceParsed>>([]);
    const loadLocalServiceList = ref<boolean>(false);

    const servicesCategory = ref<
        Array<{
            id: number;
            query_id: string;
            icon: string;
            name: string;
        }>
    >([]);
    const centerCoord = ref<any>({
        lat: 50.84535101789271,
        lng: 4.352409839630127,
    });
    const radius = ref<number>(100);
    const filter = ref<string[]>(['restaurant']);

    const isShowServicesList = ref<boolean>(false);
    const isShowMoreDetail = ref<boolean>(false);
    const propertyId = ref<any>(route.params.id);
    const mapCenterCoordinate = ref<Array<any>>([]);
    const showMap = ref<boolean>(false);
    const serviceList = ref<Array<any>>([]);
    const serviceDetail = ref<any>(null);
    const focusPosition = ref<{
        position: { lat: number; lng: number };
        zoom?: number;
    } | null>(null);
    const distanceServiceFromProperty = ref<string>('');

    const { result } = useGP('nearby-input', centerCoord, radius, filter);
    let showCateList = ref<boolean>(false);
    let keyMap = ref<number>(0);
    // onMounted(() => {
    //     getPropertyPosition();
    // });
    onBeforeMount(() => {
        getPropertyPosition();
        console.log('servicesssss:', serviceDetail.value);
    });
    watch(
        () => mapCenterCoordinate.value,
        (v) => {
            if (v.length) {
                showMap.value = true;
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => result.value,
        (v) => {
            console.log(v, 'watching RESULT VALUE$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log(serviceList.value, 'rrrrrrrrrrrrrrrrrrrrrrrrrr');
            serviceList.value = v;
            // console.log("local service lsit:" , localServiceList.value);
            
            if (!localServiceList.value.length) {
                getAppServices(centerCoord.value);
            } else {
                localServiceList.value.forEach((item) => {
                    if (isMatchService(filter.value, item)) {
                        let isDuplicated = false;
                        serviceList.value.forEach((sItem) => {
                            if (
                                JSON.stringify(sItem) === JSON.stringify(item)
                            ) {
                                isDuplicated = true;
                            }
                        });
                        if (!isDuplicated) {
                            serviceList.value = [item, ...serviceList.value];
                        }
                    }
                });
            }
            console.log("service list anat watch:", serviceList.value);
            
        },
        { immediate: true, deep: true }
    );

    function showCateListMobil() {
        showCateList.value = !showCateList.value;
    }

    function getDistance(distance: string) {
        distanceServiceFromProperty.value = distance;
        showCateList.value = false;
        console.log('tokony makato');
    }

    function getPropertyPosition() {
        const propertyDetail =
            store.getters['PropertyDetailModule/getPropertyDetail'].data;
        const propertyIdfromStore = propertyDetail.id;
        // console.log(propertyIdfromStore);
        if (propertyIdfromStore.toString() !== propertyId.value.toString()) {
            router.push('/*');
        } else {
            mapCenterCoordinate.value = [
                { lat: propertyDetail.latitude, lng: propertyDetail.longitude },
            ];
            centerCoord.value = {
                lat: propertyDetail.latitude,
                lng: propertyDetail.longitude,
            };

            getAppServiceCategories(centerCoord.value);
        }
    }

    async function getAppServiceCategories(pos: { lat: string; lng: string }) {
        try {
            const data: Array<any> =
                await NearbyService.getAppServiceCategories();
            console.log('service category with code:', data);

            servicesCategory.value = data
                .map(
                    (item: {
                        code: string;
                        id: number;
                        status: boolean;
                        icon: string;
                        iconPath: string;
                    }) => {
                        const { code, icon, iconPath, ...rest } = item;
                        if (icon) {
                            return {
                                ...rest,
                                ['query_id']: code,
                                ['icon']: `${BASE_URL_BACK}${iconPath}${icon}`,
                            };
                        }
                    }
                )
                .filter((item) => item) as Array<any>;
            getAppServices(pos);
            console.log(
                'category list mapped & filtered,',
                servicesCategory.value
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function getAppServices(pos: { lat: string; lng: string }) {
        const { lat, lng } = pos;
        const distancePerKm = radius.value / 1000;
        const getParams = {
            page: 1,
            itemsPerPage: 50,
            coordinate: `${lat},${lng},${distancePerKm}`,
        };
        loadLocalServiceList.value = true;
        try {
            const data = await NearbyService.getAppServices(getParams);
            console.log('theservices list:', data);

            const parsedArray: Array<TypesNearbyServiceParsed> = data.map(
                (item: TypesNearbyServiceFromServer) => ({
                    types: [item.servicecategory.code],
                    url_photo: `${BASE_URL_BACK}/${item.imgpath}/${item.image}`,
                    name: item.title,
                    vicinity: item.address,
                    icon: `${BASE_URL_BACK}${item.servicecategory.iconPath}${item.servicecategory.icon}`,

                    geometry: {
                        location: {
                            lat: () => +item.latitude,
                            lng: () => +item.longitude,
                        },
                    },
                    additionalInfo: {
                        email: item.email,
                        phone: item.phone,
                        servicePromos: item.servicePromos,
                        details: item.details,
                        website: item.website,
                    },
                })
            );
            // console.log('sssssssssss:', parsedArray[0].geometry.location.lat());

            // localServiceList.value = [...parsedArray];
            parsedArray.forEach((item) => {
                // if (isMatchService(filter.value, item) && !serviceList.value.includes(item)) {
                //     serviceList.value = [item, ...serviceList.value];
                // }
                if (isMatchService(filter.value, item)) {
                    let isDuplicated = false;
                    serviceList.value.forEach((sItem) => {
                        if (JSON.stringify(sItem) === JSON.stringify(item)) {
                            isDuplicated = true;
                        }
                    });
                    if (!isDuplicated) {
                        serviceList.value = [item, ...serviceList.value];
                        console.log('serivce duplicated:', serviceList.value);
                    }
                }
            });

            // serviceList.value = [...serviceList.value, ...parsedArray];
            console.log('parsed array:', parsedArray);
        } catch (err) {
            console.log(err, 'an error has occured');
        } finally {
            loadLocalServiceList.value = false;
        }
    }

    function isMatchService(
        filter: Array<string>,
        serviceToCheck: TypesNearbyServiceParsed
    ): boolean {
        let isMatch = false;
        filter.forEach((item) => {
            if (serviceToCheck.types.includes(item)) {
                isMatch = true;
            }
        });
        return isMatch;
    }

    function categoryHandler(category: { name: string; query_id: string }) {
        console.log('category handler:', category);
        if (category.query_id) {
            isShowServicesList.value = true;
            filter.value = [category.query_id];
            focusPosition.value = { position: centerCoord.value, zoom: 18 };
            console.log(localServiceList.value, 'ON CHANGED');
            keyMap.value++;
        }
    }

    function showMoreDetailHandler(service: any) {
        console.log("detail du service clicked:", service);
        
        console.log(
            JSON.stringify(service.geometry.location),
            'servicesCategory.value'
        );
        isShowMoreDetail.value = true;
        serviceDetail.value = service;
        console.log('service detail:', serviceDetail.value);

        focusPosition.value = {
            position: {
                lat: service.geometry.location.lat(),
                lng: service.geometry.location.lng(),
            },
            zoom: 20,
        };
    }
    function getSearArea(v: any) {
        Object.values(v).forEach((value) => {
            radius.value = value as any;
        });
        getAppServices(centerCoord.value);
    }
</script>

<style lang="scss" scoped>
    .service-nearby {
        @apply flex flex-row overflow-hidden;

        &__categoriesItemMobile {
            position: absolute;
            z-index: 1000;
            top: 230px;
        }
        &__categoriesItem {
            @media (min-width: 375px) {
                @apply hidden;
            }
            @media (min-width: 1024px) {
                @apply block;
            }
        }
        .loading-container {
            :deep() {
                .custom-loader {
                    z-index: 1000;
                    background-color: rgba(128, 128, 128, 0.438);
                }
            }
        }
        &__menuContainer {
            @apply flex ml-[10px];
        }
        &__area-search {
            position: absolute;
            // top: 83px;
            // z-index: 1000;
            // width: 100px;
            // left: 10px;
            z-index: 1000;
            width: 100px;
            top: 140px;
            // margin-left: 10px;
        }
        &__menuList {
            @apply absolute mt-[10px] flex justify-center items-center p-[4px]  bg-white rounded;
            z-index: 1000;
            top: 170px;
            @media (min-width: 1024px) {
                @apply hidden;
            }
        }
        &:deep() {
            .ant-modal {
                max-width: 1000px !important;
            }
        }
        // @apply relative overflow-hidden;
        &__map {
            margin: 5px;
            flex: 1;
            height: calc(100vh - 62px);
            &:deep() {
                .google-core-icon {
                    background-color: rgb(0 0 0 / 21%);
                    padding: 5px;
                    border-radius: 50%;
                }
                .popup-service {
                    &__content {
                        @apply flex gap-[10px] flex-col;
                        img {
                            height: 100px;
                            object-fit: cover;
                        }
                        h2 {
                            font-size: 18px;
                            font-weight: 600;
                        }
                        p {
                            margin: 0;
                        }
                    }
                }
                .property-marker {
                    margin-left: -18px;
                    margin-top: -48px;
                    z-index: 1000 !important;
                }
            }
        }
        &__category,
        &__detail {
            @apply absolute;
        }

        .slide-fade-enter-active {
            transition: all 0.3s ease-out;
        }

        .slide-fade-leave-active {
            transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
        }

        .slide-fade-enter-from,
        .slide-fade-leave-to {
            transform: translateY(20px);
            opacity: 0;
        }

        // .fade-enter-active,
        // .fade-leave-active {
        //     transition: opacity 0.5s ease;
        // }

        // .fade-enter-from,
        // .fade-leave-to {
        //     opacity: 0;
        // }

        .fade-category-enter-active,
        .fade-category-leave-active {
            transition: all 0.5s ease;
        }

        .fade-category-enter-from,
        .fade-category-leave-to {
            transform: translateX(400px);
        }
        .fade-detail-enter-active,
        .fade-detail-leave-active {
            transition: all 0.3s ease;
        }

        .fade-detail-enter-from,
        .fade-detail-leave-to {
            transform: translateY(200px);
        }

        &__detail {
            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none;
            scrollbar-width: none;
            @apply overflow-scroll;
            &--decrease-z-index {
                z-index: 1000;
            }
            &--mobile {
                @apply pl-[5px] w-full bottom-0 absolute;
                z-index: 1000;
                @screen md {
                    display: none;
                }
            }
            display: none;
            @screen md {
                display: block;
            }
            box-shadow: 1px 1px 5px gray;
            z-index: 1001;
            top: 0;
            right: 0;
            background-color: #fff;
            height: 100%;
            padding: 10px;
            &__close {
                &:hover {
                    cursor: pointer;
                }
                @apply mb-[10px];
            }
        }

        &__category {
            @apply pl-[60px] w-full top-[10px];
            z-index: 1000;
            &__item {
                @apply flex justify-evenly gap-[10px] items-center;
                padding: 5px;
                background-color: #fff;
                border-radius: 20px;
                box-shadow: 1px 1px 10px gray;
                min-width: 200px;
                width: 100%;
                transition: all 0.2s ease;
                &:hover {
                    transform: translateY(-3px);
                }
                height: 40px;
            }
            img {
                width: 35px;
                height: 100%;
                object-fit: contain;
            }
        }
        &:deep() {
            .swiper {
                padding: 10px;
                &-slide {
                    width: auto;
                }
            }
        }
    }
</style>
