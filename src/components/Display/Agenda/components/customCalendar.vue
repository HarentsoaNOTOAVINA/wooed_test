<template>
    <div class="calendar-app">
        <FullCalendar class="calendar-app-calendar" :options="calendarOptions" ref="calendar">
            <template v-slot:eventContent="arg">
                <EventContainer :time-text="arg.timeText" :title="arg.event.title" />
            </template>
        </FullCalendar>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import {
    CalendarOptions,
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventSourceInput,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/vue3';
import { Calendar } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventContainer from '@/components/Display/Agenda/components/eventContainer.vue';

const store = useStore();

const createNewEvent = ref<boolean>(false);
const currentEvents = ref<EventApi[]>([]);
const calendar = ref<Calendar | any>(null);

const props = defineProps({
    calendarView: {
        type: String,
        default: 'dayGridMonth'
    },
    currentDate: {
        type: String
    }
});

const emit = defineEmits(["event-click", "date-select"]);

const handleDateSelect = async (selectInfo: DateSelectArg) => {
    createNewEvent.value = true;
    const data = {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
    };
    emit("date-select", data);
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
};

const handleEventClick = (clickInfo: EventClickArg) => {
    emit('event-click', clickInfo.event)
};

const handleEvents = (events: EventApi[]) => {
    currentEvents.value = events;
};

const handleScreenSize = () => {
    if (window.innerWidth < 576) {
        calendarOptions.value.views = {
            dayGridPlugin: {
                titleFormat: { year: 'numeric', month: 'long' },
                dayHeaderFormat: { weekday: 'short' },
            },
            timeGridWeek: {
                titleFormat: { month: 'long', year: 'numeric' },
                dayHeaderFormat: { weekday: 'long', day: 'numeric' },
            },
        };
    } else {
        calendarOptions.value.views = {
            dayGridMonth: {
                titleFormat: { year: 'numeric', month: 'long' },
                dayHeaderFormat: { weekday: 'long' },
            },
            timeGridWeek: {
                titleFormat: { month: 'long', year: 'numeric' },
                dayHeaderFormat: { weekday: 'long', day: 'numeric' },
            },
        };
    }
};

const calendarOptions = ref<CalendarOptions>({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: false,
    initialView: 'dayGridMonth',
    events: computed(() => store.getters["WagendaModule/getLoadedEvents"]) as EventSourceInput,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    locales: allLocales,
    locale: 'fr', // the initial locale
    views: {
        dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long' },
            dayHeaderFormat: { weekday: 'long' },
        },
        timeGridWeek: {
            titleFormat: { month: 'long', year: 'numeric' },
            dayHeaderFormat: { weekday: 'long', day: 'numeric' },
        },
    },
    slotLabelFormat: [
        { hour: 'numeric', minute: '2-digit' },
        { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
    ],
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    windowResize: handleScreenSize,
});

watch(
    () => props.calendarView,
    (value) => {
        switchTimeGridView(value);
    },
    { immediate: true, deep: true }
)

watch(
    () => props.currentDate,
    (value) => {
        goToDate(value);
    },
    { immediate: true, deep: true }
)

function switchTimeGridView(value: any) {
    if (calendar.value) {
        const calendarApi = calendar.value.getApi();
        calendarApi.changeView(value);
        console.error(calendarApi.currentData.viewApi.currentStart);
        console.error(calendarApi.currentData.viewApi.title);
    }
}

function goToDate(value: any) {
    if (calendar.value && value) {
        const calendarApi = calendar.value.getApi();
        calendarApi.gotoDate(value);
    }
}
</script>
<style lang="scss" scoped>
@import '@/style.scss';

.calendar-app-main {
    &:deep() {
        // .fc {
        @apply overflow-y-auto;
        @include scrollbar;
        // }

        .fc-toolbar-title {
            @apply text-primary;
        }

        .fc-header-toolbar {
            @apply capitalize flex flex-col justify-start;

            @screen md {
                @apply flex-row justify-between;
            }
        }

        .fc-col-header-cell {
            @apply text-primary capitalize;
        }

        .fc-timegrid-axis-frame {
            @apply hidden;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
            @apply border-none;
        }

        .fc-theme-standard .fc-scrollgrid {
            @apply border-none;
        }

        .fc-col-header {
            @apply bg-gray rounded-[8px] mb-[18px];

            th {
                @apply py-[4px];
            }
        }

        .fc-col-header-cell-cushion {
            @apply text-[12px] text-grayIcon font-[300] pointer-events-none;
        }

        .fc-daygrid-day-number {
            @apply text-[12px] font-[300] text-grayIcon;
        }

        .fc .fc-daygrid-day.fc-day-today {
            @apply bg-gray;

            .fc-daygrid-day-number {
                @apply font-[700];
            }
        }

        .fc-scrollgrid-sync-table {
            @apply border-t-[1px] border-solid border-gray;

            tr {
                @apply border-t-[1px] border-solid border-gray;
            }
        }
    }

    flex-grow: 1;
}

.calendar {
    @apply flex flex-col gap-[18px];

    &__header {
        @apply flex flex-col gap-[18px];

        &-container {
            @apply flex flex-row items-center justify-between gap-x-2;
        }

        &-title {
            @apply flex items-center gap-[5px] font-[600] text-[16px];

            span {
                &:first-child {
                    @apply capitalize text-secondary;
                }

                &:last-child {
                    @apply text-grayIcon opacity-[25%];
                }
            }
        }

        &-left {
            @apply relative flex items-center gap-[10px];

            &:deep() {
                .icon {
                    @apply mt-[4px];

                    svg path {
                        @apply fill-grayIcon opacity-[25%];
                    }
                }
            }
        }

        &-right {
            @apply w-auto flex flex-row gap-x-2 items-center;

            &:deep() {
                .custom-select__wrapper {
                    @apply mb-0;
                }

                .ant-select-selector {
                    @apply min-h-0;
                }
            }
        }

        &-date {
            @apply absolute top-0 left-0 w-full h-full overflow-hidden;

            &:deep() {
                .ant-space {
                    @apply opacity-0;
                }

                .ant-picker-clear {
                    @apply hidden;
                }
            }
        }
    }
}

.modal {
    &__inputs {
        @apply flex flex-row gap-x-2;
    }

    &__buttons {
        @apply w-full flex justify-center gap-x-[18px] mt-4;
    }
}

.fade-opacity-enter-active,
.fade-opacity-leave-active {
    @apply transition-all;
}

.fade-opacity-enter-from,
.fade-opacity-leave-to {
    @apply opacity-0 translate-y-[50px];
}
</style>
