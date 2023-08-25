<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div v-else class="add">
        <Modal
            width="716"
            class="add__modal"
            title="Ajouter un service approximité"
            :isShowModal="showModalAdd"
            @onBack="modalHandler"
        >
            <template #content>
                <Input
                    label="Titre"
                    inputType="text"
                    name-input="serviceTitle"
                    :model="dataServices.title"
                    @input="handleInput"
                    :vmodel="editData.title"
                />

                <div class="add__category">
                    <Paragraphe>Catégorie</Paragraphe>
                    <a-select
                        show-search
                        placeholder="Selectionner une catégorie"
                        :options="categoyService"
                        @change="handleChange"
                        :value="
                            editData.servicecategory &&
                            editData.servicecategory.name
                        "
                    />

                    <Switch
                        v-if="hasCate"
                        item-label="Voulez-vous ajouter une sous-catégorie?"
                        name="hasSubcategory"
                        @handle-switch="switchValue"
                    />
                    <div v-if="hasSubcategory" class="add__subCate">
                        <a-select
                            show-search
                            placeholder="Selectionner une sous catégorie"
                            :options="itsSubCate"
                            @change="handleChange"
                        />
                    </div>
                </div>
                <div>
                    <Adress @get-adress="getAdress" />
                </div>
                <Input
                    label="Numero de téléphone"
                    placeholder="Téléphone"
                    :required="true"
                    inputType="text"
                    name-input="serviceNum"
                    :vmodel="editData.phone"
                    @input="handleInput"
                />
                <Input
                    label="Adresse email"
                    placeholder="Votre adresse email"
                    :required="true"
                    inputType="text"
                    name-input="serviceEmail"
                    :vmodel="editData.email"
                    @input="handleInput"
                />
                <div class="add__upload">
                    <span>Image</span>
                    <Paragraphe
                        >La taille maximale par image est de 5Mb</Paragraphe
                    >
                    <Paragraphe>Formats acceptés: JPG</Paragraphe>
                    <UploadImage
                        :type-image="true"
                        name="imgFile"
                        :need-base64="false"
                        @upload-single-with-name="handleUpload"
                    />
                    <Input
                        label="Site web. Exemple: https://www.google.com"
                        placeholder="Votre site web"
                        :required="true"
                        inputType="text"
                        name-input="serviceWebSite"
                        @input="handleInput"
                        :vmodel="editData.website"
                    />
                </div>
                <Switch
                    item-label="Vous proposez une promotion?"
                    name="webSiteChoice"
                    @handle-switch="switchValue"
                    :isChecked="hasPromoEditing"
                />

                <transition mode="in-out" name="fade-error">
                    <div v-if="webSiteChoice">
                        <Select
                            name="amountChoice"
                            label="Pourcentage / Devise"
                            :options="optionsAmount"
                            @change-select="handleInput"
                            :value="
                                editData.servicePromos &&
                                editData.servicePromos[0].amountType
                            "
                        />
                        <div v-if="showIt">
                            <Input
                                v-if="amountTypeChoice"
                                label="Pourcentage"
                                inputType="text"
                                name-input="percentage"
                                @input="handleInput"
                                :vmodel="
                                    editData.servicePromos &&
                                    editData.servicePromos[0].amount
                                "
                            />
                            <Input
                                v-else
                                label="Devise"
                                :placeholder="
                                    dataEditing?.servicePromos[0].amount
                                "
                                inputType="text"
                                name-input="price"
                                @input="handleInput"
                                :vmodel="
                                    editData.servicePromos &&
                                    editData.servicePromos[0].amount
                                "
                            />
                        </div>
                        <div class="add__rangeDate">
                            <InputDateRange
                                @handleChange="handleDate"
                                name="dateIntervale"
                                label="Date de début et fin de la promotion"
                            />
                        </div>
                        <Input
                            label="Code promo"
                            inputType="text"
                            name-input="code"
                            @input="handleInput"
                            :vmodel="
                                editData.servicePromos &&
                                editData.servicePromos[0].code
                            "
                        />
                    </div>
                </transition>
                <div class="add__btnSave">
                    <Button @on-click="saveService"
                        ><LoadingButton v-if="loadingButton" size="xs" />
                        Enregistrer</Button
                    >
                </div>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
    import AInput from 'ant-design-vue/lib/input';

    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import InputDateRange from '@/components/Common/InputRangeDate/InputRangeDate.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Adress from '@/pages/addProduct/components/Address/Address.vue';
    import moment from 'moment';
    import store from '@/store';
    import ASelect, {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import { computed, onMounted, ref, watch, onBeforeMount } from 'vue';

    let loading = ref<boolean>(false);
    let categoyService = ref<Array<any>>([]);
    let hasSubcategory = ref<boolean>(false);
    let webSiteChoice = ref<boolean>(false);
    let amountTypeChoice = ref<any>();
    const props = defineProps({
        showModalAdd: {
            type: Boolean,
            default: false,
        },
        loadingButton: {
            type: Boolean,
            false: false,
        },
        dataEditing: {
            type: Object,
            default: null,
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    });
    onMounted(() => {
        getServiceCategory();
    });
    onBeforeMount(() => {
        // checkValueEdit();
    });
    const showLoadingBtn = ref<boolean>();
    let showIt = ref<boolean>(false);
    let isEdit = ref<boolean>(false);

    watch(
        () => props.isEditing,
        (val) => {
            isEdit.value = val;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.loadingButton,
        (first) => {
            showLoadingBtn.value = first;
        },
        { immediate: true, deep: true }
    );

    let editData = ref<any>();
    watch(
        () => props.dataEditing,
        (first) => {
            console.log('data editing:', props.dataEditing);

            editData.value = first;
        },
        { immediate: true, deep: true }
    );
    let allCate = ref<any>('');
    let itsSubCate = ref<Array<any>>([]);
    let hasCate = ref<boolean>(false);
    const dataServices = ref<any>({
        servicecategory: null,
        imgfile: [],
        address: '',
        title: '',
        phone: '',
        website: '',
        email: '',
        servicePromos: [
            {
                dateStart: '',
                dateEnd: '',
                code: '',
                amount: 0,
                amountType: '',
                minAmount: 0.0,
            },
        ],
    });

    let optionsAmount = ref([
        {
            label: 'Pourcentage',
            value: 'Pourcentage',
        },
        {
            label: 'Devise',
            value: 'Devise',
        },
    ]);

    const emit = defineEmits<{
        (e: 'modalHandler'): void;
        (e: 'addService', params: Array<Object>): void;
    }>();
    let dateEditing = ref<any>();
    let hasPromoEditing = computed(() => {
        if (
            editData.value.servicePromos &&
            editData.value.servicePromos.length !== 0
        ) {
            console.log('tafiditra ve');
            webSiteChoice.value = true;
            showIt.value = true;
            amountTypeChoice.value = true;
            return true;
        }
        console.log('tsy tafiditra zay');
    });
    // const checkValueEdit = () => {
    //     if (
    //         props.dataEditing &&
    //         props.dataEditing?.servicePromos.length !== 0
    //     ) {
    //         webSiteChoice.value = true;
    //         hasPromoEditing.value = true;
    //         showIt.value = true;
    //         amountTypeChoice.value = true;
    //     }
    // };

    watch(
        () => props.dataEditing,
        () => {
            // checkValueEdit();
        },
        { immediate: true, deep: true }
    );

    const handleDate = (value: any) => {
        let dateStart = moment(value[0].$d).format();
        let dateEnd = moment(value[1].$d).format();
        dataServices.value.servicePromos[0].dateStart = dateStart;
        dataServices.value.servicePromos[0].dateEnd = dateEnd;
        if (isEdit.value) {
            editData.value.servicePromos[0].dateStart = dateStart;
            editData.value.servicePromos[0].dateEnd = dateEnd;
        }
        console.log(
            'dateStart dateEnd',
            dataServices.value.servicePromos[0].dateStart,
            dataServices.value.servicePromos[0].dateEnd
        );
    };

    const getAdress = (value: any) => {
        dataServices.value.address = value.formatted_address;
        console.log('address:', dataServices.value.address);
    };

    const getServiceCategory = async () => {
        loading.value = true;
        try {
            await store.dispatch('NearByServicesModule/setServiceCategory');
            const data = computed(
                () => store.getters['NearByServicesModule/getServiceCategory']
            );
            let ct = data.value;
            allCate.value = ct;
            console.log('cate', JSON.stringify(ct));
            ct.forEach((item: any) => {
                categoyService.value.push({
                    value: item.name,
                    label: item.name,
                    key: item.id,
                });
            });
        } catch (error) {
            console.log('error', error);
        } finally {
            loading.value = false;
        }
        console.log('editing data props:', props.dataEditing);
    };

    const handleChange = (value: SelectValue, option: DefaultOptionType) => {
        let subcate = allCate.value.filter((item: any) => item.name === value);
        subcate[0].subcategories.forEach((item: any) => {
            itsSubCate.value.push({
                value: item.name,
                label: item.name,
                key: item.id,
            });
        });

        dataServices.value.servicecategory = option.key;
        hasCate.value = true;
        console.log('subcate selected', itsSubCate.value);
        console.log('category:', option);
        if (isEdit.value) {
            editData.value.servicecategory = option.key;
            console.log(
                'editData.value.servicecategory:',
                editData.value.servicecategory
            );
        }
    };

    const modalHandler = () => {
        // modalAddServicesShow.value = !modalAddServicesShow.value;
        emit('modalHandler');
    };
    const switchValue = (item: any) => {
        if (item.hasSubcategory) {
            hasSubcategory.value = true;
            console.log('subcategory:', hasSubcategory.value);
        } else {
            hasSubcategory.value = false;
            webSiteChoice.value = item.webSiteChoice;
            console.log('switch item:', webSiteChoice.value);
        }
        // console.log(item);
    };

    const handleUpload = (value: any) => {
        dataServices.value = {
            ...dataServices.value,
            ...value,
        };
        console.log('upload file service:', dataServices.value);
    };

    const handleInput = (value: any) => {
        if (value.serviceTitle) {
            console.log('title', value.serviceTitle);
            dataServices.value.title = value.serviceTitle;
        } else if (value.subCategory) {
            console.log(value.subCategory); //service subcate
        } else if (value.serviceNum) {
            dataServices.value.phone = value.serviceNum;
            editData.value.phone = value.serviceNum;
        } else if (value.serviceWebSite) {
            console.log('website value:', value.serviceWebSite);
            dataServices.value.website = value.serviceWebSite;
        } else if (value.serviceEmail) {
            dataServices.value.email = value.serviceEmail;
            console.log('email:', dataServices.value.email);
        } else if (value.dateEnd) {
            let dateEnd = moment(value.dateEnd).format();
            dataServices.value.servicePromos[0].dateEnd = dateEnd;
            console.log('date end:', dateEnd);
        } else if (value.amountChoice) {
            dataServices.value.servicePromos[0].amountType = value.amountChoice;
            showIt.value = true;
            if (
                dataServices.value.servicePromos[0].amountType === 'Pourcentage'
            ) {
                console.log(
                    'amout type:',
                    dataServices.value.servicePromos[0].amountType
                );
                amountTypeChoice.value = true;
            } else {
                console.log(
                    'amout type:',
                    dataServices.value.servicePromos[0].amountType
                );
                amountTypeChoice.value = false;
            }
            console.log(
                'choice:',
                dataServices.value.servicePromos[0].amountType
            );
        } else if (value.percentage) {
            dataServices.value.servicePromos[0].amount = value.percentage;
        } else if (value.price) {
            dataServices.value.servicePromos[0].amount = value.price;
        } else if (value.code) {
            dataServices.value.servicePromos[0].code = value.code;
        }
    };

    const saveService = () => {
        if (!isEdit.value) {
            emit('addService', dataServices.value);
            console.log('add:', dataServices.value);
        } else {
            emit('addService', editData.value);
            console.log('edit tokony iety amzay:', editData.value);
        }
        console.log('isediting:', isEdit.value);
        // console.log('params edit:', editData.value);
    };
</script>

<style lang="scss" scoped>
    .add {
        &__category {
            @apply my-[20px];
        }
        &__subCate {
            @apply mt-[14px];
        }
        &__upload {
            @apply mt-[10px];
        }
        &__rangeDate {
            @apply mt-[10px];
        }
        &__btnSave {
            @apply flex justify-end mt-[16px];
        }
    }

    .fade-error-enter-active {
        transition: all 0.3s ease-in;
    }
    .fade-error-leave-active {
        transition: all 0.2s ease-out;
    }

    .fade-error-enter-from,
    .fade-error-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
