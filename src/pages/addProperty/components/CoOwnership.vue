<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="propertyState__container">
            <div class="propertyState__form">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="propertyState__form-item"
                >
                    <template v-if="item.type === 'select'">
                        <Select
                            :name="item.name"
                            :label="item.label"
                            :required="item.required ? item.required : false"
                            :options="syndicList"
                            :disabled="!syndicList.length"
                            :loading="!syndicList.length"
                            :placeholder="
                                item.placeholder
                                    ? item.placeholder
                                    : 'Sélectionnez'
                            "
                            :default-value="
                                syndicList[
                                    syndicList.length - params[item.name]
                                ]
                            "
                            @change-select="handleChange"
                        />
                    </template>
                    <template v-if="item.type === 'file'">
                        <div class="propertyState__content space-gap-14">
                            <label class="propertyState__label">
                                {{ item.label }}
                            </label>
                            <div
                                class="propertyState__item"
                                v-if="params[item.name]"
                            >
                                <a
                                    class="propertyState__item-file"
                                    :href="createUrlFile(params[item.name])"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon-name="FileRed" />
                                    <span>Fichier PDF</span>
                                </a>
                            </div>
                            <UploadImage
                                :name="item.name"
                                @uploadSingleWithName="handleChange"
                            />
                        </div>
                    </template>
                    <template v-if="item.type === 'number'">
                        <Input
                            :name-input="item.name"
                            :label="item.label"
                            :input-type="item.type"
                            :required="item.required"
                            @input="handleChange"
                            :type="item.type"
                            :min="item.min"
                            unity="m²"
                            placeholder="0"
                            :vmodel="params[item.name]"
                            :default-value="params[item.name]"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import { valueParams } from '../utils/default-value';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';

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

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    const params = ref<any>({});

    const syndicList = computed(
        () => store.getters['AddProductModule/getListOfSyndic']
    );

    onMounted(async () => {
        params.value = valueParams(data.value);
        console.log('>>> tesst', valueParams(data.value));

        await store.dispatch('AddProductModule/getListOfSyndic');
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            params.value = value;
        },
        { immediate: true }
    );

    function createUrlFile(data: any) {
        return URL.createObjectURL(data);
    }

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
        console.log('PARAMS >>>>', params.value);

        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        emit('onClickNext');
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
    }
</script>

<style lang="scss" scoped>
    .propertyState {
        &__content {
            label {
                @apply font-[600] text-grayIcon;
            }
        }
        &__item-file {
            @apply flex gap-[10px] text-blue-500;
        }

        &__item {
            @apply flex flex-col gap-[10px] mb-[10px];
        }
        &__form {
            @apply flex flex-col gap-[18px];
        }
    }
</style>
