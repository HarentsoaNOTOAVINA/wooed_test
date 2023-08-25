<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="calculateCost">
            <div class="calculateCost__container">
                <CostComp
                    :showHeader="false"
                    :cost="costValue"
                    :loading="loadingCost"
                    paraTitle="D'après le calcul, l'estimation du coût de votre travaux est de : "
                />
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { notification } from 'ant-design-vue';
    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import CostComp from '../../Boiler/components/CostComp.vue';
    import CardGray from './CardGray.vue';

    const emit = defineEmits<{
        (e: 'update:showNextButton', v: boolean): void;
    }>();

    const store = useStore();

    // let content = ref<any>();

    const breadcrumbListsData = [
        {
            label: 'Calculer le coût',
        },
    ];

    let loadingCost = ref<boolean>(false);
    let costValue = ref<number>(0);
    let dataToPostCost = ref<any>({
        idTypeOfWork: null,
        idSubSection: null,
        idCategory: null,
        idModel: null,
        idSubModel: null,
        quantity: 1,
    });

    onMounted(async () => {
        emit('update:showNextButton', true);
        await getDataIdToPost();
        await calculCost();
    });

    function getDataIdToPost() {
        let data = store.getters['WorksModule/getDataIdToPost'];

        console.log(data, 'DATA ID TO POST');
        dataToPostCost.value.idTypeOfWork = data.idTypeOfWork;
        dataToPostCost.value.idSubSection = data.idSubSection ?? null;
        dataToPostCost.value.idCategory = data.idCategory ?? null;
        dataToPostCost.value.idModel = data.idModel ?? null;
        dataToPostCost.value.idSubModel = data.idSubModel ?? null;
        dataToPostCost.value.quantity = data.quantity ?? null;

        console.log(dataToPostCost.value, 'DATA COST');
    }

    async function calculCost() {
        try {
            loadingCost.value = true;
            let resultCost = await store.dispatch(
                'WorksModule/calculCostBoiler',
                dataToPostCost.value
            );

            console.log(resultCost, 'Cost result');

            if (resultCost.status == 200 && resultCost.data.success) {
                costValue.value = resultCost.data.data;

                await store.dispatch('WorksModule/setDataIdToPost', {
                    estimation: costValue.value ?? 0,
                    idWorkCost: resultCost.data.workCost.id ?? null,
                    quantity: dataToPostCost.value.quantity ?? 1,
                });

                console.log(
                    store.getters['WorksModule/getDataIdToPost'],
                    'DATA IN STORE'
                );
            }
        } catch (error) {
            console.error('Error get Cost work taransformation : ', error);
        } finally {
            loadingCost.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .calculateCost {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
