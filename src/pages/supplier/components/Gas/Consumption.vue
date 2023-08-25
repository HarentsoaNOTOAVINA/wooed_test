<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="consume"
        >
            <div class="consume__container">
                <div class="consume__items--connection">
                    <Title
                        v-if="energyType === 'GAZ'"
                        type="h2"
                        weight="600"
                        label="Consommation de gaz"
                        class="consume__head-title"
                    />
                    <Title
                        v-if="energyType === 'electricity'"
                        type="h2"
                        weight="600"
                        label="Consommation d'éléctricité"
                        class="consume__head-title"
                    />

                    <div class="consume__items--consumption">
                        <span>Consommation</span>
                        <Icon icon-name="ArrowBottom" />
                    </div>
                </div>
                <hr class="__hr" />
                <TabsCard :dataTabs="dataTabs">
                    <template #consumption>
                        <div class="consume__tabs-items">
                            <AnnualConsumption
                                :the-property="(theProperty as any)"
                            />
                            <Comparison :the-property="(theProperty as any)" />
                        </div>
                    </template>
                    <template #emptyHouse>
                        <div>
                            <alert
                                >Mon bien est inoccupé ET je souhaite souscrire
                                un contrat « MAISON VIDE »
                                <a
                                    href="https://www.engie.be/fr/energie/electricite-gaz/demenagermaison-vide"
                                    target="_blank"
                                    ><Button type-button="border"
                                        >Souscrire</Button
                                    ></a
                                >
                            </alert>
                        </div>
                    </template>
                    <template #Invoice>
                        <div class="consume__tabs-items">
                            <div class="consume__form-upload">
                                <label>
                                    <span class="font-[600]">
                                        Ajouter un facture
                                    </span>
                                </label>
                                <UploadImage
                                    name="invoice"
                                    :needBase64="false"
                                    @upload="handleFiles"
                                />
                                <Button
                                    :disabled="!isEnableSubmit"
                                    @click="submitInvoice"
                                    :is-load="isLoadSubmitInvoice"
                                    class="save-btn"
                                    >Enregistrez</Button
                                >
                            </div>
                            <Invoice
                                :the-property="(theProperty as any)"
                                :incoming-invoice="incomingInvoice"
                                :energy-type="energyType"
                            />
                        </div>
                    </template>
                    <template #energyManager>
                        <div class="no-application">
                            <NoProposal text-desc="Pas d'application" />
                        </div>
                    </template>
                </TabsCard>
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import NoProposal from './Consumption/NoProposal.vue';
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import AnnualConsumption from './Consumption/AnnualConsumption.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Invoice from './Consumption/Invoice.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { ref } from 'vue';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';
    import Comparison from './Consumption/Comparison.vue';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const props = defineProps<{
        energyType: string;
        energyName: string;
    }>();

    const breadcrumbListsData = [
        {
            url: '/fournisseur/' + theProperty.value,
            label: 'Fournisseur',
        },

        {
            label: props.energyName,
        },
    ];

    const dataTabs = [
        {
            tabTitle: 'Consommation',
            tabName: 'consumption',
        },
        {
            tabTitle: 'Maison vide',
            tabName: 'emptyHouse',
        },
        {
            tabTitle: 'Facture',
            tabName: 'Invoice',
        },
        {
            tabTitle: 'Energy Manager',
            tabName: 'energyManager',
        },
    ];

    const isLoadSubmitInvoice = ref<boolean>(false);
    const isEnableSubmit = ref<boolean>(false);

    const params = ref<any>({
        theProperty: route.params.id,
        energyType: props.energyType,
    });

    const incomingInvoice = ref<any>(null);

    function handleFiles(fileList: any[]) {
        params.value = {
            ...params.value,
            files: fileList,
        };
        isEnableSubmit.value = !!fileList.length;
    }

    async function submitInvoice() {
        isLoadSubmitInvoice.value = true;
        const formData = new FormData();
        try {
            Object.keys(params.value).forEach((key) => {
                if (key === 'files') {
                    params.value[key].forEach((file: any, index: number) => {
                        formData.append(`files[${index}]`, file.originFileObj);
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await SupplierServices.postBill(formData);
            incomingInvoice.value = data.data;
            notification.success({
                message: 'Votre facture a été enregistré',
            });
        } finally {
            isLoadSubmitInvoice.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .consume {
        &:deep() {
            .alert {
                @apply items-center;
                &__content {
                    @apply flex items-center justify-between gap-[10px];
                }
            }
        }
        .no-application {
            @apply min-h-[300px] flex justify-center items-center;
        }
        &__container {
            @apply flex flex-col gap-[18px] mb-[18px];
            .save-btn {
                @apply w-full flex justify-end;
                &:deep() {
                    button {
                        @apply w-full md:w-auto;
                    }
                }
            }
        }
        &__head-title {
            @apply text-[16px] text-grayIcon;
        }
        &__tabs-items {
            @apply flex flex-col gap-[18px];
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &--connection {
                @apply flex justify-between items-center;
            }
            &--consumption {
                @apply flex items-center gap-[4px] p-[7px] rounded-[4px] bg-gray text-primary cursor-pointer;
            }
        }
        &__subtitle {
            @apply text-primary text-[14px];
        }
        &__form-upload {
            @apply flex flex-col gap-[18px];
        }
        &__form {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .date__space {
                    gap: 0 !important;
                }
                .date__label {
                    @apply mb-[10px];
                }
                label {
                    @apply font-[600];
                }
            }
        }
        &__form-wrap {
            @apply grid grid-cols-1 gap-[18px];
            @screen sm {
                @apply grid grid-cols-2;
            }
            @screen md {
                @apply grid grid-cols-1;
            }
            @screen lg {
                @apply grid grid-cols-2;
            }
        }
        &__table {
            @apply bg-gray flex flex-col gap-[18px] p-[18px] rounded-[8px];
            .__hr {
                @apply text-white;
            }
            &-header {
                @apply uppercase;
            }
            &-row {
                td {
                    @apply pb-[8px];
                }
                td:last-child {
                    @apply font-[600] text-right pb-0;
                }
            }
        }
    }

    .__hr {
        @apply text-gray w-full;
    }
</style>
