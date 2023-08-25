<template>
    <Modal :is-show-modal="props.show" @on-back="closeModal" :width="screenType >= 1024 ? '800' : '520'"
        :title="props.modalTitle">
        <template #content>
            <PaymentForm @handle-payment-data="processToPayment" @hide-form="closeModal" />
        </template>
    </Modal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Modal from '@/components/Display/Modal/Modal.vue';
import PaymentForm from "@/components/Display/PaymentModal/PaymentForm.vue";

const screenType = ref<number>(screen.width);

const emit = defineEmits(['close-modal']);

const props = defineProps({
    modalTitle: {
        type: String,
        default: "Veuillez remplir ce formulaire"
    },
    show: {
        type: Boolean,
        default: false
    },
})

function closeModal() {
    emit('close-modal');
}

async function processToPayment(value: any) {
    console.error(value);
}
</script>
<style lang="scss" scoped>
</style>