<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
</script>

<template>
    <div class="menu__offer">
        <div class="menu__offer-title font-bold">Acte de vente</div>
        <div>
            <Paragraph>Aucun</Paragraph>
        </div>
        <Button typeButton="border" @click="$emit('on-click-detail-deed')">
            Détail
        </Button>
    </div>
</template>

<style scoped lang="scss">
    .menu {
        &__offer {
            @apply flex-col items-center justify-around h-[445px] rounded-lg;
            display: flex !important;
            background: var(--color-stroke-gray);

            &:deep(button) {
                @apply flex items-center justify-center h-[42px] text-sm w-[110px] font-medium py-[6px] px-[20px];
            }

            @screen md {
                @apply w-[237px] justify-around rounded-lg h-[296px];
            }
        }

        &__offer-title {
            @apply flex items-center justify-center w-[108px] h-[108px] rounded-full;
            background-color: var(--color-primary);
            color: #fff;
        }
    }
</style>
