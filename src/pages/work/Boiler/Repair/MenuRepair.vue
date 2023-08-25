<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import RepairEmergency from './EmergencyRepair.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
    import FilesIcon from '@/components/Icon/Files.vue';

    const emit = defineEmits(['component']);

    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let params = ref<object>({
        property: route.params.id,
    });

    let icons = [RegulationIcon, FilesIcon];

    let idSubSection = ref<number>();

    let menu = ref<Array<any>>([]);

    onMounted(async () => {
        await getIdSubSection();
        await getListChoiceCategory();
    });

    function getIdSubSection() {
        let data = computed(() => store.getters['WorksModule/getDataIdToPost']);
        idSubSection.value = data.value.idSubSection;
    }

    async function getListChoiceCategory() {
        let response = await store.dispatch(
            'WorksModule/listChoiceCategory',
            idSubSection.value
        );

        menu.value = response.data;

        console.log(response, 'liste choice category');
    }

    async function handleClick(menuClicked: any) {
        console.log(menuClicked, 'ITEM');
        await store.dispatch('WorksModule/setDataIdToPost', {
            idCategory: menuClicked.id,
        });

        switch (menuClicked.name) {
            case 'Réparations urgentes':
                emit('component', RepairEmergency);
                break;
            case 'Autres':
                router.push({ name: 'work-maintains' });
                // emit('component', Other);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="boiler__container">
        <Paragraphe class="boiler__title">Travaux de réparation</Paragraphe>
        <hr class="separator" />
        <div class="boiler__content">
            <div
                class="boiler__item-container"
                v-for="(item, index) in menu"
                :key="index"
                @click="handleClick(item)"
            >
                <div class="boiler__item">
                    <component :is="icons[index]" />
                    <Paragraphe>{{ item.name }}</Paragraphe>
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
