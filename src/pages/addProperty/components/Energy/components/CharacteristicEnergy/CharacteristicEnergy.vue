<template>
    <CardWrap :title="data.title">
        <!-- Besoin de chaleur -->
        <NeedHeat />

        <!-- Performance des installations de chauffage -->
        <NeedPerfHeating />

        <!-- Performance des installations d’eau chaude sanitaire -->
        <PerfHotWater />

        <!-- Systeme de ventilation -->
        <VentilationSystem />

        <!-- Energies renouvelables -->
        <RenewableEnergy />

        <!-- Other content -->
        <div class="wrap-content">
            <template v-for="(c, index) in data.content" :key="index">
                <Switch
                    v-if="c.type === 'switch'"
                    :item-label="c.label"
                    :name="c.name"
                />
                <div v-if="c.type === 'file'" class="content-file">
                    <label for="" class="energy-label">{{ c.label }}</label>
                    <UploadImage
                        :name="c.name"
                        @upload-single-with-name="handleChange($event, c.label)"
                        :default-file-list="defaultFile[c.name]"
                        :max-count="1"
                    />
                </div>
            </template>
        </div>

    </CardWrap>
</template>

<script setup lang="ts">
    import CardWrap from '../CardWrap.vue';
    import NeedHeat from './NeedHeat.vue';
    import NeedPerfHeating from './NeedPerfHeating.vue';
    import PerfHotWater from './PerfHotWater.vue';
    import VentilationSystem from './VentilationSystem.vue';
    import RenewableEnergy from './RenewableEnergy.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import { valueParams } from '@/pages/addProperty/utils/default-value';

    import { data } from './data/data';
    import { ref } from 'vue'

    const emit = defineEmits(['change']);
    const params = ref<any>({})
    const defaultFile = valueParams((data as any).content);

    const handleChange = function(value: object, label: any) {

        params.value = {
            ...params.value,
            ...value
        }
        emit('change', params.value, label);

    }
</script>

<style lang="scss" scoped>
    .energy-label {
        @apply font-[600] text-grayIcon mb-[10px] block;
    }
    .content-file {
        @apply mt-[15px]
    }
    .wrap-content {
        @apply pt-[15px] mt-[15px];
        border-top: 1px solid var(--color-gray);
    }
</style>
