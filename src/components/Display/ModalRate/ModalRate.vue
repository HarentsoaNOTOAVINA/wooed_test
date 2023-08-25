<template>
    <div class="modalRate">
        <Modal
            width="700"
            title="Noter un expert"
            :isShowModal="showModalRate"
            @onBack="closeModalRate"
        >
            <template #content>
                <div class="modalRate__head">
                    <avatar
                        src="
                            https://joeschmoe.io/api/v1/random
                        "
                        :size="40"
                    />
                    <h1>{{ expertName }}</h1>
                    <div class="modalRate__rateCount">
                        <Star />
                        <span class="modalRate__rateTxt">{{ expertRate }}</span>
                    </div>
                    <div class="modalRate__rating">
                        <a-rate
                            v-model:value="rateCount"
                            allow-half
                            @change="handleRate"
                        />
                    </div>
                    <div class="modalRate__btnContainer">
                        <Button
                            typeButton="primary-cancel"
                            @on-click="cancelRating"
                            >Annuler</Button
                        >
                        <Button @on-click="validateRate"
                            ><LoadingButton
                                size="xs"
                                v-if="loadingBtn"
                            />Vadider</Button
                        >
                    </div>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { Rate as ARate } from 'ant-design-vue';
    import Star from '@/components/Icon/Star.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { ref } from 'vue';

    const props = defineProps({
        showModalRate: {
            type: Boolean,
            default: false,
        },
        expertName: {
            type: Object,
        },
        expertRate: {
            type: Object,
        },
        loadingBtn: {
            type: Boolean,
            default: false,
        },
    });

    let rateCount = ref<number>();

    const emit = defineEmits([
        'onCloseModalRate',
        'validateRate',
        'cancelRating',
    ]);

    const cancelRating = () => {
        emit('cancelRating');
    };

    const handleRate = (value: any) => {
        rateCount.value = value;
        console.log('value rate:', rateCount.value);
    };

    const validateRate = () => {
        emit('validateRate', rateCount.value);
    };

    const closeModalRate = () => {
        emit('onCloseModalRate');
    };
</script>

<style lang="scss" scoped>
    .modalRate {
        &__head {
            @apply flex flex-col items-center;
        }

        &__rateCount {
            @apply flex gap-[4px] items-center;
        }

        &__rateTxt {
            @apply text-center;
        }

        &__rating {
            @apply mb-[14px];
        }

        &__btnContainer {
            @apply flex gap-[8px];
        }
    }
</style>
