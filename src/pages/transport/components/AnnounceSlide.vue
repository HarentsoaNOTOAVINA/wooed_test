<template>
    <div class="announceSlide">
        <swiper :slides-per-view="1" :space-between="9" :breakpoints="swiperOptions.breakpoints" :navigation="true"
            :modules="modules">
            <swiper-slide v-for="(item, index) in data" :key="index">
                <ColisCardItem :gridHorizontal="true" :smallCard="true" :colisData="item" @click="handleClick" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import ColisCardItem from './ColisCardItem.vue';

const router = useRouter();

const modules = ref<any>([Autoplay, Navigation]);

const swiperOptions = {
    breakpoints: {
        1280: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 2.5,
        },
        900: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2.5,
        },
        375: {
            slidesPerView: 1.5,
        },
    },
};

const emit = defineEmits(['set-active-component']);

const props = defineProps({
    announceMenu: {
        type: Boolean,
        default: false,
    },
    announceSlide: {
        type: Object,
        default: null,
    },
    data: {
        type: Object,
        default: {}
    }
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
            ? emit('set-active-component', value.component)
            : console.error('something went wrong');
}
</script>

<style lang="scss" scoped>
@import '@/style.scss';

.announceSlide {
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
}
</style>
