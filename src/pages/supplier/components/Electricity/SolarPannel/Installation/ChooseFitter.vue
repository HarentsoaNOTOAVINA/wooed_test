<template>
    <div class="relative h-[400px]" v-if="isLoadSubmitInvoice">
        <Loader />
    </div>
    <div class="electric-container" v-else>
        <!-- If !Fitter -->
        <div
            class="electric-container__items"
            v-if="!dataFitter || dataFitter.length < 1"
        >
            <div class="link">
                <RoundLink /><a href="https://rescert.be/fr/list?res_category=2"
                    >Contacter un installateur agrée pour obtenir un devis
                </a>
            </div>
            <template v-if="isValidPannelChoice">
                <div class="form">
                    <div class="form-wrap">
                        <Input
                            name-input="fitterName"
                            label="Nom de l’installateur *"
                            placeholder="Installateur"
                            @input="handleChange"
                        />
                        <Input
                            name-input="fitterEmail"
                            label="Email de l’installateur *"
                            placeholder="Email de l'installateur"
                            @input="handleChange"
                        />
                    </div>
                    <div class="w-full">
                        <Paragraphe>Inserer le devis (.pdf)*</Paragraphe>
                        <UploadImage
                            @upload="($event) => handlePdf($event, 'fileQuote')"
                            name="fileQuote"
                            :needBase64="false"
                        />
                    </div>
                    <div class="w-full">
                        <Paragraphe>Inserer la facture (.pdf) *</Paragraphe>
                        <UploadImage
                            @upload="
                                ($event) => handlePdf($event, 'fileInvoice')
                            "
                            name="fileInvoice"
                            :needBase64="false"
                        />
                    </div>
                    <div class="w-full">
                        <Paragraphe
                            >Inserer le schema de l'installation (.pdf)
                            *</Paragraphe
                        >
                        <UploadImage
                            @upload="
                                ($event) =>
                                    handlePdf($event, 'fileInstallationSchema')
                            "
                            name="fileInstallationSchema"
                            :needBase64="false"
                        />
                    </div>
                    <Button @click="handleSubmit"
                        ><LoadingButton
                            v-if="isLoadingSubmit"
                            size="xs"
                        />Envoyer
                    </Button>
                </div>
            </template>
            <div class="form" v-else>
                <div class="form-wrap">
                    <Select
                        label="Type de batterie *"
                        name="batteryType"
                        placeholder="Selectionner"
                        @change-select="handleChange"
                        :options="optionsBattery"
                    />
                    <Input
                        name-input="batteryPrice"
                        label="Prix de la batterie € *"
                        placeholder="0.00 €"
                        @input="handleChange"
                        :disabled="true"
                        :value="params.batteryPrice"
                    />
                </div>
                <div class="form-wrap">
                        <Select
                            label="Type du panneau *"
                            name="panelType"
                            placeholder="Selectionner"
                            @change-select="handleChange"
                            :options="optionspanel"
                        />
                        <Input
                            name-input="price"
                            label="Prix du panneau et installation € *"
                            placeholder="0.00 €"
                            :disabled="true"
                            @input="handleChange"
                            :value="params.price"
                        />
                    </div>
                <div v-if="params.batteryPrice && params.price" class="form__operation">
                    <Button @click="isValidPannelChoice = true">Suivant</Button>
                </div>
            </div>
        </div>
        <!-- If Fitter - List -->
        <div class="electric-container__items" v-else>
            <Title
                type="h2"
                weight="600"
                label="Mon installeur"
                class="head-title"
            />
            <table>
                <thead>
                    <th v-for="(item, index) in title" :key="index">
                        {{ item }}
                    </th>
                    <th>Devis</th>
                    <th>Facture</th>
                    <th>Schema de l'installation</th>
                </thead>
                <tbody>
                    <!-- <tr v-for="(item, index) in dataFitter" :key="index"> -->
                    <tr>
                        <td>{{ dataFitter.fitterName }}</td>
                        <td>{{ dataFitter.fitterEmail }}</td>
                        <td>{{ dataFitter.panelType }}</td>
                        <td>{{ dataFitter.price }}</td>
                        <td>{{ dataFitter.batteryType }}</td>
                        <td>{{ dataFitter.batteryPrice }}</td>
                        <td
                            v-for="(
                                item, index
                            ) in dataFitter.providerSolarFitterFiles"
                            :key="index"
                        >
                            <a
                                class="text-primary"
                                :href="item.path"
                                target="_blank"
                                >{{ item.path }}</a
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { onBeforeMount, ref } from 'vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import RoundLink from '@/components/Icon/RoundLink.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { useRoute } from 'vue-router';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const routes = useRoute();
    const isLoadingSubmit = ref<boolean>(false);
    const isLoadSubmitInvoice = ref<boolean>(false);
    const isValidPannelChoice = ref<boolean>(false);

    const thePropertyId = routes.params.id;

    const dataFitter = ref<any>();

    const params = ref<any>({
        theProperty: thePropertyId,
    });

    const panelDetails = [
        {
            panel: 'Le panneau solaire thermique',
            price: '4300 ~ 5300',
        },
        {
            panel: 'Le panneau monocristallin',
            price: '8500',
        },
        {
            panel: 'Le panneau polycristallin',
            price: '6500',
        },
        {
            panel: 'Le panneau solaire amorphe',
            price: '4000',
        },
    ];
    const batteryDetails = [
        {
            battery: 'Batterie AGM',
            price: '200 ~ 450',
        },
        {
            battery: 'Batterie plomb ouvert',
            price: '70 ~ 250',
        },
        {
            battery: 'Batterie Lithium-ion',
            price: '600 ~ 1000',
        },
        {
            battery: 'Batterie gel',
            price: '200 ~ 550',
        },
    ];
    const optionspanel = [
        {
            value: 'Le panneau solaire thermique',
            label: 'Le panneau solaire thermique',
        },
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
    ];

    const optionsBattery = [
        {
            value: 'Batterie AGM',
            label: 'Batterie AGM',
        },
        {
            value: 'Batterie plomb ouvert',
            label: 'Batterie plomb ouvert',
        },
        {
            value: 'Batterie Lithium-ion',
            label: 'Batterie Lithium-ion',
        },
        {
            value: 'Batterie gel',
            label: 'Batterie gel',
        },
    ];

    const title = [
        'Nom',
        'Email',
        'Type de panneau',
        'Prix de panneau',
        'Type de batterie',
        'Prix de batterie',
    ];

    onBeforeMount(() => {
        getFitterData();
    });

    const emit = defineEmits<{
        (fn: 'on-enable-next-tab', v: string): void;
    }>();

    function handleChange(value: any) {
        const [k, v] = Object.entries(value)[0] as any;
        params.value = {
            ...params.value,
            ...value,
        };
        handleToolsChoice(k, v);
        console.log(params.value);
    }

    function handleToolsChoice(type: string, choice: string) {
        switch (type) {
            case 'batteryType':
                params.value = {
                    ...params.value,
                    batteryPrice: batteryDetails.filter(
                        (item) => item.battery === choice
                    )[0].price,
                };
                break;
            case 'panelType':
                params.value = {
                    ...params.value,
                    price: panelDetails.filter(
                        (item) => item.panel === choice
                    )[0].price,
                };
                break;
        }
    }

    function handlePdf(pdf: any, name: string) {
        params.value = {
            ...params.value,
            [name]: pdf,
        };
        console.log(params.value);
    }

    async function getFitterData() {
        isLoadSubmitInvoice.value = true;
        try {
            const { data } = await SupplierServices.getFitterList({
                theProperty: thePropertyId,
            });
            dataFitter.value = data;
            /**
             * we specify here next tab to enable after getting data
             */
            emit('on-enable-next-tab', 'adminAspect');
        } catch (error) {
            console.log(error, 'ERROR');
        } finally {
            isLoadSubmitInvoice.value = false;
        }
    }

    async function handleSubmit() {
        isLoadingSubmit.value = true;
        const formData = new FormData();
        try {
            Object.keys(params.value).forEach((item) => {
                if (Array.isArray(params.value[item])) {
                    (params.value[item] as any[]).forEach((file, fileIdx) => {
                        formData.append(
                            `providerSolarFitterFiles[${fileIdx}][${item}]`,
                            file.originFileObj
                        );
                    });
                } else {
                    formData.append(item, params.value[item]);
                }
            });
            const { data } = await SupplierServices.postFitter(formData);
            // dataFitter.value = data.data;
            if (data.code === 200) {
                notification.success({
                    message: 'Vos données ont été enregistrer',
                });
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
            getFitterData();
            isLoadingSubmit.value = false;
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
    }
    .head-title {
        @apply text-[16px] text-grayIcon w-full;
    }
    .form {
        @apply flex flex-col gap-[18px] w-full items-end;
        &__operation {
            @apply flex gap-[10px] flex-wrap;
        }
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
    table {
        @apply overflow-x-auto;
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
