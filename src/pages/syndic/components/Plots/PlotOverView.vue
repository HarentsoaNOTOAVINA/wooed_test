<template>
    <div>
        <span class="over-view__question">Voulez vous supprimer définitivement ce lot de votre liste?</span>
        <PlotCard :data="data" :actions="false" />
        <div class="over-view__buttons-container">
            <Button type-button="primary-cancel" @click="cancelDeletion">
                Annuler
            </Button>
            <Button type-button="primary" @click="confirmDeletion">
                Confirmer
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from '@/components/Common/Icon/Icon.vue';
import Button from '@/components/Common/Button/Button.vue';
import PlotCard from '@/pages/syndic/components/Plots/PlotCard.vue';
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const emit = defineEmits(['delete-current-plot', 'cancel-deletion']);

function confirmDeletion() {
    emit('delete-current-plot', { id: props.data.id });
}

function cancelDeletion() {
    emit('cancel-deletion', undefined);
}
</script>
<style lang="scss" scoped>
.over-view {
    &__question {
        @apply block pb-4 text-center;
    }

    &__buttons-container {
        @apply w-full flex justify-center gap-x-[18px] mt-2;
    }
}
</style>