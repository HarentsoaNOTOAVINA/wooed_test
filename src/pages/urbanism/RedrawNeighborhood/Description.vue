<script setup lang="ts">
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';

    defineProps({
        showLoadingBtnCoord: {
            type: String,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleDescription', value: any): void;
        (e: 'handlePostCoordinate'): void;
    }>();

    function handleDescription(value: any) {
        emit('handleDescription', value);
    }

    function postCoordinate() {
        emit('handlePostCoordinate');
    }
</script>

<template>
    <div class="neighborhood__description">
        <TextArea
            label="Descriptions"
            nameInput="description"
            placeholder="Votre description ici"
            :rows="4"
            @handleChange="handleDescription"
        />
        <div class="btn-send">
            <Button typeButton="secondary" @on-click="postCoordinate"
                ><LoadingButton size="sm" v-if="showLoadingBtnCoord" />M’envoyer
                les coordonnées</Button
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
    .btn-send {
        @apply mt-[15px];
        &:deep() {
            @apply text-right;
        }
    }
</style>
