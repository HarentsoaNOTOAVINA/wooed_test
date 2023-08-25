<template>
    <div class="work">
        <div
            class="work__container"
            v-for="(item, index) in listTankCover"
            :key="index"
            @click="openModal(item.condition)"
        >
            <Title type="h3" class="text-center">{{ item.title }}</Title>
            <Hr />
            <ul
                style="list-style-type: disc"
                class="work__list"
                v-for="(element, i) in item.item"
                :key="i"
            >
                <li>{{ element.label }}</li>
            </ul>
        </div>
        <div>
            <Modal
                title="Contact service environnementale de la commune"
                width="700"
                :isShowModal="isShowModal"
                @onBack="onClose"
            >
                <template #content>
                    <component
                        :is="activeView"
                        :otherTank="isOtherTank"
                        @onCancel="onClose"
                    />
                    <!-- <div v-if="condition === 'normal'">
                        <SendMail />
                    </div>
                    <div v-else>
                        other
                    </div> -->
                </template>
            </Modal>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import SendMail from '../SendMail/SendMail.vue';
    import { listTankCover } from './data';
    import { ref, shallowRef } from 'vue';

    let isShowModal = ref<boolean>(false);
    let activeView = shallowRef<object | any>();
    let isOtherTank = ref<boolean>(false);

    // const props = defineProps(['otherTank']);

    const openModal = (item: string) => {
        if (item === 'normal') {
            activeView.value = SendMail;
            isOtherTank.value = false;
        } else {
            isOtherTank.value = true;
            activeView.value = SendMail;
        }
        isShowModal.value = true;
    };

    const onClose = () => {
        isShowModal.value = false;
    };
</script>

<style lang="scss" scoped>
    .work {
        @apply flex flex-col gap-[18px];

        &__container {
            border: 1px solid var(--color-primary);
            @apply rounded p-[14px];
        }
        &__container:hover {
            box-shadow: 0 0 11px var(--color-primary);
        }

        &__list {
            @apply px-[14px];
        }
    }
</style>
