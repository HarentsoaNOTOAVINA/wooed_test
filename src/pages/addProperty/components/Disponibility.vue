<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="dispo__container">
            <div
                class="place-content-14px"
                v-for="(item, index) in data"
                :key="index"
            >
                <template v-if="item.type === 'select'">
                    <Select
                        :name="item.name"
                        :label="item.label"
                        :placeholder="item.placeholder"
                        :options="item.options"
                        :default-value="params[item.name]"
                        @change-select="handleChange"
                    />
                    <!-- :default-value="propertyDatas[item.name]" -->
                </template>
                <template v-if="item.subItem">
                    <template
                        class=""
                        v-for="(sub, subIndex) in item.subItem"
                        :key="subIndex"
                    >
                        <div
                            class="relative"
                            v-if="
                                params.disponibility ===
                                disponibilityValue.apartir
                            "
                        >
                            <InputDate
                                v-if="sub.name === 'disponibilityTime'"
                                :name="sub.name"
                                :required="sub.required"
                                :label="sub.label"
                                :value="
                                    params[sub.name]
                                        ? moment(params[sub.name]).format(
                                              'DD-MM-YYYY'
                                          )
                                        : ''
                                "
                                @handle-date-eng="handleChange"
                            />
                            <small
                                class="text-[#fa8072] absolute right-0"
                                v-if="
                                    sub.name === 'disponibilityTime' &&
                                    error.disponibilityTime === ''
                                "
                                >Ce champ est obligatoire</small
                            >
                        </div>
                        <template
                            v-if="
                                params.disponibility ===
                                    disponibilityValue.bailEnCours &&
                                sub.name !== 'disponibilityTime'
                            "
                        >
                            <InputDate
                                v-if="sub.type === 'date'"
                                :name="sub.name"
                                :label="sub.label"
                                :value="
                                    params[sub.name]
                                        ? moment(params[sub.name]).format(
                                              'DD-MM-YYYY'
                                          )
                                        : ''
                                "
                                @handle-date-eng="handleChange"
                            />
                            <Switch
                                v-else-if="sub.type === 'switch'"
                                :name="sub.name"
                                :item-label="sub.label"
                                :value="params[sub.name]"
                                @handle-switch="handleChange"
                            />
                            <Input
                                v-else-if="sub.type === 'number' && sub.type === 'text'"
                                :name-input="sub.name"
                                :label="sub.label"
                                :input-type="sub.type"
                                :placeholder="sub.placeholder"
                                :unity="sub.unity"
                                :vmodel="params[sub.name]"
                                @input="handleChange"
                            />
                            <template v-if="sub.subItem">
                                <template
                                    v-for="(subOp, indexSub) in sub.subItem"
                                    :key="indexSub"
                                >
                                    <Input
                                        v-if="params.locationWarranty"
                                        :name-input="subOp.name"
                                        :label="subOp.label"
                                        :input-type="subOp.type"
                                        :placeholder="subOp.placeholder"
                                        :unity="subOp.unity"
                                        @input="handleChange"
                                    />
                                </template>
                            </template>
                            <div class="" v-if="sub.type === 'file'">
                                <label class="custom-label">{{
                                    sub.label
                                }}</label>
                                <UploadImage
                                    :name="sub.name"
                                    @upload-single-with-name="handleChange"
                                    :max-count="1"
                                    :default-file-list="defaultFile[sub.name]"
                                />
                            </div>
                        </template>
                    </template>
                </template>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import AddContainer from './AddContainer.vue';
    import { onMounted, ref, watch } from 'vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { Store, useStore } from 'vuex';
    import { valueParams } from '../utils/default-value';
    import { requiredControl } from '@/utils/validation/form_validation';

    import moment from 'moment';

    enum disponibilityValue {
        apartir = 'Le bien est actuellement occupé mais il sera rendu libre le',
        immediat = 'Le bien est à présent disponible',
        bailEnCours = 'Le bien est actuellement loué',
        // signatureActe = "A la signature de l'acte",
        // definir = 'A définir',
        // receptionProvisoire = 'Lors de la réception provisoire du bien',
        // amountRentalGarantee = 'Garantie locative',
    }

    const store: Store<any> = useStore();

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });
    const error = ref<any>({});
    const data = ref<any>(props.data);
    const params = ref<any>({});
    const defaultFile = valueParams(props.data); // Obtenez la valeur du getter

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        let data = store.getters['AddProductModule/getAddPropertyDatas'];
        if (data) {
            params.value = data;
        }
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(props.data);
        },
        { immediate: true }
    );
    watch(
        () => error.value,
        (e) => {
            error.value = e;
        },
        { immediate: true }
    );

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        if (params.value['disponibilityTime'] === '') {
            error.value = {
                disponibilityTime: '',
            };
        } else {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...params.value },
            });
            emit('onClickNext');
        }
    }

    function handleChange(value: object) {
        if (
            Object.values(value).every(
                (v: any) => v === disponibilityValue.apartir
            )
        ) {
            console.log(value, 'ity value anatiny');
            params.value = {
                ...params.value,
                disponibilityTime: '',
                ...value,
            };
        } else {
            error.value = {};
            console.log(value, 'ity value tsy anatiny');
            let { disponibilityTime, ...rest } = params.value;
            params.value = {
                ...rest,
                ...value,
            };
        }
        console.log(params.value, 'ity params');
    }
</script>

<style scoped>
    .custom-label {
        @apply font-[600] text-grayIcon my-[15px] block;
    }
</style>
