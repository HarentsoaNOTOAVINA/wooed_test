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
                    label="Qualité de l'eau"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />

                <TabsCard :dataTabs="dataTabs">
                    <template #runningWater>
                        <div class="quality__tabs-items">
                            <div class="link">
                                <RoundLink /><a
                                    href="https://www.dewatergroep.be/nl-be/drinkwater/jouw-drinkwater"
                                    >Poursuivre le lien</a
                                >
                            </div>
                        </div>
                    </template>
                    <template #extractedWater>
                        <div class="quality__tabs-items">
                            <Paragraphe class="description"
                                >Renvoyer par commune aux triangles</Paragraphe
                            >
                            <div class="link">
                                <RoundLink /><a
                                    href="https://www.dov.vlaanderen.be/portaal/?module=verkenner&pos=140500%2C200000&res=280.00000000088187&layers=n%3Aomwrgbmrvl%3Bo%3Aref%2Cn%3Agrb_sel%3Bo%3Aref%2Cn%3Ato%5C%3Ato_topnzw_2009_raster_10k_tr%3Bo%3Aref%3Bt%3Awms%3Bv%3An%2Cn%3Agw_varia%5C%3Astand_freatisch%3Bo%3Adov%3Bt%3Awms"
                                    >Poursuivre le lien</a
                                >
                            </div>
                        </div>
                    </template>
                    <template #waterTraitement>
                        <div class="quality__tabs-items">PDF</div>
                    </template>
                </TabsCard>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: 'Eau',
        },
    ];

    const dataTabs = [
        {
            tabTitle: 'Eau courante',
            tabName: 'runningWater',
        },
        {
            tabTitle: 'Eau extraite de la nappe phréatique',
            tabName: 'extractedWater',
        },
        {
            tabTitle: "Traitement de l'eau",
            tabName: 'waterTraitement',
        },
    ];
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
    .quality {
        &__tabs-items {
            @apply flex flex-col gap-[18px];
            .description {
                color: var(--color-gray-icon);
                font-weight: 500;
                text-decoration: underline;
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
</style>
