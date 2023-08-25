<script setup lang="ts">
    import { data } from '@/pages/addProduct/components/DetailsDescription/data';
    import { computed, onMounted, ref, watch } from 'vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import { Store, useStore } from 'vuex';

    const store: Store<any> = useStore();
    const element = ref<Array<any>>(data);
    const options = ref<Array<any>>([]);
    const callGard = ref<boolean>(false);
    const paramsDetails = ref<any>({
        landPropertyDestination: '',
        callGarden: false,
        costGarden: 0,
    });

    onMounted(async () => {
        options.value = await store.getters['AddProductModule/getDestinations'];
    });

    watch(
        () => paramsDetails.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
                step: { detailDescription: true },
            });
        },
        { immediate: true, deep: true }
    );

    function mapDestination(data: any) {
        let newData: Array<any> = [];
        for (let i = 0; i < data; i++) {
            newData = [
                ...newData,
                {
                    label: data[i].propertyDestinations,
                    value: data[i].id,
                },
            ];
        }
        return newData;
    }

    function handleChange(value: any) {
        for (let i in value) {
            if (i === 'callGarden') {
                callGard.value = value[i];
            }
            paramsDetails.value[i] = value[i];
        }
    }
</script>

<template>
    <div class="">
        <div class="descript__container">
            <div
                class=""
                v-for="(item, idItem) in element"
                :key="idItem"
                :class="item.subOptions ? 'descript__have-sub' : ''"
            >
                <div class="descript__item">
                    <Select
                        v-if="item.type === 'select'"
                        :label="item.label"
                        :name="item.name"
                        @change-select="handleChange"
                        :options="options"
                    />

                    <Switch
                        v-if="item.type === 'switch'"
                        :item-label="item.label"
                        :name="item.name"
                        @handle-switch="handleChange"
                    />
                </div>

                <div
                    class="descript__item"
                    v-for="(sub, idSub) in item.subOptions"
                    :key="idSub"
                >
                    <Input
                        v-if="callGard && sub.type === 'number'"
                        :label="sub.label"
                        :name-input="sub.name"
                        @input="handleChange"
                        :input-type="sub.type"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .descript {
        &__container {
            @apply flex flex-col gap-[20px];
        }
        &__item {
            @apply flex-1 w-[100%];
        }
        &__have-sub {
            @apply flex gap-[20px];
        }
    }
</style>
