<script lang="ts" setup>
    import { moveMenu } from '../data/moveMenu';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Arrow from '@/components/Icon/ArrowNext.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import RegulationIcon from '@/components/Icon/RegulationElevatorIcon.vue';
    import FilesIcon from '@/components/Icon/Files.vue';
    import Authorization from './Authorization.vue';
    import RepairEmergency from '../Repair/EmergencyRepair.vue';

    const emit = defineEmits(['component']);

    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let params = ref<object>({
        property: route.params.id,
    });

    let icons = [RegulationIcon, FilesIcon];

    let menu = ref<Array<any>>([]);

    onMounted(async () => {
        await getTypeOfWordElevator();
    });

    async function getTypeOfWordElevator() {
        let data = await store.dispatch('WorksModule/setMaintainsMenu');
        data.forEach(async (item: any) => {
            console.log(item, 'item');
            switch (item.name) {
                case 'Chaudière':
                    await store.dispatch('WorksModule/setDataIdToPost', {
                        typeOfWorkId: item.id,
                    });

                    break;

                default:
                    break;
            }
        });
    }

    async function handleClick(menuClicked: any) {
        // console.log(menuClicked, 'ITEM');
        // await store.dispatch('WorksModule/setDataIdToPost', {
        //     idCategory: menuClicked.id,
        // });

        switch (menuClicked.name) {
            case 'authorization':
                emit('component', Authorization);
                break;
            case 'findExpert':
                emit('component', RepairEmergency);
                break;

            default:
                return;
        }
    }
</script>

<template>
    <div class="boiler__container">
        <Paragraphe class="boiler__title">Déplacer une chaudière </Paragraphe>
        <hr class="separator" />
        <div class="boiler__content">
            <div
                class="boiler__item-container"
                v-for="(item, index) in moveMenu"
                :key="index"
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
