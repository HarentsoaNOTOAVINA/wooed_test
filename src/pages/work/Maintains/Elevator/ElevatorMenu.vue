<script lang="ts" setup>
    import { elevatorMenu } from './dataElevator/dataMenuElevator';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import Regulation from './Regulation.vue';
    import CompanyList from './CompanyList.vue';
    import CostElevator from './ElevatorCost.vue';

    const emit = defineEmits(['component']);

    function handleClick(item: any) {
        console.log(item, 'ITEM');

        switch (item.name) {
            case 'regulation':
                console.log('REGULATION');
                emit('component', Regulation);
                break;
            case 'findCompany':
                emit('component', CompanyList);
                break;
            case 'calculCost':
                emit('component', CostElevator);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="elevator__container">
        <Paragraphe class="elevator__title">Ascenseurs</Paragraphe>
        <hr class="separator" />
        <div class="elevator__content">
            <div
                class="elevator__item-container"
                v-for="item in elevatorMenu"
                :key="item.id"
                @click="handleClick(item)"
            >
                <div class="elevator__item">
                    <component :is="item.icon" />
                    <Paragraphe>{{ item.label }}</Paragraphe>
                </div>
                <Arrow class="elevator__menu-arrow" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .elevator {
        &__container {
            @apply bg-white rounded-[8px] p-[18px] flex flex-col gap-[18px] min-h-[89vh] w-full;
        }

        &__content {
            @apply flex flex-col gap-[16px];
        }

        &__item-container {
            border: 1px solid #f2f2f2;
            @apply rounded-[4px] py-[18px] px-[18px] flex justify-between cursor-pointer;
        }

        &__item {
            @apply flex gap-[10px] items-center;
        }

        &__title {
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px];
        }

        &__menu-arrow {
            @apply hidden;
            @screen sm {
                @apply block;
            }
        }
    }
</style>
