<template>
    <div>
        <Paragraphe class="label">{{ dataRenewableEnergy.label }}</Paragraphe>
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
                    v-for="(sub, indx) in dataRenewableEnergy.subItem"
                    :key="indx"
                >
                    <div
                        v-for="(i, keys) in sub.item"
                        :key="keys"
                        v-if="elt.title === sub.value"
                    >
                        <Input
                            v-if="i.type === 'number' || i.type === 'text'"
                            :label="i.label"
                            :name-input="i.name"
                            :input-type="i.type"
                            :placeholder="i.placeholder"
                            @input="handleChange($event, sub.value)"
                        />
                        <InputDate
                            v-if="i.type === 'date'"
                            :name="i.name"
                            :label="i.label"
                            @handle-date-eng="handleChange($event, sub.value)"
                        />
                        <Select
                            v-if="i.type === 'select'"
                            :label="i.label"
                            :name="i.name"
                            :options="i.options"
                            placeholder="Selectionner"
                            @change-select="handleChange($event, sub.value)"
                        />
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
        <!-- <Select
            v-if="data.type === 'select'"
            :label="data.label"
            :name="data.name"
            :options="data.options"
            :placeholder="data.placeholder"
            @change-select="handleChange"
        />
        <div :class="{'wrap-content': params?.renewableEnergy}">
            <template v-for="(sub, index) in data.subItem" :key="index">
                <template
                    v-for="(i, keys) in sub.item"
                    :key="keys"
                    v-if="params.renewableEnergy === sub.value"
                >
                    <Input
                        v-if="i.type === 'number' || i.type === 'text'"
                        :label="i.label"
                        :name-input="i.name"
                        :input-type="i.type"
                        @input="handleChange"
                    />
                    <Select
                        v-if="i.type === 'select'"
                        :label="i.label"
                        :name="i.name"
                        :options="i.options"
                        placeholder="Selectionner"
                        @change-select="handleChange"
                    />
                </template>
            </template>
        </div> -->
    </div>
</template>

<script setup lang="ts">
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import {
        Collapse as ACollapse,
        CollapsePanel as ACollapsePanel,
    } from 'ant-design-vue';
    import { dataRenewableEnergy } from './data/data.renewableEnergy';
    import { ref, watch } from 'vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const params = ref<Array<any>>([]);
    const activeKey = ref([]);
    const collapseData = [
        {
            title: 'Installation solaire thermique',
            name: '',
        },
        {
            title: 'Installation solaire photovoltaïque',
            name: '',
        },
        {
            title: 'Biomasse',
            name: '',
        },
        {
            title: 'Pompe à chaleur',
            name: '',
        },
        {
            title: 'Unité de cogénération',
            name: '',
        },
    ];

    watch(
        () => params.value,
        (v) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { renewalEnergy: v },
            });
        },
        {immediate: true}
    )

    function handleChange(value: any, label: string) {
        // Recherchez un objet avec le même label dans la liste des paramètres
        const existingParam = params.value.find(
            (param) => param.name === label
        );

        if (existingParam) {
            // Si l'objet existe déjà, maj subContent
            existingParam.subContent = {
                ...existingParam.subContent,
                ...value,
            };
            console.log("Le 'name' existe déjà, mise à jour effectuée");
        } else {
            // Si l'objet n'existe pas encore, ajout à la liste
            const newParam = {
                name: label,
                subContent: value,
            };
            params.value.push(newParam);
            console.log('Le name est nouveau, ajout effectué');
        }
        console.log("STORE >>>>>", store.getters['AddProductModule/getAddPropertyDatas']);

        console.log('params >>', params.value);
    }
</script>

<style lang="scss" scoped>
    .wrap-content {
        @apply lg:grid grid-cols-2 gap-[15px] mt-[15px];
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
