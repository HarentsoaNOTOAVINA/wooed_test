<template>
    <div class="flex flex-col gap-4">
        <Paragraphe class="label">{{ dataVentilationSystem.label }}</Paragraphe>
        <Select
            :name="dataVentilationSystem.name"
            :options="dataVentilationSystem.options"
            :placeholder="dataVentilationSystem.placeholder"
            @change-select="handleChange"
        />
        <div class="ml-8">
            <Switch
                v-if="params[dataVentilationSystem.name]"
                item-label="Situation"
                checked-name="Absent"
                unchecked-name="Très partiel"
                :name="dataVentilationSystem.subtItem.name"
                @handle-switch="handleChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { dataVentilationSystem } from './data/data.ventilationSystem';
    import { ref, watch } from 'vue';
    import { Store, useStore } from 'vuex';

    const params = ref<any>({});
    const store: Store<any> = useStore();

    watch(
        () => params.value,
        (v) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ventilation: v },
            });
        },
        { immediate: true }
    );

    const handleChange = function (value: any) {
        params.value = {
            ...params.value,
            ...value,
            situation: value.situation ? 'Absent' : 'Très partiel',
        };
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ventilation: params.value },
        });
        console.log('paramsVentilation >>', params.value);
    };
</script>

<style lang="scss" scoped>
    .label {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-gray-icon);
        margin-bottom: 10px;
        display: block;
    }
    .custom-collapse {
        @apply flex flex-col gap-[8px] bg-white border-none;
        &__items {
            border: 0.5px solid var(--color-stroke-gray);
            @apply rounded-[4px];
        }
    }
</style>
