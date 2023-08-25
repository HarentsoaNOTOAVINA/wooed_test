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

    const props = defineProps({
        contratSign: {
            type: null,
        },
        endLease: {
            type: null,
        },
    });

    const events = [
        {
            title: 'Signature du contrat',
            name: 'contractSignature',
            date: moment(props.contratSign).format('YYYY-MM-DD'),
        },
        {
            title: 'Constitution de la garantie',
            name: 'constitutionGuarantee',
            date: '2023-05-05',
        },
        {
            title: "Signature de l'état des lieux d'entrée",
            name: 'SignatureEntryInventory',
            date: '2023-05-08',
        },
        {
            title: 'Date d’aujourd’hui',
            name: 'todaysDate',
            date: new Date().toISOString().substring(0, 10),
        },
        {
            title: 'Date ultime d’envoi du congé pour le bailleur',
            name: 'ultimeDate',
            date: '2023-10-06',
        },
        {
            title: 'Fin du bail',
            name: 'endLease',
            date: moment(props.endLease).format('YYYY-MM-DD'),
        },
        {
            title: "Signature de l'état des lieux de sortie",
            name: 'signatureExitInventory',
            date: '2027-10-30',
        },
        {
            title: 'Libération de la garantie',
            name: 'warrantyRelease',
            date: '2027-11-15',
        },
    ];

    const signatureDate = new Date(props.contratSign);
    const endDate = new Date(props.endLease);
    const filteredEvents = ref<Array<any>>([]);

    const getLeftPosition = (date: string) => {
        const eventDate = new Date(date);
        const totalDays =
            (endDate.getTime() - signatureDate.getTime()) / (1000 * 3600 * 24);
        const daysFromSignature =
            (eventDate.getTime() - signatureDate.getTime()) /
            (1000 * 3600 * 24);
        const position = (daysFromSignature / totalDays) * 50;
        return position;
    };

    const getPosition = (date: string) => {
        const eventDate = new Date(date);
        if (eventDate <= signatureDate) {
            return 'left';
        } else if (eventDate >= endDate) {
            return 'right';
        } else {
            return '';
        }
    };

    const currentDate = new Date().toISOString().substring(0, 10);

    onMounted(() => {
        filteredEvents.value = events
            .filter((event) => event.date)
            .sort((a, b) => a.date.localeCompare(b.date));

        console.log(filteredEvents.value);
    });
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
