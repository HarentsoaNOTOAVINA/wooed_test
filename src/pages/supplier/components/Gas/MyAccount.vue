<template>
    <div>
        <MainCard
            :button="true"
            :modal="hasCounterMeta"
            modalTitle="Ajout relevé"
            labelButton="Ajouter relevé"
            :dataBreadcrumbs="breadcrumbListsData"
            class="myAccount"
            :modal-state="isOpenModal"
            @on-emit-modal-state="handleModalState"
        >
            <Loader v-if="isLoadInitData" />
            <div v-else class="myAccount__container">
                <Title
                    type="h2"
                    label="Mon compteur"
                    class="myAccount__title"
                />
                <hr class="__hr" />
                <SupplierName />
                <div class="myAccount__info__icon">
                    <button
                        @click="isShowAdditionnalInfo = !isShowAdditionnalInfo"
                    >
                        <Info />
                    </button>
                </div>
                <transition name="fade-slide" mode="out-in" appear>
                    <div v-if="isShowAdditionnalInfo" class="myAccount__info">
                        <Paragraphe class="myAccount__info__title"
                            >Je dispose d’un compteur digital</Paragraphe
                        >
                        <Paragraphe class="myAccount__info__description"
                            >Le relevé des compteurs sera transmis
                            automatiquement à votre fournisseur
                            d’énergie</Paragraphe
                        >
                        <hr class="myAccount__info__sep" />
                        <Paragraphe class="myAccount__info__title"
                            >Je ne dispose pas d’un compteur digital</Paragraphe
                        >
                        <div class="myAccount__info__description">
                            <Paragraphe
                                >1 année sur 2 : Fluvius vient relever le
                                compteur chez vous
                            </Paragraphe>
                            <Paragraphe
                                >1 année sur 2 : Fluvius vous envoie un mail ou
                                une lettre vous requérant de transmettre les
                                relevés de compteur par mail</Paragraphe
                            >
                        </div>
                        <hr class="myAccount__info__sep" />
                        <div class="myAccount__info__btn">
                            <a
                                href="https://mijn-meterstanden.fluvius.be/meterstanden/login"
                                target="_blank"
                            >
                                <Button
                                    >Transmettre relevé de compteurs en
                                    ligne</Button
                                >
                            </a>
                        </div>
                    </div>
                </transition>
                <transition name="fade-slide" mode="out-in">
                    <div class="myAccount__form" v-if="!hasCounterMeta">
                        <Input
                            label="Inscrivez ici votre numéro de compteur"
                            placeholder="0.00"
                            name-input="counterNumber"
                            @input="handleInput"
                        />
                        <Input
                            label="Inscrivez ici le numéro EAN"
                            placeholder="0.00"
                            name-input="eanNumber"
                            @input="handleInput"
                            input-type="number"
                        />
                        <Input
                            v-if="energyType === 'solar'"
                            label="Puissance du compteur"
                            placeholder="0.00"
                            name-input="counterPower"
                            @input="handleInput"
                            input-type="number"
                        />
                        <div class="myAccount__form__submit">
                            <Button
                                :is-load="isLoadCounterMetaDataSubmit"
                                :disabled="!isEnableCounterMetaDataSubmit"
                                @click="submitCounterMetaData"
                                >Enregistrez</Button
                            >
                        </div>
                    </div>
                    <div class="myAccount__counter-meta-data" v-else>
                        <Paragraphe class="myAccount__counter-meta-data__value"
                            ><span>Numéro de compteur</span
                            ><span>{{
                                counterMetaData.counterNumber
                            }}</span></Paragraphe
                        >
                        <Paragraphe class="myAccount__counter-meta-data__value"
                            ><span>Numéro EAN</span
                            ><span>{{
                                counterMetaData.eanNumber
                            }}</span></Paragraphe
                        >
                    </div>
                </transition>

                <Historical
                    v-if="counterMetaData.id"
                    :the-property-counter="(counterMetaData?.id as number)"
                    :current-counter-details="counterDetails"
                />
            </div>
            <template #modalContent>
                <div class="myAccount__form">
                    <Input
                        label="Index"
                        placeholder="index de votre relevé"
                        name-input="indexCounter"
                        @input="handleInputCounterStatement"
                    />
                    <Input
                        label="Consommation courrante"
                        placeholder="m3/kwh"
                        name-input="currentConsumption"
                        @input="handleInputCounterStatement"
                    />
                    <div class="myAccount__form-upload">
                        <label>
                            <span class="font-[600]">
                                Votre relevés en format image : *
                            </span>
                        </label>
                        <Paragraphe fontSize="12px">
                            La taille maximale par image est 5MB <br />
                            Formats acceptés: JPG
                        </Paragraphe>
                        <UploadImage
                            @upload="handleUpload"
                            :type-image="true"
                            name="files"
                            :needBase64="false"
                        />
                    </div>
                    <div class="myAccount__table">
                        <table>
                            <tbody>
                                <tr class="myAccount__table-row">
                                    <td>
                                        <span> Numero Compteur </span>
                                    </td>
                                    <td>
                                        <span>
                                            {{ counterMetaData.counterNumber }}
                                        </span>
                                    </td>
                                </tr>
                                <tr class="myAccount__table-row">
                                    <td>
                                        <span> Numéro EAN </span>
                                    </td>
                                    <td>
                                        <span>
                                            {{ counterMetaData.eanNumber }}
                                        </span>
                                    </td>
                                </tr>
                                <tr class="myAccount__table-row">
                                    <td>
                                        <span> Consommation annuelle </span>
                                    </td>
                                    <td>
                                        <span>
                                            {{
                                                paramsCounterStatement.consumption ||
                                                0
                                            }}
                                            m<sup>3</sup>/kwh
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="myAccount__button">
                        <Button
                            class="myAccount__button-cancel"
                            @click="isOpenModal = false"
                            >Annuler</Button
                        >
                        <Button
                            :is-load="isLoadCounterStatementSubmit"
                            @click="submitCounterStatement"
                            class="myAccount__button-valid"
                            >Valider</Button
                        >
                    </div>
                </div>
            </template>
        </MainCard>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Info from '@/components/Icon/Info.vue';
    import { ref, watch, computed } from 'vue';
    import SupplierName from '../SupplierNameInfo.vue';
    import Historical from './MyAccount/Historical.vue';
    import SupplierServices from '@/services/supplierService';
    import { notification } from 'ant-design-vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';

    const store = useStore();
    const route = useRoute();
    const currentProperty = parseInt(route.params.id.toString());

    const props = defineProps<{
        energyName: string;
    }>();

    const energyType = computed(
        () => store.getters['SupplierModule/getEnergyType']
    );

    interface Params {
        theProperty: number;
        thePropertyProvider?: number;
        counterNumber?: string;
        eanNumber?: string;
        energyType: string;
        counterPower?: string;
    }

    interface ParamsCounterStatement {
        theProperty?: number;
        thePropertyCounter?: number;
        indexCounter?: number;
        consumption?: number;
        currentConsumption?: number;
        files?: any[];
    }

    interface CounterDetails {
        id?: number;
        indexCounter?: number | string;
        consumption?: number;
        today?: string;
        image?: string;
        imageLink?: string;
        currentConsumption?: number;
    }

    interface CounterMetaData {
        counterNumber?: string;
        counterPower?: string;
        eanNumber?: string;
        id?: number;
    }

    const breadcrumbListsData = [
        {
            url: `/fournisseur/${currentProperty}`,
            label: 'Fournisseur',
        },

        {
            label: props.energyName,
        },
    ];
    const counterDetails = ref<CounterDetails>({});
    
    const params = ref<Params>({
        theProperty: currentProperty,
        energyType: energyType.value,
        thePropertyProvider: 1,
        counterPower: '0', // TODO: NEEDED IN ELEC
    });

    const paramsCounterStatement = ref<ParamsCounterStatement>({
        theProperty: currentProperty,
    });
    
    const isOpenModal = ref<boolean>(false);
    const isShowAdditionnalInfo = ref<boolean>(false);
    const isEnableCounterMetaDataSubmit = ref<boolean>(false);
    const isLoadCounterMetaDataSubmit = ref<boolean>(false);
    const isLoadCounterStatementSubmit = ref<boolean>(false);
    const isLoadInitData = ref<boolean>(false);
    const hasCounterMeta = ref<boolean>(false);
    const counterMetaData = ref<CounterMetaData>({});

    watch(
        () => energyType.value,
        () => {
            getInitData();
        },
        { immediate: true }
    );
    watch(
        () => params.value,
        (v) => {
            if (v.counterNumber && v.eanNumber) {
                isEnableCounterMetaDataSubmit.value = true;
            } else {
                isEnableCounterMetaDataSubmit.value = false;
            }
        },
        {
            immediate: true,
            deep: true,
        }
    );

    async function getInitData() {
        try {
            isLoadInitData.value = true;
            const { data, code } = await SupplierServices.getCounterMetaData({
                theProperty: currentProperty,
                energyType: energyType.value,
                thePropertyProvider: 1,
            });
            hasCounterMeta.value = code === 200;
            counterMetaData.value = code === 200 && data;
        } finally {
            isLoadInitData.value = false;
        }
    }
    function handleModalState(v: any) {
        isOpenModal.value = v;
    }
    function handleInput(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        params.value = {
            ...params.value,
            [k]: v,
        };
    }
    function handleInputCounterStatement(obj: any) {
        const [k, v] = Object.entries(obj)[0] as any;
        paramsCounterStatement.value = {
            ...paramsCounterStatement.value,
            ...obj,
        };
        if (k === 'currentConsumption') {
            calculateAnnualConsumption(+v);
        }
    }
    function handleUpload(files: any) {
        console.log(files);
        paramsCounterStatement.value = {
            ...paramsCounterStatement.value,
            files,
        };
    }
    function calculateAnnualConsumption(currentConsumption: number) {
        const monthUntilJanvNumber = new Date().getMonth() + 1;
        const consumption = +(
            (currentConsumption / monthUntilJanvNumber) *
            12
        ).toFixed(2);
        paramsCounterStatement.value = {
            ...paramsCounterStatement.value,
            consumption,
        };
    }
    async function submitCounterMetaData() {
        try {
            isLoadCounterMetaDataSubmit.value = true;
            const { data } = await SupplierServices.postCounterMetaData(
                params.value
            );
            hasCounterMeta.value = data.code === 200 || data.code === 201;
            counterMetaData.value = data.data;
            console.log(hasCounterMeta.value, 'COUNTER');
            data.code === 200
                ? notification.success({
                      message:
                          'Les caracteristiques de votre compteur a bien été enregistré',
                  })
                : notification.error({
                      message: 'Une erreur est survenue, veuillez réessayer',
                  });
        } catch (error) {
            notification.error({
                message: 'Une erreur est survenue, veuillez réessayer',
            });
        } finally {
            isLoadCounterMetaDataSubmit.value = false;
        }
    }

    function getFormData(): any {
        paramsCounterStatement.value = {
            ...paramsCounterStatement.value,
            thePropertyCounter: +(counterMetaData.value.id as any),
        };
        const obj = paramsCounterStatement.value as any;
        let parsedObj: any = {};
        Object.keys(obj).forEach((key) => {
            parsedObj = {
                ...parsedObj,
                [key]: Number.isNaN(+obj[key]) ? obj[key] : +obj[key],
            };
        });
        const formData = new FormData();
        Object.keys(parsedObj).forEach((key) => {
            console.log(typeof parsedObj[key], key);
            if (key === 'files') {
                parsedObj[key].forEach((item: any, idx: number) => {
                    formData.append(`${key}[${idx}]`, item.originFileObj);
                });
            } else {
                formData.append(key, parsedObj[key]);
            }
        });
        return formData;
    }
    async function submitCounterStatement() {
        try {
            isLoadCounterStatementSubmit.value = true;
            const { data } = await SupplierServices.postCounterStatement(
                getFormData()
            );
            console.log(data, 'RESULT');
            if (data.code === 200) {
                /**
                 * close modal
                 */
                isOpenModal.value = false;
                counterDetails.value = data.data;
            } else {
                notification.error({
                    message: 'Une erreur est survenue, veuillez réessayer',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Une erreur est survenue, veuillez réessayer',
            });
        } finally {
            isLoadCounterStatementSubmit.value = false;
        }
    }
</script>

<style lang="scss" scoped>
    .myAccount {
        .fade-slide-enter-active,
        .fade-slide-leave-active {
            @apply transition-all;
        }
        .fade-slide-enter-from,
        .fade-slide-leave-to {
            @apply translate-x-[-300px] opacity-0;
        }
        &__counter-meta-data {
            &__value {
                @apply bg-primary my-[10px] p-[10px] rounded-[8px] flex justify-between text-white;
            }
        }
        &__info {
            @apply bg-gray rounded-[8px] p-[10px];
            &__icon {
                @apply flex justify-center;
            }
            &__title {
                @apply font-semibold;
            }
            &__description {
                @apply pl-[20px];
            }
            &__sep {
                @apply text-white my-[10px];
            }
            &__btn {
                @apply flex justify-end;
                &:deep() {
                    button,
                    div,
                    a {
                        @apply w-full md:w-auto;
                    }
                }
            }
        }
        &__container {
            @apply flex flex-col gap-[18px];
        }
        &__title {
            @apply text-[16px] font-[600] text-grayIcon;
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
                    @apply font-[600] text-black;
                }
            }
            &__submit {
                @apply flex justify-end;
                &:deep() {
                    button,
                    div {
                        @apply w-full md:w-auto;
                    }
                }
            }
        }
        &__form-upload {
            @apply flex flex-col gap-[18px];
            &:deep() {
                .ant-upload-select {
                    @apply w-full;
                }
            }
        }
        &__table {
            @apply bg-gray flex flex-col gap-[18px] p-[18px] rounded-[8px];
            &-row {
                td {
                    @apply font-[600] pb-[8px];
                }
                td:last-child {
                    @apply text-right pb-0;
                }
            }
        }
        &__button {
            @apply flex justify-end gap-[14px];
            &-cancel {
                &:deep() {
                    button {
                        @apply bg-gray text-primary;
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
