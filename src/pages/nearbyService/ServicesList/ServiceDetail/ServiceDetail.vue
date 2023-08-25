<template>
    <div class="service__more">
        <div class="service__more__img">
            <img v-if="urlPhoto" :src="urlPhoto" alt="image-service" />
            <img
                v-else
                src="@/static/images/empty-img.png"
                alt="image-service"
            />
        </div>
        <div class="service__more__body">
            <div>
                <Title
                    class="service__more__body__title"
                    type="h2"
                    :label="serviceDetail.name"
                />
                <paragraphe class="service__more__body__location"
                    ><Map /> {{ serviceDetail.vicinity }}</paragraphe
                >
            </div>
            <div
                class="service__more__body__barCode"
                v-if="
                    serviceDetail.additionalInfo &&
                    serviceDetail.additionalInfo.servicePromos
                "
            >
                <paragraphe font-size="16px"
                    >Code bar promos de l'établissement:
                </paragraphe>
                <img
                    :src="`${BASE_URL_BACK}/${serviceDetail.additionalInfo.servicePromos[0].barCodePath}/${serviceDetail.additionalInfo.servicePromos[0].barCode}`"
                    alt=""
                />
            </div>
        </div>
        <div class="service__more__body__desc">
            <paragraphe>
                Distance par rapport au bien:
                <strong>{{ dist + ' m' }} </strong>
            </paragraphe>
        </div>
        <template v-if="!!serviceDetail.additionalInfo">
            <hr />
            <div class="service__additional_info">
                <paragraphe>
                    Téléphone:
                    <strong>{{
                        serviceDetail.additionalInfo.phone || 'N/A'
                    }}</strong>
                </paragraphe>
                <paragraphe>
                    Site web:
                    <strong>{{
                        serviceDetail.additionalInfo.website || 'N/A'
                    }}</strong>
                </paragraphe>
                <paragraphe>
                    Email:
                    <strong>{{
                        serviceDetail.additionalInfo.email || 'N/A'
                    }}</strong>
                </paragraphe>
                <paragraphe>
                    Details:
                    <strong>{{
                        serviceDetail.additionalInfo.details || 'N/A'
                    }}</strong>
                </paragraphe>
                <paragraphe>
                    Service promos:
                    <strong>{{
                        (serviceDetail.additionalInfo.servicePromos &&
                            serviceDetail.additionalInfo.servicePromos
                                .length) ||
                        'N/A'
                    }}</strong>
                </paragraphe>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Map from '@/components/Icon/Map.vue';
    import { PropType, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';

    const urlPhoto = ref<string>('');
    // const BASE_URL_BACK = import.meta.env.VITE_API_BASE_URL;
    const BASE_URL_BACK = import.meta.env.VITE_API_BASE_URL_UPLOADS;
    const store = useStore();

    const props = defineProps({
        serviceDetail: { type: Object as any },
        distanceServiceFromProperty: { type: String },
    });
    let latServ = props.serviceDetail.geometry.location.lat();
    let longServ = props.serviceDetail.geometry.location.lng();
    let propertyLat = ref<number>();
    let propertyLong = ref<number>();
    let dist = ref<any>();
    onMounted(() => {
        getPropertyCoords();
        dist.value = distance(
            propertyLat.value,
            propertyLong.value,
            latServ,
            longServ
        ).toFixed(2);

        console.log('url photo', urlPhoto.value);
        
    });

    watch(
        () => props.serviceDetail,
        (v) => {
            console.log(v, 'props.serviceDetail');
            if (v) {
                if (!!v.url_photo) {
                    urlPhoto.value = v.url_photo;
                    console.log(urlPhoto, 'urlPhoto');
                }
            }
        },
        { immediate: true }
    );

    function getPropertyCoords() {
        const propertyDetail =
            store.getters['PropertyDetailModule/getPropertyDetail'].data;
        propertyLat.value = propertyDetail.latitude;
        propertyLong.value = propertyDetail.longitude;
        console.log('property lat:', propertyLat.value);
        console.log('property long:', propertyLong.value);
    }

    function distance(lat1: any, lon1: any, lat2: any, lon2: any) {
        const R = 6371;
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(lat1)) *
                Math.cos(degToRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance * 1000;
    }

    function degToRad(degrees: number) {
        return degrees * (Math.PI / 180);
    }
</script>

<style lang="scss" scoped>
    .service__more {
        @apply flex justify-center flex-col gap-[20px];
        &__img {
            img {
                @apply w-full h-[212px] object-cover;
                border-radius: 8px;
            }
        }
        &__body {
            @apply flex gap-[20px];
            &__title {
                font-size: 20px;
                line-height: 24px;
                font-weight: 600;
                @apply mb-[10px];
            }
            &__location {
                @apply flex gap-[20px];
                color: var(--color-stroke-gray);
                font-size: 12px;
            }
            &__desc {
                color: var(--color-gray-icon);
            }
            &__barCode {
                @apply flex flex-col gap-[10px] justify-center items-center w-full ml-[100px];
            }
        }
    }
</style>
