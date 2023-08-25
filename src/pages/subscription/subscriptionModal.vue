<template>
    <div ref="modalContainer" class="subscriptionModal">
        <Modal
            :getContainer="modalContainer"
            :is-show-modal="isShow"
            @on-back="onOpenModal"
            title="Choisi votre abonnement"
            class="subscriptionModal__container"
        >
            <template #content>
                <Subscription class="subscriptionModal__content" />
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Subscription from '@/pages/registration/SubscriptionSection/Subscription.vue';
    import { ref, watch } from 'vue';

    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false,
        },
    });

    const isShow = ref<boolean>(props.showModal);
    const modalContainer = ref<any>();

    watch(
        () => props.showModal,
        (v) => {
            isShow.value = v;
        }
    );

    function onOpenModal() {
        isShow.value = !isShow.value;
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .subscriptionModal {
        &:deep() {
            .subscriptionModal {
                &__container {
                    @apply max-w-[900px] container my-0;
                    width: 100% !important;
                    @screen xl {
                        @apply max-w-[1120px];
                    }
                    .ant-modal-content {
                        @include scrollbar;
                    }
                }
                &__content {
                    @apply h-[calc(100vh-237px)] overflow-y-auto pr-[5px] mr-[-5px];
                    @include scrollbar;
                }
            }
            .subscription {
                @apply p-0;
                @screen sm {
                    @apply p-[18px];
                }
                &__header {
                    @apply hidden;
                }
                &__core {
                    @apply mt-0 gap-[25px] px-0;
                }
                &-card {
                    @apply p-0;
                }
                &-card__title {
                    @apply py-0;
                }
            }
            .ant-modal-body {
                @apply p-[14px];
                @screen sm {
                    @apply p-[18px];
                }
            }
        }
    }
</style>
