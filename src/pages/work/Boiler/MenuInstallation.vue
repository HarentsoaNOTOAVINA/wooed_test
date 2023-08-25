<script lang="ts" setup>
    import { Alert as AAlert } from 'ant-design-vue';
    import { installationMenu } from './data/installationMenu';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import ExpertDevise from './ExpertDevise.vue';
    import RegulationWBoiler from './Regulation.vue';
    import Documentation from './Documentation.vue';
    import InstallationFeatures from './InstallationFeatures.vue';
    import DocumentInstallation from './DocumentInstallation.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import AcceptancePEBInstallation from './AcceptancePEBInstallation.vue';

    const emit = defineEmits(['component']);

    let store = useStore();
    let route = useRoute();
    let params = ref<object>({
        property: route.params.id,
    });
    let hasBoiler = ref<boolean>();
    let loading = ref<boolean>(false);

    console.log(installationMenu, 'TRAVAVAVA');

    function handleClick(item: any) {
        console.log(item, 'ITEM');

        switch (item.name) {
            case 'regulation':
                emit('component', RegulationWBoiler);
                break;
            case 'documentation':
                emit('component', Documentation);
                break;
            case 'findCompany':
                emit('component', ExpertDevise);
                break;
            case 'featuresOfInstallation':
                emit('component', InstallationFeatures);
                break;
            case 'acceptancePEB':
                emit('component', AcceptancePEBInstallation);
                break;
            case 'documents':
                emit('component', DocumentInstallation);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="boiler__container">
        <Paragraphe class="boiler__title">Travaux d’installation</Paragraphe>
        <hr class="separator" />
        <div class="boiler__content">
            <div
                class="boiler__item-container"
                v-for="item in installationMenu"
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
