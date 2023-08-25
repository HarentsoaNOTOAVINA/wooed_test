<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="pub__container">
            <div class="pub__form place-content-14px">
                <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="pub__form-item"
                >
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
    import { ref, computed, onMounted, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { useStore } from 'vuex';
    import { requiredControl } from '@/utils/validation/form_validation';
    import { valueParams } from '../utils/default-value';
    import Switch from '@/components/Common/Switch/Switch.vue';
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
        const newParamsError: any = requiredControl(data.value, params.value);

        if (cadastralArea.value) {
            const { cadastralArea, ...newParams } = newParamsError;
            error.value = newParams;
        } else {
            console.log('tonga ato ngamba', newParamsError);
            error.value = newParamsError;
        }

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
        params.value = {
            ...params.value,
            ...value,
        };
        console.log('Value change', params.value);
    }
</script>

<style lang="scss" scoped></style>
