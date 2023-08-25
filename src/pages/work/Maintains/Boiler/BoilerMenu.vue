<script lang="ts" setup>
    import { Alert as AAlert } from 'ant-design-vue';
    import { boilerMenu } from './dataBoiler/dataMenuBoiler';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import ExpertList from '../ExpertList.vue';
    import RegulationBoiler from './RegulationBoiler.vue';
    import DocumentationBoiler from './DocumentationBoiler.vue';
    import CostBoiler from './CostBoiler.vue';
    import ExtentControl from './ExtentControl.vue';
    import BoilerControl from './BoilerControl.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import PowerMore20KW from './PowerMore20KW.vue';
    import PowerLess20KW from './PowerLess20KW.vue';
    import InspectionPeriodic from './InspectionPeriodic.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';

    const emit = defineEmits(['component']);

    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    let params = ref<object>({
        property: route.params.id,
    });
    let hasBoiler = ref<boolean>();
    let loading = ref<boolean>(false);

    onMounted(() => {
        checkBoiler();
    });

    async function checkBoiler() {
        try {
            loading.value = true;
            let { data } = await store.dispatch(
                'WorksModule/checkBoiler',
                params.value
            );
            data.code == 200 && data.success
                ? (hasBoiler.value = true)
                : (hasBoiler.value = false);
        } catch (error) {
            console.error(error, 'checkBoiler');
        } finally {
            loading.value = false;
        }
    }

    function handleClick(item: any) {
        console.log(item, 'ITEM');

        switch (item.name) {
            case 'regulation':
                emit('component', RegulationBoiler);
                break;
            case 'documentation':
                emit('component', DocumentationBoiler);
                break;
            case 'findCompany':
                emit('component', ExpertList);
                break;
            case 'calculCost':
                emit('component', CostBoiler);
                break;
            case 'extentControl':
                emit('component', ExtentControl);
                break;
            case 'powerMore20':
                emit('component', PowerMore20KW);
                break;
            case 'powerLess20':
                emit('component', PowerLess20KW);
                break;
            case 'periodicInspection':
                emit('component', InspectionPeriodic);
                break;
            case 'historyControl':
                emit('component', BoilerControl);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="boiler__container">
        <Paragraphe class="boiler__title"
            ><ArrowBack
                class="cursor-pointer"
                @click="router.push({ name: 'work-home' })"
            />
            Entretien Chaudière</Paragraphe
        >
        <hr class="separator" />
        <div class="boiler__content" v-if="!loading">
            <div
                v-if="hasBoiler"
                class="boiler__item-container"
                v-for="item in boilerMenu"
                :key="item.id"
                @click="handleClick(item)"
            >
                <div class="boiler__item">
                    <component :is="item.icon" />
                    <Paragraphe>{{ item.label }}</Paragraphe>
                </div>
                <Arrow class="boiler__menu-arrow" />
            </div>

            <div class="noBoiler" v-else>
                <a-alert
                    message="Alert"
                    description="Votre bien n'avez pas encore de chaudière; Veuillez ajouter une et suivre le procedure"
                    type="warning"
                    show-icon
                />
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
            border: 1px solid #f2f2f2;
            @apply rounded-[4px] py-[18px] px-[18px] flex justify-between cursor-pointer;
        }

        &__item {
            @apply flex gap-[10px] items-center;
        }

        &__title {
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px] flex items-center gap-[5px];
        }

        &__menu-arrow {
            @apply hidden;
            @screen sm {
                @apply block;
            }
        }
    }
</style>
