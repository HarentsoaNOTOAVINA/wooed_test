<template>
    <div class="tankMenu__container">
        <!-- <Title type="h3"> Travaux à la citerne </Title> -->
        <Hr />
        <div class="tankMenu__content">
            <div
                v-for="(item, index) in dataTankMenu"
                :key="index"
                class="tankMenu__itemContainer"
                @click="handleClick(item)"
            >
                <div class="tankMenu__item">
                    <component :is="item.icon" />
                    <Paragraphe>{{ item.name }}</Paragraphe>
                </div>
                <Arrow />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { onMounted } from 'vue';

    onMounted(() => {
        console.log('data demand menu tanks work:', props.dataDemand);
    });

    const props = defineProps(['dataTankMenu', 'dataDemand']);

    const emit = defineEmits<{
        (event: 'changeComponent', value: object): void;
        (event: 'back'): void;
    }>();

    const back = () => {
        emit('back');
    };

    const handleClick = (item: any) => {
        emit('changeComponent', item);
        // console.log('items:', item);
    };
</script>

<style lang="scss" scoped>
    .tankMenu {
        &__container {
            // @apply flex flex-col bg-white rounded-[8px] p-[18px] gap-[18px] w-full;
            height: fit-content;
            &:deep() {
                hr {
                    @apply my-[18px];
                }
            }
        }
        &__content {
            @apply flex flex-col gap-[16px];
        }
        &__itemContainer {
            border: 1px solid;
            border-color: var(--color-gray);
            @apply rounded-[4px] p-[18px] flex justify-between items-center;
        }

        &__item {
            @apply flex gap-[10px] items-center;
        }
    }
</style>
