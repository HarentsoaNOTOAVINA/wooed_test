<template>
    <div class="noProposal__container">
        <div class="noProposal__items">
            <Icon icon-name="NoProposal" />
            <Paragraphe>{{ textDesc }}</Paragraphe>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import { PropType } from 'vue';

    interface Props {
        textDesc?: string;
        textType?: "info" | "warn" | "default";
    }
    
    // const props = withDefaults(defineProps<Props>(), {
    //     textDesc: 'Aucune proposition',
    //     textType: "default"
    // })
    defineProps({
        textDesc: {
            type: String,
            default: "Aucune proposition"
        },
        textType: {
            type: String,
            default: String as PropType<"info" | "warn" | "default">
        }
    })
</script>

<style lang="scss" scoped>
    .noProposal {
        &__container {
            @apply h-full flex flex-col items-center justify-center;
        }
        &__items {
            @apply flex flex-col justify-center text-center text-grayIcon gap-[18px];
        }
    }
</style>
