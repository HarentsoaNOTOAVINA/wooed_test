<template>
    <Modal title="Confimation" :isShowModal="isShow" @on-back="$emit('onBack')">
        <template #content>
            <div>Voulez-vous enregister avant de quitter ?</div>
            <div class="wrap-button-confirmation">
                <Button typeButton="primary-cancel" @on-click="$emit('leave')">
                    Quitter
                </Button>
                <Button type="primary" @on-click="$emit('save')">
                    <LoadingButton size="xs" v-if="isLoad" />
                    Enregistrer
                </Button>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref, watch } from 'vue';

    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false,
            required: true,
        },
        onleave: {
            type: Function
        },
        isLoad : {
            type : Boolean,
            default : false,
            required : true,
        }
    });
    const isShow = ref<boolean>(props.showModal);

    watch(
        () => props.showModal,
        (bool) => {
            
            isShow.value = bool;
        },
        { immediate: true }
    );
    const onLeavePage = function() {
       props.onleave
    }
</script>

<style lang="scss" scoped>
.wrap-button-confirmation {
    @apply flex gap-[10px] justify-end mt-[15px]
}
</style>
