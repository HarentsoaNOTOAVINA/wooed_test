<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        <div class="water__container">
            <div v-for="(item, index) in data" :key="index" class="water__item">
                <template v-if="item.type === 'select'">
                    <Select
                        :name="item.name"
                        :label="item.label"
                        :required="item.required ? item.required : false"
                        :options="item.options"
                        :placeholder="
                            item.placeholder ? item.placeholder : 'Sélectionnez'
                        "
                        :default-value="params[item.name]"
                        @change-select="handleChange"
                    />
                </template>
            </div>
        </div>
    </AddContainer>
</template>

<script lang="ts" setup>
    import Select from '@/components/Common/Select/Select.vue';
    import { onMounted, ref, watch } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import { Store, useStore } from 'vuex';
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

    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);
    const params = ref<any>({});

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        params.value = store.getters['AddProductModule/getAddPropertyDatas'];
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
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        emit('onClickNext');
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

<style lang="scss" scoped></style>
