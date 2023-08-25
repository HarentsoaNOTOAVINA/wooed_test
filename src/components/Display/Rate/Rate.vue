<template>
    <div class="rate">
        <a-rate :value="defaultValue" disabled allow-half />
        <Modal
            width="600"
            title="Detail de l'expert"
            :isShowModal="isShowModalRating"
        >
            <template #content>
                <h1>rating</h1>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { Rate as ARate } from 'ant-design-vue';
    import { ref } from 'vue';

    const props = defineProps({
        defaultValue: {
            type: Number,
            default: 4,
        },
        isShowModalRating: {
            type: Boolean,
        },
    });

    // let defaultValue = ref<number>(4);
</script>

<style lang="scss" scoped>
    .rate {
        // &___head {
        //     @apply flex gap-[4px];
        // }
    }
</style>
