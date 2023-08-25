<template>
    <div class="slideMenu">
        <swiper :slides-per-view="1.2" :space-between="10" :breakpoints="swiperOptions.breakpoints" :navigation="true"
            :modules="modules">
            <swiper-slide v-for="(item, index) in slideMenu" :key="index">
                <div @click="handleClick(item)" class="cursor-pointer">
                    <div v-if="announceMenu" class="slideMenu__item slideMenu__item--announce">
                        <Icon :icon-name="item.icon" class="slideMenu__icon" />
                        <div class="slideMenu__label-container">
                            <Title type="h2" :label="item.label" weight="600" class="slideMenu__title" />
                            <span class="slideMenu__label-content">{{
                                item.labelContent
                            }}</span>
                        </div>
                    </div>
                    <div v-else class="slideMenu__item">
                        <Icon :icon-name="item.icon" class="slideMenu__icon" />
                        <Title type="h2" :label="item.label" weight="600" class="slideMenu__title" />
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/Common/Icon/Icon.vue';
import Title from '@/components/Common/Title/Title.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const modules = ref<any>([Autoplay, Navigation]);

const swiperOptions = {
    breakpoints: {
        1100: {
            slidesPerView: 3,
            spaceBetween: 18,
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 18,
        },
        768: {
            slidesPerView: 1.5,
            spaceBetween: 18,
        },
        640: {
            slidesPerView: 2.5,
            spaceBetween: 18,
        },
        500: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        375: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
    },
};

const emit = defineEmits(["set-active-component"]);

const props = defineProps({
    announceMenu: {
        type: Boolean,
        default: false,
    },
    slideMenu: {
        type: Object,
        default: null,
    },
});

const swiperUpdate = () => {
    console.log('swiperInstanceUpdate');
};

onMounted(() => {
    window.addEventListener('resize', swiperUpdate);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', swiperUpdate);
});

function handleClick(value: any) {
    value.routeName
        ? router.push({ name: value.routeName })
        : value.component
            ? emit('set-active-component', { component: value.component })
            : console.error('something went wrong');
}
</script>

<style lang="scss" scoped>
@import '@/style.scss';

.slideMenu {
    @apply w-full;

    .swiper {
        @apply w-full;
    }

    .swiper-slide {
        @apply h-auto;
    }

    &:deep() {

        .swiper-button-prev,
        .swiper-button-next {
            @apply text-primary block w-[10px] h-[18px] m-0 -translate-y-[50%];

            @screen md {
                @apply hidden;
            }

            &:after {
                @apply text-lg font-bold;
            }
        }

        &:hover {

            .swiper-button-prev,
            .swiper-button-next {
                @apply block;

                &:hover {
                    @apply text-grayIcon;
                }
            }

        }

        .swiper-button-prev {
            @apply left-[5px];
        }

        .swiper-button-next {
            @apply right-[5px];
        }
    }

    &__link {
        @apply block h-full;

        &:hover,
        &:active {
            .slideMenu__item {
                @apply bg-strokeGray transition;
            }
        }
    }

    &__item {
        @apply h-full flex flex-col p-[24px] gap-[10px] bg-gray rounded-[8px];
    }

    &__title {
        @apply text-[14px] truncate;
    }

    &__icon {
        @apply w-[24px] h-[24px];

        &:deep() {
            svg {
                @apply w-[100%] h-auto;
            }
        }
    }

    &__item--announce {
        @apply flex flex-row items-center;
    }

    &__label-content {
        @apply font-[300] text-[10px] text-grayIcon truncate;
    }
}
</style>
