<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="info__container">
            <div class="info__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="info__form-item"
                >
                    <template v-if="item.type === 'number'">
                        <Input
                            :label="item.label"
                            :required="item.required"
                            :name-input="item.name"
                            :input-type="item.type"
                            placeholder="0"
                            @input="handleChange"
                            :vmodel="params[item.name]"
                        />
                    </template>
                    <template v-if="item.type === 'switch'">
                        <Switch
                            :item-label="item.label"
                            :name="item.name"
                            @handle-switch="handleChange"
                            :value="params[item.name]"
                        />
                        <div v-if="item.subItem && item.subItem.length > 0">
                            <div
                                v-for="(s, index) in item.subItem"
                                :key="index"
                            >
                                <div v-if="s.type === 'number'">
                                    <Input
                                        :label="s.label"
                                        :required="s.required"
                                        :name-input="s.name"
                                        placeholder="0"
                                        :input-type="s.type"
                                        :vmodel="params[s.name]"
                                        @input="handleChange"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { Store, useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { valueParams } from '../utils/default-value';

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

    const data = ref<any>(props.data);
    const params = ref<any>({});
    const error = ref<any>({});

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(async () => {
        params.value = valueParams(data.value);
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            params.value = value;
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

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }
</script>

<style lang="scss" scoped>
    .info {
        &__container {
            @apply relative;
        }
    }
</style>
