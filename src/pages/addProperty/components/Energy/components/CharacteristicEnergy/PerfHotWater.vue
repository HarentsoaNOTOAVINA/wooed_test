<template>
    <div class="flex flex-col gap-4">
        <div class="w-full flex gap-4 justify-between">
            <Paragraphe class="label">{{ dataPerfHotWater.label }}</Paragraphe>
            <div class="1/3">
                <Select
                    name="note"
                    :options="options"
                    placeholder="Note"
                    @change-select="handleChange"
                />
            </div>
        </div>
        <a-collapse
            v-model:activeKey="activeKey"
            expandIconPosition="right"
            class="custom-collapse"
            accordion
        >
            <a-collapse-panel
                v-for="(elt, index) in collapseData"
                :key="index"
                :header="elt.title"
                class="custom-collapse__items"
            >
                <div
                    class="wrap-content"
                    v-for="(item, indx) in dataPerfHotWater.subItem"
                    :key="indx"
                >
                    <div
                        class="items"
                        v-for="(i, keys) in item.item"
                        :key="keys"
                        v-if="elt.title === item.value"
                    >
                        <Switch
                            :item-label="i.label"
                            :name="i.name"
                            @handle-switch="handleChange($event, item.value)"
                        />
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import {
        Collapse as ACollapse,
        CollapsePanel as ACollapsePanel,
    } from 'ant-design-vue';
    import { dataPerfHotWater } from './data/data.perfHotWater';
    import { ref, watch } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const params = ref<any>({
        indicator: [],
    });
    const activeKey = ref([]);
    const collapseData = [
        {
            title: 'Production',
            name: '',
        },
        {
            title: 'Stockage éventuel',
            name: '',
        },
        {
            title: 'Distribution',
            name: '',
        },
    ];

    const options = [
        {
            label: '< 30',
            value: '< 30',
        },
        {
            label: '> 30',
            value: '> 30',
        },
    ];

    watch(
        () => params.value,
        (v) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { waterPerformance: v },
            });
        },
        { immediate: true }
    );

    function handleChange(value: any, label: string) {
        if ('note' in value) {
            params.value = {
                ...params.value,
                note: value.note,
            };
        } else {
            let existingIndicator = params.value.indicator.findIndex(
                (item: any) => item.category === label
            );

            if (existingIndicator !== -1) {
                params.value.indicator[existingIndicator] = {
                    ...params.value.indicator[existingIndicator],
                    ...value,
                };
            } else {
                params.value.indicator.push({
                    category: label,
                    ...value,
                });
            }
        }
        
        store.dispatch('AddProductModule/setPropertyData', {
            data: { waterPerformance: params.value },
        });
        console.log('params >>', params.value);
    }
</script>

<style lang="scss" scoped>
    .wrap-content {
        @apply lg:grid grid-cols-3 gap-[15px];
    }
    .items {
        @apply my-[15px];
    }
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
