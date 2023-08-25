<template>
    <div>
        <MainCard :dataBreadcrumbs="breadcrumbListsData" class="urbanism">
            <div class="urbanism__container">
                <Title
                    type="h3"
                    label="Règles applicables"
                    class="urbanism__title"
                />
                <hr class="__hr" />
                <div class="urbanism__items">
                    <CardGray
                        class="mt-5"
                        v-for="(item, index) in content"
                        :key="index"
                    >
                        <template #head>
                            {{ item.text }}
                        </template>
                        <template #content>
                            <p v-html="`${item.content ?? 'Aucun'}`"></p>
                        </template>
                    </CardGray>

                    <div class="no-data" v-if="showNoData">
                        <a-empty description="Aucun regle applicable" />
                    </div>
                    <!-- <CardGray>
                        <template #head>
                            COBAT - Arrêté du Gouvernement de la Région de
                            Bruxelles-Capitale du 13 novembre 2008 déterminant
                            les actes et travaux dispenses de permis
                            d'urbanisme, de l'avis du fonctionnaire délégué, de
                            la commune ou de la commission royale des monuments
                            et des sites ou de l'intervention
                        </template>
                        <template #content>
                            <p>Cet acte est soumis à un permis d’urbanisme</p>
                        </template>
                    </CardGray>
                    <CardGray>
                        <template #head> PPAS </template>
                        <template #content>
                            <p>Néant</p>
                        </template>
                    </CardGray>
                    <CardGray>
                        <template #head>
                            Règlement régional d’urbanisme (RRU)
                        </template>
                        <template #content>
                            <p>Néant</p>
                        </template>
                    </CardGray>
                    <CardGray>
                        <template #head>
                            Avis des services incendies (SIAMU)
                        </template>
                        <template #content>
                            <div class="link">
                                <Icon iconName="RoundLink" />
                                <a href="#"> Poursuivre le lien </a>
                            </div>
                        </template>
                    </CardGray>
                    <CardGray>
                        <template #head>
                            Evaluation des incidences environnementales
                        </template>
                        <template #content>
                            <div class="link">
                                <Icon iconName="RoundLink" />
                                <a href="#"> Poursuivre le lien </a>
                            </div>
                        </template>
                    </CardGray>
                    <CardGray>
                        <template #head>
                            COBRACE et Arrêté du Gouvernement de la Région de
                            Bruxelles-Capitale du 21 décembre 2007 déterminant
                            des exigences en matière de performance énergétique
                            et de climat intérieur des bâtiments
                        </template>
                        <template #content>
                            <p>
                                Reprendre « exigences PEB » de la présentation
                                PEB
                            </p>
                        </template>
                    </CardGray> -->
                </div>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { notification, Empty as AEmpty } from 'ant-design-vue';
    import { onMounted, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import CardGray from './CardGray.vue';

    const store = useStore();
    const route = useRoute();

    const breadcrumbListsData = [
        {
            label: 'Urbanisme',
        },
    ];

    let content = ref<any>();
    let showNoData = ref<boolean>(false);

    let dataToGetRulesApplicable = ref<any>({
        idTypeOfWork: null,
        idSubsection: null,
        idChoiceCategory: null,
        idModel: null,
        idSubModel: null,
        region: null,
    });

    onMounted(async () => {
        await getPropertyDetail();
        await getDataIdToPost();
        await getRulesApplicable();
    });

    async function getPropertyDetail() {
        let data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );

        if (data.value.length != 0) {
            dataToGetRulesApplicable.value.region = data.value[0].region;

            console.log(data.value[0].region, 'DAta value region store exist');
        } else {
            let detailProperty = await store.dispatch(
                'ManagePropertyModule/getDetailsProperty',
                route.params.id
            );

            dataToGetRulesApplicable.value.region = detailProperty.region;

            store.dispatch('UrbanismeModule/setPropertydetail', detailProperty);
        }
    }

    function getDataIdToPost() {
        let data = store.getters['WorksModule/getDataIdToPost'];

        dataToGetRulesApplicable.value.idTypeOfWork = data.idTypeOfWork;
        dataToGetRulesApplicable.value.idSubsection = data.idSubSection ?? null;
        dataToGetRulesApplicable.value.idChoiceCategory =
            data.idCategory ?? null;
        dataToGetRulesApplicable.value.idModel = data.idModel ?? null;
        dataToGetRulesApplicable.value.idSubModel = data.idSubModel ?? null;
    }

    async function getRulesApplicable() {
        try {
            // mailSending.value = true;
            let responseRules = await store.dispatch(
                'WorksModule/rulesApplicable',
                dataToGetRulesApplicable.value
            );

            console.log(responseRules, 'RESPONSE REGLE APPLICABLE');

            if (responseRules.data.code == 200 && responseRules.data.success) {
                notification['info']({
                    message: `Regles applicables`,
                });

                content.value = JSON.parse(
                    responseRules.data.data[0].content[0]
                );
            } else if (responseRules.data.code == 404) {
                showNoData.value = true;
            }
        } catch (error) {
            console.error('Error getting rules applicables:', error);
        } finally {
            // mailSending.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .urbanism {
        &__container {
            @apply flex flex-col gap-[14px] mb-[18px];
        }
        &__title {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
            @screen md {
                @apply gap-[18px];
            }
        }
        .link {
            @apply flex gap-[14px];
            a {
                @apply text-primary;
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
