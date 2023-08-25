<script lang="ts" setup>
    import { tankMenu } from './dataTank/dataMenuTank';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import RegulationTank from './RegulationTank.vue';
    import CompanyList from '../Elevator/CompanyList.vue';
    import TankCost from './TankCost.vue';
    import TankControl from './TankControl.vue';
    import ExpertList from '../ExpertList.vue';
    import DocumentationTank from './DocumentationTank.vue';

    const emit = defineEmits(['component']);

    function handleClick(item: any) {
        console.log(item, 'ITEM');

        switch (item.name) {
            case 'regulation':
                emit('component', RegulationTank);
                break;
            case 'documentation':
                emit('component', DocumentationTank);
                break;
            case 'findCompany':
                emit('component', ExpertList);
                break;
            case 'calculCost':
                emit('component', TankCost);
                break;
            case 'control':
                emit('component', TankControl);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="tank__container">
        <Paragraphe class="tank__title">Citernes</Paragraphe>
        <hr class="separator" />
        <div class="tank__content">
            <div
                class="tank__item-container"
                v-for="(item, index) in tankMenu"
                :key="item.id"
                @click="handleClick(item)"
            >
                <div class="tank__item">
                    <component :is="item.icon" />
                    <Paragraphe>{{ item.label }}</Paragraphe>
                </div>
                <Arrow class="tank__menu-arrow" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tank {
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
