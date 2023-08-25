<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="living__container">
            <div class="living__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="living__form-item"
                >
                    <div v-if="item.name === 'cadastralArea'" class="wrap-area">
                        <Paragraphe v-if="cadastralArea" class="display-area">
                            <span class="living__label"
                                >{{ item.label.split('(')[0] }} :
                            </span>
                            <strong class="living__value"
                                >{{
                                    separatorHandleFloat(
                                        Math.ceil(cadastralArea)
                                    )
                                }}
                                m²
                            </strong>
                        </Paragraphe>
                        <Input
                            v-else
                            :name-input="item.name"
                            :label="item.label"
                            :input-type="item.type"
                            :required="item.required"
                            :type="item.type"
                            :min="item.min"
                            :default-value="params[item.name]"
                            unity="m²"
                            placeholder="0"
                            :has-error="{
                                status: error[`${item.name}`] === '' || params[item.name] === '0',
                                errorMsg: 'Ce champ est obligatoire',
                            }"
                            :vmodel="params[item.name]"
                            @input="handleChange"
                            class="field-area"
                        />
                        <a
                            :href="`appgl://mobile?token=${token}&action=mesure`"
                            class="measure-mobile"
                            target="_blank"
                        >
                            <Icon iconName="Measure" />
                        </a>
                    </div>
                    <template v-else-if="item.name === 'livingArea'">
                        <Input
                            :name-input="item.name"
                            :label="item.label"
                            :input-type="item.type"
                            :required="item.required"
                            :type="item.type"
                            :max="item.max"
                            :min="item.min"
                            unity="m²"
                            placeholder="0"
                            @input="handleChange"
                            :has-error="{
                                status: error[`${item.name}`] === '' || params[item.name] === '0',
                                errorMsg: 'Ce champ est obligatoire',
                            }"
                            :vmodel="params[item.name]"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Input from '@/components/Common/Input/Input.vue';
    import { ref, computed, onMounted, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { separatorHandleFloat } from '@/utils/separator-number/SeparatorMiller';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { valueParams } from '../utils/default-value';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const error = ref<any>({});
    const store = useStore();

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

    const data = ref<any>(props.data);
    const params = ref<any>({});
    const token = ref<string>()

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const cadastralArea = computed(
        () =>
            +store.getters['AddProductModule/getAddPropertyData'][
                'cadastralArea'
            ]
    );

    onMounted(async () => {
        params.value = valueParams(data.value);
        tokenString()
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(data.value);
        },
        { immediate: true }
    );

    function tokenString() {
        const oldToken: any = localStorage.getItem('token')
        const res = oldToken.replace(/^Bearer\s+/, '')
        
        token.value = res
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        const newParamsError: any = requiredControl(data.value, params.value);
        console.log('surface cadastrall >>>>>', cadastralArea.value);

        if (cadastralArea.value) {
            const { cadastralArea, ...newParams } = newParamsError;
            console.log(newParams, "newParams");
            
            error.value = newParams;
        } else {
            error.value = newParamsError;
        }

        if (Object.values(error.value).every((v: any) => v !== '' && v!== '0')) {
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
        params.value = {
            ...params.value,
            ...value,
        };
    }
</script>

<style lang="scss" scoped>
    .wrap-area {
        position: relative;
    }

    .measure-mobile {
        position: absolute;
        right: 0;
        bottom: 5px;

        @screen md {
            @apply hidden;
        }
    }

    .field-area {
        @apply w-[calc(100%-36px)];

        @screen md {
            @apply w-full;
        }
    }

    .display-area {
        height: 40px;
        display: flex;
        align-items: center;
    }
</style>
