<template>
    <div class="timeline-container" ref="timelineContainer">
        <div class="timeline">
            <div
                class="timeline-item"
                v-for="(event, index) in filteredEvents"
                :key="event.title"
                :class="getPosition(event.date)"
                :style="{ left: getLeftPosition(event.date) + '%' }"
            >
                <div
                    :class="
                        event.name === 'ultimeDate'
                            ? 'picker__container-red'
                            : event.name === 'todaysDate'
                            ? 'picker__container-green'
                            : ''
                    "
                >
                    <div
                        v-if="['todaysDate', 'ultimeDate'].includes(event.name)"
                        class="picker"
                        :class="
                            event.name === 'ultimeDate'
                                ? 'picker--border-red'
                                : 'picker--border'
                        "
                    ></div>
                    <Icon v-else icon-name="Picker" class="picker" />
                    <div class="timeline-item-content">
                        <p class="title">{{ event.title }}</p>
                        <p class="date">
                            {{ moment(event.date).format('DD MMM YYYY') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import moment from 'moment';
    import { onMounted, ref } from 'vue';

    interface Data {
        title: string;
        name: string;
        date: string;
    }

    const props = defineProps({
        eventsData: {
            type: Array as () => Data[],
            default: () => [],
        },
    });

    const events = ref<Data[]>(props.eventsData);

    const signatureDate = ref();
    const endDate = ref();
    const filteredEvents = ref<Array<any>>([]);

    onMounted(() => {
        filteredEvents.value = events.value
            .filter((event) => event.date)
            .sort((a, b) => a.date.localeCompare(b.date));

        const dates = events.value.map((event) => moment(event.date));
        const maxDate = moment.max(dates);
        const minDate = moment.min(dates);

        signatureDate.value = minDate.toDate()
        endDate.value = maxDate.toDate()
        console.log('maxDate', maxDate.toDate());
        console.log('minDate', minDate.toDate());
        console.log('signatureDate', signatureDate);
    });

    const getLeftPosition = (date: string) => {
        const eventDate = new Date(date);
        const totalDays =
            (endDate.value.getTime() - signatureDate.value.getTime()) / (1000 * 3600 * 24);
        const daysFromSignature =
            (eventDate.getTime() - signatureDate.value.getTime()) /
            (1000 * 3600 * 24);
        const position = (daysFromSignature / totalDays) * 50;
        return position;
    };

    const getPosition = (date: string) => {
        const eventDate = new Date(date);
        if (eventDate <= signatureDate.value) {
            return 'left';
        } else if (eventDate >= endDate.value) {
            return 'right';
        } else {
            return '';
        }
    };

    const currentDate = new Date().toISOString().substring(0, 10);
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .timeline-container {
        @apply relative flex flex-row;
        &:before {
            content: '';
            @apply absolute top-[13px] left-0 w-full h-[4px] bg-gray rounded-[8px];
        }
    }

    .timeline {
        @apply relative flex flex-row justify-between w-full h-full overflow-x-auto pb-[10px] mb-[-10px];
        @include scrollbar;
    }

    .timeline-item {
        @apply relative flex flex-col mx-[8px] w-[120px] pt-[24px] min-w-[100px];
        .picker {
            @apply absolute top-[3px] left-[50%] translate-x-[-50%];
            &--border {
                @apply top-0 w-[2px] h-[30px] bg-green;
            }
            &--border-red {
                @apply top-0 w-[2px] h-[30px] bg-red;
            }
            &__container-green {
                .title {
                    @apply text-green;
                }
            }
            &__container-red {
                .title {
                    @apply text-red;
                }
            }
        }
    }

    .timeline-item-content {
        @apply relative mt-[8px] text-center;
    }

    .title {
        @apply m-0 text-[14px] font-[600] text-grayIcon;
    }

    .date {
        @apply m-0 text-[14px] text-grayLabel;
    }

    .position-left {
        @apply text-right;
    }

    .position-right {
        @apply text-left;
    }
</style>
