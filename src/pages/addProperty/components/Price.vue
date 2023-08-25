<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="price">
            <AAlert
                message="Prix suggéré"
                type="info"
                :description="suggestedPriceMessage"
                showIcon
            />
            <div v-for="(item, index) in data" :key="index">
                <template v-if="item.type === 'radio'">
                    <RadioGroup
                        :required="item.required"
                        :items="item.options"
                        :label="item.label"
                        @change="handleChange"
                        :name="item.name"
                    />
                    <template v-if="item.subItem">
                        <div
                            v-for="(sub, indexKeys) in item.subItem"
                            :key="indexKeys"
                            class="price__choice"
                        >
                            <template
                                v-if="
                                    params[item.name] === valuePrice.fixed &&
                                    sub.name === 'startPrice'
                                "
                            >
                                <Input
                                    v-if="sub.type === 'number'"
                                    :label="sub.label"
                                    :required="sub.required"
                                    :name-input="sub.name"
                                    :input-type="sub.type"
                                    unity="€"
                                    placeholder="0"
                                    :vmodel="params[sub.name]"
                                    :has-error="{
                                        status: error[`${sub.name}`] === '',
                                        errorMsg: 'Ce champ est obligatoire',
                                    }"
                                    @input="handleChange"
                                />
                            </template>
                            <template
                                v-else-if="
                                    params[item.name] === valuePrice.solicit &&
                                    sub.name !== 'startPrice'
                                "
                            >
                                <Input
                                    v-if="sub.type === 'number'"
                                    :label="sub.label"
                                    :required="sub.required"
                                    :name-input="sub.name"
                                    :input-type="sub.type"
                                    unity="€"
                                    placeholder="0"
                                    :vmodel="params[sub.name]"
                                    :has-error="{
                                        status: error[`${sub.name}`] === '',
                                        errorMsg: 'Ce champ est obligatoire',
                                    }"
                                    @input="handleChange"
                                />
                                <InputDate
                                    v-if="sub.type === 'date'"
                                    :name="sub.name"
                                    :required="sub.required"
                                    :label="sub.label"
                                    :placeholder="sub.placeholder"
                                    :value="
                                        params[sub.name]
                                            ? moment(params[sub.name]).format(
                                                  'DD-MM-YYYY'
                                              )
                                            : ''
                                    "
                                    @handle-date-eng="handleChange"
                                />
                            </template>
                        </div>
                    </template>
                </template>
                <template v-if="item.type === 'number'" class="">
                    <Input
                        :label="item.label"
                        :required="item.required"
                        :name-input="item.name"
                        :input-type="item.type"
                        unity="€"
                        placeholder="0"
                        :has-error="{
                            status: error[`${item.name}`] === '',
                            errorMsg: 'Ce champ est obligatoire',
                        }"
                        :vmodel="params[item.name]"
                        @input="handleChange"
                    />
                </template>
                <template v-if="item.type === 'date'" class="">
                    <InputDate
                        v-if="item.name === 'startSaleDate'"
                        :name="item.name"
                        :required="item.required"
                        :label="item.label"
                        :has-error="{
                            status: error[`${item.name}`] === '',
                            errorMsg: 'Ce champ est obligatoire',
                        }"
                        :value="
                            params[item.name]
                                ? moment(params[item.name]).format('DD-MM-YYYY')
                                : ''
                        "
                        @handle-date-eng="handleChange"
                    />
                    <InputDate
                        v-else-if="item.name === 'endSaleDate'"
                        :disable="disableEndDate"
                        :name="item.name"
                        :required="item.required"
                        :label="item.label"
                        :has-error="{
                            status: error[`${item.name}`] === '',
                            errorMsg: 'Ce champ est obligatoire',
                        }"
                        :value="
                            params[item.name]
                                ? moment(params[item.name]).format('DD-MM-YYYY')
                                : ''
                        "
                        @handle-date-eng="handleChange"
                    />
                    <div
                        class="price__info"
                        v-if="item.subtitle"
                        v-for="(i, idx) in item.subtitle"
                        :key="idx"
                    >
                        <Icon icon-name="InfoIcon" />
                        <span>{{ i.text }}</span>
                    </div>
                </template>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { computed, onBeforeMount, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import AAlert from 'ant-design-vue/lib/alert/index';
    import { Store, useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import moment from 'moment';
    import { valueParams } from '../utils/default-value';
    import Select from '@/components/Common/Select/Select.vue';
    import RadioGroup from '@/components/Common/RadioGroup/RadioGroup.vue';
    import { separatorMillier } from '@/utils/separator-number/SeparatorMiller';

    enum valuePrice {
        fixed = 'Fixer votre prix',
        solicit = 'Solliciter des offres dans un certain délai',
    }

    const error = ref<any>({});

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

    const store: Store<any> = useStore();
    const disableEndDate = ref<boolean>(true);
    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);
    const params = ref<any>({
        connectToSewer: false,
    });

    const suggestedPrice = ref<Array<any>>([]);
    const suggestedPriceMessage = ref<string>('');

    onBeforeMount(() => {
        store.dispatch('AddProductModule/getSuggestedPrice');
    });

    watch(
        () => store.getters['AddProductModule/getSuggestedPrices'],
        (val) => {
            suggestedPrice.value = val;
            if (Array.isArray(val) && val.length) {
                // suggestedPriceMessage.value = `Votre bien est estimé à ${val[0].toLocaleString()} €`;
                suggestedPriceMessage.value = `Votre bien est estimé à ${separatorMillier(
                    Number(val[0])
                )} €`;
            } else {
                suggestedPriceMessage.value = `Pas de reférence de prix pour votre bien`;
            }
        }
    );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(props.data);
        },
        { immediate: true }
    );

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        error.value = requiredControl(data.value, params.value);

        if (Object.values(error.value).every((v) => v !== '')) {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...params.value },
            });
            emit('onClickNext');
        }
    }

    function finished() {
        emit('onClickFinished');
    }

    function handleChange(value: any) {
        if (value.selectedValue) {
            const { selectedValue, ...valueWithoutSelected } = value;
            params.value = valueParams(props.data);

            params.value = {
                ...params.value,
                ...valueWithoutSelected,
            };
        } else {
            params.value = {
                ...params.value,
                ...value,
            };
        }

        if (params.value.startSaleDate !== 0) {
            disableEndDate.value = false;
        } else {
            disableEndDate.value = true;
        }
        console.log('params >>>>>', params.value);
    }
</script>

<style lang="scss" scoped>
    .price {
        @apply flex flex-col gap-[18px];
        &:deep() {
            .date__space {
                @apply my-[10px];
            }
            .custom-input__label-icon label,
            .ant-space-item label {
                @apply font-[600];
            }
        }

        &__info {
            @apply flex gap-[10px] text-blue-500 italic;
        }
        &__choice {
            margin-top: 15px;
        }
    }
</style>
