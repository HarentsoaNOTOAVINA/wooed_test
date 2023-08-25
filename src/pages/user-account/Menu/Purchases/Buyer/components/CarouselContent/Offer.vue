<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import Status from '../StatusPurchase/CardStatusOffer.vue';

    let status = ref();
    const emit = defineEmits<{
        (e: 'on-click-detail-offer'): void;
    }>();

    const props = defineProps<{
        numberOffers?: number;
        statusLastOffer?: any;
    }>();

    onMounted(() => {
        status.value = props.statusLastOffer[0]?.status;
        console.log('props status : list offre', status.value);
        console.log('props status : number offer', props.numberOffers);
    });

    function handleClickedOffer() {
        console.log('details offer clicked');
        emit('on-click-detail-offer');
    }
</script>

<template>
    <div class="menu__offer">
        <div class="menu__offer-title font-bold">
            Offre ({{ props.numberOffers }})
        </div>
        <div>
            <Paragraph :class="status">
                {{
                    status == 'accepted'
                        ? 'Offre accepté'
                        : status == 'refused'
                        ? 'Offre refusé'
                        : status == 'counter'
                        ? 'Contre offre'
                        : 'En attent de réponse'
                }}</Paragraph
            >
        </div>
        <Button typeButton="border" @on-click="handleClickedOffer">
            Détail
        </Button>
    </div>
</template>

<style scoped lang="scss">
    .menu {
        &__offer {
            @apply flex-col items-center justify-around h-[445px];
            display: flex !important;

            &:deep(button) {
                @apply flex items-center justify-center h-[42px] text-sm w-[110px] font-medium py-[6px] px-[20px];
            }

            @screen md {
                @apply w-[237px] justify-around rounded-lg h-[296px];
                border: 0.5px solid var(--color-stroke-gray);
            }
        }

        &__offer-title {
            @apply flex items-center justify-center w-[108px] h-[108px] rounded-full;
            background-color: var(--color-gray);
        }
    }

    .accepted {
        color: var(--color-green);
    }

    .refused {
        color: var(--color-red);
    }

    .counter {
        color: var(--color-warn);
    }
</style>
