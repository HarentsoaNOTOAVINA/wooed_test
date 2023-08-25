<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div
            v-for="(item, index) in data"
            :key="index"
            class="disponibility__form-item"
        >
            <Select
                v-if="item.type === 'select'"
                :name="item.name"
                :label="item.label"
                :required="item.required ? item.required : false"
                :options="item.options"
                :placeholder="item.placeholder || 'Sélectionnez'"
                :default-value="params[item.name]"
                @change-select="handleChange"
            />
            <InputDate
                v-if="item.type === 'date'"
                :name="item.name"
                :required="item.required"
                :label="item.label"
                :placeholder="item.placeholder"
                :value="
                    params[item.name]
                        ? moment(params[item.name]).format('DD-MM-YYYY')
                        : ''
                "
                @handle-date-eng="handleChange"
            />
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { ref, onMounted, watch } from 'vue';
    import { Store, useStore } from 'vuex';
    import { valueParams } from '../utils/default-value';
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

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    onMounted(() => {
        console.log('data', valueParams(data.value));

        params.value = valueParams(data.value);
    });

    watch(
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            console.log('tonga ato am store', value);

            params.value = value;
        },
        { immediate: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        emit('onClickNext');
    }
</script>

<style lang="scss" scoped>
    .disponibility {
        &__form-item {
            @apply mb-[15px];
        }
    }
</style>
