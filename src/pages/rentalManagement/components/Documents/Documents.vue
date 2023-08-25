<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="documents">
        <div class="documents__container place-content-14px">
            <Title type="h2" label="Documents" class="documents__title" />
            <hr class="__hr" />
            <template v-if="!touristAccommodation">
                <CardWrapperTitle typeTitle="h3" label="Contrat de location">
                    <div
                        class="documents__files"
                        v-if="dataRentalAgreement.length > 0"
                    >
                        <template v-for="(item, index) in dataRentalAgreement">
                            <FilePreview
                                :file-name="item.name"
                                :file-path="item.path"
                            />
                        </template>
                    </div>
                    <div class="documents__files" v-else>
                        <Empty description="Aucun contrat" />
                    </div>
                </CardWrapperTitle>
                <CardWrapperTitle typeTitle="h3" label="Etat des lieux">
                    <CardWrapper
                        class="documents__subContent place-content-14px"
                    >
                        <Title
                            type="h4"
                            label="Entrée"
                            class="documents__subtitle"
                        />
                        <hr class="__hr" />
                        <div class="documents__subItems">
                            <div
                                class="documents__files"
                                v-if="docEntryStateGround.name != null"
                            >
                                <FilePreview
                                    :file-name="docEntryStateGround.name"
                                    :file-path="docEntryStateGround.path"
                                />
                            </div>
                            <div class="documents__files-no-content" v-else>
                                <Empty description="Aucun document d'entrée" />
                            </div>
                        </div>
                    </CardWrapper>
                    <CardWrapper
                        class="documents__subContent place-content-14px"
                    >
                        <Title
                            type="h4"
                            label="Sortie"
                            class="documents__subtitle"
                        />
                        <hr class="__hr" />
                        <div class="documents__subItems">
                            <div
                                class="documents__files"
                                v-if="docExitStateGround.name != null"
                            >
                                <FilePreview
                                    :file-name="docExitStateGround.name"
                                    :file-path="docExitStateGround.path"
                                />
                            </div>
                            <div class="documents__files-no-content" v-else>
                                <Empty description="Aucun document de sortie" />
                            </div>
                            <div class="documents__add-new-docExitStateGround">
                                <Title
                                    type="h4"
                                    label="Ajout etat  de lieu de sortie"
                                    class="documents__subtitle"
                                />
                                <hr class="__hr" />
                                <OverviewWrap
                                    :hasTitle="true"
                                    :is-from-html="true"
                                    :id-offer-lease="idOfferLease"
                                    type-signature-state="exit"
                                />
                            </div>
                        </div>
                    </CardWrapper>
                </CardWrapperTitle>
                <CardWrapperTitle typeTitle="h3" label="Garantie locative">
                    <div class="documents__files">
                        <template v-for="(item, index) in fakeFileData">
                            <FilePreview
                                :file-name="item.name"
                                :file-path="item.path"
                            />
                        </template>
                    </div>
                </CardWrapperTitle>
            </template>
            <DocumentTourist v-else />
        </div>
    </MainCard>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { onMounted, ref, shallowRef } from 'vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import StatePlaceOfExitForm from './LocationDoc/StatePlaceOfExitForm.vue';
    import OverviewWrap from '@/pages/lease/overview/OverviewWrap.vue';
    import CardWrapperTitle from '@/components/Display/CardWrapperTitle/CardWrapperTitle.vue';
    import FilePreview from '@/components/Display/FIlePreview/FilePreview.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import DocumentTourist from './DocumentTourist/DocumentTourist.vue';
    import { useStore } from 'vuex';
    import { Empty } from 'ant-design-vue';

    const store = useStore();

    const breadcrumbListsData = [
        {
            label: 'Biens mis en location : GESTION (LOCATION)',
        },
    ];

    interface IDocStateGround {
        name: string;
        path: string;
    }

    const fakeFileData = [
        {
            name: 'doc.pdf',
            path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
        },
        {
            name: 'doc2.pdf',
            path: 'https://gateway.my-preprod.space/uploads/docproperty/63903e2e47ca1_unclos_f.pdf',
        },
    ];

    const BASE_URL = import.meta.env.VITE_API_ROOT_URL;
    let loading = ref<boolean>(false);
    let docEntryStateGround = ref<IDocStateGround | any>({
        name: null,
        path: null,
    });
    let docExitStateGround = ref<IDocStateGround | any>({
        name: null,
        path: null,
    });

    let idOfferLease = ref<number>();
    let touristAccommodation = ref<boolean>(true);

    let dataRentalAgreement = ref<any>([]);

    onMounted(() => {
        getDetailDocFromStore();
    });

    function getDetailDocFromStore() {
        try {
            loading.value = true;
            let response = store.getters['RentalModule/getBailManagmentData'];
            if (response.data.length > 0) {
                idOfferLease.value =
                    response.data[response.data.length - 1].offerLease.id;
                dataRentalAgreement.value.push({
                    name: response.data[response.data.length - 1].offerLease
                        .filename,
                    path:
                        BASE_URL +
                        response.data[response.data.length - 1].offerLease.path,
                });

                response.data[
                    response.data.length - 1
                ].offerLease.inventories.forEach((inv: any) => {
                    switch (inv.type) {
                        case 'entry':
                            docEntryStateGround.value.name = inv.fileName;
                            docEntryStateGround.value.path =
                                BASE_URL + inv.filePath;

                            break;
                        case 'exit':
                            docExitStateGround.value.name = inv.fileName;
                            docExitStateGround.value.path =
                                BASE_URL + inv.filePath;

                            break;

                        default:
                            break;
                    }
                });

                console.log(docExitStateGround.value, 'VALUE VALUE');
            }
        } catch (error) {
            console.error(error, 'When trying to getData location in store');
        } finally {
            loading.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .documents {
        &__contentTitle {
            @apply flex;
        }
        &__back {
            @apply text-[var(--color-primary)];
        }
        &__title {
            @apply font-[600] text-[14px] text-primary;
        }
        &__subtitle {
            @apply font-[600] text-[14px] text-secondary;
        }
        &__contrat,
        &__statePlace,
        &__rentalGuarant {
            @apply p-[10px] rounded-[8px];
            border: 2px solid var(--color-gray);
        }
        &__subItems {
            @apply relative place-content-18px;
        }
        &:deep() {
            .documents {
                &__files {
                    @apply flex flex-wrap gap-[14px];
                }
            }
        }
    }

    .title {
        @apply text-lg font-semibold text-[var(--color-primary)];
    }
</style>
