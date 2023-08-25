<template>
    <div class="relative h-[400px]" v-if="isLoadSubmitInvoice">
        <Loader />
    </div>
    <template v-else>
        <!-- If selectedOrganization is empty -->
        <div
            class="electric-container"
            v-if="!selectedOrganization || selectedOrganization.length < 1"
        >
            <Alert>
                Une fois les travaux terminés, un organisme de contrôle agréé pour
                les installations électriquess doit vérifier si l'installation est
                conforme au Règlement général pour les installations électriques
                (RGIE). Cet organisme vérifie le circuit des panneaux solaires
                jusqu'au compteur d'électricité verte
            </Alert>
            <Title
                type="h2"
                weight="600"
                label="Listes des organismes agréées"
                class="head-title"
            />
            <hr class="__hr" />
            <Alert>
                Après avoir choisi la société, envoyer mail type (en annexe, le
                schéma de l’installation) « Bonjour, pourriez-vous me donner vos
                disponibilités pour le contrôle de l’installation électrique de mes
                panneaux solaires? Vous trouverez ci-joint une copie du schéma de
                l’installation »
            </Alert>
            <OrganismList
                @handle-checked-row="handleCheckedRow"
                :the-property-id="thePropertyId"
                :operation-type="operationType"
                :data="dataOrganism"
            />
            <div class="add-file">
                <label>Schema d'installation</label>
                <UploadImage
                    @upload="($event) => handlePdf($event, 'files')"
                    name="files"
                    :needBase64="false"
                />
            </div>
            <Button @click="handleSubmit"
                ><LoadingButton v-if="isLoadingSubmit" size="xs" />Envoyer</Button
            >
            <hr class="__hr" />
        </div>
        <!-- If selectedOrganization not empty -->
        <div class="organization-container" v-else>
            <Alert>
                Après avoir choisi la société, envoyer mail type (en annexe, le
                schéma de l’installation) « Bonjour, pourriez-vous me donner vos
                disponibilités pour le contrôle de l’installation électrique de mes
                panneaux solaires? Vous trouverez ci-joint une copie du schéma de
                l’installation »
            </Alert>
            <table>
                <thead>
                    <th v-for="(item, index) in organizaitonTitles" :key="index">
                        {{ item.title }}
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ selectedOrganization.name }}</td>
                        <td>{{ selectedOrganization.activityField }}</td>
                        <td>{{ selectedOrganization.seat }}</td>
                        <td>{{ selectedOrganization.adress }}</td>
                        <td>{{ selectedOrganization.tel }}</td>
                        <td>{{ selectedOrganization.fax }}</td>
                        <td>{{ selectedOrganization.email }}</td>
                        <td><a class="text-primary " :href="selectedOrganization.path" target="_blank">{{ selectedOrganization.path }}</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import OrganismList from '@/pages/supplier/components/Electricity/SolarPannel/AdminAspect/OrganismList.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { onBeforeMount, ref, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';
    import { organismeList } from './Data/organismList.data';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const routes = useRoute();

    const isLoadingSubmit = ref<boolean>(false);
    const isLoadSubmitInvoice = ref<boolean>(false);
    const thePropertyId = routes.params.id;
    const dataOrganism = ref<Array<any>>(organismeList);
    const selectedOrganization = ref<any>();

    const props = defineProps<{
        operationType: string;
    }>();

    const organizaitonTitles = [
        {
            title: 'ORGANISME',
            dataIndex: 'name',
        },
        {
            title: 'DOMAINES D’ACTIVITÉ',
            dataIndex: 'activityField',
        },
        {
            title: 'SIÈGE',
            dataIndex: 'seat',
        },
        {
            title: 'ADRESSE',
            dataIndex: 'adress',
        },
        {
            title: 'TEL',
            dataIndex: 'tel',
        },
        {
            title: 'FAX',
            dataIndex: 'fax',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
        },
        {
            title: 'Devis',
            // dataIndex: 'devis',
        },
    ];

    const params = ref<any>({
        theProperty: thePropertyId,
        operationType: props.operationType,
    });

    onBeforeUnmount(() => {
        console.log('UNMOUNTED');
    })

    onBeforeMount(() => {
        getOrganizationById();
    });

    function handlePdf(pdf: any, name: string) {
        params.value = {
            ...params.value,
            [name]: pdf,
        };
        console.log('PARAMS = ', params.value);
    }

    function handleCheckedRow(selected: any) {
        if (selected.length) {
            const { key, ...value } = selected[0];
            params.value = {
                ...params.value,
                ...value,
            };
            console.log('PARAMS = ', params.value);
        }
    }

    async function handleSubmit() {
        isLoadingSubmit.value = true;
        const formData = new FormData();
        try {
            Object.keys(params.value).forEach((key) => {
                if (key === 'files') {
                    params.value[key].forEach((files: any, index: number) => {
                        formData.append(`files[${index}]`, files.originFileObj);
                    });
                } else {
                    formData.append(key, params.value[key]);
                }
            });
            const { data } = await SupplierServices.postSolarOrganisation(
                formData
            );
            if (data.code === 200) {
                notification.success({
                    message: 'Vos données ont été enregistrer',
                });
                selectedOrganization.value = data.data;
            } else if (data.code === 404) {
                notification.error({
                    message: "Une erreur s'est produite, veuillez réessayez",
                });
            }
        } catch (e) {
            notification.error({
                message: "Une erreur s'est produite, veuillez réessayez",
            });
        } finally {
            isLoadingSubmit.value = false;
        }
    }

    async function getOrganizationById() {
        isLoadSubmitInvoice.value = true;
        try {
            const {data} = await SupplierServices.getSolarOrganisationById({
                theProperty: thePropertyId,
                operationType: props.operationType,
            });
            selectedOrganization.value = data[0];
            if (!data || data.length < 1) {
                console.log('data org -1 ');
                getOrganizationList().finally(() => isLoadSubmitInvoice.value = false)
            }
        } catch (error) {
            isLoadSubmitInvoice.value = true;
        }
    }

    async function getOrganizationList() {
        return new Promise(async (resolve: any, rej) => {
            try {
                const { data, code } = await SupplierServices.getSolarOrganisationList({
                    theProperty: thePropertyId,
                    operationType: props.operationType,
                });
                if (code === 200) {
                    dataOrganism.value = data;
                }
                resolve();
            } catch (error) {
                ref(error)
            }
        });
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .electric-container {
        @apply flex flex-col gap-[18px] items-end;
        @apply overflow-x-auto;
        @include scrollbar;
    }
    .organization-container{
        @apply flex flex-col gap-[18px];
        @apply overflow-x-auto;
        @include scrollbar;
    }
    .head-title {
        @apply text-[16px] text-grayIcon w-full;
    }
    .__hr {
        @apply text-gray w-full;
    }
    .add-file {
        @apply w-full;
        &:deep() {
            label {
                @apply font-semibold;
            }
            .ant-upload-select {
                @apply w-full;
            }
        }
    }
    table {
        @apply overflow-x-auto w-full;
        @include scrollbar;
        th,
        td {
            border: 0.5px solid var(--color-stroke-gray);
            padding: 10px;
        }
        th {
            background-color: var(--color-gray);
        }
    }
</style>
