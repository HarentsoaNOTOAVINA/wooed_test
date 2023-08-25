<template>
    <div class="info">
        <CardWrapperTitle label="Informations :" class="info__card">
            <ul class="info__lists">
                <template v-for="(item, index) in InfoData" :key="index">
                    <li
                        class="info__items"
                        @click="handleDropDown(item.label, item.component)"
                    >
                        <span class="info__label">{{ item.label }}</span>
                        <DropDownIcon class="info__dropIcon" />
                    </li>
                </template>
            </ul>
        </CardWrapperTitle>
        <div class="info__btnContainer">
            <Button
                @click="redirectToStreetView"
                class="sv__btn"
                type-button="border"
                >Google Map</Button
            >
            <Button
                @click="redirectToGoogleEarth"
                class="ge__btn"
                type-button="border"
                >Google Earth</Button
            >
        </div>
        <teleport to='#app'>
            <div>lindy kely</div>
            </teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { InfoData } from './InformationData';
    import DropDownIcon from '@/components/Icon/DropDown.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapperTitle from '@/components/Display/CardWrapperTitle/CardWrapperTitle.vue';

    const emit = defineEmits([
        'infoSelected',
        'goToGoogleEarth',
        'goToStreetView',
    ]);

    const handleDropDown = (label: string, component: object) => {
        emit('infoSelected', label, component);
    };

    const redirectToGoogleEarth = () => {
        emit('goToGoogleEarth');
    };

    const redirectToStreetView = () => {
        emit('goToStreetView');
    };
</script>

<style lang="scss" scoped>
    .info {
        @apply place-content-14px;
        &__items {
            @apply flex flex-row justify-between p-[8px] transition-all cursor-pointer;
            &:hover {
                @apply bg-gray transition-all;
            }
        }

        &__dropIcon {
            @apply -rotate-90;
        }

        &__label {
            @apply font-[500];
            @apply text-grayIcon;
        }

        &__btnContainer {
            @apply flex gap-[8px] mt-[14px];
        }
    }
    .sv__btn {
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
    .ge__btn {
        &:deep() {
            button {
                @apply w-full h-full;
            }
        }
    }
</style>
