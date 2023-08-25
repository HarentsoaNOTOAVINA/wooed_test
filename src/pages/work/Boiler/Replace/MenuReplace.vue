<script lang="ts" setup>
    import { replaceMenu } from '../data/replaceMenu';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import Regulation from './Regulation.vue';
    import Documentation from './Documentation.vue';
    import Expert from './CompanyReplace.vue';
    import ReceipPEB from './ReceipPEB.vue';
    import Documents from './Documents.vue';
    import Authorization from './Authorization.vue';
    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const emit = defineEmits(['component']);

    let store = useStore();
    let route = useRoute();
    let params = ref<object>({
        property: route.params.id,
    });

    function handleClick(item: any) {
        console.log(item, 'ITEM');

        switch (item.name) {
            case 'regulation':
                emit('component', Regulation);
                break;
            case 'documentation':
                emit('component', Documentation);
                break;
            case 'findCompany':
                emit('component', Expert);
                break;
            case 'acceptancePEB':
                emit('component', ReceipPEB);
                break;
            case 'authorizationAuthority':
                emit('component', Authorization);
                break;
            case 'documents':
                emit('component', Documents);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="boiler__container">
        <Paragraphe class="boiler__title">Remplacer la chaudière</Paragraphe>
        <hr class="separator" />
        <div class="boiler__content">
            <div
                class="boiler__item-container"
                v-for="item in replaceMenu"
                :key="item.id"
                @click="handleClick(item)"
            >
                <div class="boiler__item">
                    <component :is="item.icon" />
                    <Paragraphe>{{ item.label }}</Paragraphe>
                </div>
                <Arrow class="boiler__menu-arrow" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .boiler {
        &__container {
            @apply bg-white rounded-[8px] p-[18px] flex flex-col gap-[18px] min-h-[89vh] w-full;
        }

        &__content {
            @apply flex flex-col gap-[16px];
        }

        &__item-container {
            border: 1px solid var(--color-gray);
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
