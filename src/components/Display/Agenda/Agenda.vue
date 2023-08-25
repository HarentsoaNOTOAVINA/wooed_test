<template>
    <div class="calendar-app">
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="my-4"
        >
            <div class="calendar">
                <div class="calendar__header">
                    <div class="calendar__header-container">
                        <div class="calendar__header-left">
                            <div class="calendar__header-title">
                                <span>{{ titleMonth }}</span>
                                <span>{{ titleYears }}</span>
                            </div>
                            <Icon icon-name="ArrowBottom" />
                            <div class="calendar__header-date">
                                <InputDate
                                    class="w-auto"
                                    name="month"
                                    picker="month"
                                    format="MM/YYYY"
                                    @handle-change="switchMonth"
                                />
                            </div>
                        </div>

                        <div class="calendar__header-right">
                            <Select
                                name="view"
                                :options="viewList"
                                :value="calendarView"
                                @change-select="switchTimeGridView"
                            />
                            <!-- a revoir -->
                            <!-- <Button type-button="primary" @click="createAgenda">
                                Créer
                            </Button> -->
                        </div>
                    </div>
                </div>
                <hr class="__hr" />
                <div class="calendar-app-main">
                    <Transition appear name="fade-opacity" mode="out-in">
                        <div v-if="calendarView === 'timeGridDay'">
                            <DateRow
                                :dates="
                                    generateDateArray(
                                        agendaEvents.startingDate,
                                        agendaEvents.endingDate
                                    )
                                "
                                :active-date="activeDate"
                                @date-selected="goToDate"
                            />
                        </div>
                    </Transition>
                    <CustomCalendar  
                        :calendar-view="calendarView"
                        :current-date="activeDate"
                        @event-click="handleEventClick"
                        @date-select="handleNewDate"
                    />
                </div>
            </div>
        </MainCard>
        <Modal
            @on-back="toggleModal"
            :title="'W-Agenda'"
            :is-show-modal="displayModal"
        >
            <template #content>
                <div v-if="createNewEvent">
                    <EventForm :data="event" @handle-change="handleChange" />
                    <div class="modal__buttons">
                        <Button
                            type-button="primary-cancel"
                            class="btn"
                            @click="toggleModal"
                        >
                            Annuler
                        </Button>
                        <Button
                            type-button="primary"
                            class="btn"
                            @click="submitNewEvent"
                        >
                            Créer
                        </Button>
                    </div>
                </div>
                <div v-else-if="temp" class="text-center">
                    <EventForm :data="temp" :edit-mode="false" />
                    <div class="modal__buttons">
                        <Button
                            type-button="primary"
                            class="btn"
                            @click="toggleModal"
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { ref, onMounted, watch, computed } from 'vue';
    import { useStore } from 'vuex';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import DateRow from '@/components/Display/Agenda/components/dateRow.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import EventForm from '@/components/Display/Agenda/components/eventForm.vue';
    import CustomCalendar from '@/components/Display/Agenda/components/customCalendar.vue';

    import { notification } from 'ant-design-vue';
    import Icon from '@/components/Common/Icon/Icon.vue';


    interface Event {
        title?: string;
        place?: string;
        start?: string;
        end?: string;
        allDay?: boolean;
    }

    interface Agenda {
        startingDate?: string;
        endingDate?: string;
    }

    interface Option {
        value: string;
        label: string;
    }

    const viewList: Option[] = [
        {
            value: 'dayGridMonth',
            label: 'Mois',
        },
        {
            value: 'timeGridDay',
            label: 'Jour',
        },
    ];

    const breadcrumbListsData = [
        {
            label: 'W-agenda',
        },
    ];

    const calendarView = ref('dayGridMonth');
    const store = useStore();
    const displayModal = ref<boolean>(false);
    const temp = ref<any>();
    const event = ref<Event>({});
    const agendaEvents = ref<Agenda>({});
    const createNewEvent = ref<boolean>(false);
    const activeDate = ref<string>(getTodayDate());
    const titleMonth = ref<string>();
    const titleYears = ref<string | any>();
    const eventList = computed(() => store.getters["WagendaModule/getLoadedEvents"]);

    const emit = defineEmits<{
        (event: 'agenda-event', value: any): void;
    }>();

    const handleEventClick = (value: any) => {
        temp.value = eventList.value.find((element: any) => parseInt(element.id) === parseInt(value.id));
        console.error(temp.value);
        toggleModal();
    };

    watch(
        () => displayModal.value,
        (value) => {
            displayModal.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => temp.value,
        (value) => {
            temp.value = value
        },
        { immediate: true, deep: true }
    )

    onMounted(async () => {
        const { start, end } = getCurrentMonthDates();
        agendaEvents.value.startingDate = start;
        agendaEvents.value.endingDate = end;
        titleMonth.value = parseDate(end).monthName;
        titleYears.value = parseDate(end).year;
        await fetchAgendaEvents();
    });

    async function fetchAgendaEvents() {
        await store.dispatch('WagendaModule/fetchAgendaEvents', {
            startingDate: agendaEvents.value.startingDate,
            endingDate: agendaEvents.value.endingDate,
        })
    }

    function getCurrentMonthDates() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);
        const formattedMonthStart = monthStart.toISOString().slice(0, 10);
        const formattedMonthEnd = monthEnd.toISOString().slice(0, 10);

        return {
            start: formattedMonthStart,
            end: formattedMonthEnd,
        };
    }

    function parseDate(dateString: string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const monthNumber = date.getMonth() + 1;
        const monthName = date.toLocaleString('default', { month: 'long' });

        return {
            year,
            monthNumber,
            monthName
        };
    }

    async function submitNewEvent() {
        const newEvent = {
            title: event.value.title,
            place: event.value.place,
            start: event.value.start,
            end: event.value.end,
            allDay: event.value.allDay,
        };

        const payload = {
            data: newEvent,
            endingDate: formatDate(newEvent.end),
            startingDate: formatDate(newEvent.start),
        };

        event.value = {};
        toggleModal();
        createNewEvent.value = false;

        const success = await store.dispatch(
            'WagendaModule/postNewAgendaEvent',
            payload
        );

        if (success) {
            notification['success']({ message: 'Success' });
            await fetchAgendaEvents();
            emit('agenda-event', payload);
        } else {
            notification['error']({
                message: 'Une erreur est survenue, veuillez réessayer',
            });
        }
    }

    function formatDate(dateString?: string | Date) {
        if (dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            let month: any = date.getMonth() + 1;
            let day: any = date.getDate();

            // Add leading zero to month and day if needed
            if (month < 10) {
                month = `0${month}`;
            }
            if (day < 10) {
                day = `0${day}`;
            }

            return `${year}-${month}-${day}`;
        }
    }

    function toggleModal() {
        displayModal.value = !displayModal.value;
        if (!displayModal.value) temp.value = undefined;
    }

    function handleNewDate(value: any) {
        handleChange(value);
        createAgenda();
    }

    function handleChange(value: any) {
        event.value = { ...event.value, ...value };
    }

    function switchTimeGridView(value: any) {
        calendarView.value = value.view;
    }

    function createAgenda() {
        toggleModal();
        createNewEvent.value = true;
    }

    async function switchMonth(value: string) {
        const { month, year } = getMonthAndYear(value);
        const { start, end } = getFirstAndLastDateOfMonth(value);
        goToDate(start);
        titleMonth.value = month;
        titleYears.value = year;
        agendaEvents.value.startingDate = start;
        agendaEvents.value.endingDate = end;
        await fetchAgendaEvents();
    }

    function getMonthAndYear(value: string) {
        const date = new Date(value);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return { month, year };
    }

    function generateDateArray(startDate: any, endDate: any) {
        const dateArray = [];
        const currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray.map((date) => date.toISOString().substr(0, 10));
    }

    function goToDate(value: any) {
        activeDate.value = value
    }

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayFormatted = `${year}-${month}-${day}`;
        return todayFormatted;
    }

    function getFirstAndLastDateOfMonth(dateString: string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const firstDateOfMonth = new Date(year, month - 1, 1);
        const firstDateString = formatDate(firstDateOfMonth);
        const lastDateOfMonth = new Date(year, month, 0);
        const lastDateString = formatDate(lastDateOfMonth);
        return {
            start: firstDateString,
            end: lastDateString
        };
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
            // .fc-theme-standard td, .fc-theme-standard th {
            //   @apply border-none;
            // }
            .fc-theme-standard .fc-scrollgrid {
              @apply border-none;
            }
            .fc-col-header {
              @apply bg-gray rounded-[8px];
            }
            .fc-col-header-cell-cushion {
              @apply text-[12px] text-grayIcon font-[300] pointer-events-none;
            }
            .fc-daygrid-day-number {
              @apply text-[12px];
            }
            .fc .fc-daygrid-day.fc-day-today {
              @apply bg-gray;
              .fc-daygrid-day-number {
                @apply font-[700];
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
