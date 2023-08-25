<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <div class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Installation"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />
                <TabsCard :dataTabs="dataTabs" :disabled-tab="disabledTab">
                    <template #calcul>
                        <CalculPotential
                            @on-enable-next-tab="handleTabActivation"
                            :region="region"
                        />
                    </template>
                    <template #choose>
                        <ChooseFitter 
                            @on-enable-next-tab="handleTabActivation"
                        />
                    </template>
                    <template #adminAspect>
                        <div>
                            <AdminAspect operationType="installation"/>
                        </div>
                    </template>
                </TabsCard>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { computed, ref } from 'vue';
    import AdminAspect from '../AdminAspect/AdminAspect.vue';
    import { useRoute } from 'vue-router';
    import CalculPotential from './CalculPotential.vue';
    import ChooseFitter from './ChooseFitter.vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const props = defineProps<{
        supplier: string;
        region: string;
    }>();

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },
        {
            label: 'Eléctricité',
        },
        {
            label: 'Panneaux solaires',
        },
    ];

    const disabledTab = ref<string[]>(['choose', 'adminAspect']);

    const dataTabs = [
        {
            tabTitle: 'Calculez votre potentiel sur la carte solaire',
            tabName: 'calcul',
        },
        {
            tabTitle: 'Choisissez un installateur certifié',
            tabName: 'choose',
        },
        {
            tabTitle: 'Aspects administratifs',
            tabName: 'adminAspect',
        },
    ];

    function handleTabActivation(tabName: string) {
        disabledTab.value = [
            ...disabledTab.value.filter((str) => str !== tabName),
        ];
    }
</script>

<style lang="scss" scoped>
    .supplier-work {
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
