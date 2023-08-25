<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="electric__container">
            <div class="electric__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="electric__form-item"
                >
                    <template v-if="item.type === 'select'">
                        <Select
                            :name="item.name"
                            :label="item.label"
                            :required="item.required ? item.required : false"
                            :options="item.options"
                            :placeholder="
                                item.placeholder
                                    ? item.placeholder
                                    : 'Sélectionnez'
                            "
                            :default-value="params[item.name]"
                            @change-select="handleChange"
                        />
                    </template>
                    <template v-if="item.type === 'switch'">
                        <div class="switch">
                            <Switch
                                :item-label="item.label"
                                :name="item.name"
                                :value="params[item.name]"
                                @handle-switch="handleChange"
                            />
                        </div>
                        <template v-if="item.subItem">
                            <div v-for="(sub, key) in item.subItem" :key="key">
                                <div v-if="params.installationPropre">
                                    <InputDate
                                        v-if="sub.type === 'date'"
                                        :label="sub.label"
                                        :name="sub.name"
                                        :value="
                                            params[sub.name]
                                                ? moment(
                                                      params[sub.name]
                                                  ).format('DD-MM-YYYY')
                                                : ''
                                        "
                                        @handle-date-eng="handleChange"
                                    />
                                    <div v-if="sub.type === 'file'">
                                        <label class="custom-label">
                                            {{ sub.label }}
                                        </label>
                                        <UploadImage
                                            :name="sub.name"
                                            @upload-single-with-name="
                                                handleChange($event, sub.label)
                                            "
                                        />
                                    </div>
                                </div>
                                <div v-if="params.planedCertification">
                                    <div
                                        v-if="
                                            item.name === 'planedCertification'
                                        "
                                    >
                                        <Paragraphe class="electric__info">
                                            <Icon icon-name="InfoIcon" />
                                            <span>{{ sub.subtitle }}</span>
                                        </Paragraphe>
                                        <Button type-button="secondary"
                                            >Aller vers travaux</Button
                                        >
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import { onMounted, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Store, useStore } from 'vuex';
    import { valueParams, formatDocument } from '../utils/default-value';
    import moment from 'moment';

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

    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);
    const params = ref<any>({});
    const paramsDoc = ref<any>({});

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(async () => {
        params.value = valueParams(data.value);
        console.log('electric params >>>', params.value);
    });

    onMounted(async () => {
        console.log('mounted store electric >>>', store.getters['AddProductModule/getAddPropertyDatas']);
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        () => {
            params.value = valueParams(data.value);
        },
        { immediate: true }
    );

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        if (paramsDoc.value && paramsDoc.value.length) {
            store.dispatch('AddProductModule/setPropertyData', {
                data: {
                    ...params.value.content,
                    documents: [...params.value.documents, ...paramsDoc.value],
                },
            });
        } else {
            store.dispatch('AddProductModule/setPropertyData', {
                data: {
                    ...params.value.content,
                },
            });
        }

        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }

    function handleChange(value: any, label?: string) {
        params.value = {
            ...params.value,
            ...value,
        };

        paramsDoc.value = formatDocument(params.value, label);
        console.log('check file change >>>>', paramsDoc.value);
    }
</script>

<style lang="scss" scoped>
    .custom-label {
        @apply font-[600] text-grayIcon my-[15px] block;
    }
    .switch {
        margin-bottom: 15px;
    }
    .electric {
        &__info {
            @apply flex gap-[10px] mb-[10px] italic text-blue-400 mt-[30px];
        }
    }
</style>
