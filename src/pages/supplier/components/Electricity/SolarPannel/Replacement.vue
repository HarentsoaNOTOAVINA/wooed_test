<template>
    <div>
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            :borderBottom="true"
            class="supplier-work"
        >
            <Loader v-if="isLoadFitter" />
            <div v-else class="supplier-work__container">
                <Title
                    type="h2"
                    weight="600"
                    label="Remplacement"
                    class="supplier-work__head-title"
                />

                <hr class="__hr" />
                <!-- tabs card -->
                <TabsCard :dataTabs="dataTabs">
                    <template #replacement>
                        <div class="flex flex-col gap-[18px]">
                            <Alert v-if="!fitter"
                                ><span class="flex items-center gap-[10px]"
                                    >Vous devez d'abord
                                    <Button
                                        @click="$emit('on-go-to-fitter')"
                                        type-button="border"
                                        >choisir un installateur</Button
                                    >
                                </span></Alert
                            >
                            <div class="form-wrap">
                                <InputDate
                                    :disable="true"
                                    name="effectiveDate"
                                    label="Date effective"
                                    :placeholder="effectiveDate"
                                />
                                <InputDate
                                    :disable="true"
                                    name="ultimeDate"
                                    label="Date ultime (+ 12 ans et 6 mois) *"
                                    :placeholder="ultimateDate"
                                />
                            </div>
                            <div class="form-wrap">
                                <Select
                                    label="Type du panneau"
                                    name="type"
                                    placeholder="Selectionner"
                                    @change-select="handleChange"
                                    :options="options"
                                    :disabled="true"
                                    :value="fitter && fitter.fitterName"
                                />
                                <Input
                                    :disabled="true"
                                    name="price"
                                    label="Prix du panneau"
                                    placeholder="0.00 €"
                                    @input="handleChange"
                                    :value="fitter && fitter.price"
                                />
                            </div>

                            <div class="section">
                                <div class="btn" v-if="fitter">
                                    <Button @click="handleShowModal"
                                        >Contacter l'installeur</Button
                                    >
                                </div>
                                <Modal
                                    :is-show-modal="isShowModal"
                                    @on-back="onOpenModal"
                                    title="Envoyer l'email"
                                    width="650"
                                >
                                    <template #content>
                                        <div class="modal-content">
                                            <div class="modal-content__items">
                                                <TextArea
                                                    label="Message"
                                                    name-input="message"
                                                    @handle-change="
                                                        handleChange
                                                    "
                                                    :default-value="messageText"
                                                    class="md:flex-col"
                                                    :auto-size="{ minRows: 4 }"
                                                    :max-length="1000"
                                                />
                                                <Input
                                                    :disabled="true"
                                                    label="Destinataire"
                                                    :placeholder="
                                                        fitter.fitterEmail
                                                    "
                                                    :value="fitter.fitterEmail"
                                                />
                                                <a
                                                    class="__document"
                                                    :href="
                                                        fileInstallation &&
                                                        fileInstallation[0].path
                                                    "
                                                    target="_blank"
                                                >
                                                    <PdfIcon />
                                                    <span
                                                        >Schéma de
                                                        l'installation</span
                                                    >
                                                </a>
                                            </div>
                                            <Button @click="handleSendEmail"
                                                ><LoadingButton
                                                    v-if="isLoadingSubmit"
                                                    size="xs"
                                                />Envoyer</Button
                                            >
                                        </div>
                                    </template>
                                </Modal>
                            </div>
                        </div>
                    </template>
                    <template #adminAspect>
                        <div>
                            <AdminAspect operation-type="replacement" />
                        </div>
                    </template>
                </TabsCard>
                <!-- fin -->
            </div>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { computed, onMounted, ref } from 'vue';
    import moment from 'moment';
    import AdminAspect from './AdminAspect/AdminAspect.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { useRoute } from 'vue-router';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import SupplierServices from '@/services/supplierService';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import PdfIcon from '@/components/Icon/DocPdf.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import store from '@/store';
    import { notification } from 'ant-design-vue';

    const route = useRoute();
    const theProperty = computed(() => route.params.id);

    const props = defineProps<{
        supplier: string;
    }>();

    const isLoadingSubmit = ref<boolean>(false);
    const fitter = ref<any>();
    const options = ref<Object>([
        {
            value: 'Le panneau monocristallin',
            label: 'Le panneau monocristallin',
        },
        {
            value: 'Le panneau polycristallin',
            label: 'Le panneau polycristallin',
        },
        {
            value: 'Le panneau solaire amorphe',
            label: 'Le panneau solaire amorphe',
        },
    ]);

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

    const isShowModal = ref<boolean>(false);
    const isLoadFitter = ref<boolean>(false);

    const dataTabs = [
        {
            tabTitle: 'Remplacement des panneaux solaires',
            tabName: 'replacement',
        },
        {
            tabTitle: 'Aspects administratifs',
            tabName: 'adminAspect',
        },
    ];

    const ultimateDate = ref<any>();
    const effectiveDate = ref<any>();

    const params = ref<Object>({
        urlSite: window.location.origin,
    });

    const fileInstallation = ref<any>();

    onMounted(() => {
        getFitter();
        getDate();
    });

    const messageText = computed(
        () =>
            `Bonjour, je souhaiterais remplacer l’onduleur rattaché à mes panneaux solaires.\n Vous trouverez ci-joint une le schéma de l’installation.\n Auriez-vous l’amabilité de bien vouloir me transmettre un devis et le délai d’exécution estimé?\n Détails du panneau solaire: \n Type: ${fitter.value.panelType}\n Prix: ${fitter.value.price}\n Type de batterie: ${fitter.value.batteryType}\n Prix de la batterie: ${fitter.value.batteryPrice}\n Je vous remercie,`
    );

    function onOpenModal() {
        isShowModal.value = !isShowModal;
    }

    function handleShowModal() {
        fileInstallation.value = fitter.value.providerSolarFitterFiles.filter(
            (file: { type: string }) => file.type === 'fileInstallationSchema'
        );
        isShowModal.value = true;
    }

    function getDate() {
        const date = moment(Date.now()).format('L');
        effectiveDate.value = date;
        ultimateDate.value = moment(Date.now()).add(12.5, 'year').format('L');
    }
    async function getFitter() {
        try {
            isLoadFitter.value = true;
            const { data, code } = await SupplierServices.getFitterList({
                theProperty: theProperty.value,
            });
            if (code === 200) {
                fitter.value = data;
            }
        } finally {
            isLoadFitter.value = false;
        }
    }

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    async function handleSendEmail() {
        isLoadingSubmit.value = true;
        const fileToSend = fitter.value.providerSolarFitterFiles.filter(
            (file: { type: string }) => file.type === 'fileInstallationSchema'
        );
        params.value = {
            ...params.value,
            email: fitter.value.fitterEmail,
            fileInstallationSchema: fileToSend[0].path,
        };
        try {
            const { data } = await SupplierServices.postSolarMail(params.value);
            if (data.code === 200) {
                notification.success({
                    message: 'Message envoyé',
                });
            } else if (data.code === 404) {
                notification.error({
                    message: "Une erreur s'est produite, veuillez réessayez",
                });
            }
        } catch (error) {
            notification.error({
                message: "Une erreur s'est produite, veuillez réessayez",
            });
            console.log(error, 'ERROR');
        } finally {
            isLoadingSubmit.value = false;
            isShowModal.value = false;
        }
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
        &__items {
            @apply flex flex-col gap-[18px];
            &--connection {
                @apply flex justify-between items-center;
            }
            &--consumption {
                @apply flex items-center gap-[4px] p-[7px] rounded-[4px] bg-gray text-primary cursor-pointer;
            }
        }
        &__item-supplier {
            @apply flex justify-between items-center px-[14px] py-[12px] rounded-[4px] bg-gray;
            &:deep() {
                button {
                    @apply text-[10px] px-[14px] py-[4px];
                }
            }
        }
    }
    .head-title {
        @apply text-[14px] text-grayIcon;
    }
    .__document {
        @apply flex mt-[10px] gap-1 text-primary;
        cursor: pointer;
    }
    .__hr {
        @apply text-gray w-full;
    }
    .form-wrap {
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
    .noData {
        @apply flex justify-center w-full;
    }
    .btn {
        @apply flex gap-[18px];
    }
    .section {
        @apply flex flex-col gap-[18px] items-end;
    }
    .modal-content {
        @apply flex flex-col gap-[18px] items-end;
        &__items {
            @apply flex flex-col w-full gap-[18px];
        }
    }
    .fitter-detail {
        @apply flex flex-col w-full gap-[18px] bg-gray rounded-[8px] p-[10px];
    }
</style>
