<template>
    <div class="transport-card__section">
        <div class="transport-card__items-wrap">
            <div v-for="(item, index) in MovingShortcuts" :key="index">
                <Shortcut :data="item" @click="setMovingPreference({ isVolumeKnown: item.isVolumeKnown })" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import Shortcut from '@/pages/transport/components/Shortcut.vue';

const emit = defineEmits(["store-announcement-data", "next-step"]);
const MovingShortcuts = [
    {
        label: 'Je connais le volume',
        isVolumeKnown: true,
        iconName: 'Magic'
    },
    {
        label: 'Je ne connais pas le volume',
        isVolumeKnown: false,
        iconName: 'Tablet'
    }
];

onMounted(() => setMovingPreference({ isVolumeKnown: MovingShortcuts[0].isVolumeKnown }));

function setMovingPreference(value: any) {
    emit('store-announcement-data', value);
    emit('next-step');
}
</script>
<style lang="scss" scoped>
.transport-card {
    background-color: #fff;

    &__section {
        @screen md {
            height: calc(100vh - 94px);
            @apply flex-1;
        }
    }

    &__container {
        @apply h-full grid content-between;
        background-color: #fff;
        min-height: calc(100vh - 100px);
    }

    &__head-items {
        @apply hidden mt-0 mb-[18px];

        @screen md {
            @apply inline-block;
        }
    }

    &__items-wrap {
        @apply px-[14px] -mx-[14px];

        @screen md {
            height: calc(100vh - 240px);
            @apply overflow-y-auto pb-4;
            // @include scrollbar;
        }
    }

    &__title {
        @apply text-[14px] text-grayIcon;

        @screen md {
            @apply text-[16px];
        }
    }
}
</style>