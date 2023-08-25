<template>
    <div class="no-connection">
        <BackButton
            :text="'Je dispose d’un puits d’eau de pluie'"
            @return="backTo"
            class="back-tbn"
        />
        <div class="no-connection__items-btn">
            <Button type-button="gray" @click="handleClick"
                >En cas de sécheresse, le remplir à partir du réseau de
                distribution d’eau courante</Button
            >
            <div @click="handleShowInfo">
                <InfoIcon />
            </div>
        </div>
        <div v-if="content">
            <RainWaterContent />
        </div>
    </div>
</template>
<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { ref } from 'vue';
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import RainWaterContent from './RainWaterContent.vue/RainWaterContent.vue';

    const emit = defineEmits(['back-to']);
    const content = ref<boolean>(false);

    function handleClick() {
        content.value = !content.value;
    }

    function handleShowInfo() {
        window.open(
            'https://www.vmm.be/water/bouwen/regenwater/hergebruik',
            '_blank'
        );
    }

    function backTo() {
        emit('back-to');
    }
</script>
<style lang="scss" scoped>
    .__hr {
        @apply text-gray w-full;
    }
    .no-connection {
        @apply flex flex-col gap-[18px] w-full;
        &__items-btn {
            @apply flex gap-[18px] items-center;
        }
        &__items {
            @apply flex flex-col gap-[18px];
        }
    }

    .info {
        @apply flex gap-[18px] rounded-[8px] p-[10px];
        border: 0.5px solid var(--color-gray);
        color: var(--color-primary);
        cursor: pointer;
    }

    .back-tbn {
        @apply w-full;
    }
    .item-title {
        color: var(--color-primary);
        cursor: pointer;
        font-weight: 500;
    }
</style>
