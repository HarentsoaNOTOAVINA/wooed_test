<template>
    <div class="supplier-modal-wrapper">
        <Modal
            :is-show-modal="isShowModalTmp"
            @on-back="
                () => {
                    $emit('on-close-modal');
                    isShowModalTmp = false;
                }
            "
            :title="modalName"
        >
            <template #content>
                <component :is="componentId"></component>
            </template>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { ref, shallowRef, watch } from 'vue';
    import LowPresure from './Item/LowPresuseModal.vue';
    import MoveMeter from './Item/MoveMeterModal.vue';
    import ControlMeter from './Item/ControlMeterModal.vue';

    const props = defineProps<{
        isShowModal: boolean;
        modalName: string;
        additionalButtonInfo: string;
    }>();

    const componentId = shallowRef<any>(null);

    const isShowModalTmp = ref<boolean>(false);

    watch(
        () => props.isShowModal,
        (v) => {
            isShowModalTmp.value = v;
        },
        { immediate: true }
    );

    watch(
        () => props.modalName,
        (v) => {
            handleModalName(v);
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.additionalButtonInfo,
        (v) => {
            if (
                v === 'classique' ||
                v === 'digital'
            ) {
                console.log(v);
                componentId.value = MoveMeter;
            }
        }
    );

    function handleModalName(key: string) {
        switch (key) {
            case '(R)ouvrir une installation au gaz naturel/un compteur scellé(e)':
            case 'Fermer le compteur':
                componentId.value = LowPresure;
                break;
            case 'Contrôler le compteur':
                componentId.value = ControlMeter;
                break;
            default:
                break;
        }
    }
</script>
<style lang="scss" scoped></style>
