<template>
    <div class="tankRepairMenu__container">
        <Paragraphe>Reparation menu</Paragraphe>
        <Hr />

        <div class="tankRepairMenu__content">
            <div v-for="(item, index) in menuRepair">
                <div class="tankRepairMenu__item">
                    <input
                        type="radio"
                        name="one"
                        :value="item.id"
                        @click="handleRadio($event)"
                    />
                    <label for="one">{{ item.label }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import { menuRepair } from './dataMenuRepair';

    const emit = defineEmits<{
        (event: 'changeComponent', value: object): void;
        (event: 'handleRadio', value: object): void;
        (event: 'onPrevious', value: object): void;
        (event: 'onNext'): void;
    }>();

    const handleRadio = (event: any) => {
        emit('handleRadio', event.target.value);
    };
</script>

<style lang="scss" scoped>
    .tankRepairMenu {
        &__container {
            &:deep() {
                hr {
                    @apply my-[18px];
                }
            }
        }

        &__content {
            @apply flex flex-col gap-[16px];
        }

        &__item {
            background-color: var(--color-gray);
            cursor: pointer;
            @apply w-full flex rounded-[4px] text-center p-[18px];
        }
        &__txt {
            @apply font-light text-sm;
        }

        &__btnContainer {
            @apply flex justify-end gap-[18px] mt-[18px];
        }
    }
</style>
