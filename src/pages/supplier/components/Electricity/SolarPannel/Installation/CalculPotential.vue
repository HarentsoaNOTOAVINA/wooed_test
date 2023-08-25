<template>
    <div class="relative h-[400px]" v-if="isLoadSubmitInvoice">
        <Loader />
    </div>
    <div class="electric-container" v-else>
        <!-- If !potential -->
        <div class="electric-container__items" v-if="!dataPotential.length">
            <div class="electric-container__header">
                <Button @click="handleRedirectTo" type-button="gray"
                    >Calculer votre potentiel sur carte</Button
                >
                <div class="link">
                    <RoundLink /><a
                        href="https://environnement.brussels/thematiques/batiment-et-energie/energie-verte/produire-votre-propre-energie-verte/panneaux-solaires"
                        >Documentation
                    </a>
                </div>
            </div>
            <div class="form">
                <div class="form-wrap" v-if="region !== 'Région Wallonne'">
                    <Input
                        name-input="greatPotential"
                        label='Surface "excellent potentiel" *'
                        placeholder="0 m2"
                        @input="handleChange"
                    />
                    <Input
                        name-input="goodPotential"
                        label='Surface "bon potentiel" *'
                        placeholder="0 m2"
                        @input="handleChange"
                    />
                </div>
                <Input
                    v-else
                    name-input="annualProduction"
                    label="Production annuelle moyenne *"
                    placeholder="0 m2"
                    @input="handleChange"
                />
                <div class="w-full">
                    <Paragraphe>Inserer le rapport (.pdf) *</Paragraphe>
                    <UploadImage
                        @upload="($event) => handlePdf($event, 'files')"
                        name="files"
                        :needBase64="false"
                    />
                </div>
                <Button
                    v-if="region !== 'Région Wallonne'"
                    @click="handleSubmit"
                    :disabled="
                        fillNull ||
                        inputNull ||
                        params.file === null ||
                        params.goodPotential === '' ||
                        params.greatPotential === ''
                    "
                    ><LoadingButton
                        v-if="isLoadingSubmit"
                        size="xs"
                    />Envoyer</Button
                >
                <Button
                    v-else
                    @click="handleSubmit"
                    :disabled="
                        fillNull ||
                        inputNull ||
                        params.file === null ||
                        params.annualProduction === ''
                    "
                    ><LoadingButton v-if="isLoadingSubmit" size="xs" />Envoyer</Button
                >
            </div>
        </div>
        <!-- If Potential - List -->
        <div class="electric-container__items" v-else>
            <Alert>
                Après avoir choisi la société, envoyer mail type (en annexe, le
                rapport) « Bonjour, pourriez-vous me transmettre un devis pour
                l’installation de panneaux solaires sur le toit de mon bien?
                Vous trouverez ci-joint une copie rapport émis par
                <span class="text-info">geodata.envrionnement.brussels</span> »
            </Alert>
            <table>
                <thead>
                    <th>Rapport</th>
                    <th>
                        Production annuelle moyenne
                    </th>
                    <th>Surface "excellent potentiel</th>
                    <th>Surface "bon potentiel</th>
                </thead>
                <tbody>
                    <tr >
                        <td><a class="text-primary " :href="dataPotential[0].path" target="_blank">{{ dataPotential[0].file }}</a></td>
                        <td v-if="!!dataPotential[0].annualProduction">{{ dataPotential[0].annualProduction }} kwh</td>
                        <td v-else>N/A</td>
                        <td>{{ dataPotential[0].greatPotential }} m<sup>2</sup></td>
                        <td>{{ dataPotential[0].goodPotential }} m<sup>2</sup></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import { onBeforeMount, ref } from 'vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import SupplierServices from '@/services/supplierService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useRoute } from 'vue-router';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { notification } from 'ant-design-vue';


    const isLoadingSubmit = ref<boolean>(false);
    const isLoadSubmitInvoice = ref<boolean>(false);
    const inputNull = ref<boolean>(true);
    const fillNull = ref<boolean>(true);
    const props = defineProps<{
        region: string;
    }>();
    const title = [
        'Rapport',
        'Production annuelle moyenne',
        'Surface "excellent potentiel',
        'Surface "bon potentiel',
    ];
    const routes = useRoute();
    const thePropertyId = routes.params.id;
    const dataPotential = ref<any>([]);
    const params = ref<any>({
        theProperty: thePropertyId,
    });

    onBeforeMount(() => {
        getPotentialComputing();
    });

    const emit = defineEmits<{
        (fn: 'on-enable-next-tab', v: string): void
    }>();

    function handleChange(value: any) {
        inputNull.value = false;
        params.value = {
            ...params.value,
            ...value,
        };
        console.log(params.value);
    }
    function handlePdf(pdf: any, name: string) {
        fillNull.value = false;
        params.value = {
            ...params.value,
            [name]: pdf,
        };
        console.log(params.value);
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
            const { data } = await SupplierServices.postPotential(formData);
            dataPotential.value = [data.data];
            if (data.code === 200) {
                notification.success({
                    message: 'Vos données ont été enregistrer',
                });
                emit("on-enable-next-tab", 'choose');
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
    async function getPotentialComputing() {
        isLoadSubmitInvoice.value = true;
        try {
            const {data, code} = await SupplierServices.getPotentialComputingList({
                theProperty: thePropertyId,
            });
            dataPotential.value = data;
            /**
             * we specify here next tab to enable after getting data
             * only if data found
             */
            if (!(Array.isArray(data) && !data.length)) {
                console.log('object');
                emit("on-enable-next-tab", 'choose')
            }
        } catch (error) {
            console.log(error, 'ERROR');
        } finally {
            isLoadSubmitInvoice.value = false;
        }
    }
    function handleRedirectTo() {
        switch (props.region) {
            case 'Bruxelles':
            case 'Bruxelles-Capitale':
                window.open(
                    'https://geodata.environnement.brussels/client/solar/?_ga=2.50528608.890736824.1632073509-224142722.1632073509',
                    '_blank'
                );
                break;
            case 'Vlaams Gewest':
                window.open(
                    'https://apps.energiesparen.be/zonnekaart',
                    '_blank'
                );
                break;
            case 'Région Wallonne':
                window.open('http://sifpv.apere.org/', '_blank');
                break;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .electric-container {
        @apply flex flex-col gap-[18px];
        @apply overflow-x-auto;
        @include scrollbar;
        &__items {
            @apply flex flex-col gap-[18px];
        }
        &__header {
            @apply flex justify-between w-full items-center;
        }
    }
    .head-title {
        @apply text-[16px] text-grayIcon w-full;
    }
    .form {
        @apply flex flex-col gap-[18px] w-full items-end;
    }
    .form-wrap {
        @apply grid grid-cols-1 gap-[18px] w-full;
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
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
    .text-info {
        font-style: italic;
        color: var(--color-primary);
    }
    table {
        @apply overflow-x-auto w-full;
        @include scrollbar;
        th,
        td {
            border: 0.5px solid var(--color-stroke-gray);
            padding: 10px;
        }
        td{
            text-align: center;
        }
        th {
            background-color: var(--color-gray);
            text-align: start;
        }
    }
    .files {
        color: var(--color-gray-icon);
        @apply flex gap-[10px] items-center;
    }
</style>
