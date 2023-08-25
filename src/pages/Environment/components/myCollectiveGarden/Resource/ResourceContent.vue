<template>
    <div class="resourceContent">
        <div class="resourceContent__items">
            <div v-for="(item, index) in itemsData" :key="index">
                <CardResource :data="item" :resource-type="item.type" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Title from '@/components/Common/Title/Title.vue';
import CardResource from '@/pages/Environment/components/myCollectiveGarden/Resource/CardResource.vue';

import { ref } from 'vue';

interface ItemsData {
    title: string;
    type: string;
    cardItem?: CardItem[];
    nameInput: string;
    select?: selectData;
    inputField?: boolean;
}

interface CardItem {
    labelField?: string;
}

interface optionData {
    value: string;
    label: string;
}

interface selectData {
    labelName?: string;
    name?: string;
    mode?: string;
    labelTitle?: string;
    options: optionData[];
}

const itemsData = ref<ItemsData[]>([
    {
        title: 'Outils',
        type: 'outils',
        nameInput: 'category',
        cardItem: [
            {
                labelField: 'Plantoirs',
            },
        ],
        select: {
            mode: 'multiple',
            options: [
                {
                    value: 'plantoirs',
                    label: 'Plantoirs',
                },
                {
                    value: 'binettes',
                    label: 'Binettes',
                },
                {
                    value: 'arrosoirs',
                    label: 'Arrosoirs',
                },
                {
                    value: 'brouettes',
                    label: 'Brouettes',
                },
            ],
        },
    },
    {
        title: 'Plantations',
        type: 'plantations',
        nameInput: 'category',
        cardItem: [
            {
                labelField: 'Type de plantation'
            }
        ],
        select: {
            options: [
                {
                    value: 'plants',
                    label: 'Plants',
                },
                {
                    value: 'arbres',
                    label: 'Arbres',
                }
            ]
        },
        inputField: true
    },
    {
        title: 'Infrastructure',
        type: 'infrastructure',
        nameInput: 'resourceType',
        cardItem: [
            {
                labelField: "Citerne d'eau",
            },
        ],
    },
]);
</script>

<style lang="scss" scoped>
.resourceContent {
    @apply flex flex-col gap-[14px];

    &__title {
        @apply text-[14px] text-secondary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px];
    }

    &:deep() {
        .switch__label {
            @apply font-[600];
        }
    }
}

.__hr {
    @apply text-gray w-full;
}
</style>
