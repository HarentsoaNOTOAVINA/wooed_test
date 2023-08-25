<template>
    <!-- <Loader v-if="loading" /> -->
    <div class="detail__head">
        <HeadProduct
            :label="`${info.user.name} ${info.user.firstname}`"
            :Text="info.title"
            class="detail__headProductBg"
            data-test="headProduct"
            :isMyFavorite="info.isMyFavorite ? true : false"
        />
        <div class="detail__swiper">
            <swiper
                ref="mySwiper"
                :pagination="{
                    clickable: true,
                }"
                :modules="modules"
            >
                <!-- :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                }" -->
                <swiper-slide v-for="(i, index) in info.images" :key="index">
                    <figure class="detail__img-wrap">
                        <img
                            :src="BASE_URL + i.path"
                            alt=""
                            class="detail__img"
                        />
                    </figure>
                    <AudioPlayer
                        v-if="i.soundPath"
                        :audio-src="i.soundPath"
                        class="mt-[10px]"
                    />
                </swiper-slide>
            </swiper>
        </div>
        <span
            data-test="btnDownSide"
            class="detail__botText"
            v-if="info.exprirationDate"
        >
            Expire
            {{
                // info.exprirationDate
                moment(info.exprirationDate).endOf('day').fromNow()
            }}</span
        >
    </div>

    <div class="detail__txtDetail">
        <div class="flex">
            <Title
                type="h2"
                :label="info.propertyType.name + ' ' + propertyReference"
                class="detail__propertyType"
                data-test="propertyType"
            />
            <span
                class="detail__propertyPrice ml-auto"
                data-test="propertyPrice"
                >{{ separatorMillier(info.prices) }} €</span
            >
        </div>
        <hr class="__hr" />
        <div class="detail__info">
            <Title type="h3" label="Détails" class="detail__title" />
            <div class="detail__details">
                <span class="detail__textsDetail" data-test="viewNumber"
                    >({{ info.viewTotal }}) vues</span
                >
                <span class="detail__textsDetail" data-test="propertySaved"
                    >({{ info.favoritesTotal }}) Sauvegardé</span
                >
                <span
                    class="detail__textsDetail detail__textsDetail-offerShared"
                    data-test="offerSharedNumber"
                    @click="showOfferShare"
                    >({{ offerShared.length }}) offre partagée{{
                        offerShared.length > 1 ? 's' : ''
                    }}</span
                >
                <span
                    v-if="props.userStatus"
                    class="detail__textsDetail"
                    data-test="offerSent"
                >
                    ({{ info && info.maxOffer ? info.maxOffer : `0` }}) offre
                    envoyée</span
                >
                <a class="detail__adresseDetail" @click="gotoLocation(info.id)">
                    <MarkerIcon />
                    <span> {{ info.address }}</span>
                </a>
                <div
                    v-if="
                        info.bedroomcount && info.bathroomcount && info.surface
                    "
                    class="detail__caracteristics"
                >
                    <span class="detail__caracteristics-content">
                        <BedIcon />
                        <span class="detail__textCaracteristics">{{
                            info.bedroomcount
                        }}</span>
                    </span>
                    <span class="detail__caracteristics-content">
                        <ToiletIcon />
                        <span class="detail__textCaracteristics">{{
                            info.bathroomcount
                        }}</span>
                    </span>
                    <span class="detail__caracteristics-content">
                        <SurfaceIcon />
                        <span class="detail__textCaracteristics"
                            >{{ info.surface }} m²</span
                        >
                    </span>
                </div>
            </div>
        </div>
        <!-- <div>
            « Maison » d’une superficie habitable d’environ « 100 » m², avec
            « cuisine », « Salle de séjour », « Salon séparé », « Salle à
            manger », « Véranda », « Jardin » orienté « orientation »
            , « Terrasse » , « Piscine » « 2 » « chambre(s) », « Buanderie »
            , « Autre (dupliquer le nombre des fois que des pièces sont
            ajoutées) » , « 2 » « Salle de bain » , « 2 » « Salle de douche »,
            « Garage» « 2 » place(s) de parking, « Emplacement » « 2 » place(s)
            de parking. Le bien a obtenu le résultat énergétique « A+ », le
            revenu cadastral non-indexé est de « montant ».
        </div> -->
        <div>
            <Title type="h3" label="Description générale" />
            <span>
                {{ info.propertyType.name }} d'une supercifie habitable
                d'environ {{ info.livingArea }}m²,
            </span>
        </div>
        <hr class="__hr" />
    </div>
</template>

<script lang="ts" setup>
    import HeadProduct from '@/components/Display/headProduct/HeadProduct.vue';
    import BedIcon from '@/components/Icon/Bed.vue';
    import ToiletIcon from '@/components/Icon/Toilet.vue';
    import SurfaceIcon from '@/components/Icon/Surface.vue';
    import MarkerIcon from '@/components/Icon/MarkerIcon.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';

    import moment from 'moment';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';

    import { useRoute, useRouter } from 'vue-router';
    import store from '@/store';
    import { computed, onMounted, ref, watch } from 'vue';

    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    import Title from '@/components/Common/Title/Title.vue';
    import AudioPlayer from '@/components/Display/AudioPlayer/AudioPlayer.vue';

    const props = defineProps({
        info: {
            type: Object,
            required: true,
        },
        userStatus: {
            type: Boolean,
            default: false,
        },
        offerShared: {
            type: Array,
            default: [],
        },
    });

    let propsValue = ref<any>();
    const modules = ref<any>([Autoplay, Pagination]);

    const propertyReference = computed(() => {
        switch (props.info.operationType) {
            case 'lease':
                return 'à louer';
            case 'sale':
                return 'à vendre';
            case 'occupied':
                return 'occupé';
            default:
                return '';
        }
    });

    const emit = defineEmits<{
        (e: 'handleShowOfferShare'): void;
    }>();

    const router = useRouter();

    watch(
        () => props.info,
        (first) => {
            propsValue.value = first;
        },
        { immediate: true, deep: true }
    );

    let BASE_URL = import.meta.env.VITE_API_BASE_URL;
    BASE_URL = BASE_URL.replace('/api/immo/v2', '');
    function gotoLocation(id: number) {
        router.push({ path: `/detail/localisation/${id}` });
    }

    function showOfferShare() {
        emit('handleShowOfferShare');
    }
</script>

<style lang="scss" scoped>
    .detail {
        @screen lg {
            @apply bg-white rounded-[8px] mx-4 mt-0 mb-4 p-3;
        }

        &__head {
            // height: 280px ;
            //responsive 1024px
            @apply relative h-[280px];
            @media (max-width: 1023px) {
                @apply mx-[-10px];
            }
            @screen lg {
                @apply flex flex-col h-fit;
            }
        }
        &__headProductBg {
            background: rgba(96, 96, 96, 0.25);
            //responsive 1024px
            @apply absolute px-[10px] py-[8px] z-[9] mb-[18px];
            @screen lg {
                @apply bg-white static;
            }
            &:deep() {
                h4,
                p {
                    @apply text-white;
                }
                @screen lg {
                    h4,
                    p {
                        @apply text-secondary;
                    }
                }
            }
        }
        .container-head {
            @apply w-full;
        }
        &__img-wrap {
            @apply h-[256px] overflow-hidden bg-strokeGray;
            // @apply rounded-[8px];
            img {
                border: 1px solid transparent;
            }
        }
        &__img {
            @apply w-full h-full object-cover;
        }
        &__botText {
            @apply absolute bottom-0 mt-0 mr-0 mb-[15px] ml-[15px] bg-secondary rounded py-1 px-2 text-white;
            //responsive 1024px
            @screen lg {
                @apply left-5 z-[1];
            }
        }
        &__txtDetail {
            @apply flex flex-col gap-[10px] rounded-[8px] rounded-b-none bg-white pt-[10px] px-[10px];
            @screen lg {
                @apply gap-[14px] p-0 rounded-none;
            }
        }
        &__propertyType {
            @apply font-semibold text-base;
        }
        &__propertyPrice {
            @apply ml-auto rounded-[15px] py-1 px-3 not-italic font-semibold text-sm text-alertStrRose bg-alertStrRoseOpacity;
        }
        &__title {
            //eto tohizana
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
        }
        &__details {
            border-left: 2px solid #000000;
            @apply flex flex-col mt-[15px] pl-[14px];
        }
        &__textsDetail {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            @apply mb-[18px];

            &-offerShared {
                @apply cursor-pointer;
            }
        }
        &__adresseDetail {
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            line-height: 17px;
            @apply flex gap-[3px] text-grayIcon w-max;
        }
        &__adresseDetail:hover {
            cursor: pointer;
        }
        &__caracteristics {
            @apply flex flex-row m-0 mt-[18px] gap-[25px];
            &-content {
                @apply flex items-center gap-[11px];
                &:deep() {
                    svg {
                        @apply w-[25px] h-[25px];
                        @screen md {
                            @apply w-[35px] h-[35px];
                        }
                    }
                }
            }
        }
        &__iconCaracteristics {
            margin: 0 12px 0 15px;
        }
        &__textCaracteristics {
            font-size: 14px;
            @apply relative font-semibold;
        }
        &__swiper {
            width: 100vw;
            @screen lg {
                width: 100%;
            }
            &:deep() {
                .swiper-pagination {
                    position: initial;
                    .swiper-pagination-bullet {
                        opacity: 1;
                        transition: all 0.5s ease;
                        @apply bg-grayIcon w-[8px] rounded-[8px];
                    }
                    .swiper-pagination-bullet-active {
                        transition: width 0.5s ease;
                        @apply bg-primary w-[24px];
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
