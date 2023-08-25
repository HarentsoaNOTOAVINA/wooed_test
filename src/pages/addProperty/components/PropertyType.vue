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
                    <template v-if="item.type === 'select'">
                        <Select
                            :name="item.name"
                            :label="item.label"
                            :required="item.required"
                            :loading="!transactionType.length"
                            :options="transactionType"
                            :placeholder="
                                item.placeholder
                                    ? item.placeholder
                                    : 'Sélectionnez'
                            "
                            @change-select="handleChange"
                            :disabled="!transactionType.length"
                            class="w-full"
                            :has-error="{
                                status: error[`${item.name}`] === '',
                                errorMsg: 'Ce champ est obligatoire',
                            }"
                            :default-value="params[item.name]"
                        />
                    </template>
                    <template v-if="item.type === 'switch'">
                        <Switch
                            :item-label="item.label"
                            :name="item.name"
                            @handle-switch="handleChange"
                            :value="params[item.name]"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
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

    const transactionType = computed(
        () => store.getters['AddProductModule/getTransactionTypes']
    );

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(async () => {
        params.value = valueParams(data.value);
        await store.dispatch('AddProductModule/getTransactionTypes');
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
        error.value = requiredControl(data.value, params.value);

        if (Object.values(error.value).every((v) => v !== '')) {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { operationType: 'sale', ...params.value },
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
