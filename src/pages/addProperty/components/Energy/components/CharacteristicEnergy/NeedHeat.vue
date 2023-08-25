<template>
    <div>
        <Paragraphe class="label">Besoin en chaleur du logement</Paragraphe>
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
                <div v-if="!optionData && elt.name !== 'ventilationLosses'">
                    <Alert
                        >Vous n'avez pas choisi des options sur les détails des
                        pièces !</Alert
                    >
                </div>
                <div v-for="(item, indx) in dataHeat.subItem" :key="indx">
                    <template
                        v-if="
                            elt.title === item.value &&
                            elt.name !== 'ventilationLosses'
                        "
                    >
                        <div v-for="(option, keys) in optionData" :key="keys">
                            <div class="heat__details">
                                <RadioGroup
                                    :name="option.name"
                                    :items="(item.item as any)"
                                    :label="option.name"
                                    @change="
                                        handleChange($event, item.value, option)
                                    "
                                />
                            </div>
                        </div>
                    </template>
                    <div
                        class="heat__ventilation"
                        v-if="elt.name === 'ventilationLosses'"
                        v-for="(i, idx) in item.item"
                        :key="idx"
                    >
                        <Switch
                            v-if="item.name === 'ventilationLosses'"
                            :item-label="i.label"
                            :name="i.name"
                            @handle-switch="
                                handleChangeVentilation($event, i.label)
                            "
                        />
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import RadioGroup from '@/components/Common/RadioGroup/RadioGroup.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import {
        Collapse as ACollapse,
        CollapsePanel as ACollapsePanel,
    } from 'ant-design-vue';
    import Alert from '@/components/Display/Alert/Alert.vue';

    import { dataHeat } from './data/data.heat';
    import { ref, computed, watch, onMounted } from 'vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const params = ref<any>({});
    const paramsVentilation = ref<any>({});
    const windageLoses = ref<Array<any>>([]);
    const heatNeededs = ref<Array<any>>([{ windageLoses: windageLoses.value }]);
    const activeKey = ref([]);
    const collapseData = [
        {
            title: 'Pertes par les parois',
            name: '',
        },
        {
            title: 'Pertes par fuites d’air',
            name: '',
        },
        {
            title: 'Pertes par ventilation',
            name: 'ventilationLosses',
        },
    ];

    const optionData = computed(
        () => store.getters['AddProductModule/getAddPropertyDatas']['options']
    );

    watch(
        () => windageLoses.value,
        () => {
            heatNeededs.value[0].windageLoses = windageLoses.value;
        },
        { immediate: true }
    );

    // Set default value for heatNeededs to the stored heatNeededs
    onMounted(async () => {
        console.log(
            'mounted needHeat store >>>',
            store.getters['AddProductModule/getAddPropertyDatas']
        );
    });

    function updateOrAddItem(
        targetArray: any[],
        comparisonProps: string[],
        obj: any
    ) {
        const existingIndex = targetArray.findIndex((item) =>
            comparisonProps.every((prop) => item[prop] === obj[prop])
        );

        if (existingIndex !== -1) {
            targetArray[existingIndex] = obj;
        } else {
            targetArray.push(obj);
        }
    }

    function handleChange(value: any, title: string | undefined, option: any) {
        const newValue = {
            ...params.value,
            category: title,
            optionType: option.optionId ? option.optionId : option.name,
            choice: value[option.name],
        };
        updateOrAddItem(
            heatNeededs.value,
            ['category', 'optionType'],
            newValue
        );
        store.dispatch('AddProductModule/setPropertyData', {
            data: { heatNeededs: heatNeededs.value },
        });
        console.log(
            '-----> params >>>',
            store.getters['AddProductModule/getAddPropertyDatas']
        );
    }

    function handleChangeVentilation(v: any, label: any) {
        const newParamsVentilation = {
            ...paramsVentilation.value,
            situation: label,
            situationValue: Object.values(v).some((value) => value === true)
                ? 'Existant'
                : 'Non Existant',
        };
        updateOrAddItem(
            windageLoses.value,
            ['situation'],
            newParamsVentilation
        );
        store.dispatch('AddProductModule/setPropertyData', {
            data: { heatNeededs: heatNeededs.value },
        });
        console.log(
            '-----> params >>>',
            store.getters['AddProductModule/getAddPropertyDatas']
        );
    }
</script>

<style lang="scss" scoped>
    .heat {
        &__details {
            @apply xl:grid grid-cols-2 gap-[15px];
        }
        &__title-niveau {
            @apply text-[14px] font-[600] py-[15px] mb-[15px];
            border-bottom: 1px solid var(--color-gray);
        }
        &__ventilation {
            @apply my-[15px];
        }
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
