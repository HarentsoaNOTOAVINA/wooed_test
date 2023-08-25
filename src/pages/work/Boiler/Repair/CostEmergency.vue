<template>
    <div class="boilerExpert__expert">
        <div class="boilerExpert__cost">
            <CostComp
                :cost="costInstallationBoiler"
                :loading="loadingCost"
                paraTitle="D'après le calcul, l'estimation du coût de votre travaux de réparation de chaudiere est de : "
            />
            <div class="boilerExpert__cost-btn-validation" v-if="!loadingCost">
                <Button type-button="gray" @on-click="$emit('prev')"
                    >précédent
                </Button>
                <Button
                    type-button="secondary"
                    @on-click="$emit('component', DocumentEmergency)"
                    >suivant
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import Button from '@/components/Common/Button/Button.vue';
    import CostComp from '../components/CostComp.vue';
    import DocumentEmergency from './DocumentEmergency.vue';

    const store = useStore();
    const route = useRoute();

    let titleNav = ref<string>('Trouvez un entrepreneur');
    const expertData = ref<Array<string>>([]);
    let loading = ref<boolean>(false);
    let showCost = ref<boolean>(false);
    let loadingBtn = ref<boolean>(false);
    let loadingCost = ref<boolean>(false);
    let list = ref<Array<any>>([]);
    let listIdExperts = ref<Array<any>>([]);
    let costInstallationBoiler = ref<number>(0);
    let dataPostSendDevise = ref<any>({
        idTheProperty: route.params.id,
        extProviderId: [],
    });
    let dataPostCostInstallation = ref<any>({
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let dataToGetEstimationCost = ref<any>({
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let dataToSaveWorkBoiler = ref<any>();

    const emit = defineEmits<{
        (event: 'component', value: any): void;
    }>();

    onMounted(async () => {
        await getDataIdToPost();
        await CalculateCostBoil();
    });

    function getDataIdToPost() {
        let data = computed(() => store.getters['WorksModule/getDataIdToPost']);
        dataToGetEstimationCost.value.idSubSection = data.value.idSubSection;
        dataToGetEstimationCost.value.idCategory = data.value.idCategory;

        console.log(dataToGetEstimationCost.value, 'dddddddddddddd');
    }

    async function CalculateCostBoil() {
        try {
            loadingCost.value = true;
            let resultCost = await store.dispatch(
                'WorksModule/calculCostBoiler',
                dataToGetEstimationCost.value
            );

            console.log(resultCost, 'Cost result');

            if (resultCost.status == 200 && resultCost.data.success) {
                costInstallationBoiler.value = resultCost.data.data;

                dataToSaveWorkBoiler.value = {
                    ...dataToSaveWorkBoiler.value,
                    ...{ idWorkCost: resultCost.data.workCost.id },
                    ...{ estimatedCost: resultCost.data.data },
                };

                store.dispatch(
                    'WorksModule/setDataSaveBoiler',
                    dataToSaveWorkBoiler.value
                );

                console.log(
                    dataToSaveWorkBoiler.value,
                    'Data to save workBoiler in Store'
                );
            }
        } catch (error) {
            console.error('Error get Cost Boiler : ', error);
        } finally {
            loadingCost.value = false;
        }
    }
</script>

<style scoped lang="scss">
    .boilerExpert {
        &__expert {
            @apply bg-[#fff] min-h-[89vh] rounded-[8px] p-[10px];
        }

        &__expert-nav {
            @apply flex items-center gap-[10px] font-semibold;
        }
        &__expert-header {
            @apply flex justify-between;
        }

        &__content {
            &:deep() {
                .expertCard {
                    width: auto;
                    height: 100%;
                }
            }
        }

        &__listContainer {
            @apply relative;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            @screen sm {
                grid-template-columns: repeat(2, 1fr);
            }

            @screen md {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        &__cost-btn-validation {
            @apply flex justify-end gap-[5px];
        }

        &__cost {
            &:deep() {
                .costComp__container {
                    @apply min-h-[25vh];
                }
            }
        }
    }

    .separator {
        @apply my-[15px];
    }

    .loading {
        @apply h-[89vh] bg-[#fff];
    }
</style>
