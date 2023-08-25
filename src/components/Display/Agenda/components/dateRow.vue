<template>
    <div class="date__row">
        <swiper :slides-per-view="1.2" :space-between="10" :breakpoints="swiperOptions.breakpoints" :navigation="true"
            :modules="modules" :active-index="activeSlider">
        <swiper-slide v-for="(date, index) in dates" :key="index" v-slot="{ isActive }">
            <div class="date__cell" 
                :class="{ 'selected': props.activeDate === date }" @click="selectDate(date)">
                <span class="date__weekday">{{ formatDate(date).weekday }}</span>
                <span class="date__day">{{ formatDate(date).day }}</span>
            </div>
        </swiper-slide>
        </swiper>

    </div>
</template>
<script lang="ts" setup>
import { ref, PropType } from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper';
import { onMounted, watch } from "vue";

const modules = ref<any>([Autoplay, Navigation]);
const activeSlider = ref<number>(0);

const swiperOptions = {
    breakpoints: {
        1100: {
            slidesPerView: 12,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 12,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 10,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 8,
            spaceBetween: 10,
        },
        500: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        375: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    },
};

const props = defineProps({
    dates: {
        type: Array as PropType<string[]>,
        default: []
    },
    activeDate: {
        type: String,
        required: true
    }
})

const emit = defineEmits(["date-selected"]);
const selectedDate = ref<any>();

watch(
    () => props.activeDate,
    (value) => {
        setActiveSlider(value);
    },
    { immediate: true, deep: true }
)

function setActiveSlider(value: string) {
    console.error(value);
    if (props.dates.length) activeSlider.value = props.dates.findIndex((element: string) => element === value);
    console.error(activeSlider.value);
}

function selectDate(value: any) {
    selectedDate.value = value;
    emit("date-selected", value);
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: any = { weekday: "short", day: "2-digit" };
    const formattedDate = date.toLocaleString("fr-FR", options);
    const [weekday, day] = formattedDate.split(" ");
    return { weekday, day };
}
</script>
<style lang="scss" scoped>
.date {
    &__row {
        @apply flex flex-nowrap justify-between items-center px-2 py-1;
        background-color: var(--color-gray);

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
        }
    }

    &__cell {
        @apply flex-grow text-center cursor-pointer px-4;
    }

    &__weekday {
        @apply capitalize text-sm;
    }

    &__day {
        @apply font-bold text-xl;
    }
}

.selected {
    @apply rounded;
    background-color: var(--color-primary);
    color: #fff;
}

span {
    @apply block;
}
</style>