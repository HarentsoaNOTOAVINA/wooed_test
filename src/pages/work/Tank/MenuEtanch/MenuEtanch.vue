<template>
    <div class="tankMenu__container">
        <Paragraphe>Travaux à la citerne</Paragraphe>
        <Hr />
        <span class="tankMenu__contentTitle">{{ title }}</span>
        <div
            class="tankMenu__content"
            v-for="(item, index) in menuData"
            :key="index"
        >
            <div class="tankMenu__contentSection">
                <input
                    type="radio"
                    name="choice"
                    :value="item.id"
                    @click="handleChoice($event)"
                />
                <label for="choice">{{ item.label }}</label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import { title, menuData } from './data';

    const emit = defineEmits<{
        (event: 'handleChoice', value: number): void;
    }>();

    const handleChoice = (item: any) => {
        emit('handleChoice', item.target.value);
    };
</script>

<style lang="scss" scoped>
    .tankMenu {
        &__contentTitle {
            color: var(--color-primary);
        }

        &__contentSection {
            background-color: var(--color-primary);
            border: 1px solid var(--color-gray);
            @apply my-[14px] rounded p-[18px] flex gap-[14px];
        }
    }
</style>
