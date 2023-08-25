<template>
    <div>
        <div class="moreInfo" v-if="!component">
            <div class="flex gap-[18px]">
                <BackButton @click="onBack" />
                <Title
                    label="Completer toutes les informations maquantes"
                    type="h4"
                    class="title"
                />
            </div>
            <div class="moreInfo__content">
                <div v-for="(item, index) in dataMoreInfo" :key="index">
                    <Paragraphe
                        class="moreInfo__item"
                        @click="handleClick(item.component)"
                        >{{ item.title }}</Paragraphe
                    >
                </div>
            </div>
        </div>
        <div v-if="component">
            <component :is="component" @back="back" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Document from './components/Document.vue';
    import ThreeD from './components/ThreeD.vue';
    import { shallowRef } from 'vue';

    const component = shallowRef<any>(null);
    const dataMoreInfo: Array<any> = [
        {
            title: 'Ajouter des documents',
            component: Document,
        },
        {
            title: 'Figuration 3D',
            component: ThreeD,
        },
    ];
    const emit = defineEmits<{
        (event: 'onBack'): void;
    }>();

    function onBack() {
        emit('onBack');
    }

    function back() {
        component.value = null;
    }

    function handleClick(value: any) {
        component.value = value;
    }
</script>

<style lang="scss" scoped>
    .moreInfo {
        @apply flex flex-col gap-[24px];
        &__content {
            @apply flex flex-col gap-[18px];
            .fade-component-enter-active,
            .fade-component-leave-active {
                transition: all 0.25s ease-in;
            }
            .fade-component-enter-from,
            .fade-component-leave-to {
                opacity: 0;
                transform: translateX(60px);
                position: absolute;
                overflow: hidden;
                width: 100%;
            }
        }
        &__item {
            @apply flex items-center justify-center cursor-pointer bg-transparent border border-[var(--color-gray)] font-semibold py-4 px-4 rounded-lg shadow-sm hover:bg-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gray)] focus:ring-opacity-50;
        }
    }
    .title {
        @apply text-[var(--color-primary)] text-[14px] font-[600];
    }
</style>
