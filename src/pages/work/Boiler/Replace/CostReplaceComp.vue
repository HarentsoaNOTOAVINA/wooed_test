<template>
    <div class="boilerExpert__expert">
        <div class="boilerExpert__cost">
            <CostComp
                :cost="costInstallationBoiler"
                :loading="loadingCost"
                paraTitle="D'après le calcul, l'estimation du coût de votre travaux de remplacement de chaudiere est de : "
            />

            <div class="boilerExpert__switch" v-if="!loadingCost">
                <Switch
                    item-label="La puissance de votre chaudières est-il supérieure à 100 KW ?"
                    name="power"
                    @handle-switch="handleChange"
                />
            </div>

            <div class="boilerExpert__cost-btn-validation" v-if="!loadingCost">
                <Button type-button="gray" @on-click="$emit('prev')"
                    >Précédent
                </Button>
                <Button
                    type-button="secondary"
                    @on-click="$emit('component', NextComp)"
                    >Suivant
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
    import Switch from '@/components/Common/Switch/Switch.vue';
    import ReceipPEB from './ReceipPEB.vue';
    import Authorization from './Authorization.vue';
    import Documents from './Documents.vue';
    // import DocumentEmergency from './DocumentEmergency.vue';

    const store = useStore();
    const route = useRoute();

    let loadingCost = ref<boolean>(false);
    let costInstallationBoiler = ref<number>(0);

    let dataToGetEstimationCost = ref<any>({
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
    });

    let NextComp = ref<any>(Documents);

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
        // dataToGetEstimationCost.value.idCategory = data.value.idCategory;
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

    function handleChange(value: any) {
        value.power
            ? (NextComp.value = Authorization)
            : (NextComp.value = Documents);
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

        &__switch {
            @apply mb-[15px];
        }

        &__cost-btn-validation {
            @apply flex justify-end gap-[5px];
        }

        &__cost {
            &:deep() {
                .costComp__container {
                    @apply min-h-[25vh] p-0;
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
