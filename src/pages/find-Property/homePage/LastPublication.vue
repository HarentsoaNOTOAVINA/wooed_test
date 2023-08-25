<template>
    <div class="lastPublication">
        <Title
            type="h2"
            label="Dernières publications à vendre"
            class="lastPublication__title"
        />
        <div class="lastPublication__items">
            <Carousel
                :slidesPerView="1"
                :spaceBetween="0"
                :breakpoints="breakpoints"
                :pagination="false"
            >
                <template #content>
                    <template v-for="(item, index) in lastDataPub">
                        <SwiperSlide v-if="item.images.length" :key="index">
                            <div class="lastPublication__item-container">
                                <figure
                                    class="lastPublication__figure"
                                    @click="handleCardClick(item, $event)"
                                >
                                    <img
                                        :src="
                                            item.images
                                                ? item.images.length > 0
                                                    ? `${BASE_URL}${
                                                          item.images[
                                                              item.images
                                                                  .length - 1
                                                          ].path
                                                      }`
                                                    : ' '
                                                : ''
                                        "
                                        alt="Last publication"
                                    />
                                </figure>
                                <div class="lastPublication__content">
                                    <Title
                                        type="h4"
                                        :label="item.propertyType.name"
                                        class="lastPublication__content-title"
                                    />
                                    <span
                                        class="lastPublication__content-price"
                                    >
                                        {{ separatorMillier(item.prices) }} €
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    </template>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Carousel from '@/components/Display/carousel/carousel.vue';
    import NoPicture from '@/components/Display/NoPicture/NoPicture.vue';
    import { SwiperSlide } from 'swiper/vue';
    import { useRouter } from 'vue-router';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';
    const router = useRouter();

    const props = defineProps({
        lastDataPub: {
            type: Object,
            default: {},
        },
    });

    const breakpoints = {
        // breakpoint for window width <= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        // breakpoint for window width <= 768px
        768: {
            slidesPerView: 3,
        },
        // breakpoint for window width <= 1024px
        1024: {
            slidesPerView: 4,
        },
        // breakpoint for window width <= 1200px
        1200: {
            slidesPerView: 5,
        },
    };

    let BASE_URL = import.meta.env.VITE_API_BASE_URL;
    BASE_URL = BASE_URL.replace('/api/immo/v2', '');

    function handleCardClick(cardData: any, $event: any) {
        router.push(`detail/${cardData.id}`);
    }
</script>

<style lang="scss" scoped>
    .lastPublication {
        @apply container flex flex-col gap-[18px] py-[24px] px-[14px];
        @screen md {
            @apply gap-[24px] py-[40px];
        }
        &__title {
            @apply font-[600];
        }
        &__items {
            @apply h-[294px] bg-white;
            &:deep() {
                .carousel-container {
                    @apply h-full;
                }
                .swiper {
                    overflow: initial;
                    @apply h-full overflow-x-clip;
                    // &:hover {
                    //     @apply  px-[10px] mx-[-10px];
                    // }
                }
                .swiper-slide {
                    @apply relative;
                    &:hover {
                        @apply z-10;
                    }
                }
            }
        }
        &__item-container {
            // transform: scale(1);
            @apply w-full h-full cursor-pointer transition-transform relative overflow-hidden;
            &:hover {
                @media (min-device-width: 640px) {
                    // transform: scale(1.1);
                    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
                    @apply transition-transform z-10 rounded-[8px];
                    & ~ .lastPublication__items {
                        @apply overflow-hidden;
                    }
                    .lastPublication__content {
                        @apply bottom-0 opacity-100;
                        transition: all 0.3s ease;
                    }
                }
            }
        }
        &__figure {
            @apply h-full;
            img {
                @apply h-full w-full object-cover;
            }
        }
        &__content {
            background: linear-gradient(
                to bottom,
                rgb(242, 242, 242, 0),
                rgb(148, 159, 181, 0.5),
                rgb(148, 159, 181, 0.8),
                var(--color-primary),
                var(--color-primary)
            );
            // backdrop-filter: blur(5px);
            transition: all 0.5s ease;
            @apply absolute bottom-[-80px] flex justify-between items-end gap-[14px] w-full h-[40%] p-[10px] opacity-0;
            @media (max-device-width: 1279px) and (-webkit-min-device-pixel-ratio: 1) {
                @apply bottom-0 opacity-100;
            }
            &-title {
                max-width: 60%;
                @apply font-[600] text-[14px] mt-[4px] text-white;
            }
            &-price {
                @apply rounded-[15px] py-1 px-3 not-italic font-semibold text-sm text-alertStrRose bg-white text-right;
            }
        }
    }
</style>
