<template>
    <div class="carousel__container">
        <Swiper
            :autoplay="{ delay: 2000, disableOnInteraction: false }"
            :slides-per-view="slidesPerView"
            :space-between="spaceBetween"
            :navigation="false"
            :pagination="pagination"
            :modules="[Navigation, Pagination, Parallax, Autoplay]"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :loop="true"
            :breakpoints="breakpoints"
        >
            <slot name="content" />
            <!-- wrap each child element with SwiperSlide-->
            <!--
                    ----- USAGE EXEMPLE -------
            <Carousel>
                <template #content>
                    <SwiperSlide>
                        <Child_1/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Child_2/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Child_3/>
                    </SwiperSlide>
                </template>
            </Carousel>
            -->
        </Swiper>
        <button
            class="carousel__button carousel__button-prev"
            @click="prevSlide"
        >
            <Icon icon-name="PrevSlide" />
        </button>
        <button
            class="carousel__button carousel__button-next"
            @click="nextSlide"
        >
            <Icon icon-name="NextSlide" />
        </button>
    </div>
</template>

<script setup lang="ts">
    import PrevArrowRounded from '@/components/Icon/prevArrowRounded.vue';
    import NextArrowRounded from '@/components/Icon/nextArrowRounded.vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, Pagination, Navigation, Parallax } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    interface Breakpoint {
        [key: string]: any;
    }

    const props = defineProps({
        slidesPerView: {
            type: Number,
            default: 1,
        },
        spaceBetween: {
            type: Number,
            default: 40,
        },
        pagination: {
            type: Boolean || Object,
            default: { clickable: true },
        },
        breakpoints: {
            type: Object,
            default: () => ({
                // breakpoint for window width <= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                // breakpoint for window width <= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                // breakpoint for window width <= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // breakpoint for window width <= 1200px
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
            }),
        },
        loop: {
            type: Boolean,
            default: true,
        },
    });

    const swiper = ref<any>();
    const isLastSlide = ref<boolean>(false);

    function onSwiper(s: any) {
        swiper.value = s;
    }

    function prevSlide() {
        if (swiper.value) {
            swiper.value.slidePrev();
        }
    }

    function nextSlide() {
        if (swiper.value) {
            swiper.value.slideNext();
        }
    }

    const onSlideChange = () => {
        // const { activeIndex, slides } = swiper.value;
        // isLastSlide.value = activeIndex === slides.length - 1;
    };
</script>

<style lang="scss" scoped>
    .carousel {
        &__container {
            @apply h-full w-full relative;
        }
        &__button {
            @apply absolute top-[50%] transform translate-y-[-50%] z-10;
            &-next {
                @apply right-[-14px];
                @screen xl {
                    @apply right-[-20px];
                }
            }
            &-prev {
                @apply left-[-14px];
                @screen xl {
                    @apply left-[-20px];
                }
            }
            &:hover, &:hover:active {
                &:deep() {
                    svg {
                        rect:first-child {
                            @apply fill-primary transition-all;
                        }
                        path {
                            @apply fill-white transition-all;
                        }
                        rect:last-child {
                            @apply stroke-none;
                        }
                    }
                }
            }
        }
    }
</style>
