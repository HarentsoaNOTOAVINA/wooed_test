<template>
    <CardWrap :title="data.title">
        <div class="heating__wrap-content">
            <div v-for="(item, index) in data.content" :key="index">
                <Select
                    v-if="item.type === 'select'"
                    :label="item.label"
                    :name="item.name"
                    :options="item.options"
                    :placeholder="item.placeholder"
                    :default-value="params['boilerType']"
                    @change-select="handleChange"
                />
                <InputDate
                    v-if="item.type === 'date'"
                    :label="item.label"
                    :name="item.name"
                    :max="true"
                    picker="year"
                    placeholder="Selectionner l'année"
                    format="YYYY"
                    :value="
                        params[item.name]
                            ? moment(`${params[item.name]}`).format('YYYY')
                            : ''
                    "
                    @handleYear="handleChange"
                />
            </div>
        </div>
    </CardWrap>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import CardWrap from '../CardWrap.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';

    import { data } from './data';
    import { ref, onMounted, watch } from 'vue';
    import { valueParams } from '@/pages/addProperty/utils/default-value';
    
    import moment from 'moment';
    import store from '@/store';

    const params = ref<any>({});

    const emit = defineEmits(['change']);

    onMounted(async () => {
        params.value = valueParams((data as any).content);
        
    });

    const handleChange = function (value: object) {
        params.value = {
            ...params.value,
            ...value,
        };

        emit('change', params.value);
    };
</script>

<style lang="scss" scoped>
    .heating {
        &__wrap-content {
            @apply lg:grid grid-cols-2 gap-[15px];
        }
    }
</style>
