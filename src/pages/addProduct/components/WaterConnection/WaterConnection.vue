<template>
    <div class="water__container">
        <div
            class="water__item"
            v-for="(item, index) in dataOfElectric"
            :key="index"
        >
            <div class="" v-if="item.type === 'select'">
                <Select
                    :name="item.name"
                    :label="item.label"
                    @change-select="handleChange"
                    :options="item.options"
                    :default-value="
                    propertyDatas[item.name] ? propertyDatas[item.name] : item.name === 'counterWaterName' ? 'Privatif' : ''
                    "
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ElectricData } from '@/pages/addProduct/components/WaterConnection/data';
    import { ref, watch } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { useStore } from 'vuex';

    const dataOfElectric = ref<any>(ElectricData);
    const store = useStore();
    const params = ref<any>({
        counterWaterName: 'Privatif',
    });
    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
            });
        },
        { immediate: true, deep: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }
</script>

<style lang="scss" scoped>
    .water {
        &__container {
        }
    }
</style>
