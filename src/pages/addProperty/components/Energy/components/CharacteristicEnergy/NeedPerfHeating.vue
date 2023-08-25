<template>
    <div class="flex flex-col gap-4">
        <div class="w-full flex gap-4 justify-between">
            <Paragraphe class="label">{{ dataPerfHeating.label }}</Paragraphe>
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
                <div v-for="(sub, indx) in dataPerfHeating.subItem" :key="indx">
                    <div
                        class="items"
                        v-for="(i, keys) in sub.item"
                        :key="keys"
                        v-if="elt.title === sub.value"
                    >
                        <Switch
                            :item-label="i.label"
                            :name="i.name"
                            @handle-switch="handleChange($event, sub.value)"
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
    import { dataPerfHeating } from './data/data.NeedPerfHeating';
    import { onMounted, ref, watch } from 'vue';
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
            title: 'Distribution',
            name: '',
        },
        {
            title: 'Emission',
            name: '',
        },
        {
            title: 'Régulation',
            name: '',
        },
    ];

    const options = [
        {
            label: '< 50',
            value: '< 50',
        },
        {
            label: '> 50',
            value: '> 50',
        },
    ];

    watch(
        () => params.value,
        (v) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { boilerPerformance: v },
            });
        },
        { immediate: true }
    );

    onMounted(async () => {
        console.log('mounted store perfHeat >>>', store.getters['AddProductModule/getAddPropertyDatas']);
    });

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
            data: { boilerPerformance: params.value },
        });
        console.log('-----> params >>>', store.getters['AddProductModule/getAddPropertyDatas']);
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
