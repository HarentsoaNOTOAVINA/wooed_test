<script lang="ts" setup>
    import { Modal } from 'ant-design-vue';
    import { ref, watch } from 'vue';

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
        width: {
            type: String || Number,
            default: '520',
        },
        isShowModal: {
            type: Boolean,
            default: false,
        },
    });
    const showModal = ref<boolean>(props.isShowModal);
    const emit = defineEmits(['onBack']);

    watch(
        () => props.isShowModal,
        (first) => {
            showModal.value = first;
        },
        { immediate: true, deep: true }
    );

    function onClickBack() {
        emit('onBack');
    }
</script>

<template>
    <Modal
        :visible="showModal"
        :title="props.title"
        :footer="null"
        :closable="true"
        :width="+width ?? +'520'"
        @cancel="onClickBack"
        wrapClassName="modal-wrap"
    >
        <div :class="[props.title ? '' : 'modal__content']">
            <slot name="content" />
        </div>
    </Modal>
</template>

<style lang="scss">
    .modal-wrap {
        .ant-modal-content {
            @apply rounded-[12px] overflow-auto;
        }
        .modal__content {
            @apply mt-[40px];
        }
        .ant-modal-title {
            @apply text-primary text-[14px] font-[600] pr-[30px];
        }
        .ant-modal-close-x {
            @apply flex justify-center items-center;
        }
    }
    .ant-modal-root {
        height: 100%;
        width: 100%;
        background-color: red;
    }
</style>
