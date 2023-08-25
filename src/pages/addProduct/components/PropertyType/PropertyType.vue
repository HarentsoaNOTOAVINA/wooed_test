<script lang="ts" setup>
    import { ref, computed, onMounted, watch, toRaw } from 'vue';
    import {
        data,
        dataLocation,
        dataGround,
        footer,
        dataCurrentLease,
    } from '@/pages/addProduct/components/PropertyType/data';
    import SelectInput from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { Store, useStore } from 'vuex';
    import Input from '@/components/Common/Input/Input.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import moment from 'moment';

    const store: Store<any> = useStore();
    let operationType = computed(
        () => store.getters['ProductsListModule/getOperationType']
    );
    const locativeGaranties = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const showColiving = ref<boolean>(false);
    const showMinutes = ref<boolean>(false);
    const element = ref<Array<any>>();
    const emit = defineEmits(['onNext', 'onNext']);
    const propertyParams = ref<any>(
        operationType.value === 'sale'
            ? {
                  transactionType: '',
                  title: '',
                  propertyType: 0,
                  disponibility: '',
                  disponibilityTime: '',
                  expirationDate: '',
                  leaseCopy: null,
                  rentPrices: 0,
                  rentalGuaranteeRequired: false,
                  garanteeRentPrices: 0,
                  effectiveDate: '',
                  locationDuration: 0,
                  currentLease: '',
                  collaborativeAcquisition: false,
              }
            : {
                  title: '',
                  propertyType: 0,
                  disponibility: '',
                  disponibilityTime: '',
                  locationType: '',
                  expirationDate: '',
                  leaseCopy: null,
                  collaborativeAcquisition: false,
              }
    );

    const requiredParams = ref<any>(
        operationType.value === 'sale'
            ? {
                transactionType: '',
              }
            : {
                transactionType: '',
              }
    );

    const requiredGround = ref<any>({
        disponibility: '.',
    });

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    onMounted(async () => {
        await store.dispatch('AddProductModule/getProperyType');
        getOpertionType();
    });

    const activeDate = ref<boolean>(false);

    const options = computed(
        () => store.getters['AddProductModule/getPropertyType']
    );
    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionTypes']
    );

    watch(
        () => propertyParams.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
                step: { type: validation() },
            });

            for (let i in value) {
                if (i === 'propertyType') {
                    if (value[i] === 2) {
                        element.value = dataGround;
                    } else {
                        if (operationType.value === 'sale') {
                            element.value = data;
                        } else {
                            element.value = dataLocation;
                        }
                    }
                }
                if (i === 'locationType') {
                    if (
                        value[i]
                            ?.toLowerCase()
                            ?.split(' ')
                            ?.includes('hebergement')
                    ) {
                        showColiving.value = true;
                        showMinutes.value = false;
                    } else if (
                        value[i].toLowerCase().split(' ').includes('minute')
                    ) {
                        showColiving.value = false;
                        showMinutes.value = true;
                    } else {
                        showColiving.value = false;
                        showMinutes.value = false;
                    }
                }
            }
        },
        { immediate: true, deep: true }
    );

    watch(
        () => store.getters['ProductsListModule/getOperationType'],
        (value) => {
            switch (value) {
                case 'lease':
                    element.value = dataLocation;
                    break;
                case 'sale':
                    if (getTypeProperty(propertyParams.value.propertyType)) {
                        element.value = dataGround;
                    } else {
                        element.value = data;
                    }
                    break;
                default:
                    break;
            }
        },
        { immediate: true, deep: true }
    );

    function getTypeProperty(id: any) {
        const allType: Array<any> =
            store.getters['AddProductModule/getPropertyType'];
        const type = allType.find((item) => item.id === id);
        if (type && type.name === 'Terrain') {
            return true;
        } else {
            return false;
        }
    }

    function handleChange(value: any) {
        for (let i in value) {
            if (i === 'switchAnnonce') {
                activeDate.value = value[i];
            } else if (i === 'rentalGuaranteeRequired') {
                locativeGaranties.value = value[i];
                propertyParams.value[i] = value[i];
            } else {
                propertyParams.value[i] = value[i];
                requiredParams.value[i] = value[i];
                requiredGround.value[i] = value[i];
            }
        }
    }

    function validation() {
        if (getTypeProperty(propertyParams.value?.propertyType)) {
            return Object.values(requiredGround.value).every(
                (v) => v !== '' && v !== 0
            );
        }
        return Object.values(requiredParams.value).every(
            (v) => v !== '' && v !== 0
        );
    }

    function handleUpload(value: any) {
        propertyParams.value.leaseCopy = value;
    }

    function handleChangeTime(value: any) {}

    function getOpertionType() {
        const opType = computed(
            () => store.getters['ProductsListModule/getOperationType']
        );
        if (opType.value === 'sale') {
            element.value = data;
        } else {
            element.value = dataLocation;
        }
    }

    const originalDate =
        'Wed Jan 14 2015 00:00:00 GMT+0300 (heure normale d’Afrique de l’Est)';

    // Utiliser Moment.js pour parser la date d'origine
    const parsedDate = moment(originalDate);

    // Formater la date dans le format souhaité
    const formattedDate = parsedDate.format('DD-MM-YYYY');

    console.log(formattedDate); // Résultat : "14-01-2015"
</script>

<template>
    <div class="info__container">
        <div class="info__body">
            <Loader v-if="!options" />

            <div class="info__input-container" v-else>
                <div
                    class="info__input-item"
                    v-for="item in element"
                    :class="[item.subOptions ? 'info__have-subsection' : '']"
                    :key="item.id"
                >
                    <div
                        class="info__input"
                        v-if="item.name !== 'availableTime'"
                    >
                        <TextArea
                            :name-input="item.name"
                            :label="item.label"
                            @handle-change="handleChange"
                            v-if="item.type === 'textArea'"
                            :defaultValue="propertyDatas[item.name]"
                        />
                        <!-- :defaultValue="item.name" -->
                        <Input
                            class="w-[100%]"
                            v-if="item.type === 'text'"
                            :label="item.label"
                            :name-input="item.name"
                            :required="item.required"
                            @input="handleChange"
                            :input-type="item.type"
                            :default-value="propertyDatas[item.name]"
                        />
                        <SelectInput
                            v-if="item.name === 'transactionType'"
                            :name="item.name"
                            :label="item.label"
                            required
                            @change-select="handleChange"
                            :options="transactionType"
                            :placeholder="item.placeholder"
                            :default-value="propertyDatas[item.name]"
                        />

                        <SelectInput
                            v-else-if="
                                item.type === 'select' &&
                                operationType === 'sale'
                            "
                            :label="item.label"
                            :name="item.name"
                            :options="item.id === 2 ? options : item.options"
                            :placeholder="item.placeholder"
                            required
                            @change-select="handleChange"
                            :default-value="
                                options[
                                    options.length - propertyDatas[item.name]
                                ]
                            "
                        />
                        <SelectInput
                            v-else-if="
                                item.type === 'select' &&
                                operationType === 'lease' &&
                                item.name === 'propertyType'
                            "
                            :label="item.label"
                            :name="item.name"
                            :options="item.id === 1 ? options : item.options"
                            :placeholder="item.placeholder"
                            required
                            @change-select="handleChange"
                            :default-value="
                                options[
                                    options.length - propertyDatas[item.name]
                                ]
                            "
                        />
                        <SelectInput
                            v-if="
                                operationType === 'lease' &&
                                item.name === 'locationType'
                            "
                            :label="item.label"
                            :name="item.name"
                            :options="item.options"
                            :required="item.required"
                            @change-select="handleChange"
                            :default-value="
                                item.name === 'locationType'
                                    ? propertyDatas[item.name]
                                    : options[
                                          options.length -
                                              propertyDatas[item.name]
                                      ]
                            "
                        />
                        <SelectInput
                            v-if="
                                item.name === 'disponibility' &&
                                operationType === 'lease' &&
                                !showMinutes
                            "
                            :label="item.label"
                            :name="item.name"
                            :options="item.options"
                            :required="item.required"
                            @change-select="handleChange"
                            :default-value="
                                options[
                                    options.length - propertyDatas[item.name]
                                ]
                            "
                        />
                        <Switch
                            :item-label="item.label"
                            v-else-if="
                                item.name === 'coliving' &&
                                item.type === 'switch' &&
                                showColiving
                            "
                            @handle-switch="handleChange"
                            :name="item.name"
                            :value="propertyDatas[item.name]"
                        />
                        <Switch
                            :item-label="item.label"
                            v-else-if="
                                item.name !== 'coliving' &&
                                item.type === 'switch' &&
                                propertyParams.transactionType !==
                                    'Vente public volontaire'
                            "
                            @handle-switch="handleChange"
                            :name="item.name"
                            :value="propertyDatas[item.name]"
                        />
                        <div
                            class="info__upload-container"
                            v-if="item.type === 'file'"
                        >
                            <label class="info__title">{{ item.label }}</label>
                            <UploadImage
                                :need-base64="false"
                                @upload-single="handleUpload"
                            />
                        </div>
                        <Input
                            class="w-[100%]"
                            v-if="
                                item.type === 'number' &&
                                item.name !== 'amountRentalGuarantee'
                            "
                            :label="item.label"
                            :name-input="item.name"
                            :required="item.required"
                            input-type="number"
                            @input="handleChange"
                            :default-value="propertyDatas[item.name]"
                        />
                        <Input
                            class="w-[100%]"
                            v-if="
                                item.type === 'number' &&
                                item.name === 'amountRentalGuarantee' &&
                                propertyParams.currentLease ===
                                    'Garantie locative'
                            "
                            :label="item.label"
                            :name-input="item.name"
                            :required="item.required"
                            input-type="number"
                            @input="handleChange"
                            :default-value="propertyDatas[item.name]"
                        />
                    </div>
                    <div
                        class="info__time"
                        v-if="item.name === 'availableTime' && showMinutes"
                    >
                        <div
                            class=""
                            v-for="(hours, idHours) in item.subOptions"
                            :key="idHours"
                        >
                            <TimePicker
                                :name="hours.name"
                                :label="hours.label"
                                @change="handleChangeTime"
                            />
                        </div>
                    </div>

                    <div
                        class="info__sub-cont"
                        v-if="
                            item.subOptions &&
                            propertyParams.disponibility !==
                                'Lieu est actuellement loué'
                        "
                    >
                        <div
                            class="info__sub"
                            v-for="(sub, key) in item.subOptions"
                            :key="key"
                        >
                            <div
                                class="w-[100%]"
                                v-if="item.name === 'disponibility'"
                            >
                                <InputDate
                                    v-if="
                                        sub.type === 'date' &&
                                        (propertyParams.disponibility ===
                                            'Apartir de' ||
                                            propertyParams.disponibility ===
                                                'A partir de')
                                    "
                                    :label="sub.label"
                                    :name="sub.name"
                                    @handle-date="handleChange"
                                    :value="propertyDatas[sub.name] ? moment(propertyDatas[sub.name]).format('DD-MM-YYYY') : ''"
                                />
                                <SelectInput
                                    v-else-if="
                                        sub.type === 'select' &&
                                        propertyParams.disponibility ===
                                            'Au terme du bail en cours'
                                    "
                                    :options="sub.options"
                                    :name="sub.name"
                                    @change-select="handleChange"
                                    :label="sub.label"
                                    :default-value="propertyDatas[sub.name]"
                                />
                            </div>
                            <div
                                class="w-[100%]"
                                v-if="item.name === 'switchAnnonce'"
                            >
                                <InputDate
                                    v-if="activeDate"
                                    :label="sub.label"
                                    :name="sub.name"
                                    @handle-date="handleChange"
                                    :value="propertyDatas[sub.name] ? moment(propertyDatas[sub.name]).format('DD-MM-YYYY') : ''"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        class="info__condition"
                        v-if="
                            propertyParams.disponibility ===
                            'Lieu est actuellement loué'
                        "
                    >
                        <div
                            class=""
                            v-for="(cond, keyCond) in item.condition"
                            :key="keyCond"
                        >
                            <div
                                class="info__input-container"
                                v-if="
                                    propertyParams.disponibility ===
                                    'Lieu est actuellement loué'
                                "
                            >
                                <Input
                                    v-if="
                                        cond.name !== 'garanteeRentPrices' &&
                                        (cond.type === 'text' ||
                                            cond.type === 'number')
                                    "
                                    class="w-[100%]"
                                    :label="cond.label"
                                    :name-input="cond.name"
                                    :required="cond.required"
                                    @input="handleChange"
                                    :input-type="cond.type"
                                    :default-value="propertyDatas[cond.name]"
                                />
                                <Input
                                    v-if="
                                        locativeGaranties &&
                                        cond.name === 'garanteeRentPrices' &&
                                        cond.type === 'number'
                                    "
                                    class="w-[100%]"
                                    :label="cond.label"
                                    :name-input="cond.name"
                                    :required="cond.required"
                                    @input="handleChange"
                                    :input-type="cond.type"
                                    :default-value="propertyDatas[cond.name]"
                                />
                                <Switch
                                    v-if="cond.type === 'switch'"
                                    :item-label="cond.label"
                                    :name="cond.name"
                                    @handle-switch="handleChange"
                                    :value="propertyDatas[cond.name]"
                                />
                                <InputDate
                                    v-if="cond.type === 'date'"
                                    :label="cond.label"
                                    :name="cond.name"
                                    @handle-date="handleChange"
                                    :value="propertyDatas[cond.name] ? moment(propertyDatas[cond.name]).format('DD-MM-YYYY') : ''"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .info {
        &__title {
            font-weight: 600;
            color: var(--color-gray-icon);
        }
        &__divider {
            @apply my-[18px];
        }
        &__footer {
            @apply flex justify-between h-[67px] md:h-[47px] flex-col md:flex-row mt-[20px];
        }
        &__my-btn {
            @apply h-[33px] rounded-[100px] w-[100%] md:w-[110px];
        }
        &__container {
            height: 100%;
            overflow-y: auto;
            @apply flex flex-col justify-between;
        }
        &__select-label {
            font-weight: 600;
        }
        &__input-container {
            @apply flex flex-col gap-[10px];
        }
        &__input-item {
            @apply flex flex-col gap-[10px];
        }
        &__have-subsection {
            @apply flex flex-wrap;
            flex-direction: unset;
        }
        &__input {
            @apply flex md:flex-1 w-[100%];

            &:deep() {
                .textarea {
                    @apply w-full;
                }
            }
        }
        &__sub {
            @apply flex md:flex-1 w-[100%];
        }
        &__file {
            @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
        }
        &__upload-container {
            @apply flex flex-col gap-[14px];
        }
        &__condition {
            @apply gap-[15px] flex-1 flex flex-col w-[100%];
        }
        &__input-container {
            @apply gap-[10px];
        }
        &__sub-cont {
            @apply flex-1 w-[100%];
        }
        &__time {
            @apply w-[100%] flex justify-between;
        }
    }
    .custom-input__fields {
        &:deep() {
            @apply mb-0;
        }
    }
    .custom-select__wrapper {
        @apply w-[100%];
    }
</style>
