<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="sewer__container">
            <div v-for="(item, index) in data" :key="index">
                <template v-if="item.type === 'switch'" class="sewer__item">
                    <Switch
                        :name="item.name"
                        :item-label="item.label"
                        :value="params[item.name]"
                        @handle-switch="handleChange"
                    />
                </template>
                <div class="sewer__not-item" v-if="!params.connectToSewer">
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
                    <template v-if="item.type === 'date'">
                        <InputDate
                            :name="item.name"
                            :label="item.label"
                            :value="
                                params[item.name]
                                    ? moment(params[item.name]).format(
                                          'DD-MM-YYYY'
                                      )
                                    : ''
                            "
                            max
                            @handle-date-eng="handleChange"
                        />
                    </template>
                    <template v-if="item.type === 'file'">
                        <P class="sewer__file-label">{{ item.label }}</P>
                        <Upload
                            :name="item.name"
                            @uploadUpdate="
                                handleChange($event, item.label, item.name)
                            "
                            :max-count="1"
                            :default-file-list="documentLists(item.label)"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import Select from '@/components/Common/Select/Select.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Upload from '@/components/Display/UploadImage/UploadImage.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import moment from 'moment';
    import {
        valueParams,
        formatDocument,
        documentLists,
    } from '../utils/default-value';

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

    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);
    const params = ref<any>({
        connectToSewer: false,
    });
    const paramsDoc = ref<any>({});

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

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
                    // documents: [...params.value.documents, ...paramsDoc.value],
                    documents: [...paramsDoc.value],
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

    function handleChange(value: any, label?: string, name?: string) {
        params.value = {
            ...params.value,
            ...value,
        };

        paramsDoc.value = formatDocument(params.value, label, name);
        console.log('check file change >>>>', paramsDoc.value);
    }
</script>

<style lang="scss" scoped>
    .sewer {
        &__file-label {
            @apply font-semibold my-[10px];
        }

        &__not-item {
            @apply flex flex-col gap-[20px] mt-[20px];
        }
    }
</style>
