<template>
    <div class="collectivePlot">
        <Title
            type="h3"
            label="Parcelles collectives"
            class="collectivePlot__title"
        />
        <hr class="__hr" />
        <div class="collectivePlot__items">
            <CardCollectivePlot
                v-for="(item, index) in dataCollectivePlot"
                :data="item"
                :key="index"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import { ref } from 'vue';
    import CardCollectivePlot from './CardCollectivePlot.vue';

    interface DataCollectivePlot {
        actionType: string;
        name: string;
        initiator?: string;
        dateLimit?: DateLimit;
        dataFiles?: DataFiles[];
        suggestion?: string;
    }

    interface DateLimit {
        startDate?: string;
        endDate?: string;
    }

    interface DataFiles {
        name?: string;
        url?: string;
        thumbUrl?: string;
    }

    const dataCollectivePlot = ref<DataCollectivePlot[]>([
        {
            actionType: 'Acquisition',
            name: 'acquisition',
            initiator: 'Initiateur',
            dateLimit: {
                startDate: '10/12/22',
                endDate: '10/12/22',
            },
            dataFiles: [
                {
                    name: 'Fichier.pdf',
                    url: 'https://www.africau.edu/images/default/sample.pdf',
                    thumbUrl:
                        'https://www.africau.edu/images/default/sample.pdf',
                },
            ],
            suggestion: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.'
        },
        {
            actionType: 'Défrichage',
            name: 'clearing',
            initiator: 'Initiateur',
            dateLimit: {
                startDate: '10/12/22',
                endDate: '10/12/22',
            },
            dataFiles: [
                {
                    name: 'Fichier.pdf',
                    url: 'https://www.africau.edu/images/default/sample.pdf',
                    thumbUrl:
                        'https://www.africau.edu/images/default/sample.pdf',
                },
            ],
            suggestion: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur.'
        },
    ]);
</script>

<style lang="scss" scoped>
    .collectivePlot {
        @apply flex flex-col gap-[14px];
        &__title {
            @apply text-[14px] text-secondary font-[600] leading-[17px];
        }
        &__subtitle {
            @apply text-[14px] text-black font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px] rounded-[8px] p-[8px] bg-gray;
            @screen md {
                @apply px-[14px] py-[12px];
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
